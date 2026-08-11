# Learning to Playwright

Plan de capacitación de QA Manual a QA Automation.
Mismos escenarios implementados en **Python**, **C#** y **TypeScript**.

---

## Estructura

```
Learning_to_Playwright/
├── python/                        # Playwright + pytest
│   ├── tests/
│   │   ├── conftest.py
│   │   └── test_example.py
│   ├── modulo1_basico.py          # Ejemplo básico Módulo 1
│   ├── modulo1_basico_flujo.md    # Explicación del flujo
│   ├── modulo1_fundamentos.py     # Ejemplo completo Módulo 1
│   ├── requirements.txt
│   └── pytest.ini
│
├── csharp/                        # Playwright + NUnit (.NET)
│   ├── Tests/
│   │   └── ExampleTests.cs
│   ├── Modulo1Basico.cs           # Ejemplo básico Módulo 1
│   ├── Modulo1Basico_flujo.md     # Explicación del flujo
│   ├── Modulo1Fundamentos.cs      # Ejemplo completo Módulo 1
│   ├── PlaywrightComparison.csproj
│   └── .runsettings
│
├── typescript/                    # Playwright + Jest
│   ├── modulo1_basico.ts          # Ejemplo básico Módulo 1 (script)
│   ├── modulo1_basico.test.ts     # Tests con Jest Módulo 1
│   ├── Modulo1Basico_flujo.md     # Explicación del flujo
│   ├── jest.config.js
│   ├── tsconfig.json
│   └── package.json
│
├── plan.md                        # Plan de capacitación completo
└── README.md
```

---

## Configuración inicial

### Python

```bash
cd python
pip install -r requirements.txt
playwright install
```

### C#

```bash
cd csharp
dotnet build
pwsh bin/Debug/net9.0/playwright.ps1 install
```

### TypeScript

```bash
cd typescript
npm install
```

---

## Ejecutar los ejemplos del Módulo 1

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

## Ejecutar los tests

### Python

```bash
cd python
pytest
```

### C#

```bash
cd csharp
dotnet test --settings .runsettings

# Solo Módulo 1
dotnet test --filter "Modulo1Basico"
```

### TypeScript

```bash
cd typescript
npm test

# Solo un tema específico
npm test -- --testNamePattern "Tema3"
```

---

## Módulos

| Módulo | Descripción | Horas |
|---|---|:---:|
| **Módulo 1** | Fundamentos de Programación con Python | 5 h |
| **Módulo 2** | Automatización de UI con Playwright | 4.5 h |
| **Módulo 3** | Automatización de Pruebas de API | 3 h |
| **Módulo 4** | Inteligencia Artificial en QA | 5 h |
| **Módulo 5** | Fundamentos de ETL para QA | 6 h |
| **Módulo 6** | Proyecto Final Integrador | 22 h |
| **Total** | | **45.5 h** |
