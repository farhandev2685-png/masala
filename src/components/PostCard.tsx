import Link from "next/link";
import { Clock, ArrowUpRight, BookOpen } from "lucide-react";
import { postAuthor, stripHtml, WPPost } from "@/lib/wp";
import { formatDate, readingTime, timeAgo } from "@/lib/utils";
import PostImage from "./PostImage";
import CategoryBadge from "./CategoryBadge";

/** Large hero card — featured story overlay */
export function HeroCard({ post, priority = false }: { post: WPPost; priority?: boolean }) {
  const mins = readingTime(post.content.rendered);
  return (
    <Link
      href={`/post/${post.slug}`}
      className="group relative block h-full overflow-hidden rounded-2xl bg-nerd-950 shadow-terminal ring-1 ring-white/10 transition-all hover:shadow-card-hover"
    >
      <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[480px]">
        <PostImage post={post} priority={priority} className="transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-nerd-950 via-nerd-950/70 to-nerd-950/10" />
        <div className="absolute left-5 top-5 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-nerd-700 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            <BookOpen className="h-3 w-3" /> Featured
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
          <div className="mb-3 flex flex-wrap items-center gap-2.5">
            <CategoryBadge post={post} interactive={false} />
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-stone-200 backdrop-blur-sm">
              <Clock className="h-3 w-3 text-nerd-300" /> {mins} min read
            </span>
          </div>
          <h2 className="font-display text-xl font-extrabold leading-snug tracking-tight text-white transition group-hover:text-nerd-200 sm:text-3xl">
            {stripHtml(post.title.rendered)}
          </h2>
          <p className="mt-2.5 line-clamp-2 hidden max-w-2xl text-sm leading-relaxed text-stone-300 sm:block">
            {stripHtml(post.excerpt.rendered)}
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-stone-300">
            <span className="font-mono text-[11px] text-stone-400">Published {timeAgo(post.date)}</span>
            <span className="inline-flex items-center gap-1 font-semibold text-nerd-300 transition group-hover:translate-x-0.5">
              Read Full Report <ArrowUpRight className="h-3.5 w-3.5" />
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
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <CategoryBadge post={post} variant="text" interactive={false} />
        <h3 className="mt-2 line-clamp-2 font-display text-[15.5px] font-bold leading-snug text-ink-950 transition group-hover:text-nerd-700">
          {stripHtml(post.title.rendered)}
        </h3>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">
          {stripHtml(post.excerpt.rendered)}
        </p>
        <p className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-muted">
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
