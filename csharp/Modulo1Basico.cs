// =============================================================================
// MÓDULO 1 — Ejemplo Básico: Reporte de Resultados de Pruebas
// =============================================================================

namespace PlaywrightComparison;

[TestFixture]
public class Modulo1BasicoTests
{
    // --- TEMA 1: Variables y tipos de datos ---
    private const string Suite   = "Registro de Usuario";
    private const string Version = "1.0";

    // --- TEMA 2: Estructuras de datos ---

    // Array: estados válidos (no cambia — equivalente a tupla de Python)
    private static readonly string[] EstadosValidos = ["PASSED", "FAILED", "SKIPPED"];

    // Lista de diccionarios: cada caso de prueba
    private static readonly List<Dictionary<string, string>> Casos =
    [
        new() { {"nombre", "Registro con datos válidos"},      {"estado", "PASSED"  } },
        new() { {"nombre", "Registro sin correo"},             {"estado", "FAILED"  } },
        new() { {"nombre", "Registro con contraseña corta"},   {"estado", "FAILED"  } },
        new() { {"nombre", "Registro con usuario duplicado"},  {"estado", "PASSED"  } },
        new() { {"nombre", "Registro desde mobile"},           {"estado", "SKIPPED" } },
    ];


    // --- TEMA 3: Métodos (equivalente a funciones de Python) ---

    private static string ImprimirResultado(string nombre, string estado)
    {
        if (estado == "PASSED")
            return $"  [OK]      {nombre}";
        else if (estado == "FAILED")
            return $"  [FALLO]   {nombre}  <- FALLO DETECTADO";
        else
            return $"  [OMITIDO] {nombre}";
    }

    private static Dictionary<string, int> CalcularResumen(List<Dictionary<string, string>> casos)
    {
        int passed  = casos.Count(c => c["estado"] == "PASSED");
        int failed  = casos.Count(c => c["estado"] == "FAILED");
        int skipped = casos.Count(c => c["estado"] == "SKIPPED");
        int total   = passed + failed;
        int tasa    = total > 0 ? (int)Math.Round((double)passed / total * 100) : 0;
        return new() { {"passed", passed}, {"failed", failed}, {"skipped", skipped}, {"tasa", tasa} };
    }


    // --- TEMA 4: Manejo de excepciones ---

    private static void ValidarEstado(string estado)
    {
        if (!EstadosValidos.Contains(estado))
            throw new ArgumentException($"Estado '{estado}' no reconocido. Use: {string.Join(", ", EstadosValidos)}");
    }


    // --- TEMA 5: Clase básica (OOP) ---

    private class ReportePruebas
    {
        private readonly string _suite;
        private readonly string _version;

        public ReportePruebas(string suite, string version)
        {
            _suite   = suite;
            _version = version;
        }

        public void ImprimirEncabezado()
        {
            TestContext.Out.WriteLine(new string('=', 50));
            TestContext.Out.WriteLine($"  Suite  : {_suite}");
            TestContext.Out.WriteLine($"  Version: {_version}");
            TestContext.Out.WriteLine(new string('=', 50));
        }

        public void ImprimirPie(Dictionary<string, int> resumen)
        {
            TestContext.Out.WriteLine(new string('-', 50));
            TestContext.Out.WriteLine($"  PASSED : {resumen["passed"]}");
            TestContext.Out.WriteLine($"  FAILED : {resumen["failed"]}");
            TestContext.Out.WriteLine($"  SKIPPED: {resumen["skipped"]}");
            TestContext.Out.WriteLine($"  Tasa de exito: {resumen["tasa"]}%");
            TestContext.Out.WriteLine(new string('=', 50));
        }
    }


    // =========================================================================
    // Tests — cada uno demuestra un tema del Módulo 1
    // =========================================================================

