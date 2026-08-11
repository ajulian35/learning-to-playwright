// =============================================================================
// MÓDULO 1: Fundamentos de Programación con C#
// Contexto: Mini Bug Tracker - Sistema de gestión de defectos para un QA
// Cubre: variables/tipos, condicionales, bucles, listas/dicts, funciones,
//        manejo de excepciones y clases (OOP)
// Se ejecuta como tests de NUnit para que sea consistente con el proyecto.
// =============================================================================

namespace PlaywrightComparison;


// -----------------------------------------------------------------------------
// TEMA 1 (OOP): Clase Bug Tracker
// Incluye: atributos, constructor, métodos de instancia y estáticos
// -----------------------------------------------------------------------------

public class BugTracker
{
    // TEMA 1: Constantes y tipos de datos
    public const string NombreProyecto = "Portal de Clientes";
    public const double Version = 1.0;
    public const int MaxBugsPorSprint = 20;

    // TEMA 2: Array — equivalente a tupla de Python (inmutable por convención)
    public static readonly string[] EstadosPermitidos = ["abierto", "en progreso", "resuelto", "cerrado"];
    public static readonly string[] SeveridadesValidas = ["crítica", "alta", "media", "baja"];

    // Atributo estático de clase (compartido entre instancias)
    public static int InstanciasCreadas { get; private set; } = 0;

    // TEMA 2: List y Dictionary — colección de bugs
    private readonly List<Dictionary<string, string>> _bugs = [];

    // TEMA 2: HashSet — módulos únicos sin duplicados
    public readonly HashSet<string> ModulosAfectados = [];

    private int _proximoId = 1;

    // Constructor (equivalente a __init__ en Python)
    public BugTracker()
    {
        InstanciasCreadas++;
    }

    // -------------------------------------------------------------------------
    // TEMA 3: Métodos con retorno y excepciones
    // -------------------------------------------------------------------------

    public Dictionary<string, string> Registrar(string titulo, string severidad, string modulo)
    {
        if (!SeveridadesValidas.Contains(severidad))
            throw new ArgumentException($"Severidad '{severidad}' no válida. Use: {string.Join(", ", SeveridadesValidas)}");

        var bug = new Dictionary<string, string>
        {
            { "id",        _proximoId.ToString() },
            { "titulo",    titulo },
            { "severidad", severidad },
            { "estado",    "abierto" },
        };

        _bugs.Add(bug);
        ModulosAfectados.Add(modulo);
        _proximoId++;
        return bug;
    }

    public bool CambiarEstado(int bugId, string nuevoEstado)
    {
        if (!EstadosPermitidos.Contains(nuevoEstado))
            throw new ArgumentException($"Estado '{nuevoEstado}' no permitido.");

        // TEMA 4: Bucle foreach
        foreach (var bug in _bugs)
        {
            if (bug["id"] == bugId.ToString())
            {
                bug["estado"] = nuevoEstado;
                return true;
            }
        }
        return false;
    }

    public List<Dictionary<string, string>> ListarPorSeveridad(string severidad) =>
        _bugs.Where(b => b["severidad"] == severidad).ToList();

    public int Total => _bugs.Count;

    public int Resueltos => _bugs.Count(b => b["estado"] == "resuelto" || b["estado"] == "cerrado");

    public double TasaResolucion => Total > 0 ? Math.Round((double)Resueltos / Total * 100, 2) : 0.0;

    // Equivalente a __str__ de Python
    public override string ToString() =>
        $"BugTracker[{NombreProyecto} v{Version}] — {Total} bug(s)";
}


// =============================================================================
// DEMO como TestFixture de NUnit
// Cada [Test] corresponde a un tema del Módulo 1
// =============================================================================

[TestFixture]
public class Modulo1BugTrackerTests
{
    private BugTracker _tracker = null!;

    [SetUp]
    public void Inicializar()
    {
        _tracker = new BugTracker();
    }

