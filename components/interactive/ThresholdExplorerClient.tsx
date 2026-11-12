"use client";

import { useId, useMemo, useState, type ReactElement } from "react";
import type { Thresholds } from "@/lib/schemas";

// Build spec §8. Every number comes from the JSON: percentages are percents (93.2 = 93.2%) and
// net savings are rupees, shown in ₹ lakh. Sliders move over the grid's own step values, so every
// pair they reach has a row. The review slider starts one step above step-up, so review can
// never drop below step-up.

type Props = { data: Thresholds };
type Row = Thresholds["grid"][number];
type Outputs = Pick<Row, "pctAllowed" | "pctStepUp" | "pctReview" | "recall" | "netSavingsINR">;

// content.md §5 (ChargebackLens), copied word for word.
const CHOSEN_LINE =
  "93.2% allowed, 6.2% stepped up, 0.7% reviewed — catching 49.9% of disputes (203 of 407) and saving ₹11.99L.";
const COST_LINE =
  "Assumed costs: ₹1,500 fee per dispute, ₹300 per manual review, an 18% merchant margin, and 25% of customers abandoning when asked to verify.";

const uniqueSorted = (values: number[]) => Array.from(new Set(values)).sort((a, b) => a - b);
const keyOf = (stepUp: number, review: number) => `${stepUp.toFixed(4)}|${review.toFixed(4)}`;
const percent = (value: number) => `${value.toFixed(1)}%`;
const threshold = (value: number) => value.toFixed(4);
const lakh = (inr: number) => {
  const digits = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(inr) / 100000);
  return `${inr < 0 ? "−" : ""}₹${digits}L`;
};

/** Index of the value nearest to x, searching only between min and max. */
function nearestIndex(values: number[], x: number, min: number, max: number): number {
  let best = min;
  for (let i = min; i <= max; i++) {
    if (Math.abs(values[i] - x) < Math.abs(values[best] - x)) best = i;
  }
  return best;
}

/** Position of x on the index scale, so a chosen value between two steps still gets a place. */
function fractionalIndex(values: number[], x: number): number {
  const last = values.length - 1;
  if (x <= values[0]) return 0;
  if (x >= values[last]) return last;
  let i = 0;
  while (values[i + 1] < x) i++;
  return i + (x - values[i]) / (values[i + 1] - values[i]);
}

/** A tick on a range track. The native thumb is 16px wide, so the tick is offset to match it. */
function Marker({ percentPosition }: { percentPosition: number }): ReactElement {
  return (
    <span
      aria-hidden="true"
      className="bg-ink pointer-events-none absolute top-0 h-[44px] w-[2px]"
      style={{ left: `calc(${percentPosition}% + ${8 - percentPosition * 0.16}px)` }}
    />
  );
}

