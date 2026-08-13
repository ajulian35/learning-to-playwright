# Estrategia de Localizadores en Automatización de UI y Comparativa en Playwright

Este documento detalla el orden de prioridad recomendado para la selección de elementos en pruebas de interfaz de usuario (UI), la estrategia nativa adoptada por Playwright y una comparativa de sintaxis entre TypeScript, Python y C#.

---

## 🥇 1. Tipo de Selectores por Orden de Uso (General)

A nivel general en la automatización de pruebas de UI, este es el orden de prioridad estándar de la industria (del más recomendado al menos recomendado), evaluado por **estabilidad, velocidad de ejecución y facilidad de mantenimiento**:

1. **Atributos de Prueba Dedicados (`data-testid`, `data-cy`)**
   * *Por qué:* Creados exclusivamente para pruebas. Son inmunes a cambios de diseño visual o estructural en la aplicación.
2. **ID (`id`)**
   * *Por qué:* Teóricamente único en la página. El motor del navegador lo busca de forma nativa a máxima velocidad. *(Evitar si es dinámico)*.
3. **Nombre (`name`)**
   * *Por qué:* Muy útil y estándar en elementos de formularios e inputs.
4. **Selectores CSS (`css selector`)**
   * *Por qué:* El método nativo más óptimo y rápido para búsquedas complejas por clases, atributos o jerarquías simples.
5. **Texto del Enlace (`link text`)**
   * *Por qué:* Permite interactuar con etiquetas `<a>` basándose exactamente en lo que ve el usuario.
6. **Clase (`class name`)**
   * *Por qué:* Útil para grupos de elementos, pero inestable para elementos individuales porque las clases de diseño cambian con frecuencia.
7. **Nombre de la Etiqueta (`tag name`)**
   * *Por qué:* Demasiado genérico (`div`, `input`, `button`). Solo sirve para filtrados o conteos.
8. **XPath (`xpath`)**
   * *Por qué:* **El menos recomendado (último recurso).** Es lento porque obliga al navegador a recorrer todo el árbol del DOM y su sintaxis es compleja y propensa a romperse ante el más mínimo cambio estructural.

---

## 🎭 2. Localizadores Recomendados para Playwright

Playwright rompe con el esquema tradicional de Selenium y promueve **Localizadores Resilientes** basados en la experiencia del usuario y la accesibilidad, desalentando el uso directo de CSS o XPath genéricos.

### Orden de prioridad nativo en Playwright:
1. **`GetByTestId`**: El estándar de oro. Busca elementos usando el atributo dedicado a pruebas.
2. **`GetByRole`**: El mejor para simular interacciones reales. Busca por el rol de accesibilidad del elemento (botón, enlace, campo de texto) y permite filtrar por su texto visible.
3. **`GetByLabel` / `GetByPlaceholder`**: Ideal para formularios, asociando los campos con su etiqueta visible o texto de ayuda interna.
4. **`GetByText`**: Para validar mensajes, títulos o contenido estático que el usuario lee en pantalla.
5. **`Locator("css=...")`**: Solo si los localizadores de accesibilidad previos no cubren la necesidad arquitectónica del layout.
6. **`Locator("xpath=...")`**: Último recurso absoluto. Rara vez se necesita en Playwright.

---

## 💻 3. Ejemplos de Sintaxis en los 3 Lenguajes

A continuación se muestra cómo se escriben los localizadores principales de Playwright en **TypeScript, Python (Asíncrono) y C# (.NET)**. 

*Nota: El rendimiento de ejecución es idéntico en los tres lenguajes porque todos se comunican con el mismo Driver central de Playwright a través de llamadas RPC de ultra baja latencia.*

### 🔹 1. Búsqueda por Test ID (`GetByTestId`)
* **TypeScript:**
  ```typescript
  await page.getByTestId('submit-button').click();
  ```
* **Python:**
  ```python
  await page.get_by_test_id("submit-button").click()
  ```
* **C#:**
  ```csharp
  await page.GetByTestId("submit-button").ClickAsync();
  ```

