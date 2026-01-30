import { createFileRoute } from "@tanstack/react-router";
import { WishListPage } from "../pages/WishListPage";

export const Route = createFileRoute("/wishlist")({
  component: RouteComponent,
});

function RouteComponent() {
  return <WishListPage />;
}
