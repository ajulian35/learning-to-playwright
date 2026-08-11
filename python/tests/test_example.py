from playwright.sync_api import Page


def test_titulo_pagina(page: Page):
    page.goto("https://playwright.dev")
    assert "Playwright" in page.title()


def test_navegar_docs(page: Page):
    page.goto("https://playwright.dev")
    page.get_by_role("link", name="Docs").first.click()
    assert page.url != "https://playwright.dev"
