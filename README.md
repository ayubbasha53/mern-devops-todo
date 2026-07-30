# MERN Stack CRUD App — Task Manager

A complete, working MERN (MongoDB, Express, React, Node) CRUD application with a ready-to-deploy backend (Render) and frontend (Vercel).

## What's included
- **backend/** — Express + Mongoose REST API (Create, Read, Update, Delete tasks)
- **frontend/** — React (Vite) app with a form, list, edit, delete, and status toggle
- Deployment configs for **Render** (backend) and **Vercel** (frontend)

## Run locally (2 minutes)
```bash
# Backend
cd backend
npm install
cp .env.example .env    # paste your MongoDB URI into .env
npm run dev              # runs on http://localhost:5000

# Frontend (in a new terminal)
cd frontend
npm install
cp .env.example .env
npm run dev              # runs on http://localhost:5173
```

## Deploy in ~10 minutes

### 1. Get a free MongoDB Atlas database (~3 min)
1. Sign up at https://www.mongodb.com/cloud/atlas/register
2. Create a free (M0) cluster.
3. Under **Database Access**, create a user with a password.
4. Under **Network Access**, add `0.0.0.0/0` (allow from anywhere) for quick setup.
5. Click **Connect → Drivers**, copy the connection string, replace `<password>` with your DB user's password.

### 2. Push this project to GitHub (~1 min)
```bash
git init
git add .
git commit -m "MERN CRUD app"
gh repo create mern-crud-app --public --source=. --push
# (or create a repo on github.com and git push manually)
```

### 3. Deploy the backend on Render (~3 min)
1. Go to https://render.com → New → Web Service → connect your GitHub repo.
2. Set **Root Directory** to `backend`.
3. Build command: `npm install` — Start command: `npm start`.
4. Add environment variable `MONGO_URI` with your Atlas connection string.
5. Deploy. Copy the live URL (e.g. `https://mern-crud-backend.onrender.com`).

### 4. Deploy the frontend on Vercel (~3 min)
1. Go to https://vercel.com → New Project → import the same repo.
2. Set **Root Directory** to `frontend`.
3. Add environment variable `VITE_API_URL` = `https://<your-render-url>/api/tasks`.
4. Deploy. Vercel gives you a live URL — your app is now live end-to-end.

## API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | List all tasks |
| GET | `/api/tasks/:id` | Get one task |
| POST | `/api/tasks` | Create a task `{ title, description?, status? }` |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## Notes
- The "10 minutes" assumes you already have GitHub, Render, and Vercel accounts — first-time signups add a few minutes.
- Free tiers: Render's free web service spins down when idle (first request after inactivity takes ~30s to wake up) — fine for demos, not for production traffic.
- Swap "Task" for any other resource by renaming `Task.js`, `taskRoutes.js`, and the frontend components/fields.
