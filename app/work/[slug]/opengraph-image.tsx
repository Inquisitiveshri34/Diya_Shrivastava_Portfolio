import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getProject, loadProjects } from "@/lib/content";
import { OG_CONTENT_TYPE, OG_SIZE, PreviewCard, loadOgFonts, projectDescription } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams(): { slug: string }[] {
  return loadProjects().map((project) => ({ slug: project.slug }));
}

type ImageProps = { params: Promise<{ slug: string }> };

/** Title, §10 description and the first card metric (featured projects only). */
export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const first = project.metrics?.[0];
  const metric = first ? { value: first.value, label: first.label } : undefined;

  return new ImageResponse(
    <PreviewCard title={project.name} description={projectDescription(slug)} metric={metric} />,
    { ...OG_SIZE, fonts: await loadOgFonts() },
  );
}
