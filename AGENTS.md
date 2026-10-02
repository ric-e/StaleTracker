AGENTS.md — stale-tracker

Obsidian plugin: command "Open stale note" opens a random markdown note not modified in N days, in a new tab, with a notice showing its age. This is a learning project for TypeScript — learning is the goal, shipping is the proof.

How to work on this project
Direct and dense. Show reasoning. Push back on weak ideas.
The maintainer writes the code. Agents explain APIs, give hints, and review like a code reviewer. Full code only when the maintainer is stuck or asks.
Plan first for 3+ step tasks; stop at decision points and ask.
Never take irreversible actions without explicit confirmation (deletes, force-pushes, history rewrites, store submission).
The maintainer is new to TypeScript but knows Python, Java, and Rust. Map TS concepts to those (narrowing ≈ if let, ! ≈ .unwrap(), .filter ≈ streams/iterators).
Layout
Dev setup: the repo is cloned into a dedicated test vault at <test-vault>/.obsidian/plugins/stale-tracker. The folder name must match the manifest id (stale-tracker). Never develop against a real vault.
Test fixtures live in the test vault (fixtures/), not in this repo.
Code: src/main.ts. The template's src/settings.ts was deleted on purpose; the settings step rebuilds it.
Commands
Command	What
npm run dev	esbuild watch. Run in the editor's terminal, not an in-Obsidian terminal plugin (dies on reload, may lack PATH)
npm run build	tsc type-check + production build
npm run lint	ESLint with Obsidian plugin rules
Before every push	npm run lint && npm run build — mirrors CI exactly

CI: GitHub Actions lint.yml, Node 20/22/24 matrix. Currently green.

Conventions
Tabs for indentation (displayed at 4). .editorconfig + .vscode/settings.json enforce it.
Semicolons, === only, backtick template literals for interpolation.
No console.log in committed code (no-console rule). Debug logs are fine locally; lint catches leftovers.
Async calls from sync callbacks: () => void this.method() (no floating promises).
noUncheckedIndexedAccess is on: guard array access (if (!x) return;) rather than !.
Constants at module level (STALE_DAYS, MS_PER_DAY).
Commit after each working step; commit before anything structural (renames, moves, deletes).
Gotchas
esbuild doesn't type-check. Dev build working ≠ code compiles. tsc checks every file under src/, imported or not.
Renaming a folder the editor has open strands unsaved buffers and loses work. Close the folder first; keep auto-save on.
Manifest changes need a full reload (Cmd/Ctrl+R) in Obsidian; Hot-Reload only reloads main.js. Changing id leaves a ghost entry until reload.
mtime vs git-synced vaults: git pull only touches changed files (fine), but a fresh clone resets every mtime, so everything looks fresh.
moduleResolution: "node" is deprecated in TS 6. Fix is "bundler" (needs TS ≥ 5.0). Status: verify with npx tsc -v and confirm the change landed. The editor should use the workspace TS version.
Current state (v0, working)
Done: command, staleness filter (mtime < now - STALE_DAYS), empty-case notice + early return, random pick with guard, open in new tab, age notice.
Manual tests passed: build, load/unload, filter correctness, 179/181-day boundary, non-markdown ignored, nested + unicode paths, editing un-stales a note, duplicate tabs accepted.
Not yet confirmed: exactly one stale note → always opens it; zero stale → notice only.
Next steps (recommended order: 1 → 4, then others)
Settings tab for STALE_DAYS: loadData/saveData, PluginSettingTab, building settings UI. Write it from scratch.
Status bar count: "N stale notes", updated via vault events; use this.registerEvent for cleanup.
Automated tests (open decision): extract filter/pick into a pure function (files, now, days), test with vitest, run in CI.
Ship v0.1: README, GitHub release with main.js + manifest.json, optionally submit to the community store (check Obsidian plugin guidelines first).
Git commit dates instead of mtime for git-synced vaults: child_process + git log, requires isDesktopOnly: true. Hardest; do last.

Open decisions: automated tests yes/no (3); whether to skip notes already open in a tab (currently allowed).