import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";

const SITE = "https://diya-shrivastava-portfolio.vercel.app";

// Titles and descriptions copied from docs/content.md §10. The test is the check that the
// pages still match that document, so it does not import the strings from the app.
const PAGES: { path: string; title: string; description: string; name: string }[] = [
  {
    path: "/",
    name: "Home",
    title: "Diya Shrivastava — Applied ML & GenAI",
    description:
      "Third-year CSE student building ML and GenAI systems people can rely on — calibrated risk models and RAG assistants that cite their sources.",
  },
  {
    path: "/work",
    name: "Work",
    title: "Work · Diya Shrivastava",
    description:
      "Case studies in applied machine learning, GenAI and data analysis: contract question-answering, payment dispute risk, delivery-time prediction, retention analytics and more.",
  },
  {
    path: "/about",
    name: "About",
    title: "About · Diya Shrivastava",
    description: "I build machine-learning systems that are honest about what they know.",
  },
  {
    path: "/resume",
    name: "Résumé",
    title: "Résumé · Diya Shrivastava",
    description: "Latest résumé and earlier versions.",
  },
  {
    path: "/work/clausecheck",
    name: "ClauseCheck",
    title: "ClauseCheck · Diya Shrivastava",
    description:
      "A RAG assistant for supplier contracts that cites the exact clause — and refuses when the contracts don't say. 93.5% recall@5.",
  },
  {
    path: "/work/chargebacklens",
    name: "ChargebackLens",
    title: "ChargebackLens · Diya Shrivastava",
    description:
      "Calibrated dispute-risk scoring that turns payment risk into allow, step-up or review decisions. ₹11.99L net savings.",
  },
  {
    path: "/work/deliveriq",
    name: "DeliverIQ",
    title: "DeliverIQ · Diya Shrivastava",
    description:
      "Urban delivery ETA prediction from traffic, weather and road data. 7.83-minute average error.",
  },
  {
    path: "/work/streakforge",
    name: "StreakForge",
    title: "StreakForge · Diya Shrivastava",
    description:
      "Fitness retention analytics that found an 81.2% drop-off at 7-day activation — and corrected an inflated churn figure.",
  },
  {
    path: "/work/healthops",
    name: "HealthOps",
    title: "HealthOps · Diya Shrivastava",
    description:
      "Descriptive hospital resource analysis of 4,926 synthetic patient records: ICU demand, oxygen use and bed occupancy.",
  },
  {
    path: "/work/parkease",
    name: "ParkEase",
    title: "ParkEase · Diya Shrivastava",
    description:
      "A full-stack parking app that checks every booking for overlapping reservations inside one database transaction.",
  },
  {
    path: "/work/craftbridge",
    name: "CraftBridge",
    title: "CraftBridge · Diya Shrivastava",
    description:
      "A mobile marketplace prototype connecting local artisans with buyers, with admin-approved sellers.",
  },
];

/** Absolute URL for a page. Home has no trailing slash, the form Next uses for the canonical link. */
function absoluteOf(relative: string): string {
  return relative === "/" ? SITE : new URL(relative, SITE).toString();
}

test.describe("titles, descriptions and canonicals (content.md §10)", () => {
  for (const page of PAGES) {
    test(`${page.name}: title, description and canonical`, async ({ page: browser }) => {
      await browser.goto(page.path);
      await expect(browser).toHaveTitle(page.title);
      await expect(browser.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        page.description,
      );
      await expect(browser.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        absoluteOf(page.path),
      );
      await expect(browser.locator('meta[property="og:title"]')).toHaveAttribute(
        "content",
        page.title,
      );
    });
  }
});

