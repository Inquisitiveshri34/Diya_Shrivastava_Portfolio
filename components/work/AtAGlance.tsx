import type { ReactElement } from "react";
import { MetricViz } from "@/components/work/MetricViz";
import { TextLink } from "@/components/ui/TextLink";
import type { GlanceRow } from "@/lib/schemas";

type Viz = NonNullable<GlanceRow["viz"]>;
type DotsViz = Extract<Viz, { kind: "dots" }>;
type SplitViz = Extract<Viz, { kind: "split" }>;

// Laptop geometry, in pixels. Every card on laptops is CARD_HEIGHT tall (the `lg:h-[210px]` class
// below must match), and the cards in a column are GAP apart (the `gap-4` class). The connectors
// are drawn from these numbers, so they meet each card's middle.
const CARD_HEIGHT = 210;
const GAP = 16;
const CONNECTOR_WIDTH = 130;

/**
 * The "At a glance" grid, as the Design Source lays it out on laptops: result cards with a
 * mini-chart on the left, curved connectors into a centre note, and the remaining cards on the
 * right. Rows whose chart is a split bar (the tests card) go on the right, as in the design.
 * Every card is the same height on laptops. On phones the three parts stack: left cards, the
 * note, then right cards.
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
  // The connectors meet the left column's middle. The note starts level with that point on laptops.
  const height = left.length * CARD_HEIGHT + Math.max(0, left.length - 1) * GAP;
  const noteTop = Math.max(0, height / 2 - 12);
  return (
    <section id="glance" className="mt-22 scroll-mt-24">
      <span
        aria-hidden="true"
        className="border-accent mb-[18px] block w-11 border-t-[3px] border-double"
      />
      <h2 className="m-0 mb-8 font-serif text-[30px] leading-[1.25] font-semibold">At a glance</h2>

      <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)_300px] lg:gap-0">
        <div className="flex flex-col gap-4">
          {left.map((row) => (
            <GlanceCard key={row.number} row={row} />
          ))}
        </div>

        <div className="relative">
          {left.length > 0 ? <Connectors count={left.length} /> : null}
          <div
            className="flex flex-col gap-3 py-6 text-[16px] leading-[1.5] lg:absolute lg:inset-x-0 lg:pr-6 lg:pl-[150px]"
            style={{ top: noteTop }}
          >
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

        <div className="flex flex-col gap-4">
          {right.map((row) => (
            <GlanceCard key={row.number} row={row} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * The curves from each left card into the centre, drawn in pixels so they line up with the cards
 * at CARD_HEIGHT and GAP. They meet at the middle of the left column.
 */
function Connectors({ count }: { count: number }): ReactElement {
  const height = count * CARD_HEIGHT + (count - 1) * GAP;
  const middle = height / 2;
  const half = CONNECTOR_WIDTH / 2;
  const paths = Array.from({ length: count }, (_, i) => {
    const y = i * (CARD_HEIGHT + GAP) + CARD_HEIGHT / 2;
    return `M0 ${y} C ${half} ${y}, ${half} ${middle}, ${CONNECTOR_WIDTH} ${middle}`;
  });
  return (
    <>
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox={`0 0 ${CONNECTOR_WIDTH} ${height}`}
        className="absolute top-0 left-0 hidden lg:block"
        style={{ width: CONNECTOR_WIDTH, height }}
      >
        {paths.map((d) => (
          <path key={d} d={d} fill="none" strokeWidth={1.2} className="stroke-accent opacity-75" />
        ))}
      </svg>
      <span
        aria-hidden="true"
        className="bg-surface border-accent absolute hidden size-2.5 rounded-full border-[1.5px] lg:block"
        style={{ top: middle - 5, left: CONNECTOR_WIDTH - 5 }}
      />
    </>
  );
}

/**
 * One glance card. On laptops it is CARD_HEIGHT tall, the same as every other card; the chart sits
 * at the bottom. On phones it takes the height its content needs.
 */
function GlanceCard({ row }: { row: GlanceRow }): ReactElement {
  const viz = row.viz;
  const isResult = viz !== undefined && viz.kind !== "split";
  return (
    <div
      className={`border-border flex min-h-[132px] flex-col gap-2 rounded-[16px] border p-5 lg:h-[210px] ${
        isResult ? "bg-surface" : "bg-band"
      }`}
    >
      <p className="text-accent m-0 font-mono text-[22px] leading-[1.25] font-semibold">
        <span className="border-accent border-b-[3px] border-double pb-px">{row.number}</span>
      </p>
      <p className="text-ink-muted m-0 text-[14px] leading-[1.45]">{row.meaning}</p>
      {viz?.kind === "dots" ? <GlanceDots viz={viz} /> : null}
      {viz?.kind === "split" ? <SplitBar viz={viz} /> : null}
      {viz && viz.kind !== "dots" && viz.kind !== "split" ? (
        <div className="mt-auto">
          <MetricViz viz={viz} />
        </div>
      ) : null}
    </div>
  );
}

/** One dot per item. Filled dots are plum, or sage when `tone` is muted; the rest are hollow rings. */
function GlanceDots({ viz }: { viz: DotsViz }): ReactElement {
  return (
    <div aria-hidden="true" className="mt-auto flex max-w-[260px] flex-wrap gap-1">
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
function SplitBar({ viz }: { viz: SplitViz }): ReactElement {
  const basePercent = (viz.base / viz.total) * 100;
  return (
    <div
      aria-hidden="true"
      className="rounded-pill border-border bg-surface relative mt-auto h-2 max-w-[260px] overflow-hidden border"
    >
      <span className="bg-border absolute inset-y-0 left-0" style={{ width: `${basePercent}%` }} />
      <span
        className="bg-accent absolute inset-y-0 right-0"
        style={{ width: `${100 - basePercent}%` }}
      />
    </div>
  );
}
