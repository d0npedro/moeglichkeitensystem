import { UMWELTEN } from "@/lib/moeglichkeiten/model";
import { useField } from "@/lib/moeglichkeiten/store";
import { cn } from "@/lib/utils";

export function UmweltControl() {
  const { umwelt, setUmwelt } = useField();
  const current = UMWELTEN.find((u) => u.id === umwelt)!;

  return (
    <section className="space-y-3">
      <p className="text-xs font-medium uppercase tracking-widest text-subtle">Umwelt</p>
      <div className="grid grid-cols-3 gap-1 rounded-lg bg-wash p-1">
        {UMWELTEN.map((u) => (
          <button
            key={u.id}
            type="button"
            onClick={() => setUmwelt(u.id)}
            className={cn(
              "min-h-11 rounded-md px-1 text-xs font-medium transition-colors duration-150",
              umwelt === u.id ? "bg-elevated text-fg shadow-soft" : "text-muted hover:text-fg",
            )}
          >
            {u.label}
          </button>
        ))}
      </div>
      <p className="text-sm leading-snug text-muted">{current.hint}</p>
    </section>
  );
}
