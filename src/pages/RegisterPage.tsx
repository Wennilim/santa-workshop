import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

export const RegisterPage = () => {
  const { setIsClickLogin } = useGlobalStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
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
    setIsLoading(true);
    console.log("Form data:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Handle success...
  };

  return (
    <div className="bg-[url('/images/bg.png')] bg-contain bg-center min-h-screen w-full flex items-center justify-center relative sm:mx-auto overflow-hidden">
      <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-[32px] p-8 sm:p-12 max-w-[470px] w-full flex flex-col items-center gap-6">
        <h1 className="font-bold text-[32px] text-[#1b4a35]">
          Join the Magic!
        </h1>
        <p className="text-neutral-500 text-center -mt-4">
          Create your account for the Christmas party!
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          {["fullName", "email", "password"].map((field) => (
            <div className="flex flex-col gap-1">
              <input
                {...register(field as keyof RegisterFormValues)}
                type={field}
                placeholder={formatLabel(field)}
                className="w-full py-3 px-6 rounded-[32px] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] bg-[#E8F5E9]"
              />
              {errors[field as keyof RegisterFormValues] && (
                <span className="text-red-500 text-xs px-4">
                  {errors[field as keyof RegisterFormValues]?.message}
                </span>
              )}
            </div>
          ))}

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

          <button
            type="submit"
            disabled={isLoading || Object.keys(errors).length > 0}
            className="bg-[#F16266] cursor-pointer text-white rounded-[32px] w-full py-4 font-bold shadow-lg hover:scale-105 disabled:hover:scale-100 transition-transform disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? "Joining..." : "Register"}
          </button>
        </form>

        <p className="text-sm">
          Already have an account?{" "}
          <button
            onClick={() => {
              navigate({ to: "/login" });
              setIsClickLogin(true);
            }}
            className="text-[#1b4a35] font-bold hover:underline cursor-pointer"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};
