# Configuración del Proyecto con Playwright

Guía de instalación y configuración para los tres lenguajes del plan de capacitación: **TypeScript**, **Python** y **C#**. El rendimiento de ejecución de pruebas es equivalente en los tres porque todos se comunican con el mismo motor de Playwright vía protocolo interno.

---

## ✅ Prerrequisitos Comunes

Antes de configurar cualquier lenguaje, verificar que el sistema tenga instalados:

| Herramienta | Versión mínima | Verificar con |
| :--- | :---: | :--- |
| **Node.js** | 18+ | `node --version` |
| **Python** | 3.8+ | `python --version` |
| **.NET SDK** | 8+ | `dotnet --version` |
| **Git** | cualquiera | `git --version` |
| **VS Code** | cualquiera | — |

> **PowerShell** también debe estar disponible (`pwsh --version`) para la instalación de browsers en C#.

---

## 🟦 1. TypeScript con `@playwright/test`

### Estado actual del proyecto
El directorio `typescript/` ya tiene configurado Jest + TypeScript para el Módulo 1 (fundamentos). Playwright tiene su propio runner de pruebas (`@playwright/test`) que **reemplaza a Jest** para los tests de UI.

### Paso 1 — Instalar dependencias

Desde la carpeta `typescript/`:

```bash
npm install -D @playwright/test
```

> Esto agrega `@playwright/test` al `package.json`. El resto de dependencias (typescript, tsx, etc.) ya están instaladas.

### Paso 2 — Instalar los navegadores

```bash
npx playwright install
```

Esto descarga Chromium, Firefox y WebKit. Para instalar solo uno:

```bash
npx playwright install chromium
```

### Paso 3 — Crear el archivo de configuración

Crear `typescript/playwright.config.ts`:

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

### Paso 4 — Actualizar `tsconfig.json`

Agregar los tipos de Playwright al `compilerOptions`:

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

### Paso 5 — Actualizar `package.json`

Agregar los scripts para Playwright junto a los existentes:

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

### Paso 6 — Crear la carpeta de tests y un test inicial

```
typescript/
└── tests/
    └── ejemplo.spec.ts
```

```typescript
// tests/ejemplo.spec.ts
import { test, expect } from '@playwright/test';

test('la página principal carga correctamente', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await expect(page).toHaveTitle(/Playwright/);
});
```

### Paso 7 — Ejecutar los tests

```bash
# Ejecutar todos los tests E2E
npm run test:e2e

# Ejecutar con interfaz gráfica (modo UI)
npm run test:e2e:ui

# Ver reporte HTML con resultados
npm run test:e2e:report
```

---

## 🐍 2. Python con `pytest-playwright`

### Estado actual del proyecto
El directorio `python/` ya tiene `pytest.ini` configurado con `--headed` y `--slowmo=500`. Solo falta instalar los paquetes y los navegadores.

### Paso 1 — Crear un entorno virtual (recomendado)

```bash
# Desde la raíz del proyecto
python -m venv .venv

# Activar en Windows
.venv\Scripts\activate

# Activar en macOS/Linux
source .venv/bin/activate
```

### Paso 2 — Instalar dependencias

```bash
pip install playwright pytest-playwright
```

### Paso 3 — Instalar los navegadores

```bash
playwright install
```

Para instalar solo Chromium:

```bash
playwright install chromium
```

### Paso 4 — Verificar `pytest.ini`

El archivo ya existe en `python/pytest.ini`. Contenido actual:

```ini
[pytest]
testpaths = tests
addopts = --headed --slowmo=500
```

Opciones disponibles para ampliar:

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

> Para el reporte HTML se necesita instalar: `pip install pytest-html`

### Paso 5 — Crear la carpeta de tests y un test inicial

```
python/
└── tests/
    ├── __init__.py       (archivo vacío, necesario para que pytest reconozca el paquete)
    └── test_ejemplo.py
```

```python
# tests/test_ejemplo.py
from playwright.sync_api import Page, expect

def test_pagina_principal_carga(page: Page):
    page.goto("https://playwright.dev")
    expect(page).to_have_title(re.compile("Playwright"))
```

