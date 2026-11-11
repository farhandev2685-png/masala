import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getCategoryBySlug, getPosts } from "@/lib/wp";
import { ArchiveCard } from "@/components/PostCard";
import { cn } from "@/lib/utils";

export const revalidate = 120;
const PER_PAGE = 10;

type Props = { params: { slug: string }; searchParams: { page?: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = await getCategoryBySlug(params.slug).catch(() => null);
  if (!cat) return { title: "Category" };
  return { title: cat.name, description: cat.description || `Latest ${cat.name} articles` };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const cat = await getCategoryBySlug(params.slug).catch(() => null);
  if (!cat) notFound();

  const page = Math.max(1, Number(searchParams.page) || 1);
  const { posts, total, totalPages } = await getPosts({
    categories: cat.id,
    page,
    perPage: PER_PAGE,
  }).catch(() => ({ posts: [], total: 0, totalPages: 1 }));

  if (page > totalPages && totalPages > 0) notFound();

  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
    // sliding window of 5 pages around current
    const start = Math.max(1, Math.min(page - 2, totalPages - 4));
    return start + i;
  }).filter((p) => p >= 1 && p <= totalPages);

  return (
    <div className="mx-auto max-w-site px-4 py-8 sm:px-6">
      <header className="mb-8">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-nerd-700">Category</span>
        <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-ink-950 sm:text-4xl">
          {cat.name}
        </h1>
        <p className="mt-2 text-sm text-muted">
          {total} article{total !== 1 && "s"}
          {cat.description ? ` · ${cat.description}` : ""}
        </p>
      </header>

      <div className="mx-auto max-w-3xl space-y-4">
        {posts.map((p) => (
          <ArchiveCard key={p.id} post={p} />
        ))}
        {posts.length === 0 && <p className="py-16 text-center text-stone-400">No articles yet in this category.</p>}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-10 flex items-center justify-center gap-1.5" aria-label="Pagination">
          <PageBtn href={`/category/${cat.slug}?page=${page - 1}`} disabled={page <= 1}>
            <ChevronLeft className="h-4 w-4" />
          </PageBtn>
          {pages.map((n) => (
            <PageBtn key={n} href={`/category/${cat.slug}?page=${n}`} active={n === page}>
              {n}
            </PageBtn>
          ))}
          <PageBtn href={`/category/${cat.slug}?page=${page + 1}`} disabled={page >= totalPages}>
            <ChevronRight className="h-4 w-4" />
          </PageBtn>
        </nav>
      )}
    </div>
  );
}

function PageBtn({
  href,
  active,
  disabled,
  children,
}: {
  href: string;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  if (disabled) {
    return (
      <span className="grid h-10 min-w-10 cursor-not-allowed place-items-center rounded-lg bg-stone-100 px-2 text-sm font-bold text-stone-300">
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      className={cn(
        "grid h-10 min-w-10 place-items-center rounded-lg px-2 text-sm font-bold transition",
        active ? "bg-ink-950 text-white" : "bg-white text-ink-700 shadow-card hover:bg-nerd-50 hover:text-nerd-700"
      )}
    >
      {children}
    </Link>
  );
}
