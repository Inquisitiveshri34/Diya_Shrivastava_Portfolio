import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { Container } from "@/components/layout/Container";
import { AtAGlance } from "@/components/work/AtAGlance";
import { CaseStudyHeader } from "@/components/work/CaseStudyHeader";
import { DemoVideo } from "@/components/work/DemoVideo";
import { DocumentList } from "@/components/work/DocumentList";
import { PrevNextNav } from "@/components/work/PrevNextNav";
import { TableOfContents } from "@/components/work/TableOfContents";
import { CaseStudyBody, slugify, splitSections } from "@/lib/mdx";
import { featuredProjects, getProject, loadProjects } from "@/lib/content";
import { demoVideo } from "@/lib/media";
import { pageMetadata } from "@/lib/seo";

// Only the seven project files are pages. Any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return loadProjects().map((project) => ({ slug: project.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({ title: project.name, description: project.summary, path: `/work/${slug}` });
}

/** Youtube links come in several shapes; only the video id is needed for the no-cookie embed. */
function youtubeIdFrom(url: string | undefined): string | undefined {
  if (!url) return undefined;
  const match = url.match(/(?:youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{11})/);
  return match?.[1];
}

export default async function CaseStudyPage({ params }: PageProps): Promise<ReactElement> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const featured = project.kind === "featured";
  const sections = splitSections(project.body);
  const hasLimitations = sections.some((section) => slugify(section.title) === "limitations");
  const tocItems = [
    ...(featured ? [{ id: "glance", title: "At a glance" }] : []),
    ...sections.map((section) => ({ id: section.id, title: section.title })),
  ];

  const featuredList = featured ? featuredProjects() : [];
  const index = featuredList.findIndex((p) => p.slug === slug);
  const count = featuredList.length;
  const previous = featuredList[(index - 1 + count) % count];
  const next = featuredList[(index + 1) % count];

  const video = demoVideo(slug);

  return (
    <div className="pt-16 pb-28 lg:pt-20">
      <Container width="wide">
        <CaseStudyHeader project={project} />
        {video ? (
          <DemoVideo
            src={video.src}
            poster={video.poster}
            youtubeId={youtubeIdFrom(video.externalUrl)}
            title={project.name}
          />
        ) : null}
        {featured && project.glance ? (
          <AtAGlance
            rows={project.glance}
            note={project.glanceNote}
            hasLimitations={hasLimitations}
          />
        ) : null}
      </Container>

      <Container width="wide" className="mt-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-14">
          <article className="max-w-[720px] min-w-0">
            <CaseStudyBody slug={slug} source={project.body} />
            <DocumentList slug={slug} />
          </article>
          <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
            <TableOfContents items={tocItems} />
          </aside>
        </div>
      </Container>

      {featured && previous && next ? (
        <Container width="wide">
          <PrevNextNav previous={previous} next={next} />
        </Container>
      ) : null}
    </div>
  );
}
