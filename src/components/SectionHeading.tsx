"use client";

import { Reveal } from "./Reveal";

const ACCENTS = {
  coral: "text-coral",
  tangerine: "text-tangerine",
  gold: "text-gold",
  teal: "text-teal",
  magenta: "text-magenta",
  ink: "text-ink",
} as const;

export type AccentName = keyof typeof ACCENTS;

const ACCENT_BG = {
  coral: "bg-coral",
  tangerine: "bg-tangerine",
  gold: "bg-gold",
  teal: "bg-teal",
  magenta: "bg-magenta",
  ink: "bg-ink",
} as const;

export function SectionHeading({
  index,
  eyebrow,
  lines,
  accent = "tangerine",
  className = "",
}: {
  index: string;
  eyebrow: string;
  lines: string[];
  accent?: AccentName;
  className?: string;
}) {
  return (
    <div className={className}>
      <Reveal>
        <div className="flex items-center gap-3">
          <span
            className={`inline-block h-2.5 w-2.5 rounded-[3px] ${ACCENT_BG[accent]}`}
            aria-hidden="true"
          />
          <span className="eyebrow text-ink/55">
            {index} · {eyebrow}
          </span>
        </div>
      </Reveal>
      <Reveal delay={90}>
        <h2 className="display-tight mt-6 text-[clamp(2.8rem,6.5vw,5.75rem)]">
          {lines.map((line, i) => (
            <span key={line} className="block">
              {line}
              {i === lines.length - 1 && (
                <span className={ACCENTS[accent]}>.</span>
              )}
            </span>
          ))}
        </h2>
      </Reveal>
    </div>
  );
}
