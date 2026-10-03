import type { CaseStudy } from "@/lib/case-studies";
import { Button } from "./Button";

export type SummaryVariant = "stacked" | "split" | "sidebar" | "columns";

// The top of every case study. It works on its own for a reader who never scrolls.
export function SummaryBlock({ study, hasPrototype, hasDecision, variant = "stacked" }: { study: CaseStudy; hasPrototype: boolean; hasDecision: boolean; variant?: SummaryVariant }) {
  const facts = (cls: string) => (
    <dl className={`meta ${cls}`.trim()}>
      <div><dt>Role</dt><dd>{study.role}</dd></div>
      <div><dt>Timeline</dt><dd>{study.timeline}</dd></div>
      <div><dt>Domain</dt><dd>{study.domain}</dd></div>
    </dl>
  );
  const metrics = (cls: string) => (
    <div className={`metrics ${cls}`.trim()}>
      {study.metrics.map((m) => (
        <div key={m.label} className="metric">
          <b>{m.value}</b>
          <span>{m.label}</span>
        </div>
      ))}
    </div>
  );
  const actions = (
    <div className="btn-row">
      {hasPrototype && <Button href="#prototype" icon="arrow">Try the prototype</Button>}
      {hasDecision && <Button href="#decision" variant="secondary">Jump to the hard call</Button>}
    </div>
  );
  const head = (
    <>
      <span className="eyebrow">{study.dateline}</span>
      <h1 id="cs-title" className="h1 cs-title">{study.title}</h1>
      <p className="lede">{study.hook}</p>
    </>
  );

  if (variant === "split") {
    return (
      <section className="summary sum-split" aria-labelledby="cs-title">
        <div className="sum-main">{head}{actions}</div>
        <aside className="sum-facts">{facts("meta-stack")}</aside>
        {metrics("metrics-cols")}
      </section>
    );
  }
  if (variant === "sidebar") {
    return (
      <section className="summary sum-sidebar" aria-labelledby="cs-title">
        <div className="sum-main">{head}{facts("meta-inline")}{actions}</div>
        {metrics("metrics-stack")}
      </section>
    );
  }
  if (variant === "columns") {
    return (
      <section className="summary sum-columns" aria-labelledby="cs-title">
        {head}
        {metrics("metrics-cols metrics-ruled")}
        {facts("meta-inline")}
        {actions}
      </section>
    );
  }
  return (
    <section className="summary" aria-labelledby="cs-title">
      {head}
      {facts("")}
      {metrics("")}
      {actions}
    </section>
  );
}
