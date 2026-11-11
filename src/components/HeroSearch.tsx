"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

/** NerdWallet-hero style search pill — routes to /search?q= */
export default function HeroSearch() {
  const [q, setQ] = useState("");
  const router = useRouter();

  return (
    <form
      className="mx-auto flex w-full max-w-xl items-center gap-2 rounded-full bg-white p-1.5 pl-4 shadow-lg shadow-nerd-900/10 ring-1 ring-nerd-200 transition focus-within:ring-2 focus-within:ring-nerd-700"
      onSubmit={(e) => {
        e.preventDefault();
        const v = q.trim();
        router.push(v ? `/search?q=${encodeURIComponent(v)}` : "/search");
      }}
    >
      <Sparkles className="h-4 w-4 shrink-0 text-nerd-700" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Ask me about SIPs, IPOs, Nifty…"
        aria-label="Search articles and guides"
        className="w-full min-w-0 flex-1 bg-transparent text-sm font-medium text-ink-950 outline-none placeholder:text-muted"
      />
      <button
        type="submit"
        aria-label="Search"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-nerd-700 text-white transition hover:bg-nerd-800"
      >
        <ArrowRight className="h-[18px] w-[18px]" />
      </button>
    </form>
  );
}
