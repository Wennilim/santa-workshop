import { motion, type Variants } from "framer-motion";
import { MyWishlistCard } from "../components/dashboard/MyWishlistCard";
import { RulesAgendaCard } from "../components/dashboard/RulesAgendaCard";
import { SantaAssignmentCard } from "../components/dashboard/SantaAssignmentCard";
import { SnowGlobeCard } from "../components/dashboard/SnowGlobeCard";
import { AUTH_STORAGE_KEY } from "../auth/auth-context";
import { useState } from "react";
import { RevealGiftCodeModal } from "../components/dashboard/RevealGiftCodeModal";
import { getMyGiftCode } from "../api/getMyGiftCode";
import { useQuery } from "@tanstack/react-query";

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
  const [isOpenRevealModal, setIsRevealModal] = useState(false);
  const name = JSON.parse(
    sessionStorage.getItem(AUTH_STORAGE_KEY) || "{}",
  ).name;
  const getMyGiftCodeQuery = useQuery({
    queryKey: ["giftCode"],
    queryFn: getMyGiftCode,
    enabled: isOpenRevealModal,
  });
  const nickname = getMyGiftCodeQuery.data?.nickname;
  const giftCode = getMyGiftCodeQuery.data?.giftCode;

  return (
    <>
      {isOpenRevealModal && (
        <RevealGiftCodeModal
          {...{
            giftCode,
            nickname,
            isOpenRevealModal,
            setIsRevealModal,
          }}
        />
      )}
      <motion.section
        id="dashboard"
        className="lg:p-4"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <motion.div
            id="greeting"
            className="relative flex flex-col"
            variants={fadeUp}
          >
            <h1 className="text-[36px] md:text-[48px] font-bold font-[dynapuff]">
              Ho ho ho, {name} !{" "}
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
          <motion.button
            onClick={() => setIsRevealModal(true)}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="h-fit shadow-xl flex self-center my-4 md:self-start lg:self-center lg:my-0 w-fit px-4 py-2 rounded-full text-white font-bold bg-[#E63946] border-dotted border-4 cursor-pointer border-white"
          >
            Reveal my Gift Code
          </motion.button>
        </div>

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
    </>
  );
};
