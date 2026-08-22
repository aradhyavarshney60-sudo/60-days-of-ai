# Day 56: BuildPath — Full-Stack AI Project Roadmap Generator

## Overview
Built and deployed **BuildPath**, an AI-powered project planner that converts project concepts into phase-by-phase actionable execution roadmaps with interactive task tracking and real-time state persistence.

---

## Live Links & Repository
* **Live Production URL:** [https://buildpath-six.vercel.app](https://buildpath-six.vercel.app)
* **GitHub Repository:** [https://github.com/aradhyavarshney60-sudo/buildpath](https://github.com/aradhyavarshney60-sudo/buildpath)

---

## Key Features Implemented
* **AI Plan Generation:** Structured prompts integrated with the Gemini API to break high-level project ideas into discrete phases, tasks, and descriptions.
* **Interactive Task Tracking:** Checkbox-based progress tracking with instant strikethrough feedback and dynamic completion percentage calculation.
* **Persistent State Management:** Real-time state persistence across page refreshes and session logouts powered by Supabase.
* **Collapsible Phase Architecture:** Clean UI enabling users to expand/collapse project phases for streamlined task management.
* **Production Deployment:** Full CI/CD pipeline integrated with Vercel and secured environment variable routing.

---

## Tech Stack
* **Frontend:** React, Vite, Tailwind CSS
* **Backend & Auth:** Supabase (PostgreSQL, Auth, Row-Level Security)
* **AI Integration:** Google Gemini API
* **Hosting & CI/CD:** Vercel

---

## Verification & Walkthrough
1. Successfully authenticated via Supabase user session.
2. Form intake submitted to generate a structured engineering roadmap.
3. Interactive state changes verified (task completion, progress bar increments).
4. Persisted data re-verified across hard reloads and re-login workflows.
