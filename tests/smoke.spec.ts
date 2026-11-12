import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";

const PHONE = "mobile-390";

test.describe("home page shell", () => {
  test("loads with the header, the placeholder heading and the footer", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Diya Shrivastava — Applied ML & GenAI/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("I build machine-learning");
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });

  test("the skip link is first in tab order and jumps to main", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });

  test("the footer shows contact links and the build-time date", async ({ page }) => {
    await page.goto("/");
    const footer = page.getByRole("contentinfo");
    await expect(footer.getByRole("link", { name: "diyashrivastava34@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:diyashrivastava34@gmail.com",
    );
    await expect(footer.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/Inquisitiveshri34",
    );
    await expect(footer.getByText(/Last updated: \w+ \d{4}/)).toBeVisible();
  });
});

test.describe("header mark", () => {
  test("is hidden on Home until the hero has scrolled away", async ({ page }) => {
    await page.goto("/");
    // The hero is still on screen, so the mark stays out of the accessibility tree.
    await expect(page.getByRole("link", { name: "Diya Shrivastava" })).toHaveCount(0);
    await expect(page.locator('header a[href="/"]')).toHaveAttribute("aria-hidden", "true");
  });

  test("is always visible on other routes (404 page)", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await expect(page.getByRole("link", { name: "Diya Shrivastava" }).first()).toBeVisible();
  });
});

test.describe("navigation", () => {
  test("desktop shows the nav links and hides the phone menu", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === PHONE, "desktop only");
    await page.goto("/");
    const primary = page.getByRole("navigation", { name: "Primary" });
    await expect(primary.getByRole("link", { name: "Work" })).toBeVisible();
    await expect(primary.getByRole("link", { name: "About" })).toBeVisible();
    await expect(primary.getByRole("link", { name: "Résumé" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Menu" })).toBeHidden();
  });

  test("phone menu opens and closes with the keyboard", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== PHONE, "phone only");
    await page.goto("/");
    const menuButton = page.getByRole("button", { name: "Menu" });
    const mobileNav = page.getByRole("navigation", { name: "Mobile" });

    await expect(mobileNav).toBeHidden();
    await menuButton.focus();
    await page.keyboard.press("Enter");
    await expect(menuButton).toHaveAttribute("aria-expanded", "true");
    await expect(mobileNav.getByRole("link", { name: "Work" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
    await expect(menuButton).toBeFocused();
    await expect(mobileNav).toBeHidden();
  });
});

test.describe("home page content", () => {
  test("the hero is visible with the headline and the availability badge", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/I'm Diya Shrivastava\./);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("people can rely on.");
    await expect(
      page.getByText("Open to AI/ML and Data Science internships — available now."),
    ).toBeVisible();
  });

  test("phone: the résumé button and the email link are in the viewport without scrolling", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== PHONE, "phone only");
    await page.goto("/");
    const viewport = page.viewportSize();
    for (const link of [
      page.getByRole("link", { name: "Download résumé" }),
      page.getByRole("link", { name: "Email", exact: true }),
    ]) {
      await expect(link).toBeInViewport();
      const box = await link.boundingBox();
      expect(box, "link has a box").not.toBeNull();
      expect(box!.y + box!.height).toBeLessThanOrEqual(viewport!.height);
    }
  });

  test("the résumé button opens the latest PDF in a new tab", async ({ page }) => {
    await page.goto("/");
    const resume = page.getByRole("link", { name: "Download résumé" });
    await expect(resume).toHaveAttribute("href", "/media/resume/Diya_Shrivastava.pdf");
    await expect(resume).toHaveAttribute("target", "_blank");
  });

  test("four featured cards appear in the order ClauseCheck, ChargebackLens, StreakForge, DeliverIQ", async ({
    page,
  }) => {
    await page.goto("/");
    const hrefs = await page
      .locator('main a[href^="/work/"]')
      .evaluateAll((links) => links.map((a) => a.getAttribute("href")));
    expect(hrefs).toEqual([
      "/work/clausecheck",
      "/work/chargebacklens",
      "/work/streakforge",
      "/work/deliveriq",
    ]);
  });

  test("no learning project appears on Home", async ({ page }) => {
    await page.goto("/");
    const text = await page.locator("main").innerText();
    for (const name of ["HealthOps", "ParkEase", "CraftBridge"]) {
      expect(text, `${name} must not appear on Home`).not.toContain(name);
    }
  });
});

test.describe("header mark on Home", () => {
  test("appears once the hero heading has scrolled away", async ({ page }) => {
    await page.goto("/");
    const mark = page.locator('header a[href="/"]');
    await expect(mark).toHaveAttribute("aria-hidden", "true");
    await page.evaluate(() => window.scrollTo({ top: 1200, behavior: "instant" }));
    await expect(mark).toHaveAttribute("aria-hidden", "false");
  });
});

const FEATURED = ["clausecheck", "chargebacklens", "streakforge", "deliveriq"];
const LEARNING = ["healthops", "parkease", "craftbridge"];

