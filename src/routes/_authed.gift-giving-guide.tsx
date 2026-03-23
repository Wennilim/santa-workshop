import { createFileRoute } from "@tanstack/react-router";
import { GiftGivingGuidePage } from "../pages/GiftGivingGuidePage";

export const Route = createFileRoute("/_authed/gift-giving-guide")({
  component: GiftGivingGuidePage,
});
