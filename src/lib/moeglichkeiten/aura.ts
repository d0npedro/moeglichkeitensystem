import type { TimeOfDay, UmweltId } from "./types";
import { formatDistance } from "./model";
import { umweltOf } from "./umwelten";

/** Die neun Sätze. Verdrahtung darf sie ausführen. Nicht ersetzen. */
export const PRINCIPLES = [
  {
    id: "vorher",
    title: "Regelwerk vor Produkt",
    body: "Ohne festes Regelwerk verdrahtet jede Firma ihre eigene Nähe. Dann ändert sich die Welt nicht.",
  },
  {
    id: "naehe",
    title: "Nur die Nähe",
    body: "Aura ist der Nahbereich. Was außerhalb des Horizonts liegt, spricht hier nicht. Ferne ist ein anderes System.",
  },
  {
    id: "zwei",
    title: "Zwei Richtungen",
    body: "Empfang: der Ort bietet. Ausstrahlung: der Körper gibt der Umgebung etwas zu lesen. Eine Richtung allein ist kein Möglichkeitensystem.",
  },
  {
    id: "erlaubnis",
    title: "Darf steht im Satz",
    body: "Nichts wird genommen, was nicht angeboten wurde. Die Umgebung liest nur, was die Aura freigibt. Der Körper nutzt nur, was der Ort anbietet.",
  },
  {
    id: "angebot",
    title: "Handlung, nicht Ding",
    body: "Das Regelwerk trägt Angebote. Schalten. Sehen. Gehen. Lesen. Eine Geräte-Liste ist keine Aura.",
  },
  {
    id: "umwelt",
    title: "Die Umwelt bleibt getrennt",
    body: "Mensch, Entwickler, Roboter strahlen nicht dieselbe Nachricht aus. Wer das mischt, baut wieder eine gemeinsame Liste.",
  },
  {
    id: "standard",
    title: "Standard, nicht Plattform",
    body: "Ein fremdes Ding darf mitreden, wenn es die Regeln spricht. Kein Konto. Keine Cloud als Torwächter der Nähe.",
  },
  {
    id: "lage",
    title: "Die Lage ändert die Aura",
    body: "Hunger, Arbeit, Schlaf, Blick. Was du ausstrahlst, ist nicht fest. Wie der Lebensraum nicht fest ist.",
  },
  {
    id: "rand",
    title: "Der Rand gehört zur Nachricht",
    body: "Radius, Blick, Zeit sind Teil dessen, was die Umgebung lesen darf. Ohne Rand ist es das Netz. Das ist etwas anderes.",
  },
] as const;

const OFFERED: Record<UmweltId, string[]> = {
  mensch: ["wer hier steht", "wie weit der Horizont reicht", "wohin der Blick geht"],
  entwickler: ["welche Umwelt fragt", "welcher Radius offen ist", "was sich anbinden ließe"],
  roboter: ["Maß und Masse hier", "ob der Boden frei ist", "wo der Horizont endet"],
};

const WITHHELD: Record<UmweltId, string[]> = {
  mensch: ["was du nicht freigibst", "ferne Konten", "Inventar hinter dem Horizont"],
  entwickler: ["geheime Schlüssel", "die ganze Stadt als Graph", "fremde Umwelten als wäre sie deine"],
  roboter: ["Absicht als Gefühl", "Räume hinter geschlossenen Türen", "den Menschen als Datensatz"],
};

export function outgoingAura(input: {
  umwelt: UmweltId;
  radiusM: number;
  facingDeg: number;
  time: TimeOfDay;
}) {
  const u = umweltOf(input.umwelt);
  return {
    umwelt: u.label,
    radius: formatDistance(input.radiusM),
    facing: `${Math.round(input.facingDeg)}°`,
    time: input.time,
    offers: OFFERED[input.umwelt],
    withholds: WITHHELD[input.umwelt],
    sentence: `${u.label}. ${formatDistance(input.radiusM)}. Die Nähe darf das lesen. Mehr nicht.`,
  };
}
