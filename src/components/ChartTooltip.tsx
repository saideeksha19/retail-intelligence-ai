"use client";

export interface TipEntry {
  dataKey?: string | number;
  name?: string | number;
  value?: number | string;
  color?: string;
}

export function ChartTooltip({
  active,
  label,
  payload,
  format,
  entries,
}: {
  active?: boolean;
  label?: string | number;
  payload?: ReadonlyArray<TipEntry>;
  format?: (value: number) => string;
  entries?: string[]; // show only these series keys, in order
}) {
  if (!active || !payload || payload.length === 0) return null;

  const visible = entries
    ? entries
        .map((key) => payload.find((p) => p.dataKey === key))
        .filter((p): p is TipEntry => Boolean(p && p.value != null))
    : payload.filter((p) => p.value != null && p.value !== 0);

  if (visible.length === 0) return null;

  return (
    <div className="rounded-xl bg-ink px-4 py-3 text-ivory shadow-[0_16px_40px_-16px_rgba(32,33,36,0.5)]">
      {label != null && (
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/60">
          {label}
        </p>
      )}
      <div className="mt-1.5 space-y-1">
        {visible.map((entry, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: entry.color ?? "#FAF8F3" }}
              aria-hidden="true"
            />
            <span className="text-ivory/60">{entry.name}</span>
            <span className="tnum ml-auto font-medium">
              {format && typeof entry.value === "number"
                ? format(entry.value)
                : String(entry.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
