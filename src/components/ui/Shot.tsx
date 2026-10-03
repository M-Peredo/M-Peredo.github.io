import type { ReactNode } from "react";

// Placeholder product visuals. Each one is a generic, text-free app screen drawn
// in the case study's own color (--cs-source). Swap for real screenshots later.

export type ShotVariant = "dashboard" | "assistant" | "editor" | "mobile";

const INK = "#1C1D26";
const G1 = "#F5F6FA";
const G2 = "#E8EAF1";
const G3 = "#D3D6E2";
const G4 = "#B9BDCE";
const ACCENT = "var(--cs-source, #4a44c6)";

function Bars({ x, y, widths, h = 12, gap = 22, fill = G3, r = 6 }: { x: number; y: number; widths: number[]; h?: number; gap?: number; fill?: string; r?: number }) {
  return (
    <>
      {widths.map((w, i) => (
        <rect key={i} x={x} y={y + i * gap} width={w} height={h} rx={r} fill={fill} />
      ))}
    </>
  );
}

function Sparkle({ cx, cy, s = 14, fill = "#fff" }: { cx: number; cy: number; s?: number; fill?: string }) {
  const d = `M ${cx} ${cy - s} C ${cx + s * 0.15} ${cy - s * 0.15} ${cx + s * 0.15} ${cy - s * 0.15} ${cx + s} ${cy} C ${cx + s * 0.15} ${cy + s * 0.15} ${cx + s * 0.15} ${cy + s * 0.15} ${cx} ${cy + s} C ${cx - s * 0.15} ${cy + s * 0.15} ${cx - s * 0.15} ${cy + s * 0.15} ${cx - s} ${cy} C ${cx - s * 0.15} ${cy - s * 0.15} ${cx - s * 0.15} ${cy - s * 0.15} ${cx} ${cy - s} Z`;
  return <path d={d} fill={fill} />;
}

function Dashboard() {
  return (
    <>
      <rect width="1600" height="1000" fill="#fff" />
      {/* sidebar */}
      <rect width="260" height="1000" fill={G1} />
      <rect x="36" y="36" width="40" height="40" rx="12" fill={ACCENT} />
      <rect x="90" y="49" width="110" height="14" rx="7" fill={G4} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          {i === 1 && <rect x="20" y={130 + i * 62} width="220" height="46" rx="12" fill={ACCENT} fillOpacity=".14" />}
          <circle cx="46" cy={153 + i * 62} r="9" fill={i === 1 ? ACCENT : G4} />
          <rect x="72" y={147 + i * 62} width={[110, 120, 96, 130, 88, 104][i]} height="12" rx="6" fill={i === 1 ? ACCENT : G3} />
        </g>
      ))}
      {/* header */}
      <line x1="260" y1="96" x2="1600" y2="96" stroke={G2} strokeWidth="2" />
      <rect x="304" y="28" width="440" height="42" rx="21" fill={G1} />
      <circle cx="334" cy="49" r="8" fill={G4} />
      <circle cx="1448" cy="49" r="15" fill={G2} />
      <circle cx="1520" cy="49" r="23" fill={G3} />
      {/* title */}
      <rect x="304" y="134" width="280" height="30" rx="9" fill={INK} />
      <rect x="304" y="178" width="400" height="14" rx="7" fill={G3} />
      <rect x="1384" y="132" width="176" height="46" rx="12" fill={ACCENT} />
      <rect x="1420" y="149" width="104" height="12" rx="6" fill="#fff" fillOpacity=".9" />
      {/* stat cards */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={304 + i * 420} y="226" width="400" height="152" rx="20" fill="#fff" stroke={G2} strokeWidth="2" />
          <rect x={332 + i * 420} y="254" width="120" height="12" rx="6" fill={G3} />
          <rect x={332 + i * 420} y="288" width={[140, 110, 160][i]} height="38" rx="10" fill={INK} />
          <rect x={332 + i * 420} y="340" width="86" height="20" rx="10" fill={ACCENT} fillOpacity=".14" />
          <rect x={344 + i * 420} y="346" width="62" height="8" rx="4" fill={ACCENT} />
        </g>
      ))}
      {/* chart */}
      <rect x="304" y="410" width="860" height="330" rx="20" fill="#fff" stroke={G2} strokeWidth="2" />
      <rect x="336" y="440" width="190" height="16" rx="8" fill={INK} />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="336" x2="1132" y1={500 + i * 55} y2={500 + i * 55} stroke={G2} strokeWidth="2" strokeDasharray="6 8" />
      ))}
      <path d="M336 690 C 420 650, 470 610, 540 620 S 680 560, 760 575 S 900 520, 960 500 S 1060 470, 1132 455 L 1132 700 L 336 700 Z" fill={ACCENT} fillOpacity=".12" />
      <path d="M336 690 C 420 650, 470 610, 540 620 S 680 560, 760 575 S 900 520, 960 500 S 1060 470, 1132 455" fill="none" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" />
      <circle cx="960" cy="500" r="10" fill="#fff" stroke={ACCENT} strokeWidth="5" />
      {/* donut */}
      <rect x="1190" y="410" width="370" height="330" rx="20" fill="#fff" stroke={G2} strokeWidth="2" />
      <rect x="1222" y="440" width="140" height="16" rx="8" fill={INK} />
      <circle cx="1375" cy="590" r="70" fill="none" stroke={G2} strokeWidth="28" />
      <circle cx="1375" cy="590" r="70" fill="none" stroke={ACCENT} strokeWidth="28" strokeDasharray="290 440" strokeLinecap="round" transform="rotate(-90 1375 590)" />
      <rect x="1347" y="578" width="56" height="24" rx="8" fill={INK} />
      {/* table */}
      <rect x="304" y="770" width="1256" height="200" rx="20" fill="#fff" stroke={G2} strokeWidth="2" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx="344" cy={812 + i * 56} r="16" fill={i === 0 ? ACCENT : G3} fillOpacity={i === 0 ? 0.9 : 1} />
          <rect x="378" y={805 + i * 56} width={[200, 170, 230][i]} height="13" rx="6" fill={INK} fillOpacity=".85" />
          <rect x="760" y={805 + i * 56} width="140" height="13" rx="6" fill={G3} />
          <rect x="1010" y={805 + i * 56} width="100" height="13" rx="6" fill={G3} />
          <rect x="1420" y={800 + i * 56} width="100" height="24" rx="12" fill={i === 1 ? G2 : ACCENT} fillOpacity={i === 1 ? 1 : 0.14} />
        </g>
      ))}
    </>
  );
}

