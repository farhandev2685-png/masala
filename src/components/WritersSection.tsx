import Link from "next/link";
import { BadgeCheck, FileText, PencilLine } from "lucide-react";
import { WPAuthor } from "@/lib/wp";

/**
 * "Meet the Writers" + editorial standards strip.
 * Authors come from real WP _embedded.author data — names, avatars, bios only.
 * No fabricated credentials or affiliations.
 */
export default function WritersSection({ authors }: { authors: WPAuthor[] }) {
  if (!authors.length) return null;

  return (
    <section className="border-y border-nerd-100 bg-nerd-50/50">
      <div className="mx-auto max-w-site px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Writers */}
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-nerd-700">
              Meet the Writers
            </p>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl">
              Real people. Plain-English money writing.
            </h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              {authors.slice(0, 4).map((a) => (
                <div key={a.id} className="flex gap-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-ink-950/[0.05]">
                  {a.avatar_urls?.["96"] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={a.avatar_urls["96"]}
                      alt={a.name}
                      className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-nerd-100"
                    />
                  ) : (
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-nerd-700 font-display text-xl font-bold text-white">
                      {a.name?.[0] ?? "M"}
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="font-display text-base font-bold text-ink-950">{a.name}</p>
                    <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-muted">
                      {a.description ? a.description : "Contributor at Stock Market Masala."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Editorial standards */}
          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-nerd-700">
              How We Work
            </p>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl">Our editorial promise</h2>
            <ul className="mt-6 space-y-4">
              {[
                {
                  icon: FileText,
                  title: "Written for readers, not traders",
                  body: "Every guide explains the 'why' and the 'how' in plain language — no jargon without a definition.",
                },
                {
                  icon: BadgeCheck,
                  title: "Checked before it ships",
                  body: "Articles are reviewed for clarity and accuracy, and updated when rules, rates or dates change.",
                },
                {
                  icon: PencilLine,
                  title: "Corrections, out in the open",
                  body: "When we get something wrong, we fix it and say so — publicly, on the page.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex gap-3.5">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-nerd-700 ring-1 ring-nerd-100">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink-950">{title}</p>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-muted">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/page/editorial-policy"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-nerd-700 transition hover:text-nerd-800"
            >
              Read our editorial policy →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
