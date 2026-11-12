import type { ReactElement } from "react";
import { TextLink } from "@/components/ui/TextLink";
import type { LoadedProject } from "@/lib/content";

/** One learning project in the collapsed section: name, one line, domain and stack, and a link. */
export function ProjectRow({ project }: { project: LoadedProject }): ReactElement {
  return (
    <article className="border-border border-t py-5">
      <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
        <div className="min-w-0 flex-[999_1_460px]">
          <h3 className="m-0 font-serif text-[21px] leading-[1.3] font-semibold">
            {project.name}{" "}
            <span className="text-ink-muted font-sans text-[15px] font-normal">
              — {project.subtitle}
            </span>
          </h3>
          <p className="m-0 mt-1.5 mb-1 text-[16px] leading-[1.6]">{project.cardLine}</p>
          <p className="text-ink-muted m-0 text-[13.5px]">
            {project.cardLabel} · {project.stack.join(", ")}
          </p>
        </div>
        <TextLink href={`/work/${project.slug}`} className="shrink-0 text-[15px] font-semibold">
          View project →
        </TextLink>
      </div>
    </article>
  );
}
