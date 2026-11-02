import { AnimatePresence, type Variants } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { CloseIcon } from "../../assets/icons";
import { getRulesAgenda } from "../../api/getRulesAgenda";

export const RevealGiftCodeModal = ({
  giftCode,
  nickname,
  isOpenRevealModal,
  setIsRevealModal,
  eventDate: eventDateProp,
}: {
  giftCode: string;
  nickname: string | undefined;
  isOpenRevealModal: boolean;
  setIsRevealModal: (isOpenRevealModal: boolean) => void;
  eventDate?: string;
}) => {
  const getRulesAgendaQuery = useQuery({
    queryKey: ["rules-agenda"],
    queryFn: getRulesAgenda,
    enabled: !eventDateProp,
  });

  const eventDate = eventDateProp ?? getRulesAgendaQuery.data?.date_event;

  const formattedDate = (() => {
    if (!eventDate) return "Dec 24";
    const parsed = new Date(
      eventDate.includes("T") ? eventDate : eventDate.replace(/-/g, "/"),
    );
    return isNaN(parsed.getTime())
      ? "Dec 24"
      : parsed.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
  })();
  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    exit: { opacity: 0, scale: 0.92 },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 220,
        damping: 18,
      },
    },
    exit: { opacity: 0, y: 12 },
  };

  useEffect(() => {
    if (!isOpenRevealModal) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsRevealModal(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpenRevealModal, setIsRevealModal]);

  return (
    <AnimatePresence mode="wait">
      {isOpenRevealModal && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsRevealModal(false)}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white p-8 rounded-[50px] w-full max-w-[500px] flex flex-col items-center justify-center relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <motion.button
              variants={itemVariants}
              className="absolute top-8 right-8 cursor-pointer transition-opacity hover:opacity-70"
              whileHover={{ scale: 1.08, rotate: 90 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setIsRevealModal(false)}
            >
              <CloseIcon className="size-6" />
            </motion.button>

            {/* Snowman */}
            <motion.img
              variants={itemVariants}
              src="/images/discount-ticket.png"
              alt="Winning Santa"
              className="size-[150px] z-20 mb-4"
              draggable={false}
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {nickname !== undefined ? (
              <motion.p
                variants={itemVariants}
                className="text-lg font-[dynapuff] px-4 font-semibold lg:text-[24px] text-center leading-relaxed"
              >
                Secret Nickname:{" "}
                <span className="text-[#468CFF]">
                  {nickname?.toUpperCase()}
                </span>{" "}
                <br /> Gift code:{" "}
                <span className="text-[#468CFF]">{giftCode}</span>
              </motion.p>
            ) : (
              <motion.p
                variants={itemVariants}
                className="text-lg font-[dynapuff] px-4 font-semibold lg:text-[20px] text-center leading-relaxed"
              >
                Gift code is not available yet. Come back after 1 PM on{" "}
                {formattedDate} 🎄
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
