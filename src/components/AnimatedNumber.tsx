"use client";

import { useEffect, useState } from "react";
import { useInView, usePrefersReducedMotion } from "@/lib/hooks";

export function AnimatedNumber({
  value,
  format,
  duration = 1600,
  className = "",
}: {
  value: number;
  format: (value: number) => string;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduced, duration]);

  return (
    <span ref={ref} className={`tnum ${className}`}>
      {format(display)}
    </span>
  );
}
