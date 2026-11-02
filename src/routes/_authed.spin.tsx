import { createFileRoute, redirect } from "@tanstack/react-router";
import { SpinPage } from "../pages/SpinPage";
import { getRevealStatus } from "../api/getRevealStatus";
import { getMyRecipientRevealStatus } from "../api/getMyRecipientRevealStatus";

export const Route = createFileRoute("/_authed/spin")({
  beforeLoad: async ({ context: { queryClient } }) => {
    const data = await queryClient.ensureQueryData({
      queryKey: ["reveal-status"],
      queryFn: getRevealStatus,
    });

    const hasSpinLaunched = data?.status === "revealed";

    if (!hasSpinLaunched) {
      throw redirect({
        to: "/",
      });
    }

    const recipientRevealStatus = await queryClient.ensureQueryData({
      queryKey: ["my-recipient-reveal-status"],
      queryFn: getMyRecipientRevealStatus,
    });

    if (recipientRevealStatus?.hasRevealedRecipient) {
      throw redirect({
        to: "/",
      });
    }
  },

  component: SpinComponent,
});

function SpinComponent() {
  return <SpinPage />;
}
