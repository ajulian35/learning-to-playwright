import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AdminPage } from '../pages/AdminPage';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Required environment variable not defined: ${name}`);
  return value;
}

type Fixtures = {
  loginPage: LoginPage;
  adminPage: AdminPage;
  credentials: { username: string; password: string };
};

export const test = base.extend<Fixtures>({
  credentials: async ({}, use) => {
    await use({
      username: requireEnv('ADMIN_USERNAME'),
      password: requireEnv('ADMIN_PASSWORD'),
    });
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  adminPage: async ({ page }, use) => {
    await use(new AdminPage(page));
  },
});

export { expect } from '@playwright/test';
