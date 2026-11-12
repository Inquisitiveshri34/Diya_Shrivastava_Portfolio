import type { ReactElement } from "react";
import { NOW } from "@/content/site";

// "Updated {month year}", fixed at build time (same method as the footer).
const UPDATED = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date());

/** "What I'm doing these days." Sits beside the hero on laptops, below it on phones. */
export function NowCard(): ReactElement {
  return (
    <aside className="rounded-card border-border bg-surface border p-6 sm:p-7">
      <h2 className="m-0 font-serif text-[22px] leading-[1.25] font-semibold">{NOW.heading}</h2>
      <ul className="text-ink mt-4 mb-0 flex list-disc flex-col gap-2.5 pl-[18px] text-[15.5px]">
        {NOW.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="text-ink-muted m-0 mt-4 text-[13.5px]">Updated {UPDATED}</p>
    </aside>
  );
}
