# Learning to Playwright

Proyecto comparativo: mismos escenarios implementados en **Python** y **C#**.

---

## Estructura

```
Learning_to_Playwright/
├── python/               # Playwright + pytest
│   ├── tests/
│   │   ├── conftest.py
│   │   └── test_example.py
│   ├── requirements.txt
│   └── pytest.ini
│
├── csharp/               # Playwright + NUnit (.NET)
│   ├── Tests/
│   │   └── ExampleTests.cs
│   ├── PlaywrightComparison.csproj
│   └── .runsettings
│
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
pwsh bin/Debug/net8.0/playwright.ps1 install
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
```
