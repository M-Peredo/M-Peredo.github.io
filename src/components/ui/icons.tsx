import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { width: "1em", height: "1em", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const ArrowRight = (p: P) => (<svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const ArrowLeft = (p: P) => (<svg {...base} {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>);
export const ArrowUpRight = (p: P) => (<svg {...base} {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>);
export const Play = (p: P) => (<svg {...base} fill="currentColor" stroke="none" {...p}><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>);
export const Check = (p: P) => (<svg {...base} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>);
export const Cross = (p: P) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>);
export const Clock = (p: P) => (<svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
export const Spark = (p: P) => (<svg {...base} fill="currentColor" stroke="none" {...p}><path d="M12 2c.6 4.9 2.6 7.4 8 8-5.4.6-7.4 3.1-8 8-.6-4.9-2.6-7.4-8-8 5.4-.6 7.4-3.1 8-8Z" /></svg>);
