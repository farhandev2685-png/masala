"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "@/lib/constants";

/**
 * NerdWallet-style desktop navigation — top-level items open a wide
 * mega-menu panel with grouped link columns on hover / focus.
 */
export default function NavMenu({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const enter = (i: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(i);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 120);
  };

  const active = open !== null ? items[open] : null;

  return (
    <nav className="relative hidden flex-1 lg:block" onMouseLeave={leave} aria-label="Primary">
      <ul className="flex items-center">
        {items.map((item, i) => (
          <li key={item.href} onMouseEnter={() => enter(i)}>
            <Link
              href={item.href}
              onFocus={() => enter(i)}
              aria-expanded={open === i}
              className={`flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                open === i ? "bg-nerd-50 text-nerd-700" : "text-ink-800 hover:bg-nerd-50 hover:text-nerd-800"
              }`}
            >
              {item.label}
              {item.menu && (
                <ChevronDown
                  className={`h-3.5 w-3.5 text-muted transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                />
              )}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mega dropdown panel */}
      {active?.menu && active.menu.length > 0 && (
        <div
          className="absolute left-0 right-0 top-full pt-3"
          onMouseEnter={() => enter(open!)}
          onMouseLeave={leave}
        >
          <div className="overflow-hidden rounded-2xl bg-white shadow-menu ring-1 ring-ink-950/[0.06]">
            <div className="flex items-center justify-between border-b border-nerd-100 bg-nerd-50/60 px-7 py-3">
              <span className="font-display text-sm font-bold text-ink-950">{active.label}</span>
              <Link href={active.href} className="text-xs font-bold text-nerd-700 hover:text-nerd-800">
                View all {active.label} →
              </Link>
            </div>
            <div
              className="grid gap-8 px-7 py-6"
              style={{ gridTemplateColumns: `repeat(${Math.min(active.menu.length, 4)}, minmax(0,1fr))` }}
            >
              {active.menu.map((col) => (
                <div key={col.heading}>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                    {col.heading}
                  </p>
                  <ul className="mt-3 space-y-1">
                    {col.links.map((l) => (
                      <li key={l.label + l.href}>
                        <Link
                          href={l.href}
                          className="-mx-2 block rounded-lg px-2 py-1.5 text-sm font-semibold text-ink-800 transition hover:bg-nerd-50 hover:text-nerd-800"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
