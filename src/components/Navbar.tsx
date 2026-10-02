"use client";

import { useEffect, useState } from "react";
import { Brain, Menu, X, ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "sales", label: "Sales" },
  { id: "categories", label: "Categories" },
  { id: "stores", label: "Stores" },
  { id: "forecast", label: "Forecast" },
  { id: "insights", label: "AI Insights" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("overview");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Top progress bar
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Active section detection
      const sections = NAV_ITEMS.map((item) =>
        document.getElementById(item.id)
      ).filter((el): el is HTMLElement => el !== null);

      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass hairline border-b bg-ivory/80 backdrop-blur-md">
      {/* Scroll progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-ink/5">
        <div
          className="h-full bg-tangerine transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        {/* Brand */}
        <button
          onClick={() => scrollTo("overview")}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-ivory transition-transform duration-300 group-hover:scale-105">
            <Brain className="h-4 w-4 text-tangerine" />
          </div>
          <div>
            <span className="font-display font-bold text-sm tracking-tight text-ink block uppercase">
              Retail Intelligence
            </span>
            <span className="eyebrow text-[9px] text-ink/50 block">
              Decision Support System
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "bg-ink text-ivory font-medium shadow-sm"
                    : "text-ink/60 hover:text-ink hover:bg-ink/5"
                }`}
              >
                {isActive && (
                  <span
                    className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-tangerine"
                    aria-hidden="true"
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Live Status indicator */}
        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex items-center gap-2 rounded-full border border-ink/10 bg-cream/60 px-3 py-1 text-[11px] font-mono text-ink/70">
            <span className="h-2 w-2 rounded-full bg-teal animate-pulse" />
            LIVE DATASET · 24M
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-ink/10 text-ink md:hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-ink/10 bg-ivory px-6 py-6 md:hidden shadow-xl">
          <nav className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-left font-mono text-xs uppercase tracking-wider ${
                  activeSection === item.id
                    ? "bg-ink text-ivory font-semibold"
                    : "text-ink/70 hover:bg-cream"
                }`}
              >
                <span>{item.label}</span>
                <ArrowUpRight className="h-4 w-4 opacity-50" />
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
