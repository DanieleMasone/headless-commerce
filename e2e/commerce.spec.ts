import { expect, test } from "@playwright/test";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

test("shopper searches, filters, edits cart quantity, and completes mock checkout", async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("headless-commerce-theme", "light");
  });
  await page.goto(`${basePath}/`);

  await expect(page.getByRole("heading", { name: /Headless commerce statico/ })).toBeVisible();

  const footer = page.getByRole("contentinfo");
  await expect(footer.getByRole("link", { name: "Coverage" })).toHaveAttribute(
    "href",
    `${basePath}/coverage/`,
  );
  await expect(footer.getByRole("link", { name: "Docs" })).toHaveAttribute(
    "href",
    `${basePath}/docs/`,
  );

  await page.getByRole("button", { name: "Attiva tema scuro" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);

  await page.getByLabel("Cerca prodotti").fill("headset");
  await expect(page.getByText("1 prodotto trovato su 8")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Pulse ANC Focus Headset" })).toBeVisible();

  await page.getByRole("button", { name: "Audio" }).click();
  await expect(page.getByRole("heading", { name: "Pulse ANC Focus Headset" })).toBeVisible();

  await page.getByRole("link", { name: "Apri Pulse ANC Focus Headset" }).click();
  await expect(page.getByRole("heading", { name: "Pulse ANC Focus Headset" })).toBeVisible();

  await page.getByRole("button", { name: "Aggiungi Pulse ANC Focus Headset al carrello" }).click();
  await expect(page.getByRole("dialog", { name: "Carrello (1)" })).toBeVisible();

  await page.getByRole("button", { name: "Aumenta quantità Pulse ANC Focus Headset" }).click();
  await expect(page.getByRole("dialog", { name: "Carrello (2)" })).toBeVisible();

  await page.getByRole("link", { name: "Vai al checkout" }).click();
  await expect(page.getByRole("heading", { name: "Sessione Stripe simulata" })).toBeVisible();

  await page.getByRole("button", { name: "Paga in modalità demo" }).click();
  await expect(page.getByRole("heading", { name: "Checkout demo completato" })).toBeVisible();
});
