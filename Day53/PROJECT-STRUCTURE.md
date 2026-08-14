# BuildPath — Project Structure

**Status:** Updated — Day 3 (reflects actual scaffolded state; originally drafted Day 2 as a plan)

This document now distinguishes between what **exists today** (end of Day 3) and what's **planned for Days 4-7**, so future days — and fresh AI conversations — know exactly what's already built.

---

## Current Structure (as of end of Day 3)

```
buildpath/
├── src/
│   ├── main.jsx                  # App entry point (Vite default, unmodified)
│   ├── App.jsx                   # Router setup: 3 routes + nav bar
│   ├── App.css                   # Vite default (mostly unused now that Tailwind is in)
│   ├── index.css                 # Tailwind import only
│   │
│   ├── routes/
│   │   ├── Landing.jsx           # Placeholder screen
│   │   ├── Auth.jsx              # Placeholder screen
│   │   └── Dashboard.jsx         # Placeholder screen (Supabase test code removed)
│   │
│   ├── lib/
│   │   └── supabaseClient.js     # Initializes and exports the Supabase client
│   │
│   └── assets/                   # Vite default assets (react.svg, vite.svg, hero.png)
│
├── public/                       # Vite default static assets
│
├── .env.local                    # Supabase URL + anon key (gitignored, not in repo)
├── .env.example                  # NOT YET CREATED — see Day 4 note below
├── .gitignore                    # Includes node_modules, .env.local, .env
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js                # Includes Tailwind + React plugins
├── eslint.config.js              # Vite default
└── README.md                     # Vite default — needs a real project description (Day 4+)
```

---

## Planned Structure (Days 4-7 — not yet built)

These folders/files don't exist yet. Listed here so tomorrow's session (or a fresh AI conversation) knows exactly what's coming and where it belongs — no re-planning needed.

```
buildpath/
├── api/                          # NEW — Day 5. Vercel serverless functions.
│   ├── generate-plan.js          # POST /api/generate-plan
│   └── next-step.js              # POST /api/next-step
│
├── src/
│   ├── components/                # NEW — Day 6
│   │   ├── TaskItem.jsx
│   │   ├── ProgressBar.jsx
│   │   └── LoadingSpinner.jsx
│   │
│   ├── hooks/                     # NEW — Day 4 (useAuth) and Day 6 (useProject)
│   │   ├── useAuth.js
│   │   └── useProject.js
│   │
│   └── routes/
│       └── NextStepPanel.jsx     # NEW — Day 7
```

---

## Folder Responsibilities (unchanged from Day 2 design)

| Folder | Responsibility |
|---|---|
| `src/routes/` | One file per screen. Currently placeholders; will hold real screen logic starting Day 4. |
| `src/lib/` | Thin clients only — `supabaseClient.js` exists now; the fetch wrapper for AI endpoints (`api.js`) will be added Day 5. |
| `api/` | The entire custom backend — exactly two files, both serverless functions, both calling Gemini. Nothing else belongs here. |
| `src/components/` | Reusable UI pieces, introduced once there's real content to componentize (Day 6). |
| `src/hooks/` | Shared stateful logic, introduced alongside the features that need it. |

---

## Deviations From the Day 2 Plan

None. The Day 2 `PROJECT-STRUCTURE.md` plan is being followed exactly — today's work simply confirms the first slice of it is real and working, rather than changing the design.

---

## Day 4 Note

`.env.example` (a template file with placeholder values, safe to commit) should be created early Day 4 — it was planned but not yet created today. Low priority, doesn't block anything.
