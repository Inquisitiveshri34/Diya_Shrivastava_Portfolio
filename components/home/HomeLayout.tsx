import type { ReactElement, ReactNode } from "react";

// Measured from docs/Diya-Portfolio-Design/html (Main and HomePhone) at 1280px and 390px.
// Sections: 56px top and bottom on phones, 80px on laptops. The closing band: 96px on laptops.
// Content is 1040px wide on laptops with no side padding, and 20px gutters on phones.

/** A full-width home section with the design's vertical padding. */
export function HomeSection({
  id,
  band = false,
  roomy = false,
  className = "",
  children,
}: {
  id?: string;
  band?: boolean;
  roomy?: boolean;
  className?: string;
  children: ReactNode;
}): ReactElement {
  return (
    <section
      id={id}
      className={`${roomy ? "py-14 lg:py-24" : "py-14 lg:py-20"} ${band ? "bg-band" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

/** The home content column: 1040px on laptops, 20px gutters on phones. */
export function HomeContainer({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}): ReactElement {
  return (
    <div className={`mx-auto w-full max-w-[1040px] px-5 lg:px-0 ${className}`}>{children}</div>
  );
}
