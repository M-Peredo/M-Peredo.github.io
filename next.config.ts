import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default function config(phase: string): NextConfig {
  const dev = phase === PHASE_DEVELOPMENT_SERVER;
  return {
    output: "export",
    images: {
      unoptimized: true,
    },
    // `*.dev.tsx` page files (the layout builder) only exist while running `npm run dev`.
    pageExtensions: dev ? ["tsx", "ts", "dev.tsx"] : ["tsx", "ts"],
  };
}
