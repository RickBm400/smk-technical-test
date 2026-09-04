# Refactor: Phase 1 - Critical Fixes

## Backend Critical

### B-C1: Service Layer ✓
Create services for auth and files to extract business logic from route handlers.

- [x] Create `src/services/auth.service.ts` with register, login, getUserById
- [x] Create `src/services/files.service.ts` with listFiles, getFile, uploadFile, deleteFile, downloadFile
- [x] Update routes to delegate to services
- [x] Verify build succeeds

### B-C2: Database Transactions ✓
Wrap file creation + document creation in a transaction.

- [x] Modify `files.service.ts` `uploadFile` to use `prisma.$transaction`
- [x] Verify build succeeds

### B-C3: Environment Validation ✓
Validate required env vars at startup with Zod.

- [x] Create `src/config/env.ts` with Zod schema for env vars
- [x] Update `index.ts` to validate env on startup
- [x] Remove `!` non-null assertions on JWT_SECRET
- [x] Verify build succeeds

### B-C4: Error Subclasses ✓
Replace string-based error detection with proper error subclasses.

- [x] Move `AppError` and `ValidationError` to `src/common/errors/`
- [x] Create `BadRequestError`, `NotFoundError`, `UnauthorizedError`, `ForbiddenError`
- [x] Update `errorHandler` to use type checking
- [x] Mark fields as `readonly`
- [x] Update services to use appropriate error classes
- [x] Verify build succeeds

## Frontend Critical

### F-C1: Option API Rewrite ✓
Rewrite all 3 views in pure Option API (no setup, no ref, no onMounted).

- [x] Rewrite `LoginView.vue` using `data()`, `methods`, `mounted`
- [x] Rewrite `SignUpView.vue` using `data()`, `methods`, `mounted`
- [x] Rewrite `DashboardView.vue` using `data()`, `methods`, `mounted`, `computed`
- [x] Verify build succeeds

### F-C2: Pinia Options Form ✓
Convert Pinia stores to Options API form.

- [x] Convert `auth.ts` store to `{ state, getters, actions }` form
- [x] Convert `files.ts` store to `{ state, getters, actions }` form
- [x] Verify build succeeds

### F-C3: Auth Bug Fix ✓
Fix dashboard route auth bypass.

- [x] Update `router/index.ts` to set `requiresAuth: true` on `/dashboard`
- [x] Verify router guard works correctly

### F-C4: ESLint + Tests ✓
Add ESLint config and fix failing tests.

- [x] Create `.eslintrc.cjs` (or `eslint.config.js`) configuration
- [x] Update test setup to register PrimeVue
- [x] Update test assertions to match Spanish text
- [x] Verify `pnpm lint` passes
- [x] Verify `pnpm test` passes

### F-C5: Reactive isAdmin ✓
Make `isAdmin` a reactive computed property.

- [x] Convert `isAdmin` to Option API `computed: { isAdmin() { return ... } }`
- [x] Remove inline computation in setup
- [x] Verify build succeeds

## Notes

- Execute backend tasks first, then frontend
- Verify build after each task
- Commit after completing all critical fixes

## Status: Completed ✓
