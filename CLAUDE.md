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
- **Content-driven color:** each case study has one `color` in its front matter. The PAGE stays black. The color appears on the frame around each card's image (the cards themselves match the site theme), in small accents only (the chosen option's border in the decision block, timeline dots and line, retrospective bullet dashes, the pull quote's rules and mark, the insight card's side line); only the embedded prototype frame is still a tinted box (via the `.tinted` class), in the hero backdrop, and as accents (rules, dots, quote mark) via `--cs-source`. Boxes use the color blended toward black ("Rich", 55%), with text white or near-black chosen by contrast. Logic is in `src/lib/color.ts`. Never use the raw source color for text (it can fail contrast); never hand-pick text colors inside a tinted box, use `--fg`, `--fg2`, `--bg`, `--rule`, `--btn`, `--btn-fg`, `--panel`.
- **Regions:** `.shell` is the whole page (neutral). `.tinted` is any content-colored block (content boxes; cards and pager links are neutral); it turns the inherited `--cs-*` values into the working variables. Wrap new content-colored blocks in `.tinted`.
- **Type (decided):** headings and numbers are **Zen Kaku Gothic Antique, bold (700)**; body text is **Zen Kaku Gothic New, medium (500), 16px, line height 1.7, tracking +0.02em** (set on `body`). Headings use +0.005em tracking. Fonts are self-hosted (Latin subset, via Fontsource) and only these weights exist: Antique 500 and 700, New 400, 500 and 700, so use those weights only, never 600. Zen has no italic, so never use italics (no faux slanting). Use the `.display`, `.h1`, `.h2`, `.h3`, `.lede`, `.eyebrow` classes.
- **Font sizes: whole, even pixel values at the default setting. No half sizes, no odd numbers** (Molly's rule). Allowed: 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 80, 96. **Write them in `rem`** (px divided by 16: 18px is `1.125rem`, 12px is `0.75rem`) so they respect a visitor's browser text-size setting, and never use the `62.5%` root hack. Never use `clamp()`, `vw` or em fractions for font size (they produce odd pixel sizes). Big headings use the `--fs-*` variables, which step down at the 1024px and 640px breakpoints. Hairline borders, shadows and icon sizes stay in px; letter-spacing is in em. Check any change by measuring rendered sizes at the default root size, not by reading the CSS.
- **Spacing:** `--space-1` to `--space-10` (4px base). Reading column is `--measure` (66ch). Page max is 1160px.
- **One content width:** inside a case study (`.prose`), text, figures and boxes all share one column width (the full page width, 1064px at desktop). There is no narrower reading column. Corner radii are small: `--radius-sm` 4px, `--radius` 8px, `--radius-lg` 12px.
- **Motion:** respects `prefers-reduced-motion`; keep any new animation under it.
- Placeholder visuals (`Shot`, `Stage`, `BrowserFrame`) are drawn in each case study's color. Replace with real screenshots when available.

## Block styles (decided)
- **Pull quote:** a centered statement set off by colored rules, with an opening quote mark centered on the top rule (in the case study color). There is no closing mark. No other pull quote styles exist.
- **Insight card (`Callout`):** no box, just a 3px line down the left side in the case study color, with a small label above the text. No other styles exist.

- **Numbers (summary stats and the in-article Numbers row):** both are identical neutral cards (panel background, thin border, 12px radius, 40px medium-weight number, 14px caption). Keep them matching.
- **Case study summary:** headline, hook and action buttons on the left; optional `facts` on the right as a plain list with thin dividers (no box); the headline numbers underneath as three equal neutral cards. With no facts, the layout is a single column. Facts should be specific to the project, not generic: for example Scope (what she owned, e.g. "Sole designer, end to end"), Team (who she worked with) and Timeline. Do not add Domain (K-12 ed tech is already the site's headline) or a generic job title. The headline must visually lead: numbers are 40px (36px on phones) at medium weight, never the same size as the headline.

## Components (`src/components/ui/`)
`Button`, `CaseStudyCard`, `SummaryBlock`, `Shot` (`Stage`, `BrowserFrame`), figures (`Screen`, `ShotPair`, `BeforeAfter`, `Annotated`, `PrototypeFrame`, `Figure`), content blocks (`PullQuote`, `Callout`, `Sticky`, `Decision`, `Timeline`, `CompareTable`, `ThreeUp`, `StatRow`, `Retrospective`, `Divider`, `Split`). All of the figure and content components can be used directly inside a case study `.mdx` file (see `src/components/ui/mdx.tsx`).

## Layout builder (dev only)
`npm run dev`, then open http://localhost:3000/builder. Molly drags blocks onto a live preview made from the real components, edits their text, sets the case study color, and saves layouts (kept in the browser). **Export** gives a real case study `.mdx` file. The page file is `src/app/builder/page.dev.tsx`; the `.dev.tsx` extension is only recognized by the dev server (see `next.config.ts`), so the builder is never in the production build. Code is in `src/builder/`: `registry.tsx` (every block: fields, preview, MDX output), `doc.ts` (document, presets, MDX export), `Builder.tsx` (the UI).
**When you add or change a component, add or update it in `src/builder/registry.tsx` too**, so the builder and the MDX components stay in step. To turn a builder export into a real case study: save the MDX in `content/case-studies/`, set `status`, and add its slug to `src/lib/variants.ts`.

## Case studies
One file each in `content/case-studies/<slug>.mdx`. Front matter: `title`, `status`, `order`, `color`, `dateline`, `hook`, `tags`, `metrics` (three value/label pairs), and optional `facts` (a short list of label/value pairs shown beside the headline).

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
