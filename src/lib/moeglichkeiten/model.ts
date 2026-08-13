import type {
  Affordance,
  Dimension,
  DimensionId,
  ScaleBand,
  TimeOfDay,
  UmweltId,
  ViewedAffordance,
} from "./types";
import { AFFORDANCES } from "./affordances";
import { LOCI } from "./loci";
import { MACHINE_AFFORDANCES, UMWELTEN } from "./umwelten";

export const MIN_RADIUS_M = 1.2;
export const MAX_RADIUS_M = 8000;
export const DEFAULT_RADIUS_M = 8;
export const DEFAULT_FOV_DEG = 128;

export const DIMENSIONS: Dimension[] = [
  {
    id: "handeln",
    label: "Handeln",
    short: "Hand",
    hint: "Motorische Angebote: schalten, öffnen, greifen, gehen.",
    mark: "circle",
  },
  {
    id: "wahrnehmen",
    label: "Wahrnehmen",
    short: "Blick",
    hint: "Was der Raum dem Blick, Gehör, Geruch anbietet.",
    mark: "ring",
  },
  {
    id: "schaffen",
    label: "Schaffen",
    short: "Werk",
    hint: "Produktive und künstlerische Nutzung — spielen, aufnehmen, schreiben.",
    mark: "diamond",
  },
  {
    id: "konsumieren",
    label: "Konsumieren",
    short: "Gut",
    hint: "Verfügbare Güter und ihre Bestände — etwa Brötchen in der Bäckerei.",
    mark: "square",
  },
  {
    id: "sozial",
    label: "Soziales",
    short: "Ander",
    hint: "Begegnen, sprechen, anstehen, begrüßen.",
    mark: "triangle",
  },
  {
    id: "ruhen",
    label: "Ruhen",
    short: "Care",
    hint: "Sitzen, waschen, schlafen, sich versorgen.",
    mark: "dash",
  },
  {
    id: "informieren",
    label: "Informieren",
    short: "Lage",
    hint: "Lesen, nachsehen, Orientierung einholen.",
    mark: "cross",
  },
];

export const SCALES: ScaleBand[] = [
  { id: "griff", label: "Griff", hint: "Ohne Schritt erreichbar", fromM: 0, toM: 1.5 },
  { id: "raum", label: "Raum", hint: "Im selben Zimmer sichtbar", fromM: 1.5, toM: 8 },
  { id: "nachbar", label: "Nachbar", hint: "Angrenzende Räume der Wohnung", fromM: 8, toM: 40 },
  { id: "haus", label: "Haus", hint: "Gebäude, Hof, Straße vor der Tür", fromM: 40, toM: 220 },
  { id: "kiez", label: "Kiez", hint: "Laufweite — Bäckerei, Halt, Park", fromM: 220, toM: 1600 },
  { id: "stadt", label: "Stadt", hint: "Köln als erweiterter Horizont", fromM: 1600, toM: 8000 },
];

export const TIMES: { id: TimeOfDay; label: string; clock: string }[] = [
  { id: "morgen", label: "Morgen", clock: "07–11" },
  { id: "tag", label: "Tag", clock: "11–17" },
  { id: "abend", label: "Abend", clock: "17–22" },
  { id: "nacht", label: "Nacht", clock: "22–07" },
];

export const ALL_OFFERS: Affordance[] = [...AFFORDANCES, ...MACHINE_AFFORDANCES];

export { UMWELTEN };

export const ALL_DIMENSION_IDS: DimensionId[] = DIMENSIONS.map((d) => d.id);

export function dimensionOf(id: DimensionId): Dimension {
  const found = DIMENSIONS.find((d) => d.id === id);
  if (!found) throw new Error(`Unknown dimension ${id}`);
  return found;
}

export function scaleForDistance(meters: number): ScaleBand {
  return SCALES.find((s) => meters < s.toM) ?? SCALES[SCALES.length - 1]!;
}

export function formatDistance(meters: number): string {
  if (meters < 1) return `${Math.round(meters * 100)} cm`;
  if (meters < 950) return `${meters < 10 ? meters.toFixed(1).replace(".", ",") : Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1).replace(".", ",")} km`;
}

