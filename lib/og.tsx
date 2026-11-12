import { readFile } from "node:fs/promises";
import path from "node:path";
import type { ReactElement } from "react";

// Shared layout for the 1200×630 link-preview images (app/**/opengraph-image.tsx).
// next/og cannot read CSS variables, so the colours are the hex values from the
// :root tokens in app/globals.css. tests/seo.spec.ts checks they still match.

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

export const OG_COLORS = {
  background: "#f5f7f2", // --background
  ink: "#23262b", // --ink
  inkMuted: "#5d626a", // --ink-muted
  accent: "#6c3e66", // --accent
} as const;

/** Descriptions from docs/content.md §10, one per project. Keys are the project slugs. */
export const PROJECT_DESCRIPTIONS: Readonly<Record<string, string>> = {
  clausecheck:
    "A RAG assistant for supplier contracts that cites the exact clause — and refuses when the contracts don't say. 93.5% recall@5.",
  chargebacklens:
    "Calibrated dispute-risk scoring that turns payment risk into allow, step-up or review decisions. ₹11.99L net savings.",
  deliveriq:
    "Urban delivery ETA prediction from traffic, weather and road data. 7.83-minute average error.",
  streakforge:
    "Fitness retention analytics that found an 81.2% drop-off at 7-day activation — and corrected an inflated churn figure.",
  healthops:
    "Descriptive hospital resource analysis of 4,926 synthetic patient records: ICU demand, oxygen use and bed occupancy.",
  parkease:
    "A full-stack parking app that checks every booking for overlapping reservations inside one database transaction.",
  craftbridge:
    "A mobile marketplace prototype connecting local artisans with buyers, with admin-approved sellers.",
};

export const SITE_DESCRIPTION =
  "Third-year CSE student building ML and GenAI systems people can rely on — calibrated risk models and RAG assistants that cite their sources.";

/** Returns the §10 description for a project, or throws so a missing entry fails the build. */
export function projectDescription(slug: string): string {
  const description = PROJECT_DESCRIPTIONS[slug];
  if (!description) throw new Error(`No preview description for project "${slug}" (lib/og.tsx)`);
  return description;
}

/** Literata SemiBold and Public Sans Regular, static instances built from the OFL variable fonts. */
export async function loadOgFonts() {
  const dir = path.join(process.cwd(), "assets", "fonts");
  const [literata, publicSans] = await Promise.all([
    readFile(path.join(dir, "Literata-SemiBold.ttf")),
    readFile(path.join(dir, "PublicSans-Regular.ttf")),
  ]);
  return [
    { name: "Literata", data: literata, weight: 600 as const, style: "normal" as const },
    { name: "Public Sans", data: publicSans, weight: 400 as const, style: "normal" as const },
  ];
}

export type PreviewMetric = { value: string; label?: string };

/** The preview card: monogram and name at the top, title and description, then an optional metric. */
export function PreviewCard({
  title,
  description,
  metric,
}: {
  title: string;
  description: string;
  metric?: PreviewMetric;
}): ReactElement {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "64px 80px",
        background: OG_COLORS.background,
        color: OG_COLORS.ink,
        fontFamily: "Public Sans",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            height: 60,
            border: `3px solid ${OG_COLORS.accent}`,
            borderRadius: 8,
            color: OG_COLORS.accent,
            fontFamily: "Literata",
            fontWeight: 600,
            fontSize: 22,
          }}
        >
          DS
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Literata",
            fontWeight: 600,
            fontSize: 30,
          }}
        >
          Diya Shrivastava
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
        <div
          style={{
            display: "flex",
            fontFamily: "Literata",
            fontWeight: 600,
            fontSize: 74,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 26,
            fontSize: 31,
            lineHeight: 1.4,
            color: OG_COLORS.inkMuted,
          }}
        >
          {description}
        </div>
      </div>

      {metric ? (
        <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginTop: 40 }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Literata",
              fontWeight: 600,
              fontSize: 58,
              color: OG_COLORS.accent,
            }}
          >
            {metric.value}
          </div>
          {metric.label ? (
            <div style={{ display: "flex", fontSize: 28, color: OG_COLORS.inkMuted }}>
              {metric.label}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
