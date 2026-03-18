import { useQuery } from "@tanstack/react-query";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useState } from "react";
import { getRecipient } from "../api/getRecipient";
import { LockIcon, RefreshIcon } from "../assets/icons";
import { RecipientDecorations } from "../components/recipient/RecipientDecorations";
import { WishlistCard } from "../components/recipient/WishlistCard";
import type { TWishlist } from "../stores/useGlobalStore";
import { cn } from "../utils/cn";

export const RecipientWishlistPage = () => {
  const reduceMotion = useReducedMotion();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const getRecipientQuery = useQuery({
    queryKey: ["recipient"],
    queryFn: getRecipient,
  });

  const { data, isLoading, isError, refetch } = getRecipientQuery;

  const wishlist = data?.wishlist ?? [];

  const page: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: reduceMotion
        ? { duration: 0.01 }
        : { duration: 0.35, ease: "easeOut" },
    },
  };

  const panel: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0.01 }
        : { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const headerStagger: Variants = {
    hidden: {},
    visible: {
      transition: reduceMotion
        ? { staggerChildren: 0 }
        : { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0.01 }
        : { duration: 0.45, ease: "easeOut" },
    },
  };

  const listStagger: Variants = {
    hidden: {},
    visible: {
      transition: reduceMotion
        ? { staggerChildren: 0 }
        : { staggerChildren: 0.12, delayChildren: 0.12 },
    },
  };

  return (
    <motion.section
      id="recipient-wishlist"
      aria-label="Recipient Wishlist"
      className="relative w-full px-4 sm:px-6 md:px-10 lg:px-16"
      variants={page}
      initial="hidden"
      animate="visible"
    >
      <RecipientDecorations />

      <motion.div
        variants={panel}
        className={cn(
          "mx-auto w-full max-w-[1100px]",
          "bg-[#FFFEF9]",
          "border-4 border-[#C5BC9A]/50 border-dashed",
          "rounded-[32px] sm:rounded-[44px] md:rounded-[60px]",
          "px-5 py-8 sm:px-8 sm:py-10 md:px-12 md:py-12",
          "my-6 sm:my-10 md:my-14",
          "flex flex-col items-center",
        )}
      >
        {/* Header */}
        <motion.header
          variants={headerStagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <div className="relative size-[110px] sm:size-[130px] md:size-[160px] lg:size-[190px] flex items-center justify-center">
            <AnimatePresence>
              {!isImageLoaded && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    default: { duration: 0.4 },
                  }}
                  className="absolute inset-0 bg-[#C5BC9A]/20 rounded-full z-20"
                />
              )}
            </AnimatePresence>
            <motion.img
              variants={fadeUp}
              src="/images/santa-profile.png"
              alt="Santa Profile"
              className={cn(
                "size-full z-10",
                !isImageLoaded ? "invisible" : "visible",
              )}
              onLoad={() => setIsImageLoaded(true)}
              loading="eager"
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      rotate: -1.5,
                      scale: 1.02,
                      transition: { duration: 0.25 },
                    }
              }
              initial="hidden"
              animate={isImageLoaded ? "visible" : "hidden"}
            />
          </div>

          <motion.h1
            variants={fadeUp}
            className={cn(
              "mt-3 text-center uppercase font-bold font-[dynapuff] text-[#613E0F]",
              "text-[34px] leading-[1.05]",
              "sm:text-[44px]",
              "md:text-[54px]",
              "max-w-[320px] sm:max-w-[420px]",
              "wrap-break-word",
            )}
          >
            {data?.recipient_name}
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="mt-5 sm:mt-6 flex items-center justify-center gap-2 sm:gap-3"
          >
            <motion.img
              src="/icons/pink-star.svg"
              alt="Pink Star"
              className="size-5 sm:size-6"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      rotate: [0, 6, 0],
                      transition: { duration: 2.2, repeat: Infinity },
                    }
              }
            />
            <p
              className={cn(
                "text-center font-bold font-[dynapuff] text-[#613E0F]",
                "text-[16px] sm:text-[18px] md:text-[22px]",
                "tracking-wide",
              )}
            >
              {data?.gender === "male" ? "HIS" : "HER"} WISHLIST
            </p>
            <motion.img
              src="/icons/pink-star.svg"
              alt="Pink Star"
              className="size-5 sm:size-6"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      rotate: [0, -6, 0],
                      transition: { duration: 2.2, repeat: Infinity },
                    }
              }
            />
          </motion.div>
        </motion.header>

        {/* Content Section */}
        <div className="mt-8 sm:mt-10 md:mt-12 w-full min-h-[300px] flex flex-col items-center">
          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 w-full">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-32 rounded-2xl bg-[#C5BC9A]/20 animate-pulse"
                />
              ))}
            </div>
          ) : isError ? (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center gap-4 py-8"
            >
              <div className="bg-[#FFD6D6] p-4 rounded-full">
                <RefreshIcon className="size-8 text-[#E63946]" />
              </div>
              <p className="text-center font-bold font-[dynapuff] text-[#613E0F] text-lg">
                Oops! Failed to load wishlist
              </p>
              <button
                onClick={() => refetch()}
                className="bg-[#2D6A4F] text-white px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform"
              >
                Try Again
              </button>
            </motion.div>
          ) : wishlist.length === 0 ? (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center gap-4 bg-amber-50/50 rounded-2xl px-12 py-12"
            >
              <img
                src="/images/buddha.png"
                alt="Empty"
                className="size-32"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <p className="text-center font-semibold text-[#613E0F]/60 text-lg sm:text-xl">
                No wishes. No desires. Just vibes.
              </p>
            </motion.div>
          ) : (
            <motion.main
              variants={listStagger}
              initial="hidden"
              animate="visible"
              className={cn(
                "w-full grid grid-cols-1 lg:grid-cols-3",
                "gap-4 sm:gap-5",
              )}
            >
              {wishlist.map((item: TWishlist, index: number) => (
                <motion.div key={item.id} variants={fadeUp}>
                  <WishlistCard {...{ item, index }} />
                </motion.div>
              ))}
            </motion.main>
          )}
        </div>

        {/* Footer */}
        <motion.footer
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-10 sm:mt-14 flex items-center gap-2"
        >
          <LockIcon className="size-4 text-[#C5BC9A]/60" />
          <p className="text-[13px] sm:text-[14px] md:text-[15px] font-semibold text-[#C5BC9A]/70 text-center tracking-wide">
            PERSONAL MISSION: TOP SECRET
          </p>
        </motion.footer>
      </motion.div>
    </motion.section>
  );
};
