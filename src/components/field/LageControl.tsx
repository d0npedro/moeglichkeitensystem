import { LAGEN } from "@/lib/moeglichkeiten/lage";
import { useField } from "@/lib/moeglichkeiten/store";
import { cn } from "@/lib/utils";

export function LageControl() {
  const { lage, setLage, umwelt } = useField();
  const current = LAGEN.find((l) => l.id === lage)!;
  const hint =
    umwelt === "roboter" && lage === "hungrig"
      ? "Für den Apparat: Restlaufzeit. Die Dose wird größer."
      : umwelt === "roboter" && lage === "termin"
        ? "Für den Apparat: ein Auftrag. Handeln zählt mehr."
        : current.hint;

  return (
    <section className="space-y-3">
      <p className="text-xs font-medium uppercase tracking-widest text-subtle">Lage</p>
      <div className="grid grid-cols-5 gap-1 rounded-lg bg-wash p-1">
        {LAGEN.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => setLage(l.id)}
            className={cn(
              "min-h-11 rounded-md px-0.5 text-[11px] font-medium transition-colors duration-150 sm:text-xs",
              lage === l.id ? "bg-elevated text-fg shadow-soft" : "text-muted hover:text-fg",
            )}
          >
            {l.label}
          </button>
        ))}
      </div>
      <p className="text-sm leading-snug text-muted">{hint}</p>
    </section>
  );
}
