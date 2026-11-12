import type { ReactElement } from "react";
import { figures } from "@/lib/media";

/**
 * A case-study figure, looked up in the media manifest by file name. The caption and alt text
 * come from the figure's .meta.json sidecar. Renders nothing until the PNG exists.
 */
export function Figure({ slug, name }: { slug: string; name: string }): ReactElement | null {
  const file = figures(slug).find((f) => f.src.endsWith(`/${name}`));
  if (!file) return null;
  return (
    <figure className="m-0 my-10">
      {/* The manifest knows the image's alt text; the size is not known at build time. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={file.src}
        alt={file.alt}
        loading="lazy"
        className="border-border bg-surface block h-auto w-full rounded-[16px] border"
      />
      {file.caption ? (
        <figcaption className="text-ink-muted mt-3 text-[15px] leading-[1.5]">
          {file.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