> `page` es un **fixture** que `pytest-playwright` inyecta automáticamente. No hace falta crear el browser manualmente.

### Paso 6 — Ejecutar los tests

```bash
# Desde la carpeta python/
pytest

# Solo un archivo
pytest tests/test_ejemplo.py

# Con nombre de test específico
pytest -k "test_pagina_principal_carga"

# Sin browser visible (modo headless)
pytest --headed=false
```

---

## 🟣 3. C# con `Microsoft.Playwright.NUnit`

### Estado actual del proyecto
El directorio `csharp/` ya tiene el paquete `Microsoft.Playwright.NUnit` 1.61.0 en el `.csproj`. Solo falta compilar e instalar los navegadores.

### Paso 1 — Compilar el proyecto

```bash
# Desde la carpeta csharp/
dotnet build
```

Esto restaura los paquetes NuGet y compila el proyecto.

### Paso 2 — Instalar los navegadores

Playwright para .NET incluye un script PowerShell para la instalación de browsers. Ejecutar **después de compilar**:

```powershell
pwsh bin/Debug/net9.0/playwright.ps1 install
```

Para instalar solo Chromium:

```powershell
pwsh bin/Debug/net9.0/playwright.ps1 install chromium
```

> Si `pwsh` no está disponible, instalar PowerShell desde: `winget install Microsoft.PowerShell`

### Paso 3 — Crear un archivo de configuración (opcional pero recomendado)

Crear `csharp/.runsettings` para controlar el comportamiento de los tests:

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

### Paso 4 — Crear un test inicial

```csharp
// Tests/EjemploTest.cs
using Microsoft.Playwright.NUnit;
using NUnit.Framework;

namespace PlaywrightTests;

[TestFixture]
public class EjemploTest : PageTest
{
    [Test]
    public async Task PaginaPrincipalCargaCorrectamente()
    {
        await Page.GotoAsync("https://playwright.dev");
        await Expect(Page).ToHaveTitleAsync(new Regex("Playwright"));
    }
}
```

> `PageTest` es la clase base de `Microsoft.Playwright.NUnit`. Expone `Page`, `Browser` y `Context` como propiedades listas para usar.

### Paso 5 — Ejecutar los tests

```bash
# Ejecutar todos los tests
dotnet test

# Con el archivo de configuración
dotnet test --settings .runsettings

# Filtrar por nombre
dotnet test --filter "PaginaPrincipalCargaCorrectamente"
```

---

## 📁 Estructura de Carpetas Recomendada

```
Learning_to_Playwright/
├── typescript/
│   ├── tests/
│   │   └── *.spec.ts
│   ├── playwright.config.ts   ← a crear
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
│   ├── .runsettings           ← a crear (opcional)
│   └── PlaywrightComparison.csproj
│
└── docs/
```

---

## 🔍 Verificación Rápida del Entorno

Antes de escribir el primer test, confirmar que todo está bien ejecutando:

```bash
# TypeScript
cd typescript && npx playwright --version

# Python
cd python && python -c "from playwright.sync_api import sync_playwright; print('OK')"

# C#
cd csharp && dotnet test --list-tests
```

---

## 📋 Resumen de Comandos por Lenguaje

| Acción | TypeScript | Python | C# |
| :--- | :--- | :--- | :--- |
| Instalar paquetes | `npm install -D @playwright/test` | `pip install playwright pytest-playwright` | `dotnet restore` |
| Instalar browsers | `npx playwright install` | `playwright install` | `pwsh ...playwright.ps1 install` |
| Ejecutar todos los tests | `npx playwright test` | `pytest` | `dotnet test` |
| Ejecutar un archivo | `npx playwright test login.spec.ts` | `pytest tests/test_login.py` | `dotnet test --filter Login` |
| Ver reporte | `npx playwright show-report` | abrir `reports/report.html` | salida en consola / TRX |
| Modo visual / UI | `npx playwright test --ui` | `pytest --headed` | `.runsettings Headless=false` |
