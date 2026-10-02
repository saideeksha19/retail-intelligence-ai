"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { AnimatedNumber } from "./AnimatedNumber";
import type { RetailAnalytics } from "@/lib/derived";
import { ArrowRight, BarChart3, Brain, Database, Cpu, Target, ChevronDown } from "lucide-react";

export function HeroSection({ analytics }: { analytics: RetailAnalytics }) {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Editorial Eyebrow & Metadata */}
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-3.5 py-1.5 text-ink shadow-sm">
              <span className="h-2 w-2 rounded-full bg-tangerine" />
              SYSTEM ARCHITECTURE &amp; INTELLIGENCE
            </span>
            <span className="eyebrow text-ink/50 font-mono text-[11px]">
              {analytics.rangeStartLabel} — {analytics.rangeEndLabel}
            </span>
          </div>
        </Reveal>

        {/* Oversized Editorial Heading */}
        <Reveal delay={100}>
          <div className="mt-8">
            <h1 className="display-tight text-[clamp(3.5rem,11vw,9.5rem)] font-bold leading-[0.88] text-ink tracking-tight uppercase">
              Retail
              <br />
              <span className="text-outline hover:text-ink transition-colors duration-500">
                Intelligence
              </span>
            </h1>
          </div>
        </Reveal>

        {/* Subtitle & Transformation Path */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <Reveal delay={200}>
            <div>
              <p className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-ink">
                AI-Powered Sales Forecasting &amp; Decision Support System
              </p>

              {/* Transformation Path Strip */}
              <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-xs text-ink bg-cream/80 border border-ink/15 rounded-2xl p-4 sm:p-5 shadow-sm">
                <span className="font-bold text-ink">Historical Retail Data</span>
                <ArrowRight className="h-3.5 w-3.5 text-tangerine shrink-0" />
                <span className="font-bold text-ink">Business Insights</span>
                <ArrowRight className="h-3.5 w-3.5 text-tangerine shrink-0" />
                <span className="font-bold text-ink">Predictive Intelligence</span>
                <ArrowRight className="h-3.5 w-3.5 text-tangerine shrink-0" />
                <span className="font-bold text-tangerine">Decision Support</span>
              </div>
            </div>
          </Reveal>

          {/* Factual Dataset Metadata Badges */}
          <Reveal delay={300}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              <div className="card-editorial p-4 border border-ink/12 bg-paper">
                <span className="eyebrow text-[10px] text-ink/50 block">Time Horizon</span>
                <span className="font-mono text-sm font-bold text-ink mt-1 block">
                  JAN 2023 — DEC 2024
                </span>
              </div>

              <div className="card-editorial p-4 border border-ink/12 bg-paper">
                <span className="eyebrow text-[10px] text-ink/50 block">Dataset Volume</span>
                <span className="font-mono text-sm font-bold text-ink mt-1 block">
                  <AnimatedNumber
                    value={analytics.recordsTotal}
                    format={(v) => `~${Math.round(v / 1000)}K RECORDS`}
                  />
                </span>
              </div>

              <div className="card-editorial p-4 border border-ink/12 bg-paper">
                <span className="eyebrow text-[10px] text-ink/50 block">Product Spectrum</span>
                <span className="font-mono text-sm font-bold text-ink mt-1 block">
                  {analytics.categoryCount} CATEGORIES
                </span>
              </div>

              <div className="card-editorial p-4 border border-ink/12 bg-paper">
                <span className="eyebrow text-[10px] text-ink/50 block">Store Network</span>
                <span className="font-mono text-sm font-bold text-ink mt-1 block">
                  {analytics.storeCount} STORES
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* System Architecture Section with Real Visible Animated Arrow Connectors */}
        <Reveal delay={400}>
          <div id="architecture" className="mt-16 card-editorial p-6 sm:p-8 lg:p-10 border border-ink/12 bg-paper shadow-md">
            <div className="flex items-center justify-between border-b border-ink/12 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-tangerine" />
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-ink">
                  SYSTEM ARCHITECTURE
                </h3>
              </div>
              <span className="eyebrow text-[10px] text-ink/50">ENTERPRISE PIPELINE</span>
            </div>

            {/* Architecture Visual Image (if present) */}
            {!imgError && (
              <div className="relative w-full overflow-hidden rounded-xl bg-ivory/60 flex items-center justify-center p-2 mb-8 border border-ink/10">
                <img
                  src="/architecture.png"
                  alt="System Architecture Diagram"
                  onError={() => setImgError(true)}
                  className="max-h-[480px] w-auto max-w-full object-contain mx-auto"
                />
              </div>
            )}

            {/* Stage Pipeline Flow with Visible Directional Arrows & Animated Moving Dashes */}
            <div className="py-4">
              {/* Desktop Horizontal Flow with Explicit Visible SVG Connectors */}
              <div className="hidden lg:grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-2">
                {/* Stage 1: ANALYTICS */}
                <div className="rounded-2xl border border-ink/12 bg-ivory p-5 h-full flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="flex items-center justify-between text-tangerine mb-3">
                      <Database className="h-5 w-5" />
                      <span className="eyebrow text-[10px] text-ink/40">STAGE 01</span>
                    </div>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink block mb-2">
                      ANALYTICS
                    </span>
                    <p className="text-xs text-ink/70 leading-relaxed font-sans">
                      Sales records, store metrics &amp; product performance extracted from 24 months of retail history.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-ink/10 font-mono text-[10px] text-ink/50">
                    24 Months · ~73K Records
                  </div>
                </div>

                {/* Connector 1: ANALYTICS → AI / ML */}
                <div className="flex flex-col items-center justify-center px-1">
                  <svg width="48" height="24" viewBox="0 0 48 24" fill="none" className="overflow-visible">
                    <defs>
                      <marker id="arrow1" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#FF8A3D" />
                      </marker>
                    </defs>
                    <line x1="0" y1="12" x2="42" y2="12" stroke="#202124" strokeWidth="2" markerEnd="url(#arrow1)" />
                    <line x1="0" y1="12" x2="42" y2="12" stroke="#FF8A3D" strokeWidth="2" className="anim-flow-line" markerEnd="url(#arrow1)" />
                  </svg>
                </div>

                {/* Stage 2: AI / ML */}
                <div className="rounded-2xl border border-ink/12 bg-ivory p-5 h-full flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="flex items-center justify-between text-teal mb-3">
                      <Cpu className="h-5 w-5" />
                      <span className="eyebrow text-[10px] text-ink/40">STAGE 02</span>
                    </div>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink block mb-2">
                      AI / ML
                    </span>
                    <p className="text-xs text-ink/70 leading-relaxed font-sans">
                      K-Means store clustering + comparative forecasting model evaluation (Seasonal Naïve, Holt ES, SARIMA).
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-ink/10 font-mono text-[10px] text-ink/50">
                    4 K-Means Segments
                  </div>
                </div>

                {/* Connector 2: AI / ML → PREDICTIVE INTELLIGENCE */}
                <div className="flex flex-col items-center justify-center px-1">
                  <svg width="48" height="24" viewBox="0 0 48 24" fill="none" className="overflow-visible">
                    <defs>
                      <marker id="arrow2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#19B7A5" />
                      </marker>
                    </defs>
                    <line x1="0" y1="12" x2="42" y2="12" stroke="#202124" strokeWidth="2" markerEnd="url(#arrow2)" />
                    <line x1="0" y1="12" x2="42" y2="12" stroke="#19B7A5" strokeWidth="2" className="anim-flow-line" markerEnd="url(#arrow2)" />
                  </svg>
                </div>

                {/* Stage 3: PREDICTIVE INTELLIGENCE */}
                <div className="rounded-2xl border border-ink/12 bg-ivory p-5 h-full flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="flex items-center justify-between text-magenta mb-3">
                      <Target className="h-5 w-5" />
                      <span className="eyebrow text-[10px] text-ink/40">STAGE 03</span>
                    </div>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink block mb-2">
                      PREDICTIVE INTELLIGENCE
                    </span>
                    <p className="text-xs text-ink/70 leading-relaxed font-sans">
                      Holdout test validation and 6-month forward monthly revenue projections (Jan–Jun 2025).
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-ink/10 font-mono text-[10px] text-ink/50">
                    6-Month Projections
                  </div>
                </div>

                {/* Connector 3: PREDICTIVE INTELLIGENCE → DECISION SUPPORT */}
                <div className="flex flex-col items-center justify-center px-1">
                  <svg width="48" height="24" viewBox="0 0 48 24" fill="none" className="overflow-visible">
                    <defs>
                      <marker id="arrow3" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#D94F9D" />
                      </marker>
                    </defs>
                    <line x1="0" y1="12" x2="42" y2="12" stroke="#202124" strokeWidth="2" markerEnd="url(#arrow3)" />
                    <line x1="0" y1="12" x2="42" y2="12" stroke="#D94F9D" strokeWidth="2" className="anim-flow-line" markerEnd="url(#arrow3)" />
                  </svg>
                </div>

                {/* Stage 4: DECISION SUPPORT */}
                <div className="rounded-2xl border border-ink/12 bg-ivory p-5 h-full flex flex-col justify-between shadow-xs">
                  <div>
                    <div className="flex items-center justify-between text-coral mb-3">
                      <Brain className="h-5 w-5" />
                      <span className="eyebrow text-[10px] text-ink/40">STAGE 04</span>
                    </div>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink block mb-2">
                      DECISION SUPPORT
                    </span>
                    <p className="text-xs text-ink/70 leading-relaxed font-sans">
                      Interactive decision support interface revealing high-value revenue drivers and business signals.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-ink/10 font-mono text-[10px] text-coral font-bold">
                    Actionable Signals
                  </div>
                </div>
              </div>

              {/* Mobile Vertical Flow with Explicit Down SVG Arrows */}
              <div className="flex flex-col gap-3 lg:hidden">
                <div className="rounded-2xl border border-ink/12 bg-ivory p-5 shadow-xs">
                  <div className="flex items-center justify-between text-tangerine mb-2">
                    <Database className="h-5 w-5" />
                    <span className="eyebrow text-[10px] text-ink/40">STAGE 01</span>
                  </div>
                  <span className="font-mono text-xs font-bold uppercase text-ink block">ANALYTICS</span>
                  <p className="text-xs text-ink/70 mt-1">Sales records, store metrics &amp; category spectrum.</p>
                </div>

                <div className="flex justify-center my-1">
                  <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
                    <line x1="12" y1="0" x2="12" y2="28" stroke="#FF8A3D" strokeWidth="2" className="anim-flow-line" />
                    <polygon points="6,26 18,26 12,34" fill="#FF8A3D" />
                  </svg>
                </div>

                <div className="rounded-2xl border border-ink/12 bg-ivory p-5 shadow-xs">
                  <div className="flex items-center justify-between text-teal mb-2">
                    <Cpu className="h-5 w-5" />
                    <span className="eyebrow text-[10px] text-ink/40">STAGE 02</span>
                  </div>
                  <span className="font-mono text-xs font-bold uppercase text-ink block">AI / ML</span>
                  <p className="text-xs text-ink/70 mt-1">K-Means store clustering &amp; forecasting model evaluation.</p>
                </div>

                <div className="flex justify-center my-1">
                  <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
                    <line x1="12" y1="0" x2="12" y2="28" stroke="#19B7A5" strokeWidth="2" className="anim-flow-line" />
                    <polygon points="6,26 18,26 12,34" fill="#19B7A5" />
                  </svg>
                </div>

                <div className="rounded-2xl border border-ink/12 bg-ivory p-5 shadow-xs">
                  <div className="flex items-center justify-between text-magenta mb-2">
                    <Target className="h-5 w-5" />
                    <span className="eyebrow text-[10px] text-ink/40">STAGE 03</span>
                  </div>
                  <span className="font-mono text-xs font-bold uppercase text-ink block">PREDICTIVE INTELLIGENCE</span>
                  <p className="text-xs text-ink/70 mt-1">Holdout validation &amp; 6-month forward projections.</p>
                </div>

                <div className="flex justify-center my-1">
                  <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
                    <line x1="12" y1="0" x2="12" y2="28" stroke="#D94F9D" strokeWidth="2" className="anim-flow-line" />
                    <polygon points="6,26 18,26 12,34" fill="#D94F9D" />
                  </svg>
                </div>

                <div className="rounded-2xl border border-ink/12 bg-ivory p-5 shadow-xs">
                  <div className="flex items-center justify-between text-coral mb-2">
                    <Brain className="h-5 w-5" />
                    <span className="eyebrow text-[10px] text-ink/40">STAGE 04</span>
                  </div>
                  <span className="font-mono text-xs font-bold uppercase text-ink block">DECISION SUPPORT</span>
                  <p className="text-xs text-ink/70 mt-1">Interactive decision support &amp; revenue drivers.</p>
                </div>
              </div>
            </div>

            {/* Pipeline Text Strip */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 font-mono text-xs uppercase tracking-widest text-ink/70 border-t border-ink/12 pt-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-ink">ANALYTICS</span>
                <span className="text-tangerine font-bold">──────►</span>
                <span className="font-bold text-ink">AI / ML</span>
                <span className="text-tangerine font-bold">──────►</span>
                <span className="font-bold text-ink">PREDICTIVE INTELLIGENCE</span>
                <span className="text-tangerine font-bold">──────►</span>
                <span className="font-bold text-tangerine">DECISION SUPPORT</span>
              </div>
              <span className="text-[10px] text-ink/50">CONNECTED PIPELINE</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
