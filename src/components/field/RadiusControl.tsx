import { Slider } from "@/components/ui/slider";
import {
  formatDistance,
  radiusToSlider,
  scaleForDistance,
  SCALES,
  sliderToRadius,
} from "@/lib/moeglichkeiten/model";
import { useField } from "@/lib/moeglichkeiten/store";

export function RadiusControl() {
  const { radiusM, setRadius } = useField();
  const band = scaleForDistance(radiusM);

  return (
    <section className="space-y-3">
      <header className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-subtle">Radius</p>
          <p className="font-display text-xl text-fg">{band.label}</p>
        </div>
        <p className="tabular-nums text-sm text-muted">{formatDistance(radiusM)}</p>
      </header>
      <Slider
        min={0}
        max={1000}
        step={1}
        value={[Math.round(radiusToSlider(radiusM) * 1000)]}
        onValueChange={([v]) => setRadius(sliderToRadius((v ?? 0) / 1000))}
        aria-label="Horizont der Erreichbarkeit"
      />
      <div className="flex flex-wrap justify-between gap-x-1 text-xs text-subtle">
        {SCALES.map((s) => (
          <button
            key={s.id}
            type="button"
            className="min-h-11 px-0.5 text-left hover:text-fg"
            onClick={() => setRadius(Math.max(1.4, s.toM * 0.92))}
          >
            {s.label}
          </button>
        ))}
      </div>
      <p className="text-sm leading-snug text-muted">{band.hint}</p>
    </section>
  );
}
