# =============================================================================
# MODULE 1: Programming Fundamentals with Python
# Context: Mini Bug Tracker - Defect management system for a QA engineer
# Covers: variables/types, conditionals, loops, lists/dicts, functions,
#         exception handling, and classes (OOP)
# =============================================================================


# -----------------------------------------------------------------------------
# TOPIC 1: Variables, data types, and operators
# -----------------------------------------------------------------------------
VALID_SEVERITIES = ["critical", "high", "medium", "low"]  # list (config constant)
PROJECT = "Customer Portal"                                # str
VERSION = 1.0                                              # float
MAX_BUGS_PER_SPRINT = 20                                   # int
DEBUG_MODE = False                                         # bool


# -----------------------------------------------------------------------------
# TOPIC 2: Data structures — lists, dicts, tuples, and sets
# -----------------------------------------------------------------------------

# Dict: each bug is a key-value data record
def create_bug(id: int, title: str, severity: str, status: str = "open") -> dict:
    return {
        "id": id,
        "title": title,
        "severity": severity,
        "status": status,
    }

# List: collection of bugs in the current sprint
sprint_bugs: list = []

# Tuple: possible statuses (immutable — must not change at runtime)
VALID_STATUSES: tuple = ("open", "in progress", "resolved", "closed")

# Set: unique modules with at least one active bug (no duplicates)
affected_modules: set = set()


# -----------------------------------------------------------------------------
# TOPIC 3: Functions, arguments, return values, and exception handling (try/except)
# -----------------------------------------------------------------------------

def add_bug(title: str, severity: str, module: str) -> dict:
    """Registers a new bug after validating its data."""
    if severity not in VALID_SEVERITIES:
        raise ValueError(f"Severity '{severity}' is not valid. Use: {VALID_SEVERITIES}")

    bug_id = len(sprint_bugs) + 1
    bug = create_bug(bug_id, title, severity)
    sprint_bugs.append(bug)
    affected_modules.add(module)

    return bug


def change_status(bug_id: int, new_status: str) -> bool:
    """Changes the status of a bug. Returns True on success."""
    if new_status not in VALID_STATUSES:
        raise ValueError(f"Status '{new_status}' is not allowed.")

    for bug in sprint_bugs:
        if bug["id"] == bug_id:
            bug["status"] = new_status
            return True
    return False  # bug not found


def get_summary() -> dict:
    """Calculates metrics for the current sprint."""
    total = len(sprint_bugs)
    resolved = sum(1 for b in sprint_bugs if b["status"] in ("resolved", "closed"))
    open_bugs = total - resolved
    resolution_rate = (resolved / total * 100) if total > 0 else 0.0

    return {
        "total": total,
        "resolved": resolved,
        "open": open_bugs,
        "resolution_rate": round(resolution_rate, 2),
    }


# -----------------------------------------------------------------------------
# TOPIC 4 (OOP): Class that encapsulates the full Bug Tracker
# -----------------------------------------------------------------------------

class BugTracker:
    """Manages the lifecycle of bugs in a project."""

    # Class attribute (shared by all instances)
    created_instances: int = 0

    def __init__(self, project: str, version: float):
        # Instance attributes
        self.project = project
        self.version = version
        self._bugs: list = []       # private by convention
        self._next_id: int = 1

        BugTracker.created_instances += 1

    # Instance method
    def register(self, title: str, severity: str) -> dict:
        try:
            bug = create_bug(self._next_id, title, severity)
            self._bugs.append(bug)
            self._next_id += 1
            return bug
        except ValueError as e:
            print(f"  [ERROR] Could not register bug: {e}")
            return {}

    def list_by_severity(self, severity: str) -> list:
        return [b for b in self._bugs if b["severity"] == severity]

    def summary(self) -> dict:
        total = len(self._bugs)
        critical = len(self.list_by_severity("critical"))
        return {"project": self.project, "version": self.version,
                "total_bugs": total, "critical": critical}

    # Special method (dunder) — human-readable representation
    def __str__(self) -> str:
        return f"BugTracker[{self.project} v{self.version}] — {len(self._bugs)} bug(s)"


# =============================================================================
# DEMO: Program execution
# =============================================================================

if __name__ == "__main__":
    print("=" * 60)
    print(f"  Mini Bug Tracker — {PROJECT} v{VERSION}")
    print("=" * 60)

    # --- Standalone functions + exception handling ---
    print("\n1. Registering bugs (functions and try/except):")

    entries = [
        ("Login fails with empty username",  "critical", "Authentication"),
        ("Save button does not respond",     "high",     "Forms"),
        ("Footer text misaligned",           "low",      "UI"),
        ("Error when exporting PDF",         "high",     "Reports"),
        ("Invalid severity test",            "urgent",   "Test"),   # should fail
    ]

    for title, sev, module in entries:
        try:
            bug = add_bug(title, sev, module)
            print(f"  [OK] Bug #{bug['id']}: '{bug['title']}' ({bug['severity']})")
        except ValueError as e:
            print(f"  [ERROR] {e}")

    # --- Conditionals and operators ---
    print("\n2. Checking sprint limit (conditionals):")
    current_count = len(sprint_bugs)
    if current_count == 0:
        print("  No bugs registered.")
    elif current_count < MAX_BUGS_PER_SPRINT:
        available = MAX_BUGS_PER_SPRINT - current_count
        print(f"  {current_count} bug(s) registered. {available} slots remaining.")
    else:
        print(f"  ALERT! Sprint limit reached ({MAX_BUGS_PER_SPRINT} bugs).")

    # --- for loop over list ---
    print("\n3. Full bug listing (for loop):")
    for bug in sprint_bugs:
        print(f"  #{bug['id']} | {bug['severity']:8} | {bug['status']:12} | {bug['title']}")

    # --- Status change and while loop ---
    print("\n4. Resolving critical bugs (while loop):")
    pending_critical = [b for b in sprint_bugs if b["severity"] == "critical"]
    index = 0
    while index < len(pending_critical):
        bug = pending_critical[index]
        change_status(bug["id"], "resolved")
        print(f"  Bug #{bug['id']} marked as 'resolved'.")
        index += 1

    # --- Summary with dict ---
    print("\n5. Sprint summary (dict + operators):")
    summary = get_summary()
    for key, value in summary.items():
        print(f"  {key:<20}: {value}")

    # --- Set: unique affected modules ---
    print(f"\n6. Unique modules with bugs (set): {affected_modules}")

    # --- Tuple: allowed statuses ---
    print(f"\n7. Allowed statuses (tuple): {VALID_STATUSES}")

    # --- OOP: using the BugTracker class ---
    print("\n8. Using the BugTracker class (OOP):")
    tracker = BugTracker("Mobile App", 2.1)
    tracker.register("App crashes on login", "critical")
    tracker.register("Profile image not loading", "medium")
    tracker.register("Invalid severity test", "urgent")      # triggers internal exception
    print(f"  {tracker}")                                    # calls __str__
    print(f"  Summary: {tracker.summary()}")
    print(f"  Critical bugs: {tracker.list_by_severity('critical')}")
    print(f"  Total BugTracker instances created: {BugTracker.created_instances}")

    print("\n" + "=" * 60)
    print("  End of Module 1")
    print("=" * 60)
