import type { Metadata } from "next";

export const SITE_URL = "https://diya-shrivastava-portfolio.vercel.app";
export const SITE_NAME = "Diya Shrivastava";

export type PageMetaInput = {
  /** Page title without the site name, e.g. "Work". Use "" for the home page. */
  title: string;
  /** One-sentence description from docs/content.md (Search and sharing text). */
  description: string;
  /** Path from the site root, e.g. "/work". Used for the canonical URL. */
  path: string;
};

/**
 * Builds the Metadata for one page: title, description, canonical URL and
 * Open Graph. Every page calls this so titles and links stay consistent.
 */
export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const fullTitle = title ? `${title} · ${SITE_NAME}` : `${SITE_NAME} — Applied ML & GenAI`;
  const url = new URL(path, SITE_URL).toString();

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: "website",
    },
  };
}
