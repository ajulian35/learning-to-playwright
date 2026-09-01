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
npm install --save-dev @playwright/test typescript ts-node
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
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "sourceMap": true
  }
}
```

> Do not use `npx tsc --init` — it generates a config with `verbatimModuleSyntax` and `module: nodenext` that is incompatible with Playwright without additional configuration.

### 5. Configure Playwright

Create or update `playwright.config.ts` at the project root:

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    browserName: 'chromium',
    headless: true,
  },
});
```

---

### 6. Project structure (POM)

```
playwright_typescript/
├── pages/              # Page Object Models
│   └── LoginPage.ts
├── tests/              # Test files
│   └── login.spec.ts
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

## Record a new test

```bash
npx playwright codegen
```

## Save a recorded test

Save it in the `./tests` folder with the name `<name>.test.ts`.

## Running tests

```bash
# Run all tests
npx playwright test
```

---

## Install from existing package.json

```bash
npm install
npx playwright install
```

---

## Convert a test to POM format

The POM (Page Object Model) pattern separates UI interaction logic into reusable classes, keeping tests clean and focused on business logic.

### Example: `tests/search_admin.test.ts`

#### Step 1 — Create the `pages/` folder

```
playwright_typescript/
├── pages/
├── tests/
│   └── search_admin.test.ts
```

#### Step 2 — Create `pages/LoginPage.ts`

Encapsulates all actions on the login screen:

```ts
import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  async login(username: string, password: string) {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}
```

#### Step 3 — Create `pages/AdminPage.ts`

Encapsulates actions for the Admin module:

```ts
import { Page, expect } from '@playwright/test';

export class AdminPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.getByRole('link', { name: 'Admin' }).click();
  }

  async filterByRole(role: string) {
    await this.page.locator('.oxd-select-text--after').first().click();
    await this.page.getByRole('option', { name: role }).click();
  }

  async search() {
    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  async verifyResultsFound() {
    await expect(this.page.locator('#app')).toContainText('Record Found');
  }
}
```

#### Step 4 — Rewrite `tests/search_admin.test.ts`

```ts
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AdminPage } from '../pages/AdminPage';

test('Search admin users by Admin role', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const adminPage = new AdminPage(page);

  await loginPage.goto();
  await loginPage.login('admin', 'admin123');

  await adminPage.goto();
  await adminPage.filterByRole('Admin');
  await adminPage.search();
  await adminPage.verifyResultsFound();
});
```

#### Final structure

```
playwright_typescript/
├── pages/
│   ├── LoginPage.ts
│   └── AdminPage.ts
├── tests/
│   └── search_admin.test.ts
├── playwright.config.ts
├── tsconfig.json
└── package.json
```
