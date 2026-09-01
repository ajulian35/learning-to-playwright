// =============================================================================
// MODULE 1 — Basic Example: Test Results Report
// =============================================================================

// --- TOPIC 1: Variables and data types ---
const suite: string  = "User Registration";
const version: string = "1.0";
let totalExecuted: number = 0;
let hasFailures: boolean = false;


// --- TOPIC 2: Data structures ---

// Readonly array (tuple): valid statuses — never changes
const VALID_STATES = ["PASSED", "FAILED", "SKIPPED"] as const;
type Status = typeof VALID_STATES[number];   // "PASSED" | "FAILED" | "SKIPPED"

// Interface: defines the shape of a test case (equivalent to dict in Python)
interface TestCase {
    name: string;
    status: Status;
}

// Array of objects: each test case
const cases: TestCase[] = [
    { name: "Registration with valid data",      status: "PASSED"  },
    { name: "Registration without email",        status: "FAILED"  },
    { name: "Registration with short password",  status: "FAILED"  },
    { name: "Registration with duplicate user",  status: "PASSED"  },
    { name: "Registration from mobile",          status: "SKIPPED" },
];


// --- TOPIC 3: Functions ---

function printResult(name: string, status: Status): string {
    if (status === "PASSED")
        return `  [OK]      ${name}`;
    else if (status === "FAILED")
        return `  [FAIL]    ${name}  <- FAILURE DETECTED`;
    else
        return `  [SKIP]    ${name}`;
}

interface Summary {
    passed: number;
    failed: number;
    skipped: number;
    rate: number;
}

function calculateSummary(cases: TestCase[]): Summary {
    const passed  = cases.filter(c => c.status === "PASSED").length;
    const failed  = cases.filter(c => c.status === "FAILED").length;
    const skipped = cases.filter(c => c.status === "SKIPPED").length;
    const total   = passed + failed;
    const rate    = total > 0 ? Math.round(passed / total * 100) : 0;
    return { passed, failed, skipped, rate };
}


// --- TOPIC 4: Exception handling ---

function validateStatus(status: string): void {
    if (!(VALID_STATES as readonly string[]).includes(status))
        throw new Error(`Status '${status}' not recognized. Use: ${VALID_STATES.join(", ")}`);
}


// --- TOPIC 5: Basic class (OOP) ---

class TestReport {
    constructor(private suite: string, private version: string) {}

    printHeader(): void {
        console.log("=".repeat(50));
        console.log(`  Suite  : ${this.suite}`);
        console.log(`  Version: ${this.version}`);
        console.log("=".repeat(50));
    }

    printFooter(summary: Summary): void {
        console.log("-".repeat(50));
        console.log(`  PASSED : ${summary.passed}`);
        console.log(`  FAILED : ${summary.failed}`);
        console.log(`  SKIPPED: ${summary.skipped}`);
        console.log(`  Success rate: ${summary.rate}%`);
        console.log("=".repeat(50));
    }
}


// =============================================================================
// Execution
// =============================================================================

const report = new TestReport(suite, version);
report.printHeader();

// for...of loop: iterates over each case
for (const c of cases) {

    // try/catch: validates status before printing
    try {
        validateStatus(c.status);
        console.log(printResult(c.name, c.status));
        totalExecuted++;

        // conditional: flags if at least one failure occurred
        if (c.status === "FAILED")
            hasFailures = true;

    } catch (e) {
        console.log(`  [ERROR] ${(e as Error).message}`);
    }
}

const summary = calculateSummary(cases);
report.printFooter(summary);

// final message with conditional
if (hasFailures)
    console.log("  [WARNING] There are failed cases. Review before releasing.");
else
    console.log("  [OK] All clear.");
