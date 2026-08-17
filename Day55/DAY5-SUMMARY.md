# BuildPath — Day 5 Summary

**SDLC Phase:** Implementation — AI Plan Generation
**Date:** Day 5 of 10
**Status:** ✅ Complete — all Blueprint checklist items met

---

## Objective (from Blueprint)

Build the serverless function that calls the Gemini API to generate a real, personalized task plan, save it to the database, and display it on the Dashboard.

**Result: Achieved, with no scope changes.**

---

## What Was Built Today

- `src/lib/promptTemplates.js` — the "Generate Plan" prompt, filling in idea/skill/time/preferences, with explicit JSON-shape and skill-gap-flagging instructions
- `api/generate-plan.js` — Vercel serverless function that:
  - Verifies the caller's Supabase auth token
  - Looks up their saved project
  - Calls Gemini (free tier, `gemini-2.0-flash`) with `responseMimeType: "application/json"` to reduce malformed output
  - Validates the JSON shape defensively; retries once with a stricter instruction on failure
  - Flattens phases/tasks and inserts them into the `tasks` table using the Supabase **service role** key (server-side only)
  - Blocks duplicate generation for a project that already has tasks (409 response)
- `Generating.jsx` — replaced the placeholder with a real loading state that calls `/api/generate-plan` and redirects to `/dashboard` on success, with error + retry handling
- `Dashboard.jsx` — replaced the placeholder with a real view: tasks grouped by phase, progress bar, disabled checkboxes (interactivity is Day 6), inline learning-gap warnings for flagged tasks
- `vite.config.js` — added a dev-server proxy (`/api` → `localhost:3000`) so the Vite dev server (with full Tailwind support) and `vercel dev` (serving the API function) can run together correctly

---

## End-of-Day Checklist (from Blueprint) — All Complete

- [x] Serverless function successfully calls Gemini and returns parsed JSON
- [x] Tasks are saved to Supabase linked to the correct project
- [x] Dashboard displays the real generated plan grouped by phase
- [x] Tested with 2+ different project ideas

---

## Issues Encountered & Resolved

1. **"No project found for this user"** despite a matching project existing — traced to `vercel dev` needing a restart to pick up newly added `.env.local` values (`SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`). Also hardened the function's error handling so a database/connection error is never again misreported as "no project found" — env vars are now checked explicitly at the top of the handler with a clear error naming which one is missing.
2. **Unstyled Dashboard** — `vercel dev` alone doesn't fully process the Tailwind Vite plugin. Fixed by running `npm run dev` (full Tailwind support) alongside `vercel dev` (API only), connected via a Vite proxy rule for `/api` requests.

Both issues were caught before moving forward, per the "never build on broken code" rule, and fully resolved with verification screenshots.

---

## Testing Performed

- Direct `curl` test of `/api/generate-plan` with a valid token — confirmed 201 response with real generated tasks (17 tasks, 5 phases, "habit" idea)
- Full UI test with a second, distinct idea ("recipe organizer app") — confirmed 18 tasks generated with content clearly specific to that idea (recipes, ingredients, shopping list — not generic)
- Confirmed tasks persist correctly across a page refresh (loaded from DB, not just held in memory)
- Regression check: logout still works, `/dashboard` route protection still redirects unauthenticated users to `/auth`

---

## Files Created/Modified Today

**New:**
- `src/lib/promptTemplates.js`
- `api/generate-plan.js`

**Modified:**
- `src/routes/Generating.jsx` (real AI call replacing placeholder)
- `src/routes/Dashboard.jsx` (real plan display replacing placeholder)
- `vite.config.js` (added `/api` proxy for local dev)
- `.env.local` (added `SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY` — not committed)
- `.gitignore` (added `.vercel`)

---

## Handoff Notes for Day 6

- Plan generation is fully working end-to-end: intake → Gemini call → saved tasks → dashboard display.
- Checkboxes on the Dashboard are currently **disabled** — they render `is_complete` correctly but don't yet update it. Day 6 makes them interactive (toggle on click, persist to Supabase, optimistic UI) and adds a live-updating progress bar (the static one built today already computes the percentage correctly — Day 6 just needs to make it re-render on toggle).
- No plan regeneration needed — the same generated plan from today carries forward into Day 6's work.
- Remember for local dev going forward: run **both** `vercel dev` (port 3000, serves `/api`) and `npm run dev` (port 5173, serves the styled UI) simultaneously in two terminals; always test UI at `localhost:5173`.
