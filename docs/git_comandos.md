# Comandos Git más Usados en QA Automation

Referencia práctica de los comandos Git que usarás en el día a día trabajando con repositorios de pruebas automatizadas.

---

## ⚙️ 1. Configuración Inicial (una sola vez)

Antes de hacer tu primer commit, Git necesita saber quién eres.

```bash
git config --global user.name  "Tu Nombre"
git config --global user.email "tu@correo.com"

# Verificar que quedó guardado
git config --list
```

---

## 🗂️ 2. Iniciar o Clonar un Repositorio

```bash
# Iniciar un repositorio en una carpeta local existente
git init

# Clonar un repositorio remoto (GitHub, GitLab, etc.)
git clone https://github.com/usuario/repositorio.git

# Clonar en una carpeta con nombre específico
git clone https://github.com/usuario/repositorio.git mi-carpeta
```

---

## 📸 3. El Flujo Básico: Guardar Cambios

Este es el ciclo que repetirás decenas de veces al día.

```bash
# 1. Ver qué archivos cambiaron
git status

# 2. Agregar un archivo específico al área de preparación (staging)
git add nombre_del_archivo.py

# Agregar todos los archivos modificados
git add .

# 3. Guardar los cambios con un mensaje descriptivo
git commit -m "feat: agrega test de login con credenciales inválidas"

# Ver el historial de commits
git log --oneline
```

> **Tip:** Un buen mensaje de commit describe el QUÉ y el POR QUÉ, no el cómo.
> Convención recomendada: `tipo: descripción breve`
> - `feat:` — nueva funcionalidad o test
> - `fix:` — corrección de un test o bug
> - `refactor:` — mejora del código sin cambiar comportamiento
> - `docs:` — cambios en documentación

---

## 🌿 4. Ramas (Branches)

Las ramas permiten trabajar en funcionalidades o módulos de forma aislada sin afectar el código principal.

```bash
# Ver todas las ramas locales
git branch

# Ver ramas locales Y remotas
git branch -a

# Crear una nueva rama
git branch nombre-de-la-rama

# Crear una rama Y moverse a ella en un solo paso (recomendado)
git checkout -b nombre-de-la-rama

# Moverse a una rama existente
git checkout nombre-de-la-rama

# Eliminar una rama local (solo si ya fue fusionada)
git branch -d nombre-de-la-rama

# Renombrar la rama actual
git branch -m nuevo-nombre
```

---

## 🔀 5. Fusionar Cambios (Merge y Rebase)

```bash
# Fusionar la rama "feature/login" en la rama actual
git merge feature/login

# Abortar un merge que tiene conflictos (volver al estado anterior)
git merge --abort

# Rebase: reescribir el historial aplicando los commits encima de otra rama
# (usado para mantener un historial lineal y limpio)
git rebase main
```

> **Merge vs Rebase:**
> - `merge` conserva el historial exacto (dos líneas que se unen).
> - `rebase` produce un historial lineal y más limpio, pero reescribe los commits.
> En equipos: preferir `merge` para ramas compartidas, `rebase` para ramas personales antes de hacer PR.

---

## 🌐 6. Trabajo con el Repositorio Remoto

```bash
# Ver los remotos configurados
git remote -v

# Descargar cambios del remoto SIN fusionarlos
git fetch origin

# Descargar Y fusionar cambios de la rama actual
git pull origin main

# Subir una rama al remoto por primera vez
git push -u origin nombre-de-la-rama

# Subir commits adicionales (después del primer push)
git push

# Eliminar una rama del remoto
git push origin --delete nombre-de-la-rama
```

---

## 🔍 7. Inspeccionar Cambios

```bash
# Ver los cambios no preparados (unstaged) línea por línea
git diff

# Ver los cambios preparados (staged), listos para el commit
git diff --staged

# Ver el historial con detalle
git log

# Historial compacto (una línea por commit)
git log --oneline

# Historial gráfico de ramas (muy útil para entender merges)
git log --oneline --graph --all

# Ver qué cambió en un commit específico
git show abc1234
```

---

## ↩️ 8. Deshacer Cambios

| Situación | Comando |
| :--- | :--- |
| Descartar cambios en un archivo (no preparado) | `git restore nombre_archivo.py` |
| Sacar un archivo del staging (sin perder cambios) | `git restore --staged nombre_archivo.py` |
| Revertir el último commit (mantiene los cambios en staging) | `git reset --soft HEAD~1` |
| Revertir el último commit (mantiene los cambios sin staging) | `git reset HEAD~1` |
| Crear un commit que deshace otro commit ya publicado | `git revert abc1234` |

> ⚠️ **Precaución:** `git reset --hard` descarta cambios permanentemente. Úsalo solo si estás seguro de que no necesitas los archivos modificados.

---

## 🗃️ 9. Stash — Guardar Cambios Temporalmente

Útil cuando necesitas cambiar de rama rápidamente sin perder trabajo en progreso.

```bash
# Guardar los cambios actuales en un "cajón temporal"
git stash

# Guardar con un nombre descriptivo
git stash push -m "wip: test de búsqueda avanzada"

# Ver todos los stashes guardados
git stash list

# Recuperar el último stash (y eliminarlo de la lista)
git stash pop

# Recuperar un stash específico por índice
git stash pop stash@{2}

# Eliminar todos los stashes
git stash clear
```

---

## 🏷️ 10. Tags — Marcar Versiones

```bash
# Crear un tag ligero
git tag v1.0

# Crear un tag anotado (recomendado para releases)
git tag -a v1.0 -m "Release inicial del framework de pruebas"

# Ver todos los tags
git tag

# Subir un tag al remoto
git push origin v1.0

# Subir todos los tags al remoto
git push origin --tags
```

---

## ⚠️ 11. Anti-patrones: Qué Evitar

| Anti-patrón | Problema | Buena práctica |
| :--- | :--- | :--- |
| `git add .` sin revisar primero | Puede incluir archivos de configuración local, `.env` o binarios. | Hacer `git status` antes y agregar archivos por nombre o carpeta. |
| Commits con mensaje `"fix"` o `"prueba"` | Ilegibles en el historial; imposible saber qué cambió. | Usar la convención `tipo: descripción` (ej. `fix: corrige selector del botón de login`). |
| Trabajar directamente en `main` | Un error afecta a todo el equipo. | Siempre crear una rama por tarea o módulo. |
| `git push --force` en una rama compartida | Reescribe el historial remoto y rompe el trabajo de otros. | Usar `--force-with-lease` solo si es imprescindible y en ramas propias. |
| Commits gigantes con muchos cambios | Difíciles de revisar y de revertir si algo falla. | Commits pequeños y atómicos: un cambio lógico por commit. |

---

## 📋 12. Cheatsheet Rápido

```
# Setup
git config --global user.name / user.email

# Ciclo diario
git status          → ver qué cambió
git add <archivo>   → preparar cambio
git commit -m "..."  → guardar commit
git push             → subir al remoto
git pull             → bajar cambios

# Ramas
git checkout -b <rama>   → crear y moverse
git checkout <rama>      → moverse
git merge <rama>         → fusionar
git branch -d <rama>     → eliminar

# Emergencias
git restore <archivo>         → descartar cambio
git reset HEAD~1              → deshacer último commit
git stash / git stash pop     → guardar/recuperar trabajo temporal
```
