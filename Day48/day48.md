# Day 48: Build The Verdict Engine

## Project
The Verdict Engine is a decision-support application for comparing cloud hosting providers.

The comparison focuses on:
- AWS
- Google Cloud
- Microsoft Azure
- DigitalOcean

## Objective
Build a tool for solo developers and startups choosing a cloud hosting provider for a new application, with cost and simplicity as the main priorities.

## What I Built

I built a single-file HTML application using HTML, CSS, and JavaScript.

The application:
- Compares four cloud hosting providers.
- Allows users to adjust criteria weights.
- Updates the provider ranking live.
- Shows normalized scores for each criterion.
- Displays sourced data for every provider.
- Clearly identifies editorial/calculated scores.
- Includes a Sources & Citations section.
- Includes a "How this was researched" section.
- Documents research conflicts and methodology.
- Includes responsive UI and loading/empty states.

## Criteria

The comparison uses four criteria:

1. Entry-level pricing
2. Free-tier generosity
3. Ease of use
4. Documentation and community support

Default weights:

- Entry Pricing: 30%
- Free Tier: 25%
- Ease of Use: 25%
- Documentation & Support: 20%

## Key Learnings

### 1. Grounded Research

Decision-support applications should use real, named, citable sources instead of fabricated numbers or benchmarks.

### 2. Weighted Decision Scoring

Different users have different priorities. Allowing users to adjust criteria weights makes the final ranking personalized and updates the result immediately.

### 3. Transparency by Design

The application distinguishes sourced facts from editorial or calculated values so users can understand which information is directly sourced.

### 4. Research Conflict Handling

When sources differ, the application documents the conflict and explains how the selected value was handled.

### 5. Decision-Support UX

A useful comparison tool should not only provide a winner. It should allow users to understand the reasoning behind the ranking and inspect the underlying data.

## Research Methodology

The application compares AWS, Google Cloud, Microsoft Azure, and DigitalOcean using pricing, free-tier information, ease-of-use scores, and documentation/support scores.

The weighted ranking is calculated from normalized criterion values and the weights selected by the user.

Lower entry pricing is treated as better, while higher scores for free tier, ease of use, and documentation/support are treated as better.

The free-tier scores are explicitly presented as editorial/calculated estimates rather than vendor-published scores.

## Provider Data

| Provider | Entry Pricing | Free Tier | Ease of Use | Docs & Support |
|---|---:|---:|---:|---:|
| AWS | $7.59/month | 42/100* | 8.6/10 | 8.7/10 |
| Google Cloud | $20.16/month | 88/100* | 8.6/10 | 8.5/10 |
| Azure | $7.59/month | 55/100* | 8.6/10 | 8.3/10 |
| DigitalOcean | $4/month | 30/100* | 9.3/10 | 8.6/10 |

\* Free-tier values are editorial/calculated scores and are not vendor-published scores.

## Research Conflicts

### AWS EC2 Free Tier

The application documents the AWS free-tier policy change and uses the current policy for new accounts while noting the previous policy for context.

### Google Cloud Pricing

The application notes a difference between approximate monthly pricing and the more precise calculation based on the stated hourly rate. The more precise $20.16/month figure is used.

### G2 Scores

The application notes that G2 scores can vary depending on the comparison page and review pool.

## Testing

I tested the application by:

- Opening the generated HTML locally in a browser.
- Adjusting criteria weights.
- Checking that rankings update live.
- Opening sourced data for each provider.
- Reviewing the Sources & Citations panel.
- Reviewing the "How this was researched" panel.
- Capturing screenshots of the working application.

## Files

- `cloud-hosting-comparison.html` - Complete Verdict Engine application
- `sourced-data-report.md` - Sourced data and research methodology
- Screenshots - Proof of the working application

## Submission

The completed Day 48 folder contains the application, documentation, sourced data report, and screenshots.

The project was committed and pushed to GitHub as part of the Day 48 submission.

## Final Note

Cloud pricing and free-tier policies can change over time. Current provider pricing and terms should therefore be verified before making a purchasing decision.