export default function ThresholdExplorerClient({ data }: Props): ReactElement {
  const ids = useId();
  const stepUpId = `${ids}-stepup`;
  const reviewId = `${ids}-review`;

  const stepUps = useMemo(() => uniqueSorted(data.grid.map((g) => g.stepUp)), [data]);
  const reviews = useMemo(() => uniqueSorted(data.grid.map((g) => g.review)), [data]);
  const rows = useMemo(
    () => new Map(data.grid.map((g) => [keyOf(g.stepUp, g.review), g] as const)),
    [data],
  );

  /** First review index strictly above a step-up index, or -1 if none. */
  const firstReviewAbove = (stepIndex: number) =>
    reviews.findIndex((r) => r > stepUps[stepIndex] + 1e-9);

  // The highest step-up that still has a review threshold above it.
  let maxStepIndex = 0;
  stepUps.forEach((_, i) => {
    if (firstReviewAbove(i) >= 0) maxStepIndex = i;
  });

  const chosenStepIndex = nearestIndex(stepUps, data.chosen.stepUp, 0, maxStepIndex);
  const chosenReviewIndex = nearestIndex(
    reviews,
    data.chosen.review,
    firstReviewAbove(chosenStepIndex),
    reviews.length - 1,
  );

  const [si, setSi] = useState(chosenStepIndex);
  const [ri, setRi] = useState(chosenReviewIndex);
  const [showChosen, setShowChosen] = useState(false);

  const reviewMin = firstReviewAbove(si);
  const row = rows.get(keyOf(stepUps[si], reviews[ri]));
  const out: Outputs | null = showChosen ? data.chosen : (row ?? null);

  const stepPct = (fractionalIndex(stepUps, data.chosen.stepUp) / Math.max(1, maxStepIndex)) * 100;
  const reviewPct =
    (fractionalIndex(reviews, data.chosen.review) / Math.max(1, reviews.length - 1)) * 100;

  const onStepUp = (value: number) => {
    setSi(value);
    setRi((current) => Math.max(current, firstReviewAbove(value)));
    setShowChosen(false);
  };
  const onReview = (value: number) => {
    setRi(Math.max(value, reviewMin));
    setShowChosen(false);
  };
  const onReset = () => {
    setSi(chosenStepIndex);
    setRi(chosenReviewIndex);
    setShowChosen(true);
  };

  const stepText = threshold(stepUps[si]);
  const reviewText = threshold(reviews[ri]);
  const barWidth = (v: number) => `${Math.max(0, v)}%`;

  return (
    <div className="border-border bg-surface rounded-[16px] border p-5 sm:p-6">
      <div className="grid gap-6">
        <div>
          <label htmlFor={stepUpId} className="block text-[16px] font-semibold">
            Step-up threshold{" "}
            <span className="text-ink-muted font-mono text-[15px] font-medium">{stepText}</span>
          </label>
          <div className="relative mt-2">
            <input
              id={stepUpId}
              type="range"
              min={0}
              max={maxStepIndex}
              step={1}
              value={si}
              onChange={(e) => onStepUp(Number(e.target.value))}
              aria-valuetext={
                out
                  ? `Step-up threshold ${stepText}, ${percent(out.pctStepUp)} of transactions stepped up`
                  : `Step-up threshold ${stepText}`
              }
              className="accent-accent h-[44px] w-full"
            />
            <Marker percentPosition={stepPct} />
          </div>
        </div>

        <div>
          <label htmlFor={reviewId} className="block text-[16px] font-semibold">
            Review threshold{" "}
            <span className="text-ink-muted font-mono text-[15px] font-medium">{reviewText}</span>
          </label>
          <div className="relative mt-2">
            <input
              id={reviewId}
              type="range"
              min={reviewMin}
              max={reviews.length - 1}
              step={1}
              value={ri}
              onChange={(e) => onReview(Number(e.target.value))}
              aria-valuetext={
                out
                  ? `Review threshold ${reviewText}, ${percent(out.pctReview)} of transactions reviewed`
                  : `Review threshold ${reviewText}`
              }
              className="accent-accent h-[44px] w-full"
            />
            <Marker percentPosition={reviewPct} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onReset}
            className="border-ink/20 text-ink hover:border-ink rounded-pill min-h-[44px] cursor-pointer border px-5 text-[15px] font-semibold"
          >
            Reset to chosen policy
          </button>
          {showChosen ? (
            <p className="m-0 text-[15px]">
              <span className="font-semibold">Chosen policy:</span> {CHOSEN_LINE}
            </p>
          ) : null}
        </div>

        <div aria-live="polite" className="grid gap-4">
          <div aria-hidden="true" className="bg-border rounded-pill flex h-4 overflow-hidden">
            <div className="bg-border" style={{ width: barWidth(out?.pctAllowed ?? 0) }} />
            <div className="bg-ink-muted" style={{ width: barWidth(out?.pctStepUp ?? 0) }} />
            <div className="bg-accent" style={{ width: barWidth(out?.pctReview ?? 0) }} />
          </div>
          <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3">
            <Stat label="Allowed" value={out ? percent(out.pctAllowed) : "—"} swatch="bg-border" />
            <Stat
              label="Stepped up"
              value={out ? percent(out.pctStepUp) : "—"}
              swatch="bg-ink-muted"
            />
            <Stat label="Reviewed" value={out ? percent(out.pctReview) : "—"} swatch="bg-accent" />
            <Stat label="Disputes caught" value={out ? percent(out.recall) : "—"} />
            <Stat label="Net savings" value={out ? lakh(out.netSavingsINR) : "—"} />
          </dl>
        </div>

        <p className="text-ink-muted m-0 text-[14px] leading-[1.5]">
          Computed on the held-out test period ({data.meta.n_transactions.toLocaleString("en-IN")}{" "}
          transactions, {data.meta.base_rate.toFixed(2)}% dispute rate). {COST_LINE}
        </p>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  swatch,
}: {
  label: string;
  value: string;
  swatch?: string;
}): ReactElement {
  return (
    <div className="border-border rounded-[12px] border px-4 py-3">
      <dt className="text-ink-muted flex items-center gap-2 text-[14px]">
        {swatch ? (
          <span aria-hidden="true" className={`${swatch} inline-block h-2.5 w-2.5 rounded-full`} />
        ) : null}
        {label}
      </dt>
      <dd className="m-0 mt-0.5 font-mono text-[22px] font-semibold">{value}</dd>
    </div>
  );
}
