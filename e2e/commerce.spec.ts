import { expect, test as base, type Page } from "@playwright/test";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const cartStorageKey = "headless-commerce-cart";
const themeStorageKey = "headless-commerce-theme";
type ThemeMode = "dark" | "light";

const test = base.extend<{ criticalConsoleErrors: void }>({
  criticalConsoleErrors: [
    async ({ page }, use) => {
      const errors: string[] = [];

      page.on("console", (message) => {
        if (message.type() === "error") {
          errors.push(message.text());
        }
      });

      await use();

      expect(errors, `Unexpected console.error calls:\n${errors.join("\n")}`).toEqual([]);
    },
    { auto: true },
  ],
});

async function installInitialBrowserState(page: Page, theme: ThemeMode = "light"): Promise<void> {
  await page.addInitScript(
    ({ cartKey, selectedTheme, themeKey }) => {
      const resetKey = "headless-commerce-e2e-reset";

      if (window.sessionStorage.getItem(resetKey)) {
        return;
      }

      window.localStorage.removeItem(cartKey);
      window.localStorage.setItem(themeKey, selectedTheme);
      window.sessionStorage.setItem(resetKey, "true");
    },
    { cartKey: cartStorageKey, selectedTheme: theme, themeKey: themeStorageKey },
  );
}

async function gotoHome(page: Page): Promise<void> {
  await page.goto(`${basePath}/`);
}

function pathPattern(path: string): RegExp {
  const escapedPath = path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  return new RegExp(`${escapedPath}/?$`);
}

async function expectTheme(page: Page, theme: ThemeMode): Promise<void> {
  const html = page.locator("html");

  if (theme === "dark") {
    await expect(html).toHaveClass(/dark/);
    return;
  }

  await expect(html).not.toHaveClass(/dark/);
}

async function setThemeWithToggle(page: Page, theme: ThemeMode): Promise<void> {
  const actionLabel = theme === "dark" ? "Attiva tema scuro" : "Attiva tema chiaro";
  const toggle = page.getByRole("button", { name: actionLabel });

  if (await toggle.isVisible()) {
    await toggle.click();
  }

  await expectTheme(page, theme);
}

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  await expect
    .poll(
      async () =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
        ),
      { message: "Expected the page to render without horizontal overflow." },
    )
    .toBe(true);
}

async function expectNoInternalLabels(page: Page): Promise<void> {
  await expect(page.locator("body")).not.toContainText(/Subtotale in centesimi|Hero price/);
}

