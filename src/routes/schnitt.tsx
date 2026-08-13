import { createFileRoute } from "@tanstack/react-router";
import { Schnitt } from "@/components/wiring/Schnitt";

export const Route = createFileRoute("/schnitt")({ component: SchnittPage });

function SchnittPage() {
  return <Schnitt />;
}
