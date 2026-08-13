import { outgoingAura } from "@/lib/moeglichkeiten/aura";
import { useField } from "@/lib/moeglichkeiten/store";

export function AuraPanel() {
  const { umwelt, radiusM, facingDeg, time } = useField();
  const aura = outgoingAura({ umwelt, radiusM, facingDeg, time });

  return (
    <section className="rounded-xl border border-border bg-surface p-5" aria-labelledby="aura-titel">
      <p className="text-xs font-medium uppercase tracking-widest text-subtle">Ausstrahlung</p>
      <h3 id="aura-titel" className="mt-2 font-display text-xl text-fg">
        Was die Nähe lesen darf
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{aura.sentence}</p>
      <dl className="mt-4 grid grid-cols-3 gap-2 text-sm">
        <div>
          <dt className="text-subtle">Umwelt</dt>
          <dd className="text-fg">{aura.umwelt}</dd>
        </div>
        <div>
          <dt className="text-subtle">Horizont</dt>
          <dd className="text-fg">{aura.radius}</dd>
        </div>
        <div>
          <dt className="text-subtle">Blick</dt>
          <dd className="tabular-nums text-fg">{aura.facing}</dd>
        </div>
      </dl>
      <p className="mt-4 text-xs font-medium uppercase tracking-widest text-subtle">Frei</p>
      <ul className="mt-1 space-y-1 text-sm text-fg">
        {aura.offers.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <p className="mt-4 text-xs font-medium uppercase tracking-widest text-subtle">Nicht frei</p>
      <ul className="mt-1 space-y-1 text-sm text-muted">
        {aura.withholds.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </section>
  );
}
