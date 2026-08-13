import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { allLoci, findLocus } from "@/lib/moeglichkeiten/atlas";
import { useField } from "@/lib/moeglichkeiten/store";
import { cn } from "@/lib/utils";
import { OwnPlace } from "./OwnPlace";

export function LocusBar() {
  const { locusId, trail, goTo, back, atlasTick } = useField();
  const loci = allLoci();
  const locus = findLocus(locusId) ?? loci[0]!;
  const [edit, setEdit] = useState(false);
  void atlasTick;

  return (
    <section className="min-w-0 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-subtle">Zentrum</p>
          <h2 className="font-display text-2xl text-fg">{locus.name}</h2>
          <p className="text-sm text-muted">
            {locus.kind} · {locus.district}
          </p>
        </div>
        {trail.length > 0 ? (
          <Button variant="outline" size="sm" onClick={back} className="mt-1 shrink-0">
            <ArrowLeft className="size-4" />
            Zurück
          </Button>
        ) : null}
      </div>
      <p className="text-sm leading-relaxed text-muted">{locus.blurb}</p>
      <div className="-mx-1 flex max-w-full min-w-0 gap-1 overflow-x-auto overscroll-x-contain pb-1">
        {loci.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => goTo(l.id)}
            className={cn(
              "min-h-11 shrink-0 rounded-full px-3 text-xs font-medium transition-colors duration-150",
              l.id === locusId ? "bg-primary text-primary-fg" : "bg-wash text-muted hover:text-fg",
            )}
          >
            {l.name}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setEdit((v) => !v)}
          className="min-h-11 shrink-0 rounded-full bg-wash px-3 text-xs font-medium text-muted hover:text-fg"
        >
          Eigene Mitte
        </button>
      </div>
      {edit ? <OwnPlace onClose={() => setEdit(false)} /> : null}
    </section>
  );
}
