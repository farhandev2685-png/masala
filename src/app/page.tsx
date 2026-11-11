import Link from "next/link";
import { getCategories, getPosts, postAuthor, stripHtml, WPAuthor, WPPost } from "@/lib/wp";
import { TOPICS } from "@/lib/constants";
import { GridCard, HeroCard } from "@/components/PostCard";
import SectionHeader from "@/components/SectionHeader";
import ToolsTabs from "@/components/ToolsTabs";
import ResourcesTabs, { ResourceTab } from "@/components/ResourcesTabs";
import WritersSection from "@/components/WritersSection";
import NewsletterSection from "@/components/NewsletterSection";
import PostImage from "@/components/PostImage";
import { timeAgo } from "@/lib/utils";
import {
  ArrowUpRight,
  BadgeCheck,
  Globe,
  GraduationCap,
  PiggyBank,
  Receipt,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";

export const revalidate = 120;

const TOPIC_ICONS: Record<string, typeof TrendingUp> = {
  markets: TrendingUp,
  ipo: Rocket,
  "mutual-funds": PiggyBank,
  "personal-finance": Wallet,
  insurance: ShieldCheck,
  tax: Receipt,
  learn: GraduationCap,
  "global-markets": Globe,
};

export default async function HomePage() {
  const [categories, { posts: latest, total: totalArticles }] = await Promise.all([
    getCategories().catch(() => []),
    getPosts({ perPage: 24 }).catch(() => ({ posts: [], total: 0, totalPages: 0 })),
  ]);

  const validSlugs = new Set(categories.map((c) => c.slug));
  const topics = TOPICS.filter((t) => validSlugs.has(t.slug));

  // Top story + "Latest" headline rail — LADbible-style lead block
  const railPosts = latest.slice(1, 5);
  // Recommended reads — horizontally scrollable
  const news = latest.slice(5, 11);
  // Blog feed — the next posts, in a proper grid
  const blogPosts = latest.slice(11, 23);
  const newsHref = validSlugs.has("news")
    ? "/category/news"
    : validSlugs.has("markets")
      ? "/category/markets"
      : undefined;

  // IPO watchdesk — latest posts in the IPO category
  const ipoCat = categories.find((c) => c.slug === "ipo");
  const { posts: ipoPosts } = ipoCat
    ? await getPosts({ categories: ipoCat.id, perPage: 4 }).catch(() => ({
        posts: [] as WPPost[],
        total: 0,
        totalPages: 0,
      }))
    : { posts: [] as WPPost[] };

  // "More resources" — top categories, each with recent post links
  const resources: ResourceTab[] = (
    await Promise.all(
      categories.slice(0, 7).map(async (cat) => {
        const { posts } = await getPosts({ categories: cat.id, perPage: 3 }).catch(() => ({
          posts: [] as WPPost[],
          total: 0,
          totalPages: 0,
        }));
        return {
          slug: cat.slug,
          name: cat.name,
          description: cat.description ?? "",
          count: cat.count ?? posts.length,
          posts: posts.map((p) => ({
            slug: p.slug,
            title: stripHtml(p.title.rendered),
            date: p.date,
          })),
        };
      })
    )
  ).filter((t) => t.posts.length > 0 || t.count > 0);

  // Writers — unique authors pulled from recent posts (must have a display name)
  const authors = Array.from(
    new Map(
      latest
        .map((p) => postAuthor(p))
        .filter((a): a is WPAuthor => Boolean(a?.name))
        .map((a) => [a.id, a])
    ).values()
  );

  return (
    <>
      {/* ======================= HERO — light mint panel, search + topic cards ======================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-nerd-50 via-nerd-50/70 to-white">
        {/* subtle texture + glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: "radial-gradient(rgba(217,119,6,0.08) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-nerd-200/40 blur-3xl"
        />
        <div className="relative mx-auto max-w-site px-4 pb-12 pt-10 sm:px-6 sm:pt-12">
          {/* Top Story + Latest rail — LADbible-style lead block */}
          <div className="grid gap-7 lg:grid-cols-[1.55fr_1fr] lg:gap-9">
            {latest[0] && (
              <div>
                <p className="mb-3.5 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink-950">
                  <span className="h-2 w-2 rounded-full bg-nerd-700" /> Top Story
                </p>
                <HeroCard post={latest[0]} priority />
              </div>
            )}
            {railPosts.length > 0 && (
              <div>
                <p className="mb-3.5 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-ink-950">
                  <span className="h-2 w-2 rounded-full bg-nerd-700" /> Latest
                </p>
                <div className="divide-y divide-nerd-100 border-t border-nerd-100">
                  {railPosts.map((p) => (
                    <Link key={p.id} href={`/post/${p.slug}`} className="group flex items-start gap-3.5 py-4">
                      <div className="relative h-[76px] w-[112px] shrink-0 overflow-hidden rounded-lg bg-nerd-100 ring-1 ring-ink-950/[0.06]">
                        <PostImage post={p} size="medium" className="transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-nerd-700">
                          {timeAgo(p.date)}
                        </span>
                        <h3 className="mt-1 line-clamp-2 font-display text-[15px] font-bold leading-snug text-ink-950 transition group-hover:text-nerd-700">
                          {stripHtml(p.title.rendered)}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Topics — bordered cell strip */}
          {topics.length > 0 && (
            <div className="mt-10">
              <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted">Explore by topic</p>
              <div className="grid grid-cols-2 overflow-hidden rounded-xl border border-nerd-100 bg-white sm:grid-cols-4">
                {topics.map((t) => {
                  const Icon = TOPIC_ICONS[t.slug] ?? TrendingUp;
                  return (
                    <Link
                      key={t.slug}
                      href={`/category/${t.slug}`}
                      className="group flex min-h-[76px] items-center gap-3 border-b border-r border-nerd-100 bg-white px-4 py-3 transition-colors hover:bg-nerd-50 sm:px-5"
                    >
                      <Icon className="h-5 w-5 shrink-0 text-nerd-700" strokeWidth={1.75} />
                      <span className="min-w-0">
                        <span className="block text-sm font-bold text-ink-950 transition group-hover:text-nerd-700">{t.label}</span>
                        <span className="mt-0.5 hidden text-[11px] leading-snug text-muted sm:block">{t.blurb}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ======================= TRUST — why readers trust us (real counts only) ======================= */}
      <section className="border-b border-nerd-100 bg-white">
        <div className="mx-auto grid max-w-site items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-14">
          <div className="relative hidden lg:block" aria-hidden>
            <div className="relative rounded-2xl border border-nerd-100 bg-cream p-6 shadow-card">
              <div className="flex items-center justify-between border-b border-nerd-100 pb-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-muted">The Long Game</p>
                  <p className="mt-1 font-display text-lg font-bold text-ink-950">Compounding, visualised</p>
                </div>
                <span className="rounded-full bg-nerd-100 px-3 py-1 font-mono text-[11px] font-bold text-nerd-700">
                  ₹ over time
                </span>
              </div>
              <svg viewBox="0 0 480 220" className="mt-4 h-auto w-full" role="img">
                <defs>
                  <linearGradient id="heroFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[40, 85, 130, 175].map((y) => (
                  <line key={y} x1="0" y1={y} x2="480" y2={y} stroke="#FEF3C7" strokeWidth="1" />
                ))}
                <path
                  d="M0 190 C 80 178, 130 160, 190 132 C 250 104, 300 96, 360 62 C 400 40, 445 26, 480 14 L480 220 L0 220 Z"
                  fill="url(#heroFill)"
                />
                <path
                  d="M0 190 C 80 178, 130 160, 190 132 C 250 104, 300 96, 360 62 C 400 40, 445 26, 480 14"
                  fill="none"
                  stroke="#D97706"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M0 196 C 90 190, 170 178, 250 168 C 330 158, 410 150, 480 142"
                  fill="none"
                  stroke="#B45309"
                  strokeWidth="1.5"
                  strokeDasharray="5 6"
                  opacity="0.5"
                />
                <circle cx="360" cy="62" r="5" fill="#fff" stroke="#D97706" strokeWidth="3" />
                <circle cx="480" cy="14" r="5" fill="#F59E0B" />
              </svg>
              <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted">
                <span>Year 0</span>
                <span>Year 5</span>
                <span>Year 10</span>
                <span>Year 20</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl">
              Why Indian investors trust Masala
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted">
              Plain-English guides and honest, data-driven analysis — no paid stock tips, no hype,
              no jargon without a definition.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-4">
              <div className="rounded-2xl bg-nerd-50 p-4 ring-1 ring-nerd-100">
                <dd className="font-display text-3xl font-extrabold text-nerd-700">{totalArticles}+</dd>
                <dt className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
                  Articles published
                </dt>
              </div>
              <div className="rounded-2xl bg-nerd-50 p-4 ring-1 ring-nerd-100">
                <dd className="font-display text-3xl font-extrabold text-nerd-700">{categories.length}</dd>
                <dt className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
                  Money topics covered
                </dt>
              </div>
              <div className="rounded-2xl bg-nerd-50 p-4 ring-1 ring-nerd-100">
                <dd className="font-display text-3xl font-extrabold text-nerd-700">Free</dd>
                <dt className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
                  Cost to read
                </dt>
              </div>
            </dl>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-ink-700">
              <BadgeCheck className="h-4 w-4 text-nerd-700" />
              Every article is reviewed for clarity and accuracy before it ships.
            </div>
          </div>
        </div>
      </section>

      {/* ======================= NEWS — horizontally scrollable carousel ======================= */}
      {news.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-site px-4 py-14 sm:px-6">
            <SectionHeader title="Recommended reads" href={newsHref} />
            <div className="-mx-4 overflow-x-auto px-4 pb-2 no-scrollbar sm:-mx-6 sm:px-6">
              <div className="flex snap-x snap-mandatory gap-5">
                {news.map((p) => (
                  <div key={p.id} className="w-[270px] shrink-0 snap-start sm:w-[300px]">
                    <GridCard post={p} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ======================= LATEST BLOGS — article grid ======================= */}
      {blogPosts.length > 0 && (
        <section className="border-t border-nerd-100 bg-cream">
          <div className="mx-auto max-w-site px-4 py-14 sm:px-6">
            <SectionHeader title="Latest articles & research" href={newsHref} />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {blogPosts.map((p) => (
                <GridCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======================= CALCULATORS — mint panel + tabbed tools ======================= */}
      <section id="calculators" className="bg-nerd-50 scroll-mt-24">
        <div className="mx-auto max-w-site px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl">
              Do the math on your next money move
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
              Interactive calculators for SIPs, goals and budgets — pick a tool and see the numbers.
            </p>
          </div>
          <div className="mt-8">
            <ToolsTabs />
          </div>
        </div>
      </section>

      {/* ======================= IPO WATCHDESK — dark promo panel ======================= */}
      {ipoPosts.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-site px-4 py-14 sm:px-6">
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-nerd-800 via-nerd-700 to-nerd-800 p-6 shadow-xl shadow-nerd-800/20 ring-1 ring-white/10 sm:p-9">
              <div className="mb-7 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-nerd-500/15 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-nerd-300 ring-1 ring-nerd-500/30">
                    <Rocket className="h-3 w-3" /> Primary Market Intelligence
                  </span>
                  <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                    IPO Watchdesk
                  </h2>
                  <p className="mt-1.5 max-w-xl text-sm text-nerd-100/70">
                    DRHP financials, peer comparisons and risk factors — read the research before you bid.
                  </p>
                </div>
                <Link
                  href="/category/ipo"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-nerd-800 transition hover:bg-nerd-100"
                >
                  View All IPO Reviews <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {ipoPosts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/post/${p.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl bg-white/[0.07] ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-white/[0.12] hover:ring-nerd-300/40"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-nerd-950">
                      <PostImage post={p} size="medium_large" className="transition-transform duration-500 group-hover:scale-105" />
                      <span className="absolute left-2.5 top-2.5 rounded-full bg-nerd-950/85 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-nerd-300 backdrop-blur-sm">
                        IPO Analysis
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <span className="font-mono text-[11px] font-semibold text-nerd-100/60">
                        {new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                      <h3 className="mt-1.5 line-clamp-2 font-display text-[15px] font-bold leading-snug text-white transition group-hover:text-nerd-100">
                        {stripHtml(p.title.rendered)}
                      </h3>
                      <span className="mt-auto inline-flex items-center gap-1 pt-3 text-[11px] font-semibold text-nerd-200">
                        Read Verdict <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ======================= MORE RESOURCES — category tabs ======================= */}
      {resources.length > 0 && (
        <section className="border-t border-nerd-100 bg-white">
          <div className="mx-auto max-w-site px-4 py-14 sm:px-6">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl">
              More resources for every money move
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
              Dig into a topic — every desk is packed with guides, explainers and analysis.
            </p>
            <div className="mt-6">
              <ResourcesTabs tabs={resources} />
            </div>
          </div>
        </section>
      )}

      {/* ======================= WRITERS + EDITORIAL PROMISE ======================= */}
      <WritersSection authors={authors} />

      {/* ======================= NEWSLETTER BAND ======================= */}
      <NewsletterSection />
    </>
  );
}
