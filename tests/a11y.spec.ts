import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// WCAG 2.2 AA rules. Each page must report zero violations.
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

/**
 * Scroll through the page in steps so every Reveal section runs its fade, then wait until
 * every revealed block is fully opaque. Otherwise axe measures text that is still fading in.
 */
async function settleReveals(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 300) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForFunction(() =>
    Array.from(document.querySelectorAll("[data-reveal]")).every(
      (el) => getComputedStyle(el).opacity === "1",
    ),
  );
}

/** Parses rgb(), rgba(), oklab() and color(srgb ...) strings into [r, g, b, alpha] (0–255). */
function toSrgb(value: string): [number, number, number, number] | null {
  let m = value.match(/^rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)$/);
  if (m) return [Number(m[1]), Number(m[2]), Number(m[3]), m[4] === undefined ? 1 : Number(m[4])];
  m = value.match(/^color\(srgb ([\d.]+) ([\d.]+) ([\d.]+)(?: \/ ([\d.]+))?\)$/);
  if (m)
    return [
      Number(m[1]) * 255,
      Number(m[2]) * 255,
      Number(m[3]) * 255,
      m[4] === undefined ? 1 : Number(m[4]),
    ];
  m = value.match(/^oklab\(([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)(?:\s*\/\s*([\d.]+))?\)$/);
  if (m) {
    const [L, a, b] = [Number(m[1]), Number(m[2]), Number(m[3])];
    const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
    const mm = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
    const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
    const lin = [
      4.0767416621 * l - 3.3077115913 * mm + 0.2309699292 * s,
      -1.2684380046 * l + 2.6097574011 * mm - 0.3413193965 * s,
      -0.0041960863 * l - 0.7034186147 * mm + 1.707614701 * s,
    ];
    const gamma = (c: number) => {
      const v = Math.min(1, Math.max(0, c));
      return (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055) * 255;
    };
    return [gamma(lin[0]), gamma(lin[1]), gamma(lin[2]), m[4] === undefined ? 1 : Number(m[4])];
  }
  return null;
}

/** True when a colour is one of the tokens, allowing 2 units per channel for colour-space rounding. */
function isToken([r, g, b]: [number, number, number, number], tokens: number[][]): boolean {
  return tokens.some(
    ([tr, tg, tb]) => Math.abs(tr - r) <= 2 && Math.abs(tg - g) <= 2 && Math.abs(tb - b) <= 2,
  );
}

test("Home has zero axe violations", async ({ page }) => {
  await page.goto("/");
  await settleReveals(page);
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
});

test("the 404 page has zero axe violations", async ({ page }) => {
  await page.goto("/this-page-does-not-exist");
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
});

test("every colour on Home comes from a design token", async ({ page }) => {
  await page.goto("/");
  await settleReveals(page);

  // Token values as rgb triples, read from the CSS variables in app/globals.css.
  const tokens = await page.evaluate(() => {
    const style = getComputedStyle(document.documentElement);
    return [
      "--background",
      "--surface",
      "--band",
      "--border",
      "--ink",
      "--ink-muted",
      "--accent",
      "--accent-hover",
      "--accent-tint",
      "--limit-tint",
      "--limit-ink",
    ].map((name) => style.getPropertyValue(name).trim());
  });
  const toRgb = (hex: string): number[] => {
    const h = hex.replace("#", "");
    return [0, 2, 4].map((i) => Number.parseInt(h.slice(i, i + 2), 16));
  };
  const tokenRgb = [...tokens.map(toRgb), [255, 255, 255]]; // --surface is #ffffff

  // Every colour used by elements inside the page's own landmarks (not the dev overlay).
  const used = await page.evaluate(() => {
    const props = [
      "color",
      "background-color",
      "border-top-color",
      "border-right-color",
      "border-bottom-color",
      "border-left-color",
      "fill",
      "stroke",
    ];
    const found = new Map<string, string>();
    for (const el of Array.from(
      document.querySelectorAll("main, main *, header, header *, footer, footer *"),
    )) {
      const cs = getComputedStyle(el);
      for (const p of props) {
        const value = cs.getPropertyValue(p);
        if (["", "none", "transparent"].includes(value)) continue;
        // fill and stroke are inherited and only paint on SVG shapes.
        if ((p === "fill" || p === "stroke") && !(el instanceof SVGElement)) continue;
        if (!found.has(value))
          found.set(value, `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)} ${p}`);
      }
    }
    return Array.from(found, ([value, source]) => ({ value, source }));
  });

  const offPalette = used
    .map(({ value, source }) => ({ rgba: toSrgb(value), value, source }))
    .filter(({ rgba }) => rgba !== null && rgba[3] > 0 && !isToken(rgba, tokenRgb))
    .map(({ value, source }) => `${value}  (first seen on ${source})`);
  expect(offPalette, "colours that are not design tokens").toEqual([]);
});
