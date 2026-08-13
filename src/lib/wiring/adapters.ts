import type { TimeOfDay } from "@/lib/moeglichkeiten/types";
import type {
  ApparatRead,
  HouseBotRead,
  HouseDevRead,
  HouseHumanRead,
  ModelContract,
  StockRead,
  WalkRead,
  WiringAdapter,
  WiringContext,
} from "./types";

let licht: HouseHumanRead["licht"] = "aus";
let rollo: HouseHumanRead["rollo"] = "oben";
let tuer: HouseHumanRead["tuer"] = "zu";

export function resetHouseSim(): void {
  licht = "aus";
  rollo = "oben";
  tuer = "zu";
}

const STOCK: Record<string, { name: string; open: TimeOfDay[]; note?: string }[]> = {
  baeckerei: [
    { name: "Roggenbrötchen", open: ["morgen", "tag", "abend"], note: "den ganzen Tag" },
    { name: "Körnerbrötchen", open: ["morgen", "tag"], note: "nachmittags oft leer" },
    { name: "Laugenstange", open: ["morgen", "tag", "abend"] },
    { name: "Milchbrötchen", open: ["morgen"], note: "meist vor zehn weg" },
    { name: "Franzbrötchen", open: ["morgen", "tag"] },
    { name: "Vollkorn", open: ["morgen", "tag", "abend"] },
  ],
  kiosk: [
    { name: "Wasser", open: ["morgen", "tag", "abend"] },
    { name: "Zeitung", open: ["morgen", "tag"], note: "abends oft weg" },
    { name: "Kaugummi", open: ["morgen", "tag", "abend"] },
    { name: "Kaffee to go", open: ["morgen", "tag"] },
  ],
};

function stockOf(ort: string, time: TimeOfDay, nachtZu: boolean): StockRead {
  const rows = STOCK[ort] ?? [];
  return {
    offen: !(nachtZu && time === "nacht"),
    zeilen: rows.map((r) => ({
      name: r.name,
      da: r.open.includes(time) && !(nachtZu && time === "nacht"),
      note: r.note,
    })),
  };
}

export const hausMensch: WiringAdapter<HouseHumanRead, { licht?: HouseHumanRead["licht"]; rollo?: HouseHumanRead["rollo"]; tuer?: HouseHumanRead["tuer"] }> =
  {
    id: "haus-mensch",
    domain: "haus",
    umwelt: "mensch",
    label: "Haus · Mensch",
    hint: "Schalter, Gurt, Tür. Keine Geräteliste.",
    read: () => ({ licht, rollo, tuer }),
    write: (_ctx, body) => {
      if (body.licht) licht = body.licht;
      if (body.rollo) rollo = body.rollo;
      if (body.tuer) tuer = body.tuer;
      return { licht, rollo, tuer };
    },
  };

export const hausEntwickler: WiringAdapter<HouseDevRead> = {
  id: "haus-entwickler",
  domain: "haus",
  umwelt: "entwickler",
  label: "Haus · Entwickler",
  hint: "Bindings und Events. Eine Szene, die den Standpunkt ignoriert, ist eine Lüge.",
  read: (ctx) => ({
    geraete: [
      { id: "sw-studio-licht", art: "wippe", online: true },
      { id: "cover-studio-rollo", art: "gurt-impuls", online: true },
      { id: "lock-wohnung", art: "falle", online: tuer === "zu" },
    ],
    events: [
      `umwelt=${ctx.umwelt}`,
      `ort=${ctx.locusId}`,
      `licht=${licht}`,
      `rollo=${rollo}`,
    ],
    luege: "Eine Szene „Abend“ für alle Körper lügt. Sie kennt keinen Standpunkt.",
  }),
};

export const hausRoboter: WiringAdapter<HouseBotRead> = {
  id: "haus-roboter",
  domain: "haus",
  umwelt: "roboter",
  label: "Haus · Roboter",
  hint: "Befahrbare Fläche, Dosen, Engstellen. Kein Schalter als Gefühl.",
  read: () => ({
    befahrbarM2: 9.4,
    engstellen: ["Tür 72 cm", "Flur wenden", "Treppe nicht befahrbar"],
    dosen: [{ id: "dose-fenster", frei: true }, { id: "leiste-west", frei: licht === "an" }],
  }),
};

export const baeckereiMensch: WiringAdapter<StockRead> = {
  id: "baeckerei-mensch",
  domain: "bestand",
  umwelt: "mensch",
  label: "Bäckerei · Mensch",
  hint: "Was heute noch da ist. Ob sich der Weg lohnt.",
  read: (ctx) => stockOf("baeckerei", ctx.time, true),
};

export const baeckereiEntwickler: WiringAdapter<StockRead> = {
  id: "baeckerei-entwickler",
  domain: "bestand",
  umwelt: "entwickler",
  label: "Bäckerei · Entwickler",
  hint: "Feed, Restmenge, Öffnung. Dieselben Zeilen, anderer Sinn.",
  read: (ctx) => stockOf("baeckerei", ctx.time, true),
};

