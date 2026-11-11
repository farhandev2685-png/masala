"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ initial = "" }: { initial?: string }) {
  const [value, setValue] = useState(initial);
  const router = useRouter();

  return (
    <form
      className="mt-6 flex overflow-hidden rounded-full bg-white shadow-card ring-1 ring-ink-950/10 focus-within:ring-2 focus-within:ring-nerd-700"
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim()) router.push(`/search?q=${encodeURIComponent(value.trim())}`);
      }}
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search IPOs, stocks, mutual funds…"
        className="w-full bg-transparent px-5 py-3.5 text-sm outline-none placeholder:text-stone-400"
        autoFocus={!initial}
      />
      <button
        type="submit"
        className="m-1.5 flex items-center gap-2 rounded-full bg-ink-950 px-5 text-sm font-bold text-white transition hover:bg-nerd-800"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search</span>
      </button>
    </form>
  );
}
