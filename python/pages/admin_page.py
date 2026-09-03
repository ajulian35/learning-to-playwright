from playwright.sync_api import Page, Locator, expect


class AdminPage:
    def __init__(self, page: Page):
        self._page = page
        self._role_dropdown:     Locator = page.locator('.oxd-select-text--after').first
        self._search_button:     Locator = page.get_by_role('button', name='Search')
        self._results_container: Locator = page.locator('#app')

    def goto(self):
        self._page.get_by_role('link', name='Admin').click()

    def filter_by_role(self, role: str):
        self._role_dropdown.click()
        self._page.get_by_role('option', name=role).click()

    def search(self):
        self._search_button.click()

    def verify_results_found(self):
        expect(self._results_container).to_contain_text('Record Found')
