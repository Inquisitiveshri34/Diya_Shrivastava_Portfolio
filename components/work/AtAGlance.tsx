import type { ReactElement } from "react";
import { MetricViz } from "@/components/work/MetricViz";
import { TextLink } from "@/components/ui/TextLink";
import type { GlanceRow } from "@/lib/schemas";

/**
 * The "At a glance" grid. Rows with a mini-chart (`viz`) sit in the left column on laptops, the
 * rest in the right column. On phones the grid stacks into one column, left column first.
 */
export function AtAGlance({
  rows,
  note,
  hasLimitations,
}: {
  rows: GlanceRow[];
  note?: string;
  hasLimitations: boolean;
}): ReactElement {
  const charted = rows.filter((row) => row.viz);
  const plain = rows.filter((row) => !row.viz);
  return (
    <section id="glance" className="mt-22 scroll-mt-24">
      <span
        aria-hidden="true"
        className="border-accent mb-[18px] block w-11 border-t-[3px] border-double"
      />
      <h2 className="m-0 mb-8 font-serif text-[30px] leading-[1.25] font-semibold">At a glance</h2>
      {note || hasLimitations ? (
        <p className="text-ink-muted m-0 mb-6 max-w-[680px] text-[16px] leading-[1.5]">
          {note}
          {hasLimitations ? (
            <>
              {note ? " " : null}
              <TextLink href="#limitations" className="text-accent font-semibold">
                Read the limitation ↓
              </TextLink>
            </>
          ) : null}
        </p>
      ) : null}
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
        <div className="flex flex-col gap-4">
          {charted.map((row) => (
            <GlanceCard key={row.number} row={row} />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {plain.map((row) => (
            <GlanceCard key={row.number} row={row} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GlanceCard({ row }: { row: GlanceRow }): ReactElement {
  return (
    <div
      className={`border-border flex min-h-[132px] flex-col gap-2 rounded-[16px] border p-5 ${
        row.viz ? "bg-surface" : "bg-band"
      }`}
    >
      <p className="text-accent m-0 font-mono text-[22px] leading-[1.25] font-semibold">
        <span className="border-accent border-b-[3px] border-double pb-px">{row.number}</span>
      </p>
      {row.viz ? <MetricViz viz={row.viz} /> : null}
      <p className="text-ink-muted m-0 text-[14px] leading-[1.45]">{row.meaning}</p>
    </div>
  );
}
