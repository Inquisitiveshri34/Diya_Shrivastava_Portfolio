import type { Metadata } from "next";
import type { ReactElement } from "react";
import { ResumeArchiveList } from "@/components/resume/ResumeArchiveList";
import { ResumeViewer } from "@/components/resume/ResumeViewer";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Résumé",
  description: "Latest résumé and earlier versions.",
  path: "/resume",
});

export default function ResumePage(): ReactElement {
  return (
    <Section className="pt-24 pb-28 xl:pt-28">
      <Container width="wide">
        <h1 className="m-0 font-serif text-[40px] leading-[1.15] font-semibold tracking-[-0.015em] lg:text-[46px]">
          Résumé
        </h1>
        <p className="text-ink-muted mt-3.5 mb-12 max-w-[680px] text-[19px] leading-[1.6]">
          My latest résumé, plus earlier versions for reference.
        </p>
        <h2 className="m-0 mb-5 font-serif text-[26px] leading-[1.25] font-semibold">
          Latest version
        </h2>
        <ResumeViewer />
        <div className="mt-16">
          <ResumeArchiveList />
        </div>
      </Container>
    </Section>
  );
}
