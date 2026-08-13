import { createFileRoute } from "@tanstack/react-router";
import { Foundation } from "@/components/arbeit/Foundation";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <Foundation />;
}
