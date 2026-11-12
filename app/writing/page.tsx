import type { Metadata } from "next";
import Link from "next/link";
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

// Hidden until SHOW_WRITING is true (content/site.ts). Writing is not in docs/content.md §10 yet,
// so this description is a placeholder that stays out of the site while the flag is off.
export const metadata: Metadata = pageMetadata({
  title: "Writing",
  description: "TODO: Writing description (not in docs/content.md §10).",
  path: "/writing",
});

export default function WritingPage(): ReactElement {
  if (!SHOW_WRITING) notFound();
  const posts = loadPosts();

  return (
    <Section className="pt-24 pb-20 xl:pt-28">
      <Container width="reading">
        <h1 className="font-serif text-[46px] leading-[1.15] font-semibold tracking-[-0.015em]">
          Writing
        </h1>
        <ul className="mt-12 space-y-12">
          {posts.map((post) => (
            <li key={post.slug}>
              <p className="text-ink-muted text-[15px]">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                {" · "}
                {readingMinutes(post.body)} min read
              </p>
              <h2 className="mt-2 font-serif text-[28px] leading-[1.25]">
                <Link href={`/writing/${post.slug}`} className="text-accent underline">
                  {post.title}
                </Link>
              </h2>
              <p className="text-ink-muted mt-3 text-[18px] leading-[1.6]">{post.summary}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
