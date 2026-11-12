import type { ReactElement, ReactNode } from "react";

/**
 * A note, or a limitation callout (the Limitations section of every featured case study).
 * The limitation tint and ink come from the tokens in app/globals.css.
 */
export function Callout({
  type = "note",
  children,
}: {
  type?: "note" | "limitation";
  children: ReactNode;
}): ReactElement {
  const limitation = type === "limitation";
  return (
    <div
      data-callout={type}
      className={`my-8 rounded-r-[16px] border-l-[3px] p-6 ${
        limitation ? "bg-limit-tint border-limit-ink text-ink" : "bg-band border-accent"
      }`}
    >
      {children}
    </div>
  );
}
