import type { ReactElement } from "react";
import { education } from "@/content/data/education";

/** Splits a comma list from the content file into items, dropping the final full stop. */
const items = (list: string): string[] => list.replace(/\.$/, "").split(", ");

/** The degree, the relevant courses and the courses being taken now. */
export function Education(): ReactElement {
  return (
    <div>
      <div className="max-w-[680px]">
        <h3 className="m-0 text-[19px] leading-[1.4] font-semibold">{education.degree}</h3>
        <p className="text-ink-muted mt-1 mb-[18px] text-[16.5px]">{education.institution}</p>
      </div>
      <div className="mt-9 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
        <div className="border-border bg-surface rounded-[16px] border px-[22px] py-5">
          <h4 className="text-accent m-0 mb-2.5 text-[12.5px] font-semibold tracking-[0.08em] uppercase">
            {education.coursesLabel}
          </h4>
          <ul className="m-0 list-none p-0">
            {items(education.courses).map((course) => (
              <li key={course} className="border-border border-t py-2 text-[15.5px] leading-[1.4]">
                {course}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-accent-tint rounded-[16px] px-[22px] py-5">
          <h4 className="text-accent m-0 mb-2.5 text-[12.5px] font-semibold tracking-[0.08em] uppercase">
            {education.currentlyStudyingLabel}
          </h4>
          <ul className="m-0 list-none p-0">
            {items(education.currentlyStudying).map((course) => (
              <li
                key={course}
                className="border-accent/20 border-t py-2 text-[15.5px] leading-[1.4]"
              >
                {course}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
