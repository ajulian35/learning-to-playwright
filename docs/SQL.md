# 🚀 SQL Cheat Sheet: Quick Reference Guide
This guide contains the essential SQL commands, functions, and clauses for designing, querying, and optimizing relational databases.

---

## 1. Join Types

* **`INNER JOIN` / `JOIN`**: Combines rows from both tables only when there is an exact match on the specified condition (`ON`). This is the default join type.
* **`LEFT JOIN`**: Returns all records from the left table and matching records from the right. If there is no match, the right-side fields are filled with `NULL`.
* **`RIGHT JOIN`**: Returns all records from the right table and matching records from the left. If there is no match, the left-side fields are filled with `NULL`.
* **`FULL OUTER JOIN`**: Returns all records from both tables regardless of whether they match, filling unmatched fields with `NULL`.
* **`CROSS JOIN`**: Performs a Cartesian product. Multiplies every row from the first table by every row from the second table (generates massive combinations).
* **`SELF JOIN`**: Technique for joining a table with itself (using different aliases like `table A` and `table B`) to query hierarchical structures such as managers and employees.

---

## 2. Aggregate Functions

* **`COUNT(*)`**: Counts the total number of rows returned by the query, including rows whose fields contain null values (`NULL`).
* **`COUNT(column)`**: Counts only the records that have a valid value in that specific column (completely ignores `NULL` values).
* **`SUM()`**: Sums all numeric values in a column. Returns `NULL` if the evaluated group contains no data.
* **`AVG()`**: Calculates the arithmetic average of a numeric column and automatically ignores `NULL` values.
* **`MAX()`**: Finds and returns the highest value (or the most recent date / last letter for text) in a column.
* **`MIN()`**: Finds and returns the lowest value (or the oldest date / first letter for text) in a column.

---

## 3. Grouping and Advanced Filter Clauses

* **`GROUP BY`**: Groups rows that share the same values in specific columns so that aggregate functions can be applied to each group.
* **`HAVING`**: Filters results **after** they have been grouped by `GROUP BY`. It is the equivalent of `WHERE` but exclusive to aggregate functions.
* **`ORDER BY`**: Sorts the final query result in ascending (`ASC`, default) or descending (`DESC`) order.

---

## 4. Null Value Control and Logic

* **`COALESCE(val1, val2, ...)`**: Evaluates arguments in order (left to right) and returns the first value that is **not** `NULL`. Ideal for assigning default values (such as `0`).
* **`CASE WHEN ... THEN ... ELSE ... END`**: Conditional structure (equivalent to `if-else` in programming languages) for evaluating conditions row by row directly in the query.
* **`IS NULL` / `IS NOT NULL`**: Logical operators used in the `WHERE` clause to correctly check whether a field is empty or contains data.

---

## 5. Advanced Structures and Performance

* **`WITH (CTE)`**: Common Table Expression. Allows creating named temporary tables within the same query to organize and simplify complex code.
* **`WITH RECURSIVE`**: Variant of CTEs that allows a query to call itself iteratively to traverse deep or infinite hierarchies (such as org charts or category trees).
* **`CREATE INDEX`**: Command to create an ordered data structure (index) on one or more columns, drastically speeding up searches, groupings, and joins.

---

## 6. Set Operations

* **`UNION ALL`**: All of Set A + All of Set B (including duplicates).
* **`UNION`**: All of Set A + All of Set B (removing duplicates).
* **`INTERSECT`**: Only the rows that exist in both Set A and Set B.
* **`EXCEPT / MINUS`**: Set A minus any elements that also appear in Set B.

---

## 7. SQL Utilities

* **`DISTINCT`**: Used in `SELECT` — removes duplicate rows from the result set.
* **`UNIQUE`**: Used in `CREATE TABLE` — ensures no duplicate values are inserted in a column (e.g. ID, email).
* **`LIMIT / TOP`**: Used in `SELECT` — controls the volume of data returned to avoid saturating application memory.
* **`OFFSET`**: Works alongside `LIMIT`. Tells the database how many records to skip before starting to return results. Example: `LIMIT 10 OFFSET 20`.

---
