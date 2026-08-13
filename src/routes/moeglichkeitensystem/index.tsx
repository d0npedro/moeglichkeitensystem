import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/moeglichkeitensystem/")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});
