# Repository Guidelines

## Project Structure & Module Organization
The app is a single-page Vite project without a `src/` directory: `index.tsx` holds the TypeScript UI state machine and Google Gemini client calls, `index.css` defines layout and theming, and `index.html` mounts the app on `#root`. Generated assets land in `dist/` after builds, while `metadata.json` carries AI Studio descriptors. Avoid editing `node_modules/`; use the `@/` alias from `vite.config.ts` for workspace-relative imports.

## Build, Test, and Development Commands
Install once with `npm install`. Use `npm run dev` for the local dev server on port 3000, with hot module reload. `npm run build` produces optimized output in `dist/`, and `npm run preview` serves the bundle for final smoke tests. Rebuild after modifying prompts, API glue code, or static assets so generated bundles stay in sync with `.env` updates—restart the dev server whenever switching between Gemini and third-party providers.

## Coding Style & Naming Conventions
Follow the idioms in `index.tsx`: four-space indentation, single quotes, and `camelCase` for variables and helper functions. Keep prompt presets inside the `STYLES` array, and store persistent UI state in the existing `HistoryItem` model. Prefer `const` over `let` unless reassignment is required, and colocate new utility modules near their consumers to preserve the flat layout.

## Testing Guidelines
Automated tests are not yet configured. When adding features, validate manually by uploading sample images through `npm run dev`, and exercise history persistence flows (localStorage, regeneration, clearing). If you introduce unit tests, place them alongside the feature with a `.test.ts` suffix and wire a matching `npm test` script in `package.json` so future agents can run coverage consistently.

## Commit & Pull Request Guidelines
Commits should follow the existing Conventional Commit prefixing (`feat:`, `fix:`, `chore:`) to keep history scannable. Each pull request must describe the change, list manual verification steps, and attach before/after screenshots for UI-visible tweaks. Reference relevant GitHub or AI Studio issue IDs, and confirm that no secrets (such as API keys) are committed before requesting review.

## Security & Configuration Tips
Store your Gemini key in `.env.local` as `GEMINI_API_KEY`; Vite injects it as `process.env.API_KEY` during builds. `.env.example` exposes `THIRD_PARTY_API_KEY`, `THIRD_PARTY_BASE_URL` (alias `THIRD_PARTY_API_BASE_URL`), and `THIRD_PARTY_MODEL_NAME` (alias `THIRD_PARTY_MODEL`); Vite maps them to `process.env.THIRD_PARTY_*` so the UI falls back to the third-party `chat/completions` endpoint when those values are present. Never commit `.env*` files. Clear browser history when testing sensitive images, and redact personal data before sharing prompts or screenshots.
