# BuildPath — Setup Guide

**Status:** Completed — Day 3
**Purpose:** Step-by-step record of how the BuildPath development environment and project foundation were set up. Anyone (including a future you, or a fresh AI conversation) can follow this to reproduce the environment from scratch.

---

## 1. Prerequisites Installed

| Tool | Version confirmed | Purpose |
|---|---|---|
| Node.js | v26.7.0 | Runs JavaScript tooling (Vite, npm) outside the browser |
| npm | 11.19.0 | Installs and manages project dependencies |
| Git | 2.51.1 | Version control |
| VS Code | (latest) | Code editor used throughout the build |

**Note:** PowerShell's default script execution policy blocked `npm` on first run. Fixed with:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
This is a standard, safe fix for Windows dev machines — it allows locally-created and signed scripts to run, without disabling all script security.

---

## 2. Project Creation

```bash
cd ~
mkdir Projects
cd Projects
npm create vite@latest buildpath -- --template react
cd buildpath
npm install
npm run dev
```

Confirmed working at `http://localhost:5173`.

---

## 3. Tailwind CSS Setup

```bash
npm install tailwindcss @tailwindcss/vite
```

`vite.config.js`:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

`src/index.css`:
```css
@import "tailwindcss";
```

Verified with a styled test component before reverting to clean placeholders.

---

## 4. React Router Setup

```bash
npm install react-router-dom
```

Three routes created: `/` (Landing), `/auth` (Auth), `/dashboard` (Dashboard), wired up in `src/App.jsx` with `BrowserRouter`, `Routes`, `Route`, and a simple nav bar using `Link`.

---

## 5. Git & GitHub

```bash
git init
git add .
git commit -m "Initial commit: Vite + React + Tailwind + React Router scaffold"
git branch -M main
git remote add origin https://github.com/aradhyavarshney60-sudo/buildpath.git
git push -u origin main
```

**Branching strategy:** single `main` branch for the entire solo 10-day sprint. No feature-branch workflow — that's team-coordination overhead this project doesn't need. Direct commits to `main` give a clean, readable daily history.

---

## 6. Supabase Project

- Project name: `buildpath`
- Project URL: `https://ildzemjzidppztwethks.supabase.co`
- Plan: Free tier

**Tables created** (SQL Editor):
- `projects` (one row per user, enforced via `UNIQUE` on `user_id`)
- `tasks` (belongs to a project, `ON DELETE CASCADE`)

**Row-Level Security:** enabled on both tables, with policies restricting all select/insert/update/delete operations to rows owned by the authenticated user (`auth.uid() = user_id`, or via the `project_id` join for `tasks`). Verified the "UNRESTRICTED" badge disappeared from both tables in Table Editor after applying policies.

Full SQL is in `SCHEMA.md`.

---

## 7. Supabase Client Integration

```bash
npm install @supabase/supabase-js
```

`src/lib/supabaseClient.js`:
```js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

Connection verified with a temporary test query against the `projects` table — confirmed "✅ Supabase connected successfully" both locally and on the live Vercel deployment, then reverted to a clean placeholder.

---

## 8. Gemini API Key

Generated at [aistudio.google.com](https://aistudio.google.com) → **Get API key** → **Create API key**. Stored securely outside the project folder. **Not** added to `.env.local` — per `ARCHITECTURE.md`, this key must remain server-side only and will be added as a Vercel environment variable when the AI serverless functions are built on Day 5.

---

## 9. Deployment (Vercel)

1. Signed in to [vercel.com](https://vercel.com) via GitHub.
2. Imported the `buildpath` repo — auto-detected as a Vite project.
3. Added environment variables in Vercel project settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deployed. Live at: **https://buildpath-six.vercel.app**
5. Verified the live Dashboard route successfully connects to Supabase, proving the full pipeline (GitHub → Vercel build → live app → Supabase) works end-to-end.

---

## 10. How to Run This Project Locally (for future reference)

```bash
git clone https://github.com/aradhyavarshney60-sudo/buildpath.git
cd buildpath
npm install
# create .env.local with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (see ENVIRONMENT.md)
npm run dev
```
