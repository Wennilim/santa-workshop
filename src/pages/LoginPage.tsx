import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { router } from "../router";
import { cn } from "../utils/cn";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { RememberMe } from "../components/login/RememberMe";
import { useGlobalStore } from "../stores/useGlobalStore";
import { postLogin } from "../api/postLogin";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../auth/auth-context-core";

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
  const { isClickLogin, setIsClickLogin } = useGlobalStore();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(
    () => sessionStorage.getItem("remember_me") === "true",
  );
  const [email, setEmail] = useState(() => {
    const sessionEmail = sessionStorage.getItem("login_email");
    if (sessionEmail) return sessionEmail;

    const isRemembered = sessionStorage.getItem("remember_me") === "true";
    if (isRemembered) {
      return sessionStorage.getItem("remembered_email") || "";
    }
    return "";
  });
  const [password, setPassword] = useState(() => {
    const sessionPassword = sessionStorage.getItem("login_password");
    if (sessionPassword) return sessionPassword;

    const isRemembered = sessionStorage.getItem("remember_me") === "true";
    if (isRemembered) {
      return sessionStorage.getItem("remembered_password") || "";
    }
    return "";
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const search = useSearch({ from: "/login" });

  const login = useMutation({
    mutationFn: () =>
      postLogin({
        email,
        password,
      }),
    onSuccess: async (data: {
      access_token: string;
      user: {
        id: string;
        fullName: string;
        gender: string;
        department: string;
      };
    }) => {
      sessionStorage.setItem("accessToken", data.access_token);

      // Save credentials if Remember Me is checked, otherwise clear them
      if (rememberMe) {
        sessionStorage.setItem("remembered_email", email);
        sessionStorage.setItem("remembered_password", password);
      } else {
        sessionStorage.removeItem("remembered_email");
        sessionStorage.removeItem("remembered_password");
      }

      // Always clear the temporary typing state upon successful login
      sessionStorage.removeItem("login_email");
      sessionStorage.removeItem("login_password");

      auth.login({ id: data.user.id, name: data.user.fullName });
      // auth.login()
      // 等待 router 刷新状态
      // navigate() -> Router 确认你已经登录
      //            -> 成功进入 Dashboard
      await router.invalidate();
      await navigate({ to: search.redirect || "/" });
    },
    onError: () => {
      setError("Invalid email or password. Please try again.");
      setPassword(""); // Clear password but keep email for convenience
    },
  });

  const handleRememberMeChange = (checked: boolean) => {
    setRememberMe(checked);
    sessionStorage.setItem("remember_me", checked.toString());
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // 第一次点击 Login → 只展开表单
    if (!isClickLogin) {
      setIsClickLogin(true);
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@atoz-software\.tech$/;
    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Email must be from atoz-software.tech domain");
      return;
    }

    // Validate password
    if (!password) {
      setError("Please enter your password");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    login.mutate();
  };

  const isFormValid = email.trim() !== "" && password.length >= 6;

  console.log(isClickLogin);

  return (
    <div className="bg-[url('/images/bg.png')] bg-contain bg-center min-h-screen w-full flex items-center justify-center relative sm:mx-auto overflow-hidden">
      <div className="relative z-0 w-full max-w-[470px]">
        <img
          src="/images/reindeer.png"
          alt="peeping reindeer"
          className={cn(
            "absolute -top-14 right-2 -z-10 size-[60px] sm:size-[90px] pointer-events-none",
            "transform-gpu will-change-transform",
            "transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            "translate-y-1 rotate-0 scale-95 hidden sm:block",
            isClickLogin && "-translate-y-6 rotate-12 scale-100",
          )}
        />

        <div className="bg-[url('/images/bg4.png')]  bg-cover bg-center  sm:bg-white sm:bg-none relative z-10 shadow-2xl sm:rounded-[32px] overflow-x-hidden w-full h-dvh sm:h-auto sm:min-h-[570px] flex flex-col items-center justify-center px-6 py-8 sm:p-12">
          <form
            onSubmit={handleLogin}
            className="flex flex-col items-center justify-center w-full"
          >
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
                    className="font-bold text-[24px] sm:text-[32px] my-4"
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
                    className="font-bold text-[28px] sm:text-[32px] mt-4 text-[#1b4a35]"
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
                    disabled={login.isPending}
                    value={email}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEmail(value);
                      sessionStorage.setItem("login_email", value);
                      setError("");
                    }}
                    className="w-full py-3 px-6 rounded-[32px] focus:outline-none focus:ring-2 focus:ring-[#ff6b6b] bg-[#fdf2f8] disabled:opacity-50"
                  />

                  <motion.div
                    variants={itemVariants}
                    className="relative w-full"
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      disabled={login.isPending}
                      value={password}
                      onChange={(e) => {
                        const value = e.target.value;
                        setPassword(value);
                        sessionStorage.setItem("login_password", value);
                        setError("");
                      }}
                      className="w-full py-3 px-6 rounded-[32px] focus:outline-none focus:ring-2 focus:ring-[#82b0fb] bg-[#e3f2fd] disabled:opacity-50"
                    />

                    <button
                      aria-label="Show password button"
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      <AnimatePresence mode="wait">
                        {showPassword ? (
                          <motion.img
                            aria-label="Open eye icon"
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
                            aria-label="Close eye icon"
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
                  <div className="flex items-center justify-between w-full">
                    <RememberMe
                      checked={rememberMe}
                      onChange={handleRememberMeChange}
                    />
                    <button
                      type="button"
                      className="text-[#92400E] font-bold text-[14px] cursor-pointer hover:underline"
                      onClick={() => {
                        navigate({ to: "/forgotPassword" });
                      }}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <AnimatePresence mode="wait">
                    {error && (
                      <motion.p
                        key="error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="text-red-500 text-sm text-center w-full"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              aria-label="Login button"
              variants={itemVariants}
              whileHover={{
                scale:
                  (isClickLogin && !isFormValid) || login.isPending ? 1 : 1.04,
              }}
              whileTap={{
                scale:
                  (isClickLogin && !isFormValid) || login.isPending ? 1 : 0.96,
              }}
              type="submit"
              disabled={(isClickLogin && !isFormValid) || login.isPending}
              className={cn(
                "flex justify-center disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer items-center gap-2 bg-[#F16266] text-white rounded-[32px] w-full py-4 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]",
                {
                  "my-4": !isClickLogin,
                  "my-8 sm:mt-12 sm:mb-4 ": isClickLogin,
                },
              )}
            >
              {login.isPending && (
                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              <p className="font-bold">
                {login.isPending ? "Logging in..." : "Login"}
              </p>
            </motion.button>
            {isClickLogin && (
              <p>
                <button
                  onClick={() => {
                    setIsClickLogin(false);
                    navigate({ to: "/register" });
                  }}
                  className="text-[#05370A] font-bold text-[14px] cursor-pointer hover:underline"
                >
                  Join us
                </button>{" "}
                for the Christmas party today!
              </p>
            )}
            {!isClickLogin && (
              <motion.button
                aria-label="Register button"
                variants={itemVariants}
                whileHover={{
                  scale:
                    (isClickLogin && !isFormValid) || login.isPending
                      ? 1
                      : 1.04,
                }}
                whileTap={{
                  scale:
                    (isClickLogin && !isFormValid) || login.isPending
                      ? 1
                      : 0.96,
                }}
                type="button"
                disabled={(isClickLogin && !isFormValid) || login.isPending}
                onClick={() => navigate({ to: "/register" })}
                className="flex justify-center disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer items-center mb-6 bg-[#5C7E6D] text-white rounded-[32px] w-full py-4 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
              >
                <p className="font-bold">Register</p>
              </motion.button>
            )}
          </form>
          <AnimatePresence>
            {!isClickLogin && (
              <motion.div
                key="features"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-center justify-center gap-2 sm:gap-4"
              >
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className={`flex flex-col p-3 sm:p-4 items-center justify-center gap-2 w-[100px] sm:w-[124px] h-[70px] sm:h-[80px] rounded-[17px] ${feature.bgColor}`}
                  >
                    <img src={feature.icon} alt={feature.title} />
                    <p className="font-semibold uppercase text-neutral-400 text-xs sm:text-sm">
                      {feature.title}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <p className="text-neutral-400 text-xs sm:text-[14px] block sm:hidden absolute bottom-3 sm:bottom-5 px-4 text-center">
            © 2026 Santa Workshop. All rights reserved.{" "}
          </p>
        </div>
      </div>
      <p className="text-neutral-400 text-xs sm:text-[14px] hidden sm:block absolute bottom-3 sm:bottom-5 px-4 text-center">
        © 2026 Santa Workshop. All rights reserved.{" "}
      </p>
    </div>
  );
};
