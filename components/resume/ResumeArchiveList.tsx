import type { ReactElement } from "react";
import { archivedResumes } from "@/lib/media";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "2026-05-04" → "4 May 2026". */
function versionLabel(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  return `Version of ${day} ${MONTHS[month - 1]} ${year}`;
}

/** Earlier résumé versions, newest first. With no archive files, the heading is not shown. */
export function ResumeArchiveList(): ReactElement | null {
  const archive = archivedResumes();
  if (archive.length === 0) return null;
  return (
    <section aria-labelledby="earlier-versions">
      <h2
        id="earlier-versions"
        className="m-0 mb-4 font-serif text-[26px] leading-[1.25] font-semibold"
      >
        Earlier versions
      </h2>
      <ul className="border-border m-0 list-none border-b p-0">
        {archive.map((version) => (
          <li
            key={version.src}
            className="border-border flex items-center justify-between gap-4 border-t py-4"
          >
            <span className="text-[17px]">{versionLabel(version.date)}</span>
            <a
              href={version.src}
              download
              className="inline-flex min-h-[44px] items-center font-medium underline-offset-[3px] hover:underline"
            >
              Download
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
