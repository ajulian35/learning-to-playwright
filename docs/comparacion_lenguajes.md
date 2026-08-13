# Comparación de Sintaxis: Python vs C# vs TypeScript

---

## Imprimir en consola

| | Python | C# | TypeScript |
|---|---|---|---|
| Comando | `print()` | `Console.WriteLine()` | `console.log()` |

```python
# Python
print("Hola QA")
print(f"Resultado: {estado}")
```

```csharp
// C#
Console.WriteLine("Hola QA");
Console.WriteLine($"Resultado: {estado}");
```

```typescript
// TypeScript
console.log("Hola QA");
console.log(`Resultado: ${estado}`);
```

---

## if / else

```python
# Python
estado = "FAILED"

if estado == "PASSED":
    print("Test exitoso")
elif estado == "FAILED":
    print("Test fallido")
else:
    print("Test omitido")
```

```csharp
// C#
string estado = "FAILED";

if (estado == "PASSED")
    Console.WriteLine("Test exitoso");
else if (estado == "FAILED")
    Console.WriteLine("Test fallido");
else
    Console.WriteLine("Test omitido");
```

```typescript
// TypeScript
const estado = "FAILED";

if (estado === "PASSED")
    console.log("Test exitoso");
else if (estado === "FAILED")
    console.log("Test fallido");
else
    console.log("Test omitido");
```

> **Diferencias clave:**
> - Python usa `elif`, C# y TypeScript usan `else if`
> - C# y TypeScript requieren paréntesis `()` en la condición
> - TypeScript usa `===` (comparación estricta de tipo y valor)

---

## for

```python
# Python — for...in
casos = ["Login", "Registro", "Logout"]

for caso in casos:
    print(caso)
```

```csharp
// C# — foreach
string[] casos = { "Login", "Registro", "Logout" };

foreach (string caso in casos)
    Console.WriteLine(caso);
```

```typescript
// TypeScript — for...of
const casos = ["Login", "Registro", "Logout"];

for (const caso of casos) {
    console.log(caso);
}
```

> **Diferencias clave:**
> - Python: `for x in lista`
> - C#: `foreach (tipo x in lista)`
> - TypeScript: `for (const x of lista)`

---

## Función

```python
# Python
def saludar(nombre: str) -> str:
    return f"Hola, {nombre}"

resultado = saludar("QA")
print(resultado)
```

```csharp
// C#
string Saludar(string nombre)
{
    return $"Hola, {nombre}";
}

string resultado = Saludar("QA");
Console.WriteLine(resultado);
```

```typescript
// TypeScript
function saludar(nombre: string): string {
    return `Hola, ${nombre}`;
}

const resultado = saludar("QA");
console.log(resultado);
```

> **Diferencias clave:**
> - Python usa la palabra clave `def`
> - C# y TypeScript declaran el tipo de retorno (antes del nombre en C#, después en TypeScript)
> - Python y TypeScript son case-sensitive en nombres por convención (`saludar`), C# usa PascalCase (`Saludar`)

---

## Resumen visual

| Concepto | Python | C# | TypeScript |
|---|---|---|---|
| Imprimir | `print("texto")` | `Console.WriteLine("texto")` | `console.log("texto")` |
| Texto con variable | `f"Hola {nombre}"` | `$"Hola {nombre}"` | `` `Hola ${nombre}` `` |
| if / else if | `if` / `elif` / `else` | `if` / `else if` / `else` | `if` / `else if` / `else` |
| Comparación | `==` | `==` | `===` |
| Bucle lista | `for x in lista` | `foreach (T x in lista)` | `for (const x of lista)` |
| Función | `def nombre():` | `Tipo Nombre()` | `function nombre():` |
| Tipo de retorno | `-> tipo` (opcional) | antes del nombre | `: tipo` después del nombre |
