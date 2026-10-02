"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

const DOTS = [
  { top: "15%", left: "10%", size: 4, color: "#FF8A3D", delay: "0s" },
  { top: "35%", left: "82%", size: 4, color: "#19B7A5", delay: "0.8s" },
  { top: "55%", left: "6%", size: 3, color: "#D94F9D", delay: "1.6s" },
  { top: "75%", left: "92%", size: 4, color: "#F4C542", delay: "0.4s" },
  { top: "88%", left: "25%", size: 3, color: "#FF5C5C", delay: "2.2s" },
  { top: "42%", left: "50%", size: 3, color: "#19B7A5", delay: "1.2s" },
];

export function BackgroundFX() {
  const reducedMotion = usePrefersReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Soft restrained ambient radial washes (No heavy haze) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1000px 500px at 85% -5%, rgba(255,138,61,0.06), transparent 60%)," +
            "radial-gradient(800px 600px at -5% 35%, rgba(25,183,165,0.05), transparent 60%)," +
            "radial-gradient(800px 500px at 60% 105%, rgba(244,197,66,0.05), transparent 60%)",
        }}
      />

      {/* Restrained cursor spotlight */}
      {!reducedMotion && mousePos.x > 0 && (
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 138, 61, 0.04), transparent 80%)`,
          }}
        />
      )}

      {/* Faint analytical technical grid */}
      <div className="bg-grid-faint absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />

      {/* Thin analytical horizontal lines */}
      <div className="absolute top-[20%] left-0 h-px w-full bg-gradient-to-r from-transparent via-ink/6 to-transparent" />
      <div className="absolute top-[60%] left-0 h-px w-full bg-gradient-to-r from-transparent via-ink/5 to-transparent" />

      {/* Subtle floating data points */}
      {!reducedMotion &&
        DOTS.map((dot, i) => (
          <span
            key={i}
            className="anim-pulse-dot absolute rounded-full"
            style={{
              top: dot.top,
              left: dot.left,
              width: dot.size,
              height: dot.size,
              background: dot.color,
              animationDelay: dot.delay,
            }}
          />
        ))}

      {/* Subtle paper grain texture */}
      <div className="grain absolute inset-0" />
    </div>
  );
}
