"use client";

import { useLayoutEffect, useRef, type ReactElement, type ReactNode } from "react";

/**
 * Fade-and-rise once, when the block first scrolls into view (400ms).
 *
 * Without JavaScript the content is simply visible: nothing is hidden in the server HTML.
 * The "pending" state is set before the first paint, so content does not flash. Users who
 * prefer reduced motion never see the effect.
 */
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}): ReactElement {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    el.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset.reveal = "shown";
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-[400ms] ease-out data-[reveal=pending]:translate-y-2 data-[reveal=pending]:opacity-0 data-[reveal=shown]:translate-y-0 data-[reveal=shown]:opacity-100 ${className}`}
    >
      {children}
    </div>
  );
}
