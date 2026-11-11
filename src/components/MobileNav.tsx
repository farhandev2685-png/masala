"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import type { NavItem } from "@/lib/constants";

export default function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
        className="grid h-10 w-10 place-items-center rounded-full border border-ink-950/10 text-ink-900 transition hover:bg-nerd-50"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 top-16 z-40 bg-ink-950/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <nav className="absolute inset-x-0 top-16 z-50 max-h-[80vh] overflow-y-auto border-b border-ink-950/10 bg-white p-4 shadow-menu">
            <ul className="grid gap-1">
              {items.map((item, i) => (
                <li key={item.href}>
                  {item.menu ? (
                    <>
                      <div className="flex items-center">
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="flex-1 rounded-lg px-4 py-3 font-display text-base font-bold text-ink-950 transition hover:bg-nerd-50"
                        >
                          {item.label}
                        </Link>
                        <button
                          onClick={() => setExpanded(expanded === i ? null : i)}
                          aria-label={`Expand ${item.label}`}
                          className="grid h-10 w-10 place-items-center rounded-lg text-muted transition hover:bg-nerd-50"
                        >
                          <ChevronDown className={`h-4 w-4 transition-transform ${expanded === i ? "rotate-180" : ""}`} />
                        </button>
                      </div>
                      {expanded === i && (
                        <ul className="mb-2 ml-4 border-l-2 border-nerd-100 pl-3">
                          {item.menu.flatMap((col) =>
                            col.links.map((l) => (
                              <li key={l.label + l.href}>
                                <Link
                                  href={l.href}
                                  onClick={() => setOpen(false)}
                                  className="block rounded-lg px-3 py-2 text-sm font-semibold text-ink-700 transition hover:bg-nerd-50 hover:text-nerd-800"
                                >
                                  {l.label}
                                </Link>
                              </li>
                            ))
                          )}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-4 py-3 font-display text-base font-bold text-ink-950 transition hover:bg-nerd-50"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex gap-2 border-t border-nerd-100 pt-4">
              <Link
                href="/search"
                onClick={() => setOpen(false)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-ink-950/10 px-4 py-2.5 text-sm font-bold text-ink-900"
              >
                <Search className="h-4 w-4 text-nerd-700" /> Search
              </Link>
              <Link
                href="/#newsletter"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full bg-ink-950 px-4 py-2.5 text-center text-sm font-bold text-white"
              >
                Subscribe
              </Link>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
