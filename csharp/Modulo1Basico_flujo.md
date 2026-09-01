# Execution Flow — `Modulo1Basico.cs`

In C# this file **has no explicit `Main`**. Instead, it uses the
**NUnit** framework to run each method marked with `[Test]` independently.
The runner (`dotnet test`) decides what to execute and in what order.


Execute:
 dotnet test --filter "Modulo1Basico"

---

## File structure

```
namespace PlaywrightComparison
│
├── [TestFixture] Modulo1BasicoTests          ← class containing the tests
│   │
│   ├── constants and data (Suite, Cases...)  ← defined when the class loads
│   │
│   ├── private methods (equivalent to Python functions)
│   │   ├── PrintResult()
│   │   ├── CalculateSummary()
│   │   └── ValidateStatus()
│   │
│   ├── inner class TestReport (OOP)
│   │
│   └── [Test] methods — each one is a runnable case
│       ├── Topic1_VariablesAndTypes()
│       ├── Topic2_DataStructures()
│       ├── Topic2_ConditionalsAndLoops()
│       ├── Topic3_MethodsAndExceptions()
│       ├── Topic4_SummaryWithMethods()
│       └── Topic5_OOP_TestReportClass()
```

---

## Execution order when running `dotnet test`

```
1. dotnet compiles the full project
2. NUnit discovers all methods marked with [Test]
3. For each [Test]:
      a. creates a new instance of Modulo1BasicoTests
      b. runs the method
      c. evaluates Assert — if one fails, the test is marked FAILED
4. At the end prints the summary: Passed / Failed / Total time
```

---

## Command to run only these tests

```bash
dotnet test --filter "Modulo1Basico"
```

To run a specific test:

```bash
dotnet test --filter "Topic3_MethodsAndExceptions"
```

---

## Difference from Python

| | Python (`modulo1_basico.py`) | C# (`Modulo1Basico.cs`) |
|---|---|---|
| Entry point | Root-level code, runs top to bottom | `[Test]` methods, NUnit runs them one by one |
| Isolation | Single continuous run, state is shared | Each `[Test]` is independent |
| How to run | `python modulo1_basico.py` | `dotnet test --filter "Modulo1Basico"` |
| Result verification | `print()` to console | `Assert.That()` — fails the test if condition not met |
