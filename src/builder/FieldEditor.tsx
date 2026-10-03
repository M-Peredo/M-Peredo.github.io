/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import type { Field, Props } from "./registry";

type Change = (key: string, value: any) => void;

function One({ field, value, onChange, id }: { field: Field; value: any; onChange: (v: any) => void; id: string }) {
  switch (field.kind) {
    case "text":
      return <input id={id} className="bi" value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
    case "textarea":
      return <textarea id={id} className="bi" rows={3} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
    case "lines":
      return <textarea id={id} className="bi" rows={4} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
    case "number":
      return <input id={id} className="bi" type="number" min={field.min} max={field.max} value={value ?? 0} onChange={(e) => onChange(Number(e.target.value))} />;
    case "select":
      return (
        <select id={id} className="bi" value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
          {field.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      );
    case "list": {
      const items: Props[] = value ?? [];
      const set = (next: Props[]) => onChange(next);
      const move = (i: number, d: number) => {
        const j = i + d;
        if (j < 0 || j >= items.length) return;
        const next = items.slice();
        [next[i], next[j]] = [next[j], next[i]];
        set(next);
      };
      return (
        <div className="blist">
          {items.map((it, i) => (
            <fieldset key={i} className="bitem">
              <legend>{field.itemLabel} {i + 1}</legend>
              <div className="bitem-tools">
                <button type="button" onClick={() => move(i, -1)} aria-label="Move up">↑</button>
                <button type="button" onClick={() => move(i, 1)} aria-label="Move down">↓</button>
                <button type="button" onClick={() => set(items.filter((_, k) => k !== i))} aria-label="Remove">✕</button>
              </div>
              <Fields fields={field.fields} values={it} idPrefix={`${id}-${i}`} onChange={(k, v) => set(items.map((x, n) => (n === i ? { ...x, [k]: v } : x)))} />
            </fieldset>
          ))}
          <button type="button" className="bbtn" onClick={() => set([...items, field.blank()])}>+ Add {field.itemLabel.toLowerCase()}</button>
        </div>
      );
    }
  }
}

export function Fields({ fields, values, onChange, idPrefix }: { fields: Field[]; values: Props; onChange: Change; idPrefix: string }) {
  return (
    <div className="bfields">
      {fields.map((f) => {
        const id = `${idPrefix}-${f.key}`;
        return (
          <div key={f.key} className="bfield">
            <label htmlFor={id}>{f.label}{f.kind === "lines" && f.hint ? <em> · {f.hint}</em> : null}</label>
            <One field={f} id={id} value={values[f.key]} onChange={(v) => onChange(f.key, v)} />
          </div>
        );
      })}
    </div>
  );
}
