"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import type { Club } from "@/types";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  branch: z.string().min(1, "Branch required"),
  year: z.string().min(1, "Year required"),
  skills: z.string().min(1, "Skills required"),
  project: z.string().min(1, "At least one project preferred"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Valid 10-digit mobile required"),
  linkedin: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  temporaryAddress: z.string().min(5, "Address required"),
  course: z.string().min(1, "Course required"),
  whyJoin: z.string().min(20, "Please write at least 20 characters"),
});

type FormSchema = z.infer<typeof schema>;

const COURSES = ["B.Tech", "M.Tech", "BBA", "BCA", "MCA", "Other"];
const YEARS = ["1", "2", "3", "4", "5"];

interface RegistrationModalProps {
  club: Club | null;
  open: boolean;
  onClose: () => void;
}

export function RegistrationModal({ club, open, onClose }: RegistrationModalProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      branch: "",
      year: "",
      skills: "",
      project: "",
      mobile: "",
      linkedin: "",
      github: "",
      temporaryAddress: "",
      course: "",
      whyJoin: "",
    },
  });

  const close = useCallback(() => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      reset();
    }, 300);
  }, [onClose, reset]);

  const onSubmit = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 800)); // simulate submit
    setSubmitted(true);
  }, []);

  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={close}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl glass-card border-white/20 p-6 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Register for {club?.name ?? "Club"}
            </h2>
            <button
              type="button"
              onClick={close}
              className="rounded-lg p-2 text-muted-foreground transition hover:bg-white/10 hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="mt-6 space-y-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                      Full Name *
                    </label>
                    <input
                      {...register("name")}
                      className={cn(
                        "w-full rounded-lg border bg-white/5 px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                        errors.name && "border-red-500"
                      )}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                      Branch *
                    </label>
                    <input
                      {...register("branch")}
                      className={cn(
                        "w-full rounded-lg border bg-white/5 px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                        errors.branch && "border-red-500"
                      )}
                      placeholder="e.g. CSE, ECE"
                    />
                    {errors.branch && (
                      <p className="mt-1 text-xs text-red-400">{errors.branch.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                      Year *
                    </label>
                    <select
                      {...register("year")}
                      className={cn(
                        "w-full rounded-lg border bg-white/5 px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                        errors.year && "border-red-500"
                      )}
                    >
                      <option value="">Select</option>
                      {YEARS.map((y) => (
                        <option key={y} value={y}>
                          Year {y}
                        </option>
                      ))}
                    </select>
                    {errors.year && (
                      <p className="mt-1 text-xs text-red-400">{errors.year.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                      Course *
                    </label>
                    <select
                      {...register("course")}
                      className={cn(
                        "w-full rounded-lg border bg-white/5 px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                        errors.course && "border-red-500"
                      )}
                    >
                      <option value="">Select</option>
                      {COURSES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    {errors.course && (
                      <p className="mt-1 text-xs text-red-400">{errors.course.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    Skills *
                  </label>
                  <input
                    {...register("skills")}
                    className={cn(
                      "w-full rounded-lg border bg-white/5 px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                      errors.skills && "border-red-500"
                    )}
                    placeholder="e.g. Python, React, Communication"
                  />
                  {errors.skills && (
                    <p className="mt-1 text-xs text-red-400">{errors.skills.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    Project(s) *
                  </label>
                  <textarea
                    {...register("project")}
                    rows={2}
                    className={cn(
                      "w-full rounded-lg border bg-white/5 px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                      errors.project && "border-red-500"
                    )}
                    placeholder="Describe your projects"
                  />
                  {errors.project && (
                    <p className="mt-1 text-xs text-red-400">{errors.project.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    Mobile No. *
                  </label>
                  <input
                    {...register("mobile")}
                    type="tel"
                    maxLength={10}
                    className={cn(
                      "w-full rounded-lg border bg-white/5 px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                      errors.mobile && "border-red-500"
                    )}
                    placeholder="10-digit number"
                  />
                  {errors.mobile && (
                    <p className="mt-1 text-xs text-red-400">{errors.mobile.message}</p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                      LinkedIn
                    </label>
                    <input
                      {...register("linkedin")}
                      type="url"
                      className={cn(
                        "w-full rounded-lg border bg-white/5 px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                        errors.linkedin && "border-red-500"
                      )}
                      placeholder="https://linkedin.com/in/..."
                    />
                    {errors.linkedin && (
                      <p className="mt-1 text-xs text-red-400">{errors.linkedin.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                      GitHub
                    </label>
                    <input
                      {...register("github")}
                      type="url"
                      className={cn(
                        "w-full rounded-lg border bg-white/5 px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                        errors.github && "border-red-500"
                      )}
                      placeholder="https://github.com/..."
                    />
                    {errors.github && (
                      <p className="mt-1 text-xs text-red-400">{errors.github.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    Temporary Address *
                  </label>
                  <textarea
                    {...register("temporaryAddress")}
                    rows={2}
                    className={cn(
                      "w-full rounded-lg border bg-white/5 px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                      errors.temporaryAddress && "border-red-500"
                    )}
                    placeholder="Current address"
                  />
                  {errors.temporaryAddress && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.temporaryAddress.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    Why do you want to join us? *
                  </label>
                  <textarea
                    {...register("whyJoin")}
                    rows={3}
                    className={cn(
                      "w-full rounded-lg border bg-white/5 px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
                      errors.whyJoin && "border-red-500"
                    )}
                    placeholder="At least 20 characters"
                  />
                  {errors.whyJoin && (
                    <p className="mt-1 text-xs text-red-400">{errors.whyJoin.message}</p>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={close}
                    className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium transition hover:bg-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 rounded-xl border border-glow-teal/30 bg-glow-teal/10 p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-glow-teal/20 text-glow-teal">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      You are successfully registered
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      We&apos;ll notify you about next steps.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="mt-4 w-full rounded-lg bg-primary py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
                >
                  Close
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
