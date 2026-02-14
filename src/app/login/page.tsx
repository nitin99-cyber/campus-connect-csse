"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LogIn, Mail, Lock, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_PASSWORD = "student123";

const schema = z.object({
  rollNumber: z
    .string()
    .length(10, "Roll number must be exactly 10 digits")
    .regex(/^\d{10}$/, "Only numbers allowed"),
  password: z.string().min(1, "Password required"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [googleError, setGoogleError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { rollNumber: "", password: "" },
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    const valid = data.password === DEFAULT_PASSWORD && /^\d{10}$/.test(data.rollNumber);
    await new Promise((r) => setTimeout(r, 600));
    if (valid) {
      router.push("/dashboard");
      return;
    }
    setError("Invalid roll number or password. Default password is student123.");
  };

  const handleGoogleSignIn = () => {
    setGoogleError(null);
    // In production: Firebase signInWithPopup with domain restriction @mmmut.ac.in
    // For prototype we show message
    setGoogleError("Use your @mmmut.ac.in email only. (Prototype: configure Firebase.)");
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="glass-card border-white/10 p-8">
          <div className="mb-8 text-center">
            <h1 className="font-hero text-2xl font-bold gradient-text">
              Student Login
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in with roll number & password or Google (@mmmut.ac.in)
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">
                Roll Number (10 digits)
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  {...register("rollNumber")}
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="e.g. 1234567890"
                  className={cn(
                    "w-full rounded-lg border bg-white/5 py-2.5 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                    errors.rollNumber && "border-red-500"
                  )}
                />
              </div>
              {errors.rollNumber && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.rollNumber.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Default: student123"
                  className={cn(
                    "w-full rounded-lg border bg-white/5 py-2.5 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                    errors.password && "border-red-500"
                  )}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.password.message}
                </p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">
                Default password: student123
              </p>
            </div>

            {error && (
              <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
            >
              <LogIn className="h-5 w-5" />
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 py-3 font-medium text-foreground transition hover:bg-white/10"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google (@mmmut.ac.in)
          </button>
          {googleError && (
            <p className="mt-3 text-center text-xs text-amber-400">
              {googleError}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
