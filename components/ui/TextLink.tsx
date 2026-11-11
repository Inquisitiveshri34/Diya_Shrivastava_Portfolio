import Link from "next/link";
import type { ReactElement, ReactNode } from "react";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  /**
   * Standalone links (a line of their own) underline on hover.
   * In-sentence links stay underlined so readers can spot them in prose.
   */
  inline?: boolean;
  className?: string;
};

export function TextLink({
  href,
  children,
  inline = false,
  className = "",
}: TextLinkProps): ReactElement {
  const style = inline
    ? "underline underline-offset-[3px]"
    : "font-medium no-underline hover:underline underline-offset-[3px]";
  return (
    <Link href={href} className={`${style} ${className}`}>
      {children}
    </Link>
  );
}
