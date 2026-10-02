# Development Roadmap

Ground-up rebuild of **mollyperedodesigns.com**, replacing the Squarespace export currently served from `main`.

- **Owner / designer:** Molly Peredo — drives the build with Claude Code (agentic development)
- **PM:** Carlos Peredo — runs prep work between sessions and facilitates working sessions
- **Started:** 2026-10-01
- **Session plan:** see [docs/sessions.md](docs/sessions.md)

## Scope

A deliberately small site:

| Route | Content |
|-------|---------|
| `/` | Home — intro, positioning, featured case studies (absorbs the old About page) |
| `/work` | Portfolio index — live case studies only |
| `/work/<slug>` | Individual case studies (3–4 live at launch) |
| `/contact` | Optional, light |

Everything on the current site is retired: archived on its own branch, not migrated. All case studies come from Molly's newer work.

Every case study is a deep, robust one. There's no short-format or "selected earlier work" section.

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Live site. Keeps serving the old Squarespace export until launch — **do not clear it early**, it's what mollyperedodesigns.com serves. |
| `archive/squarespace` | Frozen snapshot of the old site. |
| `redesign` | All new work happens here. Merged to `main` at launch (Phase 6). |

Legacy remote branches `Staging` (identical to `main`) and `prelim-test` (an earlier upload) are covered by the archive and can be deleted in Phase 0.

## Legend

- **(prep)** — groundwork done by Carlos + Claude ahead of sessions
- **(session)** — done with Molly in a working session; her decisions

---

## Phase 0: Setup & Archive
- [x] (prep) Clone repo locally, create `archive/squarespace` and `redesign` branches
- [ ] (session) Molly adds Carlos (`CarlosPeredo_vvt`) as a collaborator with write access
- [ ] (prep) Push `archive/squarespace` and `redesign` to GitHub (once collaborator access is in place)
- [ ] (session) Delete legacy `Staging` and `prelim-test` branches
- [ ] (prep) Exclude build/dependency folders from Dropbox sync once the stack is installed

**Success**: `archive/squarespace` exists on GitHub with the full old site; `redesign` exists; the live site is unaffected.

## Phase 1: Discovery & Positioning
- [x] (prep) Seed research carried over from an earlier chat → `docs/research/prior-research.md`
- [ ] (prep) Market research: how product design hiring and portfolio expectations have changed since ~2022, verifying and citing the seed → `docs/research/market.md`
- [ ] (prep) Draft 2–4 candidate case study **content types** — all deep case studies, varying by kind of project; section outlines with the purpose of each section → `docs/research/content-types.md`
- [ ] (prep) Brand direction intake questionnaire → `docs/research/brand-intake.md`
- [ ] (session) Target audience: roles, seniority, company types
- [ ] (session) Positioning statement / one-line pitch
- [ ] (session) Select 3–4 case studies (flag any confidentiality agreement constraints, e.g. Code.org work)
- [ ] (session) Pick content types and assign each case study one
- [ ] (session) Complete brand intake

**Success**: Case studies selected and each mapped to an agreed content-type outline; positioning and brand inputs written down in `docs/`.

## Phase 2: Brand & Design System
- [ ] (prep) Pick the stack and scaffold the skeleton project on `redesign` (leaning Astro — see Open Decisions)
- [ ] (prep) Content model: each case study is one Markdown file with a `status` field (`live` / `unlisted` / `draft`)
- [ ] (session) Colors, type, spacing, and a small set of components
- [ ] (session) Unlisted `/styleguide` page showing every token and component
- [ ] (session) Record the design system in `CLAUDE.md` so every later session follows it

**Success**: Design tokens defined in code; `/styleguide` renders them; `CLAUDE.md` holds the design rules.

## Phase 3: Case Study Content
- [ ] (prep) Interview question bank per content type → `docs/research/interview-questions.md`
- [ ] (session) One session per case study: Claude interviews Molly → drafts → she edits
- [ ] (session) Gather and prepare images for each case study from her source files

**Success**: Final copy and assets for all 3–4 case studies, in Markdown, written in Molly's voice.

*Can run alongside Phase 2.*

## Phase 4: Case Study Templates
- [ ] (session) Build one template per content type, using the real copy from Phase 3 (no placeholder text)
- [ ] (session) Wire the `status` field: `live` appears on the index; `unlisted` builds at its URL but is hidden from the index and search engines; `draft` isn't built

**Success**: All case studies render in their templates; status behavior verified for all three values.

## Phase 5: Site Pages
- [ ] (session) Home page
- [ ] (session) Portfolio index (`/work`)
- [ ] (session) Contact page — decide whether it's needed or whether a footer link is enough

**Success**: All routes in the Scope table render with final copy.

## Phase 6: Polish & Launch
- [ ] Responsive pass (mobile, tablet, desktop)
- [ ] Accessibility audit (alt text, keyboard nav, contrast, reduced motion)
- [ ] Performance pass (image compression, lazy loading)
- [ ] SEO + share previews (title, description, Open Graph image per case study)
- [ ] GitHub Actions deploy workflow
- [ ] Cutover: merge `redesign` → `main`, switch Pages source from "branch" to "GitHub Actions"
- [ ] Verify mollyperedodesigns.com serves the new site over HTTPS

**Success**: New site live at mollyperedodesigns.com; old site recoverable from `archive/squarespace`.

## Phase 7: Case Study Lifecycle (stretch)
- [ ] `new-case-study` skill — codifies the Phase 3 interview → draft → template flow
- [ ] Rotation guide: how to flip a case study between `live` and `unlisted` (including from github.com in a browser)
- [ ] Optional: a "rotate" command for picking which case studies are live before an interview

**Success**: Molly can add a new case study, or change which ones are live, without help.

---

## Open Decisions

| Decision | Options | Lean | Decide by |
|----------|---------|------|-----------|
| Stack | Astro · Next.js static export (matches Carlos's site) · plain HTML/CSS | Astro — built around Markdown files with validated fields | Phase 2 prep |
| Design workflow | Figma first, then code · design directly in code with Claude | Molly's call | Phase 2 session |
| Contact page | Dedicated page · footer link only | — | Phase 5 |

## Decisions Log

| Date | Decision |
|------|----------|
| 2026-10-01 | Small site: Home, portfolio + case studies, optional Contact |
| 2026-10-01 | 3–4 case studies at launch |
| 2026-10-01 | Build on `redesign`; `main` stays live until cutover |
| 2026-10-01 | Carlos gets collaborator access to the repo so prep work can be pushed between sessions |
| 2026-10-01 | All case studies are deep and robust, with no "earlier work" section |
| 2026-10-01 | All old site content is retired; case studies come from her newer work only |
