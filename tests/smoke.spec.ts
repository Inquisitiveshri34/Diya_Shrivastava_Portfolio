import { expect, test } from "@playwright/test";

const PHONE = "mobile-390";

test.describe("home page shell", () => {
  test("loads with the header, the placeholder heading and the footer", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Diya Shrivastava — Applied ML & GenAI/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("machine-learning systems");
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
