import { Compass, Footprints } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ViewedAffordance } from "@/lib/moeglichkeiten/types";
import {
  dimensionOf,
  formatDistance,
  formatWalk,
  inventoryNow,
  scaleForDistance,
  sinnReason,
} from "@/lib/moeglichkeiten/model";
import { useField } from "@/lib/moeglichkeiten/store";

export function Inspector({ item }: { item: ViewedAffordance | null }) {
  const { time, setFacing, goTo, select } = useField();

  if (!item) {
    return (
      <section className="rounded-xl border border-border bg-surface p-5">
        <p className="text-xs font-medium uppercase tracking-widest text-subtle">Auswahl</p>
        <h3 className="mt-2 font-display text-xl text-fg">Keine Marke gewählt</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Tippe eine Marke. Dieselbe Mitte trägt verschiedene Welten — Mensch, Entwickler, Roboter.
          Die Angebote gehören immer zu einer davon.
        </p>
      </section>
    );
  }

  const dim = dimensionOf(item.dimension);
  const band = scaleForDistance(item.distanceM);
  const stock = inventoryNow(item, time);

  return (
    <section className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-subtle">{dim.label}</p>
          <h3 className="mt-1 font-display text-2xl text-fg">{item.title}</h3>
        </div>
        <button
          type="button"
          className="min-h-11 text-xs text-subtle hover:text-fg"
          onClick={() => select(null)}
        >
          Schließen
        </button>
      </div>

      <p className="mt-3 font-medium text-fg">{item.verb}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
      <p className="mt-3 text-sm leading-relaxed text-fg">{item.humanUse}</p>
      <p className="mt-3 text-xs uppercase tracking-widest text-subtle">{sinnReason(item)}</p>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-xs uppercase tracking-widest text-subtle">Entfernung</dt>
          <dd className="tabular-nums text-fg">{formatDistance(item.distanceM)}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-subtle">Weg</dt>
          <dd className="text-fg">
            {item.requiresWalk ? formatWalk(item.walkSeconds) : "ohne Schritt"}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-subtle">Lage</dt>
          <dd className="text-fg">{band.label}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-subtle">Blick</dt>
          <dd className="text-fg">
            {item.inFov ? "sichtbar" : item.visibleStanding ? "im Raum, nicht im Blick" : "gewusst"}
          </dd>
        </div>
      </dl>

      {item.features && item.features.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.features.map((f) => (
            <Badge key={f} variant="wash">
              {f}
            </Badge>
          ))}
        </div>
      ) : null}

      {stock.length > 0 ? (
        <div className="mt-5">
          <p className="text-xs font-medium uppercase tracking-widest text-subtle">Bestand jetzt</p>
          <ul className="mt-2 divide-y divide-border">
            {stock.map((row) => (
              <li key={row.name} className="flex items-baseline justify-between gap-3 py-2 text-sm">
                <span className={row.open ? "text-fg" : "text-subtle line-through"}>{row.name}</span>
                <span className="text-xs text-muted">
                  {row.open ? (row.note ?? "da") : "nicht da"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {!item.available ? (
        <p className="mt-4 text-sm text-danger">Zu dieser Tageszeit nicht nutzbar.</p>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => setFacing(item.bearingDeg)}>
          <Compass className="size-4" />
          Dorthin wenden
        </Button>
        {item.travelToLocusId ? (
          <Button size="sm" onClick={() => goTo(item.travelToLocusId!)}>
            <Footprints className="size-4" />
            Dorthin gehen
          </Button>
        ) : null}
      </div>
    </section>
  );
}
