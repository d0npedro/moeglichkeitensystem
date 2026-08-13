import { useEffect, useState } from "react";
import { clockLabel } from "@/lib/moeglichkeiten/clock";
import { TIMES } from "@/lib/moeglichkeiten/model";
import { useField } from "@/lib/moeglichkeiten/store";
import { cn } from "@/lib/utils";

export function TimeControl() {
  const { time, timeLive, setTime, setTimeLive, tickClock } = useField();
  const [label, setLabel] = useState(() => clockLabel());

  useEffect(() => {
    tickClock();
    const id = window.setInterval(() => {
      setLabel(clockLabel());
      tickClock();
    }, 15000);
    return () => window.clearInterval(id);
  }, [tickClock]);

  return (
    <section className="space-y-3">
      <p className="text-xs font-medium uppercase tracking-widest text-subtle">Tageszeit</p>
      <div className="grid grid-cols-5 gap-1 rounded-lg bg-wash p-1">
        <button
          type="button"
          onClick={() => setTimeLive(true)}
          className={cn(
            "min-h-11 rounded-md px-1 text-[11px] font-medium transition-colors duration-150 sm:text-xs",
            timeLive ? "bg-elevated text-fg shadow-soft" : "text-muted hover:text-fg",
          )}
        >
          Jetzt
        </button>
        {TIMES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTime(t.id)}
            className={cn(
              "min-h-11 rounded-md px-1 text-[11px] font-medium transition-colors duration-150 sm:text-xs",
              !timeLive && time === t.id ? "bg-elevated text-fg shadow-soft" : "text-muted hover:text-fg",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <p className="text-sm tabular-nums text-muted">
        {timeLive ? `${label} · läuft mit` : `${TIMES.find((t) => t.id === time)?.clock} · zum Prüfen`}
      </p>
    </section>
  );
}
