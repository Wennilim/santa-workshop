import { motion, type Transition } from "framer-motion";
import { cn } from "../../utils/cn";
import type { DecorationData } from "../../pages/WishListPage";

const SHARED_FLOAT_TRANSITION: Transition = {
  duration: 3,
  repeat: Infinity,
  repeatType: "reverse" as const,
  ease: "easeInOut" as const,
};

export const DecorativeIcon = ({ item }: { item: DecorationData }) => {
  const { src, alt, className, config, style } = item;
  return (
    <motion.div
      className={cn("absolute z-20", className)}
      style={style}
      initial={config.initial}
      whileInView={config.whileInView}
      viewport={{ once: true }}
      transition={config.transition}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
        animate={config.animate}
        transition={config.loopTransition || SHARED_FLOAT_TRANSITION}
      />
    </motion.div>
  );
};
