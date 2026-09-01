# Execution Flow — TypeScript (Module 1)


Execute:
npm start

There are two complementary TypeScript files:

| File | Purpose | How to run |
|---|---|---|
| `modulo1_basico.ts` | Demo script — prints to console | `npm start` |
| `modulo1_basico.test.ts` | Jest tests — verifies with `expect()` | `npm test` |

---

## `modulo1_basico.ts` — Demo script

Has no explicit `main`. TypeScript (like Python) executes root-level code top to bottom
when run with `ts-node`.

```
line 7-10    →  define variables (suite, version, totalExecuted, hasFailures)
line 15-16   →  define the readonly VALID_STATES array (equivalent to a tuple)
line 18-19   →  define the Status type ("PASSED" | "FAILED" | "SKIPPED")
line 21-27   →  define the TestCase interface and cases array
line 30-60   →  define functions and the class (only registers them, does NOT execute)

---- actual execution starts here ----
line 91      →  create the TestReport object
line 92      →  print the header
line 95-107  →  iterate over each case with the for...of loop
line 110     →  calculate the summary
line 111     →  print the footer
line 114-117 →  print the final message
```

### Command

```bash
npm start
```

---

## `modulo1_basico.test.ts` — Jest tests

Each `describe` groups tests for one topic. Jest discovers and runs all
`test()` blocks automatically.

```
describe("Topic1 - Variables and types")
  └── test: variables have the correct types and values

describe("Topic2 - Data structures")
  ├── test: valid states array has 3 elements
  ├── test: cases array has the correct structure
  └── test: cases can be filtered by status

describe("Topic2 - Conditionals and loops")
  ├── test: loop detects failures and accumulates total executed
  └── test: final message depends on the conditional

describe("Topic3 - Functions and exceptions")
  ├── test: printResult returns the correct message per status
  ├── test: validateStatus does not throw with valid statuses
  └── test: validateStatus throws with unknown status

describe("Topic4 - calculateSummary")
  ├── test: calculates counts and success rate correctly
  └── test: rate is 0 if no cases were executed

describe("Topic5 - Class TestReport")
  ├── test: constructor assigns suite and version correctly
  └── test: multiple independent instances can be created
```

### Command

```bash
npm test
```

To run only a specific describe:

```bash
npm test -- --testNamePattern "Topic3"
```

---

## Comparison across three languages

| | Python | C# | TypeScript |
|---|---|---|---|
| Demo file | `modulo1_basico.py` | — | `modulo1_basico.ts` |
| Test file | — | `Modulo1Basico.cs` | `modulo1_basico.test.ts` |
| Test framework | pytest | NUnit | Jest |
| Demo command | `python modulo1_basico.py` | — | `npm start` |
| Test command | `pytest tests/` | `dotnet test --filter "Modulo1Basico"` | `npm test` |
| Data types | dynamic | strictly static | static (compiled) |
| Dict data structure | `dict` | `Dictionary<string,string>` | `interface` / object |
| Immutable tuple | `tuple` | `readonly string[]` | `as const` array |
