"use client";

import { Reveal } from "./Reveal";
import { Brain, ArrowUpRight } from "lucide-react";

export function ClosingSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-28 border-t border-ink/15 bg-paper relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          {/* Main Closing Copy */}
          <Reveal>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-ivory">
                  <Brain className="h-5 w-5 text-tangerine" />
                </div>
                <span className="eyebrow text-ink/50 text-xs">
                  RETAIL INTELLIGENCE PLATFORM
                </span>
              </div>

              <h2 className="display-tight text-[clamp(2.5rem,6vw,5.5rem)] font-bold uppercase text-ink leading-[0.9]">
                From Data
                <br />
                <span className="text-tangerine">To Signal.</span>
                <br />
                From Signal
                <br />
                <span className="text-teal">To Decisions.</span>
              </h2>

              <p className="mt-8 font-display text-lg sm:text-xl font-semibold text-ink/80 max-w-xl">
                Retail Intelligence — AI-Powered Sales Forecasting &amp; Decision Support System
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-xs text-ink/70">
                <span className="font-bold text-tangerine">SEE THE SIGNAL.</span>
                <span>·</span>
                <span className="font-bold text-teal">FORECAST THE FUTURE.</span>
                <span>·</span>
                <span className="font-bold text-magenta">MAKE BETTER DECISIONS.</span>
              </div>
            </div>
          </Reveal>

          {/* Quick Jump & Meta */}
          <Reveal delay={200}>
            <div className="card-editorial p-8 border border-ink/10 bg-ivory flex flex-col justify-between">
              <div>
                <span className="eyebrow text-ink/40 text-[10px] block mb-2">SYSTEM VERIFICATION</span>
                <p className="font-mono text-xs text-ink/80 leading-relaxed">
                  All metrics, store clusters, holdout tests &amp; forecasting projections are computed deterministically from the 7 validated CSV datasets.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-ink/10 flex items-center justify-between">
                <button
                  onClick={scrollToTop}
                  className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-ivory transition-transform hover:scale-105"
                >
                  <span>Return to Top</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-tangerine" />
                </button>
                <span className="eyebrow text-[9px] text-ink/40">v1.0 REAL DATA</span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 pt-8 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-ink/50 gap-4">
          <span>© {new Date().getFullYear()} Retail Intelligence System</span>
          <span>Validated Sales Forecasting Pipeline</span>
        </div>
      </div>
    </footer>
  );
}
