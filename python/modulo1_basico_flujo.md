# Flujo de Ejecución — `modulo1_basico.py`

Este archivo **no tiene un `main` explícito**. En Python, cuando un script no tiene
`if __name__ == "__main__"`, todo el código al nivel raíz (sin indentación) es el
punto de entrada — Python lo ejecuta de arriba a abajo en orden.


Execute:
python modulo1_basico.py
---

## Orden de ejecución

```
línea 7-10   →  define variables (suite, version, total_ejecutados, hay_fallos)
línea 16     →  define la tupla ESTADOS_VALIDOS
línea 19-25  →  define la lista de diccionarios: casos
línea 30-78  →  define funciones y la clase (solo las registra, NO las ejecuta)

---- aquí empieza la ejecución real ----
línea 85     →  crea el objeto ReportePruebas
línea 86     →  imprime el encabezado
línea 89-102 →  recorre cada caso con el bucle for
línea 104    →  calcula el resumen
línea 105    →  imprime el pie
línea 108-111→  imprime el mensaje final
```

---

## Diferencia con `if __name__ == "__main__"`

`modulo1_fundamentos.py` sí usa este bloque:

```python
if __name__ == "__main__":
    # código de ejecución aquí
```

Eso significa que el código **solo se ejecuta si el archivo se corre directamente**,
no si otro script lo importa. Es la práctica recomendada en Python.

En `modulo1_basico.py` se omitió a propósito para simplificar la lectura del código.

---

## ¿Cuándo usar cada uno?

| Situación | Recomendación |
|---|---|
| Script de demostración o aprendizaje | Sin `main` está bien |
| Archivo que otros scripts van a importar | Usar `if __name__ == "__main__"` |
| Proyecto de producción | Siempre usar `if __name__ == "__main__"` |
