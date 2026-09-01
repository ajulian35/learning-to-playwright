import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  private get usernameInput() {
    return this.page.getByRole('textbox', { name: 'Username' });
  }

  private get passwordInput() {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  private get loginButton() {
    return this.page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    await this.page.goto('/web/index.php/auth/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
