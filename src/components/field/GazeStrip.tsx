import type { ViewedAffordance } from "@/lib/moeglichkeiten/types";
import { dimensionOf, isSeen, relativeBearing, sinnReason } from "@/lib/moeglichkeiten/model";
import { useField } from "@/lib/moeglichkeiten/store";
import { FieldMark } from "./marks";
import { cn } from "@/lib/utils";

export function GazeStrip({ items }: { items: ViewedAffordance[] }) {
  const { facingDeg, fovDeg, selectedId, select, hover, setFacing } = useField();

  const inView = items
    .filter(isSeen)
    .map((i) => ({ item: i, rel: relativeBearing(i.bearingDeg, facingDeg) }))
    .filter((row) => Math.abs(row.rel) <= fovDeg / 2 + 6)
    .sort((a, b) => a.rel - b.rel);

  const half = fovDeg / 2;

  return (
    <section className="rounded-xl border border-border bg-surface px-4 py-3 sm:px-5">
      <header className="mb-2 flex items-baseline justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-subtle">Blickfeld</p>
          <p className="text-sm text-muted">Was du vom Zentrum aus gleichzeitig siehst</p>
        </div>
        <p className="tabular-nums text-xs text-subtle">{inView.length} im Blick</p>
      </header>

      <div
        className="relative h-20 cursor-crosshair overflow-hidden rounded-lg bg-wash"
        onPointerDown={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const t = (e.clientX - rect.left) / rect.width;
          const rel = (t - 0.5) * fovDeg;
          setFacing(facingDeg + rel);
        }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-primary/40" />
        {inView.map(({ item, rel }) => {
          const t = 0.5 + rel / (half * 2);
          const hot = selectedId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              style={{ left: `${Math.min(94, Math.max(6, t * 100))}%` }}
              className={cn(
                "absolute top-2 flex -translate-x-1/2 flex-col items-center gap-1",
                hot ? "z-10" : "z-0",
              )}
              onPointerDown={(ev) => ev.stopPropagation()}
              onClick={() => select(item.id)}
              onPointerEnter={() => hover(item.id)}
              onPointerLeave={() => hover(null)}
            >
              <svg viewBox="-8 -8 16 16" className="size-4 text-mark">
                <FieldMark shape={dimensionOf(item.dimension).mark} size={4} emphasis={item.inFov} />
              </svg>
              <span
                className={cn(
                  "max-w-24 truncate text-[10px] leading-tight",
                  hot ? "font-medium text-fg" : "text-muted",
                )}
              >
                {item.title}
              </span>
            </button>
          );
        })}
        {inView.length === 0 ? (
          <p className="absolute inset-0 grid place-items-center text-xs text-subtle">
            Nichts der gewählten Dimensionen im Blick
          </p>
        ) : null}
      </div>

      <p className="mt-2 hidden text-xs text-subtle sm:block">
        {inView
          .slice(0, 3)
          .map(({ item }) => `${item.title} — ${sinnReason(item)}`)
          .join(" · ")}
      </p>
    </section>
  );
}
