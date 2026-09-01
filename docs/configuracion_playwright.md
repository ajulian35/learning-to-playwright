# Project Setup with Playwright

Installation and configuration guide for all three languages in the training plan: **TypeScript**, **Python**, and **C#**. Test execution performance is equivalent across all three because they all communicate with the same Playwright engine via an internal protocol.

---

## ✅ Common Prerequisites

Before setting up any language, verify the system has the following installed:

| Tool | Minimum version | Verify with |
| :--- | :---: | :--- |
| **Node.js** | 18+ | `node --version` |
| **Python** | 3.8+ | `python --version` |
| **.NET SDK** | 8+ | `dotnet --version` |
| **Git** | any | `git --version` |
| **VS Code** | any | — |

> **PowerShell** must also be available (`pwsh --version`) for browser installation in C#.

---

## 🟦 1. TypeScript with `@playwright/test`

### Current project state
The `typescript/` directory already has Jest + TypeScript configured for Module 1 (fundamentals). Playwright has its own test runner (`@playwright/test`) that **replaces Jest** for UI tests.

### Step 1 — Install dependencies

From the `typescript/` folder:

```bash
npm install -D @playwright/test
```

> This adds `@playwright/test` to `package.json`. The rest of the dependencies (typescript, tsx, etc.) are already installed.

### Step 2 — Install browsers

```bash
npx playwright install
```

Downloads Chromium, Firefox, and WebKit. To install only one:

```bash
npx playwright install chromium
```

### Step 3 — Create the config file

Create `typescript/playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 1,
  reporter: 'html',

  use: {
    headless: false,
    slowMo: 500,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
```

### Step 4 — Update `tsconfig.json`

Add Playwright types to `compilerOptions`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist",
    "moduleDetection": "force",
    "types": ["jest", "node", "@playwright/test"]
  },
  "include": ["*.ts", "tests/**/*.ts"]
}
```

### Step 5 — Update `package.json`

Add Playwright scripts alongside the existing ones:

```json
{
  "scripts": {
    "start": "tsx modulo1_basico.ts",
    "test:unit": "jest",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:report": "playwright show-report"
  }
}
```

### Step 6 — Create the tests folder and an initial test

```
typescript/
└── tests/
    └── example.spec.ts
```

```typescript
// tests/example.spec.ts
import { test, expect } from '@playwright/test';

test('home page loads correctly', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await expect(page).toHaveTitle(/Playwright/);
});
```

### Step 7 — Run the tests

```bash
# Run all E2E tests
npm run test:e2e

# Run with graphical UI mode
npm run test:e2e:ui

# View HTML report with results
npm run test:e2e:report
```

---

## 🐍 2. Python with `pytest-playwright`

### Current project state
The `python/` directory already has `pytest.ini` configured with `--headed` and `--slowmo=500`. You only need to install the packages and browsers.

### Step 1 — Create a virtual environment (recommended)

```bash
# From the project root
python -m venv .venv

# Activate on Windows
.venv\Scripts\activate

# Activate on macOS/Linux
source .venv/bin/activate
```

### Step 2 — Install dependencies

```bash
pip install playwright pytest-playwright
```

### Step 3 — Install browsers

```bash
playwright install
```

To install only Chromium:

```bash
playwright install chromium
```

### Step 4 — Verify `pytest.ini`

The file already exists in `python/pytest.ini`. Current content:

```ini
[pytest]
testpaths = tests
addopts = --headed --slowmo=500
```

Available options to extend:

```ini
[pytest]
testpaths = tests
addopts =
    --headed
    --slowmo=500
    --screenshot=only-on-failure
    --video=retain-on-failure
    --html=reports/report.html
    --self-contained-html
```

> For the HTML report you need to install: `pip install pytest-html`

### Step 5 — Create the tests folder and an initial test

```
python/
└── tests/
    ├── __init__.py       (empty file, required for pytest to recognize the package)
    └── test_example.py
```

```python
# tests/test_example.py
from playwright.sync_api import Page, expect