function Assistant() {
  return (
    <>
      <rect width="1600" height="1000" fill="#fff" />
      {/* lesson panel */}
      <rect width="420" height="1000" fill={G1} />
      <rect x="36" y="40" width="190" height="20" rx="10" fill={INK} />
      <rect x="36" y="76" width="260" height="12" rx="6" fill={G3} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x="24" y={130 + i * 108} width="372" height="88" rx="18" fill="#fff" stroke={i === 2 ? ACCENT : G2} strokeWidth={i === 2 ? 3 : 2} />
          <rect x="48" y={158 + i * 108} width="28" height="28" rx="8" fill={i < 3 ? ACCENT : "#fff"} stroke={i < 3 ? ACCENT : G3} strokeWidth="3" />
          <rect x="94" y={158 + i * 108} width={[190, 150, 210, 170, 120, 180][i]} height="14" rx="7" fill={INK} fillOpacity=".8" />
          <rect x="94" y={184 + i * 108} width={[130, 180, 110, 150, 170, 100][i]} height="11" rx="5.5" fill={G3} />
        </g>
      ))}
      {/* top bar */}
      <line x1="420" y1="84" x2="1600" y2="84" stroke={G2} strokeWidth="2" />
      <rect x="470" y="32" width="220" height="20" rx="10" fill={INK} />
      <rect x="1384" y="26" width="176" height="36" rx="18" fill={G1} />
      {/* AI message */}
      <circle cx="510" cy="176" r="26" fill={ACCENT} />
      <Sparkle cx={510} cy={176} s={13} />
      <rect x="560" y="140" width="760" height="168" rx="26" fill={G1} />
      <Bars x={596} y={174} widths={[640, 600, 410]} h={13} gap={30} fill={G3} />
      {/* user message */}
      <rect x="900" y="348" width="620" height="96" rx="26" fill={ACCENT} />
      <Bars x={936} y={382} widths={[520, 340]} h={13} gap={30} fill="#fff" />
      {/* AI message with card */}
      <circle cx="510" cy="508" r="26" fill={ACCENT} />
      <Sparkle cx={510} cy={508} s={13} />
      <rect x="560" y="472" width="760" height="266" rx="26" fill={G1} />
      <Bars x={596} y={504} widths={[560, 300]} h={13} gap={30} fill={G3} />
      <rect x="596" y="580" width="688" height="130" rx="18" fill="#fff" stroke={G2} strokeWidth="2" />
      <rect x="620" y="604" width="36" height="36" rx="10" fill={ACCENT} fillOpacity=".14" />
      <rect x="670" y="606" width="260" height="14" rx="7" fill={INK} fillOpacity=".85" />
      <rect x="670" y="632" width="190" height="11" rx="5.5" fill={G3} />
      <rect x="1090" y="620" width="170" height="40" rx="12" fill={ACCENT} />
      <rect x="1124" y="636" width="102" height="10" rx="5" fill="#fff" />
      <Bars x={620} y={668} widths={[430, 330]} h={10} gap={22} fill={G3} />
      {/* chips */}
      {[210, 250, 190].map((w, i) => (
        <g key={i}>
          <rect x={560 + [0, 230, 500][i]} y="782" width={w} height="50" rx="25" fill="#fff" stroke={G3} strokeWidth="2" />
          <rect x={586 + [0, 230, 500][i]} y="801" width={w - 52} height="12" rx="6" fill={G4} />
        </g>
      ))}
      {/* input */}
      <rect x="470" y="880" width="1060" height="84" rx="42" fill={G1} stroke={G2} strokeWidth="2" />
      <rect x="520" y="914" width="360" height="14" rx="7" fill={G3} />
      <circle cx="1478" cy="922" r="30" fill={ACCENT} />
      <path d="M1466 922 H1490 M1480 910 L1492 922 L1480 934" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function Editor() {
  return (
    <>
      <rect width="1600" height="1000" fill={G1} />
      {/* top bar */}
      <rect width="1600" height="84" fill="#fff" />
      <line x1="0" y1="84" x2="1600" y2="84" stroke={G2} strokeWidth="2" />
      <rect x="32" y="22" width="40" height="40" rx="12" fill={ACCENT} />
      <rect x="90" y="36" width="170" height="14" rx="7" fill={INK} fillOpacity=".85" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={560 + i * 170} y="20" width="150" height="44" rx="12" fill={i === 0 ? ACCENT : "none"} fillOpacity={i === 0 ? 0.14 : 1} />
          <rect x={590 + i * 170} y="36" width="90" height="12" rx="6" fill={i === 0 ? ACCENT : G4} />
        </g>
      ))}
      <rect x="1400" y="20" width="168" height="44" rx="12" fill={ACCENT} />
      <rect x="1436" y="36" width="96" height="12" rx="6" fill="#fff" />
      {/* outline */}
      <rect y="84" width="320" height="916" fill="#fff" />
      <line x1="320" y1="84" x2="320" y2="1000" stroke={G2} strokeWidth="2" />
      <rect x="32" y="116" width="150" height="14" rx="7" fill={INK} fillOpacity=".8" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <g key={i}>
          {i === 2 && <rect x="16" y={162 + i * 64} width="288" height="48" rx="12" fill={ACCENT} fillOpacity=".12" />}
          <rect x="40" y={178 + i * 64} width="18" height="18" rx="5" fill={i === 2 ? ACCENT : G3} />
          <rect x="74" y={180 + i * 64} width={[170, 140, 190, 120, 160, 150, 130][i]} height="13" rx="6.5" fill={i === 2 ? ACCENT : G3} />
        </g>
      ))}
      {/* inspector */}
      <rect x="1288" y="84" width="312" height="916" fill="#fff" />
      <line x1="1288" y1="84" x2="1288" y2="1000" stroke={G2} strokeWidth="2" />
      <rect x="1320" y="116" width="120" height="14" rx="7" fill={INK} fillOpacity=".8" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="1320" y={166 + i * 76} width="130" height="12" rx="6" fill={G3} />
          <rect x="1320" y={192 + i * 76} width="248" height="36" rx="10" fill={G1} stroke={G2} strokeWidth="2" />
          {i % 2 === 0 && <rect x="1500" y={198 + i * 76} width="56" height="24" rx="12" fill={ACCENT} />}
          {i % 2 === 0 && <circle cx="1540" cy={210 + i * 76} r="9" fill="#fff" />}
        </g>
      ))}
      {/* document */}
      <rect x="400" y="130" width="800" height="800" rx="20" fill="#fff" stroke={G2} strokeWidth="2" />
      <rect x="450" y="176" width="420" height="34" rx="10" fill={INK} />
      <Bars x={450} y={238} widths={[690, 640, 560]} h={13} gap={28} fill={G3} />
      <rect x="450" y="350" width="700" height="250" rx="16" fill={ACCENT} fillOpacity=".16" />
      <circle cx="930" cy="440" r="62" fill={ACCENT} fillOpacity=".5" />
      <path d="M450 600 L 640 470 L 760 540 L 860 470 L 1150 600 Z" fill={ACCENT} fillOpacity=".34" />
      <Bars x={450} y={636} widths={[690, 610]} h={13} gap={28} fill={G3} />
      <rect x="450" y="720" width="700" height="170" rx="14" fill={INK} />
      <rect x="480" y="750" width="90" height="12" rx="6" fill={ACCENT} />
      <rect x="584" y="750" width="150" height="12" rx="6" fill="#8C90A6" />
      <rect x="504" y="780" width="190" height="12" rx="6" fill="#8C90A6" />
      <rect x="504" y="810" width="260" height="12" rx="6" fill="#59D3A6" />
      <rect x="504" y="840" width="120" height="12" rx="6" fill="#8C90A6" />
    </>
  );
}

