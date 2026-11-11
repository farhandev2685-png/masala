import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Clock, ShieldAlert, Sparkles, ListOrdered, CheckCircle2 } from "lucide-react";
import { getPostBySlug, getRelatedPosts, postAuthor, postTags, stripHtml, WP_BASE } from "@/lib/wp";
import { formatDateTime, readingTime } from "@/lib/utils";
import PostImage from "@/components/PostImage";
import CategoryBadge from "@/components/CategoryBadge";
import { GridCard } from "@/components/PostCard";
import SectionHeader from "@/components/SectionHeader";
import ShareButtons from "@/components/ShareButtons";
import SipCalculator from "@/components/SipCalculator";

export const revalidate = 120;

type Props = { params: { slug: string } };

/** Extract H2 headings and inject anchor IDs into HTML for Table of Contents */
function processHeadings(html: string): { html: string; toc: { id: string; text: string }[] } {
  const toc: { id: string; text: string }[] = [];
  const processed = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (match, attrs, inner) => {
    const text = stripHtml(inner);
    if (!text) return match;
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 60);
    toc.push({ id, text });
    if (/id=/i.test(attrs)) return match;
    return `<h2 id="${id}"${attrs}>${inner}</h2>`;
  });
  return { html: processed, toc };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug).catch(() => null);
  if (!post) return { title: "Article not found" };
  const title = stripHtml(post.title.rendered);
  const description = stripHtml(post.excerpt.rendered).slice(0, 160);
  const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  return {
    title,
    description,
    openGraph: { title, description, type: "article", images: image ? [image] : undefined },
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug).catch(() => null);
  if (!post) notFound();

  const author = postAuthor(post);
  const tags = postTags(post);
  const related = await getRelatedPosts(post, 4).catch(() => []);
  const url = `${WP_BASE}/${post.slug}/`;
  const { html: bodyHtml, toc } = processHeadings(post.content.rendered);
  const excerptText = stripHtml(post.excerpt.rendered);

  return (
    <article className="mx-auto max-w-site px-4 py-8 sm:px-6">
      {/* Article Header */}
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center gap-2.5">
          <CategoryBadge post={post} />
          <span className="inline-flex items-center gap-1 rounded-full bg-nerd-50 px-2.5 py-0.5 font-mono text-xs font-semibold text-nerd-700 ring-1 ring-nerd-100">
            <CheckCircle2 className="h-3.5 w-3.5" /> Fact-Checked Research
          </span>
          <span className="flex items-center gap-1 font-mono text-xs font-medium text-muted">
            <Clock className="h-3.5 w-3.5 text-nerd-700" /> {readingTime(post.content.rendered)} min read
          </span>
        </div>

        <h1 className="mt-4 font-display text-2xl font-extrabold leading-tight tracking-tight text-ink-950 sm:text-4xl lg:text-[40px]">
          {stripHtml(post.title.rendered)}
        </h1>

        {/* Executive Summary / Research Brief Box */}
        {excerptText && (
          <div className="mt-5 rounded-2xl border border-nerd-200 bg-gradient-to-br from-nerd-50 to-white p-5">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-nerd-700">
              <Sparkles className="h-3.5 w-3.5" /> Executive Summary
            </div>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-800">{excerptText}</p>
          </div>
        )}

        {/* Author & Share Meta Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3.5 shadow-card ring-1 ring-ink-950/[0.06]">
          <div className="flex items-center gap-3">
            {author?.avatar_urls?.["48"] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={author.avatar_urls["48"]} alt={author.name} className="h-10 w-10 rounded-full ring-2 ring-nerd-100" />
            ) : (
              <span className="grid h-10 w-10 place-items-center rounded-full bg-nerd-700 font-display text-sm font-bold text-white">
                {(author?.name ?? "S")[0]}
              </span>
            )}
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-ink-950">{author?.name ?? "Stock Market Masala"}</p>
                <span className="rounded-full bg-nerd-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-nerd-700 ring-1 ring-nerd-100">
                  Research Desk
                </span>
              </div>
              <p className="font-mono text-[11px] text-muted">
                Published {formatDateTime(post.date)}
                {post.modified !== post.date && ` · Updated ${formatDateTime(post.modified)}`}
              </p>
            </div>
          </div>
          <ShareButtons url={url} title={stripHtml(post.title.rendered)} />
        </div>
      </div>

      {/* Featured Chart / Hero Image */}
      <div className="mx-auto mt-7 max-w-4xl overflow-hidden rounded-2xl bg-nerd-950 shadow-card ring-1 ring-ink-950/[0.06]">
        <div className="relative aspect-[16/9]">
          <PostImage post={post} priority />
        </div>
      </div>

      {/* Two-Column Research Layout: Main Report + Sticky TOC / Calculator Sidebar */}
      <div className="mx-auto mt-10 grid max-w-6xl gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {/* Mobile Table of Contents */}
          {toc.length > 1 && (
            <div className="mb-8 rounded-2xl bg-white p-5 shadow-card ring-1 ring-ink-950/[0.06] lg:hidden">
              <div className="flex items-center gap-2 font-display text-xs font-extrabold uppercase tracking-wider text-ink-950">
                <ListOrdered className="h-4 w-4 text-nerd-700" /> In This Research Report
              </div>
              <ol className="mt-3 space-y-2 text-sm">
                {toc.map((item, idx) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="flex items-baseline gap-2 text-ink-700 transition hover:text-nerd-700"
                    >
                      <span className="font-mono text-xs font-bold text-nerd-700">
                        {String(idx + 1).padStart(2, "0")}.
                      </span>
                      <span>{item.text}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Main Article Body Card */}
          <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-ink-950/[0.06] sm:p-10">
            <div className="article-body" dangerouslySetInnerHTML={{ __html: bodyHtml }} />

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2 border-t border-nerd-100 pt-6">
                {tags.slice(0, 12).map((t) => (
                  <span
                    key={t.id}
                    className="rounded-lg border border-nerd-100 bg-nerd-50/60 px-3 py-1 font-mono text-xs font-semibold text-ink-700"
                  >
                    #{t.name}
                  </span>
                ))}
              </div>
            )}

            {/* Advisory & Regulatory Disclosure Box */}
            <div className="mt-8 rounded-xl border border-nerd-100 bg-nerd-50/60 p-4 text-xs leading-relaxed text-ink-700">
              <div className="flex items-center gap-2 font-display font-bold text-ink-950">
                <ShieldAlert className="h-4 w-4 text-nerd-700" /> Investor Advisory Disclosure
              </div>
              <p className="mt-1">
                This analysis is prepared by Stock Market Masala for educational and informational purposes only. Nothing
                herein should be construed as a buy/sell recommendation. Securities market investments are subject to
                market risks — always verify figures with official filings (SEBI/NSE/BSE) or consult a certified
                financial planner.
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Sidebar */}
        <aside className="space-y-6 lg:col-span-4">
          <div className="sticky top-32 space-y-6">
            {toc.length > 1 && (
              <div className="hidden rounded-2xl bg-white p-5 shadow-card ring-1 ring-ink-950/[0.06] lg:block">
                <div className="flex items-center gap-2 border-b border-nerd-100 pb-3 font-display text-xs font-extrabold uppercase tracking-wider text-ink-950">
                  <ListOrdered className="h-4 w-4 text-nerd-700" /> Report Navigation
                </div>
                <ol className="mt-3 space-y-2.5 text-xs">
                  {toc.map((item, idx) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="flex items-start gap-2 font-medium text-ink-700 transition hover:text-nerd-700"
                      >
                        <span className="font-mono text-[11px] font-bold text-nerd-700">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="line-clamp-2 leading-snug">{item.text}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <SipCalculator />
          </div>
        </aside>
      </div>

      {/* Related Reports */}
      {related.length > 0 && (
        <div className="mx-auto mt-14 max-w-6xl">
          <SectionHeader title="Related research & analysis" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <GridCard key={p.id} post={p} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
