"use client";

import { Reveal } from "./Reveal";

export function MethodologyStrip() {
  return (
    <section className="py-12 border-y border-ink/10 bg-paper/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col border-l-2 border-l-tangerine pl-4">
              <span className="eyebrow text-ink/50 text-[10px] uppercase">DATA</span>
              <span className="font-mono text-xs font-bold text-ink mt-1">
                Jan 2023–Dec 2024 · ~73K Records
              </span>
            </div>

            <div className="flex flex-col border-l-2 border-l-teal pl-4">
              <span className="eyebrow text-ink/50 text-[10px] uppercase">MODELING</span>
              <span className="font-mono text-xs font-bold text-ink mt-1">
                Seasonal Naïve · Holt ES · SARIMA
              </span>
            </div>

            <div className="flex flex-col border-l-2 border-l-magenta pl-4">
              <span className="eyebrow text-ink/50 text-[10px] uppercase">SEGMENTATION</span>
              <span className="font-mono text-xs font-bold text-ink mt-1">
                K-Means · 4 Practical Segments
              </span>
            </div>

            <div className="flex flex-col border-l-2 border-l-coral pl-4">
              <span className="eyebrow text-ink/50 text-[10px] uppercase">OUTPUT</span>
              <span className="font-mono text-xs font-bold text-ink mt-1">
                Forecasting · Decision Support
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
