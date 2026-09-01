from playwright.sync_api import Page, expect


class AdminPage:
    def __init__(self, page: Page):
        self._page = page

    @property
    def _role_dropdown(self):
        return self._page.locator('.oxd-select-text--after').first

    @property
    def _search_button(self):
        return self._page.get_by_role('button', name='Search')

    @property
    def _results_container(self):
        return self._page.locator('#app')

    def goto(self):
        self._page.get_by_role('link', name='Admin').click()

    def filter_by_role(self, role: str):
        self._role_dropdown.click()
        self._page.get_by_role('option', name=role).click()

    def search(self):
        self._search_button.click()

    def verify_results_found(self):
        expect(self._results_container).to_contain_text('Record Found')
