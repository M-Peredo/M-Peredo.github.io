/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from "react";
import { PullQuote, Callout, Sticky, Decision, Timeline, CompareTable, ThreeUp, Retrospective, Divider, StatRow } from "@/components/ui/content";
import { Screen, ShotPair, BeforeAfter, Annotated, PrototypeFrame } from "@/components/ui/figures";
import { Split } from "@/components/ui/Split";
import { LENGTHS, lorem } from "./lorem";

// ---------- Field descriptions (drive the inspector) ----------
export type Field =
  | { kind: "text" | "textarea"; key: string; label: string }
  | { kind: "select"; key: string; label: string; options: [string, string][] }
  | { kind: "number"; key: string; label: string; min?: number; max?: number }
  | { kind: "lines"; key: string; label: string; hint?: string }
  | { kind: "list"; key: string; label: string; itemLabel: string; fields: Field[]; blank: () => Record<string, any> };

export type Props = Record<string, any>;
export type Group = "Text" | "Screens" | "Evidence" | "Story" | "Reflect";
export const GROUPS: Group[] = ["Text", "Screens", "Evidence", "Story", "Reflect"];

export type BlockDef = {
  label: string;
  group: Group;
  hint: string;
  wide: boolean;
  defaults: () => Props;
  fields: Field[];
  render: (p: Props) => ReactNode;
  mdx: (p: Props) => string;
};

const VARIANTS: [string, string][] = [
  ["dashboard", "Dashboard"],
  ["assistant", "AI assistant"],
  ["editor", "Editor"],
  ["mobile", "Mobile"],
];
const VERDICTS: [string, string][] = [["Chosen", "Chosen"], ["Rejected", "Rejected"], ["Deferred", "Deferred"]];

