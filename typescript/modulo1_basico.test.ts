// =============================================================================
// MÓDULO 1 — Tests con Jest: Reporte de Resultados de Pruebas
// Equivalente a Modulo1Basico.cs (NUnit) y modulo1_basico.py (script)
// =============================================================================

// --- Tipos y datos compartidos ---

const ESTADOS_VALIDOS = ["PASSED", "FAILED", "SKIPPED"] as const;
type Estado = typeof ESTADOS_VALIDOS[number];

interface CasoPrueba {
    nombre: string;
    estado: Estado;
}

interface Resumen {
    passed: number;
    failed: number;
    skipped: number;
    tasa: number;
}

const SUITE   = "Registro de Usuario";
const VERSION = "1.0";

const casos: CasoPrueba[] = [
    { nombre: "Registro con datos validos",      estado: "PASSED"  },
    { nombre: "Registro sin correo",             estado: "FAILED"  },
    { nombre: "Registro con contrasena corta",   estado: "FAILED"  },
    { nombre: "Registro con usuario duplicado",  estado: "PASSED"  },
    { nombre: "Registro desde mobile",           estado: "SKIPPED" },
];


// --- Funciones a testear ---

function imprimirResultado(nombre: string, estado: Estado): string {
    if (estado === "PASSED")  return `  [OK]      ${nombre}`;
    if (estado === "FAILED")  return `  [FALLO]   ${nombre}  <- FALLO DETECTADO`;
    return `  [OMITIDO] ${nombre}`;
}

function calcularResumen(casos: CasoPrueba[]): Resumen {
    const passed  = casos.filter(c => c.estado === "PASSED").length;
    const failed  = casos.filter(c => c.estado === "FAILED").length;
    const skipped = casos.filter(c => c.estado === "SKIPPED").length;
    const total   = passed + failed;
    const tasa    = total > 0 ? Math.round(passed / total * 100) : 0;
    return { passed, failed, skipped, tasa };
}

function validarEstado(estado: string): void {
    if (!(ESTADOS_VALIDOS as readonly string[]).includes(estado))
        throw new Error(`Estado '${estado}' no reconocido. Use: ${ESTADOS_VALIDOS.join(", ")}`);
}

class ReportePruebas {
    constructor(private suite: string, private version: string) {}
    getSuite()   { return this.suite; }
    getVersion() { return this.version; }
}


// =============================================================================
// Tests — cada describe corresponde a un tema del Módulo 1
// =============================================================================

// --- TEMA 1: Variables y tipos de datos ---
describe("Tema1 - Variables y tipos", () => {
    test("las variables tienen los tipos y valores correctos", () => {
        const suite: string  = SUITE;
        const version: string = VERSION;
        const totalCasos: number = casos.length;
        const hayFallos: boolean = false;

        expect(suite).toBe("Registro de Usuario");
        expect(version).toBe("1.0");
        expect(totalCasos).toBe(5);
        expect(hayFallos).toBe(false);
    });
});

// --- TEMA 2: Estructuras de datos ---
describe("Tema2 - Estructuras de datos", () => {
    test("el array de estados validos tiene 3 elementos", () => {
        expect(ESTADOS_VALIDOS.length).toBe(3);
        expect(ESTADOS_VALIDOS[0]).toBe("PASSED");
    });

    test("el array de casos tiene la estructura correcta", () => {
        expect(casos.length).toBe(5);
        expect(casos[0].nombre).toContain("validos");
        expect(casos[0].estado).toBe("PASSED");
    });

    test("se pueden filtrar casos por estado", () => {
        const soloFallidos = casos.filter(c => c.estado === "FAILED");
        expect(soloFallidos.length).toBe(2);
    });
});

// --- TEMA 2 (cont.): Condicionales y bucles ---
describe("Tema2 - Condicionales y bucles", () => {
    test("el bucle detecta fallos y acumula el total ejecutado", () => {
        let hayFallos = false;
        let totalEjecutados = 0;

        for (const caso of casos) {
            console.log(imprimirResultado(caso.nombre, caso.estado));
            totalEjecutados++;
            if (caso.estado === "FAILED") hayFallos = true;
        }

        expect(hayFallos).toBe(true);
        expect(totalEjecutados).toBe(5);
    });

    test("el mensaje final depende del condicional", () => {
        const hayFallos = true;
        const mensaje = hayFallos
            ? "[ATENCION] Hay casos fallidos. Revisar antes de liberar."
            : "[OK] Todo en orden.";

        expect(mensaje).toContain("ATENCION");
    });
});

// --- TEMA 3: Funciones ---
describe("Tema3 - Funciones y excepciones", () => {
    test("imprimirResultado retorna el mensaje correcto por estado", () => {
        expect(imprimirResultado("Login", "PASSED")).toContain("[OK]");
        expect(imprimirResultado("Login", "FAILED")).toContain("[FALLO]");
        expect(imprimirResultado("Login", "SKIPPED")).toContain("[OMITIDO]");
    });

    test("validarEstado no lanza error con estados validos", () => {
        expect(() => validarEstado("PASSED")).not.toThrow();
        expect(() => validarEstado("FAILED")).not.toThrow();
    });

    test("validarEstado lanza error con estado desconocido", () => {
        expect(() => validarEstado("PENDIENTE"))
            .toThrow("Estado 'PENDIENTE' no reconocido");
    });
});

// --- TEMA 4: Resumen con funciones ---
describe("Tema4 - calcularResumen", () => {
    test("calcula los conteos y tasa de exito correctamente", () => {
        const resumen = calcularResumen(casos);

        expect(resumen.passed).toBe(2);
        expect(resumen.failed).toBe(2);
        expect(resumen.skipped).toBe(1);
        expect(resumen.tasa).toBe(50);
    });

    test("tasa es 0 si no hay casos ejecutados", () => {
        const vacios: CasoPrueba[] = [
            { nombre: "Caso omitido", estado: "SKIPPED" },
        ];
        const resumen = calcularResumen(vacios);
        expect(resumen.tasa).toBe(0);
    });
});

// --- TEMA 5: OOP ---
describe("Tema5 - Clase ReportePruebas", () => {
    test("el constructor asigna suite y version correctamente", () => {
        const reporte = new ReportePruebas(SUITE, VERSION);
        expect(reporte.getSuite()).toBe("Registro de Usuario");
        expect(reporte.getVersion()).toBe("1.0");
    });

    test("se pueden crear multiples instancias independientes", () => {
        const r1 = new ReportePruebas("Suite A", "1.0");
        const r2 = new ReportePruebas("Suite B", "2.0");

        expect(r1.getSuite()).not.toBe(r2.getSuite());
        expect(r1.getVersion()).not.toBe(r2.getVersion());
    });
});
