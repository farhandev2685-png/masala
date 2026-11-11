"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Calculator, PiggyBank, Wallet } from "lucide-react";
import Link from "next/link";

function inr(n: number): string {
  if (!isFinite(n) || n <= 0) return "₹0";
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

const inputCls =
  "w-full rounded-lg border border-nerd-100 bg-cream px-3 py-2 text-sm font-medium text-ink-900 outline-none transition focus:border-nerd-700 focus:bg-white";
const labelCls = "mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-muted";

function Field({
  label,
  value,
  onChange,
  prefix,
  suffix,
  min = 0,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  step?: number;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <span className="relative block">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">{prefix}</span>}
        <input
          type="number"
          min={min}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`${inputCls} ${prefix ? "pl-7" : ""} ${suffix ? "pr-10" : ""}`}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">{suffix}</span>}
      </span>
    </label>
  );
}

function Result({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl bg-nerd-50 px-4 py-3 ring-1 ring-nerd-100">
      <p className="text-[11px] font-bold uppercase tracking-wider text-nerd-700">{label}</p>
      <p className="mt-0.5 font-display text-2xl font-bold tabular-nums text-ink-950">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-muted">{sub}</p>}
    </div>
  );
}

/** Compound interest: lump sum + optional monthly contribution */
export function CompoundCalc() {
  const [principal, setPrincipal] = useState(100000);
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const { fv, invested } = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    const fvLump = principal * Math.pow(1 + rate / 100, years);
    const fvSip = r === 0 ? monthly * n : monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    return { fv: fvLump + fvSip, invested: principal + monthly * n };
  }, [principal, monthly, rate, years]);

  return (
    <div className="space-y-3.5">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Lump sum" value={principal} onChange={setPrincipal} prefix="₹" step={5000} />
        <Field label="Monthly add" value={monthly} onChange={setMonthly} prefix="₹" step={500} />
        <Field label="Return p.a." value={rate} onChange={setRate} suffix="%" step={0.5} />
        <Field label="Years" value={years} onChange={setYears} min={1} />
      </div>
      <Result label="Projected value" value={inr(fv)} sub={`${inr(invested)} invested · ${inr(fv - invested)} growth`} />
    </div>
  );
}

/** Savings goal: monthly saving needed to reach a target */
export function GoalCalc() {
  const [goal, setGoal] = useState(1000000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(5);

  const monthly = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    if (n <= 0) return goal;
    return r === 0 ? goal / n : (goal * r) / (Math.pow(1 + r, n) - 1) / (1 + r);
  }, [goal, rate, years]);

  return (
    <div className="space-y-3.5">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <Field label="Goal amount" value={goal} onChange={setGoal} prefix="₹" step={10000} />
        </div>
        <Field label="Return p.a." value={rate} onChange={setRate} suffix="%" step={0.5} />
        <Field label="Years" value={years} onChange={setYears} min={1} />
      </div>
      <Result
        label="Save per month"
        value={inr(monthly)}
        sub={`to reach ${inr(goal)} in ${years} year${years > 1 ? "s" : ""}`}
      />
    </div>
  );
}

/** 50/30/20 monthly budget split */
export function BudgetCalc() {
  const [income, setIncome] = useState(80000);
  const needs = income * 0.5;
  const wants = income * 0.3;
  const save = income * 0.2;

  return (
    <div className="space-y-3.5">
      <Field label="Monthly take-home" value={income} onChange={setIncome} prefix="₹" step={1000} />
      <div className="space-y-2.5">
        {[
          { label: "Needs · 50%", amt: needs, w: "50%", color: "bg-nerd-700" },
          { label: "Wants · 30%", amt: wants, w: "30%", color: "bg-nerd-400" },
          { label: "Savings · 20%", amt: save, w: "20%", color: "bg-nerd-200" },
        ].map((row) => (
          <div key={row.label}>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-ink-800">{row.label}</span>
              <span className="font-mono font-bold tabular-nums text-ink-950">{inr(row.amt)}</span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-nerd-100">
              <div className={`h-full rounded-full ${row.color}`} style={{ width: row.w }} />
            </div>
          </div>
        ))}
      </div>
      <p className="text-[11px] leading-relaxed text-muted">The 50/30/20 rule is a budgeting guideline, not a strict formula — adjust to your situation.</p>
    </div>
  );
}

const TOOLS = [
  {
    key: "compound",
    icon: Calculator,
    title: "Compound Interest",
    desc: "See how a lump sum plus monthly additions can grow over time.",
    Body: CompoundCalc,
  },
  {
    key: "goal",
    icon: PiggyBank,
    title: "Savings Goal",
    desc: "Work out the monthly saving needed to hit a target.",
    Body: GoalCalc,
  },
  {
    key: "budget",
    icon: Wallet,
    title: "Monthly Budget",
    desc: "Split take-home pay with the 50/30/20 guideline.",
    Body: BudgetCalc,
  },
];

export default function FinancialTools() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {TOOLS.map(({ key, icon: Icon, title, desc, Body }) => (
        <div
          key={key}
          className="flex flex-col rounded-2xl border border-nerd-100 bg-white p-5 shadow-card transition hover:shadow-card-hover"
        >
          <div className="flex items-center gap-3 border-b border-nerd-100 pb-4">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-nerd-100 text-nerd-700">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-base font-bold text-ink-950">{title}</h3>
              <p className="text-xs text-muted">{desc}</p>
            </div>
          </div>
          <div className="pt-4">
            <Body />
          </div>
        </div>
      ))}
      <p className="text-xs text-muted md:col-span-3">
        These calculators run simple, transparent projections from the numbers you enter — they are planning aids,
        not forecasts or advice.{" "}
        <Link href="/category/learn" className="inline-flex items-center gap-1 font-semibold text-nerd-700 hover:text-nerd-800">
          Learn the concepts <ArrowRight className="h-3 w-3" />
        </Link>
      </p>
    </div>
  );
}
