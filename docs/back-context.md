# Backend Context

Web application for managing CSV files with user authentication.

## General Description

REST API backend for a CSV file management application. Supports user authentication with roles (ADMIN, MEMBER) and CRUD operations for CSV files.

## Stack

- **Language/Framework**: Node.js + Express + TypeScript
- **Database**: PostgreSQL
- **ORM/ODM**: Prisma
- **API Style**: REST
- **Authentication**: JWT

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- pnpm

## Ports and Services

| Port | Service | Description |
|------|---------|-------------|
| 3001 | Express API | Main backend server |

## Environment Variables

```
DATABASE_URL
JWT_SECRET
PORT=3001
```

## Main Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | User login |
| GET | /api/files | List CSV files |
| POST | /api/files | Upload CSV file |
| GET | /api/files/:id | Get file details |
| DELETE | /api/files/:id | Delete file |

## Data Models

### User
- id, email, password, role (ADMIN|MEMBER), createdAt

### File
- id, name, path, size, userId, createdAt

## Important Middlewares

- authMiddleware (JWT verification)
- errorHandler
- validateRequest (Zod schemas)