### 🔹 2. Búsqueda por Rol de Accesibilidad y Texto (`GetByRole`)
* **TypeScript:**
  ```typescript
  await page.getByRole('button', { name: 'Guardar cambios' }).click();
  ```
* **Python:**
  ```python
  await page.get_by_role("button", name="Guardar cambios").click()
  ```
* **C#:**
  ```csharp
  await page.GetByRole(AriaRole.Button, new() { Name = "Guardar cambios" }).ClickAsync();
  ```

### 🔹 3. Búsqueda por Texto Visible (`GetByText`)
* **TypeScript:**
  ```typescript
  await expect(page.getByText('¡Registro exitoso!')).toBeVisible();
  ```
* **Python:**
  ```python
  await expect(page.get_by_text("¡Registro exitoso!")).to_be_visible()
  ```
* **C#:**
  ```csharp
  await Assertions.Expect(page.GetByText("¡Registro exitoso!")).ToBeVisibleAsync();
  ```

### 🔹 4. Búsqueda por Etiqueta de Formulario (`GetByLabel`)
* **TypeScript:**
  ```typescript
  await page.getByLabel('Correo electrónico').fill('usuario@ejemplo.com');
  ```
* **Python:**
  ```python
  await page.get_by_label("Correo electrónico").fill("usuario@ejemplo.com")
  ```
* **C#:**
  ```csharp
  await page.GetByLabel("Correo electrónico").FillAsync("usuario@ejemplo.com");
  ```

### 🔹 5. Búsqueda por Placeholder (`GetByPlaceholder`)
* **TypeScript:**
  ```typescript
  await page.getByPlaceholder('Ingresa tu contraseña').fill('Secreto123');
  ```
* **Python:**
  ```python
  await page.get_by_placeholder("Ingresa tu contraseña").fill("Secreto123")
  ```
* **C#:**
  ```csharp
  await page.GetByPlaceholder("Ingresa tu contraseña").FillAsync("Secreto123");
  ```

### 🔹 6. Búsqueda por Texto Alternativo de Imagen (`GetByAltText`)
* **TypeScript:**
  ```typescript
  await page.getByAltText('Logo de la empresa').toBeVisible();
  ```
* **Python:**
  ```python
  await expect(page.get_by_alt_text("Logo de la empresa")).to_be_visible()
  ```
* **C#:**
  ```csharp
  await Assertions.Expect(page.GetByAltText("Logo de la empresa")).ToBeVisibleAsync();
  ```

### 🔹 7. Búsqueda por Atributo `title` (`GetByTitle`)
* **TypeScript:**
  ```typescript
  await expect(page.getByTitle('Cerrar ventana')).toBeVisible();
  ```
* **Python:**
  ```python
  await expect(page.get_by_title("Cerrar ventana")).to_be_visible()
  ```
* **C#:**
  ```csharp
  await Assertions.Expect(page.GetByTitle("Cerrar ventana")).ToBeVisibleAsync();
  ```

### 🔹 8. Uso de Selectores CSS Tradicionales (`Locator`)
* **TypeScript:**
  ```typescript
  await page.locator('div.user-profile > ul.menu-list').click();
  ```
* **Python:**
  ```python
  await page.locator("div.user-profile > ul.menu-list").click()
  ```
* **C#:**
  ```csharp
  await page.Locator("div.user-profile > ul.menu-list").ClickAsync();
  ```

### 🔹 9. XPath — Último Recurso
Usar solo cuando ningún localizador de accesibilidad ni CSS resuelve el caso.
* **TypeScript:**
  ```typescript
  // Por texto contenido en un elemento específico
  await page.locator('//h2[contains(text(),"Bienvenido")]').isVisible();
  // Por posición relativa: el input justo después de un label
  await page.locator('//label[text()="Usuario"]/following-sibling::input').fill('juan');
  ```
* **Python:**
  ```python
  await page.locator('//h2[contains(text(),"Bienvenido")]').is_visible()
  await page.locator('//label[text()="Usuario"]/following-sibling::input').fill("juan")
  ```
