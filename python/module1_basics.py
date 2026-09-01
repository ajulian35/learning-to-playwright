# =============================================================================
# MODULE 1 — Basic Example: Test Results Report
# =============================================================================


# --- TOPIC 1: Variables and data types ---
suite = "User Registration"         # str
version = "1.0"                     # str
total_executed = 0                  # int
has_failures = False                # bool


# --- TOPIC 2: Data structures ---

# Tuple: valid statuses (never changes)
VALID_STATES = ("PASSED", "FAILED", "SKIPPED")

# List of dicts: each test case
cases = [
    {"name": "Registration with valid data",      "status": "PASSED"},
    {"name": "Registration without email",        "status": "FAILED"},
    {"name": "Registration with short password",  "status": "FAILED"},
    {"name": "Registration with duplicate user",  "status": "PASSED"},
    {"name": "Registration from mobile",          "status": "SKIPPED"},
]


# --- TOPIC 3: Functions ---

def print_result(name: str, status: str) -> str:
    """Returns a formatted message based on the test case status."""
    if status == "PASSED":
        message = f"  [OK]      {name}"
    elif status == "FAILED":
        message = f"  [FAIL]    {name}  <- FAILURE DETECTED"
    else:
        message = f"  [SKIP]    {name}"
    return message


def calculate_summary(cases: list) -> dict:
    """Counts results by status and calculates the success rate."""
    passed  = sum(1 for c in cases if c["status"] == "PASSED")
    failed  = sum(1 for c in cases if c["status"] == "FAILED")
    skipped = sum(1 for c in cases if c["status"] == "SKIPPED")
    total   = passed + failed
    rate    = round(passed / total * 100) if total > 0 else 0
    return {"passed": passed, "failed": failed, "skipped": skipped, "rate": rate}


# --- TOPIC 4: Exception handling ---

def validate_status(status: str):
    """Raises an error if the status is not recognized."""
    if status not in VALID_STATES:
        raise ValueError(f"Status '{status}' not recognized. Use: {VALID_STATES}")


# --- TOPIC 5: Basic class (OOP) ---

class TestReport:
    def __init__(self, suite: str, version: str):
        self.suite = suite
        self.version = version

    def print_header(self):
        print("=" * 50)
        print(f"  Suite  : {self.suite}")
        print(f"  Version: {self.version}")
        print("=" * 50)

    def print_footer(self, summary: dict):
        print("-" * 50)
        print(f"  PASSED : {summary['passed']}")
        print(f"  FAILED : {summary['failed']}")
        print(f"  SKIPPED: {summary['skipped']}")
        print(f"  Success rate: {summary['rate']}%")
        print("=" * 50)


# =============================================================================
# Execution
# =============================================================================

report = TestReport(suite, version)
report.print_header()

# for loop: iterates over each case
for case in cases:

    # try/except: validates status before printing
    try:
        validate_status(case["status"])
        print(print_result(case["name"], case["status"]))
        total_executed += 1

        # conditional: flags if at least one failure occurred
        if case["status"] == "FAILED":
            has_failures = True

    except ValueError as e:
        print(f"  [ERROR] {e}")

summary = calculate_summary(cases)
report.print_footer(summary)

# final message with conditional
if has_failures:
    print("  [WARNING] There are failed cases. Review before releasing.")
else:
    print("  [OK] All clear.")
