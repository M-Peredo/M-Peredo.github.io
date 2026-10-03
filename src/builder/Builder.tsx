/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import type { CaseStudy } from "@/lib/case-studies";
import { contentStyle } from "@/lib/color";
import { SummaryBlock } from "@/components/ui/SummaryBlock";
import { Stage } from "@/components/ui/Shot";
import { BLOCKS, GROUPS, type BlockType, type Field } from "./registry";
import { PRESETS, SOURCE_COLORS, defaultMeta, newBlock, newId, toMdx, type Block, type Doc } from "./doc";
import { Fields } from "./FieldEditor";

const KEY_CUR = "mollybuilder:v1:current";
const KEY_SAVED = "mollybuilder:v1:saved";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
}

const clone = <T,>(v: T): T => JSON.parse(JSON.stringify(v));
const validDoc = (d: any): d is Doc => d && Array.isArray(d.blocks) && d.meta && typeof d.name === "string";

const SUMMARY_FIELDS: Field[] = [
  { kind: "text", key: "title", label: "Title" },
  { kind: "textarea", key: "hook", label: "One-line hook" },
  { kind: "text", key: "dateline", label: "Small label above the title" },
  { kind: "text", key: "role", label: "Role" },
  { kind: "text", key: "timeline", label: "Timeline" },
  { kind: "text", key: "domain", label: "Domain" },
  { kind: "text", key: "tags", label: "Tags (comma separated)" },
  { kind: "list", key: "metrics", label: "Headline numbers", itemLabel: "Number", blank: () => ({ value: "00", label: "Lorem ipsum" }),
    fields: [{ kind: "text", key: "value", label: "Number" }, { kind: "text", key: "label", label: "Label" }] },
  { kind: "select", key: "hero", label: "Hero placeholder screen", options: [["dashboard", "Dashboard"], ["assistant", "AI assistant"], ["editor", "Editor"], ["mobile", "Mobile"]] },
  { kind: "text", key: "slug", label: "File name (slug)" },
];

type DragState = { kind: "new"; type: BlockType } | { kind: "move"; id: string } | null;

