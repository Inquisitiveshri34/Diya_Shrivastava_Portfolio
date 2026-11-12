import type { ReactElement } from "react";
import { timeline } from "@/content/data/timeline";

// "The trail". Desktop: a dotted wave runs through the markers, alternating left and right, with
// the summit flag on 2028 at the top and the start flag on the oldest row. Phone: one column with
// a straight dotted line down the left. The "Before 2024" row is school detail, so it stays off.

const ROW_H = 120; // desktop row height, px. The wave is drawn in the same units.
const LEFT_X = 42; // marker position for text on the left, in percent of the trail width
const RIGHT_X = 52; // marker position for text on the right
const SUMMIT_X = 47;

export function TrailTimeline(): ReactElement {
  const rows = timeline
    .filter((row) => row.when !== "Before 2024")
    .slice()
    .reverse();
  const last = rows.length - 1;
  const height = rows.length * ROW_H;

  // Side of each row: row 0 (summit) and every odd row sit on the right, the rest on the left.
  const onRight = (i: number) => i === 0 || i % 2 === 1;
  const markerX = (i: number) => (i === 0 ? SUMMIT_X : onRight(i) ? RIGHT_X : LEFT_X);
  const centreY = (i: number) => i * ROW_H + ROW_H / 2;

  // One smooth S-curve from each marker to the next.
  const wave = rows.slice(1).reduce(
    (d, _, k) => {
      const i = k + 1;
      const x0 = markerX(i - 1);
      const y0 = centreY(i - 1);
      const x1 = markerX(i);
      const y1 = centreY(i);
      return `${d} C ${x0} ${y0 + ROW_H / 2}, ${x1} ${y1 - ROW_H / 2}, ${x1} ${y1}`;
    },
    `M ${markerX(0)} ${centreY(0)}`,
  );

  return (
    <ol className="relative m-0 mx-auto max-w-[920px] list-none p-0">
      <svg
        aria-hidden="true"
        className="absolute inset-0 hidden h-full w-full sm:block"
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
      >
        <path
          d={wave}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.4"
          strokeDasharray="0.5 8"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity="0.85"
        />
      </svg>
      <span
        aria-hidden="true"
        className="border-accent absolute top-0 bottom-0 left-[10px] border-l-2 border-dotted sm:hidden"
      />

      {rows.map((row, i) => {
        const isNow = row.when === "Now";
        const isSummit = i === 0 && row.when === "2028";
        const isStart = i === last;
        const right = onRight(i);
        const x = markerX(i);
        return (
          <li
            key={`${row.when}-${row.what}`}
            className="relative py-4 pl-[40px] sm:h-[120px] sm:py-0 sm:pl-0"
          >
            <div
              aria-hidden="true"
              className="absolute top-6 left-[10px] -translate-x-1/2 sm:top-1/2 sm:left-[var(--x)] sm:-translate-y-1/2"
              style={{ "--x": `${x}%` } as React.CSSProperties}
            >
              {isSummit ? (
                <svg width="40" height="36" viewBox="0 0 44 40">
                  <path
                    d="M3 36 L18 12 L24 21 L28 15 L41 36 Z"
                    fill="var(--background)"
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
                <svg width="30" height="32" viewBox="0 0 34 36">
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
                <span className="bg-accent ring-accent ring-offset-background block h-5 w-5 rounded-full ring-2 ring-offset-[3px]" />
              ) : (
                <span className="border-accent bg-background block h-[15px] w-[15px] rounded-full border-[2.5px]" />
              )}
            </div>

            <div
              className={`relative sm:absolute sm:top-1/2 sm:w-[36%] sm:-translate-y-1/2 ${
                right
                  ? "sm:left-[calc(var(--x)+26px)]"
                  : "sm:right-[calc(100%-var(--x)+26px)] sm:text-right"
              }`}
              style={{ "--x": `${x}%` } as React.CSSProperties}
            >
              <p className="text-accent m-0 flex flex-wrap items-center gap-2 font-mono text-[13.5px] font-semibold sm:justify-start">
                {row.when}
                {isNow ? (
                  <span className="bg-accent text-surface rounded-pill px-2.5 py-0.5 font-sans text-[12px] font-semibold">
                    Currently
                  </span>
                ) : null}
              </p>
              <p className="m-0 mt-0.5 text-[16.5px] leading-[1.5]">{row.what}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
