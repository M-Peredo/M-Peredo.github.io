"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play } from "./icons";

// The playable part of a prototype frame. Shows the poster until clicked, then loads the iframe at its native
// size and scales it to fit the column. Phones get the poster and the full-screen link only (the prototypes
// are built for web and tablet).
export function PrototypeEmbed({ src, title, width, height, poster }: { src: string; title: string; width: number; height: number; poster: React.ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setScale(el.clientWidth / width);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div className="proto-stage" ref={box} style={{ aspectRatio: `${width} / ${height}` }}>
      {live ? (
        <iframe
          className="proto-iframe"
          src={src}
          title={title}
          style={{ width, height, transform: `scale(${scale})` }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      ) : (
        <button type="button" className="proto-poster" onClick={() => setLive(true)} aria-label={`Play ${title}`}>
          {poster}
          <span className="proto-cta"><span className="btn btn-primary"><Play /> Try it here</span></span>
        </button>
      )}
    </div>
  );
}

export function PrototypeOpen({ src }: { src: string }) {
  return <a className="proto-open" href={src} target="_blank" rel="noopener noreferrer">Open full screen <ArrowUpRight /></a>;
}
