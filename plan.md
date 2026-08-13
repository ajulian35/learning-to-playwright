# Plan de Capacitación: De QA Manual/Funcional a QA Automation
**Audiencia:** Expertos en QA sin experiencia previa en programación o automatización.
**Stack Tecnológico:** Python, Playwright, Claude AI (Agentes y Skills), SQL/ETL.

---

## 1. Resumen del Esfuerzo Estimado

El plan de trabajo está estructurado en 6 módulos secuenciales con un total de **41.5 horas** de esfuerzo estimado (distribuidas entre clases teóricos-prácticas y tiempo de práctica autónoma).

| Módulo | Descripción | Horas Estimadas |
| :--- | :--- | :---: |
| **Módulo 1** | Fundamentos de Programación con Python | 1 h |
| **Módulo 2** | Automatización de UI con Playwright y Python | 4.5 h |
| **Módulo 3** | Automatización de Pruebas de API | 3 h |
| **Módulo 4** | Inteligencia Artificial en QA: Agentes y Skills de Claude | 5 h |
| **Módulo 5** | Fundamentos de ETL para QA | 6 h |
| **Módulo 6** | Proyecto Final Integrador | 22 h |
| **Total** | **Esfuerzo Total del Plan de Trabajo** | **45.5 h** |

---

## 2. Derrotero Detallado y Objetivos por Módulo

### Módulo 1: Fundamentos de Programación con Python (1 hora)
*Enfoque: Traducir la lógica analítica de QA al pensamiento computacional y sintaxis de código.*

#### Temario y Distribución de Horas
   **Conceptos básicos:** Sintaxis, tipos de datos, variables y operadores. **
   **Estructuras de control:** Condicionales (`if/else`) y bucles (`for/while`). **
   **Estructuras de datos:** Listas, diccionarios, tuplas y sets. **
   **Funciones y modularidad:** Argumentos, retornos y manejo de excepciones (`try/except`). **
   **Introducción a OOP:** Clases, objetos, métodos y atributos (clave para patrones de diseño en QA). **

#### Objetivos de Aprendizaje
   **Aprender** la sintaxis básica de Python y el flujo de control para escribir scripts limpios.
   **Manipular** estructuras de datos (listas, diccionarios) para gestionar datos de prueba dinámicos.
   **Implementar** el manejo de excepciones para que los scripts de prueba no fallen abruptamente ante errores inesperados.
   **Aplicar** conceptos de Programación Orientada a Objetos (POO) para modelar elementos de software de forma reutilizable.

---

### Módulo 2: Automatización de UI con Playwright y Python (4.5 horas)
*Enfoque: Interactuar con navegadores web de forma automatizada y crear scripts robustos.*

#### Temario y Distribución de Horas
   **Configuración del entorno:** Instalación de Playwright, Python y VS Code. *(30m)*
   **Selectores avanzados:** Localizadores nativos de Playwright, XPath y CSS Selectors. *(1h)*
   **Interacciones y esperas:** Clics, inputs, aserciones web y manejo de esperas implícitas/explícitas. *(1h)*
   **Estructura de proyectos:** Uso de `pytest` como ejecutor de pruebas y configuración de reportes. *(1h)*
   **Patrón de diseño:** Implementación de Page Object Model (POM). *(1h)*
   **Creación test cases:** scenarios and test cases. ** 
   **Git:** Connect to GitHub

#### Objetivos de Aprendizaje
   **Configurar** entornos de automatización locales estructurados y reproducibles.
   **Identificar** elementos web de forma robusta utilizando localizadores avanzados y estrategias resilientes al cambio de interfaz.
   **Construir** scripts de prueba funcionales controlando interacciones, aserciones web y esperas asíncronas de Playwright.
   **Diseñar** una arquitectura de pruebas escalable utilizando el patrón Page Object Model (POM) y `pytest`.

---

### Módulo 3: Automatización de Pruebas de API (3 horas)
*Enfoque: Validar la capa de servicios de forma ágil e integrarla con las pruebas de interfaz.*

