# Day 47 | Content Intelligence Studio

Part of my **60 Days of AI Challenge**.

## Overview

Content Intelligence Studio is an AI-powered content review interface designed to analyze social media content before publishing.

The application brings multiple specialist perspectives into one review workflow and produces structured feedback for improving content quality and engagement.

## What It Does

The studio is designed to review:

- Social media captions
- Copy structure and hooks
- Visuals and thumbnails
- Audience engagement potential
- Platform-specific considerations
- Overall content quality

## AI Review Specialists

The workflow includes multiple specialist roles:

### Hook & Copy Specialist
Reviews the opening hook, copy structure, readability, and clarity.

### Visual & Thumbnail Analyst
Evaluates uploaded visuals and thumbnails for attention, presentation, and brand fit.

### Engagement Psychologist
Looks for curiosity gaps, emotional triggers, and reasons an audience may comment or share.

### Platform Algorithm Strategist
Reviews content against platform conventions and distribution considerations.

### Executive Editor
Combines the specialist feedback into a final review report.

## Features

- Dark professional dashboard
- Social media content review workflow
- Caption input
- Image and screenshot upload
- Review rigor selection
- Specialist review cards
- Live activity/status panel
- Structured AI feedback
- Retry and failure handling
- Local development support
- Claude API integration architecture

## Architecture

The frontend is built with:

- HTML
- CSS
- Vanilla JavaScript

The application can communicate with a local backend proxy so API credentials are not exposed directly in browser-side code.

```text
Browser
   |
   v
Content Intelligence Studio
   |
   v
Local Backend Proxy
   |
   v
Claude API
   |
   v
Specialist AI Reviews
   |
   v
Executive Synthesis
   |
   v
Final Content Review
