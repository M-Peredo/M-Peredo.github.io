# Design System Checklist

Everything the Phase 2 design system needs to cover, plus research on *The Night Circus*, the brand direction Molly is exploring. Nothing here is decided. The theme notes are raw material, and the decisions are Molly's in S2.

*Prepared 2026-10-02.*

## The Night Circus: what the book gives a design system

### Palette
- The circus is deliberately colorless: black and white striped tents, "no golds and crimsons to be seen," a grey sky, and a wrought-iron fence ([GradeSaver](https://www.gradesaver.com/the-night-circus/study-guide/imagery)).
- The only color is the fans', the rêveurs: black with **one hint of red**, usually a scarf ([Barnes & Noble](https://www.barnesandnoble.com/w/the-night-circus-erin-morgenstern/1100083576)).
- Light is small, warm points against dark: tents glowing "as though covered in fireflies," candles on the Wishing Tree, a bonfire at the center.
- The overall aesthetic is **restraint**, which suits a portfolio frame where the work has to stand out.

### Time
- The sign: black, with white painted letters, "Opens at Nightfall, Closes at Dawn."
- The centerpiece clock's face moves through the night from white to grey to black with stars, while its carved body unfolds ([Thiessen clock](https://thenightcircus.fandom.com/wiki/Herr_Friedrick_Thiessen)).
- Light and dark modes could carry this as a story, not just a settings toggle.

### Structure
- Every chapter opens with a **place and date** ("London, December 1884"), because the timeline jumps around ([Wikipedia](https://en.wikipedia.org/wiki/The_Night_Circus)). That maps onto the case study summary block: a dateline giving organization and timeframe, with role and domain under it. Fans will notice it, and it serves every other reader regardless.
- **Tents:** each is a self-contained world (Ice Garden, Wishing Tree, Cloud Maze, Labyrinth) inside a shared striped frame. Case studies can work the same way: one consistent frame, each with its own character through its images, not its own colors.

### Period and texture
- Set 1873–1902: sign painting, playbill type, clockwork, carved wood, a silver pendulum, paper books whose pages turn.
- Good raw material for a display typeface and small ornaments. Used heavily, they turn into kitsch.

### Contrast check: red on each background

A red that reads as a scarf fails text contrast on black, but passes on off-white.

| Red | On black | On near-black #121212 | On off-white #F5F2EB |
|---|---|---|---|
| Crimson #B3001B | 2.9 ✗ | 2.6 ✗ | **6.4 ✓** |
| Scarlet #D0021B | 3.7 (UI only) | 3.3 (UI only) | **5.1 ✓** |
| Bright red #E5383B | **5.0 ✓** | 4.4 ✗ | 3.8 ✗ |
| Light red #FF6B6B | **7.6 ✓** | **6.8 ✓** | 2.5 ✗ |

✓ passes 4.5:1, the standard for body text. "UI only" passes 3:1, the standard for buttons, icons and other non-text elements.

- **Dark theme:** the true scarf red works for buttons, rules and accents. Text links need a lighter, pinker red.
- **Light theme:** the deep red works everywhere. This is a real input to the light-or-dark decision.

### Guardrails
- Don't use the book's title or quote it on the site.
- Keep the theme subtle enough that a reviewer in their first 10 seconds sees *her work*, not a fan site.
- Anything animated (fireflies, a turning clock) needs a version for people who've turned off motion in their system settings.

---

## Checklist

### Decisions for Molly to make first
- [ ] Light, dark, or both (with day/night as the story)?
- [ ] How literal is the theme, from subtle reference to immersive?
- [ ] Warm greys (paper, smoke) or cool greys (iron, ice)?
- [ ] One red, or a small family of reds?
- [ ] Are stripes a motif, and if so, where are they allowed?
- [ ] Type direction: a period display face with a modern body face, or something else?
- [ ] Wordmark or monogram?

### Foundations
- [ ] **Color:** grey scale from black to white; the red accent plus text-safe versions for each background; surface levels; borders and dividers; backdrop behind screenshots; focus ring; error color (only if there's a contact form)
- [ ] **Typography:** display, body, and possibly a small utility face for labels and datelines; type scale; line heights; reading width (about 65 characters per line); weights; heading styles H1–H4
- [ ] **Text styles:** small label above headings, caption, pull quote, metric numbers (with digits that line up), inline links
- [ ] **Spacing scale** and **layout grid**
- [ ] **Breakpoints** (phone, tablet, desktop) and **content widths**: a narrow column for reading, full width for images
- [ ] **Shape:** corner radius (probably square, to suit the period), border weights, shadows (or a decision to use none)
- [ ] **Ornament rules:** dividers, flourishes and stripes, and where each is allowed
- [ ] **Icons:** a small set (arrow, external link, menu, close, play) or none
- [ ] **Motion:** timings, easing, what animates, and the reduced-motion version

### Interaction states (every clickable element)
- [ ] Default · hover · keyboard focus · pressed · disabled
- [ ] Visited links and the current page in the navigation
- [ ] Nothing that depends on hover alone, since phones have no hover

### Components
- [ ] **Buttons:** primary, secondary, text-only; sizes; with and without an icon
- [ ] **Links:** inline, standalone "read more →", external
- [ ] **Navigation:** header, mobile menu, current-page indicator, a "skip to content" link for keyboard users
- [ ] **Footer**
- [ ] **Case study card:** standard and featured versions, for Home and the portfolio page
- [ ] **Case study summary block:** dateline, one-line hook, role, timeline, domain, headline outcomes. The most important component.
- [ ] **Metric callout**
- [ ] **Section heading** (written to say what was found, not a generic "Research")
- [ ] **Images:** image with caption, full-width image, side-by-side pair, annotated screenshot, before/after comparison
- [ ] **Pull quote:** for a teacher or stakeholder voice
- [ ] **Decision block:** options considered, what she chose, why
- [ ] **Aside or callout box**
- [ ] **Video walkthrough player** with its cover image (if video is in)
- [ ] **Tags** (domain, platform)
- [ ] **Next / previous case study** links
- [ ] **Section jump links** for long case studies (optional)
- [ ] **Contact block**, plus form fields and error messages if there's a form
- [ ] **Resume download** link
- [ ] **404 page**

### Accessibility standards
- [ ] Contrast: 4.5:1 for body text, 3:1 for large text and non-text elements, checked on every background
- [ ] A focus ring that's visible on both light and dark backgrounds
- [ ] Color never the only signal for anything
- [ ] Minimum body text size; zooming the page doesn't break the layout
- [ ] Alt text rules, especially for annotated screenshots

### Site identity
- [ ] Wordmark or monogram
- [ ] Favicon
- [ ] Template for the preview image shown when a page is shared on LinkedIn and elsewhere
- [ ] Page title pattern (name + role, so AI screening tools read it correctly)

### Documentation
- [ ] An unlisted `/styleguide` page showing every token, component and state
- [ ] Naming rules for the tokens
- [ ] Design rules plus a "forbidden" list in `CLAUDE.md`, so every later session stays on-theme
