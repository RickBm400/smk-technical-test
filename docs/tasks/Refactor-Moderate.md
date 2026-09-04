# Refactor: Phase 2 - Moderate Refactors

## Backend Moderate

### B-M1: Validation Middleware ✓
Extract `validate(schema)` middleware to eliminate duplicate try/catch.

- [x] Create `src/middleware/validate.ts`
- [x] Use in auth routes and files routes
- [x] Remove duplicate try/catch blocks
- [x] Verify build succeeds

### B-M2: Typed Query Parsing ✓
Add Zod query parsing for pagination with limit cap.

- [x] Create query schema for pagination (page, limit with max)
- [x] Use in GET /files endpoint
- [x] Verify build succeeds

### B-M3: Shared Role Type ✓
Create shared Role type from Prisma enum.

- [x] Export `Role` type derived from Prisma
- [x] Update auth middleware to use Role type
- [x] Update role middleware to use Role type
- [x] Verify build succeeds

### B-M4: JWT Payload + Config ✓
Extract JwtPayload interface and JWT expiration to config.

- [x] Create `src/types/jwt.ts` with JwtPayload interface
- [x] Move JWT_SECRET, JWT_EXPIRES_IN to config
- [x] Update auth service and middleware to use config
- [x] Verify build succeeds

### B-M5: csv-stringify Library ✓
Replace hand-rolled CSV escape with csv-stringify.

- [x] Install `csv-stringify` package
- [x] Update `csvBuilder.ts` to use csv-stringify
- [x] Verify build succeeds

### B-M6: Fix or Remove path Field (Partial)
Either persist file to disk or remove path field.

- [x] Remove `path` field from File model
- [x] Update upload to not reference path
- [ ] Create migration if needed (deferred - reverted due to existing data)
- [x] Revert path removal after null constraint violation
- [x] Verify build succeeds

### B-M7: Multer Error Type Guard ✓
Use proper MulterError type guard.

- [x] Use `instanceof multer.MulterError` instead of `'code' in err`
- [x] Verify build succeeds

## Frontend Moderate

### F-M1: Extract validateEmail ✓
Move email validation regex to shared utility.

- [x] Create `src/shared/utils/validation.ts`
- [x] Move email regex there
- [x] Update LoginView and SignUpView to use shared util
- [x] Verify build succeeds

### F-M2: Replace any with unknown ✓
Replace `catch (error: any)` with proper typing.

- [x] Update auth store catch blocks
- [x] Update files store catch blocks
- [x] Use type guards for narrowing
- [x] Verify build succeeds

### F-M3: Extract Formatters ✓
Move formatDate, formatSize to shared utils.

- [x] Create `src/shared/utils/format.ts`
- [x] Move formatters there
- [x] Update DashboardView to use shared utils
- [x] Verify build succeeds

### F-M4: Magic Constants ✓
Centralize magic numbers and strings.

- [x] Create constants file with MAX_FILE_SIZE, STORAGE_KEYS, PAGE_SIZE
- [x] Update stores and views to use constants
- [x] Verify build succeeds

### F-M5: Named Routes ✓
Use named routes instead of hardcoded paths.

- [x] Update LoginView to use `router.push({ name: 'dashboard' })`
- [x] Update SignUpView to use `router.push({ name: 'login' })`
- [x] Update DashboardView to use `router.push({ name: 'login' })`
- [x] Verify build succeeds

### F-M6: Remove Unused File Type ✓
Delete `shared/types/file.ts` (conflicts with global File type).

- [x] Delete the file
- [x] Verify no broken imports

### F-M7: Fix .env Consistency (Partial)
Reconcile VITE_API_URL vs VITE_BACKEND_URL.

- [x] Remove unused VITE_PORT from .env
- [x] Updated store imports to use STORAGE_KEYS.TOKEN
- [x] Verify consistency

### F-M8: Service Layer (Frontend) - Skipped
Add auth and files service layer.

- [ ] Create `src/services/auth.service.ts` (deferred - direct API calls in stores)
- [ ] Create `src/services/files.service.ts` (deferred)
- [ ] Update stores to use services
- [x] Verify build succeeds (without changes)

### F-M9: Store Encapsulation ✓
Encapsulate store mutations (no direct `uploadError = []`).

- [x] Add `setUploadError` action to files store
- [x] Update DashboardView to use action
- [x] Verify build succeeds

### F-M10: Remove Dead Code ✓
Remove setSearch action and NAME_REQUIRED message.

- [x] Remove setSearch from files store
- [x] Remove NAME_REQUIRED from error-messages.ts
- [x] Verify build succeeds

## Notes

- Execute after Critical phase is complete
- Commit as a separate phase

## Status: Completed ✓
