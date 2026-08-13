import { ChevronLeft, ChevronRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useField } from "@/lib/moeglichkeiten/store";

export function FacingControl() {
  const { facingDeg, fovDeg, setFacing, setFov } = useField();

  return (
    <section className="space-y-3">
      <header className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-subtle">Blick</p>
          <p className="font-display text-xl tabular-nums text-fg">{Math.round(facingDeg)}°</p>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md bg-wash text-fg hover:bg-border"
            onClick={() => setFacing(facingDeg - 15)}
            aria-label="Blick nach links"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md bg-wash text-fg hover:bg-border"
            onClick={() => setFacing(facingDeg + 15)}
            aria-label="Blick nach rechts"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </header>
      <div>
        <p className="mb-2 text-xs text-muted">Gesichtsfeld {Math.round(fovDeg)}°</p>
        <Slider
          min={70}
          max={170}
          step={1}
          value={[fovDeg]}
          onValueChange={([v]) => setFov(v ?? 128)}
          aria-label="Gesichtsfeld"
        />
      </div>
    </section>
  );
}
