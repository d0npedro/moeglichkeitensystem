# Architektur

Zwei Oberflächen. Ein Kernel. Keine gemeinsame Liste.

```text
Arbeit  ──►  Kapitel 0–10, Glossar, Aura
Feld    ──►  Instrument: Ort, Umwelt, Radius, Blick, Zeit, Aura-Tafel

                 │
                 ▼
        src/lib/moeglichkeiten
        reiner Kernel, ohne React
```

## Oberflächen

| Route | Datei | Aufgabe |
|---|---|---|
| `/` | `src/components/arbeit/` | Die Arbeit. Zitierbar, druckbar, kanonisch. |
| `/feld` | `src/components/field/Instrument.tsx` | Prüfung von Kapitel 7 und 9. |

Canonical bleibt `peddavommond.de/moeglichkeitensystem`.
Share-URLs zeigen nie den Vercel-Host (`src/lib/share.ts`).

## Kernel

`src/lib/moeglichkeiten` ist die Theorie als Code. React liest. React entscheidet nicht.

| Datei | Tut |
|---|---|
| `types.ts` | Angebot, Locus, Umwelt, Dimension |
| `model.ts` | `viewFrom`: Filter, Distanz, Blick, Ranking |
| `umwelten.ts` | Drei Welten. Maschinen-Angebote nie in der Menschenliste |
| `loci.ts` / `affordances.ts` | Atlas des Büros und der Nähe |
| `geometry.ts` | Wohnung in Metern, nicht Pixeln |
| `aura.ts` | Ausstrahlung: was die Nähe lesen darf |
| `kernel.test.ts` | Umweltfilter, getrennte Aura |

`viewFrom(locus, radius, facing, fov, time, dimensions, umwelt)` ist der Vertrag.

1. Nur Angebote der gewählten Umwelt.
2. Distanz und Blick aus der Geometrie.
3. Tageszeit schließt Bestand.
4. Horizon-Collapse, sobald der Radius zu viele Marken trägt.

Ein Angebot ohne `umwelt` gilt als Mensch.

## Drei Umwelten

Dieselbe Raummitte. Drei Listen.

| Umwelt | Sieht zuerst | Blick im Büro |
|---|---|---|
| Mensch | Lichtschalter, Rollladen | 38° |
| Entwickler | Rechner, Anschluss, Dose | 270° |
| Roboter | Boden, Türmaß, Steckdose | 90° |

Dose und Schalter sind nie dieselbe Marke.

## Aura

Kapitel 9 und `AuraPanel` teilen dieselben neun Sätze.

Empfang ist der äußere Kreis: was der Ort diesem Körper gibt.
Ausstrahlung ist der innere Satz: wer hier steht, wie weit der Horizont reicht, wohin der Blick geht.

`outgoingAura({ umwelt, radiusM, facingDeg, time })` ändert die Nachricht mit der Umwelt. Nicht mit einer gemeinsamen Liste.

Verdrahtung darf die Sätze ausführen. Nicht ersetzen. Es gibt noch keine Geräte-App dafür — bewusst.

## Tests

```bash
npm test
```

Sie prüfen den Satz aus Kapitel 7 und die getrennte Ausstrahlung.
Typecheck und Production-Build gehören dazu, bevor etwas als fertig gilt.
