// =============================================================================
// MÓDULO 1 — Ejemplo Básico: Reporte de Resultados de Pruebas
// =============================================================================
// --- TEMA 1: Variables y tipos de datos ---
const suite: string  = "Registro de Usuario";
const version: string = "1.0";
let totalEjecutados: number = 0;
let hayFallos: boolean = false;


// --- TEMA 2: Estructuras de datos ---

// Tupla (readonly array): estados válidos — no cambia nunca
const ESTADOS_VALIDOS = ["PASSED", "FAILED", "SKIPPED"] as const;
type Estado = typeof ESTADOS_VALIDOS[number];   // "PASSED" | "FAILED" | "SKIPPED"

// Interface: define la forma de un caso de prueba (equivalente a dict en Python)
interface CasoPrueba {
    nombre: string;
    estado: Estado;
}

// Array de objetos: cada caso de prueba
const casos: CasoPrueba[] = [
    { nombre: "Registro con datos validos",      estado: "PASSED"  },
    { nombre: "Registro sin correo",             estado: "FAILED"  },
    { nombre: "Registro con contrasena corta",   estado: "FAILED"  },
    { nombre: "Registro con usuario duplicado",  estado: "PASSED"  },
    { nombre: "Registro desde mobile",           estado: "SKIPPED" },
];


// --- TEMA 3: Funciones ---

function imprimirResultado(nombre: string, estado: Estado): string {
    if (estado === "PASSED")
        return `  [OK]      ${nombre}`;
    else if (estado === "FAILED")
        return `  [FALLO]   ${nombre}  <- FALLO DETECTADO`;
    else
        return `  [OMITIDO] ${nombre}`;
}

interface Resumen {
    passed: number;
    failed: number;
    skipped: number;
    tasa: number;
}

function calcularResumen(casos: CasoPrueba[]): Resumen {
    const passed  = casos.filter(c => c.estado === "PASSED").length;
    const failed  = casos.filter(c => c.estado === "FAILED").length;
    const skipped = casos.filter(c => c.estado === "SKIPPED").length;
    const total   = passed + failed;
    const tasa    = total > 0 ? Math.round(passed / total * 100) : 0;
    return { passed, failed, skipped, tasa };
}


// --- TEMA 4: Manejo de excepciones ---

function validarEstado(estado: string): void {
    if (!(ESTADOS_VALIDOS as readonly string[]).includes(estado))
        throw new Error(`Estado '${estado}' no reconocido. Use: ${ESTADOS_VALIDOS.join(", ")}`);
}


// --- TEMA 5: Clase básica (OOP) ---

class ReportePruebas {
    constructor(private suite: string, private version: string) {}

    imprimirEncabezado(): void {
        console.log("=".repeat(50));
        console.log(`  Suite  : ${this.suite}`);
        console.log(`  Version: ${this.version}`);
        console.log("=".repeat(50));
    }

    imprimirPie(resumen: Resumen): void {
        console.log("-".repeat(50));
        console.log(`  PASSED : ${resumen.passed}`);
        console.log(`  FAILED : ${resumen.failed}`);
        console.log(`  SKIPPED: ${resumen.skipped}`);
        console.log(`  Tasa de exito: ${resumen.tasa}%`);
        console.log("=".repeat(50));
    }
}


// =============================================================================
// Ejecucion
// =============================================================================

const reporte = new ReportePruebas(suite, version);
reporte.imprimirEncabezado();

// Bucle for...of: recorre cada caso
for (const caso of casos) {

    // try/catch: valida el estado antes de imprimir
    try {
        validarEstado(caso.estado);
        console.log(imprimirResultado(caso.nombre, caso.estado));
        totalEjecutados++;

        // Condicional: marca si hubo al menos un fallo
        if (caso.estado === "FAILED")
            hayFallos = true;

    } catch (e) {
        console.log(`  [ERROR] ${(e as Error).message}`);
    }
}

const resumen = calcularResumen(casos);
reporte.imprimirPie(resumen);

// Mensaje final con condicional
if (hayFallos)
    console.log("  [ATENCION] Hay casos fallidos. Revisar antes de liberar.");
else
    console.log("  [OK] Todo en orden.");
