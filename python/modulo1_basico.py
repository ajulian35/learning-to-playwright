# =============================================================================
# MÓDULO 1 — Ejemplo Básico: Reporte de Resultados de Pruebas
# =============================================================================


# --- TEMA 1: Variables y tipos de datos ---
suite = "Registro de Usuario"       # str
version = "1.0"                     # str
total_ejecutados = 0                # int
hay_fallos = False                  # bool


# --- TEMA 2: Estructuras de datos ---

# Tupla: estados válidos (no cambia nunca)
ESTADOS_VALIDOS = ("PASSED", "FAILED", "SKIPPED")

# Lista de diccionarios: cada caso de prueba
casos = [
    {"nombre": "Registro con datos válidos",       "estado": "PASSED"},
    {"nombre": "Registro sin correo",              "estado": "FAILED"},
    {"nombre": "Registro con contraseña corta",    "estado": "FAILED"},
    {"nombre": "Registro con usuario duplicado",   "estado": "PASSED"},
    {"nombre": "Registro desde mobile",            "estado": "SKIPPED"},
]


# --- TEMA 3: Funciones ---

def imprimir_resultado(nombre: str, estado: str) -> str:
    """Retorna un mensaje formateado según el estado del caso."""
    if estado == "PASSED":
        mensaje = f"  [OK]      {nombre}"
    elif estado == "FAILED":
        mensaje = f"  [FALLO]   {nombre}  <- FALLO DETECTADO"
    else:
        mensaje = f"  [OMITIDO] {nombre}"
    return mensaje


def calcular_resumen(casos: list) -> dict:
    """Cuenta resultados por estado y calcula tasa de éxito."""
    passed  = sum(1 for c in casos if c["estado"] == "PASSED")
    failed  = sum(1 for c in casos if c["estado"] == "FAILED")
    skipped = sum(1 for c in casos if c["estado"] == "SKIPPED")
    total   = passed + failed
    tasa    = round(passed / total * 100) if total > 0 else 0
    return {"passed": passed, "failed": failed, "skipped": skipped, "tasa": tasa}


# --- TEMA 4: Manejo de excepciones ---

def validar_estado(estado: str):
    """Lanza error si el estado no es reconocido."""
    if estado not in ESTADOS_VALIDOS:
        raise ValueError(f"Estado '{estado}' no reconocido. Use: {ESTADOS_VALIDOS}")


# --- TEMA 5: Clase básica (OOP) ---

class ReportePruebas:
    def __init__(self, suite: str, version: str):
        self.suite = suite
        self.version = version

    def imprimir_encabezado(self):
        print("=" * 50)
        print(f"  Suite  : {self.suite}")
        print(f"  Versión: {self.version}")
        print("=" * 50)

    def imprimir_pie(self, resumen: dict):
        print("-" * 50)
        print(f"  PASSED : {resumen['passed']}")
        print(f"  FAILED : {resumen['failed']}")
        print(f"  SKIPPED: {resumen['skipped']}")
        print(f"  Tasa de éxito: {resumen['tasa']}%")
        print("=" * 50)


# =============================================================================
# Ejecución
# =============================================================================

reporte = ReportePruebas(suite, version)
reporte.imprimir_encabezado()

# Bucle for: recorre cada caso
for caso in casos:

    # try/except: valida el estado antes de imprimir
    try:
        validar_estado(caso["estado"])
        print(imprimir_resultado(caso["nombre"], caso["estado"]))
        total_ejecutados += 1

        # Condicional: marca si hubo al menos un fallo
        if caso["estado"] == "FAILED":
            hay_fallos = True

    except ValueError as e:
        print(f"  [ERROR] {e}")

resumen = calcular_resumen(casos)
reporte.imprimir_pie(resumen)

# Mensaje final con condicional
if hay_fallos:
    print("  [ATENCION] Hay casos fallidos. Revisar antes de liberar.")
else:
    print("  [OK] Todo en orden.")
