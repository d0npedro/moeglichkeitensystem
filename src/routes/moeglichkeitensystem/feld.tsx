import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/moeglichkeitensystem/feld")({
  beforeLoad: () => {
    throw redirect({ to: "/feld" });
  },
  component: () => null,
});
