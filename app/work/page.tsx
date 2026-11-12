import type { Metadata } from "next";
import type { ReactElement } from "react";
import { LearningProjects } from "@/components/work/LearningProjects";
import { LearningRecordTable } from "@/components/work/LearningRecordTable";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ProjectRow } from "@/components/work/ProjectRow";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { featuredProjects, learningProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Case studies in applied machine learning, GenAI and data analysis: contract question-answering, payment dispute risk, delivery-time prediction, retention analytics and more.",
  path: "/work",
});

export default function WorkPage(): ReactElement {
  const featured = featuredProjects();
  const learning = learningProjects();
  return (
    <Section className="pt-24 pb-28 xl:pt-28">
      <Container width="wide">
        <h1 className="m-0 font-serif text-[40px] leading-[1.15] font-semibold tracking-[-0.015em] lg:text-[46px]">
          Work
        </h1>
        <p className="text-ink-muted mt-3.5 mb-12 max-w-[680px] text-[19px] leading-[1.6]">
          Projects where I owned the path from raw data to something people could use.
        </p>

        <div className="flex flex-col gap-5">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-12">
          <LearningProjects count={learning.length}>
            <h2 className="m-0 font-serif text-[30px] leading-[1.25] font-semibold">
              Learning projects
            </h2>
            <p className="text-ink-muted mt-2.5 mb-6 max-w-[680px] text-[17px] leading-[1.6]">
              Smaller projects I built earlier in 2026 while learning. They&apos;re here as a record
              of how I got to the work above.
            </p>
            <div className="border-border border-b">
              {learning.map((project) => (
                <ProjectRow key={project.slug} project={project} />
              ))}
            </div>
          </LearningProjects>
        </div>

        <h2 className="m-0 mt-24 font-serif text-[30px] leading-[1.25] font-semibold">
          Learning record
        </h2>
        <p className="text-ink-muted mt-2.5 mb-6 max-w-[680px] text-[17px] leading-[1.6]">
          Job simulations I completed on Forage to practise real-world data problems.
        </p>
        <LearningRecordTable />
      </Container>
    </Section>
  );
}
