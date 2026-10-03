# Development Roadmap

Ground-up rebuild of **mollyperedodesigns.com**, replacing the Squarespace export currently served from `main`.

- **Owner / designer:** Molly Peredo — drives the build with Claude Code (agentic development)
- **PM:** Carlos Peredo — runs prep work between sessions and facilitates working sessions
- **Started:** 2026-10-01
- **How we work:** iterate on a real, running site. See below.

## Scope

A deliberately small site:

| Route | Content |
|-------|---------|
| `/` | Home — intro, positioning, featured case studies (absorbs the old About page) |
| `/work` | Portfolio index — live case studies only |
| `/work/<slug>` | Individual case studies (3–5 live at launch) |
| `/styleguide` | Unlisted. Every token and component in one place. |
| `/contact` | Optional, light |

Everything on the current site is retired: archived on its own branch, not migrated. All case studies come from Molly's newer work.

Every case study is a deep, robust one. There's no short-format or "selected earlier work" section.

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Live site. Keeps serving the old Squarespace export until launch — **do not clear it early**, it's what mollyperedodesigns.com serves. |
| `archive/squarespace` | Frozen snapshot of the old site. |
| `redesign` | All new work happens here. Merged to `main` at launch. |

Legacy remote branches `Staging` (identical to `main`) and `prelim-test` (an earlier upload) were deleted in Phase 0 (2026-10-02).

## Where things stand (2026-10-02)

We stopped working in phases. Molly responds better to something real and tangible than to planning documents, so we built a first-pass **placeholder site** to iterate on: a design system, a home page, and three lorem ipsum case studies that show a wide range of design elements.

**Built (on `redesign`)**
- Next.js static site (see [CLAUDE.md](CLAUDE.md) for the stack, rules and design system)
- Design system: dark neutral base, content-driven color per case study, Fraunces + Atkinson type, spacing scale, buttons, cards, summary block, figures and frames, and 10+ content blocks
- `/styleguide` page documenting all of it
- Home page and three case study templates (multi-year program, end-to-end project, shipped-then-ongoing)
- Case study status (`live` / `unlisted` / `draft`) working

**Next: iterate with Molly**
- [ ] Review the placeholder site together; note what she likes, hates, wants different
- [ ] Choose real type, and confirm or change the content-driven color approach
- [ ] Replace placeholder visuals with real screenshots and prototypes
- [ ] Write real copy, one case study at a time (Molly writes; Claude helps brainstorm copy and visuals). See [docs/case-study-guidance.md](docs/case-study-guidance.md).
- [ ] Decide which 3 to 5 case studies are live
- [ ] Positioning and home page copy
- [ ] Contact: keep the section on the home page or add a page

**Before launch**
- [ ] Responsive, accessibility and performance pass
- [ ] Share previews (Open Graph image per page), page titles and descriptions
- [ ] GitHub Actions deploy workflow
- [ ] Cutover: merge `redesign` into `main`, switch Pages source to GitHub Actions, check mollyperedodesigns.com over HTTPS

**Later (stretch)**
- [ ] A `new-case-study` skill for adding a case study from a new project
- [ ] An easy way to rotate which case studies are live before an interview (today: change `status` in the file, including on github.com)

## Open Decisions

| Decision | Options | Lean | Notes |
|----------|---------|------|-------|
| Type | Headline font decided: Zen Kaku Gothic Antique. Body font next (Open Sans, Inter or Zen Kaku Gothic New), then weight and tracking | Molly's call | One question at a time in `docs/design/type-round-1.html` |
| Content color source | Hand-set per case study (today) · pulled from the screenshot automatically | Hand-set | Safer and tunable |
| Site accent | None (today) · one accent for links and focus | | |
| Contact | Section on home (today) · separate page | | |

## Decisions Log

| Date | Decision |
|------|----------|
| 2026-10-01 | Small site: Home, portfolio + case studies, optional Contact |
| 2026-10-01 | ~~3–4 case studies at launch~~ — superseded 2026-10-02 |
| 2026-10-01 | Build on `redesign`; `main` stays live until cutover |
| 2026-10-01 | Market research and content types are done with Molly, tailored to her, not in prep |
| 2026-10-01 | Carlos gets collaborator access to the repo so prep work can be pushed between sessions |
| 2026-10-01 | All case studies are deep and robust, with no "earlier work" section |
| 2026-10-01 | All old site content is retired; case studies come from her newer work only |
| 2026-10-02 | 3–5 case studies, three minimum; selected during Phase 3 as they're written |
| 2026-10-02 | Research decisions locked in `docs/case-study-guidance.md`, including: no word ceiling, outcome first, AI both ways, K-12 specialist, prototypes embedded in the page |
| 2026-10-02 | Content types are section suggestions (every case study has a summary and a retrospective, plus a menu to pick from), not fixed templates |
| 2026-10-02 | Molly writes her own copy; in Phase 3 Claude helps her brainstorm copy and visuals |
| 2026-10-02 | Positioning is a placeholder until Molly is ready |
| 2026-10-02 | Brand intake questionnaire retired; the design system checklist covers it |
| 2026-10-02 | Stopped working in phases. Built a placeholder site (Next.js static export) to iterate on instead. Phases and sessions docs are kept for reference. |
| 2026-10-02 | Color direction (concept, specifics still open): dark mode with a neutral black/gray base; each case study card and page takes its background color from its own screenshot ("Rich" tint). Red dropped as the primary because it clashed with Code.org's content. |
| 2026-10-02 | Type: body font must be a sans-serif (a serif body is "too hard to reach"). Molly's ratings of her six pairings: Urbanist + Open Sans 5/5 ("increase the tracking on the headline font a bit"); Zen Kaku Gothic Antique + New 4/5 ("body font is a little hard to read at small sizes"); Rubik + Karla 3/5 ("headline might be too bold, drawing too much attention"); Voltaire + Inter 2/5 ("tracking on the numbers is too large; body very readable, but the headline font isn't giving the feel"); Ovo + Mulish 2/5 ("headline fonts work better at larger sizes, numbers are not balanced"); Zain + Nunito 1/5 ("too childish, and the downstrokes on the lowercase l make it difficult to read"). Themes: restrained headline weight, balanced numbers, strong small-size readability. Next round builds variations of the top two. |
| 2026-10-02 | Type: headline font is **Zen Kaku Gothic Antique** (chosen over Urbanist, body held at Open Sans). Molly: "a nice balance between approachable and professional. Side by side Urbanist is a little too casual." Open: body font, then weight and tracking. |
