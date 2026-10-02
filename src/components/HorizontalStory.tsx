"use client";

import { ReactNode, useEffect, useRef, useState, useCallback } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface HorizontalStoryProps {
  children: ReactNode;
  totalPanels?: number;
  sectionTitle?: string;
  className?: string;
  sectionId?: string;
}

export function HorizontalStory({
  children,
  totalPanels = 4,
  sectionTitle = "HORIZONTAL STORY",
  className = "",
  sectionId,
}: HorizontalStoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Synchronize vertical scroll -> activeIndex on desktop
  useEffect(() => {
    if (!isDesktop || reducedMotion) return;

    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (!containerRef.current) return;

        // Do not let vertical scroll listener overwrite activeIndex during button navigation
        if (isNavigatingRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const totalScrollable = rect.height - windowHeight;

        if (totalScrollable <= 0) return;

        // Scroll progress within hs-outer (0 to 1)
        const currentScroll = -rect.top;
        const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

        // Derive activeIndex directly from scroll progress
        const computedIndex = Math.min(
          totalPanels - 1,
          Math.max(0, Math.round(progress * (totalPanels - 1)))
        );

        setActiveIndex(computedIndex);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isDesktop, reducedMotion, totalPanels]);

  // Single function to update activeIndex
  const goToPanel = useCallback(
    (index: number) => {
      const clampedIndex = Math.max(0, Math.min(index, totalPanels - 1));
      setActiveIndex(clampedIndex);

      // Lock scroll listener temporarily so button navigation has priority
      isNavigatingRef.current = true;
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 700);
    },
    [totalPanels]
  );

  const handlePrev = () => {
    if (activeIndex > 0) {
      goToPanel(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < totalPanels - 1) {
      goToPanel(activeIndex + 1);
    }
  };

  // Keyboard navigation when section is in viewport
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      if (!inView) return;

      if (e.key === "ArrowLeft" || e.key === "Left") {
        if (activeIndex > 0) {
          e.preventDefault();
          handlePrev();
        }
      } else if (e.key === "ArrowRight" || e.key === "Right") {
        if (activeIndex < totalPanels - 1) {
          e.preventDefault();
          handleNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, totalPanels]);

  const canPrev = activeIndex > 0;
  const canNext = activeIndex < totalPanels - 1;
  const displayNum = String(activeIndex + 1).padStart(2, "0");
  const totalNum = String(totalPanels).padStart(2, "0");

  // Mobile / Reduced Motion fallback
  if (!isDesktop || reducedMotion) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex items-center justify-between border-b border-ink/12 pb-3 mb-4">
          <span className="eyebrow text-tangerine text-xs">
            {sectionTitle} · {displayNum} / {totalNum}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={!canPrev}
              aria-label="Previous panel"
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full border border-ink/15 font-mono text-xs font-bold transition-all ${
                canPrev
                  ? "bg-paper text-ink hover:bg-ink hover:text-ivory cursor-pointer"
                  : "opacity-40 cursor-not-allowed bg-ivory text-ink/40"
              }`}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>PREV</span>
            </button>
            <button
              onClick={handleNext}
              disabled={!canNext}
              aria-label="Next panel"
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full border border-ink/15 font-mono text-xs font-bold transition-all ${
                canNext
                  ? "bg-paper text-ink hover:bg-ink hover:text-ivory cursor-pointer"
                  : "opacity-40 cursor-not-allowed bg-ivory text-ink/40"
              }`}
            >
              <span>NEXT</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="space-y-8">{children}</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      id={sectionId}
      className={`hs-outer relative h-[300vh] w-full overflow-hidden ${className}`}
    >
      <div className="hs-sticky sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        {/* Navigation Bar Header */}
        <div className="absolute top-6 left-8 right-8 z-30 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3 bg-paper border border-ink/15 px-4 py-2 rounded-full shadow-sm">
            <span className="eyebrow text-tangerine text-[10px]">
              {sectionTitle}
            </span>
            <span className="font-mono text-xs font-bold text-ink">
              {displayNum} / {totalNum}
            </span>
          </div>

          <div className="flex items-center gap-2 bg-paper border border-ink/15 px-3 py-1.5 rounded-full shadow-sm">
            <button
              onClick={handlePrev}
              disabled={!canPrev}
              aria-label="Previous panel"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-xs font-bold transition-all ${
                canPrev
                  ? "bg-ink text-ivory hover:bg-tangerine hover:text-ink shadow-xs cursor-pointer"
                  : "opacity-40 cursor-not-allowed bg-ivory text-ink/40"
              }`}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>PREVIOUS</span>
            </button>

            <span className="h-3 w-px bg-ink/15" aria-hidden="true" />

            <button
              onClick={handleNext}
              disabled={!canNext}
              aria-label="Next panel"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-xs font-bold transition-all ${
                canNext
                  ? "bg-ink text-ivory hover:bg-tangerine hover:text-ink shadow-xs cursor-pointer"
                  : "opacity-40 cursor-not-allowed bg-ivory text-ink/40"
              }`}
            >
              <span>NEXT</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Progress Line */}
        <div className="absolute top-20 left-8 right-8 h-1 bg-ink/10 rounded-full overflow-hidden z-20">
          <div
            className="h-full bg-tangerine transition-all duration-300 ease-out rounded-full"
            style={{ width: `${((activeIndex + 1) / totalPanels) * 100}%` }}
          />
        </div>

        {/* Story Viewport: overflow hidden, 100% width */}
        <div className="relative w-full overflow-hidden pt-12">
          {/* Track: flex flex-nowrap w-full, transform 100% per activeIndex */}
          <div
            className="flex flex-nowrap w-full transition-transform duration-500 ease-out"
            style={{
              transform: `translate3d(${-activeIndex * 100}%, 0, 0)`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HorizontalPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`shrink-0 grow-0 basis-full w-full min-w-full max-w-full box-border px-6 sm:px-12 ${className}`}
    >
      <div className="mx-auto max-w-6xl w-full h-full">
        {children}
      </div>
    </div>
  );
}
