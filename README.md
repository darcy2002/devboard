# DevBoard — Micro Frontend Task Management App

A lightweight task management web application built with **Micro Frontend (MFE) architecture** using Vite Module Federation.

---

## Live Demo

Try the app online — all services are deployed and connected:

| Service        | URL |
| -------------- | --- |
| **Shell (main app)** | [https://devboard-main.vercel.app/](https://devboard-main.vercel.app/) |
| **MFE Tasks**  | [https://mfe-tasks.vercel.app/](https://mfe-tasks.vercel.app/) |
| **MFE Dashboard** | [https://devboard-blue.vercel.app/](https://devboard-blue.vercel.app/) |
| **Backend API** | [https://devboard-production-0b7c.up.railway.app/api](https://devboard-production-0b7c.up.railway.app/api) |

Open the **Shell** link to use the full app (Dashboard + Tasks). The API link is the backend base URL for health checks and task endpoints.

---

## Run quickly locally

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

# 4. Build MFEs once (Module Federation needs built assets)
npm run build:shared && npm run build:tasks && npm run build:dashboard

# 5. Start everything (backend + MFE preview servers + shell)
npm run dev
```

Then open the **shell** URL that Vite prints (e.g. **http://localhost:5173**). Use this URL to see the full app with the left menu bar (Dashboard / Tasks). Do not open the MFE URLs (e.g. 5001, 5002) directly—those run without the shell and will not show the sidebar.

**Shell UI changes not showing?** The shell runs in **dev mode** on **port 5173** when you use `npm run dev`. Open **http://localhost:5173** (not 5000). If you use `npm run preview:shell` or open port 5000, you are viewing a **built** bundle—run `npm run build:shell` and refresh to see latest shell changes. In dev, the sidebar footer shows "● Live dev" when you're on the latest dev server.

---

## Path-based deploys (GitHub Actions)

Pushes to `main` or `master` trigger **only** the deployment for the code that changed:

| Changes in          | Workflow                    | Deploys to   |
| ------------------- | --------------------------- | ------------ |
| `backend-api/**`    | `deploy-backend.yml`        | Railway      |
| `shared-ui/**`      | (add `deploy-vercel-shared-ui.yml` or deploy manually) | Vercel (shared-ui) |
| `shell-app/**`      | `deploy-vercel-shell.yml`   | Vercel (shell) |
| `mfe-tasks/**`      | `deploy-vercel-mfe-tasks.yml` | Vercel (mfe-tasks) |
| `mfe-dashboard/**`  | `deploy-vercel-mfe-dashboard.yml` | Vercel (mfe-dashboard) |

**Setup:**

1. **Vercel** — For each project (shell, mfe-tasks, mfe-dashboard): **Settings → Git → Deploy Hooks** → create a hook for `main`, copy the URL. In the repo: **Settings → Secrets and variables → Actions** → add:
   - `VERCEL_DEPLOY_HOOK_SHELL`
   - `VERCEL_DEPLOY_HOOK_MFE_TASKS`
   - `VERCEL_DEPLOY_HOOK_MFE_DASHBOARD`

   To avoid double deploys, in each Vercel project you can turn off “Deploy on push” and rely only on these hooks, or keep it and use the hooks for path-only triggers (workflows only run when their path changes).

2. **Deploy shared-ui separately** — mfe-tasks and mfe-dashboard load shared-ui (Button, Card, Modal, Badge, etc.) from a remote at runtime. Deploy **shared-ui** as its own app (e.g. Vercel with Root Directory `shared-ui`). When building mfe-tasks and mfe-dashboard for production, set **`VITE_SHARED_UI_URL`** to that deployed URL (e.g. `https://your-shared-ui.vercel.app`). Default if unset: `http://localhost:5003` (local only).

3. **Railway** — In the repo add **Actions** secrets:
   - `RAILWAY_TOKEN`: Railway project token (**Project → Settings → Tokens**).
   - `RAILWAY_SERVICE_ID`: **Required** when the project has multiple services. Get it in Railway: backend service → Settings → Service ID (or from the service URL). Add as repo secret. Previously: (optional) Service ID from the backend service’s URL or settings. If the project has one service, the CLI may detect it without this.

The backend workflow runs in the Railway CLI container and runs `railway up` from `backend-api/`. Ensure the Railway project has **Root Directory** set to `backend-api` (or the service is configured to build from that path).

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     SHELL APP (:5000)                   │
│              React Router · Layout · Navbar             │
│                                                         │
│   ┌─────────────────────┐  ┌─────────────────────────┐  │
│   │  MFE-DASHBOARD      │  │  MFE-TASKS              │  │
│   │  (:5002)             │  │  (:5001)                │  │
│   │                      │  │                         │  │
│   │  Stats Cards         │  │  Task CRUD              │  │
│   │  Pie Chart           │  │  Filters                │  │
│   │  Bar Chart           │  │  Optimistic Updates     │  │
│   │  Auto-refresh        │  │  Priority Badges        │  │
│   └──────────┬───────────┘  └──────────┬──────────────┘  │
│              │                         │                 │
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
                 │   (Free M0 Tier)  │
                 └───────────────────┘
```

Each MFE is independently built and deployed. The shell-app loads MFEs at runtime via Module Federation `remoteEntry.js` files. MFEs communicate **only through the shared REST API** — no direct prop tunneling.

---

## Tech Stack

| Layer       | Technology                                                        |
| ----------- | ----------------------------------------------------------------- |
| Frontend    | React 18, TypeScript, Vite 5, Tailwind CSS v4                    |
| MFE         | @originjs/vite-plugin-federation                                  |
| Data        | @tanstack/react-query v5, Axios                                  |
| Routing     | react-router-dom v6                                               |
| Charts      | Recharts                                                          |
| Backend     | Node.js, Express, Mongoose, express-validator                     |
| Database    | MongoDB Atlas (Free M0 Cluster)                                   |
| Testing     | Vitest, @testing-library/react, @testing-library/jest-dom         |
| CI          | GitHub Actions                                                    |
| Deployment  | Vercel (frontends), Railway (backend)                             |

---

## Local Setup (detailed)

### Prerequisites

- Node.js 18+
- npm 9+
- MongoDB Atlas account (free tier) or local MongoDB

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/devboard.git
cd devboard

# 2. Install all dependencies
npm run install:all

# 3. Set up environment variables
# Backend
cp backend-api/.env.example backend-api/.env
# Edit backend-api/.env with your MongoDB URI

# MFE Tasks
cp mfe-tasks/.env.example mfe-tasks/.env

# MFE Dashboard
cp mfe-dashboard/.env.example mfe-dashboard/.env

# Shell App
cp shell-app/.env.example shell-app/.env

# 4. Seed the database with sample data
npm run seed

# 5. Start the backend
npm run dev:backend

# 6. In separate terminals, build & preview the MFEs
cd shared-ui && npm run build && npm run preview &
cd mfe-tasks && npm run build && npm run preview &
cd mfe-dashboard && npm run build && npm run preview &

# 7. In another terminal, start the shell (dev mode)
cd shell-app && npm run dev

# 8. Open http://localhost:5000 in your browser
```

> **Note:** Module Federation requires built assets, so MFEs run in preview mode (built + served) rather than dev server mode.

---

## Environment Variables

| Variable               | Project        | Description                              | Example                                    |
| ---------------------- | -------------- | ---------------------------------------- | ------------------------------------------ |
| `PORT`                 | backend-api    | Server port                              | `5050`                                     |
| `MONGODB_URI`          | backend-api    | MongoDB connection string                | `mongodb+srv://user:pass@cluster0.../devboard` |
| `NODE_ENV`             | backend-api    | Environment mode                         | `development`                              |
| `CORS_ORIGIN`          | backend-api    | Comma-separated allowed origins          | `http://localhost:5000,http://localhost:5001` |
| `VITE_API_URL`         | mfe-tasks      | Backend API base URL                     | `http://localhost:5050/api`                |
| `VITE_API_URL`         | mfe-dashboard  | Backend API base URL                     | `http://localhost:5050/api`                |
| `VITE_SHARED_UI_URL`   | mfe-tasks      | Shared UI remote URL (for Module Federation) | `http://localhost:5003` (default)      |
| `VITE_SHARED_UI_URL`   | mfe-dashboard  | Shared UI remote URL (for Module Federation) | `http://localhost:5003` (default)      |
| `VITE_MFE_TASKS_URL`   | shell-app      | MFE Tasks deployment URL                 | `http://localhost:5001`                    |
| `VITE_MFE_DASHBOARD_URL` | shell-app   | MFE Dashboard deployment URL             | `http://localhost:5002`                    |

For **production** builds of mfe-tasks and mfe-dashboard, set `VITE_SHARED_UI_URL` to your deployed shared-ui URL (e.g. in Vercel: Project → Settings → Environment Variables).

---

## API Endpoints

| Method   | Endpoint               | Description                                  |
| -------- | ---------------------- | -------------------------------------------- |
| `GET`    | `/api/health`          | Health check                                 |
| `GET`    | `/api/tasks/stats`     | Aggregated task statistics                   |
| `GET`    | `/api/tasks`           | List all tasks (filter: `?status=`, `?priority=`) |
| `POST`   | `/api/tasks`           | Create a new task                            |
| `GET`    | `/api/tasks/:id`       | Get a single task                            |
| `PUT`    | `/api/tasks/:id`       | Update a task                                |
| `PATCH`  | `/api/tasks/:id/status`| Toggle task status (pending ↔ completed)     |
| `DELETE` | `/api/tasks/:id`       | Soft-delete a task                           |

---

## Running Tests

```bash
# Run all tests
npm test

# Run mfe-tasks tests only
cd mfe-tasks && npx vitest run

# Run mfe-dashboard tests only
cd mfe-dashboard && npx vitest run

# Watch mode
cd mfe-tasks && npx vitest
```

---

## Design Decisions

### Soft Delete
Tasks are soft-deleted (`isDeleted: true`) rather than permanently removed. This preserves data for potential recovery and audit trails. A pre-find middleware automatically excludes deleted documents from all queries.

### Independent QueryClients
Each MFE creates its own `QueryClient` inside `App.tsx`. When loaded via Module Federation, `main.tsx` doesn't execute — only the exposed component mounts. This ensures React Query works correctly regardless of how the MFE is loaded.

### API-Only MFE Communication
MFEs communicate exclusively through the backend API. There is no direct state sharing, event bus, or prop tunneling between MFEs. This ensures true independence and independent deployability.

### Optimistic Updates
Status toggles and deletes use optimistic updates via React Query's `onMutate` → `onError` rollback → `onSettled` invalidation pattern. This provides instant UI feedback while the API call completes.

### $facet Aggregation
The `/stats` endpoint uses MongoDB's `$facet` pipeline to compute all statistics (total, completed, pending, overdue, by-priority, by-status) in a single database query, minimizing round trips.

### Build-Time Federation
MFE remote URLs are resolved at build time via environment variables. For local dev, MFEs must be built and previewed (not run in dev mode) because Vite Module Federation requires built assets.

### Tailwind CSS v4
Uses the new Tailwind v4 approach with `@import "tailwindcss"` and the `@tailwindcss/vite` plugin — no `tailwind.config.js` needed.

### Card Layout
Tasks use a responsive card grid (1/2/3 columns) with colored left borders indicating status (green=completed, red=overdue, indigo=default) for quick visual scanning.

---

## What I'd Improve Given More Time

- **WebSocket sync** — Real-time updates across MFEs when tasks change
- **Drag-and-drop Kanban** — Board view with drag-to-change-status
- **Authentication** — User auth with JWT and per-user task lists
- **Search & Pagination** — Full-text search and cursor-based pagination for large task lists
- **E2E Tests** — Playwright tests covering the full MFE integration flow
- **Dark Mode** — System-preference-aware theme toggle
- **Offline Support** — Service worker + IndexedDB for offline task management
- **Storybook** — Component documentation for the shared-ui library
- **Shared UI via Federation** — Consume shared-ui components in MFEs via Module Federation (currently a bonus structure)

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
│       ├── types/         # TypeScript interfaces
│       └── utils/         # ApiError, seed script
├── shared-ui/             # Shared component library (MFE remote)
│   └── src/components/    # Spinner, Badge, Button, Card, Modal, EmptyState
├── mfe-tasks/             # Task management MFE (remote)
│   └── src/
│       ├── components/    # TaskCard, TaskForm, TaskList, filters
│       ├── hooks/         # React Query hooks with optimistic updates
│       ├── services/      # Axios API layer
│       └── types/         # TypeScript interfaces
├── mfe-dashboard/         # Dashboard stats MFE (remote)
│   └── src/
│       ├── components/    # StatCard, Charts, RefreshButton
│       ├── hooks/         # Stats hook with auto-refetch
│       ├── services/      # Stats API layer
│       └── types/         # TypeScript interfaces
├── shell-app/             # Host app (Module Federation consumer)
│   └── src/
│       ├── components/    # Layout, Navbar, Sidebar, ErrorBoundary
│       └── pages/         # Lazy-loaded MFE pages
├── .github/workflows/     # CI pipeline
├── .eslintrc.json         # Shared ESLint config
├── .prettierrc            # Prettier config
└── README.md
```

---

## License

MIT
