import { AFFORDANCES } from "./affordances";
import { LOCI } from "./loci";
import { MACHINE_AFFORDANCES } from "./umwelten";
import { emptyAtlas, loadAtlas, saveAtlas, type SavedAtlas } from "./persist";
import type { Affordance, Locus, UmweltId } from "./types";

let extra: SavedAtlas = emptyAtlas();

export function hydrateAtlas(): SavedAtlas {
  extra = loadAtlas();
  return extra;
}

export function ownAtlas(): SavedAtlas {
  return extra;
}

export function writeOwnAtlas(next: SavedAtlas): void {
  extra = next;
  saveAtlas(next);
}

export function allLoci(): Locus[] {
  const map = new Map<string, Locus>();
  for (const l of LOCI) map.set(l.id, { ...l, source: "builtin" });
  for (const l of extra.loci) map.set(l.id, { ...l, source: "eigen" });
  return [...map.values()];
}

export function findLocus(id: string): Locus | undefined {
  return allLoci().find((l) => l.id === id);
}

export function requireLocus(id: string): Locus {
  const found = findLocus(id);
  if (!found) throw new Error(`Unknown locus ${id}`);
  return found;
}

export function ownerOf(item: Affordance): UmweltId {
  return item.umwelt ?? "mensch";
}

export function allOffers(): Affordance[] {
  const map = new Map<string, Affordance>();
  for (const a of AFFORDANCES) map.set(a.id, { ...a, umwelt: ownerOf(a), source: "builtin" });
  for (const a of MACHINE_AFFORDANCES) map.set(a.id, { ...a, umwelt: ownerOf(a), source: "builtin" });
  for (const a of extra.angebote) map.set(a.id, { ...a, source: "eigen" });
  return [...map.values()];
}

export function offersInUmwelt(umwelt: UmweltId): Affordance[] {
  return allOffers().filter((a) => ownerOf(a) === umwelt);
}
