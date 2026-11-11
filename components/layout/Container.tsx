import type { ReactElement, ReactNode } from "react";

type Width = "reading" | "wide";

const WIDTHS: Record<Width, string> = {
  reading: "max-w-[680px]",
  wide: "max-w-[1040px]",
};

/**
 * Centres content in a reading column (680px, prose) or a wide column
 * (1040px, project lists and figures). Side gutter is 20px on phones, 32px on desktop.
 */
export function Container({
  width = "reading",
  className = "",
  children,
}: {
  width?: Width;
  className?: string;
  children: ReactNode;
}): ReactElement {
  return (
    <div className={`mx-auto w-full px-5 sm:px-8 ${WIDTHS[width]} ${className}`}>{children}</div>
  );
}
