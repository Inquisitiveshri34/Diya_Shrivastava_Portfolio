"use client";

import { useState, type ReactElement } from "react";
import { timeline } from "@/content/data/timeline";

// "Elevation gained". Every number comes from timeline.ts: each row's counts are placed in the
// month the row ends (the month a milestone was completed), then summed up to a checkpoint.

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const KINDS = ["Projects", "Certifications", "Simulations"] as const;
type Kind = (typeof KINDS)[number];

type Milestone = { month: number; kind: Kind; n: number };

/** Month index as year * 12 + month, so months subtract cleanly. */
type MonthIndex = number;

/** "Feb–Mar 2026" → Mar 2026; "Sep 2026" → Sep 2026. Returns null for undated rows. */
function endMonth(when: string): MonthIndex | null {
  const m = when.match(/^(?:[A-Z][a-z]{2}–)?([A-Z][a-z]{2}) (\d{4})$/);
  if (!m) return null;
  const index = MONTHS.indexOf(m[1]);
  if (index < 0) return null;
  return Number(m[2]) * 12 + index;
}

function monthLabel(month: MonthIndex): string {
  return `${MONTHS[month % 12]} ${Math.floor(month / 12)}`;
}

const MILESTONES: Milestone[] = timeline.flatMap((row) => {
  const kinds = Object.entries(row.counts).filter(([, n]) => n !== undefined && n > 0);
  if (kinds.length === 0) return [];
  const month = endMonth(row.when);
  if (month === null) {
    throw new Error(`timeline row "${row.when}" has milestone counts but no month`);
  }
  return kinds.map(([kind, n]) => ({ month, kind: kind as Kind, n: n as number }));
});

/** Counts per kind for every milestone completed on or before `cutoff`. */
function totalsAt(cutoff: MonthIndex): Record<Kind, number> {
  const totals: Record<Kind, number> = { Projects: 0, Certifications: 0, Simulations: 0 };
  for (const m of MILESTONES) if (m.month <= cutoff) totals[m.kind] += m.n;
  return totals;
}

const sum = (t: Record<Kind, number>) => t.Projects + t.Certifications + t.Simulations;

/** The chart starts at January of the first year that has a milestone. */
const START: MonthIndex = Math.floor(Math.min(...MILESTONES.map((m) => m.month)) / 12) * 12;

const CHECKPOINTS = [
  { label: "Now", back: 0, asOf: "Now" },
  { label: "1 month", back: 1, asOf: "1 month ago" },
  { label: "3 months", back: 3, asOf: "3 months ago" },
  { label: "6 months", back: 6, asOf: "6 months ago" },
] as const;

// SVG geometry, matching the design's 868 × 230 viewBox.
const W = 868;
const BASE_Y = 200;
const TOP_Y = 20;
const X0 = 40;
const MONTH_X0 = 140;
const X1 = 850;

function pathFor(points: { x: number; y: number }[]): string {
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
}

/**
 * Axis: a 2024–25 baseline (zero), then every month from January of the first milestone year up
 * to Now, the current month. The baseline sits apart from the months, with a break mark between.
 */