export function formatWalk(seconds: number): string {
  if (seconds < 45) return `${seconds} s`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} h ${rest} min` : `${hours} h`;
}

export function radiusToSlider(meters: number): number {
  const t = Math.log(meters / MIN_RADIUS_M) / Math.log(MAX_RADIUS_M / MIN_RADIUS_M);
  return Math.min(1, Math.max(0, t));
}

export function sliderToRadius(t: number): number {
  const clamped = Math.min(1, Math.max(0, t));
  return MIN_RADIUS_M * Math.pow(MAX_RADIUS_M / MIN_RADIUS_M, clamped);
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function rnd(n: number) {
  return Math.round(n * 100) / 100;
}

export function logPlot(meters: number, maxMeters: number, plotR: number): number {
  const t = Math.log(meters + 1) / Math.log(maxMeters + 1);
  return Math.max(10, t * plotR);
}

export function polar(cx: number, cy: number, r: number, bearingDeg: number) {
  const rad = ((bearingDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

/** 0° = north, clockwise. +x east, +y north. */
export function bearingOf(dx: number, dy: number): number {
  const deg = (Math.atan2(dx, dy) * 180) / Math.PI;
  return (deg + 360) % 360;
}

export function angularDistance(a: number, b: number): number {
  return Math.abs(((a - b + 540) % 360) - 180);
}

export function inFov(bearing: number, facing: number, fov: number): boolean {
  return angularDistance(bearing, facing) <= fov / 2;
}

export function relativeBearing(bearing: number, facing: number): number {
  return ((bearing - facing + 540) % 360) - 180;
}

export function worldToPlot(
  worldX: number,
  worldY: number,
  originX: number,
  originY: number,
  radiusM: number,
  cx: number,
  cy: number,
  plotR: number,
) {
  const dx = worldX - originX;
  const dy = worldY - originY;
  const dist = Math.hypot(dx, dy);
  const bearing = dist < 1e-6 ? 0 : bearingOf(dx, dy);
  const safeR = Math.max(radiusM, 1.2);

  const cartX = cx + (dx / safeR) * plotR;
  const cartY = cy - (dy / safeR) * plotR;

  const rLog = dist < 1e-6 ? 0 : (Math.log(dist + 1) / Math.log(safeR + 1)) * plotR;
  const pol = polar(cx, cy, rLog, bearing);

  const t = smoothstep(28, 150, radiusM);
  return {
    x: rnd(lerp(cartX, pol.x, t)),
    y: rnd(lerp(cartY, pol.y, t)),
    bearing,
    dist,
    blend: t,
  };
}

export function isAvailable(item: Affordance, time: TimeOfDay): boolean {
  if (item.closedAt?.includes(time)) return false;
  return true;
}

export function isSeen(item: ViewedAffordance): boolean {
  return (
    item.inRadius &&
    item.available &&
    item.inFov &&
    (item.visibleStanding || item.distanceM < 8)
  );
}

/** Far places collapse to one offer until that place becomes the center. */
export function horizonItems(
  items: ViewedAffordance[],
  radiusM: number,
  locusId: string,
): ViewedAffordance[] {
  const inR = items.filter((i) => i.inRadius);
  if (radiusM < 120) return inR;
  const inner = radiusM * 0.1;
  const out: ViewedAffordance[] = [];
  const seenLocus = new Set<string>();
  for (const item of inR) {
    if (item.locusId === locusId) {
      if (item.distanceM >= inner) out.push(item);
      continue;
    }
    if (seenLocus.has(item.locusId)) continue;
    const ambassador =
      inR.find((x) => x.locusId === item.locusId && x.travelToLocusId) ?? item;
    seenLocus.add(item.locusId);
    out.push(ambassador);
  }
  return out;
}

export function sinnReason(item: ViewedAffordance): string {
  if (!item.available) return "jetzt nicht nutzbar";
  if (item.inFov && item.requiresWalk) return "sichtbar, hingehen";
  if (item.inFov && !item.requiresWalk) return "in Reichweite";
  if (item.visibleStanding) return "im Raum, nicht im Blick";
  return "gewusst, nicht gesehen";
}

function sinnScore(item: ViewedAffordance, radiusM: number): number {
  if (!item.inRadius) return 0;
  const reach = Math.max(radiusM, 4);
  const closeness = 1 / (1 + item.distanceM / (reach * 0.38));
  const look = item.inFov ? 1.28 : item.visibleStanding ? 0.62 : 0.42;
  const now = item.available ? 1 : 0.12;
  const walkSee =
    item.requiresWalk && item.inFov && item.visibleStanding && item.distanceM < 14 ? 1.26 : 1;
  const inner = reach * 0.1;
  const recede = item.distanceM < inner ? 0.3 : 1;
  return item.salience * closeness * look * now * walkSee * recede;
}

export function viewFrom(
  locusId: string,
  radiusM: number,
  facingDeg: number,
  fovDeg: number,
  time: TimeOfDay,
  dimensions: DimensionId[],
  umwelt: UmweltId = "mensch",
): ViewedAffordance[] {
  const center = LOCI.find((l) => l.id === locusId);
  if (!center) return [];

  const dimSet = new Set(dimensions);
  const viewed: ViewedAffordance[] = [];

  for (const raw of ALL_OFFERS) {
    const owner = raw.umwelt ?? "mensch";
    if (owner !== umwelt) continue;
    if (!dimSet.has(raw.dimension)) continue;
    const home = LOCI.find((l) => l.id === raw.locusId);
    if (!home) continue;
    const worldX = home.x + raw.lx;
    const worldY = home.y + raw.ly;
    const dx = worldX - center.x;
    const dy = worldY - center.y;
    const distanceM = Math.hypot(dx, dy);
    if (distanceM < 0.2 && raw.locusId === center.id && !raw.requiresWalk) {
      // keep near-body items at the current locus
    } else if (distanceM < 0.2) {
      continue;
    }
    const bearingDeg = distanceM < 0.2 ? facingDeg : bearingOf(dx, dy);
    const available = isAvailable(raw, time);
    const item: ViewedAffordance = {
      ...raw,
      worldX,
      worldY,
      distanceM,
      bearingDeg,
      inRadius: distanceM <= radiusM,
      inFov: inFov(bearingDeg, facingDeg, fovDeg),
      available,
      sinn: 0,
    };
    item.sinn = sinnScore(item, radiusM);
    viewed.push(item);
  }

  return viewed.sort((a, b) => b.sinn - a.sinn || a.distanceM - b.distanceM);
}

export function inventoryNow(item: Affordance, time: TimeOfDay) {
  return (item.inventory ?? []).map((row) => ({
    ...row,
    open: row.available.includes(time),
  }));
}

export function countByDimension(items: ViewedAffordance[]) {
  const counts = Object.fromEntries(DIMENSIONS.map((d) => [d.id, 0])) as Record<
    DimensionId,
    number
  >;
  for (const item of items) {
    if (item.inRadius && item.available) counts[item.dimension] += 1;
  }
  return counts;
}
