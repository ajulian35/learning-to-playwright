# Playwright TypeScript - E2E Testing Framework (POM)

## Prerequisites

- Node.js 18+
- npm

---

## Installation

### 1. Initialize the project

```bash
npm init -y
```

### 2. Install dependencies

```bash
npm install --save-dev @playwright/test typescript ts-node dotenv
```

### 3. Install browsers

```bash
npx playwright install
```

Downloads Chromium, Firefox, and WebKit to `%LOCALAPPDATA%\ms-playwright\` (informational only).

### 4. Create `tsconfig.json`

Create `tsconfig.json` at the project root:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist",
    "moduleDetection": "force",
    "types": ["jest", "node"]
  },
  "include": ["*.ts", "tests/**/*.ts", "pages/**/*.ts"]
}
```

> Do not use `npx tsc --init` — it generates a config with `verbatimModuleSyntax` and `module: nodenext` that is incompatible with Playwright without additional configuration.

> The `include` covers both Jest tests (root) and Playwright files (`tests/`, `pages/`).

### 5. Create `tsconfig.playwright.json`

Dedicated configuration for Playwright compilation:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "types": ["node"]
  },
  "include": ["tests/**/*.ts", "pages/**/*.ts", "playwright.config.ts"]
}
```

### 6. Create the `.env` file at the repository root

The `.env` is global and shared across all projects in the repo:

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

> The file lives at the repository root (`../` relative to `typescript/`), not inside the project folder.

### 7. Configure Playwright

Create `playwright.config.ts` at the TypeScript project root:

```ts
import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export default defineConfig({
  testDir: './tests',
  tsconfig: './tsconfig.playwright.json',
  use: {
    browserName: 'chromium',
    headless: true,
    baseURL: 'https://opensource-demo.orangehrmlive.com',
  },
});
```

- `dotenv.config` loads the `.env` from the repo root before tests run
- `baseURL` centralizes the base URL; page objects use relative paths
- `tsconfig` points to the Playwright-specific configuration

---

## Project Structure (Full POM)

```
Learning_to_Playwright/
├── .env                          # Global environment variables (gitignored or not)
├── typescript/
│   ├── pages/                    # Page Object Models
│   │   ├── LoginPage.ts
│   │   └── AdminPage.ts
│   ├── tests/                    # Test files
│   │   ├── fixtures.ts           # Page object and credentials injection
│   │   └── search_admin.test.ts
│   ├── playwright.config.ts
│   ├── tsconfig.json
│   ├── tsconfig.playwright.json
│   └── package.json
```

---

## Record a new test with Codegen

```bash
npx playwright codegen
```

Save the generated code in `./tests/<name>.test.ts`.

## Running tests

```bash
npx playwright test
```

## Install from existing package.json

```bash
npm install
npx playwright install
```

---

## Full POM — Pattern Layers

### Golden rule

> A well-written POM test has no `new`, `process.env`, or direct imports from `@playwright/test` — only imports from `fixtures.ts` and calls to page object methods.

### Layer 1 — Page Objects (`pages/`)

Each page object has:
- **`private get`** for locators (named selectors, single place to update)
- **public methods** for actions (use getters internally)

#### `pages/LoginPage.ts`

```ts
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
```

#### `pages/AdminPage.ts`

```ts
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
```

> When adding a new test case: define the element's getter first, then use it in the method. Never use a selector directly inside an action.

---

### Layer 2 — Fixtures (`tests/fixtures.ts`)

`test.extend()` injects page objects as dependencies. The test receives them by name without knowing how they are created.

`requireEnv()` validates that environment variables exist before the test runs, throwing a descriptive error if one is missing.

```ts
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
```

---

### Layer 3 — Test (`tests/search_admin.test.ts`)

The test only contains business logic: what is being tested, not how it is configured.

```ts
import { test } from './fixtures';

test('Search admin users by Admin role', async ({ loginPage, adminPage, credentials }) => {
  await loginPage.goto();
  await loginPage.login(credentials.username, credentials.password);

  await adminPage.goto();
  await adminPage.filterByRole('Admin');
  await adminPage.search();
  await adminPage.verifyResultsFound();
});
```

---

## Adding a new test

1. If the page already has a page object: import its fixtures in the test
2. If it is a new page: create `pages/PageName.ts` with getters + methods, add it to `fixtures.ts`
3. The test only calls methods, never selectors directly
