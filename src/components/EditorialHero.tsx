import Link from "next/link";
import { ArrowRight, BookOpen, Compass } from "lucide-react";

/**
 * Brand hero — "YOUR MONEY. YOUR FUTURE."
 * Right side: abstract editorial growth illustration (decorative SVG, no market data).
 * Floating chips show only real counts passed in (articles published, topics covered).
 */
export default function EditorialHero({
  articleCount,
  topicCount,
}: {
  articleCount: number;
  topicCount: number;
}) {
  return (
    <section className="relative overflow-hidden border-b border-nerd-100 bg-cream">
      {/* faint dotted texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: "radial-gradient(rgba(120,53,15,0.10) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="relative mx-auto grid max-w-site items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:py-20">
        {/* Copy */}
        <div className="max-w-xl">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-nerd-700">
            Your Money. Your Future.
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.12] tracking-tight text-ink-950 sm:text-5xl lg:text-[54px]">
            Make Smarter Money Decisions.{" "}
            <span className="italic text-nerd-700">Build a Better Financial Future.</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Practical financial advice, expert insights, and straightforward guides to help you save, invest,
            and make your money work harder.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/category/learn"
              className="inline-flex items-center gap-2 rounded-full bg-nerd-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-nerd-800"
            >
              Explore Financial Guides <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#topics"
              className="inline-flex items-center gap-2 rounded-full border border-nerd-700/25 bg-white px-6 py-3 text-sm font-semibold text-nerd-700 transition hover:border-nerd-700 hover:bg-nerd-50"
            >
              Start Learning
            </Link>
          </div>

          {/* Honest stat strip — real counts only */}
          <dl className="mt-10 flex gap-8 border-t border-nerd-100 pt-6">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted">Articles published</dt>
              <dd className="mt-1 font-display text-2xl font-bold text-ink-950">{articleCount}+</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted">Money topics</dt>
              <dd className="mt-1 font-display text-2xl font-bold text-ink-950">{topicCount}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted">Cost to read</dt>
              <dd className="mt-1 font-display text-2xl font-bold text-ink-950">Free</dd>
            </div>
          </dl>
        </div>

        {/* Editorial illustration */}
        <div className="relative hidden lg:block" aria-hidden>
          <div className="relative rounded-2xl border border-nerd-100 bg-white p-6 shadow-card">
            <div className="flex items-center justify-between border-b border-nerd-100 pb-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted">The Long Game</p>
                <p className="mt-1 font-display text-lg font-bold text-ink-950">Compounding, visualised</p>
              </div>
              <span className="rounded-full bg-nerd-100 px-3 py-1 font-mono text-[11px] font-bold text-nerd-700">
                ₹ over time
              </span>
            </div>

            {/* Growth curve */}
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

          {/* Floating chips — real counts, no fabricated stats */}
          <div className="absolute -left-5 top-6 flex items-center gap-2.5 rounded-xl border border-nerd-100 bg-white px-4 py-3 shadow-card animate-fade-up">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-nerd-100 text-nerd-700">
              <BookOpen className="h-4 w-4" />
            </span>
            <div>
              <p className="font-display text-sm font-bold text-ink-950">{articleCount}+ articles</p>
              <p className="text-[11px] text-muted">and counting</p>
            </div>
          </div>
          <div className="absolute -right-4 bottom-8 flex items-center gap-2.5 rounded-xl border border-nerd-100 bg-white px-4 py-3 shadow-card animate-fade-up [animation-delay:150ms]">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-nerd-700 text-white">
              <Compass className="h-4 w-4" />
            </span>
            <div>
              <p className="font-display text-sm font-bold text-ink-950">{topicCount} topics</p>
              <p className="text-[11px] text-muted">one library</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
