import type { DimensionId } from "@/lib/moeglichkeiten/types";
import { DIMENSIONS } from "@/lib/moeglichkeiten/model";
import { useField } from "@/lib/moeglichkeiten/store";
import { FieldMark } from "./marks";
import { cn } from "@/lib/utils";

export function DimensionFilters({ counts }: { counts: Record<DimensionId, number> }) {
  const { dimensions, toggleDimension } = useField();

  return (
    <section className="space-y-3">
      <p className="text-xs font-medium uppercase tracking-widest text-subtle">Dimensionen</p>
      <ul className="flex flex-wrap gap-1.5">
        {DIMENSIONS.map((d) => {
          const on = dimensions.includes(d.id);
          return (
            <li key={d.id}>
              <button
                type="button"
                onClick={() => toggleDimension(d.id)}
                aria-pressed={on}
                title={d.hint}
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm transition-colors duration-150",
                  on ? "bg-elevated text-fg shadow-soft" : "text-subtle hover:bg-wash hover:text-fg",
                )}
              >
                <svg viewBox="-8 -8 16 16" className="size-3.5 text-mark">
                  <FieldMark shape={d.mark} size={3.6} emphasis={on} />
                </svg>
                {d.label}
                <span className={cn("tabular-nums text-xs", on ? "text-muted" : "text-subtle")}>
                  {counts[d.id]}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
