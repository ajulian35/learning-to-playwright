// =============================================================================
// MODULE 1: Programming Fundamentals with C#
// Context: Mini Bug Tracker - Defect management system for a QA engineer
// Covers: variables/types, conditionals, loops, lists/dicts, functions,
//         exception handling, and classes (OOP)
// Runs as NUnit tests to stay consistent with the project structure.
// =============================================================================

namespace PlaywrightComparison;


// -----------------------------------------------------------------------------
// TOPIC 1 (OOP): Bug Tracker Class
// Includes: attributes, constructor, instance and static methods
// -----------------------------------------------------------------------------

public class BugTracker
{
    // TOPIC 1: Constants and data types
    public const string ProjectName = "Customer Portal";
    public const double Version = 1.0;
    public const int MaxBugsPerSprint = 20;

    // TOPIC 2: Array — equivalent to Python tuple (immutable by convention)
    public static readonly string[] AllowedStatuses = ["open", "in progress", "resolved", "closed"];
    public static readonly string[] ValidSeverities = ["critical", "high", "medium", "low"];

    // Static class attribute (shared across instances)
    public static int CreatedInstances { get; private set; } = 0;

    // TOPIC 2: List and Dictionary — bug collection
    private readonly List<Dictionary<string, string>> _bugs = [];

    // TOPIC 2: HashSet — unique modules with no duplicates
    public readonly HashSet<string> AffectedModules = [];

    private int _nextId = 1;

    // Constructor (equivalent to __init__ in Python)
    public BugTracker()
    {
        CreatedInstances++;
    }

    // -------------------------------------------------------------------------
    // TOPIC 3: Methods with return values and exceptions
    // -------------------------------------------------------------------------

    public Dictionary<string, string> Register(string title, string severity, string module)
    {
        if (!ValidSeverities.Contains(severity))
            throw new ArgumentException($"Severity '{severity}' is not valid. Use: {string.Join(", ", ValidSeverities)}");

        var bug = new Dictionary<string, string>
        {
            { "id",       _nextId.ToString() },
            { "title",    title },
            { "severity", severity },
            { "status",   "open" },
        };

        _bugs.Add(bug);
        AffectedModules.Add(module);
        _nextId++;
        return bug;
    }

    public bool ChangeStatus(int bugId, string newStatus)
    {
        if (!AllowedStatuses.Contains(newStatus))
            throw new ArgumentException($"Status '{newStatus}' is not allowed.");

        // TOPIC 4: foreach loop
        foreach (var bug in _bugs)
        {
            if (bug["id"] == bugId.ToString())
            {
                bug["status"] = newStatus;
                return true;
            }
        }
        return false;
    }

    public List<Dictionary<string, string>> ListBySeverity(string severity) =>
        _bugs.Where(b => b["severity"] == severity).ToList();

    public int Total => _bugs.Count;

    public int Resolved => _bugs.Count(b => b["status"] == "resolved" || b["status"] == "closed");

    public double ResolutionRate => Total > 0 ? Math.Round((double)Resolved / Total * 100, 2) : 0.0;

    // Equivalent to __str__ in Python
    public override string ToString() =>
        $"BugTracker[{ProjectName} v{Version}] — {Total} bug(s)";
}


// =============================================================================
// DEMO as NUnit TestFixture
// Each [Test] corresponds to a topic from Module 1
// =============================================================================

[TestFixture]
public class Module1BugTrackerTests
{
    private BugTracker _tracker = null!;

    [SetUp]
    public void Setup()
    {
        _tracker = new BugTracker();
    }

    // -------------------------------------------------------------------------
    // TOPIC 1: Variables, data types, and operators
    // -------------------------------------------------------------------------
    [Test]
    public void Topic1_VariablesAndTypes()
    {
        // string, double, int, bool
        string project = BugTracker.ProjectName;
        double version = BugTracker.Version;
        int maxBugs = BugTracker.MaxBugsPerSprint;
        bool debugMode = false;

        // Operators: comparison, arithmetic, logical
        bool withinLimit = maxBugs > 0 && maxBugs <= 50;
        int testBugs = 4;
        int availableSlots = maxBugs - testBugs;

        Assert.Multiple(() =>
        {
            Assert.That(project,        Is.EqualTo("Customer Portal"));
            Assert.That(version,        Is.EqualTo(1.0));
            Assert.That(withinLimit,    Is.True);
            Assert.That(availableSlots, Is.EqualTo(16));
            Assert.That(debugMode,      Is.False);
        });

        TestContext.Out.WriteLine($"Project: {project} v{version}");
        TestContext.Out.WriteLine($"Max bugs: {maxBugs} | Available: {availableSlots}");
    }

    // -------------------------------------------------------------------------
    // TOPIC 2: Data structures — List, Dictionary, HashSet, Array (tuple)
    // -------------------------------------------------------------------------
    [Test]
    public void Topic2_DataStructures()
    {
        // Dictionary — a bug is key-value data
        var bug = new Dictionary<string, string>
        {
            { "id",       "1" },
            { "title",    "Login fails" },
            { "severity", "critical" },
            { "status",   "open" },
        };

        // List — bug collection
        var bugList = new List<Dictionary<string, string>> { bug };

        // Array (constant) — like Python tuple
        string[] statuses = BugTracker.AllowedStatuses;

        // HashSet — unique modules
        var modules = new HashSet<string> { "Auth", "UI", "Auth" }; // "Auth" only once

        Assert.Multiple(() =>
        {
            Assert.That(bug["severity"], Is.EqualTo("critical"));
            Assert.That(bugList,         Has.Count.EqualTo(1));
            Assert.That(statuses,        Has.Length.EqualTo(4));
            Assert.That(modules,         Has.Count.EqualTo(2));  // no duplicate
        });

        TestContext.Out.WriteLine($"Bug: {bug["title"]} ({bug["severity"]})");
        TestContext.Out.WriteLine($"Statuses: [{string.Join(", ", statuses)}]");
        TestContext.Out.WriteLine($"Unique modules: [{string.Join(", ", modules)}]");
    }

