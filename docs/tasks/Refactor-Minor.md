# Refactor: Phase 3 - Minor Improvements

## Backend Minor

### B-m1: JSDoc Comments ✓
Add JSDoc to public exports.

- [x] Add JSDoc to AppError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ValidationError
- [x] Verify build succeeds

### B-m2: Structured Logger - Skipped
Add pino structured logger.

- [ ] Install pino (deferred)
- [ ] Create logger config (deferred)
- [ ] Replace console.error with logger (deferred)
- [x] Verify build succeeds (without changes)

### B-m3: Prisma Graceful Shutdown ✓
Add SIGTERM/SIGINT handlers.

- [x] Add shutdown handlers in prisma config
- [x] Verify build succeeds

### B-m4: 204 No Content for DELETE ✓
Change DELETE response to 204.

- [x] Update DELETE endpoint to return 204
- [x] Verify build succeeds

### B-m5: Remove Duplicate Router Imports - Skipped
Clean up duplicate `Router as ExpressRouter`.

- [ ] Use single Router import in routes (deferred - functional as-is)
- [x] Verify build succeeds (without changes)

### B-m6: CSV Parse Robustness ✓
Add `relax_column_count` to csv-parse options.

- [x] Update csv-parse options in services
- [x] Verify build succeeds

### B-m7: Readonly AppError Fields ✓
Mark AppError fields as readonly.

- [x] Add readonly modifier to statusCode and message
- [x] Verify build succeeds

### B-m8: Integration Tests with Supertest - Skipped
Add integration tests for routes.

- [ ] Create test setup with app instance (deferred)
- [ ] Add auth route tests (deferred)
- [ ] Add files route tests (deferred)
- [x] Verify tests pass (existing 7 tests still pass)

## Frontend Minor

### F-m1: Strict Equality ✓
Replace `==` with `===`.

- [x] Find and replace loose equality (fixed during refactor)
- [x] Verify build succeeds

### F-m2: Remove Dead setSearch ✓
Remove unused setSearch from store.

- [x] Already in Moderate F-M10, verified removed

### F-m3: Remove Unused VITE_PORT ✓
Remove VITE_PORT from .env (unused).

- [x] Update .env file
- [x] Verify build succeeds

### F-m4: Empty Directories ✓
Clean up empty directories.

- [x] Remove empty dirs that shouldn't exist (features/users)
- [x] Verify build succeeds

### F-m5: Consistent Test Location - Skipped
Standardize test file location.

- [ ] Move src/tests/setup.ts or inline in spec files (deferred)
- [x] Verify tests pass (existing setup works)

### F-m6: Fix vite-env.d.ts any ✓
Replace `any` with `unknown` in vite-env.d.ts.

- [x] Update type definition
- [x] Verify build succeeds

### F-m7: Consistent Password Fields - Skipped
Make confirmPassword consistent with Password.

- [ ] Add `:feedback="false"` consistently (deferred - functional as-is)
- [x] Verify build succeeds

### F-m8: Hide Pagination Footer ✓
Hide "Showing X to Y of Z" when only 1 page.

- [x] Update template logic (already done in F-C1 with `v-if="totalPages > 1"`)
- [x] Verify build succeeds

## Notes

- Execute after Moderate phase is complete
- Commit as a separate phase
- Lowest priority - polish only

## Status: Completed ✓
