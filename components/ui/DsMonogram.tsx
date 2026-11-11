import type { ReactElement } from "react";

type Size = "sm" | "md" | "lg";

const SIZES: Record<Size, { box: string; text: string }> = {
  sm: { box: "size-[26px]", text: "text-[10px]" },
  md: { box: "size-[34px]", text: "text-[13px]" },
  lg: { box: "size-[44px]", text: "text-[17px]" },
};

/**
 * The "DS" monogram: a double-bordered plum box with a serif "DS", tilted
 * slightly. Decorative only; the name next to it carries the meaning.
 */
export function DsMonogram({
  size = "md",
  className = "",
}: {
  size?: Size;
  className?: string;
}): ReactElement {
  const s = SIZES[size];
  return (
    <span
      aria-hidden="true"
      className={`border-accent text-accent inline-flex shrink-0 -rotate-3 items-center justify-center rounded-[5px] border-[3px] border-double font-serif font-semibold ${s.box} ${s.text} ${className}`}
    >
      DS
    </span>
  );
}
