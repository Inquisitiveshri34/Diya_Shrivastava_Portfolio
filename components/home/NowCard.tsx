import type { ReactElement } from "react";
import { NOW } from "@/content/site";

// "Updated {month year}", fixed at build time (same method as the footer).
const UPDATED = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date());

/** "What I'm doing these days." Beside the hero on laptops; its own section on phones. */
export function NowCard({ className = "" }: { className?: string }): ReactElement {
  return (
    <aside
      className={`lg:rounded-card lg:border-border lg:bg-surface lg:border lg:p-[26px] ${className}`}
    >
      <h2 className="m-0 font-serif text-[22px] leading-[1.25] font-semibold [text-wrap:wrap]">
        {NOW.heading}
      </h2>
      <ul className="text-ink mt-4 mb-0 flex list-disc flex-col gap-2.5 pl-[18px] text-[15.5px]">
        {NOW.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="text-ink-muted m-0 mt-4 text-[13.5px]">Updated {UPDATED}</p>
    </aside>
  );
}
