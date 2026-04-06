import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getCheckHasSubmitFeedback } from "../api/getCheckHasSubmitFeedback";
import { getMySubmittedWishlist } from "../api/getMySubmittedWishlist";
import { LogoutIcon, MenuIcon } from "../assets/icons";
import { cn } from "../utils/cn";
import { LogoutModal } from "./dashboard/LogoutModal";
import { MobileDrawer } from "./MobileDrawer";
import { RedDot } from "./RedDot";

const menu = [
  { id: 1, name: "Dashboard", link: "/" },
  { id: 2, name: "Wishlist", link: "/wishlist" },
  { id: 3, name: "Feedback", link: "/feedback" },
];

export const NaviTab = () => {
  const location = useLocation();

  const now = new Date();
  const isFeedbackPeriod =
    now.getMonth() === 11 && now.getDate() >= 26 && now.getDate() <= 31;

  const visibleMenu = menu.filter(
    (item) => item.name !== "Feedback" || isFeedbackPeriod,
  );

  const activeMenu =
    visibleMenu.find((item) => item.link === location.pathname)?.id || 0;
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isOpenLogoutModal, setIsOpenLogoutModal] = useState(false);

  const getMySubmittedWishlistQuery = useQuery({
    queryKey: ["my-submitted-wishlist"],
    queryFn: () => getMySubmittedWishlist(),
  });

  const hasSubmittedWishlist = getMySubmittedWishlistQuery?.data?.length !== 0;

  const getCheckHasSubmitFeedbackQuery = useQuery({
    queryKey: ["check-has-submit-feedback"],
    queryFn: () => getCheckHasSubmitFeedback(),
    refetchOnMount: true,
  });

  const hasSubmitFeedback = getCheckHasSubmitFeedbackQuery?.data?.hasSubmitted;

  useEffect(() => {
    const root = document.documentElement;
    if (isOpenLogoutModal) root.classList.add("overflow-hidden");
    else root.classList.remove("overflow-hidden");

    return () => root.classList.remove("overflow-hidden");
  }, [isOpenLogoutModal]);
  return (
    <>
      <LogoutModal
        isOpen={isOpenLogoutModal}
        setIsOpen={setIsOpenLogoutModal}
      />
      {/* ✅ Desktop */}
      <div className="hidden md:block bg-white rounded-full w-fit shadow-lg h-fit p-2">
        <div className="flex items-center justify-around gap-4 relative">
          {visibleMenu.map((item) => {
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
                  {item.name === "Wishlist" && !hasSubmittedWishlist && (
                    <RedDot />
                  )}
                  {item.name === "Feedback" && !hasSubmitFeedback && <RedDot />}
                </button>
              </Link>
            );
          })}

          <button
            className="ml-1 p-2 rounded-full transition-all duration-300 ease-in-out hover:bg-neutral-100"
            onClick={() => setIsOpenLogoutModal(true)}
            aria-label="Logout"
          >
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
        menu={visibleMenu}
        activeMenu={activeMenu}
        onChangeMenu={() => {}}
      />
    </>
  );
};
