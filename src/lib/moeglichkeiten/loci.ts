import type { Locus } from "./types";

export const LOCI: Locus[] = [
  {
    id: "studio",
    name: "Studio",
    kind: "Arbeitsraum",
    district: "Wohnung, Ehrenfeld",
    x: 0,
    y: 0,
    defaultFacing: 38,
    blurb:
      "Mitte des Zimmers, nicht am Rechner. Blick zur Ecke aus Fenster und Tür: Rollladen und Lichtschalter liegen im selben Gesichtsfeld — du müsstest hingehen.",
  },
  {
    id: "wohnzimmer",
    name: "Wohnzimmer",
    kind: "Aufenthalt",
    district: "Wohnung, Ehrenfeld",
    x: 8.1,
    y: 3.4,
    defaultFacing: 0,
    blurb: "Sofa, Fenster zur Straße, der soziale Innenraum der Wohnung.",
  },
  {
    id: "kueche",
    name: "Küche",
    kind: "Versorgung",
    district: "Wohnung, Ehrenfeld",
    x: 8.2,
    y: -2.8,
    defaultFacing: 180,
    blurb: "Wasser, Wärme, Vorrat. Der Raum, in dem der Körper sich wiederherstellt.",
  },
  {
    id: "bad",
    name: "Bad",
    kind: "Care",
    district: "Wohnung, Ehrenfeld",
    x: 3.5,
    y: -5.4,
    defaultFacing: 180,
    blurb: "Waschen, Spiegel, kurze Rückzüge aus dem Arbeitstag.",
  },
  {
    id: "flur",
    name: "Flur",
    kind: "Schwelle",
    district: "Wohnung, Ehrenfeld",
    x: 4.55,
    y: 0.35,
    defaultFacing: 90,
    blurb: "Verteiler der Wohnung. Von hier aus kippt der Horizont in die Nachbarräume.",
  },
  {
    id: "strasse",
    name: "Haustür",
    kind: "Straße",
    district: "Venloer Straße",
    x: 18,
    y: 2,
    defaultFacing: 95,
    blurb: "Schwelle zur Stadt. Briefkasten, Nachbar, Fahrrad, der erste Atem draußen.",
  },
  {
    id: "baeckerei",
    name: "Bäckerei",
    kind: "Laden",
    district: "Venloer Straße",
    x: 420,
    y: 165,
    defaultFacing: 0,
    blurb:
      "Laufweite. Hier verdichtet sich Konsum auf einen Bestand — was heute tatsächlich da ist.",
  },
  {
    id: "park",
    name: "Grüngürtel",
    kind: "Freiraum",
    district: "Innerer Grüngürtel",
    x: 780,
    y: -240,
    defaultFacing: 140,
    blurb: "Gehen ohne Auftrag. Bänke, Wiese, der Kiez als Atemraum.",
  },
  {
    id: "dom",
    name: "Domplatte",
    kind: "Ort",
    district: "Altstadt-Nord",
    x: 3400,
    y: 2100,
    defaultFacing: 200,
    blurb: "Städtischer Pol. Ankunft, Treffen, der große Maßstab Kölns.",
  },
];

export function locusById(id: string): Locus {
  const found = LOCI.find((l) => l.id === id);
  if (!found) throw new Error(`Unknown locus ${id}`);
  return found;
}