test.describe("work pages", () => {
  for (const slug of [...FEATURED, ...LEARNING]) {
    test(`/work/${slug} returns 200`, async ({ request }) => {
      const response = await request.get(`/work/${slug}`);
      expect(response.status()).toBe(200);
    });
  }

  test("an unknown slug returns the 404", async ({ request }) => {
    const response = await request.get("/work/not-a-project");
    expect(response.status()).toBe(404);
  });

  test("the learning section is closed on load and opens and closes with Enter and Space", async ({
    page,
  }) => {
    await page.goto("/work");
    // Located by aria-controls: the button's name changes when it opens.
    const toggle = page.locator('button[aria-controls="learning"]');
    await expect(toggle).toHaveText("Show 3 earlier learning projects");
    const region = page.locator("#learning");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(region).toBeHidden();
    await expect(page.getByRole("link", { name: "View project →" })).toHaveCount(0);

    await toggle.focus();
    await page.keyboard.press("Enter");
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(toggle).toHaveText("Hide learning projects");
    await expect(region).toBeVisible();
    await expect(page.getByRole("link", { name: "View project →" })).toHaveCount(3);

    await toggle.focus();
    await page.keyboard.press("Space");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(region).toBeHidden();
  });

  test("previous and next cycle through the four featured projects and wrap around", async ({
    page,
  }) => {
    const order: Record<string, [string, string]> = {
      clausecheck: ["deliveriq", "chargebacklens"],
      chargebacklens: ["clausecheck", "streakforge"],
      streakforge: ["chargebacklens", "deliveriq"],
      deliveriq: ["streakforge", "clausecheck"],
    };
    for (const [slug, [previous, next]] of Object.entries(order)) {
      await page.goto(`/work/${slug}`);
      const nav = page.getByRole("navigation", { name: "More projects" });
      await expect(nav.getByRole("link", { name: /Previous/ })).toHaveAttribute(
        "href",
        `/work/${previous}`,
      );
      await expect(nav.getByRole("link", { name: /Next/ })).toHaveAttribute(
        "href",
        `/work/${next}`,
      );
    }
  });

  test("learning pages have no At a glance and no previous / next", async ({ page }) => {
    for (const slug of LEARNING) {
      await page.goto(`/work/${slug}`);
      await expect(page.getByRole("heading", { name: "At a glance" })).toHaveCount(0);
      await expect(page.getByRole("navigation", { name: "More projects" })).toHaveCount(0);
    }
  });

  test("every featured case study shows its Limitations section in the callout", async ({
    page,
  }) => {
    for (const slug of FEATURED) {
      await page.goto(`/work/${slug}`);
      await expect(page.getByRole("heading", { name: "Limitations" })).toBeVisible();
      const callout = page.locator('[data-callout="limitation"]');
      await expect(callout).toHaveCount(1);
      await expect(callout.locator("li").first()).toBeVisible();
    }
  });

  test("the 誠 stamp is labelled, and the table of contents is only shown at 1024px and up", async ({
    page,
  }, testInfo) => {
    await page.goto("/work/clausecheck");
    const toc = page.getByRole("navigation", { name: "On this page" });
    if (testInfo.project.name === PHONE) {
      await expect(toc).toBeHidden();
    } else {
      await expect(toc).toBeVisible();
      await expect(page.getByRole("img", { name: "誠 (makoto) — sincerity" })).toBeVisible();
    }
  });
});

// ---------- PR 5: About, Résumé, 404 and the threshold explorer ----------

const THRESHOLDS_JSON = path.join(
  process.cwd(),
  "public/media/data/chargebacklens-thresholds.json",
);
const ARCHIVE_DIR = path.join(process.cwd(), "public/media/resume/archive");
const hasThresholds = existsSync(THRESHOLDS_JSON);

test.describe("about page", () => {
  test("renders the heading, the story and the My path band", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByRole("heading", { level: 1, name: "About" })).toBeVisible();
    await expect(
      page.getByText("I build machine-learning systems that are honest about what they know."),
    ).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "My path" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "Certifications" })).toBeVisible();
  });

  test("contains no robotics text and no school details", async ({ page }) => {
    await page.goto("/about");
    const text = (await page.locator("main").innerText()).toLowerCase();
    expect(text).not.toContain("robot");
    expect(text).not.toContain("cbse");
    expect(text).not.toContain("school education");
  });

  test("the ClauseCheck link in the story goes to its case study", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByRole("link", { name: "ClauseCheck" }).first()).toHaveAttribute(
      "href",
      "/work/clausecheck",
    );
  });

  test("the checkpoint buttons are a pressed group and the counts match timeline.ts", async ({
    page,
  }) => {
    await page.goto("/about");
    const group = page.getByRole("group", { name: "Choose a checkpoint" });
    const count = page.locator('[aria-live="polite"]').filter({ hasText: /^\d+$/ }).first();
    const expected: [string, string][] = [
      ["Now", "19"],
      ["1 month", "18"],
      ["3 months", "13"],
      ["6 months", "7"],
    ];
    for (const [label, total] of expected) {
      const button = group.getByRole("button", { name: label, exact: true });
      await button.click();
      await expect(button).toHaveAttribute("aria-pressed", "true");
      await expect(count).toHaveText(total);
    }
  });

  test("the trail is newest first, with the summit on 2028 and the Currently badge on Now", async ({
    page,
  }) => {
    await page.goto("/about");
    const whens = await page.locator("main ol > li p:first-child").allInnerTexts();
    expect(whens[0]).toBe("2028");
    expect(whens[1]).toMatch(/^Now/);
    expect(whens[whens.length - 1]).toBe("2024");
    await expect(page.getByText("Currently", { exact: true })).toBeVisible();
    await expect(page.getByText("Before 2024")).toHaveCount(0);
  });
});

