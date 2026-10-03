import type { ReactNode } from "react";
import { BrowserFrame, Shot, type ShotVariant } from "./Shot";
import { ArrowUpRight, Play } from "./icons";

export function Figure({ id, caption, children, wide = true }: { id?: string; caption?: ReactNode; children: ReactNode; wide?: boolean }) {
  return (
    <figure id={id} className={`figure ${wide ? "wide" : ""}`}>
      {children}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export function Screen({ variant = "dashboard", caption }: { variant?: ShotVariant; caption?: ReactNode }) {
  return (
    <Figure caption={caption}>
      <BrowserFrame variant={variant} />
    </Figure>
  );
}

export function ShotPair({ left = "dashboard", right = "assistant", caption }: { left?: ShotVariant; right?: ShotVariant; caption?: ReactNode }) {
  return (
    <Figure caption={caption}>
      <div className="pair">
        <BrowserFrame variant={left} />
        <BrowserFrame variant={right} />
      </div>
    </Figure>
  );
}

export function BeforeAfter({ before = "dashboard", after = "editor", beforeNote, afterNote, caption }: { before?: ShotVariant; after?: ShotVariant; beforeNote?: ReactNode; afterNote?: ReactNode; caption?: ReactNode }) {
  return (
    <Figure caption={caption}>
      <div className="pair">
        <div className="ba">
          <span className="ba-badge">Before</span>
          <BrowserFrame variant={before} tone="muted" />
          {beforeNote && <p className="ba-note">{beforeNote}</p>}
        </div>
        <div className="ba">
          <span className="ba-badge ba-badge-after">After</span>
          <BrowserFrame variant={after} />
          {afterNote && <p className="ba-note">{afterNote}</p>}
        </div>
      </div>
    </Figure>
  );
}

export type Pin = { x: number; y: number; title: string; text: string };
export type AnnotatedMarker = "circle" | "square" | "flag" | "underline";

// A screenshot with numbered markers and matching notes in a column beside it.
export function Annotated({ variant = "assistant", marker = "circle", pins, caption }: { variant?: ShotVariant; marker?: AnnotatedMarker; pins: Pin[]; caption?: ReactNode }) {
  // Flag and underline markers use two-digit labels (01, 02) to match the site's tracked uppercase labels.
  const num = (i: number) => (marker === "flag" || marker === "underline" ? String(i + 1).padStart(2, "0") : String(i + 1));
  return (
    <Figure caption={caption}>
      <div className={`annotated annotated-m-${marker}`}>
        <div className="annotated-shot">
          <BrowserFrame variant={variant} label={false}>
            <Shot variant={variant} />
            {pins.map((p, i) => (
              <span key={i} className={`pin pin-${marker}`} style={{ left: `${p.x}%`, top: `${p.y}%` }} aria-hidden="true">{num(i)}</span>
            ))}
          </BrowserFrame>
        </div>
        <ol className="annotated-notes">
          {pins.map((p, i) => (
            <li key={i}>
              <span className={`pin pin-static pin-${marker}`} aria-hidden="true">{num(i)}</span>
              <div>
                <strong>{p.title}</strong>
                <p>{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Figure>
  );
}

// Stand-in for an embedded, playable prototype.
export function PrototypeFrame({ id = "prototype", variant = "assistant", title = "Lorem ipsum prototype", caption }: { id?: string; variant?: ShotVariant; title?: string; caption?: ReactNode }) {
  return (
    <Figure id={id} caption={caption}>
      <div className="proto tinted">
        <div className="proto-head">
          <span className="proto-title"><span className="proto-dot" />{title}</span>
          <span className="proto-open">Open full screen <ArrowUpRight /></span>
        </div>
        <div className="proto-body">
          <Shot variant={variant} />
          <div className="proto-overlay">
            <span className="proto-play"><Play /></span>
            <span>Interactive prototype goes here</span>
          </div>
        </div>
      </div>
    </Figure>
  );
}
