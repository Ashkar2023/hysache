# AGENTS.md

## Verification policy

After making code changes, do not run build, test, lint, typecheck, dependency, runtime, or other verification commands unless explicitly requested.

Do not run Node.js, npm, npx, or package-manager based commands automatically.

Examples that must not be run unless explicitly requested:

- `node ...`
- `node --check ...`
- `node -e ...`
- `npm install`
- `npm ci`
- `npm run build`
- `npm run dev`
- `npm test`
- `npm run test`
- `npm run lint`
- `npm run typecheck`
- `npx tsc`
- `npx eslint`
- `npx vite`
- `npx next`
- `pnpm ...`
- `yarn ...`
- `bun ...`
- `bunx ...`

Do not start local development servers or execute project JavaScript/TypeScript for verification.

Make the requested code changes and stop once the implementation is complete.

Static inspection of the edited files is allowed.

If verification would normally be useful, mention the relevant command in the final response, but do not execute it unless the user explicitly asks.