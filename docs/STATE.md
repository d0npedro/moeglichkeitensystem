# Zustand

Stand: 2026-08-13 · Phase A–D weitgehend, nicht maxed out

## Was steht

Öffentlich unter [peddavommond.de/moeglichkeitensystem](https://peddavommond.de/moeglichkeitensystem).

Eigenes Repo, Production an `main`. Canonical bleibt diese Domain. Nie der Vercel-Host.

Die Arbeit (Kapitel 0–9, Kurzfassung, Glossar, Recap, Inhaltsverzeichnis, Lesen/Teilen/GitHub) ist lesbar.

Das Feld ist ein erstes Instrument: drei Umwelten, Radius, Blick, Tageszeit, Dimensionen, Horizon-Collapse, Gaze-Strip, Inspector.

Atlas: Studio, Wohnung (Flur, Küche, Bad, Wohnzimmer), Haustür, Bäckerei, Grüngürtel, Domplatte. Maschinen-Angebote vor allem im Studio und an der Bäckerei.

## Was nachweislich fertig war (vor dieser Kampagne)

- Live-Seite rendert die Arbeit. Beweis: Abruf von Production.
- GitHub `main` bei `4dea59b` (Lesen, Teilen, GitHub).
- Drei Umwelten ändern Blickrichtung im Studio (store setzt `studioFacing`).
- Share-URL zeigt immer `peddavommond.de/moeglichkeitensystem`.

Nicht nachgewiesen vor dieser Kampagne: Tests der Kernlogik, Live-Uhr, eigene Mitte, Feld-Zustand in der URL, Druck/PDF, dichte drei Welten außerhalb des Studios, Adapter.

## Was in dieser Session gebaut und geprüft wurde

- Literatur ohne Scheinzitate. Drucken/PDF über Print-CSS.
- Live-Uhr. Lage (Hunger, Satt, Müde, Termin) ändert das Ranking.
- Inspector in vier Sätzen. Feld-Zustand in der URL.
- Atlas: Treppenhaus, Hof, Venloer, Kiosk, Haltestelle. Drei Listen je neuem Ort.
- Eigene Mitte lokal. Onboarding. JSON Import/Export.
- Fünf Schnitte unter /schnitt, simuliert, umweltgetrennt.
- Tests der Kernlogik: 11 grün. typecheck grün. vite build grün.
- Browser: Arbeit rendert. Feld: Umweltwechsel ändert Blick, Marken, URL, Inspector. Keine Konsolenfehler.

## Was als Nächstes den höchsten Hebel hat

1. Production liegt auf `main` (a6c78c4), Vercel READY. peddavommond.de/moeglichkeitensystem führt auf die Arbeit. Teilen bleibt die Canonical-Domain.
2. Grüngürtel/Dom in allen drei Umwelten so hart wie Studio und Bäckerei.
3. 390px Overflow und Kontrast mit echtem Viewport messen.
4. Drei Umwelten nebeneinander, wenn das die letzte Verwechslung verhindert.
5. Offline-Lesen der Arbeit absichern.

## Offene Risiken

- Ehrenfeld-Atlas darf keine erfundenen Laden-Namen als Tatsache ausgeben.
- Auth/PGlite ist Scaffold. Nicht erzwingen.
- Zu viele Marken können das Tablet-Feld bremsen. Horizon-Collapse bleibt Pflicht.
- Desktop-Router auf peddavommond.de ist ein anderes Repo. Canonical-Redirect nicht hier umbauen.

## Bewusst nicht gebaut (und warum)

- Social Feed, Punkte, Community. Verdünnt den Kern.
- Eine Geräte-App mit Philosophie-Firnis. Das wäre Inventar.
- Navigation A→B als Selbstzweck. Das wäre Asphalt, kein Lebensraum.
- Echte Home-Assistant-Kopplung ohne Adapter-Grenze. Erst der Schnitt, dann das Kabel.
- Norman als eigenes Kapitel. Nur die eine Verwechslung mit Gibson.
- Keine erfundenen Seitenzahlen.
