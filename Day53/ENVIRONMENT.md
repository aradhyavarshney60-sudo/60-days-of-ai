# BuildPath — Environment Configuration

**Status:** Current as of Day 3
**Purpose:** Single reference for every environment variable, external account, and configuration value BuildPath depends on. No actual secret values are stored in this file — it documents *what* exists and *where*, not the values themselves.

---

## 1. Local Environment Variables

File: `.env.local` (in project root, **gitignored**, never committed)

| Variable | Used by | Exposed to browser? | Notes |
|---|---|---|---|
| `VITE_SUPABASE_URL` | `src/lib/supabaseClient.js` | Yes | Safe to expose — it's just an endpoint address |
| `VITE_SUPABASE_ANON_KEY` | `src/lib/supabaseClient.js` | Yes | Safe to expose — protected by Row-Level Security on the database side |

**Template** (`.env.example` — safe to commit, contains no real values):
```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

**Why the `VITE_` prefix is required:** Vite only exposes environment variables to frontend code if they're prefixed `VITE_` — this is a deliberate safety boundary so unrelated secrets aren't accidentally leaked to the browser bundle.

---

## 2. Server-Side Environment Variables (Vercel only — not yet added)

To be configured on **Day 5**, when the AI serverless functions are built. **Never** added to `.env.local` or any frontend-accessible file.

| Variable | Used by | Exposed to browser? | Notes |
|---|---|---|---|
| `GEMINI_API_KEY` | `api/generate-plan.js`, `api/next-step.js` | **No — server-side only** | Must be added directly in Vercel Project Settings → Environment Variables |

---

## 3. Vercel Project Configuration

| Setting | Value |
|---|---|
| Framework Preset | Vite (auto-detected) |
| Build Command | default (`npm run build`) |
| Output Directory | default (`dist`) |
| Environment Variables set | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` |
| Live URL | https://buildpath-six.vercel.app |

---

## 4. External Accounts Created

| Service | Purpose | Plan |
|---|---|---|
| GitHub | Source control, connected to Vercel | Free |
| Supabase | Postgres database + Auth | Free tier |
| Google AI Studio | Gemini API key generation | Free tier |
| Vercel | Hosting + future serverless functions | Free tier (Hobby plan) |

---

## 5. Local Development Tools

| Tool | Version (as installed) |
|---|---|
| Node.js | v26.7.0 |
| npm | 11.19.0 |
| Git | 2.51.1 |
| VS Code | latest |

---

## 6. Supabase Project Details

- **Project name:** buildpath
- **Region:** as selected during creation (closest to developer's location)
- **Plan:** Free
- **Auth method enabled:** Email/password only (no OAuth — matches PRD scope)
- **RLS status:** Enabled on `projects` and `tasks` tables, with per-user policies (see `SCHEMA.md` for full SQL)

---

## 7. Security Notes

- `.env.local` is excluded via `.gitignore` — verified with `git status` showing a clean working tree after creation.
- The Supabase **anon key** is intentionally public-safe (protected by RLS) and can live in frontend code.
- The Supabase **service role key** (a separate, more powerful key) is **not used anywhere** in BuildPath v1.0 and should never be added to any file in this project.
- The **Gemini API key** must only ever exist as a server-side Vercel environment variable — it must never appear in any `VITE_`-prefixed variable or any file inside `src/`.
