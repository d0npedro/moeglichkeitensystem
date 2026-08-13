import { useMemo, useState } from "react";
import { SiteNav } from "@/components/site/SiteNav";
import { WorkTools } from "@/components/site/WorkTools";
import { Button } from "@/components/ui/button";
import { ALL_ADAPTERS, hausMensch, promptContract } from "@/lib/wiring/adapters";
import type { WiringDomain } from "@/lib/wiring/types";
import { useField } from "@/lib/moeglichkeiten/store";
import { UMWELTEN } from "@/lib/moeglichkeiten/umwelten";

const DOMAINS: { id: WiringDomain; title: string; text: string }[] = [
  {
    id: "haus",
    title: "Haus",
    text: "Mensch: Schalter, Gurt, Tür. Entwickler: Bindings, Events. Roboter: Fläche, Engstelle, Dose. Keine App, die alle Geräte auflistet.",
  },
  {
    id: "bestand",
    title: "Laden",
    text: "Mensch: was heute noch da ist. Entwickler: Feed und Öffnung. Roboter: Stufe, Knauf, Dichte. Bäckerei und Kiosk, dieselbe Logik.",
  },
  {
    id: "gehen",
    title: "Gehen",
    text: "Nicht Navigation von A nach B. Horizont dessen, der fragt. Fuß zuerst. Bahn als Angebot.",
  },
  {
    id: "modell",
    title: "Modell",
    text: "Ein Modell, das nicht die Stadt kennt. Sondern den Horizont des Fragenden. Wer. Umwelt. Radius. Zeit. Lage.",
  },
  {
    id: "apparat",
    title: "Apparat",
    text: "Pfad nur auf Roboter-Angeboten. Grenzen sichtbar. Simulation zuerst.",
  },
];

export function Schnitt() {
  const { umwelt, locusId, radiusM, time, lage, setUmwelt } = useField();
  const ctx = useMemo(
    () => ({ umwelt, locusId, radiusM, time, lage }),
    [umwelt, locusId, radiusM, time, lage],
  );
  const [house, setHouse] = useState(() => hausMensch.read(ctx));

  const visible = ALL_ADAPTERS.filter((a) => a.umwelt === umwelt);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <SiteNav current="feld" wide />
      <div className="border-b border-border px-4 py-1 sm:px-6">
        <WorkTools path="/schnitt" />
      </div>
      <main className="mx-auto max-w-3xl px-5 py-10 md:px-8">
        <p className="text-xs font-medium uppercase tracking-widest text-subtle">Verdrahtung</p>
        <h1 className="mt-3 font-display text-4xl text-fg">Fünf Schnitte, nicht eine Liste</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Software und Hardware erst hier. Jeder Adapter trägt eine Umwelt. Eine gemeinsame Liste
          wäre der Fehler, den die Arbeit beschreibt.
        </p>

        <div className="mt-8 grid grid-cols-3 gap-1 rounded-lg bg-wash p-1">
          {UMWELTEN.map((u) => (
            <button
              key={u.id}
              type="button"
              onClick={() => setUmwelt(u.id)}
              className={
                umwelt === u.id
                  ? "min-h-11 rounded-md bg-elevated text-sm font-medium text-fg shadow-soft"
                  : "min-h-11 rounded-md text-sm text-muted"
              }
            >
              {u.label}
            </button>
          ))}
        </div>

        <section className="mt-10 space-y-8">
          {DOMAINS.map((d) => {
            const adapters = visible.filter((a) => a.domain === d.id);
            return (
              <article key={d.id} className="border-t border-border pt-6">
                <h2 className="font-display text-2xl text-fg">{d.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-muted">{d.text}</p>
                {adapters.length === 0 ? (
                  <p className="mt-3 text-sm text-subtle">
                    In dieser Umwelt kein Adapter dieses Schnitts. Das ist die Differenz.
                  </p>
                ) : (
                  <ul className="mt-4 space-y-3">
                    {adapters.map((a) => (
                      <li key={a.id} className="rounded-lg bg-surface p-4">
                        <p className="text-sm font-medium text-fg">{a.label}</p>
                        <p className="mt-1 text-sm text-muted">{a.hint}</p>
                        <pre className="mt-3 overflow-x-auto text-xs leading-relaxed text-muted">
                          {JSON.stringify(a.read(ctx), null, 2)}
                        </pre>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </section>

        {umwelt === "mensch" ? (
          <section className="mt-12 rounded-xl border border-border bg-surface p-5">
            <h2 className="font-display text-2xl text-fg">Haus, simuliert</h2>
            <p className="mt-2 text-sm text-muted">
              Licht, Rollo, Tür. Dieselbe Wohnung. Keine Geräteliste.
            </p>
            <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-widest text-subtle">Licht</dt>
                <dd className="text-fg">{house.licht}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-subtle">Rollo</dt>
                <dd className="text-fg">{house.rollo}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-subtle">Tür</dt>
                <dd className="text-fg">{house.tuer}</dd>
              </div>
            </dl>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  setHouse(hausMensch.write?.(ctx, { licht: house.licht === "an" ? "aus" : "an" }) ?? house)
                }
              >
                Licht
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  setHouse(
                    hausMensch.write?.(ctx, { rollo: house.rollo === "oben" ? "unten" : "oben" }) ??
                      house,
                  )
                }
              >
                Rollo
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  setHouse(hausMensch.write?.(ctx, { tuer: house.tuer === "zu" ? "offen" : "zu" }) ?? house)
                }
              >
                Tür
              </Button>
            </div>
          </section>
        ) : null}

        <section className="mt-12 border-t border-border pt-6">
          <h2 className="font-display text-2xl text-fg">Vertrag an ein Modell</h2>
          <p className="mt-3 text-base text-muted">
            Wer fragt. Welche Umwelt. Welcher Radius. Welche Zeit. Welche Lage. Nichts aus einer
            anderen Umwelt mischen, ohne das zu sagen.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-lg bg-surface p-4 text-sm text-fg">
            {promptContract(ctx)}
          </pre>
        </section>
      </main>
    </div>
  );
}
