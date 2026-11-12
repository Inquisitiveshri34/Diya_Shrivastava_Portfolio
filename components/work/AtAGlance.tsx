"use client";

import type { ReactElement } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { MetricViz } from "@/components/work/MetricViz";
import { TextLink } from "@/components/ui/TextLink";
import type { GlanceRow } from "@/lib/schemas";

type Viz = NonNullable<GlanceRow["viz"]>;
type DotsViz = Extract<Viz, { kind: "dots" }>;
type SplitViz = Extract<Viz, { kind: "split" }>;

const CONNECTOR_WIDTH = 130;

/** Where the connectors go, measured from the rendered cards on laptops. */
type Geometry = {
  /** Height of the whole grid. */
  height: number;
  /** Middle of each left card, from the top of the grid. */
  ys: number[];
  /** Middle of the left column, where the connectors meet. */
  middle: number;
};

/**
 * The "At a glance" grid, as the Design Source lays it out on laptops: result cards with a
 * mini-chart on the left, curved connectors into a centre note, and the remaining cards on the
 * right. Rows whose chart is a split bar (the tests card) go on the right, as in the design.
 * Cards keep their natural height. All three columns are centred on one vertical midline, so the
 * connectors and the note meet that line whatever the number of cards. The
 * connectors and the note follow the cards' measured positions. On phones the three parts stack.
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
  const gridRef = useRef<HTMLDivElement>(null);
  const [geometry, setGeometry] = useState<Geometry | null>(null);

  // Measure after layout, and again whenever the grid's size changes (window resize, fonts).
  // The left count is in the dependencies because it changes which cards are measured.
  const leftCount = left.length;
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const measure = () => {
      const gridTop = grid.getBoundingClientRect().top;
      const cards = Array.from(grid.querySelectorAll<HTMLElement>("[data-glance-left]"));
      const rects = cards.map((card) => card.getBoundingClientRect());
      setGeometry({
        height: grid.getBoundingClientRect().height,
        ys: rects.map((r) => r.top - gridTop + r.height / 2),
        middle:
          rects.length > 0 ? (rects[0].top + rects[rects.length - 1].bottom) / 2 - gridTop : 0,
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(grid);
    return () => observer.disconnect();
  }, [leftCount]);

  // On laptops the note is centred on the merge point: its top is the point's height, and it moves
  // up by half its own height (lg:-translate-y-1/2).
  const noteTop = geometry ? geometry.middle : 0;

  return (
    <section id="glance" className="mt-22 scroll-mt-24">
      <span
        aria-hidden="true"
        className="border-accent mb-[18px] block w-11 border-t-[3px] border-double"
      />
      <h2 className="m-0 mb-8 font-serif text-[30px] leading-[1.25] font-semibold">At a glance</h2>

      <div
        ref={gridRef}
        className="relative grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)_300px] lg:gap-0"
      >
        <div className="flex flex-col gap-4 lg:self-center">
          {left.map((row) => (
            <GlanceCard key={row.number} row={row} isLeft />
          ))}
        </div>

        <div className="relative">
          {left.length > 0 && geometry ? (
            <Connectors geometry={geometry} count={left.length} />
          ) : null}
          <div
            className="flex flex-col gap-3 py-6 text-[16px] leading-[1.5] lg:absolute lg:inset-x-0 lg:-translate-y-1/2 lg:pr-6 lg:pl-[150px]"
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

        <div className="flex flex-col gap-4 lg:self-center">
          {right.map((row) => (
            <GlanceCard key={row.number} row={row} isLeft={false} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** The curves from each left card into the centre, drawn to the measured positions. */
function Connectors({ geometry, count }: { geometry: Geometry; count: number }): ReactElement {
  const { height, ys, middle } = geometry;
  const half = CONNECTOR_WIDTH / 2;
  const paths = Array.from({ length: count }, (_, i) => {
    const y = ys[i] ?? middle;
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

/** One glance card, at its natural height. Left cards are marked so the connectors can find them. */
function GlanceCard({ row, isLeft }: { row: GlanceRow; isLeft: boolean }): ReactElement {
  const viz = row.viz;
  const isResult = viz !== undefined && viz.kind !== "split";
  return (
    <div
      data-glance-left={isLeft ? "" : undefined}
      className={`border-border flex min-h-[132px] flex-col gap-2 rounded-[16px] border p-5 ${
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
        <div className="mt-2">
          <MetricViz viz={viz} />
        </div>
      ) : null}
    </div>
  );
}

/** One dot per item. Filled dots are plum, or sage when `tone` is muted; the rest are hollow rings. */
function GlanceDots({ viz }: { viz: DotsViz }): ReactElement {
  return (
    <div aria-hidden="true" className="mt-2 flex max-w-[260px] flex-wrap gap-1">
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
      className="rounded-pill border-border bg-surface relative mt-2 h-2 max-w-[260px] overflow-hidden border"
    >
      <span className="bg-border absolute inset-y-0 left-0" style={{ width: `${basePercent}%` }} />
      <span
        className="bg-accent absolute inset-y-0 right-0"
        style={{ width: `${100 - basePercent}%` }}
      />
    </div>
  );
}
