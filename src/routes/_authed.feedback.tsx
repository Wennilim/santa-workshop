import { createFileRoute } from "@tanstack/react-router";
import { FeedbackPage } from "../pages/FeedbackPage";

export const Route = createFileRoute("/_authed/feedback")({
  component: RouteComponent,
});

function RouteComponent() {
  return <FeedbackPage />;
}
