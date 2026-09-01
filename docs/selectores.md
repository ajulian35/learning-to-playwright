# Locator Strategy in UI Test Automation and Playwright Comparison

This document details the recommended priority order for element selection in UI tests, the native strategy adopted by Playwright, and a syntax comparison across TypeScript, Python, and C#.

---

## 🥇 1. Selector Types by Priority (General)

At the general UI automation level, this is the industry-standard priority order (most to least recommended), evaluated by **stability, execution speed, and maintainability**:

1. **Dedicated Test Attributes (`data-testid`, `data-cy`)**
   * *Why:* Created exclusively for tests. Immune to visual or structural design changes in the application.
2. **ID (`id`)**
   * *Why:* Theoretically unique on the page. The browser engine finds it natively at maximum speed. *(Avoid if dynamic)*.
3. **Name (`name`)**
   * *Why:* Very useful and standard for form elements and inputs.
4. **CSS Selectors (`css selector`)**
   * *Why:* The most optimal and fastest native method for complex searches by classes, attributes, or simple hierarchies.
5. **Link Text (`link text`)**
   * *Why:* Allows interacting with `<a>` tags based on exactly what the user sees.
6. **Class (`class name`)**
   * *Why:* Useful for groups of elements, but unstable for individual elements because design classes change frequently.
7. **Tag Name (`tag name`)**
   * *Why:* Too generic (`div`, `input`, `button`). Only useful for filtering or counting.
8. **XPath (`xpath`)**
   * *Why:* **Least recommended (last resort).** Slow because it forces the browser to traverse the entire DOM tree; its syntax is complex and prone to breaking on the slightest structural change.

---

## 🎭 2. Recommended Locators for Playwright

Playwright breaks from the traditional Selenium model and promotes **Resilient Locators** based on user experience and accessibility, discouraging the direct use of generic CSS or XPath.

### Native priority order in Playwright:
1. **`GetByTestId`**: The gold standard. Finds elements using the dedicated test attribute.
2. **`GetByRole`**: Best for simulating real interactions. Finds by the element's accessibility role (button, link, text field) and allows filtering by visible text.
3. **`GetByLabel` / `GetByPlaceholder`**: Ideal for forms, associating fields with their visible label or placeholder text.
4. **`GetByText`**: For validating messages, headings, or static content that the user reads on screen.
5. **`Locator("css=...")`**: Only if the accessibility locators above don't cover the architectural layout need.
6. **`Locator("xpath=...")`**: Absolute last resort. Rarely needed in Playwright.

---

## 💻 3. Syntax Examples in 3 Languages

Below is how the main Playwright locators are written in **TypeScript, Python (Sync), and C# (.NET)**.

*Note: Execution performance is identical across all three languages because they all communicate with the same central Playwright driver through ultra-low-latency RPC calls.*

### 🔹 1. By Test ID (`GetByTestId`)
* **TypeScript:**
  ```typescript
  await page.getByTestId('submit-button').click();
  ```
* **Python:**
  ```python
  page.get_by_test_id("submit-button").click()
  ```
* **C#:**
  ```csharp
  await page.GetByTestId("submit-button").ClickAsync();
  ```

### 🔹 2. By Accessibility Role and Text (`GetByRole`)
* **TypeScript:**
  ```typescript
  await page.getByRole('button', { name: 'Save changes' }).click();
  ```
* **Python:**
  ```python
  page.get_by_role("button", name="Save changes").click()
  ```
* **C#:**
  ```csharp
  await page.GetByRole(AriaRole.Button, new() { Name = "Save changes" }).ClickAsync();
  ```

### 🔹 3. By Visible Text (`GetByText`)
* **TypeScript:**
  ```typescript
  await expect(page.getByText('Registration successful!')).toBeVisible();
  ```
* **Python:**
  ```python
  expect(page.get_by_text("Registration successful!")).to_be_visible()
  ```
