import type { ReactElement, ReactNode } from "react";

/**
 * Vertical section wrapper. Space between sections is 112px on phones and
 * 160px on laptops (design-source.md, Style guide). The band variant adds the
 * muted sage background used for alternating sections.
 */
export function Section({
  id,
  band = false,
  className = "",
  children,
}: {
  id?: string;
  band?: boolean;
  className?: string;
  children: ReactNode;
}): ReactElement {
  return (
    <section id={id} className={`py-28 xl:py-40 ${band ? "bg-band" : ""} ${className}`}>
      {children}
    </section>
  );
}
