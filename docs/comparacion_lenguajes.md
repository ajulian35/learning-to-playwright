# Syntax Comparison: Python vs C# vs TypeScript

---

## Print to console

| | Python | C# | TypeScript |
|---|---|---|---|
| Command | `print()` | `Console.WriteLine()` | `console.log()` |

```python
# Python
print("Hello QA")
print(f"Result: {status}")
```

```csharp
// C#
Console.WriteLine("Hello QA");
Console.WriteLine($"Result: {status}");
```

```typescript
// TypeScript
console.log("Hello QA");
console.log(`Result: ${status}`);
```

---

## if / else

```python
# Python
status = "FAILED"

if status == "PASSED":
    print("Test passed")
elif status == "FAILED":
    print("Test failed")
else:
    print("Test skipped")
```

```csharp
// C#
string status = "FAILED";

if (status == "PASSED")
    Console.WriteLine("Test passed");
else if (status == "FAILED")
    Console.WriteLine("Test failed");
else
    Console.WriteLine("Test skipped");
```

```typescript
// TypeScript
const status = "FAILED";

if (status === "PASSED")
    console.log("Test passed");
else if (status === "FAILED")
    console.log("Test failed");
else
    console.log("Test skipped");
```

> **Key differences:**
> - Python uses `elif`, C# and TypeScript use `else if`
> - C# and TypeScript require parentheses `()` around the condition
> - TypeScript uses `===` (strict type and value comparison)

---

## for

```python
# Python — for...in
cases = ["Login", "Registration", "Logout"]

for case in cases:
    print(case)
```

```csharp
// C# — foreach
string[] cases = { "Login", "Registration", "Logout" };

foreach (string c in cases)
    Console.WriteLine(c);
```

```typescript
// TypeScript — for...of
const cases = ["Login", "Registration", "Logout"];

for (const c of cases) {
    console.log(c);
}
```

> **Key differences:**
> - Python: `for x in list`
> - C#: `foreach (type x in list)`
> - TypeScript: `for (const x of list)`

---

## Function

```python
# Python
def greet(name: str) -> str:
    return f"Hello, {name}"

result = greet("QA")
print(result)
```

```csharp
// C#
string Greet(string name)
{
    return $"Hello, {name}";
}

string result = Greet("QA");
Console.WriteLine(result);
```

```typescript
// TypeScript
function greet(name: string): string {
    return `Hello, ${name}`;
}

const result = greet("QA");
console.log(result);
```

> **Key differences:**
> - Python uses the `def` keyword
> - C# and TypeScript declare the return type (before the name in C#, after in TypeScript)
> - Python and TypeScript use camelCase by convention (`greet`), C# uses PascalCase (`Greet`)

---

## Visual summary

| Concept | Python | C# | TypeScript |
|---|---|---|---|
| Print | `print("text")` | `Console.WriteLine("text")` | `console.log("text")` |
| Text with variable | `f"Hello {name}"` | `$"Hello {name}"` | `` `Hello ${name}` `` |
| if / else if | `if` / `elif` / `else` | `if` / `else if` / `else` | `if` / `else if` / `else` |
| Comparison | `==` | `==` | `===` |
| List loop | `for x in list` | `foreach (T x in list)` | `for (const x of list)` |
| Function | `def name():` | `Type Name()` | `function name():` |
| Return type | `-> type` (optional) | before the name | `: type` after the name |
