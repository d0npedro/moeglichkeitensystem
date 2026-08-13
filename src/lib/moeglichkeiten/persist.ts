import type { Affordance, Locus } from "./types";

export const ATLAS_KEY = "pvm-atlas-v1";
export const ONBOARD_KEY = "pvm-onboarded";

export interface SavedAtlas {
  version: 1;
  theorie: "angebot-umwelt-lebensraum";
  loci: Locus[];
  angebote: Affordance[];
}

export function emptyAtlas(): SavedAtlas {
  return { version: 1, theorie: "angebot-umwelt-lebensraum", loci: [], angebote: [] };
}

export function loadAtlas(): SavedAtlas {
  if (typeof window === "undefined") return emptyAtlas();
  try {
    const raw = window.localStorage.getItem(ATLAS_KEY);
    if (!raw) return emptyAtlas();
    const parsed = JSON.parse(raw) as SavedAtlas;
    if (parsed?.version !== 1 || !Array.isArray(parsed.loci) || !Array.isArray(parsed.angebote)) {
      return emptyAtlas();
    }
    return {
      version: 1,
      theorie: "angebot-umwelt-lebensraum",
      loci: parsed.loci.filter((l) => l && typeof l.id === "string" && typeof l.name === "string"),
      angebote: parsed.angebote.filter(
        (a) => a && typeof a.id === "string" && typeof a.title === "string" && a.umwelt,
      ),
    };
  } catch {
    return emptyAtlas();
  }
}

export function saveAtlas(atlas: SavedAtlas): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ATLAS_KEY, JSON.stringify(atlas));
}

export function exportAtlasJson(atlas: SavedAtlas): string {
  return `${JSON.stringify(atlas, null, 2)}\n`;
}

export function parseAtlasJson(raw: string): SavedAtlas {
  const parsed = JSON.parse(raw) as SavedAtlas;
  if (parsed?.version !== 1) throw new Error("Nur Version 1.");
  if (parsed.theorie !== "angebot-umwelt-lebensraum") {
    throw new Error("Dieses JSON trägt die Theorie nicht.");
  }
  if (!Array.isArray(parsed.loci) || !Array.isArray(parsed.angebote)) {
    throw new Error("loci und angebote fehlen.");
  }
  for (const a of parsed.angebote) {
    if (!a.umwelt) throw new Error(`Angebot ${a.id} ohne Umwelt.`);
  }
  return {
    version: 1,
    theorie: "angebot-umwelt-lebensraum",
    loci: parsed.loci,
    angebote: parsed.angebote,
  };
}

export function onboarded(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(ONBOARD_KEY) === "1";
  } catch {
    return true;
  }
}

export function setOnboarded(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ONBOARD_KEY, "1");
}
