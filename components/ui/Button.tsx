import Link from "next/link";
import type { ReactElement, ReactNode } from "react";

type Variant = "primary" | "secondary";

const BASE =
  "inline-flex min-h-[46px] items-center justify-center rounded-pill px-6 text-[15.5px] font-semibold no-underline transition-colors";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-accent text-surface hover:bg-accent-hover hover:text-surface",
  secondary: "border border-ink/20 text-ink hover:border-ink hover:text-ink",
};

type ButtonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & (
  | { href: string; type?: never; onClick?: never }
  | { href?: undefined; type?: "button" | "submit"; onClick?: () => void }
);

/** Pill button. Renders a link when given an href, otherwise a <button>. */
export function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: ButtonProps): ReactElement {
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`;
  if (rest.href !== undefined) {
    return (
      <Link href={rest.href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={rest.type ?? "button"} onClick={rest.onClick} className={classes}>
      {children}
    </button>
  );
}
