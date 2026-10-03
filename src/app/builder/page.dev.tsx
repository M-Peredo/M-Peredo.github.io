import type { Metadata } from "next";
import BuilderLoader from "@/builder/BuilderLoader";

export const metadata: Metadata = { title: "Layout builder", robots: { index: false, follow: false } };

// Dev only. This file's extension (.dev.tsx) is only recognized by `npm run dev`
// (see next.config.ts), so the builder is never part of the built site.
export default function BuilderPage() {
  return <BuilderLoader />;
}