    [Test]
    public void Tema1_VariablesYTipos()
    {
        string suite   = Suite;
        string version = Version;
        int totalCasos = Casos.Count;
        bool hayFallos = false;

        Assert.Multiple(() =>
        {
            Assert.That(suite,      Is.EqualTo("Registro de Usuario"));
            Assert.That(version,    Is.EqualTo("1.0"));
            Assert.That(totalCasos, Is.EqualTo(5));
            Assert.That(hayFallos,  Is.False);
        });

        TestContext.Out.WriteLine($"Suite: {suite} | Version: {version} | Casos: {totalCasos}");
    }

    [Test]
    public void Tema2_EstructurasDeDatos()
    {
        // Array (tupla): acceso por índice, longitud fija
        string primerEstado = EstadosValidos[0];
        int cantidadEstados = EstadosValidos.Length;

        // Lista de diccionarios: acceso por clave
        string nombrePrimerCaso = Casos[0]["nombre"];
        string estadoPrimerCaso = Casos[0]["estado"];

        Assert.Multiple(() =>
        {
            Assert.That(primerEstado,    Is.EqualTo("PASSED"));
            Assert.That(cantidadEstados, Is.EqualTo(3));
            Assert.That(nombrePrimerCaso, Does.Contain("válidos"));
            Assert.That(estadoPrimerCaso, Is.EqualTo("PASSED"));
        });

        TestContext.Out.WriteLine($"Estados validos: [{string.Join(", ", EstadosValidos)}]");
        TestContext.Out.WriteLine($"Primer caso: {nombrePrimerCaso} -> {estadoPrimerCaso}");
    }

    [Test]
    public void Tema2_CondicionalesYBucles()
    {
        bool hayFallos = false;
        int totalEjecutados = 0;

        // Bucle foreach + condicional
        foreach (var caso in Casos)
        {
            string mensaje = ImprimirResultado(caso["nombre"], caso["estado"]);
            TestContext.Out.WriteLine(mensaje);
            totalEjecutados++;

            if (caso["estado"] == "FAILED")
                hayFallos = true;
        }

        Assert.That(hayFallos,        Is.True);
        Assert.That(totalEjecutados,  Is.EqualTo(5));

        // Condicional para mensaje final
        string mensajeFinal = hayFallos
            ? "[ATENCION] Hay casos fallidos. Revisar antes de liberar."
            : "[OK] Todo en orden.";

        TestContext.Out.WriteLine(mensajeFinal);
    }

    [Test]
    public void Tema3_MetodosYExcepciones()
    {
        // Estado válido — no lanza excepción
        Assert.DoesNotThrow(() => ValidarEstado("PASSED"));

        // Estado inválido — lanza ArgumentException
        var ex = Assert.Throws<ArgumentException>(() => ValidarEstado("PENDIENTE"));
        Assert.That(ex!.Message, Does.Contain("PENDIENTE"));

        TestContext.Out.WriteLine($"Excepcion capturada: {ex.Message}");
    }

    [Test]
    public void Tema4_ResumenConMetodos()
    {
        var resumen = CalcularResumen(Casos);

        Assert.Multiple(() =>
        {
            Assert.That(resumen["passed"],  Is.EqualTo(2));
            Assert.That(resumen["failed"],  Is.EqualTo(2));
            Assert.That(resumen["skipped"], Is.EqualTo(1));
            Assert.That(resumen["tasa"],    Is.EqualTo(50));
        });

        TestContext.Out.WriteLine($"Passed: {resumen["passed"]} | Failed: {resumen["failed"]} | Tasa: {resumen["tasa"]}%");
    }

    [Test]
    public void Tema5_OOP_ClaseReporte()
    {
        var reporte = new ReportePruebas(Suite, Version);
        var resumen = CalcularResumen(Casos);

        // Ejecuta el flujo completo usando la clase
        reporte.ImprimirEncabezado();

        foreach (var caso in Casos)
        {
            try
            {
                ValidarEstado(caso["estado"]);
                TestContext.Out.WriteLine(ImprimirResultado(caso["nombre"], caso["estado"]));
            }
            catch (ArgumentException ex)
            {
                TestContext.Out.WriteLine($"  [ERROR] {ex.Message}");
            }
        }

        reporte.ImprimirPie(resumen);

        Assert.That(resumen["tasa"], Is.EqualTo(50));
    }
}
