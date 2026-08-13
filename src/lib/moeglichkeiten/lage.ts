import type { Affordance, LageId, UmweltId } from "./types";

export const LAGEN: { id: LageId; label: string; hint: string }[] = [
  { id: "neutral", label: "Ohne", hint: "Keine Lage schiebt den Rand." },
  { id: "hungrig", label: "Hunger", hint: "Bestand und Küche werden größer." },
  { id: "satt", label: "Satt", hint: "Die Bäckerei tritt zurück." },
  { id: "muede", label: "Müde", hint: "Ruhen zählt. Weite Wege fallen." },
  { id: "termin", label: "Termin", hint: "Ein ferner Ort zieht in den Horizont." },
];

export function lageOf(id: LageId) {
  return LAGEN.find((l) => l.id === id) ?? LAGEN[0]!;
}

/**
 * Lewin: die Lage ändert das Feld, nicht die Umgebung.
 * Keine dunkle Magie. Feste Faktoren an Dimension, Ort, Umwelt.
 */
export function lageFactor(item: Affordance, lage: LageId, umwelt: UmweltId): number {
  if (lage === "neutral") return 1;

  if (umwelt === "roboter") {
    if (lage === "hungrig") {
      if (item.verb.toLowerCase().includes("dock") || item.title.toLowerCase().includes("steckdose")) {
        return 1.65;
      }
      return 1;
    }
    if (lage === "termin") {
      return item.dimension === "handeln" ? 1.2 : 1;
    }
    if (lage === "muede") return 1;
    if (lage === "satt") return item.title.toLowerCase().includes("steckdose") ? 0.7 : 1;
  }

  if (umwelt === "entwickler") {
    if (lage === "termin") {
      return item.dimension === "schaffen" || item.dimension === "informieren" ? 1.28 : 1;
    }
    if (lage === "muede") {
      return item.title.toLowerCase().includes("siebträger") || item.title.toLowerCase().includes("kaffee")
        ? 1.35
        : 1;
    }
    if (lage === "hungrig") {
      return item.locusId === "kueche" || item.locusId === "baeckerei" ? 1.2 : 1;
    }
  }

  if (lage === "hungrig") {
    if (item.inventory && item.inventory.length > 0) return 1.55;
    if (item.dimension === "konsumieren") return 1.42;
    if (item.locusId === "baeckerei" || item.locusId === "kueche" || item.locusId === "kiosk") return 1.35;
    return 1;
  }

  if (lage === "satt") {
    if (item.locusId === "baeckerei") return 0.42;
    if (item.dimension === "konsumieren") return 0.68;
    if (item.dimension === "ruhen") return 1.18;
    return 1;
  }

  if (lage === "muede") {
    if (item.dimension === "ruhen") return 1.52;
    if (item.requiresWalk && item.walkSeconds > 40) return 0.52;
    return 1;
  }

  if (lage === "termin") {
    if (item.features?.includes("Bahn") || item.locusId === "halt" || item.locusId === "dom") return 1.48;
    if (item.dimension === "sozial") return 1.22;
    return 1;
  }

  return 1;
}
