import {
  createFileRoute,
  Outlet,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { Header } from "../components/Header";

export const Route = createFileRoute("/_authed")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthed) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AuthedLayout,
});

function AuthedLayout() {
  const navigate = useNavigate();
  return (
    <div className="bg-[url('/images/bg2.png')] bg-cover bg-center bg-fixed min-h-screen w-full flex flex-col overflow-x-hidden max-w-[1540px] mx-auto">
      <Header />
      <div className="flex-1 px-4 md:px-8 lg:px-12">
        <Outlet />
      </div>
      <footer className="text-center py-4">
        <button
          onClick={() => {
            navigate({ to: "/gift-giving-guide" });
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#2D6A4F] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#1B4332] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D6A4F] focus-visible:ring-offset-2 active:translate-y-0"
        >
          Gift Giving Guide
          <span aria-hidden="true">→</span>
        </button>
        <p className="mt-2 text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Santa Workshop. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
