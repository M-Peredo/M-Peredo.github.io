"use client";

import dynamic from "next/dynamic";

// The builder reads the browser's saved layouts, so it only ever renders in the browser.
const Builder = dynamic(() => import("./Builder"), { ssr: false, loading: () => <p style={{ padding: 24 }}>Loading the builder…</p> });

export default function BuilderLoader() {
  return <Builder />;
}
