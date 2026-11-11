import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import { postAuthor, stripHtml, WPPost } from "@/lib/wp";
import { formatDate, readingTime, timeAgo } from "@/lib/utils";
import PostImage from "./PostImage";
import CategoryBadge from "./CategoryBadge";

/** Large hero card — uncropped 16:9 visual + clean editorial body */
export function HeroCard({ post, priority = false }: { post: WPPost; priority?: boolean }) {
  const mins = readingTime(post.content.rendered);
  const author = postAuthor(post);
  const authorLabel = author?.name || "Masala Research Desk";
  const initial = author?.name?.trim().charAt(0).toUpperCase() || "म";

  return (
    <Link
      href={`/post/${post.slug}`}
      className="group flex flex-1 flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-ink-950/[0.08] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover hover:ring-nerd-700/35"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-ink-950/[0.06] bg-nerd-50">
        <PostImage
          post={post}
          size="full"
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 720px"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
        <div className="flex flex-wrap items-center gap-2.5">
          <CategoryBadge post={post} interactive={false} />
          <span className="inline-flex items-center gap-1 font-mono text-[11px] font-medium text-muted">
            <Clock className="h-3.5 w-3.5 text-nerd-700" /> {mins} min read
          </span>
          <span className="text-stone-300">•</span>
          <span className="font-mono text-[11px] font-medium text-muted">{timeAgo(post.date)}</span>
        </div>

        <h2 className="mt-3.5 font-display text-2xl font-extrabold leading-[1.2] tracking-tight text-ink-950 transition-colors group-hover:text-nerd-700 sm:text-[27px]">
          {stripHtml(post.title.rendered)}
        </h2>

        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-ink-700/85 sm:text-[15px] sm:leading-7">
          {stripHtml(post.excerpt.rendered)}
        </p>

        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between gap-4 border-t border-nerd-100/90 pt-4">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-nerd-100 font-display text-xs font-extrabold text-nerd-800 ring-1 ring-nerd-200/80">
                {initial}
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-ink-900">{authorLabel}</p>
                <p className="font-mono text-[10.5px] text-muted">{formatDate(post.date)}</p>
              </div>
            </div>

            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-nerd-50 px-3.5 py-1.5 text-xs font-bold text-nerd-800 ring-1 ring-nerd-200/80 transition-all group-hover:bg-nerd-700 group-hover:text-white group-hover:ring-nerd-700">
              Read story <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/** Standard image-on-top card — NerdWallet news-card style (author + date) */
export function GridCard({ post }: { post: WPPost }) {
  const author = postAuthor(post);
  return (
    <Link
      href={`/post/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-ink-950/[0.06] transition-all hover:-translate-y-1 hover:shadow-card-hover hover:ring-nerd-700/40"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-nerd-50">
        <PostImage post={post} className="transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        <CategoryBadge post={post} variant="text" interactive={false} />
        <h3 className="mt-1.5 line-clamp-3 font-display text-[13.5px] font-bold leading-snug text-ink-950 transition group-hover:text-nerd-700 sm:mt-2 sm:line-clamp-2 sm:text-[15.5px]">
          {stripHtml(post.title.rendered)}
        </h3>
        <p className="mt-2 hidden line-clamp-2 text-xs leading-relaxed text-muted sm:block">
          {stripHtml(post.excerpt.rendered)}
        </p>
        <p className="mt-auto flex items-center gap-1.5 pt-2.5 text-[11px] font-medium text-muted sm:mt-3 sm:pt-0">
          {author && <span className="font-semibold text-ink-700">{author.name}</span>}
          {author && <span className="text-stone-300">·</span>}
          <span>{formatDate(post.date)}</span>
        </p>
      </div>
    </Link>
  );
}

/** Horizontal row card — thumbnail right, numbered list style */
export function RowCard({ post, index }: { post: WPPost; index?: number }) {
  const mins = readingTime(post.content.rendered);
  return (
    <Link
      href={`/post/${post.slug}`}
      className="group flex items-start gap-3.5 border-b border-nerd-100/70 py-3.5 last:border-0 first:pt-0 last:pb-0"
    >
      {typeof index === "number" && (
        <span className="hidden w-6 shrink-0 pt-0.5 font-mono text-sm font-extrabold text-nerd-700/80 sm:block">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <CategoryBadge post={post} variant="text" interactive={false} />
          <span className="text-stone-300">•</span>
          <span className="font-mono text-[10px] font-medium text-muted">{mins} min read</span>
        </div>
        <h3 className="mt-1 line-clamp-2 font-display text-sm font-bold leading-snug text-ink-900 transition group-hover:text-nerd-700">
          {stripHtml(post.title.rendered)}
        </h3>
        <p className="mt-1 font-mono text-[11px] text-muted">{timeAgo(post.date)}</p>
      </div>
      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-nerd-50 ring-1 ring-ink-950/[0.06] sm:h-20 sm:w-28">
        <PostImage post={post} size="medium" className="transition-transform duration-500 group-hover:scale-105" />
      </div>
    </Link>
  );
}

/** Wide horizontal card for archive & search pages */
export function ArchiveCard({ post }: { post: WPPost }) {
  const mins = readingTime(post.content.rendered);
  return (
    <Link
      href={`/post/${post.slug}`}
      className="group flex flex-col gap-4 overflow-hidden rounded-2xl bg-white p-4 shadow-card ring-1 ring-ink-950/[0.06] transition-all hover:-translate-y-0.5 hover:shadow-card-hover hover:ring-nerd-700/40 sm:flex-row sm:p-5"
    >
      <div className="relative aspect-[16/9] shrink-0 overflow-hidden rounded-xl bg-nerd-50 sm:aspect-auto sm:h-36 sm:w-56">
        <PostImage post={post} size="medium_large" className="transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2">
          <CategoryBadge post={post} variant="text" interactive={false} />
          <span className="text-stone-300">•</span>
          <span className="font-mono text-xs text-muted">{mins} min read</span>
        </div>
        <h3 className="mt-1.5 line-clamp-2 font-display text-lg font-bold leading-snug text-ink-950 transition group-hover:text-nerd-700">
          {stripHtml(post.title.rendered)}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{stripHtml(post.excerpt.rendered)}</p>
        <p className="mt-auto pt-3 font-mono text-xs text-muted">{timeAgo(post.date)}</p>
      </div>
    </Link>
  );
}