* **C#:**
  ```csharp
  await Assertions.Expect(page.GetByText("Registration successful!")).ToBeVisibleAsync();
  ```

### 🔹 4. By Form Label (`GetByLabel`)
* **TypeScript:**
  ```typescript
  await page.getByLabel('Email address').fill('user@example.com');
  ```
* **Python:**
  ```python
  page.get_by_label("Email address").fill("user@example.com")
  ```
* **C#:**
  ```csharp
  await page.GetByLabel("Email address").FillAsync("user@example.com");
  ```

### 🔹 5. By Placeholder (`GetByPlaceholder`)
* **TypeScript:**
  ```typescript
  await page.getByPlaceholder('Enter your password').fill('Secret123');
  ```
* **Python:**
  ```python
  page.get_by_placeholder("Enter your password").fill("Secret123")
  ```
* **C#:**
  ```csharp
  await page.GetByPlaceholder("Enter your password").FillAsync("Secret123");
  ```

### 🔹 6. By Image Alt Text (`GetByAltText`)
* **TypeScript:**
  ```typescript
  await expect(page.getByAltText('Company logo')).toBeVisible();
  ```
* **Python:**
  ```python
  expect(page.get_by_alt_text("Company logo")).to_be_visible()
  ```
* **C#:**
  ```csharp
  await Assertions.Expect(page.GetByAltText("Company logo")).ToBeVisibleAsync();
  ```

### 🔹 7. By `title` Attribute (`GetByTitle`)
* **TypeScript:**
  ```typescript
  await expect(page.getByTitle('Close window')).toBeVisible();
  ```
* **Python:**
  ```python
  expect(page.get_by_title("Close window")).to_be_visible()
  ```
* **C#:**
  ```csharp
  await Assertions.Expect(page.GetByTitle("Close window")).ToBeVisibleAsync();
  ```

### 🔹 8. Traditional CSS Selectors (`Locator`)
* **TypeScript:**
  ```typescript
  await page.locator('div.user-profile > ul.menu-list').click();
  ```
* **Python:**
  ```python
  page.locator("div.user-profile > ul.menu-list").click()
  ```
* **C#:**
  ```csharp
  await page.Locator("div.user-profile > ul.menu-list").ClickAsync();
  ```

### 🔹 9. XPath — Last Resort
Use only when no accessibility locator or CSS can solve the case.
* **TypeScript:**
  ```typescript
  // By text contained in a specific element
  await page.locator('//h2[contains(text(),"Welcome")]').isVisible();
  // By relative position: the input right after a label
  await page.locator('//label[text()="Username"]/following-sibling::input').fill('john');
  ```
* **Python:**
  ```python
  page.locator('//h2[contains(text(),"Welcome")]').is_visible()
  page.locator('//label[text()="Username"]/following-sibling::input').fill("john")
  ```
* **C#:**
  ```csharp
  await page.Locator("//h2[contains(text(),'Welcome')]").IsVisibleAsync();
  await page.Locator("//label[text()='Username']/following-sibling::input").FillAsync("john");
  ```

---

## 🔗 4. Locator Filtering and Chaining

When a page has multiple elements of the same type, Playwright allows you to refine the search without resorting to complex XPath.

### Filter by text within a locator
```typescript
// TypeScript
const row = page.locator('tr').filter({ hasText: 'John Smith' });
await row.getByRole('button', { name: 'Edit' }).click();
```
```python
# Python
row = page.locator("tr").filter(has_text="John Smith")
row.get_by_role("button", name="Edit").click()
```

### Select by position (first, last, nth)
```typescript
// TypeScript — the first result in a list
await page.locator('li.result').first().click();
// The third element (zero-based index)
await page.locator('li.result').nth(2).click();
// The last one
await page.locator('li.result').last().click();
```
```python
# Python
page.locator("li.result").first.click()
page.locator("li.result").nth(2).click()
page.locator("li.result").last.click()
```

