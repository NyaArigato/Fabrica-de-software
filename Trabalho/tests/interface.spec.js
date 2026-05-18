const { test, expect } = require("@playwright/test");
const path = require("path");

function arquivo(nome) {
  return "file://" + path.resolve(__dirname, "../" + nome);
}

test.describe("Testes de interface - Sprint Track", () => {
  test("deve carregar a página inicial corretamente", async ({ page }) => {
    await page.goto(arquivo("index.html"));

    await expect(page).toHaveTitle(/Sprint Track/);
    await expect(page.locator("h1")).toContainText("Plataforma Informativa");
    await expect(page.locator("text=Começar")).toBeVisible();
    await expect(page.locator("text=Principais Recursos")).toBeVisible();
    await expect(page.locator("text=Trabalho em Equipe")).toBeVisible();
    await expect(page.locator("text=Acompanhamento")).toBeVisible();
  });

  test("deve acessar a página Sobre Nós", async ({ page }) => {
    await page.goto(arquivo("index.html"));

    await page.click("text=Sobre Nós");

    await expect(page.locator("h1")).toContainText("Sobre o Sprint Track");
  });

  test("deve acessar a página Recursos", async ({ page }) => {
    await page.goto(arquivo("index.html"));

    await page.click("text=Recursos");

    await expect(page.locator("h1")).toContainText("Recursos da Plataforma");
    await expect(page.locator("text=Gestão de Sprints")).toBeVisible();
    await expect(page.locator("text=Quadro Kanban")).toBeVisible();
    await expect(page.locator("text=Métricas Ágeis")).toBeVisible();
    await expect(page.locator("text=Dashboard Analítico")).toBeVisible();
  });

  test("deve acessar a página Blog", async ({ page }) => {
    await page.goto(arquivo("index.html"));

    await page.click("text=Blog");

    await expect(page.locator("h1")).toContainText("Blog & Novidades");
    await expect(page.locator("text=GitFlow")).toBeVisible();
    await expect(page.getByRole("heading", { name: /Monolito Modular/ })).toBeVisible();
  });

  test("deve acessar a página Contato", async ({ page }) => {
    await page.goto(arquivo("index.html"));

    await page.click("text=Contato");

    await expect(page.locator("h1")).toContainText("Fale Conosco");
    await expect(page.locator("input[type='text']")).toBeVisible();
    await expect(page.locator("input[type='email']")).toBeVisible();
    await expect(page.locator("textarea")).toBeVisible();
  });

  test("deve acessar a tela de login pelo botão Começar", async ({ page }) => {
    await page.goto(arquivo("index.html"));

    await page.click("text=Começar");

    await expect(page.locator("h1")).toContainText("Acessar Sprint Track");
    await expect(page.locator("input[type='email']")).toBeVisible();
    await expect(page.locator("input[type='password']")).toBeVisible();
  });
});