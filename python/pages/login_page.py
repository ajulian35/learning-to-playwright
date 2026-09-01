from playwright.sync_api import Page


class LoginPage:
    def __init__(self, page: Page):
        self._page = page

    @property
    def _username_input(self):
        return self._page.get_by_role('textbox', name='Username')

    @property
    def _password_input(self):
        return self._page.get_by_role('textbox', name='Password')

    @property
    def _login_button(self):
        return self._page.get_by_role('button', name='Login')

    def goto(self):
        self._page.goto('/web/index.php/auth/login')

    def login(self, username: str, password: str):
        self._username_input.fill(username)
        self._password_input.fill(password)
        self._login_button.click()