test.describe("résumé page", () => {
  test("shows the latest PDF with a download button", async ({ page }) => {
    await page.goto("/resume");
    await expect(page.getByRole("heading", { level: 1, name: "Résumé" })).toBeVisible();
    const download = page.getByRole("link", { name: "Download PDF" }).last();
    await expect(download).toHaveAttribute("href", "/media/resume/Diya_Shrivastava.pdf");
  });

  test("phones show the download button and no preview", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== PHONE, "phone only");
    await page.goto("/resume");
    await expect(page.locator('object[aria-label="Latest résumé"]')).toBeHidden();
    await expect(page.getByRole("link", { name: "Download PDF" }).last()).toBeVisible();
  });

  test("earlier versions are listed newest first, or the heading is absent with no archive", async ({
    page,
  }) => {
    await page.goto("/resume");
    const archives = existsSync(ARCHIVE_DIR)
      ? readdirSync(ARCHIVE_DIR).filter((f) => /^Diya_Shrivastava_\d{4}-\d{2}-\d{2}\.pdf$/.test(f))
      : [];
    const heading = page.getByRole("heading", { name: "Earlier versions" });
    if (archives.length === 0) {
      await expect(heading).toHaveCount(0);
    } else {
      await expect(heading).toBeVisible();
      const labels = await page.locator("section ul li span").allInnerTexts();
      expect(labels).toHaveLength(archives.length);
      expect(labels[0]).toMatch(/^Version of \d{1,2} [A-Z][a-z]+ \d{4}$/);
    }
  });
});

test.describe("404 page", () => {
  test("says the page does not exist and links to Home, Work and About", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await expect(
      page.getByRole("heading", { level: 1, name: "This page doesn't exist — but these do:" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Home", exact: true })).toHaveAttribute(
      "href",
      "/",
    );
    await expect(
      page.locator("main").getByRole("link", { name: "Work", exact: true }),
    ).toHaveAttribute("href", "/work");
    await expect(
      page.locator("main").getByRole("link", { name: "About", exact: true }),
    ).toHaveAttribute("href", "/about");
  });
});

test.describe("threshold explorer", () => {
  test("shows the placeholder when the JSON is missing or invalid, and the explorer when it is valid", async ({
    page,
  }) => {
    await page.goto("/work/chargebacklens");
    const section = page.locator("section:has(> #try-the-thresholds-yourself)");
    if (!hasThresholds) {
      await expect(section.getByText("Interactive explorer coming soon")).toBeVisible();
      await expect(section.getByRole("slider")).toHaveCount(0);
    } else {
      await expect(section.getByRole("slider")).toHaveCount(2);
    }
  });

  test("works by keyboard alone when the JSON exists", async ({ page }) => {
    test.skip(!hasThresholds, "no thresholds JSON yet: placeholder is shown instead");
    await page.goto("/work/chargebacklens");
    const stepUp = page.getByRole("slider", { name: "Step-up threshold" });
    const review = page.getByRole("slider", { name: "Review threshold" });
    const live = page.locator('section:has(> #try-the-thresholds-yourself) [aria-live="polite"]');

    await stepUp.focus();
    const before = await live.innerText();
    await page.keyboard.press("ArrowRight");
    await expect(live).not.toHaveText(before);
    await expect(stepUp).toHaveAttribute(
      "aria-valuetext",
      /Step-up threshold .+ of transactions stepped up/,
    );

    // Pushing step-up to its maximum must keep review above it, compared as threshold values.
    const thresholdOf = async (slider: typeof stepUp) =>
      Number((await slider.getAttribute("aria-valuetext"))!.match(/threshold ([\d.]+)/)![1]);
    await page.keyboard.press("End");
    const stepValue = await thresholdOf(stepUp);
    await review.focus();
    await page.keyboard.press("Home");
    expect(await thresholdOf(review)).toBeGreaterThan(stepValue);

    await page.getByRole("button", { name: "Reset to chosen policy" }).focus();
    await page.keyboard.press("Enter");
    await expect(page.getByText("Chosen policy:")).toBeVisible();
    await expect(page.getByText("Computed on the held-out test period")).toBeVisible();
  });
});