def test_home_page_loads(page: Page):
    page.goto("https://playwright.dev")
    expect(page).to_have_title(re.compile("Playwright"))
```

> `page` is a **fixture** injected automatically by `pytest-playwright`. No need to create the browser manually.

### Step 6 — Run the tests

```bash
# From the python/ folder
pytest

# Single file
pytest tests/test_example.py

# By specific test name
pytest -k "test_home_page_loads"

# Headless mode
pytest --headed=false
```

---

## 🟣 3. C# with `Microsoft.Playwright.NUnit`

### Current project state
The `csharp/` directory already has `Microsoft.Playwright.NUnit` 1.61.0 in the `.csproj`. You only need to build and install the browsers.

### Step 1 — Build the project

```bash
# From the csharp/ folder
dotnet build
```

Restores NuGet packages and compiles the project.

### Step 2 — Install browsers

Playwright for .NET includes a PowerShell script for browser installation. Run **after building**:

```powershell
pwsh bin/Debug/net9.0/playwright.ps1 install
```

To install only Chromium:

```powershell
pwsh bin/Debug/net9.0/playwright.ps1 install chromium
```

> If `pwsh` is not available, install PowerShell with: `winget install Microsoft.PowerShell`

### Step 3 — Create a config file (optional but recommended)

Create `csharp/.runsettings` to control test behavior:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>
  <Playwright>
    <BrowserName>chromium</BrowserName>
    <LaunchOptions>
      <Headless>false</Headless>
      <SlowMo>500</SlowMo>
    </LaunchOptions>
  </Playwright>
</RunSettings>
```

### Step 4 — Create an initial test

```csharp
// Tests/ExampleTest.cs
using Microsoft.Playwright.NUnit;
using NUnit.Framework;

namespace PlaywrightTests;

[TestFixture]
public class ExampleTest : PageTest
{
    [Test]
    public async Task HomePageLoadsCorrectly()
    {
        await Page.GotoAsync("https://playwright.dev");
        await Expect(Page).ToHaveTitleAsync(new Regex("Playwright"));
    }
}
```

> `PageTest` is the base class from `Microsoft.Playwright.NUnit`. Exposes `Page`, `Browser`, and `Context` as ready-to-use properties.

### Step 5 — Run the tests

```bash
# Run all tests
dotnet test

# With config file
dotnet test --settings .runsettings

# Filter by name
dotnet test --filter "HomePageLoadsCorrectly"
```

---

## 📁 Recommended Folder Structure

```
Learning_to_Playwright/
├── typescript/
│   ├── tests/
│   │   └── *.spec.ts
│   ├── playwright.config.ts   ← to create
│   ├── package.json
│   └── tsconfig.json
│
├── python/
│   ├── tests/
│   │   ├── __init__.py
│   │   └── test_*.py
│   └── pytest.ini
│
├── csharp/
│   ├── Tests/
│   │   └── *Test.cs
│   ├── .runsettings           ← to create (optional)
│   └── PlaywrightComparison.csproj
│
└── docs/
```

---

## 🔍 Quick Environment Verification

Before writing your first test, confirm everything is working by running:

```bash
# TypeScript
cd typescript && npx playwright --version

# Python
cd python && python -c "from playwright.sync_api import sync_playwright; print('OK')"

# C#
cd csharp && dotnet test --list-tests
```

---

## 📋 Command Summary by Language

| Action | TypeScript | Python | C# |
| :--- | :--- | :--- | :--- |
| Install packages | `npm install -D @playwright/test` | `pip install playwright pytest-playwright` | `dotnet restore` |
| Install browsers | `npx playwright install` | `playwright install` | `pwsh ...playwright.ps1 install` |
| Run all tests | `npx playwright test` | `pytest` | `dotnet test` |
| Run one file | `npx playwright test login.spec.ts` | `pytest tests/test_login.py` | `dotnet test --filter Login` |
| View report | `npx playwright show-report` | open `reports/report.html` | console output / TRX |
| Visual / UI mode | `npx playwright test --ui` | `pytest --headed` | `.runsettings Headless=false` |
