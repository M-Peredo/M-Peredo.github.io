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
- Design system: black neutral page, content-driven color per case study (cards, content boxes, accents), type scale (whole even px, written in rem), spacing scale, buttons, cards, summary block, figures and frames, and 11 content blocks. Type is decided and applied: Zen Kaku Gothic Antique headings, Zen Kaku Gothic New body.
- `/styleguide` page documenting all of it
- Home page and three case study templates (multi-year program, end-to-end project, shipped-then-ongoing)
- Case study status (`live` / `unlisted` / `draft`) working
- Dev-only **layout builder** (`npm run dev`, then `/builder`): Molly drags blocks into a live preview, edits copy, saves layouts, and exports a real case study MDX file. Not part of the production build.

**Next: iterate with Molly**
- [ ] Review the placeholder site together; note what she likes, hates, wants different
- [x] Type: decided and applied to the site (see the Decisions Log).
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
| 2026-10-02 | Color direction: the page stays **black**. Each case study has one source color, used (blended toward black, "Rich" 55%) for the frame around its image on its card, its content boxes (callout, decision, timeline cards, prototype frame, retrospective) and as accents. Text color is chosen automatically for contrast. The site has no brand color of its own. Red was dropped as a primary because it clashed with Code.org's colorful content. Source color is hand-set per case study. |
| 2026-10-02 | Type: body font must be a sans-serif (a serif body is "too hard to reach"). Molly's ratings of her six pairings: Urbanist + Open Sans 5/5 ("increase the tracking on the headline font a bit"); Zen Kaku Gothic Antique + New 4/5 ("body font is a little hard to read at small sizes"); Rubik + Karla 3/5 ("headline might be too bold, drawing too much attention"); Voltaire + Inter 2/5 ("tracking on the numbers is too large; body very readable, but the headline font isn't giving the feel"); Ovo + Mulish 2/5 ("headline fonts work better at larger sizes, numbers are not balanced"); Zain + Nunito 1/5 ("too childish, and the downstrokes on the lowercase l make it difficult to read"). Themes: restrained headline weight, balanced numbers, strong small-size readability. Next round builds variations of the top two. |
| 2026-10-02 | Type: headline font is **Zen Kaku Gothic Antique** (chosen over Urbanist, body held at Open Sans). Molly: "a nice balance between approachable and professional. Side by side Urbanist is a little too casual." Open: body font, then weight and tracking. |
| 2026-10-02 | **Font sizes are whole, even pixel values only**, never half sizes or odd numbers: 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 80, 96. Body text is 16px. Big headings step down at breakpoints (no fluid sizing). Applied across the whole site and checked by measuring rendered sizes. |
| 2026-10-02 | Stack: Next.js static export (matches Carlos's own site), MDX case studies, Tailwind v4. All repo work is done as the PaleoDM account on `redesign`; `main` keeps serving the old site until launch. |
| 2026-10-02 | A dev-only layout builder exists for Molly to experiment with layouts and export a case study draft as MDX. |
| 2026-10-02 | Working style with Molly: one decision at a time (too many options causes decision paralysis). Her results come back as a saved file in Downloads (or she types them). |
| 2026-10-03 | **Type decided and applied.** Headings and numbers: Zen Kaku Gothic Antique bold (700), +0.005em tracking. Body: **Zen Kaku Gothic New**, medium (500), 16px, line height 1.7, **+0.02em tracking** (Molly chose it over Open Sans and Inter, and asked for the tracking to be opened up). Body must be a sans-serif. No italics (Zen has none). Weights available: Antique 500/700, New 400/500/700. |
| 2026-10-03 | **Font sizes are written in rem** (px / 16) so they respect a visitor's browser text-size setting. The whole-even-pixel rule still holds at the default setting, and was verified by measuring rendered sizes and by confirming sizes scale with the root setting. Replaces the earlier px-only implementation. |
| 2026-10-03 | Visual refinements after Molly's first look: corners backed off (4 / 8 / 12px); every element of a case study shares one content width; cards on the home page and the previous/next links match the site theme, and **only the frame around the image carries the case study color**. She likes the About and Contact sections on the home page and the motion (smooth scrolling and card hover lift; there are no scroll-triggered effects). |
| 2026-10-03 | Molly's feedback: there is probably too much color on case study pages (to tune as we go). Page header sections (title, lede, metadata, section heads) now use the full content width like everything else. Pull quotes and insight cards have four style options each (see the style guide), pending her pick. The "animations" she likes are the smooth auto-scroll when clicking the home page nav links. |
| 2026-10-03 | Pull quote: the centered **statement** style, with an opening quote mark (only, no closing mark) centered on its top rule. Insight card: the **side marker** style (no box, a colored line down the side). The other options were removed. |
| 2026-10-03 | Less color on case study pages: the decision block, timeline cards and retrospective are now neutral panels. The case study color remains only as small accents (chosen option border, timeline dots and line, bullet dashes, pull quote rules and mark, insight card side line) plus the frame around images and the prototype frame. |
| 2026-10-03 | **Case study summary layout decided:** headline, hook and buttons on the left; Role/Timeline/Domain as a plain divided list on the right (no box); the headline numbers underneath in three equal columns, deliberately smaller (40px) and lighter (medium weight) than the 56px headline under a thin neutral rule, so the headline leads. Molly chose this "side facts" option over three others, then asked for it to be calmer. Stat numbers never wrap. |
| 2026-10-03 | Summary facts are now **optional and per case study** (replacing the fixed Role / Timeline / Domain). Domain is dropped (K-12 ed tech is already the site's headline) and a generic job title says nothing; useful facts are project-specific, such as Scope (what she owned), Team and Timeline, based on the research that reviewers want specific ownership, not titles. A case study with no facts gets a single-column summary. |
| 2026-10-03 | The three summary stats sit inside neutral cards (matching the home page cards), replacing the divider line above them. |
| 2026-10-03 | The in-article Numbers row now matches the summary stats exactly (identical neutral cards). Four annotated-screenshot styles (notes beside, notes below as cards, notes on the screen, highlight boxes) are in the style guide and the builder, pending Molly's pick. |
| 2026-10-03 | Annotated screenshot layout: **notes beside** the screenshot (other layouts removed). The numbered circle markers don't match the rest of the site (circles appear nowhere else), so three alternatives (square, flag, underline) are in the style guide pending Molly's pick. |
| 2026-10-03 | Annotated screenshot markers: the **flag** style (a small zero-padded label such as "01" with a colored left edge; notes carry the same colored edge). No circles. Other marker styles removed. |
| 2026-10-03 | **Annotation note decided (for now; may revisit):** a neutral card with a small tag filled in the case study color at its top-left, then plain full-contrast text. Molly rejected the tilted dashed panel, tab, footnote, highlighter, underline, and the margin/panel/rule styles first. The tag text color is chosen automatically (white or near-black; pure black or white as a fallback) and was verified across 140,608 colors, all at least 4.5:1. The edge and split card layouts were removed (see git history). |
| 2026-10-03 | Consistency pass on components: card padding was seven different values (12 to 72px); it is now one system (24px padding, 16px nested, 16px between cards, 12px corners, 1px neutral borders). Label tracking unified at 0.14em, pill-shaped tags and badges became 4px rectangles, card titles standardized (24px for the decision question, 20px for inner headings). Verified by measuring every card as rendered. |

- 2026-10-03 Prototype frame: neutral card (no tint), small colored "Prototype" tag, click-to-load iframe scaled to fit from native 1280x800, "Open full screen" link, hidden on phones (link only). Prototypes live in `public/prototypes/<name>/` with relative links between files. Sample at `public/prototypes/sample/`.
