import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!, // We'll provide this at runtime
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
