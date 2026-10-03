import type { ReactNode } from "react";
import { Check, Cross, Clock } from "./icons";

export function PullQuote({ who, role, children }: { who: string; role?: string; children: ReactNode }) {
  return (
    <figure className="pullquote">
      <blockquote>{children}</blockquote>
      <figcaption>
        <span className="avatar" aria-hidden="true">{who.charAt(0)}</span>
        <span><strong>{who}</strong>{role && <> <span className="muted">· {role}</span></>}</span>
      </figcaption>
    </figure>
  );
}

export function Callout({ label = "Key insight", children }: { label?: string; children: ReactNode }) {
  return (
    <aside className="callout">
      <span className="callout-label">{label}</span>
      <div>{children}</div>
    </aside>
  );
}

export type StickyVariant = "rule" | "underline" | "panel";

// Wrap words in ==double equals== (or <mark> in MDX) to mark the ones that matter.
function withMarks(text: string): ReactNode[] {
  return text.split(/==(.+?)==/g).map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part));
}

export function Sticky({ label = "Note to self", variant = "rule", children }: { label?: string; variant?: StickyVariant; children: ReactNode }) {
  return (
    <aside className={`sticky st-${variant}`}>
      <strong>{label}</strong>
      {typeof children === "string" ? <p>{withMarks(children)}</p> : children}
    </aside>
  );
}

export type Option = { name: string; verdict: "Chosen" | "Rejected" | "Deferred"; why: string };

export function Decision({ id, question, options, children }: { id?: string; question: string; options: Option[]; children?: ReactNode }) {
  return (
    <section id={id} className="decision wide" aria-label="Decision">
      <header>
        <span className="eyebrow">The call</span>
        <h3>{question}</h3>
      </header>
      <ul className="options">
        {options.map((o) => (
          <li key={o.name} className={`option option-${o.verdict.toLowerCase()}`}>
            <span className="verdict">
              {o.verdict === "Chosen" ? <Check /> : o.verdict === "Rejected" ? <Cross /> : <Clock />}
              {o.verdict}
            </span>
            <strong>{o.name}</strong>
            <p>{o.why}</p>
          </li>
        ))}
      </ul>
      {children && <div className="decision-note">{children}</div>}
    </section>
  );
}

export type Stage = { when: string; title: string; text: string; stat?: { value: string; label: string } };

export function Timeline({ stages }: { stages: Stage[] }) {
  return (
    <ol className="timeline wide">
      {stages.map((s) => (
        <li key={s.title}>
          <span className="timeline-when">{s.when}</span>
          <div className="timeline-card">
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            {s.stat && (
              <p className="timeline-stat">
                <b>{s.stat.value}</b> <span>{s.stat.label}</span>
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export type Row = { label: string; before: string; after: string; change: string };

export function CompareTable({ rows, caption }: { rows: Row[]; caption?: string }) {
  return (
    <div className="table-wrap wide">
      <table className="compare">
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr><th scope="col">Measure</th><th scope="col">Before</th><th scope="col">After</th><th scope="col">Change</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              <td>{r.before}</td>
              <td>{r.after}</td>
              <td className="change">{r.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type Item = { label: string; title: string; text: string };

export function ThreeUp({ items }: { items: Item[] }) {
  return (
    <div className="threeup wide">
      {items.map((it) => (
        <div key={it.title} className="threeup-item">
          <span className="eyebrow">{it.label}</span>
          <h3>{it.title}</h3>
          <p>{it.text}</p>
        </div>
      ))}
    </div>
  );
}

export function Retrospective({ worked, change, next }: { worked: string[]; change: string[]; next?: string[] }) {
  const cols: [string, string[]][] = [["What worked", worked], ["What I'd change", change]];
  if (next) cols.push(["What's next", next]);
  return (
    <section className="retro wide" aria-label="Retrospective">
      <header>
        <span className="eyebrow">Retrospective</span>
      </header>
      <div className="retro-cols">
        {cols.map(([title, items]) => (
          <div key={title}>
            <h3>{title}</h3>
            <ul>
              {items.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Divider() {
  return <hr className="divider" />;
}

// A short, bold run of numbers, for use inside the article body.
export function StatRow({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="statrow wide">
      {stats.map((s) => (
        <div key={s.label}>
          <b>{s.value}</b>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
