import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import * as z from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";

import { useGlobalStore } from "../stores/useGlobalStore";
import { DEPARTMENTS, GENDERS } from "../constants/register";
import { formatLabel } from "../utils/casing";

// =============================
// Validation Schema
// =============================

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z
    .string()
    .email("Invalid email address")
    .endsWith(
      "@atoz-software.tech",
      "Email must be from atoz-software.tech domain",
    ),
  password: z.string().min(6, "Password must be at least 6 characters"),
  department: z.string().min(1, "Please select a department"),
  gender: z.string().min(1, "Please select a gender"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

// =============================
// Input Field Config
// =============================

const INPUT_FIELDS: {
  name: keyof RegisterFormValues;
  type: string;
}[] = [
  { name: "fullName", type: "text" },
  { name: "email", type: "email" },
  { name: "password", type: "password" },
];

// =============================
// Success Screen
// =============================

interface SuccessScreenProps {
  email?: string;
  onGoLogin: () => void;
}

const SuccessScreen = ({ email, onGoLogin }: SuccessScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center text-center gap-4"
    >
      <div className="text-5xl">📧</div>


      {email && (
        <p className="text-neutral-700 font-medium">
          Activation link sent to:
          <br />
          <span className="text-[#1b4a35]">{email}</span>
        </p>
      )}

      <p className="text-neutral-500 text-sm max-w-[320px]">
        Please check your mailbox and click the{" "}
        <span className="font-semibold">Activate Account</span> button before
        logging in.
      </p>

      <button
        onClick={onGoLogin}
        className="bg-[#1b4a35] cursor-pointer mt-2 text-white rounded-[32px] px-6 py-3 font-bold hover:scale-105 transition-transform"
      >
        Go to Login
      </button>
    </motion.div>
  );
};

// =============================
// Register Page
// =============================

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { setIsClickLogin } = useGlobalStore();

  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [registeredEmail, setRegisteredEmail] = useState<string>();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      department: "",
      gender: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    console.log("Form data:", data);

    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setRegisteredEmail(data.email);
    setStatus("success");
  };

  const goToLogin = () => {
    navigate({ to: "/login" });
    setIsClickLogin(true);
  };

  return (
    <div className="bg-[url('/images/bg.png')] bg-contain bg-center min-h-screen w-full flex items-center justify-center relative sm:mx-auto overflow-hidden">
      <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-[32px] p-8 sm:p-12 max-w-[470px] w-full flex flex-col items-center gap-6">
        <h1 className="font-bold text-[32px] text-[#1b4a35]">
          {status === "success"
            ? "Check your Email !"
            : "Join the Magic!"}
        </h1>

        <p className="text-neutral-500 text-center -mt-4">
           {status === "success" ? 'Your account has been created successfully.':'Create your account for the Christmas party!'}
        </p>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <SuccessScreen email={registeredEmail} onGoLogin={goToLogin} />
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-4"
            >
              {/* Text Inputs */}
              {INPUT_FIELDS.map((field) => (
                <div key={field.name} className="flex flex-col gap-1">
                  <input
                    {...register(field.name)}
                    type={field.type}
                    placeholder={formatLabel(field.name)}
                    className="w-full py-3 px-6 rounded-[32px] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] bg-[#E8F5E9]"
                  />

                  {errors[field.name] && (
                    <span className="text-red-500 text-xs px-4">
                      {errors[field.name]?.message}
                    </span>
                  )}
                </div>
              ))}

              {/* Department */}
              <div className="flex flex-col gap-1">
                <Controller
                  name="department"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>

                      <SelectContent>
                        {DEPARTMENTS.map((department) => (
                          <SelectItem
                            key={department.value}
                            value={department.value}
                          >
                            {department.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                {errors.department && (
                  <span className="text-red-500 text-xs px-4">
                    {errors.department.message}
                  </span>
                )}
              </div>

              {/* Gender */}
              <div className="flex flex-col gap-1">
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>

                      <SelectContent>
                        {GENDERS.map((gender) => (
                          <SelectItem key={gender.value} value={gender.value}>
                            {gender.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                {errors.gender && (
                  <span className="text-red-500 text-xs px-4">
                    {errors.gender.message}
                  </span>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#F16266] cursor-pointer text-white rounded-[32px] w-full py-4 font-bold shadow-lg hover:scale-105 disabled:hover:scale-100 transition-transform disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isSubmitting ? "Joining..." : "Register"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Login link */}
        {status !== "success" && (
          <p className="text-sm">
            Already have an account?{" "}
            <button
              onClick={goToLogin}
              className="text-[#1b4a35] font-bold hover:underline cursor-pointer"
            >
              Login here
            </button>
          </p>
        )}
      </div>
    </div>
  );
};