test.describe("link-preview images", () => {
  for (const page of PAGES) {
    test(`${page.name}: og:image is present and returns a 200 PNG`, async ({
      page: browser,
      request,
    }) => {
      await browser.goto(page.path);
      const og = browser.locator('meta[property="og:image"]');
      await expect(og).toHaveCount(1);
      const url = new URL((await og.getAttribute("content")) ?? "");
      // Production builds emit the site URL. `next dev` emits the local origin, so both are accepted.
      expect([new URL(SITE).origin, new URL(browser.url()).origin]).toContain(url.origin);
      // Request the same path on the server under test, not the production host.
      const response = await request.get(url.pathname + url.search);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("image/png");
      expect((await response.body()).byteLength).toBeGreaterThan(10_000);
    });
  }

  test("the preview colours match the :root tokens in globals.css", () => {
    const css = readFileSync(path.join(process.cwd(), "app/globals.css"), "utf8");
    const og = readFileSync(path.join(process.cwd(), "lib/og.tsx"), "utf8");
    const tokens: Record<string, string> = {
      "--background": "background",
      "--ink": "ink",
      "--ink-muted": "inkMuted",
      "--accent": "accent",
    };
    for (const [token, key] of Object.entries(tokens)) {
      const cssValue = css.match(new RegExp(`${token}:\\s*(#[0-9a-fA-F]{6})`))?.[1];
      const ogValue = og.match(new RegExp(`${key}:\\s*"(#[0-9a-fA-F]{6})"`))?.[1];
      expect(cssValue, `${token} in globals.css`).toBeTruthy();
      expect(ogValue?.toLowerCase(), `${key} in lib/og.tsx`).toBe(cssValue?.toLowerCase());
    }
  });
});

function jsonLdOf(html: string): Record<string, unknown>[] {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  return blocks.map((match) => JSON.parse(match[1]) as Record<string, unknown>);
}

test.describe("structured data", () => {
  test("Home has a valid Person object", async ({ request }) => {
    const html = await (await request.get("/")).text();
    const person = jsonLdOf(html).find((item) => item["@type"] === "Person");
    expect(person, "Person JSON-LD on Home").toBeTruthy();
    expect(person).toMatchObject({
      "@context": "https://schema.org",
      name: "Diya Shrivastava",
      url: SITE,
      email: "diyashrivastava34@gmail.com",
      sameAs: [
        "https://github.com/Inquisitiveshri34",
        "https://www.linkedin.com/in/diyashrivastava34",
      ],
      alumniOf: { "@type": "CollegeOrUniversity", name: "Lovely Professional University" },
    });
  });

  test("a case study has a valid CreativeWork object", async ({ request }) => {
    const html = await (await request.get("/work/streakforge")).text();
    const work = jsonLdOf(html).find((item) => item["@type"] === "CreativeWork");
    expect(work, "CreativeWork JSON-LD on StreakForge").toBeTruthy();
    expect(work).toMatchObject({
      "@context": "https://schema.org",
      name: "StreakForge",
      url: `${SITE}/work/streakforge`,
      author: { "@type": "Person", name: "Diya Shrivastava" },
    });
  });
});

test.describe("sitemap, robots and third-party scripts", () => {
  test("sitemap lists every public page and no Writing while the flag is off", async ({
    request,
  }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    const expected = PAGES.map((page) => absoluteOf(page.path));
    expect([...locs].sort()).toEqual([...expected].sort());
    expect(locs.some((loc) => loc.includes("/writing"))).toBe(false);
  });

  test("robots.txt links to the sitemap", async ({ request }) => {
    const text = await (await request.get("/robots.txt")).text();
    expect(text).toContain(`Sitemap: ${SITE}/sitemap.xml`);
  });

  test("every script on the page is same-origin (Vercel Analytics is the only one)", async ({
    page,
  }) => {
    await page.goto("/");
    const pageOrigin = new URL(page.url()).origin;
    const sources = await page
      .locator("script[src]")
      .evaluateAll((nodes) => nodes.map((node) => (node as HTMLScriptElement).src));
    expect(sources.length).toBeGreaterThan(0);
    // The page's own origin, plus Vercel Analytics' debug script in `next dev` (its only third-party host).
    const allowed = [pageOrigin, "https://va.vercel-scripts.com"];
    for (const src of sources) {
      expect(allowed, src).toContain(new URL(src).origin);
    }
  });
});
