import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/spin")({
  component: SpinComponent,
});

function SpinComponent() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Spin</h1>
      <p>Good luck!</p>
    </div>
  );
}