function Phone({ x, y, tilt = 0, shift = 0 }: { x: number; y: number; tilt?: number; shift?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${tilt})`}>
      <rect width="340" height="780" rx="52" fill={INK} />
      <rect x="12" y="12" width="316" height="756" rx="42" fill="#fff" />
      <rect x="120" y="26" width="100" height="26" rx="13" fill={INK} />
      <rect x="36" y="86" width="150" height="22" rx="11" fill={INK} />
      <circle cx="288" cy="97" r="18" fill={G3} />
      <rect x="36" y="130" width="200" height="12" rx="6" fill={G3} />
      <rect x="36" y="168" width="268" height="150" rx="22" fill={ACCENT} fillOpacity={0.9 - shift * 0.1} />
      <rect x="58" y="192" width="110" height="14" rx="7" fill="#fff" />
      <rect x="58" y="218" width="170" height="10" rx="5" fill="#fff" fillOpacity=".7" />
      <rect x="58" y="270" width="96" height="30" rx="15" fill="#fff" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="36" y={346 + i * 92} width="268" height="76" rx="18" fill={G1} />
          <rect x="52" y={362 + i * 92} width="44" height="44" rx="12" fill={ACCENT} fillOpacity={0.16 + i * 0.06} />
          <rect x="110" y={366 + i * 92} width={[130, 110, 120][(i + shift) % 3]} height="12" rx="6" fill={INK} fillOpacity=".8" />
          <rect x="110" y={390 + i * 92} width="86" height="10" rx="5" fill={G3} />
        </g>
      ))}
      <rect x="36" y="650" width="268" height="60" rx="30" fill={G1} />
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={78 + i * 62} cy="680" r="11" fill={i === 0 ? ACCENT : G4} />
      ))}
    </g>
  );
}

function Mobile() {
  return (
    <>
      <rect width="1600" height="1000" fill={G1} />
      <Phone x={440} y={110} tilt={-3} />
      <Phone x={850} y={80} tilt={2} shift={1} />
    </>
  );
}

const SCREENS: Record<ShotVariant, () => ReactNode> = {
  dashboard: Dashboard,
  assistant: Assistant,
  editor: Editor,
  mobile: Mobile,
};

export function Shot({ variant = "dashboard", className = "" }: { variant?: ShotVariant; className?: string }) {
  const Screen = SCREENS[variant];
  return (
    <svg className={`shot ${className}`} viewBox="0 0 1600 1000" role="img" aria-label="Placeholder product screenshot" preserveAspectRatio="xMidYMid slice">
      <Screen />
    </svg>
  );
}

// A tinted backdrop with the screen floating on it. Used for thumbnails and hero images.
export function Stage({ variant = "dashboard", label = true, className = "" }: { variant?: ShotVariant; label?: boolean; className?: string }) {
  return (
    <div className={`stage ${className}`}>
      <div className="stage-window">
        <Shot variant={variant} />
      </div>
      {label && <span className="ph-label">Placeholder</span>}
    </div>
  );
}

// The screen inside a neutral browser frame, for in-article figures.
export function BrowserFrame({ variant = "dashboard", label = true, tone = "normal", children }: { variant?: ShotVariant; label?: boolean; tone?: "normal" | "muted"; children?: ReactNode }) {
  return (
    <div className={`browser ${tone === "muted" ? "browser-muted" : ""}`}>
      <div className="browser-bar" aria-hidden="true">
        <span /><span /><span />
        <i>lorem.ipsum/app</i>
      </div>
      <div className="browser-body">
        {children ?? <Shot variant={variant} />}
        {label && <span className="ph-label">Placeholder</span>}
      </div>
    </div>
  );
}
