import type { ReactElement } from "react";
import type { Viz } from "@/lib/schemas";

// Design source (Home cards): the top-1% lift track spans 15% of the bar width.
const LIFT_CEILING_PERCENT = 15;

const pct = (value: number, of: number) => `${Math.min(100, (value / of) * 100)}%`;

/**
 * The mini-chart beside a card's big number. Drawn from the `viz` field in the project file.
 * It is aria-hidden: the context line under it says the same thing in words.
 */
export function MetricViz({ viz }: { viz: Viz }): ReactElement {
  if (viz.kind === "dots") {
    return (
      <div aria-hidden="true" className="flex max-w-[260px] flex-wrap gap-1">
        {Array.from({ length: viz.total }, (_, i) => (
          <span
            key={i}
            className={`border-accent size-2 rounded-full border-[1.5px] ${
              i < viz.filled ? "bg-accent" : "bg-surface"
            }`}
          />
        ))}
      </div>
    );
  }

  if (viz.kind === "lift") {
    const top = (viz.disputes / viz.transactions) * 100;
    const base = Number.parseFloat(viz.baseRate.replace("%", ""));
    return (
      <div aria-hidden="true" className="flex max-w-[260px] flex-col gap-1.5">
        <LiftRow width={pct(top, LIFT_CEILING_PERCENT)} label="top 1%" tone="accent" />
        <LiftRow width={pct(base, LIFT_CEILING_PERCENT)} label="all" tone="muted" />
      </div>
    );
  }

  if (viz.kind === "bar") {
    return (
      <div
        aria-hidden="true"
        className="rounded-pill border-border bg-surface relative h-2 max-w-[260px] overflow-hidden border"
      >
        <span
          className="bg-accent absolute inset-y-0 left-0"
          style={{ width: `${viz.percent}%` }}
        />
      </div>
    );
  }

  // scale: a model value (filled dot) against a baseline (open dot) on a fixed axis.
  const model = pct(viz.value, viz.max);
  const baseline = pct(viz.baseline, viz.max);
  const start = Math.min(viz.value, viz.baseline);
  const span = Math.abs(viz.baseline - viz.value);
  return (
    <div aria-hidden="true" className="relative h-[26px] max-w-[300px]">
      <span className="bg-border absolute inset-x-0 top-3 h-px" />
      <span className="bg-border absolute top-[7px] left-0 h-[11px] w-px" />
      <span className="bg-border absolute top-[7px] right-0 h-[11px] w-px" />
      <span
        className="bg-accent-tint absolute top-[11px] h-[3px]"
        style={{ left: pct(start, viz.max), width: pct(span, viz.max) }}
      />
      <span
        className="bg-accent absolute top-[7px] size-2.5 -translate-x-1/2 rounded-full"
        style={{ left: model }}
      />
      <span
        className="border-ink-muted bg-band absolute top-[7px] size-2.5 -translate-x-1/2 rounded-full border-[1.5px]"
        style={{ left: baseline }}
      />
    </div>
  );
}

function LiftRow({
  width,
  label,
  tone,
}: {
  width: string;
  label: string;
  tone: "accent" | "muted";
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="rounded-pill border-border bg-surface relative h-2 flex-1 overflow-hidden border">
        <span
          className={`absolute inset-y-0 left-0 ${tone === "accent" ? "bg-accent" : "bg-ink-muted"}`}
          style={{ width }}
        />
      </span>
      <span className="text-ink w-16 font-mono text-[11.5px]">{label}</span>
    </div>
  );
}
