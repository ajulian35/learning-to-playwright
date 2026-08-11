# =============================================================================
# MÓDULO 1: Fundamentos de Programación con Python
# Contexto: Mini Bug Tracker - Sistema de gestión de defectos para un QA
# Cubre: variables/tipos, condicionales, bucles, listas/dicts, funciones,
#        manejo de excepciones y clases (OOP)
# =============================================================================


# -----------------------------------------------------------------------------
# TEMA 1: Variables, tipos de datos y operadores
# -----------------------------------------------------------------------------
SEVERIDADES_VALIDAS = ["crítica", "alta", "media", "baja"]  # list (constante de config)
PROYECTO = "Portal de Clientes"                             # str
VERSION = 1.0                                               # float
MAX_BUGS_POR_SPRINT = 20                                    # int
DEBUG_MODE = False                                          # bool


# -----------------------------------------------------------------------------
# TEMA 2: Estructuras de datos — listas, diccionarios, tuplas y sets
# -----------------------------------------------------------------------------

# Diccionario: cada bug es un registro de datos clave-valor
def crear_bug(id: int, titulo: str, severidad: str, estado: str = "abierto") -> dict:
    return {
        "id": id,
        "titulo": titulo,
        "severidad": severidad,
        "estado": estado,
    }

# Lista: colección de bugs del sprint actual
bugs_sprint: list = []

# Tupla: estados posibles (inmutable — no deben cambiar en runtime)
ESTADOS_POSIBLES: tuple = ("abierto", "en progreso", "resuelto", "cerrado")

# Set: módulos únicos con al menos un bug activo (sin duplicados)
modulos_afectados: set = set()


# -----------------------------------------------------------------------------
# TEMA 3: Funciones, argumentos, retornos y manejo de excepciones (try/except)
# -----------------------------------------------------------------------------

def agregar_bug(titulo: str, severidad: str, modulo: str) -> dict:
    """Registra un nuevo bug validando sus datos."""
    if severidad not in SEVERIDADES_VALIDAS:
        raise ValueError(f"Severidad '{severidad}' no válida. Use: {SEVERIDADES_VALIDAS}")

    bug_id = len(bugs_sprint) + 1
    bug = crear_bug(bug_id, titulo, severidad)
    bugs_sprint.append(bug)
    modulos_afectados.add(modulo)

    return bug


def cambiar_estado(bug_id: int, nuevo_estado: str) -> bool:
    """Cambia el estado de un bug. Retorna True si tuvo éxito."""
    if nuevo_estado not in ESTADOS_POSIBLES:
        raise ValueError(f"Estado '{nuevo_estado}' no permitido.")

    for bug in bugs_sprint:
        if bug["id"] == bug_id:
            bug["estado"] = nuevo_estado
            return True
    return False  # bug no encontrado


def obtener_resumen() -> dict:
    """Calcula métricas del sprint actual."""
    total = len(bugs_sprint)
    resueltos = sum(1 for b in bugs_sprint if b["estado"] in ("resuelto", "cerrado"))
    abiertos = total - resueltos
    tasa_resolucion = (resueltos / total * 100) if total > 0 else 0.0

    return {
        "total": total,
        "resueltos": resueltos,
        "abiertos": abiertos,
        "tasa_resolucion": round(tasa_resolucion, 2),
    }


# -----------------------------------------------------------------------------
# TEMA 4 (OOP): Clase que encapsula el Bug Tracker completo
# -----------------------------------------------------------------------------

class BugTracker:
    """Gestiona el ciclo de vida de los bugs de un proyecto."""

    # Atributo de clase (compartido por todas las instancias)
    instancias_creadas: int = 0

    def __init__(self, proyecto: str, version: float):
        # Atributos de instancia
        self.proyecto = proyecto
        self.version = version
        self._bugs: list = []           # privado por convención
        self._proximo_id: int = 1

        BugTracker.instancias_creadas += 1

    # Método de instancia
    def registrar(self, titulo: str, severidad: str) -> dict:
        try:
            bug = crear_bug(self._proximo_id, titulo, severidad)
            self._bugs.append(bug)
            self._proximo_id += 1
            return bug
        except ValueError as e:
            print(f"  [ERROR] No se pudo registrar el bug: {e}")
            return {}

    def listar_por_severidad(self, severidad: str) -> list:
        return [b for b in self._bugs if b["severidad"] == severidad]

    def resumen(self) -> dict:
        total = len(self._bugs)
        criticos = len(self.listar_por_severidad("crítica"))
        return {"proyecto": self.proyecto, "version": self.version,
                "total_bugs": total, "criticos": criticos}

    # Método especial (dunder) — representación legible del objeto
    def __str__(self) -> str:
        return f"BugTracker[{self.proyecto} v{self.version}] — {len(self._bugs)} bug(s)"


