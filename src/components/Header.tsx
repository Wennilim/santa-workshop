import { Logo } from "../components/Logo";
import { NaviTab } from "../components/NaviTab";

export const Header = () => {
  return (
    <div className="flex items-center justify-between p-8 lg:px-12">
      <Logo />
      <NaviTab />
    </div>
  );
};
