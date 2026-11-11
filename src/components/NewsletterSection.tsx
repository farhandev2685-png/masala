"use client";

import { useState } from "react";
import { CheckCircle2, Mail, Send, ShieldCheck } from "lucide-react";

/**
 * Newsletter signup — deep masala band ("section") or compact card ("card").
 * Validates email client-side. No backend is wired yet, so on success we show a
 * confirmation state without claiming a subscription was stored server-side.
 */
export default function NewsletterSection({ variant = "section" }: { variant?: "section" | "card" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    if (!valid) return setState("error");
    setState("done");
  };

  const form = (
    <form onSubmit={submit} className="mt-6" noValidate>
      {state === "done" ? (
        <div className="flex items-center gap-3 rounded-xl bg-white/10 px-5 py-4 text-sm font-medium text-nerd-100 ring-1 ring-white/15">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-nerd-300" />
          <span>
            Thanks! You&apos;re on the list — keep an eye on your inbox for the next issue.
          </span>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative flex-1">
              <span className="sr-only">Email address</span>
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === "error") setState("idle");
                }}
                placeholder="you@example.com"
                className={`w-full rounded-full border bg-white/10 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/50 focus:bg-white/15 ${
                  state === "error" ? "border-red-300" : "border-white/20 focus:border-nerd-300"
                }`}
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-nerd-700 transition hover:bg-nerd-100"
            >
              Subscribe <Send className="h-4 w-4" />
            </button>
          </div>
          {state === "error" && (
            <p className="mt-2.5 text-xs font-medium text-red-200">
              Please enter a valid email address.
            </p>
          )}
        </>
      )}
      <p className="mt-4 flex items-center gap-1.5 text-xs text-white/60">
        <ShieldCheck className="h-3.5 w-3.5" />
        Free weekly insights. No spam — unsubscribe anytime. We never share your email.
      </p>
    </form>
  );

  if (variant === "card") {
    return (
      <div id="newsletter" className="rounded-2xl bg-nerd-700 p-6 sm:p-7">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-nerd-300">Newsletter</p>
        <h3 className="mt-2 font-display text-xl font-bold text-white">Get Smarter With Your Money.</h3>
        <p className="mt-2 text-sm leading-6 text-nerd-100/90">
          Practical financial insights and better money habits, in your inbox.
        </p>
        {form}
      </div>
    );
  }

  return (
    <section id="newsletter" className="scroll-mt-20 bg-nerd-700">
      <div className="mx-auto max-w-site px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-nerd-300">Newsletter</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Get smarter with your money.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-nerd-100/90">
            Join readers who want practical financial insights, smarter money habits, and better financial
            decisions — every week, free.
          </p>
        </div>
        <div className="mx-auto max-w-xl">{form}</div>
      </div>
    </section>
  );
}
