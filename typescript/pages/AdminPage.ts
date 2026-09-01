import { Page, expect } from '@playwright/test';

export class AdminPage {
  constructor(private page: Page) {}

  private get roleDropdown() {
    return this.page.locator('.oxd-select-text--after').first();
  }

  private get searchButton() {
    return this.page.getByRole('button', { name: 'Search' });
  }

  private get resultsContainer() {
    return this.page.locator('#app');
  }

  async goto() {
    await this.page.getByRole('link', { name: 'Admin' }).click();
  }

  async filterByRole(role: string) {
    await this.roleDropdown.click();
    await this.page.getByRole('option', { name: role }).click();
  }

  async search() {
    await this.searchButton.click();
  }

  async verifyResultsFound() {
    await expect(this.resultsContainer).toContainText('Record Found');
  }
}