    // -------------------------------------------------------------------------
    // TEMA 1: Variables, tipos de datos y operadores
    // -------------------------------------------------------------------------
    [Test]
    public void Tema1_VariablesYTipos()
    {
        // string, double, int, bool
        string proyecto = BugTracker.NombreProyecto;
        double version = BugTracker.Version;
        int maxBugs = BugTracker.MaxBugsPorSprint;
        bool debugMode = false;

        // Operadores: comparación, aritméticos, lógicos
        bool dentroDelLimite = maxBugs > 0 && maxBugs <= 50;
        int bugsPrueba = 4;
        int slotsDisponibles = maxBugs - bugsPrueba;

        Assert.Multiple(() =>
        {
            Assert.That(proyecto, Is.EqualTo("Portal de Clientes"));
            Assert.That(version, Is.EqualTo(1.0));
            Assert.That(dentroDelLimite, Is.True);
            Assert.That(slotsDisponibles, Is.EqualTo(16));
            Assert.That(debugMode, Is.False);
        });

        TestContext.Out.WriteLine($"Proyecto: {proyecto} v{version}");
        TestContext.Out.WriteLine($"Max bugs: {maxBugs} | Disponibles: {slotsDisponibles}");
    }

    // -------------------------------------------------------------------------
    // TEMA 2: Estructuras de datos — List, Dictionary, HashSet, Array (tupla)
    // -------------------------------------------------------------------------
    [Test]
    public void Tema2_EstructurasDeDatos()
    {
        // Dictionary — un bug es clave-valor
        var bug = new Dictionary<string, string>
        {
            { "id",        "1" },
            { "titulo",    "Login falla" },
            { "severidad", "crítica" },
            { "estado",    "abierto" },
        };

        // List — colección de bugs
        var listaBugs = new List<Dictionary<string, string>> { bug };

        // Array (constante) — como tupla de Python
        string[] estados = BugTracker.EstadosPermitidos;

        // HashSet — módulos únicos
        var modulos = new HashSet<string> { "Auth", "UI", "Auth" }; // "Auth" sólo una vez

        Assert.Multiple(() =>
        {
            Assert.That(bug["severidad"], Is.EqualTo("crítica"));
            Assert.That(listaBugs, Has.Count.EqualTo(1));
            Assert.That(estados, Has.Length.EqualTo(4));
            Assert.That(modulos, Has.Count.EqualTo(2));  // sin duplicado
        });

        TestContext.Out.WriteLine($"Bug: {bug["titulo"]} ({bug["severidad"]})");
        TestContext.Out.WriteLine($"Estados: [{string.Join(", ", estados)}]");
        TestContext.Out.WriteLine($"Módulos únicos: [{string.Join(", ", modulos)}]");
    }

    // -------------------------------------------------------------------------
    // TEMA 2 (cont.): Condicionales y bucles
    // -------------------------------------------------------------------------
    [Test]
    public void Tema2_CondicionalesYBucles()
    {
        _tracker.Registrar("Login falla con usuario vacío",  "crítica", "Autenticación");
        _tracker.Registrar("Botón 'Guardar' no responde",    "alta",    "Formularios");
        _tracker.Registrar("Texto del footer mal alineado",  "baja",    "UI");
        _tracker.Registrar("Error al exportar PDF",          "alta",    "Reportes");

        // Condicional if/else if/else
        string mensajeLimite;
        if (_tracker.Total == 0)
            mensajeLimite = "Sin bugs registrados.";
        else if (_tracker.Total < BugTracker.MaxBugsPorSprint)
            mensajeLimite = $"Quedan {BugTracker.MaxBugsPorSprint - _tracker.Total} slots.";
        else
            mensajeLimite = "¡Límite del sprint alcanzado!";

        TestContext.Out.WriteLine($"Estado del sprint: {mensajeLimite}");

        // Bucle foreach sobre List
        TestContext.Out.WriteLine("\nListado de bugs:");
        foreach (var bug in _tracker.ListarPorSeveridad("alta")
            .Concat(_tracker.ListarPorSeveridad("crítica")))
        {
            TestContext.Out.WriteLine($"  #{bug["id"]} | {bug["severidad"],-8} | {bug["titulo"]}");
        }

        // Bucle while — resolver bugs críticos
        var criticos = _tracker.ListarPorSeveridad("crítica");
        int i = 0;
        while (i < criticos.Count)
        {
            _tracker.CambiarEstado(int.Parse(criticos[i]["id"]), "resuelto");
            TestContext.Out.WriteLine($"  Bug #{criticos[i]["id"]} resuelto.");
            i++;
        }

        Assert.Multiple(() =>
        {
            Assert.That(_tracker.Resueltos, Is.EqualTo(1));
            Assert.That(_tracker.TasaResolucion, Is.EqualTo(25.0));
        });

        TestContext.Out.WriteLine($"Tasa de resolución: {_tracker.TasaResolucion}%");
    }

