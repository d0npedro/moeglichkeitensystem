import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/modell")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "drei" });
  },
  component: () => null,
});
