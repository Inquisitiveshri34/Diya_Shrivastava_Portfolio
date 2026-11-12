import type { ReactElement } from "react";
import { Button } from "@/components/ui/Button";
import { DsMonogram } from "@/components/ui/DsMonogram";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";
import { HomeSection } from "@/components/home/HomeLayout";
import { CONTACT } from "@/content/site";

// Content file, §2.8.
const HEADING = "Let's build something useful.";
const BODY =
  "I'm looking for a place where I can learn fast and contribute to problems that matter. If that sounds like your team, I'd love to hear from you.";

/** The closing band: monogram, heading, body and the contact buttons. */
export function ClosingContact(): ReactElement {
  return (
    <HomeSection band roomy>
      <div className="mx-auto flex w-full max-w-[680px] flex-col items-center gap-[18px] px-5 text-center lg:px-0">
        <Reveal className="flex flex-col items-center gap-[18px]">
          <DsMonogram size="lg" className="!size-[54px] !text-[18px]" />
          <h2 className="m-0 font-serif text-[28px] leading-[1.25] font-semibold tracking-[-0.01em] [text-wrap:wrap] lg:text-[34px]">
            {HEADING}
          </h2>
          <p className="text-ink-muted m-0 text-[18px]">{BODY}</p>
          <div className="mt-1.5 flex flex-wrap items-center justify-center gap-x-[22px] gap-y-4">
            <Button href={`mailto:${CONTACT.email}`}>Email me</Button>
            <TextLink href={CONTACT.github.href} className="text-[15.5px]">
              {CONTACT.github.label}
            </TextLink>
            <TextLink href={CONTACT.linkedin.href} className="text-[15.5px]">
              {CONTACT.linkedin.label}
            </TextLink>
          </div>
        </Reveal>
      </div>
    </HomeSection>
  );
}
