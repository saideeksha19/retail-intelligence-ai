"use client";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { AnimatedNumber } from "./AnimatedNumber";
import type { RetailAnalytics } from "@/lib/derived";
import { fmtINR } from "@/lib/derived";
import { Sparkles, Trophy, Store, AlertCircle, TrendingUp, Layers, Calendar } from "lucide-react";

export function ExecutiveSummarySection({ analytics }: { analytics: RetailAnalytics }) {
  return (
    <section className="py-20 border-t border-ink/10 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          index="01"
          eyebrow="EXECUTIVE SUMMARY"
          lines={["THE SIGNAL", "AT A GLANCE"]}
          accent="coral"
        />

        {/* Executive Blocks Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Block 1: Revenue Leader */}
          <Reveal delay={100}>
            <div className="card-editorial p-6 border-l-4 border-l-coral bg-paper/90 relative overflow-hidden h-full">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-[10px] text-ink/50">REVENUE LEADER</span>
                <Trophy className="h-4 w-4 text-coral" />
              </div>
              <h3 className="font-display text-2xl font-bold text-ink mt-3 uppercase tracking-tight">
                {analytics.categoryLeader.name}
              </h3>
              <p className="mt-2 text-sm text-ink/70">
                Highest-revenue category producing{" "}
                <span className="font-mono font-semibold text-ink">
                  {fmtINR(analytics.categoryLeader.revenue)}
                </span>{" "}
                ({analytics.categoryLeader.share.toFixed(1)}% of total).
              </p>
            </div>
          </Reveal>

          {/* Block 2: Store Revenue Leader */}
          <Reveal delay={150}>
            <div className="card-editorial p-6 border-l-4 border-l-teal bg-paper/90 relative overflow-hidden h-full">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-[10px] text-ink/50">STORE REVENUE LEADER</span>
                <Store className="h-4 w-4 text-teal" />
              </div>
              <h3 className="font-display text-2xl font-bold text-ink mt-3 uppercase tracking-tight">
                {analytics.storeLeader.id}
              </h3>
              <p className="mt-2 text-sm text-ink/70">
                Top performing location generating{" "}
                <span className="font-mono font-semibold text-ink">
                  {fmtINR(analytics.storeLeader.revenue)}
                </span>{" "}
                in sales.
              </p>
            </div>
          </Reveal>

          {/* Block 3: Lower Revenue Store */}
          <Reveal delay={200}>
            <div className="card-editorial p-6 border-l-4 border-l-tangerine bg-paper/90 relative overflow-hidden h-full">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-[10px] text-ink/50">LOWER REVENUE STORE</span>
                <AlertCircle className="h-4 w-4 text-tangerine" />
              </div>
              <h3 className="font-display text-2xl font-bold text-ink mt-3 uppercase tracking-tight">
                {analytics.storeLaggard.id}
              </h3>
              <p className="mt-2 text-sm text-ink/70">
                Lowest revenue location in network at{" "}
                <span className="font-mono font-semibold text-ink">
                  {fmtINR(analytics.storeLaggard.revenue)}
                </span>
                .
              </p>
            </div>
          </Reveal>

          {/* Block 4: Forecasting Signal */}
          <Reveal delay={250}>
            <div className="card-editorial p-6 border-l-4 border-l-magenta bg-paper/90 relative overflow-hidden h-full">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-[10px] text-ink/50">FORECASTING SIGNAL</span>
                <TrendingUp className="h-4 w-4 text-magenta" />
              </div>
              <h3 className="font-display text-xl font-bold text-ink mt-3 uppercase tracking-tight">
                Seasonal Naïve Baseline
              </h3>
              <p className="mt-2 text-xs text-ink/70 leading-relaxed">
                Seasonal Naïve showed the strongest holdout performance among the evaluated models on this dataset.
              </p>
            </div>
          </Reveal>

          {/* Block 5: Store Intelligence */}
          <Reveal delay={300}>
            <div className="card-editorial p-6 border-l-4 border-l-gold bg-paper/90 relative overflow-hidden h-full">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-[10px] text-ink/50">STORE INTELLIGENCE</span>
                <Layers className="h-4 w-4 text-gold" />
              </div>
              <h3 className="font-display text-xl font-bold text-ink mt-3 uppercase tracking-tight">
                4 K-Means Segments
              </h3>
              <p className="mt-2 text-xs text-ink/70 leading-relaxed">
                4 practical K-Means store segments clustering revenue density, volume &amp; discount profile.
              </p>
            </div>
          </Reveal>

          {/* Block 6: Forecast Horizon */}
          <Reveal delay={350}>
            <div className="card-editorial p-6 border-l-4 border-l-ink bg-paper/90 relative overflow-hidden h-full">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-[10px] text-ink/50">FORECAST HORIZON</span>
                <Calendar className="h-4 w-4 text-ink" />
              </div>
              <h3 className="font-display text-xl font-bold text-ink mt-3 uppercase tracking-tight">
                Jan–Jun 2025
              </h3>
              <p className="mt-2 text-xs text-ink/70 leading-relaxed">
                6-month forward monthly projections with evaluated model predictions.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Executive Summary Quote Banner */}
        <Reveal delay={400}>
          <div className="mt-12 rounded-3xl border border-ink/10 bg-cream/70 p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="mx-auto max-w-4xl">
              <span className="eyebrow text-tangerine text-xs uppercase tracking-widest block mb-4">
                CORE SYSTEM PURPOSE
              </span>
              <p className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold text-ink leading-snug tracking-tight">
                &ldquo;Retail Intelligence transforms historical retail data into a connected decision-support workflow — revealing where revenue comes from, how stores differ, what future revenue may look like, and which signals deserve attention.&rdquo;
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
