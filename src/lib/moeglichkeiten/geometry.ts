export type WallKind = "wall" | "window" | "door";

export interface WallSeg {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  kind: WallKind;
}

export interface Furnishing {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** World metres: +x east, +y north. Apartment around the Ehrenfeld studio. */
export const APARTMENT_WALLS: WallSeg[] = [
  // Studio
  { x1: -4.0, y1: -3.5, x2: 3.6, y2: -3.5, kind: "wall" },
  { x1: -4.0, y1: -3.5, x2: -4.0, y2: 4.1, kind: "wall" },
  { x1: -4.0, y1: 4.1, x2: -1.45, y2: 4.1, kind: "wall" },
  { x1: -1.45, y1: 4.1, x2: 2.05, y2: 4.1, kind: "window" },
  { x1: 2.05, y1: 4.1, x2: 3.6, y2: 4.1, kind: "wall" },
  { x1: 3.6, y1: 4.1, x2: 3.6, y2: 1.32, kind: "wall" },
  { x1: 3.6, y1: 1.32, x2: 3.6, y2: 0.18, kind: "door" },
  { x1: 3.6, y1: 0.18, x2: 3.6, y2: -3.5, kind: "wall" },

  // Flur
  { x1: 3.6, y1: 2.35, x2: 5.55, y2: 2.35, kind: "wall" },
  { x1: 5.55, y1: 2.35, x2: 5.55, y2: 2.15, kind: "wall" },
  { x1: 5.55, y1: 2.15, x2: 5.55, y2: 1.15, kind: "door" },
  { x1: 5.55, y1: 1.15, x2: 5.55, y2: -0.25, kind: "wall" },
  { x1: 5.55, y1: -0.25, x2: 5.55, y2: -1.2, kind: "door" },
  { x1: 5.55, y1: -1.2, x2: 5.55, y2: -3.5, kind: "wall" },
  { x1: 3.6, y1: -3.5, x2: 3.85, y2: -3.5, kind: "wall" },
  { x1: 3.85, y1: -3.5, x2: 5.05, y2: -3.5, kind: "door" },
  { x1: 5.05, y1: -3.5, x2: 5.55, y2: -3.5, kind: "wall" },

  // Wohnzimmer
  { x1: 5.55, y1: 6.25, x2: 10.7, y2: 6.25, kind: "wall" },
  { x1: 10.7, y1: 6.25, x2: 10.7, y2: 0.55, kind: "wall" },
  { x1: 10.7, y1: 0.55, x2: 5.55, y2: 0.55, kind: "wall" },
  { x1: 7.4, y1: 6.25, x2: 9.6, y2: 6.25, kind: "window" },

  // Küche
  { x1: 5.55, y1: 0.35, x2: 10.95, y2: 0.35, kind: "wall" },
  { x1: 10.95, y1: 0.35, x2: 10.95, y2: -5.95, kind: "wall" },
  { x1: 10.95, y1: -5.95, x2: 5.55, y2: -5.95, kind: "wall" },
  { x1: 8.2, y1: -5.95, x2: 10.1, y2: -5.95, kind: "window" },

  // Bad
  { x1: 1.45, y1: -3.5, x2: 1.45, y2: -7.35, kind: "wall" },
  { x1: 1.45, y1: -7.35, x2: 5.55, y2: -7.35, kind: "wall" },
  { x1: 5.55, y1: -7.35, x2: 5.55, y2: -3.5, kind: "wall" },
];

export const STUDIO_FURNISHINGS: Furnishing[] = [
  { x: -3.85, y: -1.15, w: 1.45, h: 2.7 },
  { x: -0.15, y: -0.15, w: 1.25, h: 1.05 },
  { x: 1.25, y: 2.15, w: 1.05, h: 1.15 },
];

export const ROOM_LABELS: { name: string; x: number; y: number }[] = [
  { name: "Studio", x: 0, y: 0.2 },
  { name: "Flur", x: 4.55, y: 0.4 },
  { name: "Wohnzimmer", x: 8.1, y: 3.4 },
  { name: "Küche", x: 8.2, y: -2.8 },
  { name: "Bad", x: 3.5, y: -5.4 },
];

export const PLAN_RADIUS_M = 90;
