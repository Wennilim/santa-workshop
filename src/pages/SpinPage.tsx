import { useQuery } from "@tanstack/react-query";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useState } from "react";
import { getUserList } from "../api/getUserList";
import { DECORATIONS } from "../components/spin/constants/spin";
import { InfoCard } from "../components/spin/InfoCard";
import { Roulette } from "../components/spin/Roulette";
import { getLoopAnimation } from "../components/spin/utils/spin";

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

const decoEnterVariants = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, delay, ease: "easeOut" },
  },
});

export const SpinPage = () => {
  const reduceMotion = useReducedMotion();
  const [isSpinning, setIsSpinning] = useState(false);
  const getUserQuery = useQuery({
    queryKey: ["users"],
    queryFn: getUserList,
  });

  const NAMES =
    getUserQuery.data?.map((user: { fullname: string }) => user.fullname) || [];
  return (
    <motion.section
      id="roulette-wheel"
      aria-label="Christmas Roulette"
      className="relative"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {DECORATIONS.map((deco, idx) => (
        <motion.img
          key={`${deco.src}-${idx}`}
          src={deco.src}
          alt={deco.alt}
          className={deco.className}
          style={deco.style}
          variants={decoEnterVariants(deco.delay ?? 0)}
          initial="hidden"
          animate="visible"
          whileInView={reduceMotion ? undefined : getLoopAnimation(deco.loop)}
          viewport={{ once: true }}
        />
      ))}

      <div className="flex flex-col items-center justify-center h-full">
        <motion.div className="mt-4" variants={fadeUpVariants}>
          <h1 className="md:text-[42px] text-[28px] font-semibold font-[dynapuff] text-center">
            Spin for your Match
          </h1>

          <motion.p
            className="md:text-[20px] text-[16px] text-[#2D6A4F] font-medium text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.45, ease: "easeOut" }}
          >
            Click the gingerbread cookie to start the drawing
          </motion.p>
        </motion.div>

        <motion.div
          className="sm:border-5 sm:border-dashed sm:border-[#83BAA9] w-full h-full mt-6 mb-12 xl:mt-12 rounded-[70px] sm:bg-[#FFFCF5] xl:max-w-[1200px]"
          variants={fadeUpVariants}
        >
          <Roulette {...{ isSpinning, setIsSpinning }} />
        </motion.div>

        <motion.div
          className="hidden sm:flex gap-6 mb-12 w-full justify-center items-center"
          variants={fadeUpVariants}
          transition={{ delay: 0.2 }}
        >
          <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
            <InfoCard
              title="Status"
              titleColor="#E63946"
              value={isSpinning ? "Spinning..." : "Ready to Spin"}
              bgColor="#FFD6D6"
            />
          </motion.div>

          <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
            <InfoCard
              title="Participants"
              titleColor="#92400E"
              value={`${NAMES.length} Elves`}
              bgColor="#FEFAE0"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
