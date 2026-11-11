import Link from "next/link";
import type { ReactElement } from "react";
import { Container } from "@/components/layout/Container";
import { CONTACT, FOOTER_SIGN_OFF, NAV_LINKS } from "@/content/site";

// Evaluated once at build time, so the date is fixed in the static HTML.
const LAST_UPDATED = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date());

const LINK = "text-ink hover:text-accent";

/** Three columns: sign-off and date, contact, and page links. */
export function Footer(): ReactElement {
  return (
    <footer className="border-border bg-background mt-auto border-t py-12">
      <Container width="wide" className="grid gap-10 md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <p className="text-ink m-0 text-[15.5px]">{FOOTER_SIGN_OFF}</p>
          <p className="text-ink-muted m-0 text-[14px]">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="flex flex-col gap-2 text-[15.5px]">
          <a href={`mailto:${CONTACT.email}`} className={LINK}>
            {CONTACT.email}
          </a>
          <a href={CONTACT.github.href} className={LINK}>
            {CONTACT.github.label}
          </a>
          <a href={CONTACT.linkedin.href} className={LINK}>
            {CONTACT.linkedin.label}
          </a>
          <a href={CONTACT.leetcode.href} className={LINK}>
            {CONTACT.leetcode.label}
          </a>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2 text-[15.5px]">
          {NAV_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className={LINK}>
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
