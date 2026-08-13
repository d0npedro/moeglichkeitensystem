import { createFileRoute } from "@tanstack/react-router";
import { Instrument } from "@/components/field/Instrument";

export const Route = createFileRoute("/feld")({ component: FeldPage });

function FeldPage() {
  return <Instrument />;
}
