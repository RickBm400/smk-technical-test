# Frontend Context

Aplicación web para la gestión de archivos CSV.

## Stack

- **Framework**: Vue 3 (Options API)
- **Estado**: Pinia
- **HTTP**: Axios
- **Router**: Vue Router
- **Lenguaje**: TypeScript
- **UI**: PrimeVue, PrimeIcons
- **Estilos**: Tailwind, CSS global
- **Tipografía**: DM Sans (Google Fonts)
- **Build**: Vite, pnpm
- **Testing**: Vitest

## Arquitectura

El proyecto sigue una arquitectura feature-shared usando Vue Options API.

```
src/
├── features/
│   ├── auth/                  # Login, SignUp, Logout
│   │   ├── views/
│   │   ├── stores/
│   │   └── tests/
│   └── files/                 # Dashboard, upload, descarga
│       ├── views/
│       └── stores/
│
├── shared/
│   ├── constants/             # STORAGE_KEYS, FILE_CONSTANTS
│   ├── types/                 # User, RegisterData, etc.
│   ├── utils/                 # formatDate, formatSize, validation
│   ├── services/              # api.ts (axios instance)
│   └── ...
│
├── router/                    # Vue Router config
│
├── App.vue
└── main.ts
```

## Variables de entorno

```
VITE_BACKEND_URL=http://localhost:3001
```

## Rutas

| Ruta | Componente | Protegida |
|------|------------|-----------|
| `/login` | `LoginView` | No |
| `/signup` | `SignUpView` | No |
| `/dashboard` | `DashboardView` | Sí (requiere auth) |

## Roles

- **ADMIN**: Puede ver, subir, descargar y eliminar archivos
- **MEMBER**: Puede ver, subir y descargar archivos (no eliminar)
