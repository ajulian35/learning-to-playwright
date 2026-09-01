# Learning to Playwright

Training plan: from Manual/Functional QA to QA Automation.
Same scenarios implemented in **Python**, **C#**, and **TypeScript**.

---

## Structure

```
Learning_to_Playwright/
├── .env                               # Global credentials (not committed)
│
├── python/                            # Playwright + pytest
│   ├── pages/
│   │   ├── __init__.py
│   │   ├── login_page.py
│   │   └── admin_page.py
│   ├── tests/
│   │   ├── conftest.py                # Fixtures: credentials, login_page, admin_page
│   │   ├── test_search_admin.py       # E2E test with POM
│   │   └── test_example.py
│   ├── modulo1_basico.py
│   ├── modulo1_basico_flujo.md
│   ├── modulo1_fundamentos.py
│   ├── requirements.txt
│   └── pytest.ini
│
├── csharp/                            # Playwright + NUnit (.NET 9)
│   ├── Pages/
│   │   ├── LoginPage.cs
│   │   └── AdminPage.cs
│   ├── Tests/
│   │   ├── BaseTest.cs                # Loads .env, baseURL, and RequireEnv
│   │   ├── SearchAdminTests.cs        # E2E test with POM
│   │   └── ExampleTests.cs
│   ├── Modulo1Basico.cs
│   ├── Modulo1Basico_flujo.md
│   ├── Modulo1Fundamentos.cs
│   ├── PlaywrightComparison.csproj
│   └── .runsettings
│
├── typescript/                        # Playwright + TypeScript
│   ├── pages/
│   │   ├── LoginPage.ts
│   │   └── AdminPage.ts
│   ├── tests/
│   │   ├── fixtures.ts                # Fixtures: credentials, loginPage, adminPage
│   │   └── search_admin.test.ts       # E2E test with POM
│   ├── modulo1_basico.ts
│   ├── modulo1_basico.test.ts
│   ├── Modulo1Basico_flujo.md
│   ├── playwright.config.ts
│   ├── tsconfig.json
│   ├── tsconfig.playwright.json
│   └── package.json
│
├── plan.md
└── README.md
```

---

## Initial Setup

### Create the `.env` file at the repo root

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### Python

```bash
cd python
pip install -r requirements.txt
playwright install
```

### C#

```bash
cd csharp
dotnet restore
pwsh bin/Debug/net9.0/playwright.ps1 install
```

### TypeScript

```bash
cd typescript
npm install
npx playwright install
```

---

## Running E2E Tests (POM)

### Python

```bash
cd python

# Headless (default)
python -m pytest tests/test_search_admin.py -v

# With visible browser
python -m pytest tests/test_search_admin.py -v --headed

# With visible browser and action delay
python -m pytest tests/test_search_admin.py -v --headed --slowmo 500
```

### C#

```bash
cd csharp

# Headless (default per .runsettings)
dotnet test --settings .runsettings

# POM test only
dotnet test --settings .runsettings --filter "SearchAdminTests"

# With visible browser: edit .runsettings → <Headless>false</Headless>
```

### TypeScript

```bash
cd typescript

# Headless (default)
npx playwright test

# With visible browser
npx playwright test --headed

# With visible browser and action delay
npx playwright test --headed --slowmo 500

# POM test only
npx playwright test tests/search_admin.test.ts

# View HTML report from last run
npx playwright show-report
```

---

## Running Module 1 Examples

### Python

```bash
cd python
python modulo1_basico.py
```

### TypeScript

```bash
cd typescript
npm start
```

---

## Modules

| Module | Description | Hours |
|---|---|:---:|
| **Module 1** | Programming Fundamentals with Python | 1 h |
| **Module 2** | UI Automation with Playwright | 4.5 h |
| **Module 3** | API Test Automation | 3 h |
| **Module 4** | Artificial Intelligence in QA | 5 h |
| **Module 5** | ETL Fundamentals for QA | 6 h |
| **Module 6** | Final Integration Project | 22 h |
| **Total** | | **41.5 h** |
