import { AnimatePresence, motion, type Variants } from "framer-motion";
import { CloseIcon } from "../../assets/icons";
import { useAuth } from "../../auth/auth-context-core";
import { useNavigate } from "@tanstack/react-router";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.96, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 420,
      damping: 32,
      mass: 0.9,
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    y: 18,
    scale: 0.96,
    filter: "blur(6px)",
    transition: { duration: 0.18, ease: "easeInOut" },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 520, damping: 30 },
  },
  exit: { opacity: 0, y: 8, transition: { duration: 0.12 } },
};

export const LogoutModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
            >
              <CloseIcon className="size-6" />
            </motion.button>

            {/* Snowman */}
            <motion.img
              variants={itemVariants}
              src="/images/snowman.png"
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

            {/* Text */}
            <motion.p
              variants={itemVariants}
              className="text-lg font-[dynapuff] px-4 font-semibold lg:text-[24px] text-center leading-relaxed"
            >
              Are you sure want to log out now?
            </motion.p>

            {/* CTA */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                logout();
                setIsOpen(false);
                sessionStorage.removeItem("isLogin");
                navigate({ to: "/login" });
              }}
              className="mt-6 px-8 py-3 disabled:opacity-60 disabled:cursor-not-allowed bg-[#468CFF] text-white rounded-full font-medium font-[dynapuff] text-lg cursor-pointer transition-colors shadow-lg"
            >
              Logout
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
