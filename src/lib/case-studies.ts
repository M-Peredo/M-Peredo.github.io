import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Each case study is one MDX file in content/case-studies/.
//   live     - listed on the home page and built at /work/<slug>
//   unlisted - built at /work/<slug> but hidden from lists and search engines
//   draft    - not built at all
export type Status = "live" | "unlisted" | "draft";

export type Metric = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  status: Status;
  order: number;
  title: string;
  dateline: string;
  hook: string;
  color: string; // source color for the content-driven background
  role: string;
  timeline: string;
  domain: string;
  tags: string[];
  metrics: Metric[];
  source: string; // MDX body
};

const DIR = path.join(process.cwd(), "content", "case-studies");

function read(file: string): CaseStudy {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  return {
    slug: file.replace(/\.mdx$/, ""),
    status: (data.status ?? "draft") as Status,
    order: Number(data.order ?? 99),
    title: String(data.title),
    dateline: String(data.dateline ?? ""),
    hook: String(data.hook ?? ""),
    color: String(data.color ?? "#4A44C6"),
    role: String(data.role ?? ""),
    timeline: String(data.timeline ?? ""),
    domain: String(data.domain ?? ""),
    tags: (data.tags ?? []) as string[],
    metrics: (data.metrics ?? []) as Metric[],
    source: content,
  };
}

function all(): CaseStudy[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(read)
    .sort((a, b) => a.order - b.order);
}

export const getLiveCaseStudies = () => all().filter((c) => c.status === "live");

// Everything that gets its own page (live + unlisted).
export const getBuiltCaseStudies = () => all().filter((c) => c.status !== "draft");

export const getCaseStudy = (slug: string) => getBuiltCaseStudies().find((c) => c.slug === slug);

// Neighbours among live case studies, for the previous / next links.
export function getNeighbours(slug: string) {
  const live = getLiveCaseStudies();
  const i = live.findIndex((c) => c.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: live[(i - 1 + live.length) % live.length],
    next: live[(i + 1) % live.length],
  };
}
