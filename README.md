# Mini TM

Task manager on `React + TypeScript + Vite` with `Feature-Sliced Design` structure.

The app includes:
- dashboard with task activity stats
- task board with task list
- task details page
- create, update, and delete task flows
- local persistence via `localStorage`

## Stack

- `React 19`
- `TypeScript`
- `Vite`
- `@tanstack/react-query`
- `React Router`
- `Zustand`
- `ESLint`
- `Prettier`
- `Vitest`

## Scripts

```bash
npm install
npm run dev
```

Available commands:

- `npm run dev` - start dev server
- `npm run build` - type-check and production build
- `npm run preview` - preview production build
- `npm run typecheck` - TypeScript check
- `npm run lint` - ESLint
- `npm run test` - run tests
- `npm run check` - typecheck + lint + test

## Project Structure

The project follows FSD layers:

```text
src/
  app/        # application bootstrap, providers, router, global styles
  pages/      # route-level screens
  features/   # user actions and isolated business scenarios
  entities/   # domain model and entity-specific API/UI
  shared/     # reusable ui, utils, api client, types
```

### Layer Responsibilities

#### `app`

Application composition only:
- React Query provider
- router setup
- global layout and styles connection

Main files:
- `src/app/App.tsx`
- `src/app/providers/query/QueryProvider.tsx`
- `src/app/providers/router/router.ts`

#### `pages`

Route-level pages assembled from `features`, `entities`, and `shared`.

Current pages:
- `dashboard`
- `tasks`
- `not-found`

Examples:
- `src/pages/dashboard/ui/Dashboard.tsx`
- `src/pages/tasks/ui/TaskList.tsx`
- `src/pages/tasks/ui/TaskPage.tsx`

#### `entities`

Domain-centric layer for `task`.

Contains:
- task types
- entity queries
- entity API adapters
- entity UI

Examples:
- `src/entities/task/model`
- `src/entities/task/api`
- `src/entities/task/ui/TaskItem.tsx`

#### `features`

User actions around tasks:
- create task
- update task status
- delete task

Examples:
- `src/features/task/task-create`
- `src/features/task/task-update`
- `src/features/task/task-delete`

`task-create` also owns modal state and form state because they belong to the create-task scenario:
- `src/features/task/task-create/model/modal.store.ts`
- `src/features/task/task-create/model/form.store.ts`

#### `shared`

Reusable and framework-agnostic pieces:
- base UI (`Button`, `Loader`, `Logo`, `Toaster`)
- utility functions
- branded types
- low-level API client over `localStorage`

Examples:
- `src/shared/ui`
- `src/shared/lib`
- `src/shared/types`
- `src/shared/api/client/client.ts`

## Task Data Flow

The current task flow is split by responsibility:

1. `shared/api/client/client.ts`
   Low-level read/write operations for task data in `localStorage`.

2. `entities/task/api/*`
   Entity-level API that adapts low-level storage to domain use cases.

3. `entities/task/model/queries/*`
   React Query hooks for reading task data.

4. `features/task/*/model/*`
   Mutation hooks for create/update/delete actions.

5. `pages/*`
   Compose UI from entity and feature APIs.

## Architectural Rules

This repository currently follows these practical FSD rules:

- `shared` must not depend on `entities`, `features`, `pages`, or `app`
- `entities` may depend only on `shared`
- `features` may depend on `entities` and `shared`
- `pages` may depend on `features`, `entities`, and `shared`
- `app` composes everything, but should avoid using its own public barrel internally

In this project:
- task CRUD storage lives in `shared/api/client`
- task business-facing API lives in `entities/task/api`
- create-task modal state lives in `features/task/task-create/model`

## Path Aliases

Configured aliases:

- `@/*` -> `src/*`
- `shared` -> `src/shared`
- `pages` -> `src/pages`

Recommended style for new code:
- prefer `@/shared`, `@/entities`, `@/features`, `@/pages`, `@/app`
- use local relative imports inside the same slice when it improves clarity

## Notes

- Data is stored in browser `localStorage`, so no backend is required
- Initial tasks are seeded automatically on first load
- `React Query` is used for server-state-like orchestration even though storage is local

## Future Improvements

- add a `widgets` layer if reusable page sections start growing
- move route strings to a dedicated shared config if navigation becomes more complex
- replace `localStorage` client with real HTTP API without changing page/feature structure
