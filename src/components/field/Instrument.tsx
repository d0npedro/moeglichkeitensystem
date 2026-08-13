import { useEffect, useMemo } from "react";
import {
  countByDimension,
  formatDistance,
  horizonItems,
  isSeen,
  scaleForDistance,
  UMWELTEN,
  viewFrom,
} from "@/lib/moeglichkeiten/model";
import { useField } from "@/lib/moeglichkeiten/store";
import { SiteNav } from "@/components/site/SiteNav";
import { DimensionFilters } from "./DimensionFilters";
import { FacingControl } from "./FacingControl";
import { GazeStrip } from "./GazeStrip";
import { HorizonList } from "./HorizonList";
import { Inspector } from "./Inspector";
import { LocusBar } from "./LocusBar";
import { PossibilityField } from "./PossibilityField";
import { RadiusControl } from "./RadiusControl";
import { TimeControl } from "./TimeControl";
import { UmweltControl } from "./UmweltControl";

export function Instrument() {
  const store = useField();
  const { locusId, radiusM, facingDeg, fovDeg, time, dimensions, selectedId, umwelt } = store;

  const items = useMemo(
    () => viewFrom(locusId, radiusM, facingDeg, fovDeg, time, dimensions, umwelt),
    [locusId, radiusM, facingDeg, fovDeg, time, dimensions, umwelt],
  );
  const umweltMeta = UMWELTEN.find((u) => u.id === umwelt)!;
  const selected = items.find((i) => i.id === selectedId) ?? null;
  const listed = horizonItems(items, radiusM, locusId);
  const inView = listed.filter(isSeen);
  const band = scaleForDistance(radiusM);
  const counts = countByDimension(items);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "+" || e.key === "=") {
        store.setRadius(Math.min(8000, radiusM * 1.18));
      } else if (e.key === "-" || e.key === "_") {
        store.setRadius(Math.max(1.2, radiusM / 1.18));
      } else if (e.key === "ArrowLeft") {
        store.setFacing(facingDeg - 12);
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        store.setFacing(facingDeg + 12);
        e.preventDefault();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [store, radiusM, facingDeg]);

  return (
    <div className="min-h-dvh overflow-x-hidden bg-bg text-fg">
      <SiteNav current="feld" wide />

      <div className="mx-auto flex w-full min-w-0 max-w-[90rem] flex-col gap-4 px-4 py-4 sm:px-6 lg:gap-5 lg:py-5">
        <section className="order-2 min-w-0 overflow-hidden rounded-xl border border-border bg-surface p-4 sm:p-5 lg:order-1">
          <p className="max-w-3xl text-sm leading-relaxed text-muted">{umweltMeta.hint}</p>
          <div className="mt-5 grid min-w-0 gap-6 lg:grid-cols-[1.1fr_1fr_0.95fr]">
            <LocusBar />
            <div className="space-y-5">
              <UmweltControl />
              <RadiusControl />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <TimeControl />
              <FacingControl />
            </div>
          </div>
          <div className="mt-5">
            <DimensionFilters counts={counts} />
          </div>
        </section>

        <div className="order-1 grid min-w-0 items-start gap-4 lg:order-2 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2 px-1">
              <p className="text-sm text-muted">
                <span className="font-medium text-fg">{band.label}</span>
                <span className="text-subtle"> · {formatDistance(radiusM)}</span>
              </p>
              <p className="text-sm tabular-nums text-subtle">
                {listed.length} im Horizont · {inView.length} im Blick
              </p>
            </div>
            <main className="min-h-80 rounded-xl border border-border bg-surface sm:min-h-[36rem]">
              <PossibilityField items={items} />
            </main>
            <GazeStrip items={items} />
          </div>

          <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start">
            <Inspector item={selected} />
            <HorizonList items={listed} />
          </aside>
        </div>
      </div>
    </div>
  );
}
