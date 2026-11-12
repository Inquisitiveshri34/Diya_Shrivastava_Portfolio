import type { ReactElement } from "react";
import { MetricViz } from "@/components/work/MetricViz";
import type { LoadedProject } from "@/lib/content";
import type { Metric } from "@/lib/schemas";

/**
 * A featured project card. The whole card is one link to the case study.
 * Used on Home and on the Work page.
 *
 * Laptops: the text on the left, the metrics in a 260px column on the right.
 * Phones: one column in this order: label, title, description, metrics, tags, "Read case study".
 * The left-hand items are `contents` on phones, so each one can be ordered in the card's grid.
 */
export function ProjectCard({ project }: { project: LoadedProject }): ReactElement {
  const [primary, secondary] = project.metrics ?? [];
  return (
    <a
      href={`/work/${project.slug}`}
      className="group rounded-card bg-band text-ink hover:text-ink grid gap-x-0 gap-y-2 p-[22px] no-underline transition-colors hover:no-underline lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-x-14 lg:gap-y-0 lg:p-8"
    >
      <div className="contents lg:flex lg:min-w-0 lg:flex-col lg:gap-2">
        <p className="text-ink-muted order-1 m-0 text-[13px] leading-[1.4] lg:order-none lg:text-[14px]">
          {project.cardLabel}
        </p>
        <h3 className="order-2 m-0 font-serif text-[27px] leading-[1.25] font-semibold lg:order-none">
          {project.name}
          <span className="text-ink-muted block font-sans text-[14px] font-normal lg:text-[15px]">
            {project.subtitle}
          </span>
        </h3>
        <p className="text-ink order-3 m-0 text-[16px] leading-[1.6] lg:order-none lg:text-[17px]">
          {project.cardLine}
        </p>
        {project.cardTags ? (
          <p className="text-ink-muted order-5 m-0 mt-1 text-[13.5px] lg:order-none lg:mt-0">
            {project.cardTags.join(" · ")}
          </p>
        ) : null}
        <span className="text-accent order-6 mt-1 text-[15px] font-semibold underline-offset-[3px] group-hover:underline lg:order-none lg:mt-auto lg:pt-1">
          Read case study →
        </span>
      </div>

      {primary ? (
        <div className="order-4 mt-3 flex min-w-0 flex-col gap-2 lg:order-none lg:mt-0">
          <MetricBig metric={primary} />
          {primary.viz ? <MetricViz viz={primary.viz} /> : null}
          <p className="text-ink-muted m-0 text-[14px] leading-[1.45] first-letter:uppercase">
            {primary.context}
          </p>
          {secondary ? (
            <p className="border-border text-ink-muted m-0 mt-1 border-t pt-2.5 text-[14px] leading-[1.45]">
              <MetricInline metric={secondary} />
            </p>
          ) : null}
        </div>
      ) : null}
    </a>
  );
}

/** The big number, with its double underline and its label beside it. */
function MetricBig({ metric }: { metric: Metric }): ReactElement {
  return (
    <p className="text-accent m-0 font-mono text-[36px] leading-[1.15] font-semibold">
      <span className="border-accent border-b-[3px] border-double pb-px">{metric.value}</span>
      {metric.label ? (
        <span className="text-ink ml-3 font-mono text-[15px] font-medium">{metric.label}</span>
      ) : null}
    </p>
  );
}

/** A secondary metric on one line: "value label — context". */
function MetricInline({ metric }: { metric: Metric }): ReactElement {
  return (
    <>
      <span className="text-ink font-mono font-medium">
        {metric.value}
        {metric.label ? ` ${metric.label}` : ""}
      </span>
      {" — "}
      <span className="first-letter:uppercase">{metric.context}</span>
    </>
  );
}
