import { BLOCKS, type BlockType, type Props } from "./registry";

export type Block = { id: string; type: BlockType; props: Props };

export type Meta = {
  title: string;
  hook: string;
  dateline: string;
  facts: { label: string; value: string }[];
  tags: string;
  color: string;
  hero: string;
  metrics: { value: string; label: string }[];
  slug: string;
};

export type Doc = { name: string; meta: Meta; blocks: Block[] };

export const SOURCE_COLORS: [string, string][] = [
  ["Indigo", "#4A44C6"], ["Teal", "#0FA3B1"], ["Magenta", "#C2338F"], ["Green", "#3E9B4F"], ["Orange", "#E8603C"], ["Yellow", "#F2C230"],
];

export const defaultMeta = (): Meta => ({
  title: "Lorem ipsum dolor sit amet consectetur",
  hook: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  dateline: "Lorem Ipsum · 2025",
  facts: [{ label: "Scope", value: "Lorem ipsum dolor sit amet" }, { label: "Timeline", value: "6 months" }],
  tags: "Lorem, Ipsum, Dolor",
  color: "#4A44C6",
  hero: "assistant",
  metrics: [
    { value: "38%", label: "Lorem ipsum dolor sit amet" },
    { value: "4.6", label: "Adipiscing elit sed do" },
    { value: "2×", label: "Tempor incididunt ut labore" },
  ],
  slug: "lorem-ipsum-dolor",
});

let counter = 0;
export const newId = () => `b${Date.now().toString(36)}${(counter++).toString(36)}`;

export function newBlock(type: BlockType, id?: string): Block {
  return { id: id ?? newId(), type, props: BLOCKS[type].defaults() };
}

// ---------- Presets: starting points to react to ----------
const mk = (types: BlockType[], name: string, patch: Partial<Meta> = {}): Doc => ({
  name,
  meta: { ...defaultMeta(), ...patch },
  blocks: types.map((t, i) => newBlock(t, `${name.replace(/\W+/g, "").toLowerCase()}-${i}`)),
});

export const PRESETS: Record<string, () => Doc> = {
  "Blank": () => mk([], "Blank"),
  "Deep dive (end to end)": () =>
    mk(["paragraph", "statrow", "heading", "paragraph", "callout", "heading", "annotated", "decision", "prototype", "compare", "retro"], "Deep dive (end to end)"),
  "Multi-year program": () =>
    mk(["paragraph", "heading", "paragraph", "timeline", "pullquote", "heading", "paragraph", "screen", "compare", "retro"], "Multi-year program", { color: "#0FA3B1", hero: "dashboard" }),
  "Visual first": () =>
    mk(["screen", "split", "split", "shotpair", "threeup", "beforeafter", "pullquote", "retro"], "Visual first", { color: "#C2338F", hero: "editor" }),
};

// Make the second split switch sides so the preset shows an alternating rhythm.
PRESETS["Visual first"] = (() => {
  const base = PRESETS["Visual first"];
  return () => {
    const d = base();
    const splits = d.blocks.filter((b) => b.type === "split");
    if (splits[1]) { splits[1].props.side = "left"; splits[1].props.variant = "assistant"; }
    return d;
  };
})();

// ---------- Export as a real case study file ----------
const q = (s: string) => JSON.stringify(s);

export function toMdx(doc: Doc): string {
  const m = doc.meta;
  const tags = m.tags.split(",").map((t) => t.trim()).filter(Boolean);
  const front = [
    "---",
    `title: ${q(m.title)}`,
    "status: draft",
    "order: 9",
    `color: ${q(m.color)}`,
    `dateline: ${q(m.dateline)}`,
    `hook: ${q(m.hook)}`,
    ...((m.facts ?? []).length ? ["facts:", ...m.facts.map((f) => `  - { label: ${q(f.label)}, value: ${q(f.value)} }`)] : []),
    `tags: [${tags.map(q).join(", ")}]`,
    "metrics:",
    ...m.metrics.map((x) => `  - { value: ${q(x.value)}, label: ${q(x.label)} }`),
    "---",
  ].join("\n");
  const body = doc.blocks.map((b) => BLOCKS[b.type].mdx(b.props)).join("\n\n");
  return `${front}\n\n${body}\n`;
}
