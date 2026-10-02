"use client";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { AnimatedNumber } from "./AnimatedNumber";
import type { RetailAnalytics } from "@/lib/derived";
import { fmtINR, fmtINRCompact, fmtNum, fmtSignedPct } from "@/lib/derived";
import {
  TrendingUp,
  ShoppingBag,
  Tag,
  Building2,
  Layers,
  Calendar,
  ArrowUpRight,
  Brain,
  BarChart3,
  Award,
  Sparkles,
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

export function OverviewDashboardSection({ analytics }: { analytics: RetailAnalytics }) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const chartData = analytics.months.map((m) => ({
    date: m.short,
    revenue: m.revenue,
  }));

  return (
    <section id="overview" className="py-20 border-t border-ink/12 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Command Center Eyebrow & Title */}
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="inline-block h-2.5 w-2.5 rounded-[3px] bg-tangerine" aria-hidden="true" />
            <span className="eyebrow text-ink/60">01 · COMMAND CENTER OVERVIEW</span>
          </div>
          <h2 className="display-tight mt-6 text-[clamp(2.5rem,5.5vw,4.5rem)] text-ink">
            RETAIL INTELLIGENCE
            <br />
            <span className="text-tangerine">COMMAND CENTER.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-ink/70 leading-relaxed">
            High-level executive dashboard synthesizing sales revenue, product category shares, store performance distribution, and 6-month forecast projections from 24 months of retail history.
          </p>
        </Reveal>

        {/* Top Concise KPI Bar (Real Computed CSV Metrics) */}
        <Reveal delay={100}>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* KPI 1: Total Revenue */}
            <div className="card-editorial p-4 border border-ink/12 bg-paper">
              <span className="eyebrow text-[9px] text-ink/50 block">Total Revenue</span>
              <div className="font-display text-lg font-bold text-ink mt-1">
                <AnimatedNumber value={analytics.monthlyTotal} format={fmtINRCompact} />
              </div>
              <span className="text-[10px] font-mono text-tangerine font-bold block mt-1">
                {fmtSignedPct(analytics.yoyPct)} YoY
              </span>
            </div>

            {/* KPI 2: Total Units */}
            <div className="card-editorial p-4 border border-ink/12 bg-paper">
              <span className="eyebrow text-[9px] text-ink/50 block">Units Sold</span>
              <div className="font-display text-lg font-bold text-ink mt-1">
                <AnimatedNumber value={analytics.unitsTotal} format={fmtNum} />
              </div>
              <span className="text-[10px] font-mono text-ink/50 block mt-1">Sales Volume</span>
            </div>

            {/* KPI 3: Avg Unit Price */}
            <div className="card-editorial p-4 border border-ink/12 bg-paper">
              <span className="eyebrow text-[9px] text-ink/50 block">Avg Realization</span>
              <div className="font-display text-lg font-bold text-ink mt-1">
                <AnimatedNumber value={analytics.avgUnitPrice} format={fmtINR} />
              </div>
              <span className="text-[10px] font-mono text-ink/50 block mt-1">Per Unit Realized</span>
            </div>

            {/* KPI 4: Store Count */}
            <div className="card-editorial p-4 border border-ink/12 bg-paper">
              <span className="eyebrow text-[9px] text-ink/50 block">Store Network</span>
              <div className="font-display text-lg font-bold text-ink mt-1">
                {analytics.storeCount} STORES
              </div>
              <span className="text-[10px] font-mono text-ink/50 block mt-1">4 Segments</span>
            </div>

            {/* KPI 5: Category Count */}
            <div className="card-editorial p-4 border border-ink/12 bg-paper">
              <span className="eyebrow text-[9px] text-ink/50 block">Categories</span>
              <div className="font-display text-lg font-bold text-ink mt-1">
                {analytics.categoryCount} CATEGORIES
              </div>
              <span className="text-[10px] font-mono text-teal font-bold block mt-1">
                {analytics.categoryLeader.name} Leader
              </span>
            </div>

            {/* KPI 6: Data Period */}
            <div className="card-editorial p-4 border border-ink/12 bg-paper">
              <span className="eyebrow text-[9px] text-ink/50 block">Data Period</span>
              <div className="font-display text-sm font-bold text-ink mt-1">
                24 MONTHS
              </div>
              <span className="text-[10px] font-mono text-ink/50 block mt-1">
                Jan 23 — Dec 24
              </span>
            </div>
          </div>
        </Reveal>

        {/* Central Command Composition (4 High-Impact Quadrants) */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Quadrant 1: REVENUE SNAPSHOT */}
          <Reveal delay={200}>
            <div className="card-editorial p-6 sm:p-8 border border-ink/12 bg-paper shadow-md flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between border-b border-ink/12 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-tangerine" />
                    <span className="eyebrow text-tangerine text-xs">REVENUE SNAPSHOT</span>
                  </div>
                  <span className="eyebrow text-ink/40 text-[10px]">24 MONTHS</span>
                </div>

                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-xs text-ink/50 font-mono block">Monthly Trajectory Peak</span>
                    <span className="font-display text-xl font-bold text-ink">
                      {analytics.peak.label} ({fmtINRCompact(analytics.peak.revenue)})
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-ink/50 font-mono block">YoY Expansion</span>
                    <span className="font-mono text-sm font-bold text-tangerine">
                      {fmtSignedPct(analytics.yoyPct)}
                    </span>
                  </div>
                </div>

                {/* Mini Recharts Trend Preview */}
                <div className="h-[160px] w-full my-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                      <defs>
                        <linearGradient id="cmdSalesGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FF8A3D" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#FF8A3D" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" interval={5} hide />
                      <YAxis hide />
                      <Tooltip
                        formatter={(v: any) => [fmtINR(Number(v)), "Revenue"]}
                        contentStyle={{
                          background: "#202124",
                          color: "#faf8f3",
                          borderRadius: "8px",
                          fontSize: "11px",
                          fontFamily: "monospace",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#FF8A3D"
                        strokeWidth={2.5}
                        fill="url(#cmdSalesGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-4 border-t border-ink/10 flex items-center justify-between">
                <span className="text-xs font-mono text-ink/60">
                  Total 24-Month Sales: {fmtINR(analytics.monthlyTotal)}
                </span>
                <button
                  onClick={() => scrollTo("sales")}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-tangerine hover:underline focus:outline-none"
                >
                  <span>VIEW SALES</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Reveal>

          {/* Quadrant 2: CATEGORY CONTRIBUTION */}
          <Reveal delay={250}>
            <div className="card-editorial p-6 sm:p-8 border border-ink/12 bg-paper shadow-md flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between border-b border-ink/12 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-teal" />
                    <span className="eyebrow text-teal text-xs">CATEGORY CONTRIBUTION</span>
                  </div>
                  <span className="eyebrow text-ink/40 text-[10px]">PRODUCT SPECTRUM</span>
                </div>

                <div className="rounded-2xl border border-teal/20 bg-teal/5 p-4 mb-4">
                  <span className="eyebrow text-[10px] text-teal block uppercase">REVENUE LEADER</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="font-display text-2xl font-bold text-ink">
                      {analytics.categoryLeader.name}
                    </span>
                    <span className="font-mono text-sm font-bold text-teal">
                      {analytics.categoryLeader.share.toFixed(2)}% SHARE
                    </span>
                  </div>
                  <span className="text-xs text-ink/70 font-mono mt-1 block">
                    {fmtINR(analytics.categoryLeader.revenue)} total revenue
                  </span>
                </div>

                {/* Category List Spectrum Preview */}
                <div className="space-y-2.5 my-2">
                  {analytics.categories.slice(0, 4).map((cat) => (
                    <div key={cat.name} className="flex items-center justify-between text-xs font-mono">
                      <span className="font-semibold text-ink">{cat.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-ink/60">{fmtINRCompact(cat.revenue)}</span>
                        <span className="text-teal font-bold w-12 text-right">
                          {cat.share.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-ink/10 flex items-center justify-between">
                <span className="text-xs font-mono text-ink/60">
                  {analytics.categoryCount} Categories Analyzed
                </span>
                <button
                  onClick={() => scrollTo("categories")}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-teal hover:underline focus:outline-none"
                >
                  <span>VIEW CATEGORIES</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Reveal>

          {/* Quadrant 3: STORE PERFORMANCE SIGNAL */}
          <Reveal delay={300}>
            <div className="card-editorial p-6 sm:p-8 border border-ink/12 bg-paper shadow-md flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between border-b border-ink/12 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-magenta" />
                    <span className="eyebrow text-magenta text-xs">STORE PERFORMANCE SIGNAL</span>
                  </div>
                  <span className="eyebrow text-ink/40 text-[10px]">8 STORES</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="rounded-xl border border-teal/20 bg-teal/5 p-3.5">
                    <span className="eyebrow text-[9px] text-teal block uppercase">HIGHER REVENUE</span>
                    <span className="font-display text-lg font-bold text-ink block mt-0.5">
                      {analytics.storeLeader.id}
                    </span>
                    <span className="font-mono text-xs font-bold text-ink block mt-0.5">
                      {fmtINRCompact(analytics.storeLeader.revenue)}
                    </span>
                  </div>

                  <div className="rounded-xl border border-tangerine/20 bg-tangerine/5 p-3.5">
                    <span className="eyebrow text-[9px] text-tangerine block uppercase">LOWER REVENUE</span>
                    <span className="font-display text-lg font-bold text-ink block mt-0.5">
                      {analytics.storeLaggard.id}
                    </span>
                    <span className="font-mono text-xs font-bold text-ink block mt-0.5">
                      {fmtINRCompact(analytics.storeLaggard.revenue)}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-ink/70 leading-relaxed font-sans my-2">
                  Store performance clusters into 4 practical K-Means segments based on revenue density, units sold, and discount levels across the 8 retail locations.
                </p>
              </div>

              <div className="pt-4 border-t border-ink/10 flex items-center justify-between">
                <span className="text-xs font-mono text-ink/60">
                  4 Practical K-Means Clusters
                </span>
                <button
                  onClick={() => scrollTo("stores")}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-magenta hover:underline focus:outline-none"
                >
                  <span>VIEW STORES</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Reveal>

          {/* Quadrant 4: FORECAST PREVIEW */}
          <Reveal delay={350}>
            <div className="card-editorial p-6 sm:p-8 border border-ink/12 bg-paper shadow-md flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between border-b border-ink/12 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-gold" />
                    <span className="eyebrow text-gold text-xs">FORECAST PREVIEW</span>
                  </div>
                  <span className="eyebrow text-ink/40 text-[10px]">JAN–JUN 2025</span>
                </div>

                <div className="rounded-2xl border border-gold/30 bg-gold/10 p-4 mb-4">
                  <span className="eyebrow text-[10px] text-gold font-bold block uppercase">SELECTED MODEL</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="font-display text-xl font-bold text-ink">
                      Seasonal Naïve
                    </span>
                    <span className="font-mono text-xs font-bold text-ink bg-gold px-2 py-0.5 rounded">
                      STRONGEST HOLDOUT
                    </span>
                  </div>
                  <p className="text-xs text-ink/75 font-mono mt-1">
                    Evaluated best baseline among Seasonal Naïve, Holt ES &amp; SARIMA
                  </p>
                </div>

                <div className="flex items-center justify-between font-mono text-xs my-2">
                  <span className="text-ink/60">Projected 6-Month Revenue:</span>
                  <span className="font-bold text-ink text-sm">{fmtINR(analytics.forecastTotal)}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-ink/10 flex items-center justify-between">
                <span className="text-xs font-mono text-ink/60">
                  Horizon: Jan–Jun 2025
                </span>
                <button
                  onClick={() => scrollTo("forecast")}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-gold hover:underline focus:outline-none"
                >
                  <span>VIEW FORECAST</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
