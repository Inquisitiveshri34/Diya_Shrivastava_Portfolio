// Requests every external URL in content/ (including content/data) and fails on any error.
// Run with: npm run check:links
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "content");
const EXTENSIONS = new Set([".ts", ".tsx", ".mdx", ".md", ".json"]);
const URL_PATTERN = /https?:\/\/[^\s"'`<>()[\]{}]+/g;
const TIMEOUT_MS = 20_000;
const CONCURRENCY = 6;
// A generic client name. Some hosts reject unknown clients, so the message says what failed.
const USER_AGENT = "Mozilla/5.0 (compatible; portfolio-link-check)";

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return EXTENSIONS.has(path.extname(entry.name)) ? [full] : [];
  });
}

/** Every distinct external URL in the content files, with the files that mention it. */
export function collectUrls(): Map<string, string[]> {
  const found = new Map<string, string[]>();
  for (const file of walk(ROOT)) {
    const text = fs.readFileSync(file, "utf8");
    for (const match of text.matchAll(URL_PATTERN)) {
      // Trailing punctuation belongs to the sentence, not the URL.
      const url = match[0].replace(/[.,;:!?]+$/, "");
      const files = found.get(url) ?? [];
      const where = path.relative(process.cwd(), file);
      if (!files.includes(where)) files.push(where);
      found.set(url, files);
    }
  }
  return found;
}

async function status(url: string, method: "HEAD" | "GET"): Promise<number> {
  const response = await fetch(url, {
    method,
    redirect: "follow",
    headers: { "user-agent": USER_AGENT, accept: "*/*" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  await response.body?.cancel();
  return response.status;
}

/** HEAD first; some hosts refuse HEAD, so a failed HEAD is retried with GET. */
async function check(url: string): Promise<{ ok: boolean; detail: string }> {
  try {
    let code = await status(url, "HEAD");
    if (code >= 400) code = await status(url, "GET");
    return code < 400 ? { ok: true, detail: String(code) } : { ok: false, detail: `HTTP ${code}` };
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    return { ok: false, detail: `request failed: ${reason}` };
  }
}

async function main(): Promise<void> {
  const urls = collectUrls();
  const list = [...urls.keys()].sort();
  const failures: string[] = [];
  let next = 0;

  async function worker(): Promise<void> {
    while (next < list.length) {
      const url = list[next++];
      const result = await check(url);
      const mark = result.ok ? "ok  " : "FAIL";
      console.log(`${mark} ${result.detail.padEnd(6)} ${url}`);
      if (!result.ok) {
        failures.push(`${url}\n    ${result.detail}\n    used in: ${urls.get(url)?.join(", ")}`);
      }
    }
  }

  console.log(`Checking ${list.length} external URLs from content/`);
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  if (failures.length > 0) {
    console.error(`\n${failures.length} link(s) failed:\n${failures.join("\n")}`);
    process.exit(1);
  }
  console.log(`\nAll ${list.length} external links passed.`);
}

main();
