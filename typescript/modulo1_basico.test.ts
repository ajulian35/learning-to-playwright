// =============================================================================
// MODULE 1 — Jest Tests: Test Results Report
// Equivalent to Modulo1Basico.cs (NUnit) and modulo1_basico.py (script)
// =============================================================================

// --- Shared types and data ---

const VALID_STATES = ["PASSED", "FAILED", "SKIPPED"] as const;
type Status = typeof VALID_STATES[number];

interface TestCase {
    name: string;
    status: Status;
}

interface Summary {
    passed: number;
    failed: number;
    skipped: number;
    rate: number;
}

const SUITE   = "User Registration";
const VERSION = "1.0";

const cases: TestCase[] = [
    { name: "Registration with valid data",      status: "PASSED"  },
    { name: "Registration without email",        status: "FAILED"  },
    { name: "Registration with short password",  status: "FAILED"  },
    { name: "Registration with duplicate user",  status: "PASSED"  },
    { name: "Registration from mobile",          status: "SKIPPED" },
];


// --- Functions under test ---

function printResult(name: string, status: Status): string {
    if (status === "PASSED")  return `  [OK]      ${name}`;
    if (status === "FAILED")  return `  [FAIL]    ${name}  <- FAILURE DETECTED`;
    return `  [SKIP]    ${name}`;
}

function calculateSummary(cases: TestCase[]): Summary {
    const passed  = cases.filter(c => c.status === "PASSED").length;
    const failed  = cases.filter(c => c.status === "FAILED").length;
    const skipped = cases.filter(c => c.status === "SKIPPED").length;
    const total   = passed + failed;
    const rate    = total > 0 ? Math.round(passed / total * 100) : 0;
    return { passed, failed, skipped, rate };
}

function validateStatus(status: string): void {
    if (!(VALID_STATES as readonly string[]).includes(status))
        throw new Error(`Status '${status}' not recognized. Use: ${VALID_STATES.join(", ")}`);
}

class TestReport {
    constructor(private suite: string, private version: string) {}
    getSuite()   { return this.suite; }
    getVersion() { return this.version; }
}


// =============================================================================
// Tests — each describe corresponds to a topic from Module 1
// =============================================================================

// --- TOPIC 1: Variables and data types ---
describe("Topic1 - Variables and types", () => {
    test("variables have the correct types and values", () => {
        const suite: string   = SUITE;
        const version: string = VERSION;
        const totalCases: number  = cases.length;
        const hasFailures: boolean = false;

        expect(suite).toBe("User Registration");
        expect(version).toBe("1.0");
        expect(totalCases).toBe(5);
        expect(hasFailures).toBe(false);
    });
});

// --- TOPIC 2: Data structures ---
describe("Topic2 - Data structures", () => {
    test("valid states array has 3 elements", () => {
        expect(VALID_STATES.length).toBe(3);
        expect(VALID_STATES[0]).toBe("PASSED");
    });

    test("cases array has the correct structure", () => {
        expect(cases.length).toBe(5);
        expect(cases[0].name).toContain("valid");
        expect(cases[0].status).toBe("PASSED");
    });

    test("cases can be filtered by status", () => {
        const failedOnly = cases.filter(c => c.status === "FAILED");
        expect(failedOnly.length).toBe(2);
    });
});

// --- TOPIC 2 (cont.): Conditionals and loops ---
describe("Topic2 - Conditionals and loops", () => {
    test("loop detects failures and accumulates total executed", () => {
        let hasFailures = false;
        let totalExecuted = 0;

        for (const c of cases) {
            console.log(printResult(c.name, c.status));
            totalExecuted++;
            if (c.status === "FAILED") hasFailures = true;
        }

        expect(hasFailures).toBe(true);
        expect(totalExecuted).toBe(5);
    });

    test("final message depends on the conditional", () => {
        const hasFailures = true;
        const message = hasFailures
            ? "[WARNING] There are failed cases. Review before releasing."
            : "[OK] All clear.";

        expect(message).toContain("WARNING");
    });
});

// --- TOPIC 3: Functions ---
describe("Topic3 - Functions and exceptions", () => {
    test("printResult returns the correct message per status", () => {
        expect(printResult("Login", "PASSED")).toContain("[OK]");
        expect(printResult("Login", "FAILED")).toContain("[FAIL]");
        expect(printResult("Login", "SKIPPED")).toContain("[SKIP]");
    });

    test("validateStatus does not throw with valid statuses", () => {
        expect(() => validateStatus("PASSED")).not.toThrow();
        expect(() => validateStatus("FAILED")).not.toThrow();
    });

    test("validateStatus throws with unknown status", () => {
        expect(() => validateStatus("PENDING"))
            .toThrow("Status 'PENDING' not recognized");
    });
});

// --- TOPIC 4: Summary with functions ---
describe("Topic4 - calculateSummary", () => {
    test("calculates counts and success rate correctly", () => {
        const summary = calculateSummary(cases);

        expect(summary.passed).toBe(2);
        expect(summary.failed).toBe(2);
        expect(summary.skipped).toBe(1);
        expect(summary.rate).toBe(50);
    });

    test("rate is 0 if no cases were executed", () => {
        const empty: TestCase[] = [
            { name: "Skipped case", status: "SKIPPED" },
        ];
        const summary = calculateSummary(empty);
        expect(summary.rate).toBe(0);
    });
});

// --- TOPIC 5: OOP ---
describe("Topic5 - Class TestReport", () => {
    test("constructor assigns suite and version correctly", () => {
        const report = new TestReport(SUITE, VERSION);
        expect(report.getSuite()).toBe("User Registration");
        expect(report.getVersion()).toBe("1.0");
    });

    test("multiple independent instances can be created", () => {
        const r1 = new TestReport("Suite A", "1.0");
        const r2 = new TestReport("Suite B", "2.0");

        expect(r1.getSuite()).not.toBe(r2.getSuite());
        expect(r1.getVersion()).not.toBe(r2.getVersion());
    });
});
