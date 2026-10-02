"use client";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import type { RetailAnalytics } from "@/lib/derived";
import { fmtINR } from "@/lib/derived";
import { Brain, Sparkles, Compass, CheckCircle, BarChart, Store, Calendar, Layers, ArrowRight } from "lucide-react";

export function AIInsightsSection({ analytics }: { analytics: RetailAnalytics }) {
  const INSIGHTS = [
    {
      badge: "SIGNAL",
      badgeColor: "bg-coral text-paper",
      title: "Category Revenue Leader",
      evidence: `Product Category: ${analytics.categoryLeader.name}`,
      implication: `${analytics.categoryLeader.name} generates ${fmtINR(analytics.categoryLeader.revenue)} (${analytics.categoryLeader.share.toFixed(1)}% of total revenue), making it the primary revenue driver in the network spectrum.`,
      icon: BarChart,
    },
    {
      badge: "OBSERVATION",
      badgeColor: "bg-teal text-paper",
      title: "Top Store Revenue Generator",
      evidence: `Store ID: ${analytics.storeLeader.id}`,
      implication: `${analytics.storeLeader.id} achieves the highest total revenue across all 8 store locations at ${fmtINR(analytics.storeLeader.revenue)}.`,
      icon: Store,
    },
    {
      badge: "PATTERN",
      badgeColor: "bg-tangerine text-paper",
      title: "Store Network Revenue Bound",
      evidence: `Store ID: ${analytics.storeLaggard.id}`,
      implication: `${analytics.storeLaggard.id} recorded ${fmtINR(analytics.storeLaggard.revenue)}, representing the lower bound of network store revenue distribution.`,
      icon: Store,
    },
    {
      badge: "SIGNAL",
      badgeColor: "bg-gold text-paper",
      title: "24-Month Sales Trajectory Variation",
      evidence: `Peak: ${analytics.peak.label} (${fmtINR(analytics.peak.revenue)})`,
      implication: `Monthly sales exhibit seasonal variance across the 24-month period (Jan 2023 – Dec 2024), establishing predictable Q4 seasonal expansion.`,
      icon: Calendar,
    },
    {
      badge: "DECISION CONSIDERATION",
      badgeColor: "bg-magenta text-paper",
      title: "Strongest Forecasting Method",
      evidence: "Evaluated Models: Seasonal Naïve, Holt ES, SARIMA",
      implication: "Seasonal Naïve showed the strongest holdout performance among the evaluated models on this dataset according to MAE, RMSE, R², and MAPE metrics.",
      icon: Brain,
    },
    {
      badge: "PATTERN",
      badgeColor: "bg-ink text-paper",
      title: "Store Segmentation Profile",
      evidence: "4 Practical K-Means Clusters",
      implication: "Stores cluster into 4 practical segments based on revenue density, unit volume, average discount, and realization rate.",
      icon: Layers,
    },
    {
      badge: "OBSERVATION",
      badgeColor: "bg-teal text-paper",
      title: "6-Month Forecast Horizon",
      evidence: `Horizon: Jan–Jun 2025 (${analytics.forecastHorizon})`,
      implication: `Projected 6-month revenue totals ${fmtINR(analytics.forecastTotal)}, providing baseline operational visibility for H1 2025.`,
      icon: Compass,
    },
  ];

  return (
    <section id="insights" className="py-20 border-t border-ink/12 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Heading */}
        <SectionHeading
          index="06"
          eyebrow="AI-GENERATED DECISION SUPPORT"
          lines={["AI", "INSIGHTS"]}
          accent="magenta"
        />
        <p className="mt-4 max-w-2xl text-sm text-ink/70 leading-relaxed">
          Analytical conclusions derived strictly from the validated retail dataset, structured by Signal → Evidence → Business Implication.
        </p>

        {/* Insights Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INSIGHTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 50}>
                <div className="card-editorial p-6 border border-ink/12 bg-paper relative overflow-hidden h-full flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`font-mono text-[10px] uppercase font-bold px-2.5 py-1 rounded-md ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                      <Icon className="h-4 w-4 text-ink/40" />
                    </div>

                    <h3 className="font-display text-lg font-bold text-ink mb-2">
                      {item.title}
                    </h3>

                    {/* Evidence pill */}
                    <div className="my-3 rounded-lg border border-ink/10 bg-ivory px-3 py-1.5 font-mono text-[11px] text-ink font-semibold flex items-center gap-1.5">
                      <ArrowRight className="h-3 w-3 text-tangerine shrink-0" />
                      <span>{item.evidence}</span>
                    </div>

                    <p className="text-xs text-ink/75 leading-relaxed font-sans mt-2">
                      {item.implication}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-ink/10 flex items-center gap-1.5 font-mono text-[10px] text-ink/50">
                    <CheckCircle className="h-3 w-3 text-teal" />
                    <span>Data-backed conclusion</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
