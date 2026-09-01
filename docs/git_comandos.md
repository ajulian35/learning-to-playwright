# Most Used Git Commands in QA Automation

Practical reference for the Git commands you will use daily when working with automated test repositories.

---

## ⚙️ 1. Initial Setup (one time only)

Before your first commit, Git needs to know who you are.

```bash
git config --global user.name  "Your Name"
git config --global user.email "your@email.com"

# Verify the config was saved
git config --list
```

---

## 🗂️ 2. Initialize or Clone a Repository

```bash
# Initialize a repository in an existing local folder
git init

# Clone a remote repository (GitHub, GitLab, etc.)
git clone https://github.com/user/repository.git

# Clone into a folder with a specific name
git clone https://github.com/user/repository.git my-folder
```

---

## 📸 3. The Basic Flow: Saving Changes

This is the cycle you will repeat dozens of times a day.

```bash
# 1. See which files changed
git status

# 2. Add a specific file to the staging area
git add file_name.py

# Add all modified files
git add .

# 3. Save the changes with a descriptive message
git commit -m "feat: add login test with invalid credentials"

# View the commit history
git log --oneline
```

> **Tip:** A good commit message describes the WHAT and the WHY, not the how.
> Recommended convention: `type: short description`
> - `feat:` — new feature or test
> - `fix:` — fix for a test or bug
> - `refactor:` — code improvement without changing behavior
> - `docs:` — documentation changes

---

## 🌿 4. Branches

Branches let you work on features or modules in isolation without affecting the main code.

```bash
# List all local branches
git branch

# List local AND remote branches
git branch -a

# Create a new branch
git branch branch-name

# Create a branch AND switch to it in one step (recommended)
git checkout -b branch-name

# Switch to an existing branch
git checkout branch-name

# Delete a local branch (only if already merged)
git branch -d branch-name

# Rename the current branch
git branch -m new-name
```

---

## 🔀 5. Merging Changes (Merge and Rebase)

```bash
# Merge the "feature/login" branch into the current branch
git merge feature/login

# Abort a merge that has conflicts (return to prior state)
git merge --abort

# Rebase: rewrite history by applying commits on top of another branch
# (used to keep a linear and clean history)
git rebase main
```

> **Merge vs Rebase:**
> - `merge` preserves the exact history (two lines joining).
> - `rebase` produces a linear, cleaner history, but rewrites commits.
> In teams: prefer `merge` for shared branches, `rebase` for personal branches before a PR.

---

## 🌐 6. Working with the Remote Repository

```bash
# View configured remotes
git remote -v

# Download changes from remote WITHOUT merging
git fetch origin

# Download AND merge changes from the current branch
git pull origin main

# Push a branch to remote for the first time
git push -u origin branch-name

# Push additional commits (after the first push)
git push

# Delete a branch from the remote
git push origin --delete branch-name
```

---

## 🔍 7. Inspecting Changes

```bash
# View unstaged changes line by line
git diff

# View staged changes, ready to commit
git diff --staged

# View the history with details
git log

# Compact history (one line per commit)
git log --oneline

# Graphical branch history (very useful for understanding merges)
git log --oneline --graph --all

# See what changed in a specific commit
git show abc1234
```

---

## ↩️ 8. Undoing Changes

| Situation | Command |
| :--- | :--- |
| Discard changes in a file (unstaged) | `git restore file_name.py` |
| Remove a file from staging (without losing changes) | `git restore --staged file_name.py` |
| Undo the last commit (keeps changes in staging) | `git reset --soft HEAD~1` |
| Undo the last commit (keeps changes unstaged) | `git reset HEAD~1` |
| Create a commit that reverts an already-published commit | `git revert abc1234` |

> ⚠️ **Caution:** `git reset --hard` permanently discards changes. Use it only if you are sure you don't need the modified files.

---

## 🗃️ 9. Stash — Temporarily Save Changes

Useful when you need to switch branches quickly without losing work in progress.

```bash
# Save current changes in a "temporary drawer"
git stash

# Save with a descriptive name
git stash push -m "wip: advanced search test"

# View all saved stashes
git stash list

# Restore the latest stash (and remove it from the list)
git stash pop

# Restore a specific stash by index
git stash pop stash@{2}

# Delete all stashes
git stash clear
```

---

## 🏷️ 10. Tags — Mark Versions

```bash
# Create a lightweight tag
git tag v1.0

# Create an annotated tag (recommended for releases)
git tag -a v1.0 -m "Initial release of the test framework"

# View all tags
git tag

# Push a tag to remote
git push origin v1.0

# Push all tags to remote
git push origin --tags
```

---

## ⚠️ 11. Anti-patterns: What to Avoid

| Anti-pattern | Problem | Best practice |
| :--- | :--- | :--- |
| `git add .` without reviewing first | May include local config files, `.env`, or binaries. | Run `git status` first and add files by name or folder. |
| Commit messages like `"fix"` or `"test"` | Unreadable in history; impossible to know what changed. | Use the convention `type: description` (e.g. `fix: correct login button selector`). |
| Working directly on `main` | One mistake affects the whole team. | Always create a branch per task or module. |
| `git push --force` on a shared branch | Rewrites remote history and breaks others' work. | Use `--force-with-lease` only if absolutely necessary and on your own branches. |
| Giant commits with many changes | Hard to review and to revert if something breaks. | Small, atomic commits: one logical change per commit. |

---

## 📋 12. Quick Cheatsheet

```
# Setup
git config --global user.name / user.email

# Daily cycle
git status          → see what changed
git add <file>      → stage change
git commit -m "..."  → save commit
git push             → push to remote
git pull             → pull changes

# Branches
git checkout -b <branch>   → create and switch
git checkout <branch>      → switch
git merge <branch>         → merge
git branch -d <branch>     → delete

# Emergencies
git restore <file>            → discard change
git reset HEAD~1              → undo last commit
git stash / git stash pop     → save/restore temporary work
```
