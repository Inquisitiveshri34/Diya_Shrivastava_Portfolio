import type { ReactElement } from "react";
import { MetricViz } from "@/components/work/MetricViz";
import type { LoadedProject } from "@/lib/content";
import type { Metric } from "@/lib/schemas";

/**
 * A featured project card. The whole card is one link to the case study.
 * Used on Home and on the Work page.
 */
export function ProjectCard({ project }: { project: LoadedProject }): ReactElement {
  const [primary, secondary] = project.metrics ?? [];
  return (
    <a
      href={`/work/${project.slug}`}
      className="group rounded-card bg-band text-ink hover:text-ink focus-visible:rounded-card grid gap-8 p-6 no-underline transition-colors hover:no-underline sm:p-8 md:grid-cols-[minmax(0,1fr)_minmax(0,300px)] md:gap-12 md:p-8"
    >
      <div className="flex min-w-0 flex-col gap-3">
        <p className="text-ink-muted m-0 text-[14px]">{project.cardLabel}</p>
        <h3 className="m-0 font-serif text-[27px] leading-[1.2] font-semibold">
          {project.name}
          <span className="text-ink-muted mt-0.5 block font-sans text-[15px] font-normal">
            {project.subtitle}
          </span>
        </h3>
        <p className="text-ink m-0 text-[15.5px]">{project.cardLine}</p>
        {project.cardTags ? (
          <p className="text-ink-muted m-0 text-[13.5px]">{project.cardTags.join(" · ")}</p>
        ) : null}
        <span className="text-accent mt-auto pt-1 text-[15px] font-semibold underline-offset-[3px] group-hover:underline">
          Read case study →
        </span>
      </div>

      {primary ? (
        <div className="flex min-w-0 flex-col gap-3">
          <MetricBig metric={primary} />
          {primary.viz ? <MetricViz viz={primary.viz} /> : null}
          <p className="text-ink-muted m-0 text-[13.5px] leading-[1.45] first-letter:uppercase">
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

/** The big number, with its double underline. */
function MetricBig({ metric }: { metric: Metric }): ReactElement {
  return (
    <p className="text-accent m-0 font-mono text-[36px] leading-[1.15] font-semibold">
      <span className="border-accent border-b-[3px] border-double pb-px">{metric.value}</span>
      {metric.label ? (
        <span className="text-ink ml-2 font-sans text-[15px] font-medium">{metric.label}</span>
      ) : null}
    </p>
  );
}

/** A secondary metric on one line: "value label — context". */
function MetricInline({ metric }: { metric: Metric }): ReactElement {
  return (
    <>
      <span className="text-ink font-mono">
        {metric.value}
        {metric.label ? ` ${metric.label}` : ""}
      </span>
      {" — "}
      <span className="first-letter:uppercase">{metric.context}</span>
    </>
  );
}