#### Temario y Distribución de Horas
   **Conceptos HTTP:** Métodos (GET, POST, PUT, DELETE), códigos de estado y headers. *(1h)*
   **Pruebas con Playwright API:** Consumo de endpoints y validación de respuestas JSON. *(1h)*
   **Estrategias avanzadas:** Autenticación (Tokens/Cookies), variables de entorno y preparación de datos. *(1h)*
   **Creación test cases:** scenarios and test cases. **
   **Git:** Connect to GitHub

#### Objetivos de Aprendizaje
   **Validar** respuestas de servicios web (REST APIs) mediante la verificación de códigos de estado, headers y esquemas JSON.
   **Automatizar** flujos que requieran autenticación por tokens o manejo avanzado de sesiones.
   **Integrar** pruebas de API y UI en un mismo flujo de automatización (ej. preparar datos por API antes de probar la UI).

---

### Módulo 4: Inteligencia Artificial en QA: Agentes y Skills de Claude (5 horas)
*Enfoque: Utilizar IA avanzada como catalizador para potenciar y acelerar el ciclo de automatización.*

#### Temario y Distribución de Horas
   **Fundamentos de IA GenAI:** Prompts efectivos para generación de código de prueba y análisis de fallos. *(1h)*
   **Agentes de Claude:** Configuración y uso de agentes para análisis de requerimientos y creación de casos de prueba automatizados. *(2h)*
   **Claude Skills (Herramientas):** Integración de Claude con scripts de Python para autocuración de pruebas (Self-healing tests) o generación de reportes inteligentes. *(2h)*

#### Objetivos de Aprendizaje
   **Optimizar** el tiempo de desarrollo de pruebas usando Claude como copiloto para la generación de código y refactorización.
   **Configurar** agentes de Claude orientados a la traducción automatizada de historias de usuario a scripts de prueba.
   **Desarrollar** "skills" de Claude personalizadas que interactúen con código Python para analizar reportes de fallos o realizar autocuración (*self-healing*) de pruebas de UI.

---

### Módulo 5: Fundamentos de ETL para QA (6 horas)
*Enfoque: Validar el movimiento, transformación y consistencia de datos en sistemas back-end.*

#### Temario y Distribución de Horas
   **Introducción a ETL:** Conceptos de Extracción, Transformación y Carga de datos. *(1h)*
   **Validación de bases de datos:** Conexión a bases de datos relacionales desde Python. *(2h)*
   **Estrategias de prueba ETL:** Validación del conteo de filas, tipos de datos y transformaciones lógicas. *(3h)*

#### Objetivos de Aprendizaje
   **Comprender** el flujo de datos en procesos ETL para identificar puntos críticos de falla.
   **Conectar** scripts de Python con bases de datos para realizar consultas de verificación automatizadas.
   **Diseñar** scripts que validen la integridad, transformación correcta y completitud de los datos entre origen y destino.

---

### Módulo 6: Proyecto Final Integrador (22 horas)
*Enfoque: Consolidar todo el conocimiento en un repositorio profesional listo para producción.*

#### Temario y Distribución de Horas
   **Definición:** Automatizar un flujo end-to-end de una aplicación real o mock que incluya: UI, API y un script asistido por Claude. *(3h)*
   **Desarrollo autónomo:** Mentoría, resolución de dudas y buenas prácticas de Git/GitHub. *(14h)*
   **Presentación:** Revisión de código (Code Review), simulación de entrega real y documentación. *(5h)*

#### Objetivos de Aprendizaje
   **Consolidar** las habilidades adquiridas mediante el desarrollo de un framework de automatización desde cero.
   **Entregar** un pipeline de pruebas funcional que combine UI, API, bases de datos y asistencia de IA.
   **Defender** el código ante una revisión técnica (*Code Review*), demostrando buenas prácticas de desarrollo y control de versiones con Git.

