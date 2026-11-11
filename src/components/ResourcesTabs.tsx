"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export interface ResourceTab {
  slug: string;
  name: string;
  description: string;
  count: number;
  posts: { slug: string; title: string; date: string }[];
}

/**
 * NerdWallet "More resources" panel — a row of category tabs; the active
 * tab shows a description card plus quick links to recent articles.
 */
export default function ResourcesTabs({ tabs }: { tabs: ResourceTab[] }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  if (!tab) return null;

  return (
    <div>
      {/* Category tabs */}
      <div className="flex gap-1.5 overflow-x-auto border-b border-nerd-100 pb-px no-scrollbar">
        {tabs.map((t, i) => (
          <button
            key={t.slug}
            type="button"
            onClick={() => setActive(i)}
            className={`whitespace-nowrap rounded-t-xl border-b-2 px-4 py-3 text-sm font-bold transition ${
              active === i
                ? "border-nerd-700 bg-nerd-50/60 text-nerd-700"
                : "border-transparent text-ink-700 hover:bg-nerd-50/40 hover:text-nerd-700"
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="grid gap-8 rounded-b-2xl py-8 lg:grid-cols-2">
        <div>
          <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink-950">{tab.name}</h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted">
            {tab.description ||
              `Guides, explainers and analysis on ${tab.name.toLowerCase()} — written in plain English for Indian investors.`}
          </p>
          <Link
            href={`/category/${tab.slug}`}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-nerd-800"
          >
            View all {tab.name} articles <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-2 font-mono text-[11px] text-muted">{tab.count} articles published</p>
        </div>

        <ul className="divide-y divide-nerd-100/80">
          {tab.posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/post/${p.slug}`} className="group flex items-center justify-between gap-4 py-3.5">
                <div className="min-w-0">
                  <p className="line-clamp-2 text-sm font-bold leading-snug text-ink-900 transition group-hover:text-nerd-700">
                    {p.title}
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] text-muted">{formatDate(p.date)}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-nerd-700" />
              </Link>
            </li>
          ))}
          {tab.posts.length === 0 && (
            <li className="py-6 text-sm text-muted">No articles yet — check back soon.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
