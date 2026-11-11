import type { Metadata } from "next";
import { SearchX } from "lucide-react";
import { getPosts } from "@/lib/wp";
import { ArchiveCard } from "@/components/PostCard";
import SearchBar from "@/components/SearchBar";

export const metadata: Metadata = { title: "Search" };
export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q ?? "").trim();
  const { posts, total } = q
    ? await getPosts({ search: q, perPage: 20 }).catch(() => ({ posts: [], total: 0, totalPages: 0 }))
    : { posts: [], total: 0 };

  return (
    <div className="mx-auto max-w-site px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-center font-display text-3xl font-extrabold tracking-tight text-ink-950">
          Search Articles
        </h1>
        <SearchBar initial={q} />
      </div>

      {q && (
        <div className="mx-auto mt-10 max-w-3xl">
          <p className="mb-6 text-sm font-medium text-muted">
            {total > 0 ? (
              <>
                <span className="font-bold text-ink-950">{total}</span> result{total !== 1 && "s"} for{" "}
                <span className="font-bold text-ink-950">“{q}”</span>
              </>
            ) : (
              ""
            )}
          </p>
          {posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((p) => (
                <ArchiveCard key={p.id} post={p} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-white py-16 text-center shadow-card">
              <SearchX className="h-10 w-10 text-stone-300" />
              <p className="font-display text-lg font-bold text-ink-950">No results for “{q}”</p>
              <p className="text-sm text-stone-400">Try different keywords — e.g. “IPO”, “Nifty”, “SIP”.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
