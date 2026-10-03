import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { PageShell } from "@/components/layout/PageShell";
import { SummaryBlock } from "@/components/ui/SummaryBlock";
import { Stage } from "@/components/ui/Shot";
import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import { mdxComponents } from "@/components/ui/mdx";
import { contentStyle } from "@/lib/color";
import { getBuiltCaseStudies, getCaseStudy, getNeighbours } from "@/lib/case-studies";
import { VARIANTS } from "@/lib/variants";

export const dynamicParams = false;

export function generateStaticParams() {
  return getBuiltCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.hook,
    // Unlisted case studies work at their URL but stay out of search results.
    robots: study.status === "unlisted" ? { index: false, follow: false } : undefined,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  // Case studies are our own trusted content, so JS expressions (array props) are allowed.
  const { content } = await compileMDX({ source: study.source, components: mdxComponents, options: { blockJS: false, blockDangerousJS: false } });
  const { prev, next } = getNeighbours(slug);

  return (
    <PageShell style={contentStyle(study.color)} current="work">
      <div className="container">
        <div className="cs-head">
          <Link href="/#work" className="back"><ArrowLeft /> All work</Link>
          <SummaryBlock study={study} hasPrototype={study.source.includes("<PrototypeFrame")} hasDecision={study.source.includes("<Decision")} />
        </div>

        <div className="cs-hero">
          <Stage variant={VARIANTS[study.slug] ?? "dashboard"} />
        </div>

        <article className="cs-body">
          <div className="prose">{content}</div>
        </article>

        {prev && next && (
          <nav className="pager" aria-label="More case studies">
            <Link href={`/work/${prev.slug}`} className="pager-link tinted" style={contentStyle(prev.color)}>
              <small><ArrowLeft /> Previous</small>
              <span>{prev.title}</span>
            </Link>
            <Link href={`/work/${next.slug}`} className="pager-link next tinted" style={contentStyle(next.color)}>
              <small>Next <ArrowRight /></small>
              <span>{next.title}</span>
            </Link>
          </nav>
        )}
      </div>
    </PageShell>
  );
}