// ---------- MDX output helpers ----------
const escText = (t: string) => t.replace(/\{/g, "\\{").replace(/</g, "&lt;");

function attr(key: string, v: any): string {
  if (typeof v === "string") {
    return /["\n\\{}]/.test(v) ? `${key}={${JSON.stringify(v)}}` : `${key}="${v}"`;
  }
  const json = JSON.stringify(v, null, 2).split("\n").map((l, i) => (i === 0 ? l : "  " + l)).join("\n");
  return `${key}={${json}}`;
}

function jsx(name: string, props: Record<string, any>, children?: string): string {
  const entries = Object.entries(props).filter(([, v]) => v !== undefined && v !== "");
  const open = entries.length ? `<${name}\n${entries.map(([k, v]) => "  " + attr(k, v)).join("\n")}\n` : `<${name}`;
  if (children) return `${open}>\n${escText(children)}\n</${name}>`;
  return entries.length ? `${open}/>` : `${open} />`;
}

const lines = (t: string) => t.split("\n").map((s) => s.trim()).filter(Boolean);

const paragraphText = (p: Props) => (p.length === "custom" ? p.text ?? "" : lorem(p.length));

// ---------- The blocks ----------
export const BLOCKS: Record<string, BlockDef> = {
  heading: {
    label: "Heading", group: "Text", hint: "Section heading", wide: false,
    defaults: () => ({ text: "Lorem ipsum dolor sit amet" }),
    fields: [{ kind: "text", key: "text", label: "Heading" }],
    render: (p) => <h2>{p.text}</h2>,
    mdx: (p) => `## ${escText(p.text)}`,
  },
  paragraph: {
    label: "Paragraph", group: "Text", hint: "Body text, any length", wide: false,
    defaults: () => ({ length: "medium", text: "" }),
    fields: [
      { kind: "select", key: "length", label: "Length", options: LENGTHS },
      { kind: "textarea", key: "text", label: "Your text (used when 'My own text' is chosen)" },
    ],
    render: (p) => <p>{paragraphText(p)}</p>,
    mdx: (p) => escText(paragraphText(p)),
  },
  list: {
    label: "Bullet list", group: "Text", hint: "A short list", wide: false,
    defaults: () => ({ items: "Lorem ipsum dolor sit amet consectetur\nSed do eiusmod tempor incididunt\nUt enim ad minim veniam quis nostrud" }),
    fields: [{ kind: "lines", key: "items", label: "Items", hint: "One per line" }],
    render: (p) => <ul>{lines(p.items).map((i, k) => <li key={k}>{i}</li>)}</ul>,
    mdx: (p) => lines(p.items).map((i) => `- ${escText(i)}`).join("\n"),
  },
  split: {
    label: "Text beside a screen", group: "Text", hint: "Text on one side, a screen on the other", wide: true,
    defaults: () => ({ side: "right", eyebrow: "Lorem ipsum", heading: "Dolor sit amet consectetur", text: lorem("medium"), variant: "dashboard" }),
    fields: [
      { kind: "select", key: "side", label: "Screen is on the", options: [["right", "Right"], ["left", "Left"]] },
      { kind: "text", key: "eyebrow", label: "Small label (optional)" },
      { kind: "text", key: "heading", label: "Heading" },
      { kind: "textarea", key: "text", label: "Text" },
      { kind: "select", key: "variant", label: "Placeholder screen", options: VARIANTS },
    ],
    render: (p) => <Split side={p.side} eyebrow={p.eyebrow} heading={p.heading} text={p.text} variant={p.variant} />,
    mdx: (p) => jsx("Split", { side: p.side, eyebrow: p.eyebrow, heading: p.heading, text: p.text, variant: p.variant }),
  },
  screen: {
    label: "Full-width screen", group: "Screens", hint: "One screenshot, full width", wide: true,
    defaults: () => ({ variant: "dashboard", caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }),
    fields: [
      { kind: "select", key: "variant", label: "Placeholder screen", options: VARIANTS },
      { kind: "text", key: "caption", label: "Caption" },
    ],
    render: (p) => <Screen variant={p.variant} caption={p.caption} />,
    mdx: (p) => jsx("Screen", { variant: p.variant, caption: p.caption }),
  },
  shotpair: {
    label: "Two screens side by side", group: "Screens", hint: "Compare or pair two views", wide: true,
    defaults: () => ({ left: "dashboard", right: "mobile", caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }),
    fields: [
      { kind: "select", key: "left", label: "Left screen", options: VARIANTS },
      { kind: "select", key: "right", label: "Right screen", options: VARIANTS },
      { kind: "text", key: "caption", label: "Caption" },
    ],
    render: (p) => <ShotPair left={p.left} right={p.right} caption={p.caption} />,
    mdx: (p) => jsx("ShotPair", { left: p.left, right: p.right, caption: p.caption }),
  },
  beforeafter: {
    label: "Before and after", group: "Screens", hint: "The old way next to the new", wide: true,
    defaults: () => ({ before: "dashboard", after: "editor", beforeNote: "Lorem ipsum dolor sit amet.", afterNote: "Sed do eiusmod tempor.", caption: "" }),
    fields: [
      { kind: "select", key: "before", label: "Before screen", options: VARIANTS },
      { kind: "select", key: "after", label: "After screen", options: VARIANTS },
      { kind: "text", key: "beforeNote", label: "Note under Before" },
      { kind: "text", key: "afterNote", label: "Note under After" },
      { kind: "text", key: "caption", label: "Caption" },
    ],
    render: (p) => <BeforeAfter before={p.before} after={p.after} beforeNote={p.beforeNote} afterNote={p.afterNote} caption={p.caption} />,
    mdx: (p) => jsx("BeforeAfter", { before: p.before, after: p.after, beforeNote: p.beforeNote, afterNote: p.afterNote, caption: p.caption }),
  },
  annotated: {
    label: "Annotated screen", group: "Screens", hint: "Numbered pins with notes", wide: true,
    defaults: () => ({
      variant: "assistant", caption: "Lorem ipsum dolor sit amet.",
      pins: [
        { x: 30, y: 24, title: "Lorem ipsum dolor", text: "Sit amet consectetur adipiscing elit sed do eiusmod." },
        { x: 56, y: 62, title: "Ut enim ad minim", text: "Veniam quis nostrud exercitation ullamco laboris." },
      ],
    }),
    fields: [
      { kind: "select", key: "variant", label: "Placeholder screen", options: VARIANTS },
      { kind: "text", key: "caption", label: "Caption" },
      { kind: "list", key: "pins", label: "Pins", itemLabel: "Pin", blank: () => ({ x: 50, y: 50, title: "New note", text: "Lorem ipsum dolor sit amet." }),
        fields: [
          { kind: "number", key: "x", label: "Across (0 to 100)", min: 0, max: 100 },
          { kind: "number", key: "y", label: "Down (0 to 100)", min: 0, max: 100 },
          { kind: "text", key: "title", label: "Title" },
          { kind: "textarea", key: "text", label: "Note" },
        ] },
    ],
    render: (p) => <Annotated variant={p.variant} caption={p.caption} pins={p.pins} />,
    mdx: (p) => jsx("Annotated", { variant: p.variant, caption: p.caption, pins: p.pins }),
  },
  prototype: {
    label: "Embedded prototype", group: "Screens", hint: "A playable prototype", wide: true,
    defaults: () => ({ variant: "assistant", title: "Lorem ipsum prototype", caption: "Playable in the page." }),
    fields: [
      { kind: "select", key: "variant", label: "Placeholder screen", options: VARIANTS },
      { kind: "text", key: "title", label: "Title" },
      { kind: "text", key: "caption", label: "Caption" },
    ],
    render: (p) => <PrototypeFrame variant={p.variant} title={p.title} caption={p.caption} />,
    mdx: (p) => jsx("PrototypeFrame", { variant: p.variant, title: p.title, caption: p.caption }),
  },
  statrow: {
    label: "Numbers row", group: "Evidence", hint: "A run of headline numbers", wide: true,
    defaults: () => ({ stats: [{ value: "38%", label: "Lorem ipsum dolor" }, { value: "4.6", label: "Sit amet" }, { value: "2×", label: "Consectetur elit" }] }),
    fields: [{ kind: "list", key: "stats", label: "Numbers", itemLabel: "Number", blank: () => ({ value: "00", label: "Lorem ipsum" }),
      fields: [{ kind: "text", key: "value", label: "Number" }, { kind: "text", key: "label", label: "Label" }] }],
    render: (p) => <StatRow stats={p.stats} />,
    mdx: (p) => jsx("StatRow", { stats: p.stats }),
  },
  compare: {
    label: "Before and after table", group: "Evidence", hint: "Measures, before, after, change", wide: true,
    defaults: () => ({
      caption: "Lorem ipsum dolor sit amet.",
      rows: [
        { label: "Lorem ipsum", before: "42%", after: "78%", change: "+36 pts" },
        { label: "Dolor sit amet", before: "18 min", after: "6 min", change: "−67%" },
      ],
    }),
    fields: [
      { kind: "text", key: "caption", label: "Caption" },
      { kind: "list", key: "rows", label: "Rows", itemLabel: "Row", blank: () => ({ label: "Lorem ipsum", before: "0", after: "0", change: "0" }),
        fields: [{ kind: "text", key: "label", label: "Measure" }, { kind: "text", key: "before", label: "Before" }, { kind: "text", key: "after", label: "After" }, { kind: "text", key: "change", label: "Change" }] },
    ],
    render: (p) => <CompareTable caption={p.caption} rows={p.rows} />,
    mdx: (p) => jsx("CompareTable", { caption: p.caption, rows: p.rows }),
  },
  threeup: {
    label: "Three columns", group: "Evidence", hint: "Three short points side by side", wide: true,
    defaults: () => ({
      items: [
        { label: "What we tested", title: "Lorem ipsum dolor", text: "Sit amet consectetur adipiscing elit, sed do eiusmod tempor." },
        { label: "What we learned", title: "Ut enim ad minim", text: "Veniam quis nostrud exercitation ullamco laboris nisi." },
        { label: "What changed", title: "Duis aute irure", text: "Dolor in reprehenderit in voluptate velit esse cillum." },
      ],
    }),
    fields: [{ kind: "list", key: "items", label: "Columns", itemLabel: "Column", blank: () => ({ label: "Label", title: "Lorem ipsum", text: "Dolor sit amet consectetur." }),
      fields: [{ kind: "text", key: "label", label: "Small label" }, { kind: "text", key: "title", label: "Title" }, { kind: "textarea", key: "text", label: "Text" }] }],
    render: (p) => <ThreeUp items={p.items} />,
    mdx: (p) => jsx("ThreeUp", { items: p.items }),
  },
  pullquote: {
    label: "Pull quote", group: "Story", hint: "A voice from a user or stakeholder", wide: false,
    defaults: () => ({ who: "Lorem Ipsum", role: "Dolor sit amet", text: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil." }),
    fields: [
      { kind: "select", key: "variant", label: "Style", options: [["mark", "Quote mark"], ["rule", "Side rule"], ["statement", "Statement"], ["panel", "Panel"]] },
      { kind: "textarea", key: "text", label: "Quote" }, { kind: "text", key: "who", label: "Who" }, { kind: "text", key: "role", label: "Role" },
    ],
    render: (p) => <PullQuote who={p.who} role={p.role} variant={p.variant ?? "mark"}>{p.text}</PullQuote>,
    mdx: (p) => jsx("PullQuote", { who: p.who, role: p.role, variant: p.variant && p.variant !== "mark" ? p.variant : undefined }, p.text),
  },
  callout: {
    label: "Callout", group: "Story", hint: "A key insight or constraint", wide: false,
    defaults: () => ({ label: "Key insight", text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit." }),
    fields: [
      { kind: "select", key: "variant", label: "Style", options: [["tint", "Tinted box"], ["outline", "Outline"], ["marker", "Side marker"], ["split", "Split"]] },
      { kind: "text", key: "label", label: "Label" }, { kind: "textarea", key: "text", label: "Text" },
    ],
    render: (p) => <Callout label={p.label} variant={p.variant ?? "tint"}>{p.text}</Callout>,
    mdx: (p) => jsx("Callout", { label: p.label, variant: p.variant && p.variant !== "tint" ? p.variant : undefined }, p.text),
  },
  sticky: {
    label: "Sticky note", group: "Story", hint: "A narrated aside", wide: false,
    defaults: () => ({ label: "Note to self", text: "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis." }),
    fields: [{ kind: "text", key: "label", label: "Label" }, { kind: "textarea", key: "text", label: "Text" }],
    render: (p) => <Sticky label={p.label}>{p.text}</Sticky>,
    mdx: (p) => jsx("Sticky", { label: p.label }, p.text),
  },
  decision: {
    label: "The hard call", group: "Story", hint: "Options considered and what was chosen", wide: true,
    defaults: () => ({
      question: "Lorem ipsum dolor sit amet consectetur?",
      note: "Qui officia deserunt mollit anim id est laborum.",
      options: [
        { name: "Sed do eiusmod", verdict: "Chosen", why: "Tempor incididunt ut labore et dolore magna aliqua." },
        { name: "Ut aliquip ex ea", verdict: "Rejected", why: "Commodo consequat duis aute irure dolor." },
        { name: "Cillum dolore eu", verdict: "Deferred", why: "Fugiat nulla pariatur excepteur sint occaecat." },
      ],
    }),
    fields: [
      { kind: "text", key: "question", label: "The question" },
      { kind: "list", key: "options", label: "Options", itemLabel: "Option", blank: () => ({ name: "New option", verdict: "Rejected", why: "Lorem ipsum dolor sit amet." }),
        fields: [{ kind: "text", key: "name", label: "Option" }, { kind: "select", key: "verdict", label: "Outcome", options: VERDICTS }, { kind: "textarea", key: "why", label: "Why" }] },
      { kind: "textarea", key: "note", label: "Closing note (optional)" },
    ],
    render: (p) => <Decision id={undefined} question={p.question} options={p.options}>{p.note || undefined}</Decision>,
    mdx: (p) => jsx("Decision", { id: "decision", question: p.question, options: p.options }, p.note || undefined),
  },
  timeline: {
    label: "Timeline", group: "Story", hint: "How the work evolved over time", wide: true,
    defaults: () => ({
      stages: [
        { when: "2023", title: "Lorem ipsum dolor", text: "Sit amet consectetur adipiscing elit, sed do eiusmod tempor.", statValue: "1.2k", statLabel: "ad minim" },
        { when: "2024", title: "Quis nostrud exercitation", text: "Ullamco laboris nisi ut aliquip ex ea commodo consequat.", statValue: "", statLabel: "" },
        { when: "2025", title: "Excepteur sint occaecat", text: "Cupidatat non proident, sunt in culpa qui officia.", statValue: "6k", statLabel: "velit esse" },
      ],
    }),
    fields: [{ kind: "list", key: "stages", label: "Stages", itemLabel: "Stage", blank: () => ({ when: "2026", title: "Lorem ipsum", text: "Dolor sit amet consectetur.", statValue: "", statLabel: "" }),
      fields: [{ kind: "text", key: "when", label: "When" }, { kind: "text", key: "title", label: "Title" }, { kind: "textarea", key: "text", label: "Text" }, { kind: "text", key: "statValue", label: "Number (optional)" }, { kind: "text", key: "statLabel", label: "Number label" }] }],
    render: (p) => <Timeline stages={timelineStages(p)} />,
    mdx: (p) => jsx("Timeline", { stages: timelineStages(p) }),
  },
  retro: {
    label: "Retrospective", group: "Reflect", hint: "What worked, what to change, what's next", wide: true,
    defaults: () => ({ worked: "Lorem ipsum dolor sit amet\nSed do eiusmod tempor incididunt", change: "Ut enim ad minim veniam\nDuis aute irure dolor", next: "Excepteur sint occaecat cupidatat" }),
    fields: [
      { kind: "lines", key: "worked", label: "What worked", hint: "One per line" },
      { kind: "lines", key: "change", label: "What I'd change", hint: "One per line" },
      { kind: "lines", key: "next", label: "What's next (optional)", hint: "One per line" },
    ],
    render: (p) => <Retrospective worked={lines(p.worked)} change={lines(p.change)} next={lines(p.next).length ? lines(p.next) : undefined} />,
    mdx: (p) => jsx("Retrospective", { worked: lines(p.worked), change: lines(p.change), next: lines(p.next).length ? lines(p.next) : undefined }),
  },
  divider: {
    label: "Divider", group: "Text", hint: "A thin rule between sections", wide: false,
    defaults: () => ({}),
    fields: [],
    render: () => <Divider />,
    mdx: () => "<Divider />",
  },
};

function timelineStages(p: Props) {
  return (p.stages as Props[]).map((s) => ({
    when: s.when, title: s.title, text: s.text,
    ...(s.statValue ? { stat: { value: s.statValue, label: s.statLabel } } : {}),
  }));
}

export type BlockType = keyof typeof BLOCKS;
export const BLOCK_TYPES = Object.keys(BLOCKS) as BlockType[];
