// Validates every content file before the site builds. Runs as part of prebuild.
// Each problem is printed with its file name and field path, then the script exits with code 1.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { ContentError, formatZodError, loadPosts, loadProjects } from "../lib/content";
import * as schemas from "../lib/schemas";

const ROOT = process.cwd();
const problems: string[] = [];

function runSchemaCheck<T extends z.ZodType>(
  label: string,
  file: string,
  schema: T,
  value: unknown,
) {
  const parsed = schema.safeParse(value);
  if (!parsed.success)
    problems.push(formatZodError(file, parsed.error).replace(`${file}:`, `${file} (${label}):`));
}

async function main() {
  // 1. Project frontmatter (zod), including the file name rule.
  try {
    loadProjects();
  } catch (e) {
    if (e instanceof ContentError) problems.push(...e.message.split("\n"));
    else throw e;
  }

  // 2. Posts (none yet, but the schema must still hold).
  try {
    loadPosts();
  } catch (e) {
    if (e instanceof ContentError) problems.push(...e.message.split("\n"));
    else throw e;
  }

  // 3. Project bodies: compile each MDX file with next-mdx-remote/rsc. Syntax errors name the file.
  // Dynamic import: next-mdx-remote is ESM-only, and this script runs as CommonJS under tsx.
  const { compileMDX } = await import("next-mdx-remote/rsc");
  const workDir = path.join(ROOT, "content", "work");
  for (const f of fs.readdirSync(workDir).filter((x) => x.endsWith(".mdx"))) {
    const file = path.posix.join("content/work", f);
    const { content } = matter(fs.readFileSync(path.join(workDir, f), "utf8"));
    try {
      await compileMDX({ source: content });
    } catch (e) {
      problems.push(`${file}: MDX body does not compile: ${(e as Error).message.split("\n")[0]}`);
    }
  }

  // 4. Site data files (content/data/*.ts): validated with the same schemas as the types they export.
  const data = await Promise.all([
    import("../content/data/certifications"),
    import("../content/data/forage"),
    import("../content/data/timeline"),
    import("../content/data/values"),
    import("../content/data/toolkit"),
    import("../content/data/education"),
  ]);
  const [certs, forage, timeline, values, toolkit, education] = data;
  runSchemaCheck(
    "certifications",
    "content/data/certifications.ts",
    z.array(schemas.Certification),
    certs.certifications,
  );
  runSchemaCheck(
    "forageSimulations",
    "content/data/forage.ts",
    z.array(schemas.ForageSimulation),
    forage.forageSimulations,
  );
  runSchemaCheck(
    "timeline",
    "content/data/timeline.ts",
    z.array(schemas.TimelineRow),
    timeline.timeline,
  );
  runSchemaCheck("values", "content/data/values.ts", z.array(schemas.Value), values.values);
  runSchemaCheck(
    "approachSteps",
    "content/data/values.ts",
    z.array(schemas.ApproachStep),
    values.approachSteps,
  );
  runSchemaCheck(
    "toolkit",
    "content/data/toolkit.ts",
    z.array(schemas.ToolkitGroup),
    toolkit.toolkit,
  );
  runSchemaCheck("education", "content/data/education.ts", schemas.Education, education.education);

  if (problems.length) {
    console.error("content validation failed:");
    for (const p of problems) console.error(`  ${p}`);
    console.error(`\n${problems.length} problem(s). The site was not built.`);
    process.exit(1);
  }
  console.log("content validation passed: projects, posts, MDX bodies and site data.");
}

main();
