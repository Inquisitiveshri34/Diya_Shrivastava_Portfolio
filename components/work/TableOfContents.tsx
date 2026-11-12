"use client";

import type { ReactElement } from "react";
import { useEffect, useState } from "react";

export type TocItem = { id: string; title: string };

/**
 * "On this page": links to each section, with the section in view marked as current.
 * The page wraps it in a sticky aside that only shows at 1024px and up.
 */
export function TableOfContents({ items }: { items: TocItem[] }): ReactElement {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    // A section counts as current while its heading is in the upper part of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="border-border border-l pl-[18px] text-[14.5px]">
      <p className="text-ink-muted m-0 mb-2.5 text-[12.5px] font-semibold tracking-[0.08em] uppercase">
        On this page
      </p>
      <ul className="m-0 flex list-none flex-col gap-[7px] p-0">
        {items.map((item) => {
          const active = item.id === current;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                className={`no-underline hover:underline ${active ? "text-accent font-semibold" : "text-ink-muted"}`}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
