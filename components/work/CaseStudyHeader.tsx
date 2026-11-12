import type { ReactElement, ReactNode } from "react";
import { SincerityStamp } from "@/components/work/SincerityStamp";
import { TextLink } from "@/components/ui/TextLink";
import type { LoadedProject } from "@/lib/content";

/**
 * The top of every case study: back link, label, title, summary and the 誠 stamp, then the
 * Role / Stack / Context table and the project links. A live demo gets a note about waking up.
 */
export function CaseStudyHeader({ project }: { project: LoadedProject }): ReactElement {
  const { github, demo } = project.links;
  return (
    <header>
      <p className="m-0 mb-[18px] text-[15px]">
        <TextLink href="/work" className="font-semibold">
          ← All work
        </TextLink>
      </p>
      <p className="text-ink-muted m-0 text-[15px]">{project.label}</p>
      <div className="mt-2 flex items-start justify-between gap-8">
        <div className="max-w-[820px] min-w-0">
          <h1 className="m-0 font-serif text-[36px] leading-[1.15] font-semibold tracking-[-0.015em] text-balance lg:text-[46px]">
            {project.title}
          </h1>
          <p className="m-0 mt-[18px] max-w-[720px] text-[18px] leading-[1.55] lg:text-[20px]">
            {project.summary}
          </p>
        </div>
        <div className="mt-6 hidden sm:block">
          <SincerityStamp />
        </div>
      </div>

      <dl className="border-accent-tint m-0 mt-9 grid gap-0 border-y-[3px] border-double text-[15px] sm:grid-cols-[150px_minmax(0,1fr)]">
        <DetailRow label="Role">{project.details}</DetailRow>
        <DetailRow label="Stack">{project.stack.join(", ")}</DetailRow>
        {project.contextNote ? <DetailRow label="Context">{project.contextNote}</DetailRow> : null}
      </dl>

      {github || demo ? (
        <ul className="m-0 mt-5 flex list-none flex-wrap gap-x-7 gap-y-3 p-0 text-[15px]">
          {github ? (
            <li>
              <TextLink href={github} inline className="font-semibold">
                View code →
              </TextLink>
            </li>
          ) : null}
          {demo ? (
            <li className="flex flex-wrap items-baseline gap-x-3">
              <TextLink href={demo} inline className="font-semibold">
                Live demo →
              </TextLink>
              <span className="text-ink-muted text-[14px]">
                Demo may take ~30 seconds to wake up.
              </span>
            </li>
          ) : null}
        </ul>
      ) : null}
    </header>
  );
}

/** One row of the details table. Stacks on phones, a two-column row from 640px. */
function DetailRow({ label, children }: { label: string; children: ReactNode }): ReactElement {
  return (
    <div className="border-border grid gap-1 border-t py-3.5 first:border-t-0 sm:col-span-2 sm:grid-cols-subgrid sm:gap-6">
      <dt className="text-ink-muted font-mono text-[12.5px] font-medium tracking-[0.06em] uppercase">
        {label}
      </dt>
      <dd className="m-0 leading-[1.6]">{children}</dd>
    </div>
  );
}
