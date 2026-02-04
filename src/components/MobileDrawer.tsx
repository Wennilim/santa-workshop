import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { CloseIcon, LogoutIcon } from "../assets/icons";
import { cn } from "../utils/cn";
import { Link } from "@tanstack/react-router";

type MenuItem = {
  id: number;
  name: string;
  link: string;
};

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
  menu: MenuItem[];
  activeMenu: number;
  onChangeMenu: (id: number) => void;
  onLogout?: () => void;
};

export const MobileDrawer = ({
  open,
  onClose,
  menu,
  activeMenu,
  onChangeMenu,
  onLogout,
}: MobileDrawerProps) => {
  // ESC 关闭 + 锁背景滚动
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            className="fixed right-0 top-0 z-50 h-full w-[85vw] max-w-[360px] bg-white shadow-2xl rounded-l-3xl p-5 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 420, damping: 40 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="/icons/santa-workshop-logo.svg"
                  alt="logo"
                  className="h-8 w-8"
                />
                <p className="font-bold text-lg text-[#2d6a4f] font-[dynapuff]">
                  Santa Workshop
                </p>
              </div>

              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-black/5 active:scale-95 transition"
                aria-label="Close drawer"
              >
                <CloseIcon className="size-5 cursor-pointer transition-color duration-200 ease-in-out hover:text-[#2D6A4F]" />
              </button>
            </div>

            {/* Menu */}
            <div className="mt-6 flex flex-col gap-2">
              {menu.map((item) => {
                const isActive = activeMenu === item.id;

                return (
                  <Link to={item.link}>
                    <button
                      key={item.id}
                      onClick={() => {
                        onChangeMenu(item.id);
                        onClose();
                      }}
                      className={cn(
                        "relative cursor-pointer w-full text-left px-4 py-3 rounded-2xl font-semibold transition",
                        isActive
                          ? "text-[#2d6a4f]"
                          : "text-neutral-600 hover:bg-black/5",
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="mobile-active-item"
                          className="absolute inset-0 rounded-2xl bg-[#d8f3dc]"
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
                          <span className="absolute top-4 right-4 flex h-3 w-3">
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
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E63946]" />
                          </span>
                        )}
                    </button>
                  </Link>
                );
              })}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Footer actions */}
            <button
              onClick={onLogout}
              className="mt-6 cursor-pointer flex items-center justify-center gap-2 rounded-2xl bg-[#ff3b3f] text-white py-3 font-bold shadow-[0_4px_10px_rgba(0,0,0,0.15)] active:scale-[0.98] transition"
            >
              <LogoutIcon className="h-5 w-5" />
              Logout
            </button>

            <p className="mt-4 text-center text-xs text-neutral-400">
              © 2026 Santa Workshop
            </p>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