### Chaining locators (scope)
Limiting the search to a specific section of the page avoids collisions between elements with the same role or text.
```typescript
// TypeScript — find the "Delete" button only within the "Product A" card
const card = page.locator('div.product-card').filter({ hasText: 'Product A' });
await card.getByRole('button', { name: 'Delete' }).click();
```
```python
# Python
card = page.locator("div.product-card").filter(has_text="Product A")
card.get_by_role("button", name="Delete").click()
```

---

## ⚠️ 5. Anti-patterns: What to Avoid

| Anti-pattern | Problem | Alternative |
| :--- | :--- | :--- |
| `locator('.btn-primary')` for a single button | The class may apply to multiple elements; changes with design. | `getByRole('button', { name: 'Save' })` |
| `locator('div > div > span:nth-child(3)')` | Breaks on any layout change. | `getByTestId(...)` or `getByRole(...)` |
| XPath with numeric indexes `(//input)[2]` | The index shifts if a new field is added to the form. | `getByLabel('Last name')` |
| `locator('#id-123abc')` with auto-generated IDs | Dynamic IDs change on every build or session. | Request `data-testid` from the dev team. |
| Fixed-case text `getByText('SAVE')` | May break if CSS style changes (`text-transform`). | Use the `{ exact: false }` option or `getByRole`. |

---

## 📋 6. Summary Table — When to use each locator?

| Locator | Ideal use case | Stability |
| :--- | :--- | :---: |
| `getByTestId` | Teams that add `data-testid` to their components | ⭐⭐⭐⭐⭐ |
| `getByRole` | Buttons, links, inputs, checkboxes, dialogs | ⭐⭐⭐⭐⭐ |
| `getByLabel` | Form fields associated with a visible label | ⭐⭐⭐⭐⭐ |
| `getByPlaceholder` | Inputs with placeholder text but no explicit label | ⭐⭐⭐⭐ |
| `getByText` | Validation messages, headings, static content | ⭐⭐⭐⭐ |
| `getByAltText` | Images with a descriptive `alt` attribute | ⭐⭐⭐⭐ |
| `getByTitle` | Tooltips or icons with a `title` attribute | ⭐⭐⭐ |
| `locator('css=...')` | Complex structures without an accessibility attribute | ⭐⭐⭐ |
| `locator('xpath=...')` | Last resort: DOM relationships not expressible otherwise | ⭐⭐ |

---

## ⏱️ 7. Wait Handling: Implicit vs. Explicit

### Implicit Wait (Auto-waiting)

Playwright handles this **automatically**. Before executing an action on a locator, Playwright waits — without you writing anything — for:

- The element to exist in the DOM
- The element to be visible
- The element to be enabled (not disabled)
- The element to be stable (not animating)

```python
# Playwright waits automatically — no extra code needed
page.locator("#save-btn").click()
page.locator("input[name='email']").fill("test@mail.com")
```

> This is different from Selenium, where `implicitly_wait(10)` was a crude global timer.

---

### Explicit Wait

You write this yourself when you need to wait for a specific business condition that auto-wait doesn't cover:

```python
# Wait for an element to become visible
page.locator(".success-message").wait_for(state="visible")

# Wait for URL to change (post-login navigation)
page.wait_for_url("**/dashboard")

# Wait for a network response
with page.expect_response("**/api/users") as resp:
    page.locator("#search-btn").click()
response = resp.value
```

---

### When to use each

| Situation | What to use |
| :--- | :--- |
| Click, fill, check on an element | Auto-wait (implicit) — Playwright handles it |
| Wait for a success message to appear | `wait_for(state="visible")` — explicit |
| Wait for navigation to another page | `wait_for_url()` — explicit |
| Wait for an API call to complete | `expect_response()` — explicit |
| Wait for an element to disappear | `wait_for(state="hidden")` — explicit |

> **Practical rule:** if the test fails due to timing and the element is in the wrong state (spinner, loading, etc.), use an explicit wait. Never use `time.sleep()` — it masks problems rather than solving them.
