"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiEye, HiEyeOff } from "react-icons/hi";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const router = useRouter();

  
  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setApiError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

    
      if (!res.ok) {
        const errorData = await res.json();
        // console.log("Error",errorData)
        throw new Error(errorData.error || "Login failed");
      }
      // console.log(res.)
// localStorage.setItem('token',res.b)
      router.push("/dashboard");
    } catch (error: any) {
      console.log(error)
      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-black text-center">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-black">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className="mt-1 block w-full h-14 px-4 border border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium text-black">
            Password
          </label>
          <input
            {...register("password")}
            type={passwordVisible ? "text" : "password"} // Toggle password visibility
            id="password"
            className="mt-1 block w-full h-14 px-4 border border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
          />
          {/* Password visibility toggle icon */}
          <div
            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setPasswordVisible((prev) => !prev)} // Toggle the state on click
          >
            {passwordVisible ? <HiEyeOff className="text-gray-600 h-fit pt-6" /> : <HiEye className="text-gray-600 h-fit pt-6" />}
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* API Error */}
        {apiError && (
          <p className="text-red-500 text-center text-sm">{apiError}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
