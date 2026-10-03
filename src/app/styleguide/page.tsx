import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { BrowserFrame, Stage } from "@/components/ui/Shot";
import { Annotated, BeforeAfter, PrototypeFrame, ShotPair } from "@/components/ui/figures";
import { Split } from "@/components/ui/Split";
import { Callout, CompareTable, Decision, PullQuote, Retrospective, StatRow, Sticky, ThreeUp, Timeline } from "@/components/ui/content";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { SummaryBlock } from "@/components/ui/SummaryBlock";
import { contentColors, contentStyle, contrast, TINT } from "@/lib/color";
import { getLiveCaseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Style guide",
  robots: { index: false, follow: false },
};

const NEUTRALS = [
  ["base", "#0B0B0C", "page background"],
  ["surface", "#17171A", "raised areas"],
  ["raised", "#212125", "hover, inputs"],
  ["line", "#2B2B30", "borders, rules"],
  ["muted", "#A4A4AB", "secondary text"],
  ["ink", "#F2F2F3", "primary text"],
];

const SOURCES = [["Indigo", "#4A44C6"], ["Teal", "#0FA3B1"], ["Magenta", "#C2338F"], ["Green", "#3E9B4F"], ["Orange", "#E8603C"], ["Yellow", "#F2C230"]];
const TINTS: [string, number][] = [["Deep", 0.3], ["Rich", TINT], ["Full", 1]];
const SPACE = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128];

function Section({ id, title, lede, children }: { id: string; title: string; lede?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="sg-section" aria-labelledby={`${id}-t`}>
      <header>
        <h2 id={`${id}-t`} className="h2">{title}</h2>
        {lede && <p className="muted">{lede}</p>}
      </header>
      {children}
    </section>
  );
}

function Region({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div className="sg-demo" style={contentStyle(color)}>
      {children}
    </div>
  );
}

