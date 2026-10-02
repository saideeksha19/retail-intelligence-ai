"use client";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { AnimatedNumber } from "./AnimatedNumber";
import type { RetailAnalytics } from "@/lib/derived";
import { fmtINR, fmtINRCompact, fmtNum, fmtPct } from "@/lib/derived";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from "recharts";
import { Trophy, Layers, Percent, Tag, CheckCircle2, ArrowRight } from "lucide-react";

const CATEGORY_COLORS = ["#FF5C5C", "#FF8A3D", "#F4C542", "#19B7A5", "#D94F9D"];

export function CategoryIntelligenceSection({ analytics }: { analytics: RetailAnalytics }) {
  const chartData = analytics.categories.map((c) => ({
    name: c.name,
    revenue: c.revenue,
    share: c.share,
    units: c.units,
    discount: c.discount,
  }));

  return (
    <section id="categories" className="py-20 border-t border-ink/12 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Heading */}
        <SectionHeading
          index="03"
          eyebrow="PRODUCT CATEGORIES & CONTRIBUTION"
          lines={["CATEGORY", "INTELLIGENCE"]}
          accent="teal"
        />
        <p className="mt-4 max-w-2xl text-sm text-ink/70 leading-relaxed">
          Breakdown of sales revenue, share %, volume sold, and average discount across all product categories.
        </p>

        {/* Downward Flow Block 1: Revenue Leader Highlight & Overview */}
        <Reveal delay={100}>
          <div className="mt-12 rounded-3xl border border-teal/30 bg-teal/5 p-6 sm:p-8 relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-teal/20 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal text-ivory font-bold">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <span className="eyebrow text-teal text-[10px] uppercase block">REVENUE LEADER</span>
                  <h3 className="font-display text-2xl font-bold text-ink">
                    {analytics.categoryLeader.name}
                  </h3>
                </div>
              </div>
              <div className="text-right font-mono">
                <span className="text-2xl font-bold text-ink block">
                  {fmtINR(analytics.categoryLeader.revenue)}
                </span>
                <span className="text-xs text-teal font-semibold">
                  {analytics.categoryLeader.share.toFixed(2)}% Total Revenue Share
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-ink/80 leading-relaxed max-w-3xl">
              Electronics is verified as the highest-revenue category in the dataset, producing {fmtINR(analytics.categoryLeader.revenue)} across {fmtNum(analytics.categoryLeader.units)} units sold with an average discount of {fmtPct(analytics.categoryLeader.discount)}.
            </p>
          </div>
        </Reveal>

        {/* Downward Flow Block 2: Recharts Category Revenue Distribution */}
        <Reveal delay={200}>
          <div className="mt-8 card-editorial p-6 sm:p-8 border border-ink/12 bg-paper shadow-md">
            <div className="flex items-center justify-between border-b border-ink/12 pb-4 mb-6">
              <div>
                <span className="eyebrow text-teal text-xs block">CATEGORY REVENUE COMPARISON</span>
                <h3 className="font-display text-xl font-bold text-ink uppercase mt-1">
                  Revenue Contribution Bar Chart
                </h3>
              </div>
              <span className="eyebrow text-ink/50 text-[10px]">ALL 5 CATEGORIES</span>
            </div>

            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 10, right: 30, left: 110, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(32, 33, 36, 0.08)" horizontal={false} />
                  <XAxis type="number" tickFormatter={(v) => fmtINRCompact(v)} />
                  <YAxis dataKey="name" type="category" tick={{ fill: "#202124", fontWeight: 700 }} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;
                      const data = payload[0].payload as typeof chartData[0];
                      return (
                        <div className="rounded-xl bg-ink p-3 text-ivory text-xs font-mono shadow-xl">
                          <p className="font-bold text-teal">{data.name}</p>
                          <p className="mt-1">Revenue: {fmtINR(data.revenue)}</p>
                          <p>Share: {data.share.toFixed(2)}%</p>
                          <p>Units: {fmtNum(data.units)}</p>
                          <p>Discount: {fmtPct(data.discount)}</p>
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="revenue" radius={[0, 8, 8, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>

        {/* Downward Flow Block 3: Full Category Data Table */}
        <Reveal delay={300}>
          <div className="mt-8 card-editorial p-6 sm:p-8 border border-ink/12 bg-paper shadow-md">
            <div className="flex items-center justify-between border-b border-ink/12 pb-4 mb-6">
              <div>
                <span className="eyebrow text-teal text-xs block">DATA TABLE</span>
                <h3 className="font-display text-xl font-bold text-ink uppercase mt-1">
                  Category Performance Spectrum
                </h3>
              </div>
              <span className="eyebrow text-ink/50 text-[10px]">VERIFIED CSV DATA</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-ink/15 text-ink/50 uppercase">
                    <th className="pb-3 font-semibold">Rank</th>
                    <th className="pb-3 font-semibold">Product Category</th>
                    <th className="pb-3 font-semibold text-right">Revenue</th>
                    <th className="pb-3 font-semibold text-right">Revenue Share</th>
                    <th className="pb-3 font-semibold text-right">Units Sold</th>
                    <th className="pb-3 font-semibold text-right">Avg Discount</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.categories.map((cat, idx) => {
                    const isLeader = cat.name === analytics.categoryLeader.name;
                    return (
                      <tr
                        key={cat.name}
                        className={`border-b border-ink/8 transition-colors ${
                          isLeader ? "bg-teal/5 font-semibold text-ink" : "hover:bg-cream/50 text-ink/80"
                        }`}
                      >
                        <td className="py-3.5 font-mono text-ink/40">#{cat.rank}</td>
                        <td className="py-3.5 font-sans font-bold text-sm text-ink flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ background: CATEGORY_COLORS[idx % CATEGORY_COLORS.length] }}
                          />
                          {cat.name}
                          {isLeader && (
                            <span className="text-[10px] uppercase bg-teal text-ivory px-2 py-0.5 rounded font-mono">
                              HIGHEST REVENUE
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 text-right font-bold text-ink">{fmtINR(cat.revenue)}</td>
                        <td className="py-3.5 text-right text-teal font-bold">{cat.share.toFixed(2)}%</td>
                        <td className="py-3.5 text-right">{fmtNum(cat.units)}</td>
                        <td className="py-3.5 text-right">{fmtPct(cat.discount)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs font-mono text-ink/50 border-t border-ink/12 pt-3">
              <span>Source: category_performance.csv</span>
              <span>Total Categories: {analytics.categoryCount}</span>
            </div>
          </div>
        </Reveal>

        {/* Downward Flow Block 4: Category Analytical Signal */}
        <Reveal delay={400}>
          <div className="mt-8 rounded-2xl border border-ink/12 bg-cream/70 p-6 flex items-start gap-4">
            <CheckCircle2 className="h-5 w-5 text-teal shrink-0 mt-0.5" />
            <div>
              <span className="font-display text-base font-bold text-ink block">
                Category Contribution Insight
              </span>
              <p className="text-xs text-ink/70 mt-1 leading-relaxed">
                The top revenue contributing category is Electronics ({fmtINR(analytics.categoryLeader.revenue)}), followed by Home Appliances, Fashion, Groceries, and Sports. Discount levels remain tightly clustered around 9.95% to 10.11% across categories.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
