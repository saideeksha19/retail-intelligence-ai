"use client";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { AnimatedNumber } from "./AnimatedNumber";
import { HorizontalStory, HorizontalPanel } from "./HorizontalStory";
import type { RetailAnalytics } from "@/lib/derived";
import { fmtINR, fmtNum, fmtPct } from "@/lib/derived";
import { Store, Building2, Layers, CheckCircle2, TrendingUp, AlertCircle, ArrowUpRight } from "lucide-react";

export function StoreIntelligenceSection({ analytics }: { analytics: RetailAnalytics }) {
  return (
    <section id="stores" className="py-20 border-t border-ink/12 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 mb-10">
        <SectionHeading
          index="04"
          eyebrow="LOCATION PERFORMANCE & CLUSTERING"
          lines={["STORE", "INTELLIGENCE"]}
          accent="magenta"
        />
        <p className="mt-4 max-w-2xl text-sm text-ink/70 leading-relaxed">
          Performance metrics across all 8 retail locations and practical K-Means store segmentation clusters.
        </p>
      </div>

      <HorizontalStory totalPanels={4} sectionTitle="STORE STORY">
        {/* Panel 1: Store Revenue Landscape */}
        <HorizontalPanel>
          <div className="card-editorial p-6 sm:p-8 border border-ink/12 bg-paper shadow-md h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-ink/12 pb-4 mb-6">
                <div>
                  <span className="eyebrow text-magenta text-xs block">PANEL 01 · STORE NETWORK OVERVIEW</span>
                  <h3 className="font-display text-xl font-bold text-ink uppercase mt-1">
                    Store Revenue Landscape
                  </h3>
                </div>
                <span className="eyebrow text-ink/50 text-[10px]">8 STORES TOTAL</span>
              </div>

              {/* Store Table Overview */}
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-ink/15 text-ink/50 uppercase">
                      <th className="pb-3 font-semibold">Rank</th>
                      <th className="pb-3 font-semibold">Store ID</th>
                      <th className="pb-3 font-semibold text-right">Total Revenue</th>
                      <th className="pb-3 font-semibold text-right">Units Sold</th>
                      <th className="pb-3 font-semibold text-right">Records</th>
                      <th className="pb-3 font-semibold text-right">Avg Discount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.stores.map((st) => {
                      const isLeader = st.id === analytics.storeLeader.id;
                      const isLaggard = st.id === analytics.storeLaggard.id;
                      return (
                        <tr
                          key={st.id}
                          className={`border-b border-ink/8 transition-colors ${
                            isLeader
                              ? "bg-teal/5 font-semibold text-ink"
                              : isLaggard
                              ? "bg-tangerine/5 font-semibold text-ink"
                              : "hover:bg-cream/50 text-ink/80"
                          }`}
                        >
                          <td className="py-3 font-mono text-ink/40">#{st.rank}</td>
                          <td className="py-3 font-sans font-bold text-sm text-ink flex items-center gap-2">
                            <Building2 className="h-3.5 w-3.5 text-ink/50" />
                            {st.id}
                            {isLeader && (
                              <span className="text-[9px] uppercase bg-teal text-ivory px-2 py-0.5 rounded font-mono">
                                HIGHER REVENUE
                              </span>
                            )}
                            {isLaggard && (
                              <span className="text-[9px] uppercase bg-tangerine text-ivory px-2 py-0.5 rounded font-mono">
                                LOWER REVENUE
                              </span>
                            )}
                          </td>
                          <td className="py-3 text-right font-bold text-ink">{fmtINR(st.revenue)}</td>
                          <td className="py-3 text-right">{fmtNum(st.units)}</td>
                          <td className="py-3 text-right">{fmtNum(st.records)}</td>
                          <td className="py-3 text-right">{fmtPct(st.discount)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-mono text-ink/50 border-t border-ink/12 pt-3">
              <span>Source: store_performance.csv</span>
              <span>Network Revenue Total: {fmtINR(analytics.monthlyTotal)}</span>
            </div>
          </div>
        </HorizontalPanel>

        {/* Panel 2: Highest Revenue Store */}
        <HorizontalPanel>
          <div className="card-editorial p-6 sm:p-8 border border-ink/12 bg-paper shadow-md h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-ink/12 pb-4 mb-6">
                <div>
                  <span className="eyebrow text-teal text-xs block">PANEL 02 · HIGHER REVENUE STORE</span>
                  <h3 className="font-display text-xl font-bold text-ink uppercase mt-1">
                    Store Revenue Leader: {analytics.storeLeader.id}
                  </h3>
                </div>
                <span className="eyebrow text-teal font-mono text-xs font-bold bg-teal/10 px-3 py-1 rounded-full border border-teal/20">
                  RANK #1
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="rounded-2xl border border-teal/20 bg-teal/5 p-5">
                  <span className="eyebrow text-[10px] text-teal block uppercase">Total Revenue</span>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-ink mt-2">
                    {fmtINR(analytics.storeLeader.revenue)}
                  </div>
                  <span className="text-xs text-ink/60 mt-2 block font-mono">
                    Highest sales realization in network
                  </span>
                </div>

                <div className="rounded-2xl border border-ink/12 bg-ivory p-5">
                  <span className="eyebrow text-[10px] text-ink/50 block uppercase">Units Sold</span>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-ink mt-2">
                    {fmtNum(analytics.storeLeader.units)}
                  </div>
                  <span className="text-xs text-ink/60 mt-2 block font-mono">
                    Recorded unit volume
                  </span>
                </div>

                <div className="rounded-2xl border border-ink/12 bg-ivory p-5">
                  <span className="eyebrow text-[10px] text-ink/50 block uppercase">Avg Discount</span>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-ink mt-2">
                    {fmtPct(analytics.storeLeader.discount)}
                  </div>
                  <span className="text-xs text-ink/60 mt-2 block font-mono">
                    Average location discount level
                  </span>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-ink/12 bg-cream/70 p-4">
                <div className="flex items-center gap-2 text-ink font-bold text-xs uppercase mb-1">
                  <CheckCircle2 className="h-4 w-4 text-teal" />
                  Store Leader Observation
                </div>
                <p className="text-xs text-ink/70 leading-relaxed font-sans">
                  {analytics.storeLeader.id} generated {fmtINR(analytics.storeLeader.revenue)} across {fmtNum(analytics.storeLeader.records)} transaction records, representing the top revenue-producing location in the analyzed network.
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-mono text-ink/50 border-t border-ink/12 pt-3">
              <span>Verified Store Finding</span>
              <span>STR_103 Top Performer</span>
            </div>
          </div>
        </HorizontalPanel>

        {/* Panel 3: Lower Revenue Store / Performance Signal */}
        <HorizontalPanel>
          <div className="card-editorial p-6 sm:p-8 border border-ink/12 bg-paper shadow-md h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-ink/12 pb-4 mb-6">
                <div>
                  <span className="eyebrow text-tangerine text-xs block">PANEL 03 · LOWER REVENUE STORE</span>
                  <h3 className="font-display text-xl font-bold text-ink uppercase mt-1">
                    Store Revenue Bound: {analytics.storeLaggard.id}
                  </h3>
                </div>
                <span className="eyebrow text-tangerine font-mono text-xs font-bold bg-tangerine/10 px-3 py-1 rounded-full border border-tangerine/20">
                  RANK #{analytics.storeCount}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="rounded-2xl border border-tangerine/20 bg-tangerine/5 p-5">
                  <span className="eyebrow text-[10px] text-tangerine block uppercase">Total Revenue</span>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-ink mt-2">
                    {fmtINR(analytics.storeLaggard.revenue)}
                  </div>
                  <span className="text-xs text-ink/60 mt-2 block font-mono">
                    Lower revenue bound in network
                  </span>
                </div>

                <div className="rounded-2xl border border-ink/12 bg-ivory p-5">
                  <span className="eyebrow text-[10px] text-ink/50 block uppercase">Units Sold</span>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-ink mt-2">
                    {fmtNum(analytics.storeLaggard.units)}
                  </div>
                  <span className="text-xs text-ink/60 mt-2 block font-mono">
                    Recorded sales volume
                  </span>
                </div>

                <div className="rounded-2xl border border-ink/12 bg-ivory p-5">
                  <span className="eyebrow text-[10px] text-ink/50 block uppercase">Avg Discount</span>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-ink mt-2">
                    {fmtPct(analytics.storeLaggard.discount)}
                  </div>
                  <span className="text-xs text-ink/60 mt-2 block font-mono">
                    Average location discount level
                  </span>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-ink/12 bg-cream/70 p-4">
                <div className="flex items-center gap-2 text-ink font-bold text-xs uppercase mb-1">
                  <AlertCircle className="h-4 w-4 text-tangerine" />
                  Store Lower Bound Signal
                </div>
                <p className="text-xs text-ink/70 leading-relaxed font-sans">
                  {analytics.storeLaggard.id} achieved {fmtINR(analytics.storeLaggard.revenue)} across {fmtNum(analytics.storeLaggard.records)} records. Revenue across all 8 stores remains within a tight bandwidth between {fmtINR(analytics.storeLaggard.revenue)} and {fmtINR(analytics.storeLeader.revenue)}.
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-mono text-ink/50 border-t border-ink/12 pt-3">
              <span>Verified Store Finding</span>
              <span>STR_106 Revenue Bound</span>
            </div>
          </div>
        </HorizontalPanel>

        {/* Panel 4: Store Segmentation (K-Means K=4) */}
        <HorizontalPanel>
          <div className="card-editorial p-6 sm:p-8 border border-ink/12 bg-paper shadow-md h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-ink/12 pb-4 mb-6">
                <div>
                  <span className="eyebrow text-magenta text-xs block">PANEL 04 · STORE SEGMENTATION</span>
                  <h3 className="font-display text-xl font-bold text-ink uppercase mt-1">
                    4 Practical K-Means Clusters
                  </h3>
                </div>
                <span className="eyebrow text-ink/50 text-[10px]">PRACTICAL SEGMENTATION</span>
              </div>

              <p className="text-xs text-ink/70 mb-5 leading-relaxed font-sans">
                Stores grouped into 4 practical K-Means segments based on total revenue, unit volume, average discount, average unit price, and revenue realization. (K=4 was selected as a practical business segmentation).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {analytics.clusters.map((cluster) => (
                  <div key={cluster.cluster} className="rounded-2xl border border-ink/12 bg-ivory p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-ink/10 pb-2 mb-2">
                        <span className="font-mono text-xs font-bold text-magenta uppercase">
                          {cluster.label} (CLUSTER {cluster.cluster})
                        </span>
                        <span className="eyebrow text-[10px] text-ink/50 font-mono">
                          {cluster.storeCount} STORE{cluster.storeCount > 1 ? "S" : ""}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {cluster.stores.map((stId) => (
                          <span key={stId} className="rounded bg-paper border border-ink/10 px-2 py-0.5 font-mono text-xs font-bold text-ink">
                            {stId}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs font-mono">
                        <div>
                          <span className="text-ink/40 block text-[9px] uppercase">Total Revenue</span>
                          <span className="font-bold text-ink">{fmtINR(cluster.totalRevenue)}</span>
                        </div>
                        <div>
                          <span className="text-ink/40 block text-[9px] uppercase">Total Units</span>
                          <span className="font-bold text-ink">{fmtNum(cluster.totalUnits)}</span>
                        </div>
                        <div>
                          <span className="text-ink/40 block text-[9px] uppercase">Avg Discount</span>
                          <span className="font-bold text-ink">{fmtPct(cluster.avgDiscount)}</span>
                        </div>
                        <div>
                          <span className="text-ink/40 block text-[9px] uppercase">Avg Unit Price</span>
                          <span className="font-bold text-ink">{fmtINR(cluster.avgUnitPrice)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-mono text-ink/50 border-t border-ink/12 pt-3">
              <span>Source: store_segmentation.csv</span>
              <span>Next: Forecasting →</span>
            </div>
          </div>
        </HorizontalPanel>
      </HorizontalStory>
    </section>
  );
}
