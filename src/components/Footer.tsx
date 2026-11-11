import Link from "next/link";
import { Instagram, Newspaper, Twitter, Youtube } from "lucide-react";
import { getCategories } from "@/lib/wp";
import { SITE, SOCIALS } from "@/lib/constants";

const SOCIAL_ICONS = { Instagram, X: Twitter, Substack: Newspaper, YouTube: Youtube } as const;

const TOOLS_LINKS = [
  { label: "SIP & Lumpsum Calculator", href: "/#calculators" },
  { label: "Compound Interest", href: "/#calculators" },
  { label: "Savings Goal Planner", href: "/#calculators" },
  { label: "50/30/20 Budget Split", href: "/#calculators" },
  { label: "Search Articles", href: "/search" },
  { label: "Weekly Newsletter", href: "/#newsletter" },
];

const COMPANY = [
  { label: "About Us", href: "/page/about-us" },
  { label: "Contact", href: "/page/contact" },
  { label: "Editorial Policy", href: "/page/editorial-policy" },
  { label: "Correction Policy", href: "/page/corrections-policy" },
];

const LEGAL = [
  { label: "Disclaimer", href: "/page/disclaimer" },
  { label: "Privacy Policy", href: "/page/privacy-policy" },
  { label: "Terms & Conditions", href: "/page/terms-conditions" },
];

export default async function Footer() {
  const categories = await getCategories().catch(() => []);

  return (
    <footer className="border-t border-nerd-100 bg-cream">
      {/* Link columns — NerdWallet-style dense footer nav */}
      <div className="mx-auto grid max-w-site gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-nerd-700 font-display text-lg font-extrabold text-white">
              म
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight text-ink-950">
              Stock Market <span className="text-nerd-700">Masala</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">{SITE.description}</p>
          <div className="mt-5 flex items-center gap-2">
            {SOCIALS.map((s) => {
              const Icon = SOCIAL_ICONS[s.label as keyof typeof SOCIAL_ICONS];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${SITE.name} on ${s.label}`}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink-700 ring-1 ring-nerd-100 transition hover:bg-nerd-800 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
          <Link
            href="/#newsletter"
            className="mt-5 inline-block rounded-full bg-ink-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-nerd-800"
          >
            Get the Newsletter
          </Link>
        </div>

        <div>
          <h3 className="font-display text-[13px] font-bold uppercase tracking-wider text-ink-950">Topics</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {categories.slice(0, 8).map((c) => (
              <li key={c.id}>
                <Link href={`/category/${c.slug}`} className="text-muted transition hover:text-nerd-700">
                  {c.name}
                  <span className="ml-1.5 text-xs text-stone-400">({c.count})</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-[13px] font-bold uppercase tracking-wider text-ink-950">Tools</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {TOOLS_LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-muted transition hover:text-nerd-700">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="mt-8 font-display text-[13px] font-bold uppercase tracking-wider text-ink-950">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {COMPANY.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted transition hover:text-nerd-700">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-[13px] font-bold uppercase tracking-wider text-ink-950">Legal</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {LEGAL.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted transition hover:text-nerd-700">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Legal disclaimer — long-form, NerdWallet style */}
      <div className="border-t border-nerd-100 bg-white">
        <div className="mx-auto max-w-site space-y-3 px-4 py-7 text-xs leading-relaxed text-muted sm:px-6">
          <p>
            <strong className="font-semibold text-ink-800">Disclaimer:</strong> {SITE.name} is an independent
            financial research and investor education publication. Articles, valuation models, IPO reviews, and
            calculators on this platform are strictly for informational and educational purposes and do not
            constitute personalized investment advice or a solicitation to buy or sell securities. All
            financial products, services and rates are presented without warranty — when evaluating offers,
            please review the provider&apos;s terms and conditions.
          </p>
          <p>
            Securities market investments are subject to market risks. Past performance is not indicative of
            future returns. Calculator projections are illustrative estimates based on the inputs you provide.
            Please consult a SEBI-registered investment advisor before making financial decisions.
          </p>
          <div className="flex flex-col items-start justify-between gap-2 border-t border-nerd-100 pt-4 text-stone-400 sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} {SITE.name}. All Rights Reserved.</p>
            <p className="font-mono text-[11px] font-semibold text-nerd-700">
              Data-Driven Research • Zero Paid Stock Promotions
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
