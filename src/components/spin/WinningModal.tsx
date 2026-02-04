import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon } from "../../assets/icons";
import { useNavigate } from "@tanstack/react-router";

export const WinningModal = ({
  isOpen,
  setIsOpen,
  winner,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  winner: string | null;
}) => {
  const navigate = useNavigate();
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white p-8 rounded-[50px] w-full max-w-[500px] flex flex-col items-center justify-center relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center self-end absolute top-8 right-8">
              <motion.button
                className="cursor-pointer hover:opacity-70 transition-opacity"
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setIsOpen(false);
                  // store in API later on
                  sessionStorage.setItem("winner", winner || "");
                  navigate({ to: "/recipient-wishlist" });
                }}
              >
                <CloseIcon className="size-6" />
              </motion.button>
            </div>
            <img
              src="/images/winning-santa.png"
              alt="Winning Santa"
              className="size-[280px] z-20 mb-4"
            />
            <div className="text-center">
              <p className="text-lg font-[dynapuff] font-semibold lg:text-[24px] leading-relaxed">
                You're &nbsp;
                <span className="font-bold text-[#2D6A4F] lg:text-[32px]">
                  {winner}
                </span>
                &nbsp; 's Secret Santa!
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
