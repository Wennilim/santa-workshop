import { createFileRoute } from "@tanstack/react-router";
import { SpinPage } from "../pages/SpinPage";

export const Route = createFileRoute("/_authed/spin")({
  component: SpinComponent,
});

function SpinComponent() {
  return <SpinPage />;
}
