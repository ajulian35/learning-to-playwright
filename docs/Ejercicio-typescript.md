# Playwright TypeScript - E2E Testing Framework (POM)

## Requisitos previos

- Node.js 18+
- npm

---

## Instalación

### 1. Inicializar el proyecto

```bash
npm init -y
```

### 2. Instalar dependencias

```bash
npm install --save-dev @playwright/test typescript ts-node
```

### 3. Instalar los navegadores

```bash
npx playwright install
```

Esto descarga Chromium, Firefox y WebKit en `%LOCALAPPDATA%\ms-playwright\` (solo informativo).

### 4. Crear el archivo `tsconfig.json`

Crea el archivo `tsconfig.json` en la raíz del proyecto con el siguiente contenido:

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

> No uses `npx tsc --init` — genera una configuración con `verbatimModuleSyntax` y `module: nodenext` que es incompatible con Playwright sin configuración adicional.

### 5. Configurar Playwright

Crea o ajusta el archivo `playwright.config.ts` en la raíz del proyecto:

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

### 6. Estructura del proyecto (POM)

```
playwright_typescript/
├── pages/              # Page Object Models
│   └── LoginPage.ts
├── tests/              # Archivos de prueba
│   └── login.spec.ts
├── playwright.config.ts
├── tsconfig.json
└── package.json
```



## Crear un nuevo record
npx playwright codegen

## Crear un test con el codigo guardado
Guardarlo en la carpeta ./test con el nombre <nombre>.test.ts

## Ejecución de pruebas

```bash
# Ejecutar todos los tests
npx playwright test

---

## Instalación desde package.json existente

```bash
npm install
npx playwright install
```

---

## Convertir un test a formato POM

El patrón POM (Page Object Model) separa la lógica de interacción con la UI en clases reutilizables, dejando los tests limpios y enfocados en la lógica de negocio.

### Ejemplo: `tests/search_admin.test.ts`

#### Paso 1 — Crear la carpeta `pages/`

```
playwright_typescript/
├── pages/
├── tests/
│   └── search_admin.test.ts
```

#### Paso 2 — Crear `pages/LoginPage.ts`

Encapsula todas las acciones de la pantalla de login:

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

#### Paso 3 — Crear `pages/AdminPage.ts`

Encapsula las acciones del módulo Admin:

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
    await expect(this.page.locator('#app')).toContainText('Records Found');
  }
}
```

#### Paso 4 — Reescribir `tests/search_admin.test.ts`

```ts
import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AdminPage } from '../pages/AdminPage';

test('Buscar administradores por rol Admin', async ({ page }) => {
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

#### Estructura final

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
