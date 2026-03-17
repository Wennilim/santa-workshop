import { createFileRoute, redirect } from "@tanstack/react-router";
import { SpinPage } from "../pages/SpinPage";
import { getRevealStatus } from "../api/getRevealStatus";

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
  },

  component: SpinComponent,
});

function SpinComponent() {
  return <SpinPage />;
}
