import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Header } from "../components/Header";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="bg-[url('/images/bg2.png')] bg-cover bg-center min-h-screen w-full flex flex-col overflow-x-hidden">
      <Header />
      <div className="flex-1 px-12">
        <Outlet />
      </div>
    </div>
  );
}
