import type { ReactNode } from "react";

// The one tag. 28px tall, 12px bold uppercase text; the tone only changes the fill.
//   outline  thin border, muted text (topics, neutral states)
//   color    filled with the case study color, text chosen for contrast (labels that name a thing)
//   solid    filled with the page text color (a chosen or "after" state)
//   dark     translucent black over imagery (placeholder labels)
export type TagTone = "outline" | "color" | "solid" | "dark";

export function Tag({ tone = "outline", icon, children, className = "", as: As = "span" }: { tone?: TagTone; icon?: ReactNode; children: ReactNode; className?: string; as?: "span" | "li" | "strong" }) {
  return (
    <As className={`tag tag-${tone} ${className}`.trim()}>
      {icon}
      {children}
    </As>
  );
}
