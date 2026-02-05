import { createFileRoute } from "@tanstack/react-router";
import { WishListPage } from "../pages/WishListPage";

export const Route = createFileRoute("/_authed/wishlist")({
  component: RouteComponent,
});

function RouteComponent() {
  return <WishListPage />;
}