export const baeckereiRoboter: WiringAdapter<{ stufe: boolean; knauf: boolean; dichte: string }> = {
  id: "baeckerei-roboter",
  domain: "bestand",
  umwelt: "roboter",
  label: "Bäckerei · Roboter",
  hint: "Stufe, Knauf, Dichte. Kein Brötchen.",
  read: (ctx) => ({
    stufe: true,
    knauf: true,
    dichte: ctx.time === "morgen" ? "hoch" : ctx.time === "nacht" ? "zu" : "mittel",
  }),
};

export const kioskMensch: WiringAdapter<StockRead> = {
  id: "kiosk-mensch",
  domain: "bestand",
  umwelt: "mensch",
  label: "Kiosk · Mensch",
  hint: "Zweiter Bestand. Dieselbe Logik, andere Uhr.",
  read: (ctx) => stockOf("kiosk", ctx.time, true),
};

export const kioskEntwickler: WiringAdapter<StockRead> = {
  id: "kiosk-entwickler",
  domain: "bestand",
  umwelt: "entwickler",
  label: "Kiosk · Entwickler",
  hint: "SKU und Öffnung. Nicht Durst.",
  read: (ctx) => stockOf("kiosk", ctx.time, true),
};

export const kioskRoboter: WiringAdapter<{ knauf: boolean; stufe: boolean }> = {
  id: "kiosk-roboter",
  domain: "bestand",
  umwelt: "roboter",
  label: "Kiosk · Roboter",
  hint: "Knauf und Schwelle. Nicht Wasser.",
  read: () => ({ knauf: true, stufe: true }),
};

export const gehenMensch: WiringAdapter<WalkRead> = {
  id: "gehen-mensch",
  domain: "gehen",
  umwelt: "mensch",
  label: "Gehen · Mensch",
  hint: "Fuß zuerst. Bahn nur als Angebot.",
  read: (ctx) => ({
    naechstes: ctx.radiusM < 80 ? "Straße vor der Tür" : "Haltestelle, wenn der Horizont springt",
    fuss: true,
    bahn: ctx.radiusM >= 200 ? "Linie als Angebot" : undefined,
  }),
};

export const gehenEntwickler: WiringAdapter<{ feed: string; latenz: string }> = {
  id: "gehen-entwickler",
  domain: "gehen",
  umwelt: "entwickler",
  label: "Gehen · Entwickler",
  hint: "Feed, nicht Bürgersteig.",
  read: () => ({ feed: "Soll-Ist Haltestelle", latenz: "Zelle Hürth" }),
};

export const gehenRoboter: WiringAdapter<{ bordsteinCm: number; halt: string }> = {
  id: "gehen-roboter",
  domain: "gehen",
  umwelt: "roboter",
  label: "Gehen · Roboter",
  hint: "Bordstein und Spalt. Keine Freiheit.",
  read: () => ({ bordsteinCm: 12, halt: "Lücke zur Tür nicht überbrücken" }),
};

export const modellEntwickler: WiringAdapter<ModelContract> = {
  id: "modell-entwickler",
  domain: "modell",
  umwelt: "entwickler",
  label: "Modell · Vertrag",
  hint: "Das Modell kennt nicht die Stadt. Es kennt den Horizont dessen, der fragt.",
  read: (ctx) => ({
    wer: ctx.umwelt,
    radiusM: ctx.radiusM,
    zeit: ctx.time,
    lage: ctx.lage,
    regel: "Keine Antwort aus einer anderen Umwelt mischen, ohne das zu sagen.",
  }),
};

export const apparatRoboter: WiringAdapter<ApparatRead> = {
  id: "apparat-roboter",
  domain: "apparat",
  umwelt: "roboter",
  label: "Apparat · Pfad",
  hint: "Pfad nur auf Roboter-Angeboten. Grenzen sichtbar.",
  read: (ctx) => ({
    befahrbar: ctx.locusId !== "treppenhaus",
    grenzen:
      ctx.locusId === "treppenhaus"
        ? ["Treppe nicht befahrbar"]
        : ["Tür 72 cm", "Glas meiden", "Kabel am Boden"],
    pfad:
      ctx.locusId === "treppenhaus"
        ? "Kein Pfad. Die Treppe ist ein Ende."
        : "Simulation: freie Fläche im Büro, dann Flur, nicht die Treppe.",
  }),
};

export const ALL_ADAPTERS = [
  hausMensch,
  hausEntwickler,
  hausRoboter,
  baeckereiMensch,
  baeckereiEntwickler,
  baeckereiRoboter,
  kioskMensch,
  kioskEntwickler,
  kioskRoboter,
  gehenMensch,
  gehenEntwickler,
  gehenRoboter,
  modellEntwickler,
  apparatRoboter,
] as const;

export function adapterById(id: string) {
  return ALL_ADAPTERS.find((a) => a.id === id);
}

export function adaptersFor(umwelt: WiringContext["umwelt"], domain?: WiringAdapter<unknown>["domain"]) {
  return ALL_ADAPTERS.filter((a) => a.umwelt === umwelt && (!domain || a.domain === domain));
}

export function promptContract(ctx: WiringContext): string {
  return [
    `wer=${ctx.umwelt}`,
    `ort=${ctx.locusId}`,
    `radius_m=${ctx.radiusM}`,
    `zeit=${ctx.time}`,
    `lage=${ctx.lage}`,
    "regel=keine fremde Umwelt ohne Kennzeichnung",
  ].join(" ");
}
