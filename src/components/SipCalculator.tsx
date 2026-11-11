"use client";

import { useState, useMemo } from "react";
import { Calculator, TrendingUp } from "lucide-react";

function formatINR(num: number): string {
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
  return `₹${Math.round(num).toLocaleString("en-IN")}`;
}

export default function SipCalculator() {
  const [mode, setMode] = useState<"sip" | "lumpsum">("sip");
  const [monthly, setMonthly] = useState(15000);
  const [rate, setRate] = useState(13);
  const [years, setYears] = useState(10);

  const { invested, returns, total, gainPct } = useMemo(() => {
    if (mode === "sip") {
      const mRate = rate / 12 / 100;
      const months = years * 12;
      const inv = monthly * months;
      const fv =
        mRate === 0
          ? inv
          : monthly * ((Math.pow(1 + mRate, months) - 1) / mRate) * (1 + mRate);
      const ret = Math.max(0, fv - inv);
      return {
        invested: inv,
        returns: ret,
        total: fv,
        gainPct: inv > 0 ? Math.round((ret / fv) * 100) : 0,
      };
    } else {
      const lump = monthly * 10;
      const fv = lump * Math.pow(1 + rate / 100, years);
      const ret = Math.max(0, fv - lump);
      return {
        invested: lump,
        returns: ret,
        total: fv,
        gainPct: lump > 0 ? Math.round((ret / fv) * 100) : 0,
      };
    }
  }, [mode, monthly, rate, years]);

  return (
    <section className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-ink-950/[0.06]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-nerd-100 bg-nerd-700 px-5 py-4 text-white">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-white">
            <Calculator className="h-4 w-4" />
          </span>
          <div>
            <h3 className="font-display text-sm font-bold tracking-wide">Wealth Compounder</h3>
            <p className="text-[11px] text-stone-400">Interactive Return Estimator</p>
          </div>
        </div>
        <div className="flex rounded-full bg-white/10 p-0.5 text-[11px] font-bold">
          <button
            type="button"
            onClick={() => setMode("sip")}
            className={`rounded-full px-3 py-1 transition ${
              mode === "sip" ? "bg-white text-nerd-700" : "text-stone-300 hover:text-white"
            }`}
          >
            SIP
          </button>
          <button
            type="button"
            onClick={() => setMode("lumpsum")}
            className={`rounded-full px-3 py-1 transition ${
              mode === "lumpsum" ? "bg-white text-nerd-700" : "text-stone-300 hover:text-white"
            }`}
          >
            Lumpsum
          </button>
        </div>
      </div>

      <div className="space-y-4 p-5">
        {/* Amount Slider */}
        <div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-ink-700">
              {mode === "sip" ? "Monthly SIP" : "One-time Investment"}
            </span>
            <span className="rounded-full bg-nerd-100 px-2.5 py-0.5 font-mono font-bold text-nerd-700">
              {formatINR(mode === "sip" ? monthly : monthly * 10)}
            </span>
          </div>
          <input
            type="range"
            min={1000}
            max={100000}
            step={1000}
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))}
            className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-nerd-100 accent-nerd-700"
          />
        </div>

        {/* Expected Return Slider */}
        <div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-ink-700">Expected Return (CAGR)</span>
            <span className="rounded-full bg-nerd-100 px-2.5 py-0.5 font-mono font-bold text-nerd-700">
              {rate}% p.a.
            </span>
          </div>
          <input
            type="range"
            min={6}
            max={25}
            step={0.5}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-nerd-100 accent-nerd-700"
          />
        </div>

        {/* Duration Slider */}
        <div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-ink-700">Time Horizon</span>
            <span className="rounded-full bg-nerd-100 px-2.5 py-0.5 font-mono font-bold text-ink-900">
              {years} Years
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={30}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-nerd-100 accent-ink-900"
          />
        </div>

        {/* Visual Split Bar */}
        <div className="pt-1">
          <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-nerd-100">
            <div
              className="bg-ink-800 transition-all duration-300"
              style={{ width: `${100 - gainPct}%` }}
              title="Invested Capital"
            />
            <div
              className="bg-nerd-700 transition-all duration-300"
              style={{ width: `${gainPct}%` }}
              title="Compounded Wealth Gain"
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-ink-800" />
              Invested: <strong className="font-mono text-ink-900">{formatINR(invested)}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-nerd-700" />
              Est. Gain: <strong className="font-mono text-nerd-700">+{formatINR(returns)}</strong>
            </span>
          </div>
        </div>

        {/* Projected Corpus Box */}
        <div className="rounded-xl bg-gradient-to-br from-nerd-800 to-nerd-700 p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-nerd-300">
                Projected Value ({years}Y)
              </p>
              <p className="mt-0.5 font-mono text-2xl font-extrabold text-white">
                {formatINR(total)}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-nerd-500/20 px-2.5 py-1 font-mono text-xs font-bold text-nerd-300">
              <TrendingUp className="h-3.5 w-3.5" />
              {(total / Math.max(1, invested)).toFixed(1)}x
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
