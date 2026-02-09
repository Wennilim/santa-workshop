import { motion, type Variants } from "framer-motion";
import { MyWishlistCard } from "../components/dashboard/MyWishlistCard";
import { RulesAgendaCard } from "../components/dashboard/RulesAgendaCard";
import { SantaAssignmentCard } from "../components/dashboard/SantaAssignmentCard";
import { SnowGlobeCard } from "../components/dashboard/SnowGlobeCard";

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 18 },
  },
};

const row: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
    },
  },
};

export const DashboardPage = () => {
  return (
    <motion.section
      id="dashboard"
      className="lg:p-4"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        id="greeting"
        className="relative flex flex-col"
        variants={fadeUp}
      >
        <h1 className="text-[36px] md:text-[48px] font-bold font-[dynapuff]">
          Ho ho ho, Wen Ni!{" "}
        </h1>
        <p className="text-[18px] md:text-[24px] text-[#2d6a4f] mb-4 md:mb-0">
          You're currently on the "Nice List". Let's get festive!
        </p>

        <motion.img
          src="/images/santa-hat.png"
          alt="santa hat"
          className="absolute top-1 -left-1 md:top-1.5 md:-left-1.5 size-4 md:size-6"
          initial={{ rotate: -12, scale: 0.6, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 14,
            delay: 0.2,
          }}
        />
      </motion.div>

      <div className="py-8">
        <motion.div
          className="flex flex-col lg:flex-row justify-between "
          variants={row}
        >
          <motion.div
            variants={fadeUp}
            className="w-full flex flex-col lg:flex-row gap-8"
          >
            <SantaAssignmentCard />
            <SnowGlobeCard />
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col lg:flex-row w-full gap-8 mt-8 xl:items-stretch"
          variants={row}
        >
          <motion.div
            variants={fadeUp}
            className="w-full h-auto flex flex-col lg:flex-row gap-8"
          >
            <MyWishlistCard />
            <RulesAgendaCard />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
