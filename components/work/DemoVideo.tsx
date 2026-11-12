"use client";

import type { ReactElement } from "react";
import { useState } from "react";

/**
 * A project's walkthrough video. An MP4 from public/media plays in place. A YouTube video loads
 * only when the reader clicks: until then no request goes to YouTube, and the embed uses the
 * no-cookie domain. Renders nothing when neither source exists.
 */
export function DemoVideo({
  src,
  poster,
  youtubeId,
  title,
}: {
  src?: string;
  poster?: string;
  youtubeId?: string;
  title: string;
}): ReactElement | null {
  const [playing, setPlaying] = useState(false);

  if (src) {
    return (
      <div className="my-10">
        <video
          controls
          preload="none"
          poster={poster}
          aria-label={`${title}: walkthrough video`}
          className="border-border bg-surface block w-full rounded-[16px] border"
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
    );
  }

  if (youtubeId) {
    return (
      <div className="my-10">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
            title={`${title}: walkthrough video on YouTube`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            className="aspect-video w-full rounded-[16px] border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="border-border bg-band hover:bg-accent-tint text-ink flex aspect-video w-full cursor-pointer items-center justify-center rounded-[16px] border"
          >
            <span className="text-accent font-semibold">
              Play the walkthrough video (loads YouTube) ▶
            </span>
          </button>
        )}
      </div>
    );
  }

  return null;
}