    // -------------------------------------------------------------------------
    // TEMA 3: Funciones / Métodos + manejo de excepciones (try/catch)
    // -------------------------------------------------------------------------
    [Test]
    public void Tema3_MetodosYExcepciones()
    {
        var entradas = new (string Titulo, string Severidad, string Modulo)[]
        {
            ("Login falla con usuario vacío",  "crítica", "Autenticación"),
            ("Botón 'Guardar' no responde",    "alta",    "Formularios"),
            ("Severidad inválida de prueba",   "urgente", "Test"),   // debe fallar
        };

        int registradosExitosos = 0;

        foreach (var (titulo, sev, modulo) in entradas)
        {
            try
            {
                var bug = _tracker.Registrar(titulo, sev, modulo);
                registradosExitosos++;
                TestContext.Out.WriteLine($"  [OK] Bug #{bug["id"]}: '{bug["titulo"]}' ({bug["severidad"]})");
            }
            catch (ArgumentException ex)
            {
                TestContext.Out.WriteLine($"  [ERROR] {ex.Message}");
            }
        }

        // Solo 2 de 3 debieron registrarse
        Assert.Multiple(() =>
        {
            Assert.That(registradosExitosos, Is.EqualTo(2));
            Assert.That(_tracker.Total, Is.EqualTo(2));
        });

        // CambiarEstado con estado inválido también lanza excepción
        Assert.Throws<ArgumentException>(() => _tracker.CambiarEstado(1, "pendiente"));
    }

    // -------------------------------------------------------------------------
    // TEMA 4: OOP — Clase, objetos, métodos, atributos
    // -------------------------------------------------------------------------
    [Test]
    public void Tema4_OOP_ClasesYObjetos()
    {
        // Creación de objetos (instancias)
        var tracker1 = new BugTracker();
        var tracker2 = new BugTracker();

        // Métodos de instancia
        tracker1.Registrar("Crash al iniciar sesión",    "crítica", "Login");
        tracker1.Registrar("Imagen no carga en perfil",  "media",   "Perfil");
        tracker2.Registrar("Tiempo de carga excesivo",   "alta",    "Dashboard");

        Assert.Multiple(() =>
        {
            // Cada objeto tiene su propio estado
            Assert.That(tracker1.Total, Is.EqualTo(2));
            Assert.That(tracker2.Total, Is.EqualTo(1));

            // Atributo estático de clase — compartido entre instancias
            Assert.That(BugTracker.InstanciasCreadas, Is.GreaterThanOrEqualTo(2));

            // HashSet en objeto
            Assert.That(tracker1.ModulosAfectados, Contains.Item("Login"));
            Assert.That(tracker1.ModulosAfectados, Contains.Item("Perfil"));

            // ToString (equivalente a __str__)
            Assert.That(tracker1.ToString(), Does.Contain("Portal de Clientes"));
        });

        TestContext.Out.WriteLine($"tracker1: {tracker1}");
        TestContext.Out.WriteLine($"tracker2: {tracker2}");
        TestContext.Out.WriteLine($"Bugs críticos tracker1: {tracker1.ListarPorSeveridad("crítica").Count}");
        TestContext.Out.WriteLine($"Módulos afectados tracker1: [{string.Join(", ", tracker1.ModulosAfectados)}]");
    }
}
