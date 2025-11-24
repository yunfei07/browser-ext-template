# Repository Guidelines

## Project Structure & Module Organization
- Repository is minimal today (`package.json` at root). Place extension code in `src/` with clear areas: `src/manifest.json`, `src/background/`, `src/content-scripts/`, and `src/popup/`.
- Keep shared helpers in `src/shared/`; store static assets and icons in `public/`. Put automated checks in `tests/`, mirroring `src/` paths.
- Keep modules small and feature-scoped. Avoid coupling background, content script, and UI layers—communicate through message passing utilities.

## Build, Test, and Development Commands
- `npm install` — install dependencies.
- `npm test` — currently a placeholder that exits with an error; replace with a real test runner before merging any feature work.
- Add `npm run dev` (watch-mode build) and `npm run build` (production bundle to `dist/`) alongside the chosen bundler; document any required env vars in `.env.example`.

## Coding Style & Naming Conventions
- Use ES modules, 2-space indentation, and prefer `const`/`let` over `var`. Keep arrow functions for callbacks and simple handlers.
- Filenames and directories: kebab-case (`content-scripts/scroll-lock.ts`); exported classes/components in PascalCase; functions and variables in camelCase.
- Keep manifests and permissions lean; isolate browser-specific logic behind adapter utilities to stay cross-browser friendly.

## Testing Guidelines
- Place tests in `tests/` with names like `feature-name.test.ts` or `feature-name.spec.ts`; mirror the `src/` tree for easy discovery.
- Choose a runner such as Vitest or Jest; for end-to-end flows (popup, background messaging), consider Playwright in `tests/e2e/`.
- Update `npm test` to run the full suite; run locally before opening a PR and add coverage for new behaviors, especially around permission requests and messaging.

## Commit & Pull Request Guidelines
- No commit history conventions yet—use Conventional Commits (e.g., `feat: add popup state sync`, `chore: add dev build script`) for clarity.
- Pull requests should include a short summary, linked issue, and screenshots/GIFs for UI changes. Call out manifest permission changes explicitly.
- Note manual test steps and browsers exercised (Chrome, Firefox, etc.). Keep diffs focused; split unrelated changes into separate PRs.

## Security & Configuration Tips
- Do not commit secrets or API keys; load them via `.env.local` and document required values in `.env.example`.
- Keep extension permissions scoped to what is necessary; prefer optional permissions and explain why they’re needed in the PR description.
