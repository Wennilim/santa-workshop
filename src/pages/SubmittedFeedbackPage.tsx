import { useNavigate } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 14,
    },
  },
};
export const SubmittedFeedbackPage = () => {
  const navigate = useNavigate();
  return (
    <section
      id="feedback"
      aria-label="Feedback"
      className="relative overflow-hidden min-h-screen flex items-center justify-center"
    >
      <motion.img
        src="/icons/pink-star.svg"
        alt="Pink Star"
        className="absolute top-20 left-16 w-10 pointer-events-none"
        animate={{ y: [-10, 10], rotate: [0, 10, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.img
        src="/icons/pink-star.svg"
        alt="Pink Star"
        className="absolute top-28 right-20 w-6 pointer-events-none"
        animate={{ y: [-8, 8], rotate: [0, -8, 0] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.img
        src="/images/candy-canes.png"
        alt="Candy Canes"
        className="absolute bottom-24 left-12 w-14 pointer-events-none hidden md:block"
        animate={{ y: [-12, 12], rotate: [-5, 5] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="flex flex-col items-center gap-6 px-4 text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.img
          src="/images/santa-letter2.png"
          alt="Santa letter"
          className="size-[220px] sm:size-[280px]"
          variants={itemVariants}
          whileHover={{
            scale: 1.04,
            rotate: -2,
            transition: { duration: 0.3 },
          }}
        />
        <motion.h1
          variants={itemVariants}
          className="font-[dynapuff] font-bold text-[#2D6A4F] text-[32px] sm:text-[44px] leading-tight"
        >
          Thank You! 🎄
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-[#613E0F] font-semibold text-[16px] sm:text-[18px] max-w-sm"
        >
          Your feedback has been sent to Santa. We'll make next year even more
          magical!
        </motion.p>
        <motion.button
          onClick={() => navigate({ to: "/" })}
          className="mt-4 px-6 py-3 bg-[#2D6A4F] text-white rounded-full shadow-lg border-4 border-dotted border-white font-bold transition-all hover:scale-105 duration-200 ease-in-out cursor-pointer"
        >
          Go back to home
        </motion.button>
      </motion.div>
    </section>
  );
};
