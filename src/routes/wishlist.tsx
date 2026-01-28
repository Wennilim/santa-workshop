import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/wishlist")({
  component: WishlistComponent,
});

function WishlistComponent() {
  return (
    <div className="">
      <h1 className="text-2xl font-bold">Wishlist</h1>
    </div>
  );
}
