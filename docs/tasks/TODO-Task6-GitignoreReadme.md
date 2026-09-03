# TODO: Task-5: Gitignore y README

**Estado:** Completado ✓

**Descripción:**
- Crear archivos `.gitignore` apropiados para cada proyecto
- Crear README.md con documentación básica de cada proyecto

**Archivos implementados:**

### Root
- `.gitignore` - Ignora `node_modules/`, `dist/`, `.env`, IDE files, OS files

### Frontend (`frontend/`)
- `.gitignore` - Ignora `dist/`, `dist-ssr/`, `.vite/`, `coverage/`
- `README.md` - Documentación del proyecto frontend

### Backend (`backend/`)
- `.gitignore` - Ignora `dist/`, `prisma/migrations/`, `coverage/`
- `README.md` - Documentación del proyecto backend

**Contenido .gitignore típico:**
```
node_modules/
dist/
.env
.vscode/
.idea/
.DS_Store
```

**Contenido README.md incluye:**
- Stack tecnológico
- Instrucciones de setup
- Comandos disponibles
- Variables de entorno necesarias
- Para backend: endpoints de API
