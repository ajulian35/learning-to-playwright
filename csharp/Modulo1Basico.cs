// =============================================================================
// MODULE 1 — Basic Example: Test Results Report
// =============================================================================

namespace PlaywrightComparison;

[TestFixture]
public class Modulo1BasicoTests
{
    // --- TOPIC 1: Variables and data types ---
    private const string Suite   = "User Registration";
    private const string Version = "1.0";

    // --- TOPIC 2: Data structures ---

    // Array: valid statuses (immutable — equivalent to Python tuple)
    private static readonly string[] ValidStates = ["PASSED", "FAILED", "SKIPPED"];

    // List of dicts: each test case
    private static readonly List<Dictionary<string, string>> Cases =
    [
        new() { {"name", "Registration with valid data"},      {"status", "PASSED"  } },
        new() { {"name", "Registration without email"},        {"status", "FAILED"  } },
        new() { {"name", "Registration with short password"},  {"status", "FAILED"  } },
        new() { {"name", "Registration with duplicate user"},  {"status", "PASSED"  } },
        new() { {"name", "Registration from mobile"},          {"status", "SKIPPED" } },
    ];


    // --- TOPIC 3: Methods (equivalent to Python functions) ---

    private static string PrintResult(string name, string status)
    {
        if (status == "PASSED")
            return $"  [OK]      {name}";
        else if (status == "FAILED")
            return $"  [FAIL]    {name}  <- FAILURE DETECTED";
        else
            return $"  [SKIP]    {name}";
    }

    private static Dictionary<string, int> CalculateSummary(List<Dictionary<string, string>> cases)
    {
        int passed  = cases.Count(c => c["status"] == "PASSED");
        int failed  = cases.Count(c => c["status"] == "FAILED");
        int skipped = cases.Count(c => c["status"] == "SKIPPED");
        int total   = passed + failed;
        int rate    = total > 0 ? (int)Math.Round((double)passed / total * 100) : 0;
        return new() { {"passed", passed}, {"failed", failed}, {"skipped", skipped}, {"rate", rate} };
    }


    // --- TOPIC 4: Exception handling ---

    private static void ValidateStatus(string status)
    {
        if (!ValidStates.Contains(status))
            throw new ArgumentException($"Status '{status}' not recognized. Use: {string.Join(", ", ValidStates)}");
    }


    // --- TOPIC 5: Basic class (OOP) ---

    private class TestReport
    {
        private readonly string _suite;
        private readonly string _version;

        public TestReport(string suite, string version)
        {
            _suite   = suite;
            _version = version;
        }

        public void PrintHeader()
        {
            TestContext.Out.WriteLine(new string('=', 50));
            TestContext.Out.WriteLine($"  Suite  : {_suite}");
            TestContext.Out.WriteLine($"  Version: {_version}");
            TestContext.Out.WriteLine(new string('=', 50));
        }

        public void PrintFooter(Dictionary<string, int> summary)
        {
            TestContext.Out.WriteLine(new string('-', 50));
            TestContext.Out.WriteLine($"  PASSED : {summary["passed"]}");
            TestContext.Out.WriteLine($"  FAILED : {summary["failed"]}");
            TestContext.Out.WriteLine($"  SKIPPED: {summary["skipped"]}");
            TestContext.Out.WriteLine($"  Success rate: {summary["rate"]}%");
            TestContext.Out.WriteLine(new string('=', 50));
        }
    }


    // =========================================================================
    // Tests — each one demonstrates a topic from Module 1
    // =========================================================================

    [Test]
    public void Topic1_VariablesAndTypes()
    {
        string suite   = Suite;
        string version = Version;
        int totalCases = Cases.Count;
        bool hasFailures = false;

        Assert.Multiple(() =>
        {
            Assert.That(suite,       Is.EqualTo("User Registration"));
            Assert.That(version,     Is.EqualTo("1.0"));
            Assert.That(totalCases,  Is.EqualTo(5));
            Assert.That(hasFailures, Is.False);
        });

        TestContext.Out.WriteLine($"Suite: {suite} | Version: {version} | Cases: {totalCases}");
    }

    [Test]
    public void Topic2_DataStructures()
    {
        // Array (tuple): access by index, fixed length
        string firstStatus  = ValidStates[0];
        int statusCount     = ValidStates.Length;

        // List of dicts: access by key
        string firstCaseName   = Cases[0]["name"];
        string firstCaseStatus = Cases[0]["status"];

        Assert.Multiple(() =>
        {
            Assert.That(firstStatus,     Is.EqualTo("PASSED"));
            Assert.That(statusCount,     Is.EqualTo(3));
            Assert.That(firstCaseName,   Does.Contain("valid"));
            Assert.That(firstCaseStatus, Is.EqualTo("PASSED"));
        });

        TestContext.Out.WriteLine($"Valid statuses: [{string.Join(", ", ValidStates)}]");
        TestContext.Out.WriteLine($"First case: {firstCaseName} -> {firstCaseStatus}");
    }

    [Test]
    public void Topic2_ConditionalsAndLoops()
    {
        bool hasFailures = false;
        int totalExecuted = 0;

        // foreach loop + conditional
        foreach (var c in Cases)
        {
            string message = PrintResult(c["name"], c["status"]);
            TestContext.Out.WriteLine(message);
            totalExecuted++;

            if (c["status"] == "FAILED")
                hasFailures = true;
        }

        Assert.That(hasFailures,   Is.True);
        Assert.That(totalExecuted, Is.EqualTo(5));

        // conditional for final message
        string finalMessage = hasFailures
            ? "[WARNING] There are failed cases. Review before releasing."
            : "[OK] All clear.";

        TestContext.Out.WriteLine(finalMessage);
    }

    [Test]
    public void Topic3_MethodsAndExceptions()
    {
        // valid status — does not throw
        Assert.DoesNotThrow(() => ValidateStatus("PASSED"));

        // invalid status — throws ArgumentException
        var ex = Assert.Throws<ArgumentException>(() => ValidateStatus("PENDING"));
        Assert.That(ex!.Message, Does.Contain("PENDING"));

        TestContext.Out.WriteLine($"Exception caught: {ex.Message}");
    }

    [Test]
    public void Topic4_SummaryWithMethods()
    {
        var summary = CalculateSummary(Cases);

        Assert.Multiple(() =>
        {
            Assert.That(summary["passed"],  Is.EqualTo(2));
            Assert.That(summary["failed"],  Is.EqualTo(2));
            Assert.That(summary["skipped"], Is.EqualTo(1));
            Assert.That(summary["rate"],    Is.EqualTo(50));
        });

        TestContext.Out.WriteLine($"Passed: {summary["passed"]} | Failed: {summary["failed"]} | Rate: {summary["rate"]}%");
    }

    [Test]
    public void Topic5_OOP_TestReportClass()
    {
        var report  = new TestReport(Suite, Version);
        var summary = CalculateSummary(Cases);

        // run the full flow using the class
        report.PrintHeader();

        foreach (var c in Cases)
        {
            try
            {
                ValidateStatus(c["status"]);
                TestContext.Out.WriteLine(PrintResult(c["name"], c["status"]));
            }
            catch (ArgumentException ex)
            {
                TestContext.Out.WriteLine($"  [ERROR] {ex.Message}");
            }
        }

        report.PrintFooter(summary);

        Assert.That(summary["rate"], Is.EqualTo(50));
    }
}
