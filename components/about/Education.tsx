import type { ReactElement } from "react";
import { education } from "@/content/data/education";

/** Splits a comma list from the content file into items, dropping the final full stop. */
const items = (list: string): string[] => list.replace(/\.$/, "").split(", ");

// Course names are exactly the ones in education.ts (content.md wins on wording). The group
// names are design labels. Every course in education.ts must appear in exactly one group.
const COURSE_GROUPS: { name: string; courses: string[] }[] = [
  {
    name: "Core computer science",
    courses: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "Database Management Systems",
      "Discrete Mathematics",
    ],
  },
  {
    name: "Programming",
    courses: ["Object-Oriented Programming Lab", "Problem Solving Using Programming"],
  },
  {
    name: "Web & product",
    courses: [
      "Front-End Web Development",
      "Back-End Web Development",
      "Full-Stack Development",
      "Design for Developers",
    ],
  },
];

/** The degree, the relevant courses in groups, and the courses being taken now. */
export function Education(): ReactElement {
  const studying = items(education.currentlyStudying);
  return (
    <div>
      <div className="max-w-[680px]">
        <h3 className="m-0 text-[19px] leading-[1.4] font-semibold">{education.degree}</h3>
        <p className="text-ink-muted mt-1 mb-0 text-[16.5px]">{education.institution}</p>
      </div>

      <div className="mt-9 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h3 className="m-0 font-serif text-[22px] font-semibold">Relevant courses</h3>
        <p className="text-ink-muted m-0 text-[14px]">
          Completed with outstanding and excellent grades
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {COURSE_GROUPS.map((group) => (
          <div
            key={group.name}
            className="border-border bg-surface rounded-[16px] border px-[22px] py-5"
          >
            <h4 className="text-accent m-0 mb-2.5 text-[12.5px] font-semibold tracking-[0.08em] uppercase">
              {group.name}
            </h4>
            <ul className="m-0 list-none p-0">
              {group.courses.map((course) => (
                <li
                  key={course}
                  className="border-border border-t py-2 text-[15.5px] leading-[1.4]"
                >
                  {course}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="bg-accent-tint rounded-[16px] px-[22px] py-5">
          <h4 className="text-accent m-0 mb-2.5 flex items-center gap-2 text-[12.5px] font-semibold tracking-[0.08em] uppercase">
            <span
              aria-hidden="true"
              className="bg-accent inline-block h-[7px] w-[7px] rounded-full"
            />
            {education.currentlyStudyingLabel}
          </h4>
          <ul className="m-0 list-none p-0">
            {studying.map((course) => (
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
