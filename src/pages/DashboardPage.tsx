import { Logo } from "../components/Logo";
import { NaviTab } from "../components/NaviTab";

export const DashboardPage = () => {
  return (
    <div className="bg-[url('/images/bg2.png')] w-screen h-screen bg-cover bg-center">
      <div className="flex items-center justify-between p-8 lg:px-12">
        <Logo />
        <NaviTab />
      </div>
    </div>
  );
};
