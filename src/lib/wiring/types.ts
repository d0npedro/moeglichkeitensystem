import type { LageId, TimeOfDay, UmweltId } from "@/lib/moeglichkeiten/types";

export type WiringDomain = "haus" | "bestand" | "gehen" | "modell" | "apparat";

export interface WiringContext {
  umwelt: UmweltId;
  locusId: string;
  radiusM: number;
  time: TimeOfDay;
  lage: LageId;
}

/** Ein Adapter trägt die Umwelt im Typ. Gemeinsames Inventar ist kein Vertrag. */
export interface WiringAdapter<TRead, TWrite = never> {
  id: string;
  domain: WiringDomain;
  umwelt: UmweltId;
  label: string;
  hint: string;
  read: (ctx: WiringContext) => TRead;
  write?: (ctx: WiringContext, body: TWrite) => TRead;
}

export interface HouseHumanRead {
  licht: "an" | "aus";
  rollo: "oben" | "unten" | "mitte";
  tuer: "zu" | "offen";
}

export interface HouseDevRead {
  geraete: { id: string; art: string; online: boolean }[];
  events: string[];
  luege: string;
}

export interface HouseBotRead {
  befahrbarM2: number;
  engstellen: string[];
  dosen: { id: string; frei: boolean }[];
}

export interface StockLine {
  name: string;
  da: boolean;
  note?: string;
}

export interface StockRead {
  offen: boolean;
  zeilen: StockLine[];
}

export interface WalkRead {
  naechstes: string;
  fuss: boolean;
  bahn?: string;
}

export interface ModelContract {
  wer: UmweltId;
  radiusM: number;
  zeit: TimeOfDay;
  lage: LageId;
  regel: string;
}

export interface ApparatRead {
  befahrbar: boolean;
  grenzen: string[];
  pfad: string;
}
