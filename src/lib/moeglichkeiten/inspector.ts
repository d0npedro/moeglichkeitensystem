import type { LageId, TimeOfDay, UmweltId, ViewedAffordance } from "./types";
import { formatWalk } from "./model";
import { sinnReason } from "./model";
import { timeLabel } from "./clock";
import { lageOf } from "./lage";

const WER: Record<UmweltId, string> = {
  mensch: "einen Körper",
  entwickler: "jemanden, der Software baut",
  roboter: "einen Apparat",
};

export interface InspectorLines {
  was: string;
  fuerWen: string;
  warumJetzt: string;
  tun: string;
}

export function inspectorLines(
  item: ViewedAffordance,
  umwelt: UmweltId,
  time: TimeOfDay,
  lage: LageId,
): InspectorLines {
  const wer = WER[umwelt];
  const was = `${item.title}. Angebot: ${item.verb.toLowerCase()}.`;
  const fuerWen = `Für ${wer}. ${item.humanUse}`;
  const warum = sinnReason(item);
  const lageBit = lage === "neutral" ? timeLabel(time) : `${timeLabel(time)}, ${lageOf(lage).label.toLowerCase()}`;
  const warumJetzt = `${warum}. Jetzt: ${lageBit}.`;
  const tun = item.available
    ? item.requiresWalk
      ? `Hinlaufen, ${formatWalk(item.walkSeconds)}. Dann ${item.verb.toLowerCase()}.`
      : `Keinen Schritt. ${item.verb}.`
    : "Jetzt nicht. Die Tageszeit schließt dieses Angebot.";
  return { was, fuerWen, warumJetzt, tun };
}
