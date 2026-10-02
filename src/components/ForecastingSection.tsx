"use client";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { AnimatedNumber } from "./AnimatedNumber";
import { ChartTooltip } from "./ChartTooltip";
import type { RetailAnalytics } from "@/lib/derived";
import { fmtINR, fmtINRCompact, fmtPct } from "@/lib/derived";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { TrendingUp, Award, Calendar, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

export function ForecastingSection({ analytics }: { analytics: RetailAnalytics }) {
  // Combine series data for centerpiece chart
  const chartSeries = analytics.series.map((item) => ({
    date: item.label.replace(" 20", " "), // "Jan 23"
    fullLabel: item.label,
    actual: item.actual,
    predicted: item.predicted,
    forecast: item.forecast,
  }));

  return (
    <section id="forecast" className="py-20 border-t border-ink/12 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section Heading */}
        <SectionHeading
          index="05"
          eyebrow="PREDICTIVE INTELLIGENCE & HOLDOUT EVALUATION"
          lines={["THE", "FORECAST"]}
          accent="gold"
        />
        <p className="mt-4 max-w-2xl text-sm text-ink/70 leading-relaxed">
          6-month revenue forecasting (Jan 2025 – Jun 2025) backed by holdout model evaluation comparing Seasonal Naïve, Holt Exponential Smoothing, and SARIMA.
        </p>

        {/* Downward Flow Block 1: Pipeline Stage Indicator */}
        <Reveal delay={100}>
          <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-xs text-ink bg-cream/80 border border-ink/15 rounded-2xl p-4 sm:p-5 shadow-sm">
            <span className="font-bold text-ink uppercase">HISTORICAL (Jan 23–Dec 24)</span>
            <span className="text-tangerine font-bold">→</span>
            <span className="font-bold text-ink uppercase">HOLDOUT (Jul 24–Dec 24)</span>
            <span className="text-tangerine font-bold">→</span>
            <span className="font-bold text-gold uppercase">FUTURE FORECAST (Jan 25–Jun 25)</span>
          </div>
        </Reveal>

        {/* Downward Flow Block 2: Centerpiece Forecast Chart */}
        <Reveal delay={200}>
          <div className="mt-8 card-editorial p-6 sm:p-8 border border-ink/12 bg-paper shadow-md">
            <div className="flex flex-wrap items-center justify-between border-b border-ink/12 pb-4 mb-6 gap-3">
              <div>
                <span className="eyebrow text-gold text-xs block">CENTERPIECE FORECAST VISUALIZATION</span>
                <h3 className="font-display text-xl font-bold text-ink uppercase mt-1">
                  Historical Revenue vs Holdout Prediction vs Projected Forecast
                </h3>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-gold font-bold bg-gold/10 px-3 py-1.5 rounded-full border border-gold/20">
                <Calendar className="h-3.5 w-3.5" />
                HORIZON: JAN–JUN 2025
              </div>
            </div>

            <div className="h-[360px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartSeries} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(32, 33, 36, 0.08)" />
                  <XAxis dataKey="date" interval={3} tickMargin={10} />
                  <YAxis tickFormatter={(v) => fmtINRCompact(v)} width={75} />
                  <Tooltip
                    content={({ active, payload, label }) => (
                      <ChartTooltip
                        active={active}
                        label={
                          chartSeries.find((d) => d.date === label)?.fullLabel || label
                        }
                        payload={
                          payload
                            ? payload.map((p) => ({
                                name:
                                  p.dataKey === "actual"
                                    ? "Historical Actual"
                                    : p.dataKey === "predicted"
                                    ? "Holdout Predicted"
                                    : "Future Forecast",
                                value: p.value as number,
                                color:
                                  p.dataKey === "actual"
                                    ? "#202124"
                                    : p.dataKey === "predicted"
                                    ? "#FF5C5C"
                                    : "#F4C542",
                              }))
                            : []
                        }
                        format={fmtINR}
                      />
                    )}
                  />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    formatter={(value) => (
                      <span className="font-mono text-xs text-ink font-semibold">
                        {value === "actual"
                          ? "Historical Revenue"
                          : value === "predicted"
                          ? "Holdout Predicted (Seasonal Naïve)"
                          : "Future Forecast (Jan–Jun 2025)"}
                      </span>
                    )}
                  />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    stroke="#202124"
                    strokeWidth={2}
                    fillOpacity={0.08}
                    fill="#202124"
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#FF5C5C"
                    strokeWidth={3}
                    strokeDasharray="4 4"
                    dot={{ r: 4, fill: "#FF5C5C" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke="#F4C542"
                    strokeWidth={4}
                    dot={{ r: 5, fill: "#F4C542" }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between text-xs font-mono text-ink/60 border-t border-ink/12 pt-3">
              <span>Source: future_revenue_forecast.csv (using Forecasted_Revenue)</span>
              <span>Projected Total 6-Month Revenue: {fmtINR(analytics.forecastTotal)}</span>
            </div>
          </div>
        </Reveal>

        {/* Downward Flow Block 3: Model Evaluation Table & Holdout Signal */}
        <Reveal delay={300}>
          <div className="mt-8 card-editorial p-6 sm:p-8 border border-ink/12 bg-paper shadow-md">
            <div className="flex items-center justify-between border-b border-ink/12 pb-4 mb-6">
              <div>
                <span className="eyebrow text-gold text-xs block">HOLDOUT MODEL EVALUATION</span>
                <h3 className="font-display text-xl font-bold text-ink uppercase mt-1">
                  Forecasting Model Performance Matrix
                </h3>
              </div>
              <span className="eyebrow text-ink/50 text-[10px]">VERIFIED COMPARISON</span>
            </div>

            {/* Model Evaluation Banner */}
            <div className="rounded-2xl border border-gold/30 bg-gold/10 p-5 mb-6">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-gold shrink-0" />
                <p className="font-display text-base font-bold text-ink">
                  Seasonal Naïve showed the strongest holdout performance among the evaluated models on this dataset.
                </p>
              </div>
              <p className="mt-2 text-xs text-ink/70 leading-relaxed font-mono">
                Evaluated against Holt Exponential Smoothing and SARIMA across holdout metrics (MAE, RMSE, R², MAPE).
              </p>
            </div>

            {/* Model Matrix Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-ink/15 text-ink/50 uppercase">
                    <th className="pb-3 font-semibold">Model</th>
                    <th className="pb-3 font-semibold text-right">MAE</th>
                    <th className="pb-3 font-semibold text-right">RMSE</th>
                    <th className="pb-3 font-semibold text-right">R²</th>
                    <th className="pb-3 font-semibold text-right">MAPE (%)</th>
                    <th className="pb-3 font-semibold text-center">Evaluation</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.models.map((mod) => {
                    const isBest = mod.model === analytics.bestModel.model;
                    return (
                      <tr
                        key={mod.model}
                        className={`border-b border-ink/8 ${
                          isBest ? "bg-gold/10 font-bold text-ink" : "hover:bg-cream/50 text-ink/80"
                        }`}
                      >
                        <td className="py-3.5 font-sans font-bold text-sm text-ink">{mod.model}</td>
                        <td className="py-3.5 text-right font-mono">{fmtINR(mod.mae)}</td>
                        <td className="py-3.5 text-right font-mono">{fmtINR(mod.rmse)}</td>
                        <td className="py-3.5 text-right font-mono">{mod.r2.toFixed(3)}</td>
                        <td className="py-3.5 text-right font-mono">{mod.mape.toFixed(2)}%</td>
                        <td className="py-3.5 text-center">
                          {isBest ? (
                            <span className="inline-flex items-center gap-1 text-[10px] uppercase bg-gold text-ink font-bold px-2 py-0.5 rounded">
                              <CheckCircle2 className="h-3 w-3" /> STRONGEST
                            </span>
                          ) : (
                            <span className="text-[10px] text-ink/40 uppercase">EVALUATED</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Monthly Forecast Grid */}
            <div className="mt-8 border-t border-ink/12 pt-5">
              <span className="eyebrow text-[10px] text-ink/50 block mb-3 uppercase font-bold">
                MONTHLY PROJECTED REVENUE (JAN–JUN 2025)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
                {analytics.forecast.map((f) => (
                  <div key={f.key} className="rounded-xl border border-ink/12 bg-ivory p-3.5 text-center shadow-xs">
                    <span className="text-ink/50 text-[10px] block uppercase font-semibold">{f.label}</span>
                    <span className="font-bold text-ink block mt-1.5 text-sm">{fmtINRCompact(f.value)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs font-mono text-ink/50 border-t border-ink/12 pt-3">
              <span>Source: forecast_model_comparison.csv &amp; future_revenue_forecast.csv</span>
              <span>Horizon: Jan–Jun 2025</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
