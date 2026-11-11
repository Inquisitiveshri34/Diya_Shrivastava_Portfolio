import { mediaManifest } from "@/lib/media-manifest.generated";
import type { MediaFile, Thresholds } from "@/lib/schemas";

// Typed helpers over the media manifest. Pages call these and never read public/media directly.
// Missing files return nothing, so a component renders nothing rather than a broken link.

/** The current résumé, always public/media/resume/Diya_Shrivastava.pdf. */
export function latestResume(): string {
  return mediaManifest.resume.latest;
}

/** Earlier résumé versions, newest first. */
export function archivedResumes(): { date: string; src: string }[] {
  return mediaManifest.resume.archive;
}

/** Case-study figures for a project, in file-name order. */
export function figures(slug: string): MediaFile[] {
  return mediaManifest.images[slug] ?? [];
}

/** The cover image for a project card or OG image, if one exists. */
export function coverImage(slug: string): MediaFile | undefined {
  return figures(slug).find((f) => f.src.endsWith("/cover.png") || f.src.endsWith("/cover.jpg"));
}

/** The walkthrough video for a project, if one exists. */
export function demoVideo(
  slug: string,
): { src: string; poster?: string; externalUrl?: string } | undefined {
  return mediaManifest.videos[slug];
}

/** PDF documents attached to a project (reports, slides, write-ups). */
export function projectDocuments(slug: string): { src: string; title: string }[] {
  return mediaManifest.documents.projects[slug] ?? [];
}

/** Certificate PDF for a certification slug, if one exists. */
export function certificatePdf(certSlug: string): string | undefined {
  return mediaManifest.documents.certificates[certSlug];
}

/** ChargebackLens threshold grid and chosen policy, or null when the JSON is missing. */
export function thresholds(): Thresholds | null {
  return mediaManifest.thresholds;
}