export default function StyleGuide() {
  const studies = getLiveCaseStudies();
  return (
    <PageShell>
      <div className="container sg">
        <section className="hero" style={{ paddingBottom: 0 }}>
          <span className="eyebrow">Design system · first pass</span>
          <h1 className="display">Style guide</h1>
          <p className="lede">Every token and component on this site, on one page. Dark and neutral at rest; each case study takes its color from its own content. All copy and imagery is placeholder.</p>
        </section>

        <Section id="color" title="Color" lede="A neutral black and gray base. No brand color of its own: the color comes from the work.">
          <div className="sg-grid">
            {NEUTRALS.map(([name, hex, use]) => (
              <div key={name} className="sg-swatch">
                <div className="sg-chip" style={{ background: hex }} />
                <strong>{name}</strong>
                <span className="sg-code">{hex}</span>
                <span className="muted small">{use}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section id="content-color" title="Content-driven color" lede="Each case study has one source color. Its card, its content boxes (callouts, decision blocks, timeline, retrospective) and its accents use that color, and the page itself stays black. Boxes use the color blended toward black; the default is Rich (55% color). Text switches between white and near-black to stay readable. Ratios below are text against background; 4.5 is the minimum for body text.">
          <div className="sg-tints">
            {SOURCES.flatMap(([name, hex]) => TINTS.map(([label, t]) => {
              const c = contentColors(hex, t);
              return (
                <div key={name + label} className="sg-tint" style={{ background: c.bg, color: c.fg }}>
                  <span className="eyebrow" style={{ color: c.fg2 }}>{name} · {label}</span>
                  <b>Lorem ipsum</b>
                  <span className="sg-code" style={{ color: c.fg2 }}>{c.bg} · {contrast(c.fg, c.bg).toFixed(1)}:1</span>
                </div>
              );
            }))}
          </div>
        </Section>

        <Section id="type" title="Typography" lede="Zen Kaku Gothic Antique (bold) for headings and numbers, Zen Kaku Gothic New (medium, +0.02em tracking) for everything you read. Sizes are written in rem and are whole, even pixel values at the default browser setting.">
          <div className="sg-type">
            <div><span className="eyebrow">Display</span><span className="display">Lorem ipsum</span></div>
            <div><span className="eyebrow">H1</span><span className="h1">Dolor sit amet consectetur</span></div>
            <div><span className="eyebrow">H2</span><span className="h2">Sed do eiusmod tempor incididunt</span></div>
            <div><span className="eyebrow">H3</span><span className="h3">Ut enim ad minim veniam quis</span></div>
            <div><span className="eyebrow">Lede</span><p className="lede">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p></div>
            <div><span className="eyebrow">Body</span><p style={{ maxWidth: "var(--measure)" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <a href="#type">A text link</a> is underlined.</p></div>
            <div><span className="eyebrow">Small</span><p className="small muted">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.</p></div>
            <div><span className="eyebrow">Label</span><span className="eyebrow">Teaching assistant · 2023–2026</span></div>
            <div><span className="eyebrow">Numbers</span><span className="num" style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 600 }}>0123456789 · 38% · 4.6 · 2×</span></div>
          </div>
        </Section>

        <Section id="space" title="Spacing, shape and motion" lede="A 4px-based scale. Reading column is 66 characters wide; the page is 1160px at most.">
          <div className="sg-demo" style={{ gap: 10 }}>
            {SPACE.map((s, i) => (
              <div key={s} className="sg-row" style={{ gap: 16 }}>
                <span className="sg-code" style={{ width: 150 }}>--space-{i + 1} · {s}px</span>
                <div className="sg-bar" style={{ width: s }} />
              </div>
            ))}
          </div>
          <div className="sg-row">
            {[["radius-sm", "8px"], ["radius", "14px"], ["radius-lg", "22px"]].map(([n, v]) => (
              <div key={n} className="sg-swatch"><div className="sg-chip" style={{ width: 120, borderRadius: v, background: "var(--panel)" }} /><span className="sg-code">--{n} · {v}</span></div>
            ))}
          </div>
          <p className="muted small">Motion: 150ms for small state changes, 260ms for cards and page color. Everything is switched off for visitors who ask for reduced motion.</p>
        </Section>

        <Section id="buttons" title="Buttons and links" lede="One primary action per view. Buttons take the content color of the page they sit on.">
          <Region color="#4A44C6">
            <div className="sg-row">
              <Button href="#buttons" icon="arrow">Primary</Button>
              <Button href="#buttons" variant="secondary">Secondary</Button>
              <Button href="#buttons" variant="text" icon="arrow">Text</Button>
              <Button href="https://example.com" variant="secondary" icon="external">External</Button>
            </div>
            <div className="sg-row">
              <span className="sg-code" style={{ width: 90 }}>hover</span>
              <a className="btn btn-primary is-hover" href="#buttons">Primary</a>
              <a className="btn btn-secondary is-hover" href="#buttons">Secondary</a>
            </div>
            <div className="sg-row">
              <span className="sg-code" style={{ width: 90 }}>focus</span>
              <a className="btn btn-primary is-focus" href="#buttons">Primary</a>
              <a className="btn btn-secondary is-focus" href="#buttons">Secondary</a>
            </div>
            <div className="sg-row">
              <span className="sg-code" style={{ width: 90 }}>disabled</span>
              <a className="btn btn-primary" aria-disabled="true" href="#buttons">Primary</a>
              <a className="btn btn-secondary" aria-disabled="true" href="#buttons">Secondary</a>
            </div>
            <p>Inline links are <a href="#buttons">underlined</a> and thicken on hover. Keyboard focus draws a 3px outline in the current text color.</p>
          </Region>
        </Section>

        <Section id="cards" title="Case study cards" lede="Cards match the site theme. Only the frame around the image carries the case study's color, so the color shows before it's opened. The first card on the home page is featured.">
          <div className="card-grid">
            {studies.map((s, i) => <CaseStudyCard key={s.slug} study={s} featured={i === 0} />)}
          </div>
        </Section>

        <Section id="summary" title="Case study summary" lede="The top of every case study. It should make the whole case on its own for a reader who never scrolls.">
          <Region color="#0FA3B1">
            <SummaryBlock study={studies[1]} hasPrototype hasDecision />
          </Region>
        </Section>

        <Section id="figures" title="Figures and frames" lede="Placeholder visuals stand in for real screenshots. In production every figure has alt text and a caption.">
          <Region color="#C2338F">
            <div style={{ display: "grid", gap: 40 }}>
              <div><p className="eyebrow" style={{ marginBottom: 12 }}>Stage (cards and hero)</p><Stage variant="dashboard" /></div>
              <div><p className="eyebrow" style={{ marginBottom: 12 }}>Browser frame</p><BrowserFrame variant="editor" /></div>
              <div><p className="eyebrow" style={{ marginBottom: 12 }}>Pair</p><ShotPair left="assistant" right="mobile" caption="Caption text sits below the figure." /></div>
              <div><p className="eyebrow" style={{ marginBottom: 12 }}>Before and after</p><BeforeAfter beforeNote="The earlier version, muted." afterNote="The redesign." /></div>
              <div><p className="eyebrow" style={{ marginBottom: 12 }}>Annotated screenshot</p>
                <Annotated pins={[
                  { x: 30, y: 24, title: "Lorem ipsum", text: "Dolor sit amet consectetur adipiscing elit." },
                  { x: 58, y: 62, title: "Sed do eiusmod", text: "Tempor incididunt ut labore et dolore." },
                ]} /></div>
              <div><p className="eyebrow" style={{ marginBottom: 12 }}>Embedded prototype</p><PrototypeFrame caption="Playable in the page, with a full-screen option." /></div>
            </div>
          </Region>
        </Section>

        <Section id="annotations" title="Annotation number markers" lede="The annotated screenshot keeps its layout (notes beside). These are four ways to show the numbers. A is the current circle; B to D reuse shapes the rest of the site already uses.">
          <Region color="#0FA3B1">
            <div style={{ display: "grid", gap: 72 }}>
              {(["circle", "square", "flag", "underline"] as const).map((m, i) => (
                <div key={m} style={{ display: "grid", gap: 12 }}>
                  <p className="eyebrow">{"ABCD"[i]} · {({ circle: "Circle (current)", square: "Square", flag: "Flag", underline: "Underline" })[m]}</p>
                  <Annotated marker={m} variant="dashboard" pins={[
                    { x: 28, y: 26, title: "Lorem ipsum dolor", text: "Sit amet consectetur adipiscing elit sed do eiusmod." },
                    { x: 44, y: 70, title: "Ut enim ad minim", text: "Veniam quis nostrud exercitation ullamco laboris." },
                    { x: 90, y: 40, title: "Duis aute irure", text: "Dolor in reprehenderit in voluptate velit esse." },
                  ]} />
                </div>
              ))}
            </div>
          </Region>
        </Section>

        <Section id="blocks" title="Content blocks" lede="The building blocks of a case study. Mix and pick; no case study uses all of them.">
          <Region color="#4A44C6">
            <div style={{ display: "grid", gap: 48 }}>
              <PullQuote who="Lorem Ipsum" role="Dolor sit amet">Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil.</PullQuote>
              <Callout label="Key insight">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</Callout>
              <Sticky label="Annotation">Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.</Sticky>
              <StatRow stats={[{ value: "38%", label: "Lorem ipsum" }, { value: "4.6", label: "Dolor sit" }, { value: "2×", label: "Amet consectetur" }]} />
              <Decision question="Lorem ipsum dolor sit amet consectetur?" options={[
                { name: "Sed do eiusmod", verdict: "Chosen", why: "Tempor incididunt ut labore et dolore magna aliqua." },
                { name: "Ut aliquip", verdict: "Rejected", why: "Commodo consequat duis aute irure dolor." },
                { name: "Cillum dolore", verdict: "Deferred", why: "Fugiat nulla pariatur excepteur sint occaecat." },
              ]}>Qui officia deserunt mollit anim id est laborum.</Decision>
              <Timeline stages={[
                { when: "2023", title: "Lorem ipsum", text: "Dolor sit amet consectetur adipiscing elit sed do eiusmod.", stat: { value: "1.2k", label: "ad minim" } },
                { when: "2024", title: "Dolor sit amet", text: "Ut enim ad minim veniam quis nostrud exercitation ullamco." },
              ]} />
              <CompareTable caption="Before and after, with the change called out." rows={[
                { label: "Lorem ipsum", before: "42%", after: "78%", change: "+36 pts" },
                { label: "Dolor sit amet", before: "18 min", after: "6 min", change: "−67%" },
              ]} />
              <ThreeUp items={[
                { label: "Tested", title: "Lorem ipsum", text: "Dolor sit amet consectetur adipiscing elit." },
                { label: "Learned", title: "Dolor sit", text: "Ut enim ad minim veniam quis nostrud." },
                { label: "Changed", title: "Amet elit", text: "Duis aute irure dolor in reprehenderit." },
              ]} />
              <Split side="right" eyebrow="Lorem ipsum" heading="Text beside a screen" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." variant="editor" />
              <Retrospective worked={["Lorem ipsum dolor sit amet", "Sed do eiusmod tempor"]} change={["Ut enim ad minim veniam"]} next={["Duis aute irure dolor"]} />
            </div>
          </Region>
        </Section>

        <Section id="status" title="Case study status" lede="Set in each case study's file with the status field.">
          <ul style={{ display: "grid", gap: 8, paddingLeft: 20 }}>
            <li><strong>live</strong>: appears on the home page and has its own page.</li>
            <li><strong>unlisted</strong>: has its own page at its web address but is hidden from the home page and from search engines. Share the link with a specific person.</li>
            <li><strong>draft</strong>: not built into the site at all.</li>
          </ul>
        </Section>
      </div>
    </PageShell>
  );
}
