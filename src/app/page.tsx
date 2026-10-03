import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { getLiveCaseStudies } from "@/lib/case-studies";

const PRINCIPLES = [
  { title: "Lorem ipsum dolor", text: "Sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { title: "Ut enim ad minim", text: "Veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute." },
  { title: "Duis aute irure", text: "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint." },
];

export default function Home() {
  const studies = getLiveCaseStudies();
  return (
    <PageShell>
      <div className="container">
        <section className="hero" aria-labelledby="hero-title">
          <span className="eyebrow">Lorem ipsum dolor sit amet</span>
          <h1 id="hero-title" className="display">Molly Peredo</h1>
          <p className="lede hero-statement" style={{ maxWidth: "34ch" }}>
            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="btn-row">
            <Button href="#work" icon="arrow">See the work</Button>
            <Button href="#contact" variant="secondary">Get in touch</Button>
          </div>
        </section>

        <section id="work" className="section" aria-labelledby="work-title">
          <div className="section-head">
            <span className="eyebrow">Selected work</span>
            <h2 id="work-title" className="h1">Lorem ipsum dolor sit amet</h2>
          </div>
          <div className="card-grid">
            {studies.map((s, i) => (
              <CaseStudyCard key={s.slug} study={s} featured={i === 0} />
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="approach-title">
          <div className="section-head">
            <span className="eyebrow">Approach</span>
            <h2 id="approach-title" className="h2">Sed ut perspiciatis unde omnis iste natus</h2>
          </div>
          <div className="principles">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="principle">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="section" aria-labelledby="about-title">
          <div className="about-grid">
            <div className="portrait" role="img" aria-label="Placeholder portrait">
              <span className="ph-label">Placeholder</span>
            </div>
            <div className="about-copy">
              <span className="eyebrow">About</span>
              <h2 id="about-title" className="h1">Nemo enim ipsam voluptatem quia voluptas</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p className="muted">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <dl className="facts">
                <div><dt>Focus</dt><dd>Lorem ipsum</dd></div>
                <div><dt>Experience</dt><dd>Dolor sit amet</dd></div>
                <div><dt>Based</dt><dd>Consectetur</dd></div>
              </dl>
            </div>
          </div>
        </section>

        <section id="contact" className="section" aria-labelledby="contact-title">
          <div className="contact-band">
            <span className="eyebrow">Contact</span>
            <h2 id="contact-title" className="h1">Neque porro quisquam est qui dolorem</h2>
            <p className="lede">Quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.</p>
            <div className="btn-row">
              <Button href="mailto:hello@example.com" icon="arrow">hello@example.com</Button>
              <Button href="https://example.com" variant="secondary" icon="external">LinkedIn</Button>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