export function ElevationChart({ now }: { now: MonthIndex }): ReactElement {
  const [picked, setPicked] = useState(0);
  const checkpoint = CHECKPOINTS[picked];
  const NOW: MonthIndex = Math.max(now, Math.max(...MILESTONES.map((m) => m.month)));
  const months: MonthIndex[] = Array.from({ length: NOW - START + 1 }, (_, i) => START + i);
  const cutoff = NOW - checkpoint.back;
  // Index 0 is the baseline; months follow it.
  const cutoffIndex = cutoff - START + 1;

  const totals = [0, ...months.map((m) => sum(totalsAt(m)))];
  const yMax = Math.max(10, Math.ceil(sum(totalsAt(NOW)) / 10) * 10);
  const yAt = (value: number) => BASE_Y - (value / yMax) * (BASE_Y - TOP_Y);
  const monthX = (k: number) => MONTH_X0 + (k * (X1 - MONTH_X0)) / Math.max(1, months.length - 1);
  const xOf = (i: number) => (i === 0 ? X0 : monthX(i - 1));

  const points = totals.map((value, i) => ({ x: xOf(i), y: yAt(value) }));
  const fullPath = pathFor(points);
  const activePoints = points.slice(0, cutoffIndex + 1);
  const activePath = pathFor(activePoints);
  const areaPath = `${activePath} L ${xOf(cutoffIndex)} ${BASE_Y} L ${X0} ${BASE_Y} Z`;
  const dot = points[cutoffIndex];

  const at = totalsAt(cutoff);
  const count = sum(at);
  // Milestones completed in the last full month before the checkpoint month.
  const gained = sum(totalsAt(cutoff - 1)) - sum(totalsAt(cutoff - 2));
  const asOfLabel = `${checkpoint.asOf}`;
  const note = `${count} milestones, as of ${monthLabel(cutoff)}.`;

  return (
    <section
      aria-labelledby="elevation-heading"
      className="border-border bg-surface rounded-[16px] border px-5 pt-[22px] pb-[18px] sm:px-[26px]"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h3
            id="elevation-heading"
            className="m-0 font-serif text-[21px] leading-[1.3] font-semibold"
          >
            Elevation gained
          </h3>
          <p className="text-ink-muted m-0 mt-0.5 text-[13.5px]">
            Milestones completed since 2024 — projects, certifications and simulations
          </p>
          <p aria-live="polite" className="m-0 mt-2 flex flex-wrap items-baseline gap-3 font-mono">
            <span className="border-ink border-b-[3px] border-double pb-px text-[34px] leading-[1.15] font-semibold">
              {count}
            </span>
            <span className="text-accent text-[14px] font-medium">
              ▲ +{gained} in the last month
            </span>
          </p>
        </div>
        <div
          role="group"
          aria-label="Choose a checkpoint"
          className="bg-band rounded-pill flex flex-wrap gap-1 p-1"
        >
          {CHECKPOINTS.map((cp, i) => {
            const on = i === picked;
            return (
              <button
                key={cp.label}
                type="button"
                aria-pressed={on}
                onClick={() => setPicked(i)}
                className={`rounded-pill min-h-[44px] cursor-pointer px-4 font-mono text-[13px] ${
                  on ? "bg-accent text-surface font-semibold" : "text-ink font-medium"
                }`}
              >
                {cp.label}
              </button>
            );
          })}
        </div>
      </div>

      <svg
        role="img"
        aria-label={`Milestones completed over time: ${count} as of ${monthLabel(cutoff)}`}
        viewBox={`0 0 ${W} 230`}
        className="mt-3.5 block h-auto w-full"
      >
        {[0, yMax / 2, yMax].map((v) => (
          <g key={v}>
            <line
              x1={X0}
              x2={X1}
              y1={yAt(v)}
              y2={yAt(v)}
              stroke="var(--border)"
              strokeDasharray={v === 0 ? undefined : "3 4"}
              opacity={v === 0 ? 1 : 0.6}
            />
            <text
              x={30}
              y={yAt(v) + 4}
              textAnchor="end"
              fontFamily="var(--font-mono-stack)"
              fontSize="11"
              fill="var(--ink-muted)"
            >
              {v}
            </text>
          </g>
        ))}
        <path
          d={fullPath}
          fill="none"
          stroke="var(--border)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path d={areaPath} fill="var(--accent-tint)" stroke="none" />
        <path
          d={activePath}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <line
          x1={dot.x}
          x2={dot.x}
          y1={TOP_Y}
          y2={BASE_Y}
          stroke="var(--accent)"
          strokeWidth="1"
          strokeDasharray="2 3"
          opacity="0.6"
        />
        <circle
          cx={dot.x}
          cy={dot.y}
          r="6"
          fill="var(--surface)"
          stroke="var(--accent)"
          strokeWidth="2.2"
        />
      </svg>

      <div aria-hidden="true" className="relative mt-[-24px] h-[18px]">
        {points.map((p, i) => (
          <span
            key={i}
            className={`text-ink-muted absolute -translate-x-1/2 font-mono text-[11px] whitespace-nowrap ${
              i === 0 || i % 2 === 1 ? "" : "hidden sm:block"
            }`}
            style={{ left: `${(p.x / W) * 100}%` }}
          >
            {i === 0 ? "2024–25" : MONTHS[months[i - 1] % 12]}
          </span>
        ))}
      </div>

      <p className="border-border mt-3.5 mb-0 border-t pt-3 text-[15px] leading-[1.5]">
        <span className="text-accent font-mono text-[13px] font-semibold">{asOfLabel}</span> —{" "}
        {note}
      </p>

      <dl className="mt-3 mb-0 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
        {KINDS.map((kind) => (
          <div
            key={kind}
            className="bg-surface border-border rounded-[16px] border px-[18px] py-3.5"
          >
            <dt className="text-ink-muted text-[14px]">{kind}</dt>
            <dd className="text-accent m-0 mt-0.5 font-mono text-[28px] font-semibold">
              {at[kind]}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
