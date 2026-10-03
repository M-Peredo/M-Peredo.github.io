import Link from "next/link";
import type { CaseStudy } from "@/lib/case-studies";
import { contentStyle } from "@/lib/color";
import { ArrowRight } from "./icons";
import { Stage } from "./Shot";
import { VARIANTS } from "@/lib/variants";

export function CaseStudyCard({ study, featured = false }: { study: CaseStudy; featured?: boolean }) {
  return (
    <Link href={`/work/${study.slug}`} className={`card ${featured ? "card-featured" : ""}`} style={contentStyle(study.color)}>
      <Stage variant={VARIANTS[study.slug] ?? "dashboard"} label={false} />
      <div className="card-text">
        <span className="card-meta">{study.dateline}</span>
        <h3>{study.title}</h3>
        <p className="card-hook">{study.hook}</p>
        <ul className="tags">
          {study.tags.map((t) => <li key={t} className="tag">{t}</li>)}
        </ul>
        <span className="card-cta">Read case study <ArrowRight /></span>
      </div>
    </Link>
  );
}
