import type { ViewedAffordance } from "@/lib/moeglichkeiten/types";
import { dimensionOf, formatDistance, sinnReason } from "@/lib/moeglichkeiten/model";
import { useField } from "@/lib/moeglichkeiten/store";
import { FieldMark } from "./marks";
import { cn } from "@/lib/utils";

export function HorizonList({ items }: { items: ViewedAffordance[] }) {
  const { selectedId, select, hover } = useField();
  const visible = items;

  if (visible.length === 0) {
    return (
      <p className="text-sm text-muted">
        In diesem Radius keine Angebote der gewählten Dimensionen.
      </p>
    );
  }

  return (
    <section className="space-y-2">
      <header className="flex items-baseline justify-between">
        <p className="text-xs font-medium uppercase tracking-widest text-subtle">Am sinnvollsten</p>
        <p className="tabular-nums text-xs text-subtle">{visible.length}</p>
      </header>
      <ul className="space-y-1">
        {visible.slice(0, 16).map((item) => {
          const dim = dimensionOf(item.dimension);
          const on = selectedId === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => select(item.id)}
                onPointerEnter={() => hover(item.id)}
                onPointerLeave={() => hover(null)}
                className={cn(
                  "flex min-h-12 w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors duration-150",
                  on ? "bg-wash" : "hover:bg-wash/70",
                  !item.available && "opacity-50",
                )}
              >
                <svg viewBox="-8 -8 16 16" className="size-4 shrink-0 text-mark">
                  <FieldMark shape={dim.mark} size={4} emphasis={item.inFov} />
                </svg>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm text-fg">{item.title}</span>
                  <span className="block truncate text-xs text-subtle">{sinnReason(item)}</span>
                </span>
                <span className="shrink-0 tabular-nums text-xs text-muted">
                  {formatDistance(item.distanceM)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
