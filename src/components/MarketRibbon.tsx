"use client";

import Link from "next/link";
import { Newspaper } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type RibbonItem = { slug: string; title: string; rel: string };

/** Latest-articles ticker — auto-scrolls like a market tape; drag to scrub, hover/touch pauses. */
export default function MarketRibbon({ items }: { items: RibbonItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });
  const hover = useRef(false);
  const [dragging, setDragging] = useState(false);

  // auto-scroll loop — items render twice; wrap at the halfway point for a seamless tape
  useEffect(() => {
    const el = trackRef.current;
    if (!el || items.length === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = performance.now();
    const step = (t: number) => {
      const dt = Math.min(50, t - last);
      last = t;
      const half = el.scrollWidth / 2;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
      if (!drag.current.down && !hover.current && el.scrollWidth > el.clientWidth) {
        el.scrollLeft += 40 * (dt / 1000);
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [items.length]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!trackRef.current) return;
    const isMouse = e.pointerType === "mouse";
    if (isMouse) e.preventDefault();
    drag.current = { down: true, startX: e.clientX, startScroll: trackRef.current.scrollLeft, moved: false };

    const move = (ev: PointerEvent) => {
      const dx = ev.clientX - drag.current.startX;
      if (!drag.current.down || (Math.abs(dx) <= 6 && !drag.current.moved)) return;
      drag.current.moved = true;
      setDragging(true);
      trackRef.current!.scrollLeft = drag.current.startScroll - dx;
    };
    const up = () => {
      drag.current.down = false;
      setDragging(false);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    if (isMouse) window.addEventListener("pointermove", move);
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (!drag.current.moved) return;
    e.preventDefault();
    e.stopPropagation();
    drag.current.moved = false;
  };

  if (!items.length) return null;

  return (
    <div className="border-b border-nerd-100 bg-nerd-50/70 text-xs">
      <div className="mx-auto flex max-w-site items-center gap-4 px-4 py-2 sm:px-6">
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-white px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-nerd-700 ring-1 ring-nerd-200">
          <Newspaper className="h-3 w-3 text-nerd-700" />
          Latest
        </span>

        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onClickCapture={onClickCapture}
          onMouseEnter={() => (hover.current = true)}
          onMouseLeave={() => (hover.current = false)}
          className={`flex items-center gap-5 divide-x divide-nerd-200/70 overflow-x-auto no-scrollbar ${
            dragging ? "cursor-grabbing select-none" : "cursor-grab"
          }`}
        >
          {[...items, ...items].map((it, i) => (
            <Link
              key={`${it.slug}-${i}`}
              href={`/post/${it.slug}`}
              draggable={false}
              aria-hidden={i >= items.length}
              tabIndex={i >= items.length ? -1 : undefined}
              className={`group flex shrink-0 items-baseline gap-2 whitespace-nowrap ${i > 0 ? "pl-5" : ""}`}
            >
              <span className="font-semibold text-ink-800 transition group-hover:text-nerd-700">{it.title}</span>
              <span className="font-mono text-[10px] text-muted">{it.rel}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
