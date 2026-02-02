import { createFileRoute } from "@tanstack/react-router";
import { SpinPage } from "../pages/SpinPage";

export const Route = createFileRoute("/spin")({
  component: SpinComponent,
});

function SpinComponent() {
  return <SpinPage />;
}