test("shopper searches, filters, edits cart quantity, and completes mock checkout", async ({
  page,
}) => {
  await installInitialBrowserState(page);
  await gotoHome(page);

  await expect(page.getByRole("heading", { name: /Headless commerce statico/ })).toBeVisible();
  await expectNoInternalLabels(page);

  const footer = page.getByRole("contentinfo");
  await expect(footer.getByRole("link", { name: "Guide" })).toHaveAttribute(
    "href",
    `${basePath}/guide/`,
  );
  await expect(footer.getByRole("link", { name: "Coverage" })).toHaveAttribute(
    "href",
    `${basePath}/coverage/`,
  );
  await expect(footer.getByRole("link", { name: "Docs" })).toHaveAttribute(
    "href",
    `${basePath}/docs/`,
  );

  await page.getByRole("button", { name: "Attiva tema scuro" }).click();
  await expectTheme(page, "dark");

  await page.getByLabel("Cerca prodotti").fill("headset");
  await expect(page.getByText("1 prodotto trovato su 8")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Pulse ANC Focus Headset" })).toBeVisible();

  await page.getByRole("button", { name: "Audio" }).click();
  await expect(page.getByRole("heading", { name: "Pulse ANC Focus Headset" })).toBeVisible();

  await page.getByRole("link", { name: "Apri Pulse ANC Focus Headset" }).click();
  await expect(page.getByRole("heading", { name: "Pulse ANC Focus Headset" })).toBeVisible();

  await page.getByRole("button", { name: "Aggiungi Pulse ANC Focus Headset al carrello" }).click();
  await expect(page.getByRole("dialog", { name: "Carrello (1)" })).toBeVisible();

  await page.getByRole("button", { name: /Aumenta quantit. Pulse ANC Focus Headset/ }).click();
  await expect(page.getByRole("dialog", { name: "Carrello (2)" })).toBeVisible();

  await Promise.all([
    page.waitForURL(`**${basePath}/checkout/`),
    page.getByRole("link", { name: "Vai al checkout" }).click(),
  ]);
  await expect(page.getByRole("heading", { name: "Sessione Stripe simulata" })).toBeVisible();

  await page.getByRole("button", { name: /Paga in modalit. demo/ }).click();
  await expect(page.getByRole("heading", { name: "Checkout demo completato" })).toBeVisible();
});

test("persists dark mode preference and keeps toggle action labels accurate", async ({ page }) => {
  await gotoHome(page);
  await setThemeWithToggle(page, "light");

  await expectTheme(page, "light");
  await page.getByRole("button", { name: "Attiva tema scuro" }).click();

  await expectTheme(page, "dark");
  await expect(page.getByRole("button", { name: "Attiva tema chiaro" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );

  await page.reload();

  await expectTheme(page, "dark");
  await expect(page.getByRole("button", { name: "Attiva tema chiaro" })).toBeVisible();

  await page.getByRole("button", { name: "Attiva tema chiaro" }).click();

  await expectTheme(page, "light");
  await expect(page.getByRole("button", { name: "Attiva tema scuro" })).toHaveAttribute(
    "aria-pressed",
    "false",
  );
});

test("shows an empty search state and resets back to the full catalog", async ({ page }) => {
  await installInitialBrowserState(page);
  await gotoHome(page);

  await expect(page.getByText("8 prodotti trovati su 8 nel catalogo statico.")).toBeVisible();

  await page.getByLabel("Cerca prodotti").fill("query-senza-risultati");

  await expect(page.getByRole("heading", { name: "Nessun prodotto trovato" })).toBeVisible();
  await expect(page.getByText(/Prova una ricerca pi. ampia/)).toBeVisible();

  await page
    .getByRole("region", { name: "Filtri catalogo" })
    .getByRole("button", { name: "Reimposta filtri" })
    .click();

  await expect(page.getByLabel("Cerca prodotti")).toHaveValue("");
  await expect(page.getByText("8 prodotti trovati su 8 nel catalogo statico.")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Atlas Modular Desk Kit" })).toBeVisible();
});

test("surfaces the user guide with public navigation and report links", async ({ page }) => {
  await installInitialBrowserState(page);
  await gotoHome(page);

  await page.getByRole("contentinfo").getByRole("link", { name: "Guide" }).click();

  await expect(page).toHaveURL(pathPattern(`${basePath}/guide`));
  await expect(
    page.getByRole("heading", { name: /Come leggere e usare la demo commerce/ }),
  ).toBeVisible();
  await expectNoInternalLabels(page);

  const main = page.getByRole("main");
  await expect(main.getByRole("link", { name: "Demo homepage" })).toHaveAttribute(
    "href",
    `${basePath}/`,
  );
  await expect(main.getByRole("link", { name: "Engineering" })).toHaveAttribute(
    "href",
    `${basePath}/engineering/`,
  );
  await expect(main.getByRole("link", { name: "Coverage report" })).toHaveAttribute(
    "href",
    `${basePath}/coverage/`,
  );
  await expect(main.getByRole("link", { name: "TypeDoc docs" })).toHaveAttribute(
    "href",
    `${basePath}/docs/`,
  );
  await expect(main.getByRole("link", { name: "GitHub repository" })).toHaveAttribute(
    "href",
    /github\.com\/danielemasone\/headless-commerce/,
  );
});

test("surfaces engineering quality details and public report links", async ({ page }) => {
  await installInitialBrowserState(page);
  await gotoHome(page);

  await page.getByRole("contentinfo").getByRole("link", { name: "Engineering" }).click();

  await expect(page).toHaveURL(pathPattern(`${basePath}/engineering`));
  await expect(page.getByRole("heading", { name: /Qualit. tecnica visibile/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "Demo homepage" })).toHaveAttribute(
    "href",
    `${basePath}/`,
  );
  await expect(page.getByRole("link", { name: "GitHub Actions workflow" })).toHaveAttribute(
    "href",
    /github\.com\/danielemasone\/headless-commerce\/actions\/workflows\/ci-pages\.yml/,
  );
  await expect(page.getByRole("link", { name: "Coverage report" })).toHaveAttribute(
    "href",
    `${basePath}/coverage/`,
  );
  await expect(page.getByRole("link", { name: "TypeDoc docs" })).toHaveAttribute(
    "href",
    `${basePath}/docs/`,
  );
});

test("keeps the cart drawer accessible when closing and emptying the cart", async ({ page }) => {
  await installInitialBrowserState(page);
  await gotoHome(page);

  await page.getByRole("button", { name: "Aggiungi Atlas Modular Desk Kit al carrello" }).click();

  const openDrawer = page.getByRole("dialog", { name: "Carrello (1)" });
  await expect(openDrawer).toBeVisible();
  await expect(openDrawer).toHaveAttribute("aria-modal", "true");
  await expect(openDrawer).toContainText(/249,00\s\u20ac/);
  await expect(openDrawer).not.toContainText(/centesimi|24900/i);

  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Carrello (1)" })).toBeHidden();

  await page.getByRole("button", { name: /Apri carrello/ }).click();
  const reopenedDrawer = page.getByRole("dialog", { name: "Carrello (1)" });
  await expect(reopenedDrawer).toBeVisible();

  await reopenedDrawer
    .getByRole("button", { name: /Riduci quantit. Atlas Modular Desk Kit/ })
    .click();

  await expect(page.getByRole("dialog", { name: "Carrello (0)" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Il carrello . vuoto/ })).toBeVisible();
});

test("supports the core catalog and cart flow on mobile without horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ height: 844, width: 390 });
  await installInitialBrowserState(page);
  await gotoHome(page);

  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("link", { name: "HC" })).toBeVisible();
  await expect(page.getByRole("region", { name: "Filtri catalogo" })).toBeVisible();
  await expect(page.getByLabel("Cerca prodotti")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Atlas Modular Desk Kit" })).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await page.getByRole("button", { name: "Aggiungi Atlas Modular Desk Kit al carrello" }).click();

  const drawer = page.getByRole("dialog", { name: "Carrello (1)" });
  await expect(drawer).toBeVisible();
  await expect(drawer.getByRole("link", { name: "Vai al checkout" })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});
