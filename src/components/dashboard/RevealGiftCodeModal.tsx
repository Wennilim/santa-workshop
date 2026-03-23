import { AnimatePresence, type Variants } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { CloseIcon } from "../../assets/icons";

export const RevealGiftCodeModal = ({
  giftCode,
  nickname,
  isOpenRevealModal,
  setIsRevealModal,
}: {
  giftCode: string;
  nickname: string | undefined;
  isOpenRevealModal: boolean;
  setIsRevealModal: (isOpenRevealModal: boolean) => void;
}) => {
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
                Gift code is not available yet. Come back after 1 PM
                on Dec 24 🎄
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
