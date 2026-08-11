# Flujo de Ejecución — TypeScript (Módulo 1)

Hay dos archivos complementarios para TypeScript:

| Archivo | Propósito | Cómo ejecutar |
|---|---|---|
| `modulo1_basico.ts` | Script de demostración — imprime en consola | `npm start` |
| `modulo1_basico.test.ts` | Tests con Jest — verifica con `expect()` | `npm test` |

---

## `modulo1_basico.ts` — Script de demostración

No tiene un `main` explícito. TypeScript (igual que Python) ejecuta el código al nivel
raíz de arriba a abajo cuando se corre con `ts-node`.

```
línea 7-10   →  define variables (suite, version, totalEjecutados, hayFallos)
línea 15-16  →  define el array readonly ESTADOS_VALIDOS (equivalente a tupla)
línea 18-19  →  define el tipo Estado ("PASSED" | "FAILED" | "SKIPPED")
línea 21-27  →  define la interface CasoPrueba y el array casos
línea 30-60  →  define funciones y la clase (solo las registra, NO las ejecuta)

---- aquí empieza la ejecución real ----
línea 91     →  crea el objeto ReportePruebas
línea 92     →  imprime el encabezado
línea 95-107 →  recorre cada caso con el bucle for...of
línea 110    →  calcula el resumen
línea 111    →  imprime el pie
línea 114-117→  imprime el mensaje final
```

### Comando

```bash
npm start
```

---

## `modulo1_basico.test.ts` — Tests con Jest

Cada `describe` agrupa los tests de un tema. Jest descubre y ejecuta todos los
bloques `test()` automáticamente.

```
describe("Tema1 - Variables y tipos")
  └── test: las variables tienen los tipos y valores correctos

describe("Tema2 - Estructuras de datos")
  ├── test: el array de estados validos tiene 3 elementos
  ├── test: el array de casos tiene la estructura correcta
  └── test: se pueden filtrar casos por estado

describe("Tema2 - Condicionales y bucles")
  ├── test: el bucle detecta fallos y acumula el total ejecutado
  └── test: el mensaje final depende del condicional

describe("Tema3 - Funciones y excepciones")
  ├── test: imprimirResultado retorna el mensaje correcto por estado
  ├── test: validarEstado no lanza error con estados validos
  └── test: validarEstado lanza error con estado desconocido

describe("Tema4 - calcularResumen")
  ├── test: calcula los conteos y tasa de exito correctamente
  └── test: tasa es 0 si no hay casos ejecutados

describe("Tema5 - Clase ReportePruebas")
  ├── test: el constructor asigna suite y version correctamente
  └── test: se pueden crear multiples instancias independientes
```

### Comando

```bash
npm test
```

Para correr solo un describe específico:

```bash
npm test -- --testNamePattern "Tema3"
```

---

## Comparación entre los tres lenguajes

| | Python | C# | TypeScript |
|---|---|---|---|
| Archivo de demo | `modulo1_basico.py` | — | `modulo1_basico.ts` |
| Archivo de tests | — | `Modulo1Basico.cs` | `modulo1_basico.test.ts` |
| Framework de tests | pytest | NUnit | Jest |
| Comando demo | `python modulo1_basico.py` | — | `npm start` |
| Comando tests | `pytest tests/` | `dotnet test --filter "Modulo1Basico"` | `npm test` |
| Tipos de datos | dinámico | estático estricto | estático (compilado) |
| Estructura de datos dict | `dict` | `Dictionary<string,string>` | `interface` / objeto |
| Tupla (inmutable) | `tuple` | `readonly string[]` | `as const` array |
