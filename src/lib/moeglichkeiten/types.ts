export type DimensionId =
  | "handeln"
  | "wahrnehmen"
  | "schaffen"
  | "konsumieren"
  | "sozial"
  | "ruhen"
  | "informieren";

export type ScaleId = "griff" | "raum" | "nachbar" | "haus" | "kiez" | "stadt";

export type TimeOfDay = "morgen" | "tag" | "abend" | "nacht";

export type UmweltId = "mensch" | "entwickler" | "roboter";

export type MarkShape = "circle" | "ring" | "diamond" | "square" | "triangle" | "dash" | "cross";

export interface Dimension {
  id: DimensionId;
  label: string;
  short: string;
  hint: string;
  mark: MarkShape;
}

export interface Umwelt {
  id: UmweltId;
  label: string;
  short: string;
  hint: string;
  studioFacing: number;
}

export interface ScaleBand {
  id: ScaleId;
  label: string;
  hint: string;
  fromM: number;
  toM: number;
}

export interface InventoryItem {
  name: string;
  available: TimeOfDay[];
  note?: string;
}

export interface Locus {
  id: string;
  name: string;
  kind: string;
  district: string;
  x: number;
  y: number;
  defaultFacing: number;
  blurb: string;
}

export interface Affordance {
  id: string;
  locusId: string;
  title: string;
  verb: string;
  description: string;
  humanUse: string;
  dimension: DimensionId;
  lx: number;
  ly: number;
  visibleStanding: boolean;
  requiresWalk: boolean;
  walkSeconds: number;
  salience: number;
  umwelt?: UmweltId;
  closedAt?: TimeOfDay[];
  inventory?: InventoryItem[];
  travelToLocusId?: string;
  features?: string[];
}

export interface ViewedAffordance extends Affordance {
  worldX: number;
  worldY: number;
  distanceM: number;
  bearingDeg: number;
  inRadius: boolean;
  inFov: boolean;
  available: boolean;
  sinn: number;
}

export interface FieldSnapshot {
  center: Locus;
  radiusM: number;
  facingDeg: number;
  fovDeg: number;
  time: TimeOfDay;
  items: ViewedAffordance[];
  horizon: ViewedAffordance[];
}
