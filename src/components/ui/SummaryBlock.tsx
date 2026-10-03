import type { CaseStudy } from "@/lib/case-studies";
import { Button } from "./Button";

// The top of every case study. It works on its own for a reader who never scrolls.
export function SummaryBlock({ study, hasPrototype, hasDecision }: { study: CaseStudy; hasPrototype: boolean; hasDecision: boolean }) {
  return (
    <section className="summary" aria-labelledby="cs-title">
      <span className="eyebrow">{study.dateline}</span>
      <h1 id="cs-title" className="h1 cs-title">{study.title}</h1>
      <p className="lede">{study.hook}</p>
      <dl className="meta">
        <div><dt>Role</dt><dd>{study.role}</dd></div>
        <div><dt>Timeline</dt><dd>{study.timeline}</dd></div>
        <div><dt>Domain</dt><dd>{study.domain}</dd></div>
      </dl>
      <div className="metrics">
        {study.metrics.map((m) => (
          <div key={m.label} className="metric">
            <b>{m.value}</b>
            <span>{m.label}</span>
          </div>
        ))}
      </div>
      <div className="btn-row">
        {hasPrototype && <Button href="#prototype" icon="arrow">Try the prototype</Button>}
        {hasDecision && <Button href="#decision" variant="secondary">Jump to the hard call</Button>}
      </div>
    </section>
  );
}
