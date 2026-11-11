// Scans public/media/ and writes lib/media-manifest.generated.ts (git-ignored).
// Runs before dev, build, lint, typecheck and the e2e tests (see package.json).
// Exits with code 1 and a clear message for anything that would break the site.
import fs from "node:fs";
import path from "node:path";
import { Thresholds, type MediaFile, type MediaManifest, Sidecar } from "../lib/schemas";

const ROOT = process.cwd();
const MEDIA = path.join(ROOT, "public", "media");
const OUT = path.join(ROOT, "lib", "media-manifest.generated.ts");
const CONTENT_WORK = path.join(ROOT, "content", "work");

const RESUME_LATEST = "resume/Diya_Shrivastava.pdf";
const RESUME_ARCHIVE = /^Diya_Shrivastava_(\d{4}-\d{2}-\d{2})\.pdf$/;
const TOP_LEVEL = new Set(["resume", "images", "videos", "documents", "data"]);
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);
const KEBAB_FILE = /^[a-z0-9][a-z0-9-]*\.[a-z0-9]+$/;

const errors: string[] = [];
const warnings: string[] = [];
const fail = (msg: string) => errors.push(msg);
const warn = (msg: string) => warnings.push(msg);

/** All files under public/media, as POSIX paths relative to public/media. Hidden files (.DS_Store) are ignored. */
function walk(dir: string, base = ""): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...walk(path.join(dir, entry.name), rel));
    else out.push(rel);
  }
  return out.sort();
}

function readSidecar(rel: string): Sidecar | undefined {
  const file = path.join(MEDIA, `${rel}.meta.json`);
  if (!fs.existsSync(file)) return undefined;
  let json: unknown;
  try {
    json = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    fail(`public/media/${rel}.meta.json: not valid JSON (${(e as Error).message})`);
    return undefined;
  }
  const parsed = Sidecar.safeParse(json);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      fail(`public/media/${rel}.meta.json: ${issue.path.join(".") || "(root)"}: ${issue.message}`);
    }
    return undefined;
  }
  return parsed.data;
}

function checkName(rel: string) {
  const base = path.posix.basename(rel);
  if (/\s/.test(rel)) fail(`public/media/${rel}: file names must not contain spaces`);
  if (!KEBAB_FILE.test(base) && !(rel === RESUME_LATEST || RESUME_ARCHIVE.test(base))) {
    fail(`public/media/${rel}: name must be lowercase with hyphens, e.g. fig-calibration.png`);
  }
}

function projectSlugs(): Set<string> {
  if (!fs.existsSync(CONTENT_WORK)) return new Set();
  return new Set(
    fs
      .readdirSync(CONTENT_WORK)
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, "")),
  );
}

