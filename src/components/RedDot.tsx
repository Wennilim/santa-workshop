import { motion } from "framer-motion";

export const RedDot = () => {
  return (
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
  );
};
