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

export type Pin = { x: number; y: number; title: string; text: string; w?: number; h?: number };
export type AnnotatedVariant = "side" | "cards" | "inline" | "boxes";

// A screenshot with numbered markers and matching notes.
//   side   : markers on the screenshot, notes in a column beside it
//   cards  : markers on the screenshot, notes as cards in a row underneath
//   inline : notes sit directly on the screenshot beside their markers
//   boxes  : outlined highlight areas instead of dots, notes in a column beside it
export function Annotated({ variant = "assistant", style = "side", pins, caption }: { variant?: ShotVariant; style?: AnnotatedVariant; pins: Pin[]; caption?: ReactNode }) {
  const markers = pins.map((p, i) =>
    style === "boxes" ? (
      <span key={i} className="pin-box" style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.w ?? 18}%`, height: `${p.h ?? 14}%` }} aria-hidden="true">
        <span className="pin-box-num">{i + 1}</span>
      </span>
    ) : (
      <span key={i} className="pin" style={{ left: `${p.x}%`, top: `${p.y}%` }} aria-hidden="true">{i + 1}</span>
    )
  );
  const note = (p: Pin, i: number) => (
    <>
      <span className="pin pin-static" aria-hidden="true">{i + 1}</span>
      <div>
        <strong>{p.title}</strong>
        <p>{p.text}</p>
      </div>
    </>
  );
  const shot = (
    <div className="annotated-shot">
      <BrowserFrame variant={variant} label={false}>
        <Shot variant={variant} />
        {markers}
        {style === "inline" &&
          pins.map((p, i) => (
            <div key={i} className={`pin-note ${p.x > 55 ? "pin-note-left" : "pin-note-right"}`} style={{ left: `${p.x}%`, top: `${p.y}%` }}>
              <strong>{p.title}</strong>
              <p>{p.text}</p>
            </div>
          ))}
      </BrowserFrame>
    </div>
  );
  return (
    <Figure caption={caption}>
      {style === "cards" || style === "inline" ? (
        <div className={`annotated-stack annotated-${style}`}>
          {shot}
          <ol className="annotated-cards">
            {pins.map((p, i) => <li key={i}>{note(p, i)}</li>)}
          </ol>
        </div>
      ) : (
        <div className="annotated">
          {shot}
          <ol className="annotated-notes">
            {pins.map((p, i) => <li key={i}>{note(p, i)}</li>)}
          </ol>
        </div>
      )}
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
