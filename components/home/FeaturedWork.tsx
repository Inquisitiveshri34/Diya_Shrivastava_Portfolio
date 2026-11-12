import type { ReactElement } from "react";
import { ProjectCard } from "@/components/work/ProjectCard";
import { HomeContainer, HomeSection } from "@/components/home/HomeLayout";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";
import type { LoadedProject } from "@/lib/content";

/** Four featured cards in the order set by the project files (ClauseCheck, ChargebackLens, StreakForge, DeliverIQ). */
export function FeaturedWork({ projects }: { projects: LoadedProject[] }): ReactElement {
  return (
    <HomeSection>
      <HomeContainer>
        <Reveal>
          <h2 className="m-0 font-serif text-[26px] leading-[1.25] font-semibold tracking-[-0.01em] [text-wrap:wrap] lg:text-[32px]">
            Latest problems I&apos;ve worked on.
          </h2>
          <div className="mt-8 flex flex-col gap-5">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <p className="m-0 mt-8">
            <TextLink href="/work" className="text-[15.5px] font-semibold">
              All projects →
            </TextLink>
          </p>
        </Reveal>
      </HomeContainer>
    </HomeSection>
  );
}
