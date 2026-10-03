import type { ReactNode } from "react";
import { BrowserFrame, Shot, type ShotVariant } from "./Shot";
import { PrototypeEmbed, PrototypeOpen } from "./PrototypeEmbed";

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
// A screenshot with numbered flag markers and matching notes in a column beside it.
// Markers use two-digit labels (01, 02) to match the site's tracked uppercase labels.
export function Annotated({ variant = "assistant", pins, caption }: { variant?: ShotVariant; pins: Pin[]; caption?: ReactNode }) {
  const num = (i: number) => String(i + 1).padStart(2, "0");
  return (
    <Figure caption={caption}>
      <div className="annotated">
        <div className="annotated-shot">
          <BrowserFrame variant={variant} label={false}>
            <Shot variant={variant} />
            {pins.map((p, i) => (
              <span key={i} className="pin" style={{ left: `${p.x}%`, top: `${p.y}%` }} aria-hidden="true">{num(i)}</span>
            ))}
          </BrowserFrame>
        </div>
        <ol className="annotated-notes">
          {pins.map((p, i) => (
            <li key={i}>
              <span className="pin-num" aria-hidden="true">{num(i)}</span>
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
export function PrototypeFrame({ id = "prototype", src = "/prototypes/sample/index.html", variant = "assistant", title = "Lorem ipsum prototype", width = 1280, height = 800, caption }: { id?: string; src?: string; variant?: ShotVariant; title?: string; width?: number; height?: number; caption?: ReactNode }) {
  return (
    <Figure id={id} caption={caption}>
      <div className="proto">
        <div className="proto-head">
          <span className="proto-title"><span className="proto-tag">Prototype</span>{title}</span>
          <PrototypeOpen src={src} />
        </div>
        <PrototypeEmbed src={src} title={title} width={width} height={height} poster={<Shot variant={variant} />} />
      </div>
    </Figure>
  );
}
