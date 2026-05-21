import { expect, test } from "@playwright/test";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

test("shopper filters products, adds to cart, edits quantity, and completes mock checkout", async ({
  page,
}) => {
  await page.goto(`${basePath}/`);

  await expect(page.getByRole("heading", { name: /Commerce frontend veloce/ })).toBeVisible();

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
