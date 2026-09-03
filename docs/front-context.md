# Frontend Context

Web application for manage CSV files.

## Stack

- **Framework**: VueJs (Options API), Pinia, Axios, Vue Router
- **Language**: TypeScript
- **Styling**: Tailwind, CSS Global Components, PrimeVue, mdijs, vue-icon
- **State**: Pinia
- **Building tools**: Vite, pnpm
- **Testing**: Vitest

## Architecture

The project follows a feature shared architecture using Options API.

src/
├── features/
│   ├── auth/
│   ├── users/
│   ├── products/
│   └── orders/
│
├── shared/
│   ├── components/
│   ├── composables/
│   ├── utils/
│   ├── types/
│   └── constants/
│
├── layouts/
├── router/
├── services/
│   └── api.ts
│
├── App.vue
└── main.ts

## Env variables

```
PORT
BACKEND_URL
```

## Routes

- /login
- /signup
- /dashboard

