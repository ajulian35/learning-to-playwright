# Execution Flow — `module1_basics.py`

This file **has no explicit `main`**. In Python, when a script has no
`if __name__ == "__main__"`, all code at the root level (no indentation) is the
entry point — Python executes it top to bottom in order.


Execute:
python module1_basics.py

---

## Execution order

```
line 7-10    →  define variables (suite, version, total_executed, has_failures)
line 16      →  define the VALID_STATES tuple
line 19-25   →  define the list of dicts: cases
line 30-78   →  define functions and the class (only registers them, does NOT execute)

---- actual execution starts here ----
line 85      →  create the TestReport object
line 86      →  print the header
line 89-102  →  iterate over each case with the for loop
line 104     →  calculate the summary
line 105     →  print the footer
line 108-111 →  print the final message
```

---

## Difference from `if __name__ == "__main__"`

`module1_fundamentals.py` uses this block:

```python
if __name__ == "__main__":
    # execution code here
```

That means the code **only runs if the file is executed directly**,
not if another script imports it. This is the recommended Python practice.

In `module1_basics.py` it was intentionally omitted to simplify reading the code.

---

## When to use each approach

| Situation | Recommendation |
|---|---|
| Demo or learning script | Without `main` is fine |
| File that other scripts will import | Use `if __name__ == "__main__"` |
| Production project | Always use `if __name__ == "__main__"` |
