import { BrowserFrame, type ShotVariant } from "./Shot";

// Text beside a screen. `side` is where the screen sits.
export function Split({ side = "right", eyebrow, heading, text, variant = "dashboard" }: { side?: "left" | "right"; eyebrow?: string; heading: string; text: string; variant?: ShotVariant }) {
  return (
    <section className={`split wide split-${side}`}>
      <div className="split-text">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h3>{heading}</h3>
        <p>{text}</p>
      </div>
      <div className="split-shot">
        <BrowserFrame variant={variant} />
      </div>
    </section>
  );
}
