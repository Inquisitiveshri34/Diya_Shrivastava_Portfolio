import type { ReactElement } from "react";
import { timeline } from "@/content/data/timeline";

/**
 * "The trail": the timeline newest first. The 2028 row carries the summit flag, the oldest
 * row shown carries the start flag and the Now row carries the "Currently" badge.
 * The "Before 2024" row is school detail, so it is left off About.
 */
export function TrailTimeline(): ReactElement {
  const rows = timeline
    .filter((row) => row.when !== "Before 2024")
    .slice()
    .reverse();
  const lastIndex = rows.length - 1;

  return (
    <ol className="m-0 mx-auto max-w-[920px] list-none p-0">
      {rows.map((row, i) => {
        const isNow = row.when === "Now";
        const isSummit = row.when === "2028";
        const isStart = i === lastIndex;
        return (
          <li
            key={`${row.when}-${row.what}`}
            className="relative grid min-h-[96px] grid-cols-[28px_1fr] gap-x-5 py-3 sm:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)] sm:gap-x-0 sm:py-5"
          >
            <span
              aria-hidden="true"
              className={`border-accent absolute top-0 bottom-0 left-[13px] w-0 border-l-2 border-dotted sm:left-1/2 ${
                i === 0 ? "top-1/2" : ""
              } ${isStart ? "bottom-1/2" : ""}`}
            />
            <div className="relative row-start-1 flex items-center justify-center sm:col-start-2">
              {isSummit ? (
                <svg width="40" height="36" viewBox="0 0 44 40" aria-hidden="true">
                  <path
                    d="M3 36 L18 12 L24 21 L28 15 L41 36 Z"
                    fill="var(--surface)"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 12 V2"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path d="M18 2.5 L28 6 L18 9.5 Z" fill="var(--accent)" />
                </svg>
              ) : isStart ? (
                <svg width="30" height="32" viewBox="0 0 34 36" aria-hidden="true">
                  <path
                    d="M17 33 V6"
                    stroke="var(--accent)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 4 H25 L30 9 L25 14 H8 Z"
                    fill="var(--accent-tint)"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : isNow ? (
                <span className="bg-accent ring-accent-tint h-5 w-5 rounded-full ring-[7px]" />
              ) : (
                <span className="border-accent bg-band h-[15px] w-[15px] rounded-full border-[2.5px]" />
              )}
            </div>
            <div
              className={`col-start-2 row-start-1 sm:row-start-1 ${i % 2 === 0 ? "sm:col-start-3" : "sm:col-start-1 sm:text-right"}`}
            >
              <p className="text-accent m-0 flex flex-wrap items-center gap-2 font-mono text-[13.5px] font-semibold sm:justify-end">
                {row.when}
                {isNow ? (
                  <span className="bg-accent text-surface rounded-pill px-2.5 py-0.5 font-sans text-[12px] font-semibold">
                    Currently
                  </span>
                ) : null}
              </p>
              <p className="m-0 mt-0.5 max-w-[360px] text-[16.5px] leading-[1.5] sm:ml-auto">
                {row.what}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
