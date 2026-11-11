"use client";

import { useState } from "react";
import { Calculator, PiggyBank, Wallet, IndianRupee } from "lucide-react";
import SipCalculator from "./SipCalculator";
import { CompoundCalc, GoalCalc, BudgetCalc } from "./FinancialTools";

const TABS = [
  {
    key: "sip",
    label: "SIP & Lumpsum",
    icon: IndianRupee,
    title: "Wealth Compounder",
    desc: "Project what a monthly SIP or one-time investment could grow into.",
    sip: true,
  },
  {
    key: "compound",
    label: "Compound Interest",
    icon: Calculator,
    title: "Compound Interest",
    desc: "See how a lump sum plus monthly additions can grow over time.",
    Body: CompoundCalc,
  },
  {
    key: "goal",
    label: "Savings Goal",
    icon: PiggyBank,
    title: "Savings Goal",
    desc: "Work out the monthly saving needed to hit a target.",
    Body: GoalCalc,
  },
  {
    key: "budget",
    label: "50/30/20 Budget",
    icon: Wallet,
    title: "Monthly Budget",
    desc: "Split take-home pay with the 50/30/20 guideline.",
    Body: BudgetCalc,
  },
];

/**
 * NerdWallet "Find smarter rates"-style panel — mint section with a
 * centered tab toggle; each tab reveals one calculator.
 */
export default function ToolsTabs() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <div>
      {/* Tab toggle — NerdWallet pill switch */}
      <div className="flex justify-center">
        <div className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-nerd-100/80 p-1 no-scrollbar">
          {TABS.map((t, i) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setActive(i)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-bold transition ${
                active === i ? "bg-white text-nerd-700 shadow-sm" : "text-ink-700 hover:text-nerd-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Panel */}
      <div className="mx-auto mt-8 max-w-2xl">
        {tab.sip ? (
          <SipCalculator />
        ) : (
          <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-ink-950/[0.06] sm:p-7">
            <div className="flex items-center gap-3 border-b border-nerd-100 pb-4">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-nerd-100 text-nerd-700">
                <tab.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-ink-950">{tab.title}</h3>
                <p className="text-xs text-muted">{tab.desc}</p>
              </div>
            </div>
            <div className="pt-4">{tab.Body && <tab.Body />}</div>
          </div>
        )}
        <p className="mt-4 text-center text-[11px] leading-relaxed text-muted">
          Projections are simple, transparent estimates from the numbers you enter — planning aids,
          not forecasts or investment advice.
        </p>
      </div>
    </div>
  );
}
