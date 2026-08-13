import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/moeglichkeitensystem/schnitt")({
  beforeLoad: () => {
    throw redirect({ to: "/schnitt" });
  },
  component: () => null,
});
