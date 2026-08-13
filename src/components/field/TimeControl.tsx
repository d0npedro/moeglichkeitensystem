import { TIMES } from "@/lib/moeglichkeiten/model";
import { useField } from "@/lib/moeglichkeiten/store";
import { cn } from "@/lib/utils";

export function TimeControl() {
  const { time, setTime } = useField();

  return (
    <section className="space-y-3">
      <p className="text-xs font-medium uppercase tracking-widest text-subtle">Tageszeit</p>
      <div className="grid grid-cols-4 gap-1 rounded-lg bg-wash p-1">
        {TIMES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTime(t.id)}
            className={cn(
              "min-h-11 rounded-md px-1 text-xs font-medium transition-colors duration-150",
              time === t.id ? "bg-elevated text-fg shadow-soft" : "text-muted hover:text-fg",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
    </section>
  );
}