export default function Builder() {
  const [doc, setDoc] = useState<Doc>(() => {
    const cur = read<unknown>(KEY_CUR, null);
    return validDoc(cur) ? cur : PRESETS["Deep dive (end to end)"]();
  });
  const [saved, setSaved] = useState<Record<string, Doc>>(() => read(KEY_SAVED, {}));
  const [sel, setSel] = useState<string>("summary");
  const [drag, setDrag] = useState<DragState>(null);
  const [dropAt, setDropAt] = useState<number | null>(null);
  const [exportOpen, setExportOpen] = useState(false);
  const [tab, setTab] = useState<"mdx" | "json">("mdx");
  const [jsonText, setJsonText] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => { write(KEY_CUR, doc); }, [doc]);
  useEffect(() => { write(KEY_SAVED, saved); }, [saved]);

  const flash = (t: string) => { setMsg(t); window.setTimeout(() => setMsg(""), 2500); };
  const meta = doc.meta;
  const selIndex = doc.blocks.findIndex((b) => b.id === sel);

  // ---------- Document edits ----------
  const setBlocks = (blocks: Block[]) => setDoc((d) => ({ ...d, blocks }));
  const setMeta = (patch: Partial<typeof meta>) => setDoc((d) => ({ ...d, meta: { ...d.meta, ...patch } }));

  function insert(type: BlockType, at?: number) {
    const b = newBlock(type);
    const index = at ?? (selIndex >= 0 ? selIndex + 1 : doc.blocks.length);
    const next = doc.blocks.slice();
    next.splice(index, 0, b);
    setBlocks(next);
    setSel(b.id);
  }
  function move(id: string, to: number) {
    const from = doc.blocks.findIndex((b) => b.id === id);
    if (from < 0) return;
    const next = doc.blocks.slice();
    const [b] = next.splice(from, 1);
    next.splice(to > from ? to - 1 : to, 0, b);
    setBlocks(next);
  }
  function step(id: string, d: number) {
    const i = doc.blocks.findIndex((b) => b.id === id);
    const j = i + d;
    if (i < 0 || j < 0 || j >= doc.blocks.length) return;
    const next = doc.blocks.slice();
    [next[i], next[j]] = [next[j], next[i]];
    setBlocks(next);
  }
  function duplicate(id: string) {
    const i = doc.blocks.findIndex((b) => b.id === id);
    if (i < 0) return;
    const copy: Block = { ...clone(doc.blocks[i]), id: newId() };
    const next = doc.blocks.slice();
    next.splice(i + 1, 0, copy);
    setBlocks(next);
    setSel(copy.id);
  }
  function remove(id: string) {
    setBlocks(doc.blocks.filter((b) => b.id !== id));
    setSel("summary");
  }
  function setProp(id: string, key: string, value: any) {
    setBlocks(doc.blocks.map((b) => (b.id === id ? { ...b, props: { ...b.props, [key]: value } } : b)));
  }

  // ---------- Drag and drop ----------
  function overBlock(e: React.DragEvent, index: number) {
    if (!drag) return;
    e.preventDefault();
    e.stopPropagation();
    const r = e.currentTarget.getBoundingClientRect();
    setDropAt(e.clientY < r.top + r.height / 2 ? index : index + 1);
  }
  function finishDrop(e: React.DragEvent) {
    e.preventDefault();
    if (drag && dropAt !== null) {
      if (drag.kind === "new") insert(drag.type, dropAt);
      else move(drag.id, dropAt);
    }
    setDrag(null);
    setDropAt(null);
  }

  // ---------- Templates ----------
  function load(value: string) {
    if (!value) return;
    const [kind, name] = [value.slice(0, value.indexOf(":")), value.slice(value.indexOf(":") + 1)];
    const d = kind === "preset" ? PRESETS[name]?.() : saved[name] ? clone(saved[name]) : null;
    if (d) { setDoc(d); setSel("summary"); flash(`Loaded "${name}"`); }
  }
  function saveTemplate() {
    const name = doc.name.trim() || "Untitled layout";
    setSaved((s) => ({ ...s, [name]: clone({ ...doc, name }) }));
    flash(`Saved "${name}"`);
  }
  function deleteSaved(name: string) {
    setSaved((s) => { const n = { ...s }; delete n[name]; return n; });
  }

  // ---------- Export ----------
  const mdx = toMdx(doc);
  async function copy(text: string, what: string) {
    try { await navigator.clipboard.writeText(text); flash(`${what} copied`); }
    catch { flash("Select the text and press Cmd+C"); }
  }
  function openExport() { setJsonText(JSON.stringify(doc, null, 2)); setExportOpen(true); }
  function importJson() {
    try {
      const d = JSON.parse(jsonText);
      if (!validDoc(d)) throw new Error("bad");
      setDoc(d); setSel("summary"); setExportOpen(false); flash("Layout loaded");
    } catch { flash("That doesn't look like a saved layout"); }
  }

  // ---------- Canvas ----------
  const study: CaseStudy = {
    slug: meta.slug, status: "draft", order: 9, title: meta.title, dateline: meta.dateline, hook: meta.hook, color: meta.color,
    role: meta.role, timeline: meta.timeline, domain: meta.domain,
    tags: meta.tags.split(",").map((t) => t.trim()).filter(Boolean), metrics: meta.metrics, source: "",
  };
  const types = new Set(doc.blocks.map((b) => b.type));
  const selBlock = doc.blocks.find((b) => b.id === sel);
  const chosen = sel === "summary" ? null : selBlock ? BLOCKS[selBlock.type] : null;

  return (
    <div className="builder">
      <header className="btop">
        <strong className="btitle">Layout builder <span>dev only</span></strong>
        <input className="bi bname" aria-label="Layout name" value={doc.name} onChange={(e) => setDoc({ ...doc, name: e.target.value })} />
        <select className="bi bselect" aria-label="Start from a template" value="" onChange={(e) => load(e.target.value)}>
          <option value="">Start from…</option>
          <optgroup label="Starting points">
            {Object.keys(PRESETS).map((n) => <option key={n} value={`preset:${n}`}>{n}</option>)}
          </optgroup>
          {Object.keys(saved).length > 0 && (
            <optgroup label="My saved layouts">
              {Object.keys(saved).map((n) => <option key={n} value={`saved:${n}`}>{n}</option>)}
            </optgroup>
          )}
        </select>
        <button type="button" className="bbtn" onClick={saveTemplate}>Save layout</button>
        {saved[doc.name.trim()] && <button type="button" className="bbtn bbtn-quiet" onClick={() => deleteSaved(doc.name.trim())}>Delete saved</button>}
        <span className="bspacer" />
        {msg && <span className="bmsg" role="status">{msg}</span>}
        <button type="button" className="bbtn bbtn-primary" onClick={openExport}>Export</button>
      </header>

      <div className="bmain">
        <aside className="bpalette" aria-label="Blocks">
          <p className="bhelp">Drag a block onto the page, or click to add it after the selected block.</p>
          {GROUPS.map((g) => (
            <section key={g}>
              <h2>{g}</h2>
              {(Object.keys(BLOCKS) as BlockType[]).filter((t) => BLOCKS[t].group === g).map((t) => (
                <button
                  key={t}
                  type="button"
                  className="bpal"
                  draggable
                  onDragStart={(e) => { e.dataTransfer.setData("text/plain", t); e.dataTransfer.effectAllowed = "copy"; setDrag({ kind: "new", type: t }); }}
                  onDragEnd={() => { setDrag(null); setDropAt(null); }}
                  onClick={() => insert(t)}
                >
                  <b>{BLOCKS[t].label}</b>
                  <span>{BLOCKS[t].hint}</span>
                </button>
              ))}
            </section>
          ))}
        </aside>

        <section className="bcanvas" aria-label="Page preview" onDragOver={(e) => { if (drag) e.preventDefault(); }} onDrop={finishDrop}>
          <div className="canvas-page">
            <div className="container" style={contentStyle(meta.color)}>
              <div className={`bsel ${sel === "summary" ? "is-selected" : ""}`} onClick={() => setSel("summary")}>
                <div className="cs-head">
                  <span className="back">← All work</span>
                  <SummaryBlock study={study} hasPrototype={types.has("prototype")} hasDecision={types.has("decision")} />
                </div>
                <div className="cs-hero"><Stage variant={meta.hero as any} /></div>
              </div>

              <div className="prose cs-body">
                {doc.blocks.length === 0 && (
                  <div
                    className="bempty"
                    onDragOver={(e) => { if (drag) { e.preventDefault(); setDropAt(0); } }}
                  >
                    Drag a block here to start.
                  </div>
                )}
                {doc.blocks.map((b, i) => {
                  const def = BLOCKS[b.type];
                  const cls = ["bwrap", def.wide ? "wide" : "", sel === b.id ? "is-selected" : "",
                    dropAt === i ? "drop-before" : "", dropAt === doc.blocks.length && i === doc.blocks.length - 1 ? "drop-after" : "",
                    drag?.kind === "move" && drag.id === b.id ? "is-dragging" : ""].filter(Boolean).join(" ");
                  return (
                    <div key={b.id} className={cls} onClick={() => setSel(b.id)} onDragOver={(e) => overBlock(e, i)}>
                      <div className="btools" onClick={(e) => e.stopPropagation()}>
                        <span
                          className="bhandle"
                          draggable
                          title="Drag to move"
                          onDragStart={(e) => {
                            e.dataTransfer.setData("text/plain", b.id);
                            e.dataTransfer.effectAllowed = "move";
                            const wrap = (e.currentTarget as HTMLElement).closest(".bwrap");
                            if (wrap) e.dataTransfer.setDragImage(wrap, 0, 0);
                            setDrag({ kind: "move", id: b.id });
                          }}
                          onDragEnd={() => { setDrag(null); setDropAt(null); }}
                        >⠿ {def.label}</span>
                        <button type="button" onClick={() => step(b.id, -1)} aria-label="Move up">↑</button>
                        <button type="button" onClick={() => step(b.id, 1)} aria-label="Move down">↓</button>
                        <button type="button" onClick={() => duplicate(b.id)} aria-label="Duplicate">⧉</button>
                        <button type="button" onClick={() => remove(b.id)} aria-label="Delete">✕</button>
                      </div>
                      {def.render(b.props)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <aside className="binspector" aria-label="Edit">
          {sel === "summary" && (
            <>
              <h2>Summary and page</h2>
              <div className="bfield">
                <span className="blabel">Case study color</span>
                <div className="bswatches">
                  {SOURCE_COLORS.map(([n, hex]) => (
                    <button key={hex} type="button" className={`bswatch ${meta.color.toLowerCase() === hex.toLowerCase() ? "on" : ""}`} style={{ background: hex }} aria-label={n} title={n} onClick={() => setMeta({ color: hex })} />
                  ))}
                  <input className="bcolor" type="color" aria-label="Pick any color" value={/^#[0-9a-fA-F]{6}$/.test(meta.color) ? meta.color : "#4A44C6"} onChange={(e) => setMeta({ color: e.target.value })} />
                </div>
              </div>
              <Fields fields={SUMMARY_FIELDS} values={meta} idPrefix="meta" onChange={(k, v) => setMeta({ [k]: v } as any)} />
            </>
          )}
          {chosen && selBlock && (
            <>
              <h2>{chosen.label}</h2>
              {chosen.fields.length === 0 ? <p className="bhelp">Nothing to edit on this one.</p> : (
                <Fields key={selBlock.id} fields={chosen.fields} values={selBlock.props} idPrefix={selBlock.id} onChange={(k, v) => setProp(selBlock.id, k, v)} />
              )}
              <div className="bactions">
                <button type="button" className="bbtn" onClick={() => duplicate(selBlock.id)}>Duplicate</button>
                <button type="button" className="bbtn bbtn-quiet" onClick={() => remove(selBlock.id)}>Delete</button>
              </div>
            </>
          )}
        </aside>
      </div>

      {exportOpen && (
        <div className="bmodal" role="dialog" aria-modal="true" aria-label="Export">
          <div className="bmodal-card">
            <div className="bmodal-head">
              <div className="btabs" role="tablist">
                <button type="button" role="tab" aria-selected={tab === "mdx"} onClick={() => setTab("mdx")}>Case study file (MDX)</button>
                <button type="button" role="tab" aria-selected={tab === "json"} onClick={() => setTab("json")}>Layout (JSON)</button>
              </div>
              <button type="button" className="bbtn bbtn-quiet" onClick={() => setExportOpen(false)}>Close</button>
            </div>
            {tab === "mdx" ? (
              <>
                <p className="bhelp">A real case study file, in the format the site uses. Save it as <code>content/case-studies/{meta.slug}.mdx</code> or hand it to Claude to turn into the finished page.</p>
                <textarea className="bi bcode" readOnly value={mdx} onFocus={(e) => e.currentTarget.select()} />
                <div className="bactions"><button type="button" className="bbtn bbtn-primary" onClick={() => copy(mdx, "MDX")}>Copy MDX</button></div>
              </>
            ) : (
              <>
                <p className="bhelp">The layout itself. Copy it to share with someone, or paste a layout here and load it.</p>
                <textarea className="bi bcode" value={jsonText} onChange={(e) => setJsonText(e.target.value)} />
                <div className="bactions">
                  <button type="button" className="bbtn" onClick={() => copy(jsonText, "Layout")}>Copy layout</button>
                  <button type="button" className="bbtn bbtn-primary" onClick={importJson}>Load pasted layout</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export { defaultMeta };
