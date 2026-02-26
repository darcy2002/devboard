# DevBoard — Micro Frontend Task Management App

A lightweight task management web application built with **Micro Frontend (MFE) architecture** using Vite Module Federation.

---

## Live Demo

| Service            | URL                                                                                          |
| ------------------ | -------------------------------------------------------------------------------------------- |
| **Shell (main app)** | [devboard-main.vercel.app](https://devboard-main.vercel.app/)                              |
| **MFE Tasks**      | [mfe-tasks.vercel.app](https://mfe-tasks.vercel.app/)                                        |
| **MFE Dashboard**  | [devboard-blue.vercel.app](https://devboard-blue.vercel.app/)                                |
| **Shared UI**      | [shared-ui-dashboard.vercel.app](https://shared-ui-dashboard.vercel.app/)                    |
| **Backend API**    | [devboard-production-0b7c.up.railway.app/api](https://devboard-production-0b7c.up.railway.app/api) |

Open the **Shell** link to use the full app (Dashboard + Tasks with drag-and-drop Kanban board).

---

## Quick Start

**Prerequisites:** Node.js 18+, MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas) free tier).

```bash
# 1. Clone and install
git clone https://github.com/<your-username>/devboard-assignement.git
cd devboard-assignement
npm run install:all

# 2. Environment — copy examples and set MongoDB URI
cp backend-api/.env.example backend-api/.env
cp mfe-tasks/.env.example mfe-tasks/.env
cp mfe-dashboard/.env.example mfe-dashboard/.env
cp shell-app/.env.example shell-app/.env
# Edit backend-api/.env and set MONGODB_URI

# 3. Seed sample data
npm run seed

# 4. Build MFEs (Module Federation needs built assets)
npm run build:mfes

# 5. Start everything (backend + MFE preview servers + shell dev server)
npm run dev
```

Open **http://localhost:5173** to see the full app with sidebar navigation.

> **Note:** MFEs run in preview mode (built + served) because Vite Module Federation requires built assets. The shell runs in dev mode for hot reload.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     SHELL APP (:5173)                   │
│              React Router · Layout · Sidebar            │
│                                                         │
│   ┌─────────────────────┐  ┌─────────────────────────┐  │
│   │  MFE-DASHBOARD      │  │  MFE-TASKS              │  │
│   │  (:5002)             │  │  (:5001)                │  │
│   │                      │  │                         │  │
│   │  Stats Cards         │  │  Kanban Board           │  │
│   │  Charts              │  │  Drag & Drop            │  │
│   │  Recent Tasks        │  │  CRUD + Optimistic UI   │  │
│   └──────────┬───────────┘  └──────────┬──────────────┘  │
│              │                         │                 │
│              │  ┌───────────────────┐  │                 │
│              └──┤   SHARED UI       ├──┘                 │
│                 │   (:5003)         │                    │
│                 │   Button, Card,   │                    │
│                 │   Modal, Badge…   │                    │
│                 └───────────────────┘                    │
└──────────────┼─────────────────────────┼─────────────────┘
               │      REST API           │
               ▼                         ▼
       ┌───────────────────────────────────────┐
       │         BACKEND API (:5050)           │
       │     Express · Mongoose · TypeScript   │
       └───────────────────┬───────────────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │   MongoDB Atlas   │
                 └───────────────────┘
```

Each MFE is independently built and deployed. The shell loads MFEs at runtime via Module Federation `remoteEntry.js` files. MFEs communicate **only through the shared REST API** — no direct prop tunneling or shared state.

---

## Tech Stack

| Layer       | Technology                                                        |
| ----------- | ----------------------------------------------------------------- |
| Frontend    | React 18, TypeScript, Vite 5, Tailwind CSS v4                    |
| MFE         | @originjs/vite-plugin-federation                                  |
| Shared UI   | Button, Card, Modal, Badge, Spinner, EmptyState (federated)      |
| Data        | @tanstack/react-query v5, Axios                                  |
| DnD         | @dnd-kit/core                                                     |
| Routing     | react-router-dom v6                                               |
| Charts      | Recharts                                                          |
| Backend     | Node.js, Express, Mongoose, express-validator                     |
| Database    | MongoDB Atlas (Free M0 Cluster)                                   |
| Testing     | Vitest, @testing-library/react                                    |
| CI/CD       | GitHub Actions                                                    |
| Deployment  | Vercel (frontends + shared-ui), Railway (backend)                 |

---

## Environment Variables

| Variable                 | Project        | Description                          | Default                        |
| ------------------------ | -------------- | ------------------------------------ | ------------------------------ |
| `PORT`                   | backend-api    | Server port                          | `5050`                         |
| `MONGODB_URI`            | backend-api    | MongoDB connection string            | —                              |
| `NODE_ENV`               | backend-api    | Environment mode                     | `development`                  |
| `CORS_ORIGIN`            | backend-api    | Comma-separated allowed origins      | `*`                            |
| `VITE_API_URL`           | mfe-tasks      | Backend API base URL                 | `http://localhost:5050/api`    |
| `VITE_API_URL`           | mfe-dashboard  | Backend API base URL                 | `http://localhost:5050/api`    |
| `VITE_SHARED_UI_URL`     | mfe-tasks      | Shared UI remote URL                 | `http://localhost:5003`        |
| `VITE_SHARED_UI_URL`     | mfe-dashboard  | Shared UI remote URL                 | `http://localhost:5003`        |
| `VITE_MFE_TASKS_URL`     | shell-app      | MFE Tasks deployment URL             | `http://localhost:5001`        |
| `VITE_MFE_DASHBOARD_URL` | shell-app     | MFE Dashboard deployment URL         | `http://localhost:5002`        |

---

## API Endpoints

| Method   | Endpoint               | Description                                  |
| -------- | ---------------------- | -------------------------------------------- |
| `GET`    | `/api/health`          | Health check                                 |
| `GET`    | `/api/tasks/stats`     | Aggregated task statistics                   |
| `GET`    | `/api/tasks`           | List tasks (filter: `?status=`, `?priority=`) |
| `POST`   | `/api/tasks`           | Create a new task                            |
| `GET`    | `/api/tasks/:id`       | Get a single task                            |
| `PUT`    | `/api/tasks/:id`       | Update a task                                |
| `PATCH`  | `/api/tasks/:id/status`| Toggle task status                           |
| `DELETE` | `/api/tasks/:id`       | Soft-delete a task                           |

---

## Testing

```bash
npm test                          # Run all tests
cd mfe-tasks && npx vitest run    # Tasks only
cd mfe-dashboard && npx vitest run # Dashboard only
```

---

## Design Decisions

- **Soft Delete** — Tasks are marked `isDeleted: true` rather than removed, preserving data for recovery and audit trails.
- **Independent QueryClients** — Each MFE creates its own `QueryClient` so React Query works correctly whether the MFE is loaded standalone or via Module Federation.
- **API-Only Communication** — No shared state or event bus between MFEs. All data flows through the REST API.
- **Optimistic Updates** — Status changes and deletes use `onMutate` → `onError` rollback → `onSettled` invalidation for instant UI feedback.
- **$facet Aggregation** — The `/stats` endpoint computes all dashboard statistics in a single MongoDB query.
- **Shared UI via Federation** — Reusable components (Button, Card, Modal, Badge, etc.) are published as a federated remote, consumed by both MFEs at runtime.
- **Tailwind CSS v4** — Uses `@import "tailwindcss"` with the `@tailwindcss/vite` plugin — no config file needed.

---

## Project Structure

```
devboard/
├── backend-api/           # Express + Mongoose REST API
│   └── src/
│       ├── config/        # Database connection
│       ├── controllers/   # Route handlers
│       ├── middleware/     # Validation & error handling
│       ├── models/        # Mongoose schemas
│       ├── routes/        # Express routes
│       └── utils/         # ApiError, seed script
├── shared-ui/             # Shared component library (MFE remote)
│   └── src/components/    # Button, Card, Modal, Badge, Spinner, EmptyState
├── mfe-tasks/             # Task management MFE
│   └── src/
│       ├── components/    # KanbanBoard, KanbanCard, KanbanColumn, TaskForm
│       ├── hooks/         # React Query hooks with optimistic updates
│       └── services/      # Axios API layer
├── mfe-dashboard/         # Dashboard stats MFE
│   └── src/
│       ├── components/    # StatCard, Charts, RecentTasksList
│       ├── hooks/         # Stats hook with auto-refetch
│       └── services/      # Stats API layer
├── shell-app/             # Host app (Module Federation consumer)
│   └── src/
│       ├── components/    # Layout, Navbar, Sidebar, MobileNav
│       └── pages/         # Lazy-loaded MFE pages
└── .github/workflows/     # CI/CD pipelines
```

---

## License

MIT
