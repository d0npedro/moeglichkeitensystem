import type { ViewedAffordance } from "@/lib/moeglichkeiten/types";
import { countByDimension, DIMENSIONS } from "@/lib/moeglichkeiten/model";

export function DimensionBars({ items }: { items: ViewedAffordance[] }) {
  const counts = countByDimension(items);
  const max = Math.max(1, ...Object.values(counts));

  return (
    <section className="space-y-3">
      <p className="text-xs font-medium uppercase tracking-widest text-subtle">Dichte im Radius</p>
      <ul className="space-y-2">
        {DIMENSIONS.map((d) => {
          const n = counts[d.id];
          return (
            <li key={d.id} className="grid grid-cols-[4.5rem_1fr_1.5rem] items-center gap-2">
              <span className="truncate text-xs text-muted">{d.short}</span>
              <div className="h-1.5 overflow-hidden rounded-full bg-wash">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
                  style={{ width: `${(n / max) * 100}%` }}
                />
              </div>
              <span className="text-right tabular-nums text-xs text-subtle">{n}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
