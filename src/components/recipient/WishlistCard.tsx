import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../utils/cn";
import { isValidLink } from "../../utils/isValidLink";
import type { TWishlist } from "../../stores/useGlobalStore";

const wishlistCardColor = [
  "border-[#FF6B6B]/40 bg-[#FFD6D6]/45",
  "border-[#82B0FB]/40 bg-[#A0C4FF]/40",
  "border-[#A7D7C5]/60 bg-[#B9FBC0]/20",
];

const wishlistCardIcon = ["/icons/w1.svg", "/icons/w2.svg", "/icons/w3.svg"];

type Props = {
  item: TWishlist;
  index: number;
};

export const WishlistCard = ({ item, index }: Props) => {
  const reduceMotion = useReducedMotion();
  const isValid = isValidLink(item.link);
  const cardClassName = cn(
    "block h-full w-full",
    "p-5 sm:p-6",
    "min-h-[180px] sm:min-h-[210px]",
    "flex flex-col items-center justify-center gap-3 sm:gap-4",
    "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#613E0F]/20",
  );

  const content = (
    <>
      <motion.img
        src={wishlistCardIcon[index]}
        alt="Wish Icon"
        className="size-[64px] sm:size-[72px] md:size-[78px]"
        whileHover={
          reduceMotion || !isValid ? undefined : { rotate: 1.5, scale: 1.03 }
        }
        transition={{ duration: 0.22 }}
      />

      <p
        className={cn(
          "text-center font-bold font-[dynapuff] text-[#613E0F]",
          "text-[18px] sm:text-[20px] md:text-[22px]",
          "max-w-[280px]",
          "line-clamp-2 wrap-break-word",
        )}
      >
        {item.name}
      </p>

      {isValid && (
        <p className="text-[12px] sm:text-[13px] font-semibold text-[#613E0F]/55">
          Tap to open link →
        </p>
      )}
    </>
  );

  return (
    <motion.div
      className={cn(
        "group rounded-[28px] sm:rounded-[32px]",
        "border-4 shadow-md",
        "overflow-hidden",
        wishlistCardColor[index],
      )}
      whileHover={
        reduceMotion || !isValid
          ? undefined
          : {
              y: -6,
              scale: 1.01,
              boxShadow: "0 16px 30px rgba(0,0,0,0.12)",
              transition: { duration: 0.22, ease: "easeOut" },
            }
      }
      whileTap={reduceMotion || !isValid ? undefined : { scale: 0.985 }}
    >
      {isValid ? (
        <Link to={item.link} target="_blank" className={cardClassName}>
          {content}
        </Link>
      ) : (
        <div className={cardClassName}>{content}</div>
      )}
    </motion.div>
  );
};
