import { useState } from "react";
import { allLoci } from "@/lib/moeglichkeiten/atlas";
import { setOnboarded } from "@/lib/moeglichkeiten/persist";
import { useField } from "@/lib/moeglichkeiten/store";
import type { UmweltId } from "@/lib/moeglichkeiten/types";
import { UMWELTEN } from "@/lib/moeglichkeiten/umwelten";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Onboarding({ onDone }: { onDone: () => void }) {
  const { goTo, setUmwelt, setFacing } = useField();
  const [step, setStep] = useState(0);
  const [ort, setOrt] = useState("studio");
  const [umwelt, setLocal] = useState<UmweltId>("mensch");
  const near = allLoci().filter((l) => Math.hypot(l.x, l.y) < 30).slice(0, 8);

  function finish() {
    setUmwelt(umwelt);
    goTo(ort);
    if (ort === "studio" && umwelt === "mensch") setFacing(38);
    setOnboarded();
    onDone();
  }

  return (
    <div className="fixed inset-0 z-40 grid place-items-end bg-fg/25 p-4 sm:place-items-center">
      <section
        role="dialog"
        aria-labelledby="onboard-titel"
        className="w-full max-w-lg rounded-xl border border-border bg-elevated p-5 shadow-soft"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-subtle">Ort</p>
        <h2 id="onboard-titel" className="mt-2 font-display text-2xl text-fg">
          {step === 0 && "Wo stehst du"}
          {step === 1 && "Wer steht da"}
          {step === 2 && "Was liegt im Blick"}
        </h2>

        {step === 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {near.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setOrt(l.id)}
                className={cn(
                  "min-h-11 rounded-full px-3 text-sm",
                  ort === l.id ? "bg-primary text-primary-fg" : "bg-wash text-muted",
                )}
              >
                {l.name}
              </button>
            ))}
          </div>
        ) : null}

        {step === 1 ? (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {UMWELTEN.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => setLocal(u.id)}
                className={cn(
                  "min-h-14 rounded-md px-2 text-sm",
                  umwelt === u.id ? "bg-primary text-primary-fg" : "bg-wash text-muted",
                )}
              >
                {u.label}
              </button>
            ))}
          </div>
        ) : null}

        {step === 2 ? (
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {umwelt === "mensch" &&
              "Lichtschalter und Rollladen liegen im Blick. Beides verlangt einen Schritt."}
            {umwelt === "entwickler" &&
              "Der Rechner an der Westwand ist das erste Angebot. Nicht der Rollladen."}
            {umwelt === "roboter" &&
              "Boden, Türmaß, Dose. Der Schalter zählt nur, wenn der Arm so hoch kommt."}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-2">
          {step < 2 ? (
            <Button type="button" onClick={() => setStep((s) => s + 1)}>
              Weiter
            </Button>
          ) : (
            <Button type="button" onClick={finish}>
              Feld öffnen
            </Button>
          )}
          <button type="button" className="min-h-11 px-3 text-sm text-muted" onClick={finish}>
            Überspringen
          </button>
        </div>
      </section>
    </div>
  );
}
