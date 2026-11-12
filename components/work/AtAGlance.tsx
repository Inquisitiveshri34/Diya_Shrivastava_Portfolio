import type { ReactElement } from "react";
import { MetricViz } from "@/components/work/MetricViz";
import { TextLink } from "@/components/ui/TextLink";
import type { GlanceRow } from "@/lib/schemas";

type Viz = NonNullable<GlanceRow["viz"]>;
type DotsViz = Extract<Viz, { kind: "dots" }>;
type SplitViz = Extract<Viz, { kind: "split" }>;

/**
 * The "At a glance" grid, as the Design Source lays it out on laptops: result cards with a
 * mini-chart on the left, curved connectors into a centre note, and the remaining cards on the
 * right. Rows whose chart is a split bar (the tests card) go on the right, as in the design.
 * On phones the three parts stack: left cards, the note, then right cards.
 */
export function AtAGlance({
  rows,
  note,
  hasApproach,
}: {
  rows: GlanceRow[];
  note?: string;
  hasApproach: boolean;
}): ReactElement {
  const left = rows.filter((row) => row.viz && row.viz.kind !== "split");
  const right = rows.filter((row) => !left.includes(row));
  return (
    <section id="glance" className="mt-22 scroll-mt-24">
      <span
        aria-hidden="true"
        className="border-accent mb-[18px] block w-11 border-t-[3px] border-double"
      />
      <h2 className="m-0 mb-8 font-serif text-[30px] leading-[1.25] font-semibold">At a glance</h2>

      <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)_300px] lg:gap-0">
        <div className={`flex flex-col gap-4 ${left.length === 1 ? "lg:self-center" : ""}`}>
          {left.map((row) => (
            <GlanceCard key={row.number} row={row} alone={left.length === 1} />
          ))}
        </div>

        <div className="relative min-h-0">
          {left.length > 0 ? <Connectors count={left.length} /> : null}
          <div className="flex flex-col justify-center gap-3 py-6 text-[16px] leading-[1.5] lg:h-full lg:pr-6 lg:pl-[150px]">
            {note ? <p className="m-0 font-serif text-[18px] italic">{note}</p> : null}
            {hasApproach ? (
              <p className="m-0">
                <TextLink href="#approach" className="text-accent font-semibold">
                  See the approach ↓
                </TextLink>
              </p>
            ) : null}
          </div>
        </div>

        <div className={`flex flex-col gap-4 ${right.length === 1 ? "lg:self-center" : ""}`}>
          {right.map((row) => (
            <GlanceCard key={row.number} row={row} alone={right.length === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * The curves from each left card into the centre. The drawing is one box, stretched to the
 * centre column's height; the left cards share that height, so the curves meet each card's middle.
 */
function Connectors({ count }: { count: number }): ReactElement {
  const paths = Array.from({ length: count }, (_, i) => {
    const y = ((i + 0.5) / count) * 100;
    return `M0 ${y} C 50 ${y}, 50 50, 100 50`;
  });
  return (
    <>
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-y-0 left-0 hidden h-full w-[130px] lg:block"
      >
        {paths.map((d) => (
          <path
            key={d}
            d={d}
            fill="none"
            strokeWidth={1.2}
            vectorEffect="non-scaling-stroke"
            className="stroke-accent opacity-75"
          />
        ))}
      </svg>
      <span
        aria-hidden="true"
        className="bg-surface border-accent absolute top-1/2 left-[130px] hidden size-2.5 -translate-y-1/2 rounded-full border-[1.5px] lg:block"
      />
    </>
  );
}

/**
 * One glance card. A column of several cards fills the row's height, with each chart at the bottom,
 * as the design has it. A column with one card keeps its natural height and is centred against
 * the row, so the connector still meets its middle.
 */
function GlanceCard({ row, alone }: { row: GlanceRow; alone: boolean }): ReactElement {
  const viz = row.viz;
  const isResult = viz !== undefined && viz.kind !== "split";
  return (
    <div
      className={`border-border flex min-h-[132px] flex-col gap-2 ${alone ? "" : "flex-1"} rounded-[16px] border p-5 ${
        alone ? "justify-center" : ""
      } ${isResult ? "bg-surface" : "bg-band"}`}
    >
      <p className="text-accent m-0 font-mono text-[22px] leading-[1.25] font-semibold">
        <span className="border-accent border-b-[3px] border-double pb-px">{row.number}</span>
      </p>
      <p className="text-ink-muted m-0 text-[14px] leading-[1.45]">{row.meaning}</p>
      {viz?.kind === "dots" ? <GlanceDots viz={viz} pinned={!alone} /> : null}
      {viz?.kind === "split" ? <SplitBar viz={viz} pinned={!alone} /> : null}
      {viz && viz.kind !== "dots" && viz.kind !== "split" ? <MetricViz viz={viz} /> : null}
    </div>
  );
}

/** One dot per item. Filled dots are plum, or sage when `tone` is muted; the rest are hollow rings. */
function GlanceDots({ viz, pinned }: { viz: DotsViz; pinned: boolean }): ReactElement {
  return (
    <div
      aria-hidden="true"
      className={`flex max-w-[260px] flex-wrap gap-1 ${pinned ? "mt-auto" : ""}`}
    >
      {Array.from({ length: viz.total }, (_, i) => {
        const filled = i < viz.filled;
        const tone = !filled
          ? "bg-surface border-accent"
          : viz.tone === "muted"
            ? "bg-border border-border"
            : "bg-accent border-accent";
        return <span key={i} className={`size-2 rounded-full border-[1.5px] ${tone}`} />;
      })}
    </div>
  );
}

/** A bar of two parts: the base (sage) and what was added since (plum), e.g. 262 of 375 tests. */
function SplitBar({ viz, pinned }: { viz: SplitViz; pinned: boolean }): ReactElement {
  const basePercent = (viz.base / viz.total) * 100;
  return (
    <div
      aria-hidden="true"
      className={`rounded-pill border-border bg-surface relative h-2 max-w-[260px] overflow-hidden border ${pinned ? "mt-auto" : ""}`}
    >
      <span className="bg-border absolute inset-y-0 left-0" style={{ width: `${basePercent}%` }} />
      <span
        className="bg-accent absolute inset-y-0 right-0"
        style={{ width: `${100 - basePercent}%` }}
      />
    </div>
  );
}
