# Working Sessions

The PM plan: how the [roadmap](../ROADMAP.md) turns into working sessions with Molly. Each session has prep that Carlos + Claude finish beforehand, the decisions that belong to Molly, and what the session should produce.

**Ground rules**
- Prep produces *options*, not decisions. Anything about brand, voice, or which work to show is Molly's call.
- Molly drives Claude Code in the sessions. Carlos facilitates, keeps time, and records decisions.
- Every session ends by updating `ROADMAP.md` (checkboxes + Decisions Log) and this file (Notes).
- Plumbing (scaffolding, deploy config) is done in prep; the visible building is done live.

## Prep Tracker

| Prep item | For session | Status | Output |
|-----------|-------------|--------|--------|
| Clone repo, local branches | S1 | Done | `archive/squarespace`, `redesign` |
| Seed research | S1 | Done | `docs/research/prior-research.md` |
| Old site inventory | S1 | — | `docs/research/old-site-inventory.md` |
| Market research (verified, cited) | S1 | — | `docs/research/market.md` |
| Candidate content types | S1 | — | `docs/research/content-types.md` |
| Brand intake questionnaire | S1 / S2 | — | `docs/research/brand-intake.md` |
| Stack choice + skeleton scaffold | S2 | — | `redesign` branch |
| Content model (`status` field) | S2 | — | `redesign` branch |
| Interview question bank | S3 | — | `docs/research/interview-questions.md` |
| Deploy workflow (Actions) | S8 | — | `.github/workflows/` |

---

## S1 — Kickoff & Positioning
*Phases 0–1*

**Prep:** old site inventory · market research · candidate content types · brand intake questionnaire

**Agenda**
1. Walk through the plan and how the sessions will run (10 min)
2. Market research: what's changed, what reviewers look for (15 min)
3. Target audience and positioning: roles, seniority, company types, one-line pitch
4. Case study selection: new candidates first (Code.org work? this rebuild?), then any old product design projects worth returning from the inventory. Shortlist 3–4, all deep; flag confidentiality agreement constraints
5. Content types: react to the candidates, pick, assign one to each case study
6. Molly adds Carlos as a collaborator (Settings → Collaborators); push the branches
7. Hand off brand intake as homework if there's no time left

**Molly decides:** target audience · positioning · which case studies · which content types

**Done when:** 3–4 case studies, each mapped to a content type; positioning written down; branches on GitHub.

## S2 — Brand & Design System
*Phase 2*

**Prep:** completed brand intake (homework from S1) · stack chosen, skeleton scaffolded · content model in place

**Agenda**
1. Review brand intake answers and references
2. Design workflow: Figma first, or directly in code?
3. Build tokens: color, type, spacing
4. Core components (buttons, links, cards, image + caption, summary card)
5. `/styleguide` page
6. Record the design system in `CLAUDE.md`

**Molly decides:** everything visual

**Done when:** `/styleguide` renders the tokens and components; `CLAUDE.md` holds the design rules.

*May need two sessions.*

## S3–S6 — Case Study Content (one per case study)
*Phase 3; can start before S2 is done*

**Prep:** interview question bank for that case study's content type · pull the old copy/assets for it from the archive (if it existed before)

**Agenda**
1. Claude interviews Molly using the question bank. Record raw answers verbatim.
2. Claude drafts into the content-type outline
3. Molly edits for voice — the goal is details only she would know, not polish
4. List the images/artifacts still needed and who's getting them

**Molly decides:** what's true · what's under a confidentiality agreement · her voice

**Done when:** a Markdown draft Molly is happy with; asset list complete.

**Notes:** watch for generic phrasing and evenly sized sections; both read as AI-written (see `prior-research.md`).

## S7 — Case Study Templates
*Phase 4*

**Prep:** all case study drafts in Markdown · `status` field wired into the content model

**Agenda**
1. Build one template per content type against the real drafts
2. Check each case study in its template; adjust the template or copy
3. Verify `live` / `unlisted` / `draft` behavior

**Molly decides:** layout and presentation

**Done when:** every case study renders; status behavior verified.

## S8 — Site Pages
*Phase 5*

**Prep:** draft Home copy from the positioning (S1) for Molly to edit

**Agenda**
1. Home
2. Portfolio index (`/work`)
3. Contact: page or footer link?

**Done when:** every route renders with final copy.

## S9 — Polish & Launch
*Phase 6*

**Prep:** deploy workflow ready · responsive/accessibility/performance audit run ahead so the session is about fixes

**Agenda**
1. Fix audit findings
2. Share previews: check how case study links look on LinkedIn
3. Cutover: merge to `main`, switch Pages to GitHub Actions, verify the domain
4. Celebrate

**Done when:** new site live at mollyperedodesigns.com.

## S10 — Case Study Lifecycle (stretch)
*Phase 7*

**Agenda**
1. Write the `new-case-study` skill from what worked in S3–S6
2. Practice rotating a case study between `live` and `unlisted`, including on github.com in a browser

**Done when:** Molly adds or rotates a case study without help.

---

## Notes

### Pre-S1
- **2026-10-01:** Carlos's `gh` account has read-only access to `M-Peredo/M-Peredo.github.io`. Pushing needs either Molly's account or collaborator access. **Decided:** Molly adds Carlos as a collaborator.
- **2026-10-01:** Possible case study: this rebuild itself, built agentically with Claude Code. It would answer the research's "where AI fit" question directly.
