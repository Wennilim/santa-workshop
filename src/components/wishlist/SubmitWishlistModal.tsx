import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon } from "../../assets/icons";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const SubmitWishlistModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const navigate = useNavigate();
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <AnimatePresence
      onExitComplete={() => {
        if (shouldNavigate) {
          navigate({ to: "/" });
          window.scrollTo({ top: 0, behavior: "instant" });
          setShouldNavigate(false);
        }
      }}
    >
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
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <CloseIcon className="size-6" />
              </motion.button>
            </div>
            <img
              src="/images/santa-letter.png"
              alt="Winning Santa"
              className="size-[100px] z-20 my-4"
            />
            <p className="text-lg font-[dynapuff] px-4 font-semibold lg:text-[24px] text-center leading-relaxed">
              Ready submit for your wish list to secret santa?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsSubmitting(true);
                setIsOpen(false);
                setShouldNavigate(true);
                sessionStorage.setItem("isLockWishlistSubmission", "true");
              }}
              disabled={isSubmitting}
              className="mt-6 px-8 py-3 disabled:opacity-60 disabled:cursor-not-allowed bg-[#468CFF] text-white rounded-full font-bold font-[dynapuff] text-lg hover:bg-[#468CFF] cursor-pointer transition-colors shadow-lg"
            >
              Submit
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
