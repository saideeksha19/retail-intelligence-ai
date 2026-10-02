"use client";

import { useEffect, useState } from "react";
import { loadRetailData } from "@/lib/retailData";
import { computeRetailAnalytics, type RetailAnalytics } from "@/lib/derived";

import { BackgroundFX } from "@/components/BackgroundFX";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { OverviewDashboardSection } from "@/components/OverviewDashboardSection";
import { ExecutiveSummarySection } from "@/components/ExecutiveSummarySection";
import { MethodologyStrip } from "@/components/MethodologyStrip";
import { SalesIntelligenceSection } from "@/components/SalesIntelligenceSection";
import { CategoryIntelligenceSection } from "@/components/CategoryIntelligenceSection";
import { StoreIntelligenceSection } from "@/components/StoreIntelligenceSection";
import { ForecastingSection } from "@/components/ForecastingSection";
import { AIInsightsSection } from "@/components/AIInsightsSection";
import { ClosingSection } from "@/components/ClosingSection";
import { Brain, RefreshCw, AlertCircle } from "lucide-react";

export default function Home() {
  const [analytics, setAnalytics] = useState<RetailAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRetailData()
      .then((raw) => {
        const computed = computeRetailAnalytics(raw);
        setAnalytics(computed);
      })
      .catch((err) => {
        console.error("Error loading retail data:", err);
        setError("Failed to load retail analytics data.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-ivory text-ink flex items-center justify-center p-6 relative overflow-hidden">
        <BackgroundFX />
        <div className="card-editorial p-8 max-w-md w-full text-center border border-ink/10 bg-paper shadow-2xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-ivory mx-auto mb-4">
            <Brain className="h-6 w-6 text-tangerine animate-pulse" />
          </div>
          <h2 className="font-display text-xl font-bold text-ink uppercase tracking-tight">
            Retail Intelligence
          </h2>
          <p className="mt-2 text-xs font-mono text-ink/60">
            Initializing AI decision support &amp; 7 CSV data pipelines...
          </p>
          <div className="mt-6 h-1 w-full bg-ink/10 rounded-full overflow-hidden relative">
            <div className="h-full bg-tangerine anim-loading-bar w-1/2 rounded-full" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !analytics) {
    return (
      <main className="min-h-screen bg-ivory text-ink flex items-center justify-center p-6 relative overflow-hidden">
        <BackgroundFX />
        <div className="card-editorial p-8 max-w-md w-full text-center border border-coral/30 bg-paper shadow-2xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-coral text-ivory mx-auto mb-4">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h2 className="font-display text-xl font-bold text-ink uppercase tracking-tight">
            Data Loading Error
          </h2>
          <p className="mt-2 text-xs font-mono text-coral font-medium">
            {error || "Unable to compute analytics from CSV datasets."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2 font-mono text-xs text-ivory uppercase tracking-wider"
          >
            <RefreshCw className="h-3.5 w-3.5 text-tangerine" />
            Retry Connection
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-ivory text-ink selection:bg-tangerine/20 relative">
      <BackgroundFX />
      <Navbar />

      <main>
        {/* Hero Section */}
        <HeroSection analytics={analytics} />

        {/* Overview Dashboard Command Center */}
        <OverviewDashboardSection analytics={analytics} />

        {/* Executive Summary Signal Blocks */}
        <ExecutiveSummarySection analytics={analytics} />

        {/* Methodology Strip */}
        <MethodologyStrip />

        {/* Sales Intelligence */}
        <SalesIntelligenceSection analytics={analytics} />

        {/* Category Intelligence */}
        <CategoryIntelligenceSection analytics={analytics} />

        {/* Store Intelligence & Segmentation */}
        <StoreIntelligenceSection analytics={analytics} />

        {/* Forecasting */}
        <ForecastingSection analytics={analytics} />

        {/* AI Insights */}
        <AIInsightsSection analytics={analytics} />
      </main>

      {/* Closing Section & Footer */}
      <ClosingSection />
    </div>
  );
}