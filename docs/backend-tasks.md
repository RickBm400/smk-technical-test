# Backend Tasks List

# Task-1: CSV Row Validation Schema ✓

Implement Zod schema for CSV row validation with the following fields:
- correo: String (email format, required)
- nombre: String (required)
- telefono: String (numeric only, required)
- ciudad: String (required)
- notas: String (optional)

**Status:** Completed ✓

# Task-2: Document Model ✓

Create Document model in Prisma schema to store CSV row data linked to File model.

**Status:** Completed ✓

# Task-3: Multer Configuration ✓

Configure Multer for file uploads with 10MB size limit.

**Status:** Completed ✓

# Task-4: CSV Upload Endpoint ✓

Implement POST /api/files/upload endpoint that:
- Accepts CSV file via multipart/form-data
- Parses CSV and validates all rows at once
- Returns all errors with row/field details
- Creates File and Document records on success

**Status:** Completed ✓

# Task-5: RBAC Middleware ✓

Create requireAdmin middleware for role-based access control.

**Status:** Completed ✓

# Task-6: RBAC on Delete Endpoint ✓

Apply requireAdmin middleware to DELETE /api/files/:id endpoint so only admins can delete files.

**Status:** Completed ✓

# Task-7: Error Messages ✓

Create error-messages.ts file with all error messages centralized and update backend files to use these constants instead of literal strings.

**Status:** Completed ✓

# Task-8: Paginated dashboard ✓

for /files endpoint, implement a paginated mechanism in order to reduce response load, add the functionality of search regist by file name or user id

**Status:** Completed ✓