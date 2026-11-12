import type { Metadata } from "next";
import type { ReactElement } from "react";
import { CertificationsTable } from "@/components/about/CertificationsTable";
import { ElevationChart } from "@/components/about/ElevationChart";
import { Education } from "@/components/about/Education";
import { Story } from "@/components/about/Story";
import { TrailTimeline } from "@/components/about/TrailTimeline";
import { Values } from "@/components/home/Values";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { TextLink } from "@/components/ui/TextLink";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: "I build machine-learning systems that are honest about what they know.",
  path: "/about",
});

export default function AboutPage(): ReactElement {
  return (
    <>
      <Section className="pt-24 pb-20 xl:pt-28">
        <Container width="reading">
          <h1 className="m-0 font-serif text-[40px] leading-[1.15] font-semibold tracking-[-0.015em] lg:text-[46px]">
            About
          </h1>
          <p className="m-0 mt-4 mb-10 font-serif text-[24px] leading-[1.35] font-semibold [text-wrap:balance] lg:text-[27px]">
            I build machine-learning systems that are honest about what they know.
          </p>
          <Story />
        </Container>
      </Section>

      <Section band>
        <Container width="wide">
          <h2 className="m-0 text-center font-serif text-[30px] leading-[1.25] font-semibold lg:text-[32px]">
            My path
          </h2>
          <p className="text-ink-muted m-0 mt-2 mb-10 text-center text-[16px]">
            The climb so far, then every step of the trail — newest first.
          </p>
          <div className="mx-auto mb-16 max-w-[920px]">
            <ElevationChart />
          </div>
          <TrailTimeline />
        </Container>
      </Section>

      <Values />

      <Section>
        <Container width="wide">
          <h2
            id="certifications"
            className="m-0 mb-7 font-serif text-[30px] leading-[1.25] font-semibold lg:text-[32px]"
          >
            Certifications
          </h2>
          <CertificationsTable />
        </Container>
      </Section>

      <Section band>
        <Container width="wide">
          <h2 className="m-0 mb-5 font-serif text-[30px] leading-[1.25] font-semibold lg:text-[32px]">
            Education
          </h2>
          <Education />
          <p className="mt-12 mb-0 text-[17px]">
            <TextLink href="/resume" inline>
              All résumé versions →
            </TextLink>
          </p>
        </Container>
      </Section>
    </>
  );
}
