# Training Plan: From Manual/Functional QA to QA Automation
**Audience:** QA experts with no prior programming or automation experience.
**Tech Stack:** Python, Playwright, Claude AI (Agents and Skills), SQL/ETL.

---

## 1. Estimated Effort Summary

The plan is structured in 6 sequential modules totaling **41.5 hours** of estimated effort (split between instructor-led sessions and self-directed practice time).

| Module | Description | Estimated Hours |
| :--- | :--- | :---: |
| **Module 1** | Programming Fundamentals with Python | 1 h |
| **Module 2** | UI Automation with Playwright and Python | 4.5 h |
| **Module 3** | API Test Automation | 3 h |
| **Module 4** | Artificial Intelligence in QA: Claude Agents and Skills | 5 h |
| **Module 5** | ETL Fundamentals for QA | 6 h |
| **Module 6** | Final Integration Project | 22 h |
| **Total** | **Total Plan Effort** | **41.5 h** |

---

## 2. Detailed Syllabus and Learning Objectives per Module

### Module 1: Programming Fundamentals with Python (1 hour)
*Focus: Translate QA analytical thinking into computational logic and code syntax.*

#### Topics
   **Basic concepts:** Syntax, data types, variables, and operators.
   **Control structures:** Conditionals (`if/else`) and loops (`for/while`).
   **Data structures:** Lists, dictionaries, tuples, and sets.
   **Functions and modularity:** Arguments, return values, and exception handling (`try/except`).
   **Intro to OOP:** Classes, objects, methods, and attributes (key for QA design patterns).

#### Learning Objectives
   **Learn** Python's basic syntax and control flow to write clean scripts.
   **Manipulate** data structures (lists, dictionaries) to manage dynamic test data.
   **Implement** exception handling so test scripts don't crash abruptly on unexpected errors.
   **Apply** Object-Oriented Programming (OOP) concepts to model software elements in a reusable way.

---

### Module 2: UI Automation with Playwright and Python (4.5 hours)
*Focus: Interact with web browsers programmatically and build robust test scripts.*

#### Topics
   **Environment setup:** Installing Playwright, Python, and VS Code. *(30m)*
   **Advanced selectors:** Playwright native locators, XPath, and CSS Selectors. *(1h)*
   **Interactions and waits:** Clicks, inputs, web assertions, and implicit/explicit wait handling. *(1h)*
   **Project structure:** Using `pytest` as a test runner and configuring reports. *(1h)*
   **Design pattern:** Page Object Model (POM) implementation. *(1h)*
   **Test case creation:** Scenarios and test cases.
   **Git:** Connect to GitHub.

#### Learning Objectives
   **Configure** structured and reproducible local automation environments.
   **Identify** web elements reliably using advanced locators and UI-change-resilient strategies.
   **Build** functional test scripts by controlling interactions, web assertions, and Playwright async waits.
   **Design** a scalable test architecture using the Page Object Model (POM) pattern and `pytest`.

---

### Module 3: API Test Automation (3 hours)
*Focus: Validate the service layer efficiently and integrate it with UI tests.*

#### Topics
   **HTTP concepts:** Methods (GET, POST, PUT, DELETE), status codes, and headers. *(1h)*
   **Playwright API testing:** Consuming endpoints and validating JSON responses. *(1h)*
   **Advanced strategies:** Authentication (Tokens/Cookies), environment variables, and data setup. *(1h)*
   **Test case creation:** Scenarios and test cases.
   **Git:** Connect to GitHub.

#### Learning Objectives
   **Validate** web service responses (REST APIs) by verifying status codes, headers, and JSON schemas.
   **Automate** flows requiring token-based authentication or advanced session handling.
   **Integrate** API and UI tests in the same automation flow (e.g., set up data via API before testing the UI).

---

### Module 4: Artificial Intelligence in QA: Claude Agents and Skills (5 hours)
*Focus: Use advanced AI as a catalyst to enhance and accelerate the automation cycle.*

#### Topics
   **GenAI fundamentals:** Effective prompts for test code generation and failure analysis. *(1h)*
   **Claude Agents:** Setting up and using agents for requirements analysis and automated test case creation. *(2h)*
   **Claude Skills (Tools):** Integrating Claude with Python scripts for self-healing tests or intelligent report generation. *(2h)*

#### Learning Objectives
   **Optimize** test development time by using Claude as a copilot for code generation and refactoring.
   **Configure** Claude agents oriented toward automated translation of user stories into test scripts.
   **Develop** custom Claude skills that interact with Python code to analyze failure reports or perform self-healing on UI tests.

---

### Module 5: ETL Fundamentals for QA (6 hours)
*Focus: Validate the movement, transformation, and consistency of data in back-end systems.*

#### Topics
   **ETL introduction:** Extract, Transform, and Load concepts. *(1h)*
   **Database validation:** Connecting to relational databases from Python. *(2h)*
   **ETL testing strategies:** Validating row counts, data types, and logical transformations. *(3h)*

#### Learning Objectives
   **Understand** data flows in ETL processes to identify critical failure points.
   **Connect** Python scripts to databases to run automated verification queries.
   **Design** scripts that validate data integrity, correct transformation, and completeness between source and destination.

---

### Module 6: Final Integration Project (22 hours)
*Focus: Consolidate all knowledge in a professional, production-ready repository.*

#### Topics
   **Definition:** Automate an end-to-end flow for a real or mock application covering UI, API, and a Claude-assisted script. *(3h)*
   **Autonomous development:** Mentoring, Q&A sessions, and Git/GitHub best practices. *(14h)*
   **Presentation:** Code review, real-delivery simulation, and documentation. *(5h)*

#### Learning Objectives
   **Consolidate** acquired skills by building an automation framework from scratch.
   **Deliver** a functional test pipeline combining UI, API, databases, and AI assistance.
   **Present** the code in a technical code review, demonstrating development best practices and version control with Git.