    // -------------------------------------------------------------------------
    // TOPIC 2 (cont.): Conditionals and loops
    // -------------------------------------------------------------------------
    [Test]
    public void Topic2_ConditionalsAndLoops()
    {
        _tracker.Register("Login fails with empty username", "critical", "Authentication");
        _tracker.Register("Save button does not respond",    "high",     "Forms");
        _tracker.Register("Footer text misaligned",          "low",      "UI");
        _tracker.Register("Error when exporting PDF",        "high",     "Reports");

        // if/else if/else conditional
        string sprintMessage;
        if (_tracker.Total == 0)
            sprintMessage = "No bugs registered.";
        else if (_tracker.Total < BugTracker.MaxBugsPerSprint)
            sprintMessage = $"{BugTracker.MaxBugsPerSprint - _tracker.Total} slots remaining.";
        else
            sprintMessage = "Sprint limit reached!";

        TestContext.Out.WriteLine($"Sprint status: {sprintMessage}");

        // foreach loop over List
        TestContext.Out.WriteLine("\nBug listing:");
        foreach (var bug in _tracker.ListBySeverity("high")
            .Concat(_tracker.ListBySeverity("critical")))
        {
            TestContext.Out.WriteLine($"  #{bug["id"]} | {bug["severity"],-8} | {bug["title"]}");
        }

        // while loop — resolve critical bugs
        var critical = _tracker.ListBySeverity("critical");
        int i = 0;
        while (i < critical.Count)
        {
            _tracker.ChangeStatus(int.Parse(critical[i]["id"]), "resolved");
            TestContext.Out.WriteLine($"  Bug #{critical[i]["id"]} resolved.");
            i++;
        }

        Assert.Multiple(() =>
        {
            Assert.That(_tracker.Resolved,        Is.EqualTo(1));
            Assert.That(_tracker.ResolutionRate,  Is.EqualTo(25.0));
        });

        TestContext.Out.WriteLine($"Resolution rate: {_tracker.ResolutionRate}%");
    }

    // -------------------------------------------------------------------------
    // TOPIC 3: Methods + exception handling (try/catch)
    // -------------------------------------------------------------------------
    [Test]
    public void Topic3_MethodsAndExceptions()
    {
        var entries = new (string Title, string Severity, string Module)[]
        {
            ("Login fails with empty username", "critical", "Authentication"),
            ("Save button does not respond",    "high",     "Forms"),
            ("Invalid severity test",           "urgent",   "Test"),   // should fail
        };

        int successfulRegistrations = 0;

        foreach (var (title, sev, module) in entries)
        {
            try
            {
                var bug = _tracker.Register(title, sev, module);
                successfulRegistrations++;
                TestContext.Out.WriteLine($"  [OK] Bug #{bug["id"]}: '{bug["title"]}' ({bug["severity"]})");
            }
            catch (ArgumentException ex)
            {
                TestContext.Out.WriteLine($"  [ERROR] {ex.Message}");
            }
        }

        // Only 2 of 3 should have been registered
        Assert.Multiple(() =>
        {
            Assert.That(successfulRegistrations, Is.EqualTo(2));
            Assert.That(_tracker.Total,          Is.EqualTo(2));
        });

        // ChangeStatus with invalid status also throws
        Assert.Throws<ArgumentException>(() => _tracker.ChangeStatus(1, "pending"));
    }

    // -------------------------------------------------------------------------
    // TOPIC 4: OOP — Class, objects, methods, attributes
    // -------------------------------------------------------------------------
    [Test]
    public void Topic4_OOP_ClassesAndObjects()
    {
        // Object creation (instances)
        var tracker1 = new BugTracker();
        var tracker2 = new BugTracker();

        // Instance methods
        tracker1.Register("App crashes on login",       "critical", "Login");
        tracker1.Register("Profile image not loading",  "medium",   "Profile");
        tracker2.Register("Excessive load time",        "high",     "Dashboard");

        Assert.Multiple(() =>
        {
            // Each object has its own state
            Assert.That(tracker1.Total, Is.EqualTo(2));
            Assert.That(tracker2.Total, Is.EqualTo(1));

            // Static class attribute — shared across instances
            Assert.That(BugTracker.CreatedInstances, Is.GreaterThanOrEqualTo(2));

            // HashSet in object
            Assert.That(tracker1.AffectedModules, Contains.Item("Login"));
            Assert.That(tracker1.AffectedModules, Contains.Item("Profile"));

            // ToString (equivalent to __str__)
            Assert.That(tracker1.ToString(), Does.Contain("Customer Portal"));
        });

        TestContext.Out.WriteLine($"tracker1: {tracker1}");
        TestContext.Out.WriteLine($"tracker2: {tracker2}");
        TestContext.Out.WriteLine($"Critical bugs tracker1: {tracker1.ListBySeverity("critical").Count}");
        TestContext.Out.WriteLine($"Affected modules tracker1: [{string.Join(", ", tracker1.AffectedModules)}]");
    }
}
