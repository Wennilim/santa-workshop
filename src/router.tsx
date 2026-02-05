import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import type { AuthContextValue } from "./auth/auth-types";

export function createAppRouter(auth: AuthContextValue) {
  return createRouter({
    routeTree,
    context: {
      auth,
    },
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createAppRouter>;
  }
}