* **C#:**
  ```csharp
  await page.Locator("//h2[contains(text(),'Bienvenido')]").IsVisibleAsync();
  await page.Locator("//label[text()='Usuario']/following-sibling::input").FillAsync("juan");
  ```

---

## 🔗 4. Filtrado y Encadenamiento de Localizadores

Cuando una página tiene múltiples elementos del mismo tipo, Playwright permite refinar la búsqueda sin recurrir a XPath complejo.

### Filtrar por texto dentro de un localizador
```typescript
// TypeScript
const fila = page.locator('tr').filter({ hasText: 'Juan Pérez' });
await fila.getByRole('button', { name: 'Editar' }).click();
```
```python
# Python
fila = page.locator("tr").filter(has_text="Juan Pérez")
await fila.get_by_role("button", name="Editar").click()
```

### Seleccionar por posición (primero, último, n-ésimo)
```typescript
// TypeScript — el primer resultado de una lista
await page.locator('li.resultado').first().click();
// El tercer elemento (índice base 0)
await page.locator('li.resultado').nth(2).click();
// El último
await page.locator('li.resultado').last().click();
```
```python
# Python
await page.locator("li.resultado").first.click()
await page.locator("li.resultado").nth(2).click()
await page.locator("li.resultado").last.click()
```

### Encadenar localizadores (scope)
Limitar la búsqueda a una sección específica de la página evita colisiones entre elementos con el mismo rol o texto.
```typescript
// TypeScript — busca el botón "Eliminar" solo dentro del card de "Producto A"
const card = page.locator('div.product-card').filter({ hasText: 'Producto A' });
await card.getByRole('button', { name: 'Eliminar' }).click();
```
```python
# Python
card = page.locator("div.product-card").filter(has_text="Producto A")
await card.get_by_role("button", name="Eliminar").click()
```

---

## ⚠️ 5. Anti-patrones: Qué Evitar

| Anti-patrón | Problema | Alternativa |
| :--- | :--- | :--- |
| `locator('.btn-primary')` para un solo botón | La clase puede aplicarse a múltiples elementos; cambia con el diseño. | `getByRole('button', { name: 'Guardar' })` |
| `locator('div > div > span:nth-child(3)')` | Se rompe ante cualquier cambio de layout. | `getByTestId(...)` o `getByRole(...)` |
| XPath con índices numéricos `(//input)[2]` | El índice cambia si se agrega un campo al formulario. | `getByLabel('Apellido')` |
| `locator('#id-123abc')` con IDs autogenerados | Los IDs dinámicos cambian en cada build o sesión. | Solicitar `data-testid` al equipo de desarrollo. |
| Texto con mayúsculas/minúsculas fijas `getByText('GUARDAR')` | Puede romperse si se cambia el estilo CSS (`text-transform`). | Usar la opción `{ exact: false }` o `getByRole`. |

---

## 📋 6. Tabla Resumen — ¿Cuándo usar cada localizador?

| Localizador | Caso de uso ideal | Estabilidad |
| :--- | :--- | :---: |
| `getByTestId` | Equipos que añaden `data-testid` a sus componentes | ⭐⭐⭐⭐⭐ |
| `getByRole` | Botones, links, inputs, checkboxes, dialogs | ⭐⭐⭐⭐⭐ |
| `getByLabel` | Campos de formulario asociados a una etiqueta visible | ⭐⭐⭐⭐⭐ |
| `getByPlaceholder` | Inputs con texto de ayuda pero sin label explícita | ⭐⭐⭐⭐ |
| `getByText` | Mensajes de validación, títulos, contenido estático | ⭐⭐⭐⭐ |
| `getByAltText` | Imágenes con atributo `alt` descriptivo | ⭐⭐⭐⭐ |
| `getByTitle` | Tooltips o íconos con atributo `title` | ⭐⭐⭐ |
| `locator('css=...')` | Estructuras complejas sin atributo de accesibilidad | ⭐⭐⭐ |
| `locator('xpath=...')` | Último recurso: relaciones DOM no expresables de otra forma | ⭐⭐ |
