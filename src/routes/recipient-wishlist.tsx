import { createFileRoute } from "@tanstack/react-router";
import { RecipientWishlistPage } from "../pages/RecipientWishlistPage";


export const Route = createFileRoute("/recipient-wishlist")({
  component: RecipientWishlistComponent,
});

function RecipientWishlistComponent() {
  return <RecipientWishlistPage />;
}
