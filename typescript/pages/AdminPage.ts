import { Page, Locator, expect } from '@playwright/test';

export class AdminPage {
  private readonly roleDropdown: Locator;
  private readonly searchButton: Locator;
  private readonly resultsContainer: Locator;

  constructor(private page: Page) {
    this.roleDropdown     = page.locator('.oxd-select-text--after').first();
    this.searchButton     = page.getByRole('button', { name: 'Search' });
    this.resultsContainer = page.locator('#app');
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