function main() {
  if (!fs.existsSync(MEDIA)) {
    fail("public/media/ is missing. Add the résumé at public/media/resume/Diya_Shrivastava.pdf.");
    return finish();
  }

  // Résumé: the latest version is required.
  if (!fs.existsSync(path.join(MEDIA, RESUME_LATEST))) {
    fail(
      `Missing required file: public/media/${RESUME_LATEST}. The build cannot continue without the current résumé PDF.`,
    );
  }

  const files = walk(MEDIA);
  const slugs = projectSlugs();
  const sidecarFiles = files.filter((f) => f.endsWith(".meta.json"));
  const mediaFiles = files.filter((f) => !f.endsWith(".meta.json"));

  for (const rel of mediaFiles) {
    const [top, second] = rel.split("/");
    if (!TOP_LEVEL.has(top)) {
      fail(
        `public/media/${rel}: unexpected top-level folder "${top}". Use one of: ${[...TOP_LEVEL].join(", ")}.`,
      );
      continue;
    }
    checkName(rel);
    if (top === "images" || top === "videos") {
      if (second && !slugs.has(second)) {
        fail(`public/media/${rel}: "${second}" is not a project slug (see content/work/)`);
      }
    }
    if (
      top === "documents" &&
      second === "projects" &&
      rel.split("/")[2] &&
      !slugs.has(rel.split("/")[2])
    ) {
      fail(`public/media/${rel}: "${rel.split("/")[2]}" is not a project slug`);
    }
  }

  // Archived résumés: name must carry the date; sort newest first.
  const archive: { date: string; src: string }[] = [];
  for (const rel of mediaFiles.filter((f) => f.startsWith("resume/archive/"))) {
    const base = path.posix.basename(rel);
    const m = base.match(RESUME_ARCHIVE);
    if (!m) {
      fail(`public/media/${rel}: archived résumés must be named Diya_Shrivastava_YYYY-MM-DD.pdf`);
      continue;
    }
    archive.push({ date: m[1], src: `/media/${rel}` });
  }
  archive.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  // Images: every image needs a sidecar with alt text.
  const images: Record<string, MediaFile[]> = {};
  for (const rel of mediaFiles.filter((f) => f.startsWith("images/"))) {
    if (!IMAGE_EXT.has(path.posix.extname(rel).toLowerCase())) continue;
    const slug = rel.split("/")[1];
    const side = readSidecar(rel);
    if (!side?.alt || side.alt.trim() === "") {
      fail(
        `public/media/${rel}: image has no alt text. Add "alt" to public/media/${rel}.meta.json.`,
      );
      continue;
    }
    (images[slug] ??= []).push({
      src: `/media/${rel}`,
      alt: side.alt,
      caption: side.caption,
      title: side.title,
    });
  }

  // Videos: one demo per project; the poster is optional.
  const videos: MediaManifest["videos"] = {};
  for (const rel of mediaFiles.filter((f) => f.startsWith("videos/"))) {
    if (!rel.endsWith("/demo.mp4")) continue;
    const slug = rel.split("/")[1];
    const posterRel = `videos/${slug}/demo-poster.jpg`;
    const side = readSidecar(rel);
    videos[slug] = {
      src: `/media/${rel}`,
      poster: mediaFiles.includes(posterRel) ? `/media/${posterRel}` : undefined,
      externalUrl: side?.externalUrl,
    };
  }

  // Documents: certificates by cert slug; project documents by project slug.
  const certificates: Record<string, string> = {};
  const projectDocs: Record<string, { src: string; title: string }[]> = {};
  for (const rel of mediaFiles.filter((f) => f.startsWith("documents/"))) {
    if (!rel.toLowerCase().endsWith(".pdf")) continue;
    const parts = rel.split("/");
    if (parts[1] === "certificates" && parts.length === 3) {
      certificates[path.posix.basename(rel, ".pdf")] = `/media/${rel}`;
    } else if (parts[1] === "projects" && parts.length === 4) {
      const side = readSidecar(rel);
      (projectDocs[parts[2]] ??= []).push({
        src: `/media/${rel}`,
        title: side?.title ?? path.posix.basename(rel, ".pdf"),
      });
    }
  }

  // ChargebackLens thresholds: optional. Validated when present.
  let thresholds: MediaManifest["thresholds"] = null;
  const thresholdsFile = path.join(MEDIA, "data", "chargebacklens-thresholds.json");
  if (!fs.existsSync(thresholdsFile)) {
    warn(
      "public/media/data/chargebacklens-thresholds.json not found: the threshold explorer will show no data.",
    );
  } else {
    try {
      const parsed = Thresholds.safeParse(JSON.parse(fs.readFileSync(thresholdsFile, "utf8")));
      if (parsed.success) thresholds = parsed.data;
      else
        for (const issue of parsed.error.issues) {
          fail(
            `public/media/data/chargebacklens-thresholds.json: ${issue.path.join(".") || "(root)"}: ${issue.message}`,
          );
        }
    } catch (e) {
      fail(
        `public/media/data/chargebacklens-thresholds.json: not valid JSON (${(e as Error).message})`,
      );
    }
  }

  // Orphan sidecars: a sidecar with no file beside it is skipped with a warning.
  for (const side of sidecarFiles) {
    const target = side.slice(0, -".meta.json".length);
    if (!mediaFiles.includes(target)) {
      warn(
        `public/media/${side}: no file named ${path.posix.basename(target)} beside it, so it is skipped.`,
      );
    }
  }

  if (errors.length === 0) {
    const manifest: MediaManifest = {
      resume: { latest: `/media/${RESUME_LATEST}`, archive },
      images,
      videos,
      documents: { certificates, projects: projectDocs },
      thresholds,
    };
    fs.writeFileSync(
      OUT,
      `// Generated by scripts/build-media-manifest.ts. Do not edit. Git-ignored.\nimport type { MediaManifest } from "@/lib/schemas";\n\nexport const mediaManifest: MediaManifest = ${JSON.stringify(manifest, null, 2)};\n`,
    );
  }
  return finish();
}

function finish() {
  for (const w of warnings) console.warn(`media manifest warning: ${w}`);
  if (errors.length) {
    console.error("media manifest failed:");
    for (const e of errors) console.error(`  ${e}`);
    console.error(
      `\nThe site was not built. Fix the ${errors.length} problem(s) above and run again.`,
    );
    process.exit(1);
  }
  console.log(
    `media manifest written to ${path.relative(ROOT, OUT)}${warnings.length ? ` (${warnings.length} warning(s))` : ""}`,
  );
}

main();
