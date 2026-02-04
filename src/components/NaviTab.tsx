import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import { MobileDrawer } from "./MobileDrawer";
import { LogoutIcon, MenuIcon } from "../assets/icons";
import { Link, useLocation } from "@tanstack/react-router";

const menu = [
  { id: 1, name: "Dashboard", link: "/" },
  { id: 2, name: "Wishlist", link: "/wishlist" },
];

export const NaviTab = () => {
  const location = useLocation();
  const activeMenu =
    menu.find((item) => item.link === location.pathname)?.id || 0;
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      {/* ✅ Desktop */}
      <div className="hidden md:block bg-white rounded-full w-[320px] shadow-lg h-fit p-2">
        <div className="flex items-center justify-around gap-4 relative">
          {menu.map((item) => {
            const isActive = activeMenu === item.id;
            return (
              <Link to={item.link} key={item.id}>
                <button
                  className={cn(
                    "relative px-4 py-2 rounded-full text-[16px] font-semibold cursor-pointer",
                    isActive
                      ? "text-[#2d6a4f]"
                      : "text-neutral-500 hover:bg-neutral-100 hover:transition-all hover:duration-300 hover:ease-in-out",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full bg-[#d8f3dc]"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}

                  <span className="relative z-10">{item.name}</span>
                  {item.name === "Wishlist" &&
                    sessionStorage.getItem("isLockWishlistSubmission") !==
                      "true" && (
                      <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
                        <motion.span
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [1, 0.4, 1],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute inline-flex h-full w-full rounded-full bg-[#E63946] opacity-75"
                        />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E63946]" />
                      </span>
                    )}
                </button>
              </Link>
            );
          })}

          <button className="ml-1 p-2 rounded-full transition-all duration-300 ease-in-out hover:bg-neutral-100">
            <LogoutIcon className="size-5 cursor-pointer transition-colors duration-200 ease-in-out hover:text-[#2D6A4F]" />
          </button>
        </div>
      </div>

      {/* ✅ Mobile */}
      <div className="md:hidden flex items-center justify-between w-fit">
        <button
          onClick={() => setOpenDrawer(true)}
          className="rounded-full bg-white shadow-lg p-3 active:scale-95 transition"
          aria-label="Open menu"
        >
          <MenuIcon className="size-5 cursor-pointer transition-color duration-200 ease-in-out hover:text-[#2D6A4F]" />
        </button>
      </div>

      <MobileDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        menu={menu}
        activeMenu={activeMenu}
        onChangeMenu={() => {}}
        onLogout={() => console.log("logout")}
      />
    </>
  );
};
