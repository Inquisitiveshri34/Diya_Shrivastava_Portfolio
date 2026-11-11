import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { Post, Project } from "@/lib/schemas";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export class ContentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContentError";
  }
}

/**
 * Turns a zod error into lines that name the file and the field path, e.g.
 *   content/work/streakforge.mdx: metrics.0.context: Invalid input: expected string, received undefined
 */
export function formatZodError(file: string, error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const where = issue.path.length ? issue.path.join(".") : "(root)";
      return `${file}: ${where}: ${issue.message}`;
    })
    .join("\n");
}

function listMdx(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .sort()
    .map((f) => path.join(dir, f));
}

const relative = (file: string) => path.relative(process.cwd(), file);

export type LoadedProject = Project & { body: string };

/** Reads every project MDX file, validates the frontmatter, and returns them in display order. */
export function loadProjects(): LoadedProject[] {
  const problems: string[] = [];
  const projects: LoadedProject[] = [];

  for (const file of listMdx(path.join(CONTENT_ROOT, "work"))) {
    const { data, content } = matter(fs.readFileSync(file, "utf8"));
    const parsed = Project.safeParse(data);
    if (!parsed.success) {
      problems.push(formatZodError(relative(file), parsed.error));
      continue;
    }
    if (parsed.data.slug !== path.basename(file, ".mdx")) {
      problems.push(
        `${relative(file)}: slug: must match the file name (${path.basename(file, ".mdx")})`,
      );
      continue;
    }
    projects.push({ ...parsed.data, body: content });
  }

  if (problems.length) throw new ContentError(problems.join("\n"));
  return sortAndHideDrafts(projects);
}

/** Posts are built but hidden until one is published (SHOW_WRITING = false). */
export function loadPosts() {
  const problems: string[] = [];
  const posts: (z.infer<typeof Post> & { body: string })[] = [];
  for (const file of listMdx(path.join(CONTENT_ROOT, "writing"))) {
    const { data, content } = matter(fs.readFileSync(file, "utf8"));
    const parsed = Post.safeParse(data);
    if (!parsed.success) {
      problems.push(formatZodError(relative(file), parsed.error));
      continue;
    }
    posts.push({ ...parsed.data, body: content });
  }
  if (problems.length) throw new ContentError(problems.join("\n"));
  return posts
    .filter((p) => !(p.draft && process.env.NODE_ENV === "production"))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

function sortAndHideDrafts<T extends { order: number; draft: boolean }>(items: T[]): T[] {
  return items
    .filter((item) => !(item.draft && process.env.NODE_ENV === "production"))
    .sort((a, b) => a.order - b.order);
}

export function featuredProjects(): LoadedProject[] {
  return loadProjects().filter((p) => p.kind === "featured");
}

export function learningProjects(): LoadedProject[] {
  return loadProjects().filter((p) => p.kind === "learning");
}

export function getProject(slug: string): LoadedProject | undefined {
  return loadProjects().find((p) => p.slug === slug);
}
