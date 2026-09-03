from playwright.sync_api import Page, Locator


class LoginPage:
    def __init__(self, page: Page):
        self._page = page
        self._username_input: Locator = page.get_by_role('textbox', name='Username')
        self._password_input: Locator = page.get_by_role('textbox', name='Password')
        self._login_button:   Locator = page.get_by_role('button',  name='Login')

    def goto(self):
        self._page.goto('/web/index.php/auth/login')

    def login(self, username: str, password: str):
        self._username_input.fill(username)
        self._password_input.fill(password)
        self._login_button.click()
