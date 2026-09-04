# Refactor: Phase 1 - Critical Fixes

## Backend Critical

### B-C1: Service Layer
Create services for auth and files to extract business logic from route handlers.

- [ ] Create `src/services/auth.service.ts` with register, login, getUserById
- [ ] Create `src/services/files.service.ts` with listFiles, getFile, uploadFile, deleteFile, downloadFile
- [ ] Update routes to delegate to services
- [ ] Verify build succeeds

### B-C2: Database Transactions
Wrap file creation + document creation in a transaction.

- [ ] Modify `files.service.ts` `uploadFile` to use `prisma.$transaction`
- [ ] Verify build succeeds

### B-C3: Environment Validation
Validate required env vars at startup with Zod.

- [ ] Create `src/config/env.ts` with Zod schema for env vars
- [ ] Update `index.ts` to validate env on startup
- [ ] Remove `!` non-null assertions on JWT_SECRET
- [ ] Verify build succeeds

### B-C4: Error Subclasses
Replace string-based error detection with proper error subclasses.

- [ ] Move `AppError` and `ValidationError` to `src/common/errors/`
- [ ] Create `BadRequestError`, `NotFoundError`, `UnauthorizedError`, `ForbiddenError`
- [ ] Update `errorHandler` to use type checking
- [ ] Mark fields as `readonly`
- [ ] Update services to use appropriate error classes
- [ ] Verify build succeeds

## Frontend Critical

### F-C1: Option API Rewrite
Rewrite all 3 views in pure Option API (no setup, no ref, no onMounted).

- [ ] Rewrite `LoginView.vue` using `data()`, `methods`, `mounted`
- [ ] Rewrite `SignUpView.vue` using `data()`, `methods`, `mounted`
- [ ] Rewrite `DashboardView.vue` using `data()`, `methods`, `mounted`, `computed`
- [ ] Verify build succeeds

### F-C2: Pinia Options Form
Convert Pinia stores to Options API form.

- [ ] Convert `auth.ts` store to `{ state, getters, actions }` form
- [ ] Convert `files.ts` store to `{ state, getters, actions }` form
- [ ] Verify build succeeds

### F-C3: Auth Bug Fix
Fix dashboard route auth bypass.

- [ ] Update `router/index.ts` to set `requiresAuth: true` on `/dashboard`
- [ ] Verify router guard works correctly

### F-C4: ESLint + Tests
Add ESLint config and fix failing tests.

- [ ] Create `.eslintrc.cjs` (or `eslint.config.js`) configuration
- [ ] Update test setup to register PrimeVue
- [ ] Update test assertions to match Spanish text
- [ ] Verify `pnpm lint` passes
- [ ] Verify `pnpm test` passes

### F-C5: Reactive isAdmin
Make `isAdmin` a reactive computed property.

- [ ] Convert `isAdmin` to Option API `computed: { isAdmin() { return ... } }`
- [ ] Remove inline computation in setup
- [ ] Verify build succeeds

## Notes

- Execute backend tasks first, then frontend
- Verify build after each task
- Commit after completing all critical fixes
