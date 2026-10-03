// Content-driven color: each case study has one source color. The page and its
// card use that color blended toward black ("Rich" tint), with text chosen for contrast.

export const TINT = 0.55; // share of the source color kept. 0.3 = Deep, 0.55 = Rich, 1 = Full

type RGB = [number, number, number];

function parseHex(hex: string): RGB {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)) as RGB;
}

function toHex([r, g, b]: RGB): string {
  return "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
}

function luminance([r, g, b]: RGB): number {
  const f = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

export function contrast(a: string, b: string): number {
  const la = luminance(parseHex(a));
  const lb = luminance(parseHex(b));
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

export type ContentColors = {
  bg: string;
  fg: string;
  fg2: string;
  rule: string;
  btn: string;
  btnFg: string;
};

const LIGHT = "#FFFFFF";
const DARK = "#0B0B0C";

export function contentColors(source: string, tint: number = TINT): ContentColors {
  const rgb = parseHex(source);
  const bg = toHex(rgb.map((v) => v * tint) as RGB);
  // Pick whichever of white or near-black reads better on this background.
  const useLight = contrast(LIGHT, bg) >= contrast(DARK, bg);
  const fg = useLight ? LIGHT : DARK;
  return {
    bg,
    fg,
    fg2: useLight ? "rgba(255,255,255,0.78)" : "rgba(11,11,12,0.72)",
    rule: useLight ? "rgba(255,255,255,0.25)" : "rgba(11,11,12,0.25)",
    btn: fg,
    btnFg: useLight ? toHex(rgb.map((v) => v * 0.35) as RGB) : LIGHT,
  };
}

// CSS custom properties for a content-colored region (page or card).
export function contentStyle(source: string, tint: number = TINT): React.CSSProperties {
  const c = contentColors(source, tint);
  return {
    "--cs-bg": c.bg,
    "--cs-fg": c.fg,
    "--cs-fg2": c.fg2,
    "--cs-rule": c.rule,
    "--cs-btn": c.btn,
    "--cs-btn-fg": c.btnFg,
    "--cs-source": source,
  } as React.CSSProperties;
}