# =============================================================================
# DEMO: Ejecución del programa
# =============================================================================

if __name__ == "__main__":
    print("=" * 60)
    print(f"  Mini Bug Tracker — {PROYECTO} v{VERSION}")
    print("=" * 60)

    # --- Uso de funciones standalone + manejo de excepciones ---
    print("\n1. Registrando bugs (funciones y try/except):")

    entradas = [
        ("Login falla con usuario vacío",   "crítica",  "Autenticación"),
        ("Botón 'Guardar' no responde",     "alta",     "Formularios"),
        ("Texto del footer mal alineado",   "baja",     "UI"),
        ("Error al exportar PDF",           "alta",     "Reportes"),
        ("Severidad inválida de prueba",    "urgente",  "Test"),   # debe fallar
    ]

    for titulo, sev, modulo in entradas:
        try:
            bug = agregar_bug(titulo, sev, modulo)
            print(f"  [OK] Bug #{bug['id']}: '{bug['titulo']}' ({bug['severidad']})")
        except ValueError as e:
            print(f"  [ERROR] {e}")

    # --- Condicionales y operadores ---
    print("\n2. Verificando límite del sprint (condicionales):")
    cantidad_actual = len(bugs_sprint)
    if cantidad_actual == 0:
        print("  Sin bugs registrados.")
    elif cantidad_actual < MAX_BUGS_POR_SPRINT:
        disponibles = MAX_BUGS_POR_SPRINT - cantidad_actual
        print(f"  {cantidad_actual} bug(s) registrados. Quedan {disponibles} slots disponibles.")
    else:
        print(f"  ¡ALERTA! Límite del sprint alcanzado ({MAX_BUGS_POR_SPRINT} bugs).")

    # --- Bucle for sobre lista ---
    print("\n3. Listado de todos los bugs (bucle for):")
    for bug in bugs_sprint:
        print(f"  #{bug['id']} | {bug['severidad']:8} | {bug['estado']:12} | {bug['titulo']}")

    # --- Cambio de estado y bucle while ---
    print("\n4. Resolviendo bugs críticos (bucle while):")
    pendientes_criticos = [b for b in bugs_sprint if b["severidad"] == "crítica"]
    index = 0
    while index < len(pendientes_criticos):
        bug = pendientes_criticos[index]
        cambiar_estado(bug["id"], "resuelto")
        print(f"  Bug #{bug['id']} marcado como 'resuelto'.")
        index += 1

    # --- Resumen con diccionario ---
    print("\n5. Resumen del sprint (diccionario + operadores):")
    resumen = obtener_resumen()
    for clave, valor in resumen.items():
        print(f"  {clave:<20}: {valor}")

    # --- Set: módulos únicos afectados ---
    print(f"\n6. Módulos únicos con bugs (set): {modulos_afectados}")

    # --- Tupla: estados posibles ---
    print(f"\n7. Estados permitidos (tupla): {ESTADOS_POSIBLES}")

    # --- OOP: uso de la clase BugTracker ---
    print("\n8. Uso de la clase BugTracker (OOP):")
    tracker = BugTracker("App Móvil", 2.1)
    tracker.registrar("Crash al iniciar sesión", "crítica")
    tracker.registrar("Imagen no carga en perfil", "media")
    tracker.registrar("Severidad incorrecta", "grave")      # dispara excepción interna
    print(f"  {tracker}")                                   # llama a __str__
    print(f"  Resumen: {tracker.resumen()}")
    print(f"  Bugs críticos: {tracker.listar_por_severidad('crítica')}")
    print(f"  Total instancias de BugTracker creadas: {BugTracker.instancias_creadas}")

    print("\n" + "=" * 60)
    print("  Fin del Módulo 1")
    print("=" * 60)
