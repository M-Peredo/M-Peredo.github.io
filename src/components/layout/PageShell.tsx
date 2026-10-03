import type { CSSProperties, ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

// Wraps header, page and footer. Pass `style` (from contentStyle) to tint the whole page.
export function PageShell({ children, style, current }: { children: ReactNode; style?: CSSProperties; current?: string }) {
  return (
    <div className="shell" style={style}>
      <a className="skip" href="#main">Skip to content</a>
      <SiteHeader current={current} />
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  );
}
