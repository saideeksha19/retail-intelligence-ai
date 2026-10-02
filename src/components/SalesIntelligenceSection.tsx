"use client";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { AnimatedNumber } from "./AnimatedNumber";
import { ChartTooltip } from "./ChartTooltip";
import { HorizontalStory, HorizontalPanel } from "./HorizontalStory";
import type { RetailAnalytics } from "@/lib/derived";
import { fmtINR, fmtINRCompact, fmtNum, fmtSignedPct } from "@/lib/derived";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { TrendingUp, ShoppingBag, Tag, ArrowUpRight, Calendar, Activity, Zap, CheckCircle2 } from "lucide-react";

export function SalesIntelligenceSection({ analytics }: { analytics: RetailAnalytics }) {
  const chartData = analytics.months.map((m) => ({
    date: m.short,
    fullLabel: m.label,
    revenue: m.revenue,
  }));

  return (
    <section id="sales" className="py-20 border-t border-ink/12 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 mb-10">
        <SectionHeading
          index="02"
          eyebrow="REVENUE TRAJECTORY & METRICS"
          lines={["SALES", "INTELLIGENCE"]}
          accent="tangerine"
        />
        <p className="mt-4 max-w-2xl text-sm text-ink/70 leading-relaxed">
          Comprehensive 24-month analysis of retail sales revenue, volume, and unit pricing across all stores (Jan 2023 – Dec 2024).
        </p>
      </div>

      <HorizontalStory totalPanels={4} sectionTitle="SALES STORY">
        {/* Panel 1: Revenue Overview */}
        <HorizontalPanel>
          <div className="card-editorial p-6 sm:p-8 border border-ink/12 bg-paper shadow-md h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-ink/12 pb-4 mb-6">
                <div>
                  <span className="eyebrow text-tangerine text-xs block">PANEL 01 · REVENUE OVERVIEW</span>
                  <h3 className="font-display text-xl font-bold text-ink uppercase mt-1">
                    Executive Sales Summary
                  </h3>
                </div>
                <span className="eyebrow text-ink/50 text-[10px]">REAL DATASET</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Total Revenue */}
                <div className="rounded-2xl border border-ink/12 bg-ivory p-5">
                  <div className="flex items-center justify-between text-ink/50 text-xs font-mono uppercase mb-2">
                    <span>Total Revenue</span>
                    <TrendingUp className="h-4 w-4 text-tangerine" />
                  </div>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-ink">
                    <AnimatedNumber value={analytics.monthlyTotal} format={fmtINR} />
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-mono text-ink/60">
                    <span className="font-bold text-tangerine">
                      {fmtSignedPct(analytics.yoyPct)}
                    </span>
                    <span>YoY Growth (2023 vs 2024)</span>
                  </div>
                </div>

                {/* Total Units */}
                <div className="rounded-2xl border border-ink/12 bg-ivory p-5">
                  <div className="flex items-center justify-between text-ink/50 text-xs font-mono uppercase mb-2">
                    <span>Units Sold</span>
                    <ShoppingBag className="h-4 w-4 text-teal" />
                  </div>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-ink">
                    <AnimatedNumber value={analytics.unitsTotal} format={fmtNum} />
                  </div>
                  <div className="mt-3 text-xs font-mono text-ink/60">
                    Total recorded sales volume
                  </div>
                </div>

                {/* Avg Unit Price */}
                <div className="rounded-2xl border border-ink/12 bg-ivory p-5">
                  <div className="flex items-center justify-between text-ink/50 text-xs font-mono uppercase mb-2">
                    <span>Avg Unit Price</span>
                    <Tag className="h-4 w-4 text-magenta" />
                  </div>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-ink">
                    <AnimatedNumber value={analytics.avgUnitPrice} format={fmtINR} />
                  </div>
                  <div className="mt-3 text-xs font-mono text-ink/60">
                    Calculated overall unit realization
                  </div>
                </div>
              </div>

              {/* Peak & Low Month Callouts */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-ink/12 bg-cream/70 p-4 flex items-center justify-between">
                  <div>
                    <span className="eyebrow text-[10px] text-ink/50 block">PEAK REVENUE MONTH</span>
                    <span className="font-display text-base font-bold text-ink">{analytics.peak.label}</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-tangerine">
                    {fmtINR(analytics.peak.revenue)}
                  </span>
                </div>

                <div className="rounded-xl border border-ink/12 bg-cream/70 p-4 flex items-center justify-between">
                  <div>
                    <span className="eyebrow text-[10px] text-ink/50 block">LOW REVENUE MONTH</span>
                    <span className="font-display text-base font-bold text-ink">{analytics.low.label}</span>
                  </div>
                  <span className="font-mono text-sm font-bold text-ink/70">
                    {fmtINR(analytics.low.revenue)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-mono text-ink/50 border-t border-ink/12 pt-3">
              <span>Source: monthly_revenue.csv</span>
              <span>24 Months Analyzed</span>
            </div>
          </div>
        </HorizontalPanel>

        {/* Panel 2: Monthly Revenue Trend */}
        <HorizontalPanel>
          <div className="card-editorial p-6 sm:p-8 border border-ink/12 bg-paper shadow-md h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-ink/12 pb-4 mb-6">
                <div>
                  <span className="eyebrow text-tangerine text-xs block">PANEL 02 · MONTHLY REVENUE TREND</span>
                  <h3 className="font-display text-xl font-bold text-ink uppercase mt-1">
                    24-Month Sales Trajectory
                  </h3>
                </div>
                <span className="eyebrow text-ink/50 text-[10px]">JAN 2023 – DEC 2024</span>
              </div>

              <div className="h-[300px] w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                    <defs>
                      <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF8A3D" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#FF8A3D" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(32, 33, 36, 0.08)" />
                    <XAxis dataKey="date" interval={2} tickMargin={10} />
                    <YAxis tickFormatter={(v) => fmtINRCompact(v)} width={70} />
                    <Tooltip
                      content={({ active, payload, label }) => (
                        <ChartTooltip
                          active={active}
                          label={
                            chartData.find((d) => d.date === label)?.fullLabel || label
                          }
                          payload={
                            payload
                              ? payload.map((p) => ({
                                  name: "Monthly Revenue",
                                  value: p.value as number,
                                  color: "#FF8A3D",
                                }))
                              : []
                          }
                          format={fmtINR}
                        />
                      )}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#FF8A3D"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#salesGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between text-xs font-mono text-ink/60 border-t border-ink/12 pt-3">
              <span>Monthly Average: {fmtINR(analytics.monthlyAvg)}</span>
              <span>24 Months Evaluated</span>
            </div>
          </div>
        </HorizontalPanel>

        {/* Panel 3: Volume / Pricing Signals */}
        <HorizontalPanel>
          <div className="card-editorial p-6 sm:p-8 border border-ink/12 bg-paper shadow-md h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-ink/12 pb-4 mb-6">
                <div>
                  <span className="eyebrow text-tangerine text-xs block">PANEL 03 · VOLUME &amp; PRICING</span>
                  <h3 className="font-display text-xl font-bold text-ink uppercase mt-1">
                    Annual Comparison (2023 vs 2024)
                  </h3>
                </div>
                <span className="eyebrow text-ink/50 text-[10px]">REVENUE METRICS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-ink/12 bg-ivory p-6">
                  <span className="eyebrow text-[10px] text-ink/50 block">YEAR 2023 TOTAL</span>
                  <div className="font-display text-3xl font-bold text-ink mt-2">
                    {fmtINR(analytics.year2023)}
                  </div>
                  <p className="text-xs text-ink/60 mt-2 font-mono">
                    Baseline year monthly total across all stores
                  </p>
                </div>

                <div className="rounded-2xl border border-ink/12 bg-ivory p-6">
                  <span className="eyebrow text-[10px] text-tangerine block">YEAR 2024 TOTAL</span>
                  <div className="font-display text-3xl font-bold text-ink mt-2">
                    {fmtINR(analytics.year2024)}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-xs font-mono text-tangerine font-bold">
                    <span>{fmtSignedPct(analytics.yoyPct)} YoY Increase</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-ink/12 bg-cream/70 p-4">
                <div className="flex items-center gap-2 text-ink font-bold text-xs uppercase mb-1">
                  <Zap className="h-4 w-4 text-tangerine" />
                  Pricing Realization
                </div>
                <p className="text-xs text-ink/70 leading-relaxed font-sans">
                  The network maintained an average unit realization of {fmtINR(analytics.avgUnitPrice)} across {fmtNum(analytics.unitsTotal)} recorded units sold.
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-mono text-ink/50 border-t border-ink/12 pt-3">
              <span>Historical Baseline Validation</span>
              <span>2 Years Tracked</span>
            </div>
          </div>
        </HorizontalPanel>

        {/* Panel 4: Key Sales Signal */}
        <HorizontalPanel>
          <div className="card-editorial p-6 sm:p-8 border border-ink/12 bg-paper shadow-md h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-ink/12 pb-4 mb-6">
                <div>
                  <span className="eyebrow text-tangerine text-xs block">PANEL 04 · SALES SIGNAL</span>
                  <h3 className="font-display text-xl font-bold text-ink uppercase mt-1">
                    Key Revenue Takeaways
                  </h3>
                </div>
                <span className="eyebrow text-tangerine text-[10px] font-bold">ANALYTICAL SIGNAL</span>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-ink/12 bg-ivory p-5 flex items-start gap-4">
                  <CheckCircle2 className="h-5 w-5 text-tangerine shrink-0 mt-0.5" />
                  <div>
                    <span className="font-display text-base font-bold text-ink block">
                      Positive YoY Expansion
                    </span>
                    <p className="text-xs text-ink/70 mt-1 leading-relaxed">
                      Revenue grew from {fmtINRCompact(analytics.year2023)} in 2023 to {fmtINRCompact(analytics.year2024)} in 2024 ({fmtSignedPct(analytics.yoyPct)} growth).
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-ink/12 bg-ivory p-5 flex items-start gap-4">
                  <CheckCircle2 className="h-5 w-5 text-tangerine shrink-0 mt-0.5" />
                  <div>
                    <span className="font-display text-base font-bold text-ink block">
                      Seasonal Cyclicality Peak
                    </span>
                    <p className="text-xs text-ink/70 mt-1 leading-relaxed">
                      Peak sales occur in Q4 ({analytics.peak.label} at {fmtINR(analytics.peak.revenue)}), establishing clear annual seasonality.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-mono text-ink/50 border-t border-ink/12 pt-3">
              <span>Section 02 Complete</span>
              <span>Next: Category Intelligence →</span>
            </div>
          </div>
        </HorizontalPanel>
      </HorizontalStory>
    </section>
  );
}
