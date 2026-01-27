import { useState } from "react";
import { cn } from "../utils/cn";
import { AnimatePresence, motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 20,
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 18,
    },
  },
};

const features = [
  {
    icon: "/icons/friendly.svg",
    bgColor: "bg-[#fbc7d4]/20",
    title: "friendly",
  },
  {
    icon: "/icons/secure.svg",
    bgColor: "bg-[#a7d7c5]/20",
    title: "secure",
  },
  {
    icon: "/icons/fun.svg",
    bgColor: "bg-[#ff6b6b]/20",
    title: "fun",
  },
];

export const LoginPage = () => {
  const [isClickLogin, setIsClickLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-[url('/images/bg.png')] bg-contain bg-center h-screen w-screen flex items-center justify-center relative">
      <div className="relative z-0">
        <img
          src="/images/reindeer.png"
          alt="peeping reindeer"
          className={cn(
            "absolute -top-14 right-2 -z-10 size-[90px] pointer-events-none",
            "transform-gpu will-change-transform",
            "transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            "translate-y-3 rotate-0 scale-95",
            isClickLogin && "-translate-y-6 rotate-12 scale-100",
          )}
        />

        <div className="bg-white relative z-10 shadow-2xl rounded-[32px] w-[470px] h-[570px] flex flex-col items-center justify-center p-12">
          <AnimatePresence mode="wait">
            {isClickLogin ? (
              <motion.img
                key="logo2"
                src="/icons/logo2.svg"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.05, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            ) : (
              <motion.img
                key="logo1"
                src="/icons/logo1.svg"
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {isClickLogin ? (
              <>
                <motion.h1
                  key="title1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="font-bold text-[32px] my-4"
                >
                  Welcome Back!
                </motion.h1>
              </>
            ) : (
              <>
                <motion.h1
                  key="title2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="font-bold text-[32px] mt-4"
                >
                  Santa Workshop
                </motion.h1>
                <motion.p
                  key="subtitle2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-neutral-500 text-[14px]"
                >
                  Read to share some holiday magic?
                </motion.p>
              </>
            )}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {isClickLogin && (
              <motion.div
                key="login-form"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col w-full items-center justify-center gap-4 mt-2"
              >
                <motion.input
                  variants={itemVariants}
                  type="text"
                  placeholder="Email"
                  className="w-full py-3 px-6 rounded-[32px] focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] bg-[#fdf2f8]"
                />

                <motion.div variants={itemVariants} className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full py-3 px-6 rounded-[32px] focus:outline-none focus:ring-2 focus:ring-[#82b0fb] bg-[#e3f2fd]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    <AnimatePresence mode="wait">
                      {showPassword ? (
                        <motion.img
                          key="open-eye"
                          src="/icons/open-eye.svg"
                          alt="open eye icon"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.15 }}
                          className="w-5 h-5"
                        />
                      ) : (
                        <motion.img
                          key="close-eye"
                          src="/icons/close-eye.svg"
                          alt="close eye icon"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.15 }}
                          className="w-5 h-5"
                        />
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setIsClickLogin(true)}
            className="flex justify-center cursor-pointer items-center gap-2 my-12 bg-[#ff3b3f] text-white rounded-[32px] w-full py-4 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
          >
            <img src="/icons/lightning.svg" alt="lightning icon" />
            <p className="font-bold">Login</p>
          </button>
          <AnimatePresence>
            {!isClickLogin && (
              <motion.div
                key="features"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-center justify-center gap-4"
              >
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className={`flex flex-col p-4 items-center justify-center gap-2 w-[124px] h-[80px] rounded-[17px] ${feature.bgColor}`}
                  >
                    <img src={feature.icon} alt={feature.title} />
                    <p className="font-semibold uppercase text-neutral-400">
                      {feature.title}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <p className="text-neutral-400 text-[14px] absolute bottom-5">
        © 2026 Santa Workshop. All rights reserved.{" "}
      </p>
    </div>
  );
};
