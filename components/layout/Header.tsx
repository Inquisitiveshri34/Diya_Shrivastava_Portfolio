import type { ReactElement } from "react";
import { HeaderMark } from "@/components/layout/HeaderMark";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NavLinks } from "@/components/layout/NavLinks";
import { Container } from "@/components/layout/Container";

/**
 * Sticky site header: the monogram and name on the left, navigation on the right.
 * On phones the navigation moves into a disclosure menu.
 */
export function Header(): ReactElement {
  return (
    <header className="border-border bg-background sticky top-0 z-40 border-b">
      <Container width="wide" className="relative flex h-16 items-center justify-between">
        <HeaderMark />
        <NavLinks label="Primary" className="hidden sm:flex" />
        <MobileMenu />
      </Container>
    </header>
  );
}
