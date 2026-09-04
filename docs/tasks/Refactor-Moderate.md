# Refactor: Phase 2 - Moderate Refactors

## Backend Moderate

### B-M1: Validation Middleware
Extract `validate(schema)` middleware to eliminate duplicate try/catch.

- [ ] Create `src/middleware/validate.ts`
- [ ] Use in auth routes and files routes
- [ ] Remove duplicate try/catch blocks
- [ ] Verify build succeeds

### B-M2: Typed Query Parsing
Add Zod query parsing for pagination with limit cap.

- [ ] Create query schema for pagination (page, limit with max)
- [ ] Use in GET /files endpoint
- [ ] Verify build succeeds

### B-M3: Shared Role Type
Create shared Role type from Prisma enum.

- [ ] Export `Role` type derived from Prisma
- [ ] Update auth middleware to use Role type
- [ ] Update role middleware to use Role type
- [ ] Verify build succeeds

### B-M4: JWT Payload + Config
Extract JwtPayload interface and JWT expiration to config.

- [ ] Create `src/types/jwt.ts` with JwtPayload interface
- [ ] Move JWT_SECRET, JWT_EXPIRES_IN to config
- [ ] Update auth service and middleware to use config
- [ ] Verify build succeeds

### B-M5: csv-stringify Library
Replace hand-rolled CSV escape with csv-stringify.

- [ ] Install `csv-stringify` package
- [ ] Update `csvBuilder.ts` to use csv-stringify
- [ ] Verify build succeeds

### B-M6: Fix or Remove path Field
Either persist file to disk or remove path field.

- [ ] Remove `path` field from File model
- [ ] Update upload to not reference path
- [ ] Create migration if needed
- [ ] Verify build succeeds

### B-M7: Multer Error Type Guard
Use proper MulterError type guard.

- [ ] Use `instanceof multer.MulterError` instead of `'code' in err`
- [ ] Verify build succeeds

## Frontend Moderate

### F-M1: Extract validateEmail
Move email validation regex to shared utility.

- [ ] Create `src/shared/utils/validation.ts`
- [ ] Move email regex there
- [ ] Update LoginView and SignUpView to use shared util
- [ ] Verify build succeeds

### F-M2: Replace any with unknown
Replace `catch (error: any)` with proper typing.

- [ ] Update auth store catch blocks
- [ ] Update files store catch blocks
- [ ] Use `axios.isAxiosError` for narrowing
- [ ] Verify build succeeds

### F-M3: Extract Formatters
Move formatDate, formatSize to shared utils.

- [ ] Create `src/shared/utils/format.ts`
- [ ] Move formatters there
- [ ] Update DashboardView to use shared utils
- [ ] Verify build succeeds

### F-M4: Magic Constants
Centralize magic numbers and strings.

- [ ] Create constants file with MAX_FILE_SIZE, STORAGE_KEYS, PAGE_SIZE, DEBOUNCE_MS
- [ ] Update stores and views to use constants
- [ ] Verify build succeeds

### F-M5: Named Routes
Use named routes instead of hardcoded paths.

- [ ] Update LoginView to use `router.push({ name: 'dashboard' })`
- [ ] Update SignUpView to use `router.push({ name: 'login' })`
- [ ] Update DashboardView to use `router.push({ name: 'login' })`
- [ ] Verify build succeeds

### F-M6: Remove Unused File Type
Delete `shared/types/file.ts` (conflicts with global File type).

- [ ] Delete the file
- [ ] Verify no broken imports

### F-M7: Fix .env Consistency
Reconcile VITE_API_URL vs VITE_BACKEND_URL.

- [ ] Update `shared/constants/index.ts` to use VITE_BACKEND_URL or remove unused
- [ ] Verify consistency

### F-M8: Service Layer (Frontend)
Add auth and files service layer.

- [ ] Create `src/services/auth.service.ts`
- [ ] Create `src/services/files.service.ts`
- [ ] Update stores to use services
- [ ] Verify build succeeds

### F-M9: Store Encapsulation
Encapsulate store mutations (no direct `uploadError = []`).

- [ ] Add `setUploadError` action to files store
- [ ] Update DashboardView to use action
- [ ] Verify build succeeds

### F-M10: Remove Dead Code
Remove setSearch action and NAME_REQUIRED message.

- [ ] Remove setSearch from files store
- [ ] Remove NAME_REQUIRED from error-messages.ts
- [ ] Verify build succeeds

## Notes

- Execute after Critical phase is complete
- Commit as a separate phase
