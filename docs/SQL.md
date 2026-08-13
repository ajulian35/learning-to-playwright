# 🚀 SQL Cheat Sheet: Guía de Referencia Rápida
Esta guía contiene los comandos, funciones y cláusulas esenciales de SQL para el diseño, consulta y optimización de bases de datos relacionales. Ideal para estudiantes de ingeniería de sistemas y desarrolladores.

---

## 1. Tipos de Combinaciones (JOINS)
* **`INNER JOIN` / `JOIN`**: Combina filas de ambas tablas solo cuando hay una coincidencia exacta en la condición indicada (`ON`). Es el tipo de unión por defecto.
* **`LEFT JOIN`**: Trae todos los registros de la tabla izquierda y las coincidencias de la derecha. Si no hay pareja, rellena los campos de la derecha con `NULL`.
* **`RIGHT JOIN`**: Trae todos los registros de la tabla derecha y las coincidencias de la izquierda. Si no hay pareja, rellena los campos de la izquierda con `NULL`.
* **`FULL OUTER JOIN`**: Trae absolutamente todos los registros de ambas tablas, tengan o no relación entre sí, rellenando los campos vacíos con `NULL`.
* **`CROSS JOIN`**: Realiza un producto cartesiano. Multiplica cada fila de la primera tabla por cada fila de la segunda tabla (genera combinaciones masivas).
* **`SELF JOIN`**: Técnica de unir una tabla consigo misma (utilizando alias distintos como `tabla A` y `tabla B`) para consultar estructuras jerárquicas como jefes y empleados.

---

## 2. Funciones de Agregación
* **`COUNT(*)`**: Cuenta el total de filas devueltas por la consulta, incluyendo aquellos registros cuyos campos contengan valores nulos (`NULL`).
* **`COUNT(columna)`**: Cuenta únicamente los registros que contienen un valor válido en esa columna específica (ignora por completo los valores `NULL`).
* **`SUM()`**: Suma todos los valores numéricos de una columna. Devuelve `NULL` si el grupo evaluado no contiene ningún dato.
* **`AVG()`**: Calcula el promedio aritmético de una columna numérica e ignora los valores `NULL` automáticamente al realizar el cálculo.
* **`MAX()`**: Encuentra y devuelve el valor más alto (o la fecha más reciente/letra final en textos) de una columna.
* **`MIN()`**: Encuentra y devuelve el valor más bajo (o la fecha más antigua/letra inicial en textos) de una columna.

---

## 3. Cláusulas de Agrupamiento y Filtro Avanzado
* **`GROUP BY`**: Agrupa filas que comparten los mismos valores en columnas específicas para poder aplicar funciones de agregación sobre cada grupo.
* **`HAVING`**: Filtra los resultados **después** de haber sido agrupados por el `GROUP BY`. Es el equivalente al `WHERE` pero exclusivo para funciones de agregación.
* **`ORDER BY`**: Ordena el resultado final de la consulta de forma ascendente (`ASC`, valor por defecto) o descendente (`DESC`).

---

## 4. Control de Valores Nulos y Lógica
* **`COALESCE(val1, val2, ...)`**: Evalúa los argumentos en orden (de izquierda a derecha) y devuelve el primer valor que encuentre que **no** sea `NULL`. Ideal para asignar valores por defecto (como un `0`).
* **`CASE WHEN ... THEN ... ELSE ... END`**: Estructura condicional (equivalente al `if-else` en lenguajes de programación) para evaluar condiciones fila por fila directamente en la consulta.
* **`IS NULL` / `IS NOT NULL`**: Operadores lógicos utilizados en la cláusula `WHERE` para verificar correctamente si un campo está vacío o contiene información.

---

## 5. Estructuras Avanzadas y Rendimiento
* **`WITH (CTE)`**: Expresión de Tabla Común (Common Table Expression). Permite crear tablas temporales con nombre dentro de la misma consulta para organizar y simplificar código complejo.
* **`WITH RECURSIVE`**: Variante de las CTEs que permite a una consulta llamarse a sí misma de forma iterativa para recorrer jerarquías profundas o infinitas (como organigramas o árboles de categorías).
* **`CREATE INDEX`**: Comando para crear una estructura de datos ordenada (índice) sobre una o más columnas, acelerando drásticamente búsquedas, agrupaciones y uniones (`JOINS`).

---

## 6. operaciones de conjuntos
* **`UNION ALL`**: Todo el Conjunto A + Todo el Conjunto B (sin repetidos).
* **`UNION`**: Todo el Conjunto A + Todo el Conjunto B (con repetidos).
* **`INTERSECT`**: Solo la zona donde el Conjunto A y el Conjunto B se cruzan.
* **`EXCEPT / MINU`**:  El Conjunto A limpio, quitándole cualquier elemento del Conjunto B.

---

## 7. Herramientas de SQL
* **`DISTINCT`**: consultar (SELECT)Eliminar filas repetidas en el resultado visual.
* **`UNIQUE`**: crear la tabla (CREATE)Garantizar por seguridad que nadie duplique un dato (ej. Cédula, RFC, Correo).
* **`LIMIT / TOP`**: consultar (SELECT)Controlar el volumen de datos para no saturar la memoria de la aplicación.
* **`OFFSET`**: Trabaja de la mano con LIMIT. Le dice a la base de datos cuántos registros debe saltarse antes de empezar a mostrar los resultados. LIMIT 10 OFFSET 20;

---
