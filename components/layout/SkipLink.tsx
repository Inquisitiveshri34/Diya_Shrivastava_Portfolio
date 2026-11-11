import type { ReactElement } from "react";

/** First focusable element on every page. Hidden until it receives keyboard focus. */
export function SkipLink(): ReactElement {
  return (
    <a
      href="#main"
      className="rounded-pill bg-accent text-surface sr-only px-5 py-3 focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:no-underline"
    >
      Skip to content
    </a>
  );
}
