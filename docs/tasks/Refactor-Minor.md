# Refactor: Phase 3 - Minor Improvements

## Backend Minor

### B-m1: JSDoc Comments
Add JSDoc to public exports.

- [ ] Add JSDoc to AppError, authMiddleware, requireAdmin, buildCsv
- [ ] Verify build succeeds

### B-m2: Structured Logger
Add pino structured logger.

- [ ] Install pino
- [ ] Create logger config
- [ ] Replace console.error with logger
- [ ] Verify build succeeds

### B-m3: Prisma Graceful Shutdown
Add SIGTERM/SIGINT handlers.

- [ ] Add shutdown handlers in prisma config or index.ts
- [ ] Verify build succeeds

### B-m4: 204 No Content for DELETE
Change DELETE response to 204.

- [ ] Update DELETE endpoint to return 204
- [ ] Verify build succeeds

### B-m5: Remove Duplicate Router Imports
Clean up duplicate `Router as ExpressRouter`.

- [ ] Use single Router import in routes
- [ ] Verify build succeeds

### B-m6: CSV Parse Robustness
Add `relax_column_count` to csv-parse options.

- [ ] Update csv-parse options
- [ ] Verify build succeeds

### B-m7: Readonly AppError Fields
Mark AppError fields as readonly.

- [ ] Add readonly modifier
- [ ] Verify build succeeds

### B-m8: Integration Tests with Supertest
Add integration tests for routes.

- [ ] Create test setup with app instance
- [ ] Add auth route tests
- [ ] Add files route tests
- [ ] Verify tests pass

## Frontend Minor

### F-m1: Strict Equality
Replace `==` with `===`.

- [ ] Find and replace loose equality
- [ ] Verify build succeeds

### F-m2: Remove Dead setSearch
Remove unused setSearch from store.

- [ ] Already in Moderate F-M10, verify removed

### F-m3: Remove Unused VITE_PORT
Remove VITE_PORT from .env (unused).

- [ ] Update .env file
- [ ] Verify build succeeds

### F-m4: Empty Directories
Clean up empty directories.

- [ ] Add .gitkeep to legitimate empty dirs (shared/components, etc.)
- [ ] Remove empty dirs that shouldn't exist (features/users)
- [ ] Verify build succeeds

### F-m5: Consistent Test Location
Standardize test file location.

- [ ] Move src/tests/setup.ts or inline in spec files
- [ ] Verify tests pass

### F-m6: Fix vite-env.d.ts any
Replace `any` with `unknown` in vite-env.d.ts.

- [ ] Update type definition
- [ ] Verify build succeeds

### F-m7: Consistent Password Fields
Make confirmPassword consistent with Password.

- [ ] Add `:feedback="false"` consistently or remove
- [ ] Verify build succeeds

### F-m8: Hide Pagination Footer
Hide "Showing X to Y of Z" when only 1 page.

- [ ] Update template logic
- [ ] Verify build succeeds

## Notes

- Execute after Moderate phase is complete
- Commit as a separate phase
- Lowest priority - polish only
