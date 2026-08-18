# Mitmachen

Die öffentliche Wahrheit ist die Arbeit unter
[peddavommond.de/moeglichkeitensystem](https://peddavommond.de/moeglichkeitensystem).
Dieses Repo ist das Instrument dazu, kein Produkt-Backlog.

## Was hier hingehört

- Fehler im Kernel: Umweltfilter, Ranking, Aura, Radius, Zeit/Bestand
- Lücken im Atlas, die einen echten Ort falsch machen
- a11y, Mobile, Typecheck, Tests
- Docs, die den Ist-Stand beschreiben

## Was hier nicht hingehört

- Eine gemeinsame Geräteliste
- Social Feed, Punkte, Community
- Navigation A→B als Selbstzweck
- Echte Home-Assistant-Kopplung ohne Adapter-Grenze
- Erfundene Laden-Namen oder Seitenzahlen

## Stimme

Kurze Sätze. Dieselben Wörter: Angebot, Umwelt, Lebensraum.
Kein Marketing. Keine Scheinzitate.

## Lokal

```bash
npm install
npm test
npm run typecheck
npm run dev
```

`npm run shots` schreibt die README-Bilder nach `docs/media/`.
Dafür muss der Dev-Server laufen (`SHOT_BASE`, Default siehe `scripts/capture-readme.mjs`).

## Pull Requests

Ein PR ändert eine Sache. Tests der Kernlogik bleiben grün.
Theorie-Änderungen brauchen einen Satz in `docs/process/STATE.md`,
warum der Kern schärfer wird und nicht breiter.
