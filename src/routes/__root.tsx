import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Header } from "../components/Header";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="bg-[url('/images/bg2.png')] bg-cover bg-center bg-fixed min-h-screen w-full flex flex-col overflow-x-hidden">
      <Header />
      <div className="flex-1 px-4 md:px-8 lg:px-12">
        <Outlet />
      </div>
      <footer className="text-center py-4">
        <p className="text-sm text-gray-400">
          &copy; 2026 Santa Workshop. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
