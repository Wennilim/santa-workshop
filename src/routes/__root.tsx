import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import type { AuthContextValue } from "../auth/auth-types";
import { QueryClient } from "@tanstack/react-query";
import { AuthErrorModal } from "../components/AuthErrorModal";


interface MyRouterContext {
  auth: AuthContextValue;
  queryClient: QueryClient;
}


export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <AuthErrorModal />
    </>
  );
}

function NotFoundComponent() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-[#F16266] text-white rounded-full font-bold hover:scale-105 transition-transform"
      >
        Go back home
      </a>
    </div>
  );
}
