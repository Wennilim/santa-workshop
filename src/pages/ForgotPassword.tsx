import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PinInput } from "../components/forgot-password/PinInput";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { postForgotPassword } from "../api/postForgotPassword";
import {
  postResetPassword,
  type TResetPasswordRequestBody,
} from "../api/postResetPassword";
import { postVerifyOTP } from "../api/postVerifyOTP";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [pin, setPin] = useState("");
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isShowPassword, setIsShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (body: { email: string }) => postForgotPassword(body),
    onSuccess: () => {
      setErrorMsg("");
      setStep(2);
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      setErrorMsg(error.response?.data?.message || "Invalid email address");
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (body: TResetPasswordRequestBody) => postResetPassword(body),
    onSuccess: () => setStep(4),
    onError: (error: { response?: { data?: { message?: string } } }) => {
      setErrorMsg(error.response?.data?.message || "Failed to reset password");
    },
  });

  const verifyOTPMutation = useMutation({
    mutationFn: (body: { email: string; otp: string }) => postVerifyOTP(body),
    onSuccess: () => {
      setErrorMsg("");
      setStep(3);
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      setErrorMsg(error.response?.data?.message || "Invalid verification code");
    },
  });

  const handleSendOTP = () => {
    if (step === 1) {
      forgotPasswordMutation.mutate({ email });
    } else if (step === 2) {
      verifyOTPMutation.mutate({ email, otp: pin });
    } else if (step === 3) {
      resetPasswordMutation.mutate({
        email,
        otp: pin,
        newPassword: newPassword.password,
        confirmNewPassword: newPassword.confirmPassword,
      });
    }
  };

  return (
    <div className="bg-[url('/images/bg.png')] bg-contain bg-center min-h-screen w-full flex items-center justify-center relative sm:mx-auto overflow-hidden">
      <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-[32px] p-8 sm:p-12 max-w-[470px] w-full flex flex-col items-center gap-6">
        <AnimatePresence mode="wait">
          <motion.img
            key="logo1"
            src={
              step === 4
                ? "/images/reset-password-successfully.png"
                : "/images/forgot-password.png"
            }
            className="size-[100px]"
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </AnimatePresence>
        <motion.h1
          key="title2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="font-bold text-center text-[28px] sm:text-[32px] text-[#1b4a35]"
        >
          {step === 4 ? "Password Reset Successfully!" : "Forgot Password"}
        </motion.h1>
        <motion.p
          key="description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="font-medium text-[16px] text-center text-[#724A14]"
        >
          {step === 1 &&
            "Please enter your registered email address, we will send you an OTP via this email address."}
          {step === 2 &&
            "Check your mailbox and get the 6 digits verification code."}
          {step === 3 && "Please reset your new password."}
        </motion.p>

        {step === 1 && (
          <input
            id="email"
            aria-label="Recovery Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full py-3 px-6 rounded-[32px] focus:outline-none focus:ring-2 focus:ring-[#FDF2F8] bg-[#FDF2F8]"
          />
        )}
        {step === 2 && <PinInput onChange={setPin} />}
        {step === 3 && (
          <div className="flex flex-col gap-4 w-full mt-2">
            <motion.div className="w-full relative">
              <input
                aria-label="New Password"
                placeholder="New Password"
                value={newPassword.password}
                type={isShowPassword.password ? "text" : "password"}
                className="w-full py-3 px-6 rounded-[32px] focus:outline-none focus:ring-2 focus:ring-[#E3F2FD] bg-[#E3F2FD]"
                onChange={(e) =>
                  setNewPassword((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
              <button
                aria-label="Show password button"
                type="button"
                onClick={() =>
                  setIsShowPassword((v) => ({
                    ...v,
                    password: !v.password,
                  }))
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <AnimatePresence mode="wait">
                  {isShowPassword.password ? (
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
            <motion.div className="w-full relative">
              <input
                aria-label="Confirm New Password"
                placeholder="Confirm Password"
                value={newPassword.confirmPassword}
                type={isShowPassword.confirmPassword ? "text" : "password"}
                className="w-full py-3 px-6 rounded-[32px] focus:outline-none focus:ring-2 focus:ring-[#E3F2FD] bg-[#E3F2FD]"
                onChange={(e) =>
                  setNewPassword((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
              />
              <button
                aria-label="Show password button"
                type="button"
                onClick={() =>
                  setIsShowPassword((v) => ({
                    ...v,
                    confirmPassword: !v.confirmPassword,
                  }))
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <AnimatePresence mode="wait">
                  {isShowPassword.confirmPassword ? (
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
          </div>
        )}
        <div className="flex justify-start w-full h-5">
          {errorMsg && (
            <span className="text-red-500 text-sm font-medium">{errorMsg}</span>
          )}
        </div>
        {step === 4 ? (
          <button
            onClick={() => navigate({ to: "/login" })}
            className="bg-[#F16266] font-bold text-[18px] px-4 py-3 w-full text-white rounded-full cursor-pointer shadow disabled:cursor-not-allowed disabled:bg-[#F16266]/50"
          >
            Back to Login Page
          </button>
        ) : (
          <div className="flex w-full items-center justify-center gap-2 mt-2">
            <button
              onClick={() => {
                if (step === 2) {
                  setErrorMsg("");
                  return setStep(1);
                }
                if (step === 3) {
                  setErrorMsg("");
                  return setStep(2);
                }
                return window.history.back();
              }}
              className="bg-[#0D7618]/22 text-black/65 font-bold text-[18px] px-5 py-3 rounded-l-full cursor-pointer shadow"
            >
              Back
            </button>
            <button
              onClick={handleSendOTP}
              disabled={
                (step === 1 && email === "") ||
                (step === 2 && (pin.length !== 6 || verifyOTPMutation.isPending)) ||
                (step === 3 &&
                  (newPassword.password === "" ||
                    newPassword.confirmPassword === "" ||
                    resetPasswordMutation.isPending))
              }
              className="bg-[#F16266] font-bold text-[18px] px-4 py-3 w-full text-white rounded-r-full cursor-pointer shadow disabled:cursor-not-allowed disabled:bg-[#F16266]/50"
            >
              {step === 1 && (forgotPasswordMutation.isPending ? "Sending..." : "Send OTP")}
              {step === 2 && (verifyOTPMutation.isPending ? "Verifying..." : "Verify Code")}
              {step === 3 && (resetPasswordMutation.isPending ? "Resetting..." : "Reset Password")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
