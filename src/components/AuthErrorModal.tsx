import { motion, AnimatePresence } from "framer-motion";
import { useGlobalStore } from "../stores/useGlobalStore";
import { useAuth } from "../auth/auth-context-core";
import { useNavigate } from "@tanstack/react-router";
import { LockIcon } from "../assets/icons";

export const AuthErrorModal = () => {
  const { isAuthError, setIsAuthError } = useGlobalStore();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    setIsAuthError(false);
    logout();
    navigate({ to: "/login" });
  };

  return (
    <AnimatePresence>
      {isAuthError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-999 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white p-8 rounded-[40px] w-full max-w-[440px] flex flex-col items-center text-center shadow-2xl border-4 border-[#FFD6D6]"
          >
            <div className="bg-[#FFD6D6] p-5 rounded-full mb-6">
              <LockIcon className="size-10 text-[#E63946]" />
            </div>
            
            <h2 className="text-2xl font-bold font-[dynapuff] text-[#613E0F] mb-3">
              Session Expired
            </h2>
            
            <p className="text-[#613E0F]/70 font-medium mb-8 leading-relaxed">
              Ho ho ho! Your magical session has expired. <br />
              Please log in again to continue your Secret Santa journey.
            </p>

            <button
              onClick={handleBackToLogin}
              className="w-full bg-[#2D6A4F] text-white cursor-pointer rounded-full py-4 px-8 font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Back to Login
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
