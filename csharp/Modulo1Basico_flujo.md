# Flujo de Ejecución — `Modulo1Basico.cs`

En C# este archivo **no tiene un `Main` explícito**. En lugar de eso, usa el
framework **NUnit** para ejecutar cada método marcado con `[Test]` de forma
independiente. El runner (`dotnet test`) es quien decide qué ejecutar y en qué orden.


Execute:
 dotnet test --filter "Modulo1Basico"

---

## Estructura del archivo

```
namespace PlaywrightComparison
│
├── [TestFixture] Modulo1BasicoTests          ← clase contenedora de los tests
│   │
│   ├── constantes y datos (Suite, Casos...)  ← se definen al cargar la clase
│   │
│   ├── métodos privados (equivalente a funciones de Python)
│   │   ├── ImprimirResultado()
│   │   ├── CalcularResumen()
│   │   └── ValidarEstado()
│   │
│   ├── clase interna ReportePruebas (OOP)
│   │
│   └── [Test] métodos — cada uno es un caso ejecutable
│       ├── Tema1_VariablesYTipos()
│       ├── Tema2_EstructurasDeDatos()
│       ├── Tema2_CondicionalesYBucles()
│       ├── Tema3_MetodosYExcepciones()
│       ├── Tema4_ResumenConMetodos()
│       └── Tema5_OOP_ClaseReporte()
```

---

## Orden de ejecución al correr `dotnet test`

```
1. dotnet compila el proyecto completo
2. NUnit descubre todos los métodos marcados con [Test]
3. Por cada [Test]:
      a. crea una instancia nueva de Modulo1BasicoTests
      b. ejecuta el método
      c. evalúa los Assert — si falla uno, el test se marca FAILED
4. Al final imprime el resumen: Passed / Failed / Total time
```

---

## Comando para ejecutar solo estos tests

```bash
dotnet test --filter "Modulo1Basico"
```

Para ejecutar un test específico:

```bash
dotnet test --filter "Tema3_MetodosYExcepciones"
```

---

## Diferencia con Python

| | Python (`modulo1_basico.py`) | C# (`Modulo1Basico.cs`) |
|---|---|---|
| Punto de entrada | Código al nivel raíz, se ejecuta de arriba a abajo | Métodos `[Test]`, NUnit los ejecuta uno por uno |
| Aislamiento | Una sola ejecución continua, el estado se comparte | Cada `[Test]` es independiente |
| Cómo correrlo | `python modulo1_basico.py` | `dotnet test --filter "Modulo1Basico"` |
| Verificación de resultados | `print()` en consola | `Assert.That()` — falla el test si no se cumple |
