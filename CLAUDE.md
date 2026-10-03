# CLAUDE.md

Portfolio site for Molly Peredo (mollyperedodesigns.com). Molly is a product designer; she builds and edits this site with Claude Code. Carlos Peredo is PM and helps in working sessions.

**Status:** first-pass placeholder build. The design system and all copy/imagery are placeholders for Molly to react to and iterate on. All case study text is lorem ipsum.

## Stack
- Next.js (App Router), TypeScript strict, Tailwind v4 (CSS-based, `@theme` in `src/app/globals.css`)
- Static export (`output: "export"`), same setup as Carlos's own site
- Case studies are MDX files (`next-mdx-remote`), fonts are self-hosted via Fontsource
- Commands: `npm run dev` (http://localhost:3000), `npm run build` (static site in `out/`), `npm run lint`

## Branches and git
- `main` still serves the OLD Squarespace export at mollyperedodesigns.com. **Do not push to `main`** until launch.
- `archive/squarespace` is a frozen copy of the old site.
- All work happens on `redesign`. Deploy (GitHub Actions) is set up at launch, not before.
- Commit and push as the `PaleoDM` account (configured for this repo).
- This folder is in Dropbox. `node_modules`, `.next` and `out` are tagged so Dropbox doesn't sync them. If you recreate them, run the `dropbox-armor` skill.

## Design system
Everything lives in `src/app/globals.css` and `src/components/`. **The `/styleguide` page shows every token and component; keep it in sync when you change the system.**

- **Direction:** dark and neutral at rest (near-black base, grays). No brand color of its own.
- **Content-driven color:** each case study has one `color` in its front matter. The PAGE stays black. The color appears on the case study card, in its content boxes (callout, decision block, timeline cards, prototype frame, retrospective, via the `.tinted` class), in the hero backdrop, and as accents (rules, dots, quote mark) via `--cs-source`. Boxes use the color blended toward black ("Rich", 55%), with text white or near-black chosen by contrast. Logic is in `src/lib/color.ts`. Never use the raw source color for text (it can fail contrast); never hand-pick text colors inside a tinted box, use `--fg`, `--fg2`, `--bg`, `--rule`, `--btn`, `--btn-fg`, `--panel`.
- **Regions:** `.shell` is the whole page (neutral). `.tinted` is any content-colored block (card, pager link, content box); it turns the inherited `--cs-*` values into the working variables. Wrap new content-colored blocks in `.tinted`.
- **Type:** Fraunces (display and headings), Atkinson Hyperlegible Next (body), both placeholders until Molly decides. Use the `.display`, `.h1`, `.h2`, `.h3`, `.lede`, `.eyebrow` classes.
- **Font sizes: whole, even pixel values only. No half sizes, no odd numbers** (Molly's rule). Allowed: 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 80, 96. Write sizes in `px`, never as rem or em fractions, and never with `clamp()` or `vw` (fluid sizing produces odd pixel sizes). Big headings use the `--fs-*` variables, which step down at the 1024px and 640px breakpoints. Body text is 16px. Check any change by measuring rendered sizes, not by reading the CSS.
- **Spacing:** `--space-1` to `--space-10` (4px base). Reading column is `--measure` (66ch). Page max is 1160px.
- **Prose grid:** inside `.prose`, children sit in the reading column; add class `wide` to break out to full width.
- **Motion:** respects `prefers-reduced-motion`; keep any new animation under it.
- Placeholder visuals (`Shot`, `Stage`, `BrowserFrame`) are drawn in each case study's color. Replace with real screenshots when available.

## Components (`src/components/ui/`)
`Button`, `CaseStudyCard`, `SummaryBlock`, `Shot` (`Stage`, `BrowserFrame`), figures (`Screen`, `ShotPair`, `BeforeAfter`, `Annotated`, `PrototypeFrame`, `Figure`), content blocks (`PullQuote`, `Callout`, `Sticky`, `Decision`, `Timeline`, `CompareTable`, `ThreeUp`, `StatRow`, `Retrospective`, `Divider`, `Split`). All of the figure and content components can be used directly inside a case study `.mdx` file (see `src/components/ui/mdx.tsx`).

## Layout builder (dev only)
`npm run dev`, then open http://localhost:3000/builder. Molly drags blocks onto a live preview made from the real components, edits their text, sets the case study color, and saves layouts (kept in the browser). **Export** gives a real case study `.mdx` file. The page file is `src/app/builder/page.dev.tsx`; the `.dev.tsx` extension is only recognized by the dev server (see `next.config.ts`), so the builder is never in the production build. Code is in `src/builder/`: `registry.tsx` (every block: fields, preview, MDX output), `doc.ts` (document, presets, MDX export), `Builder.tsx` (the UI).
**When you add or change a component, add or update it in `src/builder/registry.tsx` too**, so the builder and the MDX components stay in step. To turn a builder export into a real case study: save the MDX in `content/case-studies/`, set `status`, and add its slug to `src/lib/variants.ts`.

## Case studies
One file each in `content/case-studies/<slug>.mdx`. Front matter: `title`, `status`, `order`, `color`, `dateline`, `hook`, `role`, `timeline`, `domain`, `tags`, `metrics` (three value/label pairs).

`status`:
- `live`: listed on the home page, has its own page
- `unlisted`: has its own page but is hidden from the home page and search engines (`noindex`). To show or hide a case study, change this one word.
- `draft`: not built

Content principles (from Phase 1 research, see `docs/case-study-guidance.md`): summary on top that works alone, no word ceiling, outcome first, show decisions and trade-offs, authentic voice, end with a retrospective. Molly writes the words; Claude helps her brainstorm copy and visuals.

New case studies need an entry in `src/lib/variants.ts` for their placeholder thumbnail (until real images exist).

## Accessibility
Skip link, visible focus on everything, text contrast checked automatically for tinted regions (see `/styleguide`), semantic headings, alt text on real images (placeholders are labeled). New components must meet the same bar.

## Docs
`ROADMAP.md` (what's decided and what's next), `docs/` (research and earlier planning; `docs/sessions.md` is superseded).
