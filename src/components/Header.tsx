import Link from "next/link";
import { Search } from "lucide-react";
import { NAV_ITEMS, SITE, type NavItem } from "@/lib/constants";
import { getCategories, getPosts, stripHtml } from "@/lib/wp";
import { timeAgo } from "@/lib/utils";
import MobileNav from "./MobileNav";
import MarketRibbon from "./MarketRibbon";
import NavMenu from "./NavMenu";

/** Drop menu links that point at categories which don't exist on the WP site */
function sanitizeMenu(items: NavItem[], validSlugs: Set<string>): NavItem[] {
  const linkOk = (href: string) => {
    const m = href.match(/^\/category\/([\w-]+)/);
    return !m || validSlugs.has(m[1]);
  };
  return items.map((item) => {
    if (!item.menu) return item;
    const menu = item.menu
      .map((col) => ({ ...col, links: col.links.filter((l) => linkOk(l.href)) }))
      .filter((col) => col.links.length > 0);
    return { ...item, menu: menu.length ? menu : undefined };
  });
}

export default async function Header() {
  const [categories, latest] = await Promise.all([
    getCategories().catch(() => []),
    getPosts({ perPage: 10 }).catch(() => ({ posts: [] })),
  ]);
  const nav = sanitizeMenu(NAV_ITEMS, new Set(categories.map((c) => c.slug)));
  const ribbonItems = latest.posts.map((p) => ({
    slug: p.slug,
    title: stripHtml(p.title.rendered),
    rel: timeAgo(p.date),
  }));

  return (
    <header className="sticky top-0 z-50">
      {/* Latest Articles Ribbon — drag to scrub */}
      <MarketRibbon items={ribbonItems} />

      {/* Main Navigation Bar — clean white, NerdWallet-style */}
      <div className="border-b border-ink-950/[0.07] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-site items-center gap-4 px-4 sm:px-6">
          <Link href="/" className="group flex shrink-0 items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-nerd-700 font-display text-base font-extrabold text-white shadow-sm transition-transform group-hover:scale-105">
              म
            </span>
            <span className="font-display text-[17px] font-extrabold tracking-tight text-ink-950">
              Stock Market <span className="text-nerd-700">Masala</span>
            </span>
          </Link>

          {/* Desktop nav with mega menus */}
          <NavMenu items={nav} />

          <div className="ml-auto flex items-center gap-2.5">
            <Link
              href="/search"
              className="flex items-center gap-2 rounded-full border border-ink-950/10 bg-white px-4 py-2 text-xs font-semibold text-ink-800 transition hover:border-nerd-700 hover:text-nerd-800"
              aria-label="Search Research & Articles"
            >
              <Search className="h-3.5 w-3.5 text-nerd-700" />
              <span className="hidden whitespace-nowrap sm:inline">Search SIPs, IPOs, stocks…</span>
            </Link>
            <Link
              href="/#newsletter"
              className="hidden rounded-full bg-ink-950 px-4 py-2 text-xs font-bold text-white transition hover:bg-nerd-800 sm:inline-block"
            >
              Subscribe
            </Link>
            <MobileNav items={nav} />
          </div>
        </div>
      </div>
    </header>
  );
}
