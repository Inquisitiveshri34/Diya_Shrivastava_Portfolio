import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SHOW_WRITING } from "@/content/site";
import { loadPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const WORDS_PER_MINUTE = 200;

/** Whole minutes to read a post body, never less than one. */
function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** "12 November 2026" from YYYY-MM-DD, read in UTC so the day cannot shift. */
function formatPostDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

// Hidden until SHOW_WRITING is true. With the flag off there are no static params, so every slug is a 404.
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return SHOW_WRITING ? loadPosts().map((post) => ({ slug: post.slug })) : [];
}

type PageProps = { params: Promise<{ slug: string }> };

function findPost(slug: string) {
  return loadPosts().find((post) => post.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = SHOW_WRITING ? findPost(slug) : undefined;
  if (!post) return {};
  return pageMetadata({ title: post.title, description: post.summary, path: `/writing/${slug}` });
}

export default async function WritingPostPage({ params }: PageProps): Promise<ReactElement> {
  if (!SHOW_WRITING) notFound();
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();

  return (
    <Section className="pt-24 pb-20 xl:pt-28">
      <Container width="reading">
        <p className="text-ink-muted text-[15px]">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          {" · "}
          {readingMinutes(post.body)} min read
        </p>
        <h1 className="mt-3 font-serif text-[46px] leading-[1.15] font-semibold tracking-[-0.015em]">
          {post.title}
        </h1>
        <p className="text-ink-muted mt-4 text-[19px] leading-[1.6]">{post.summary}</p>
        <div className="mt-10 text-[18px] leading-[1.65] [&_p]:m-0 [&_p+p]:mt-4">
          <MDXRemote source={post.body} />
        </div>
      </Container>
    </Section>
  );
}
