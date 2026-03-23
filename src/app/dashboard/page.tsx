"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { OPEN_INDUCTIONS } from "@/data/clubs";

export default function StudentDashboardPage() {
  const appliedClubs = OPEN_INDUCTIONS.slice(0, 2);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-hero text-3xl font-bold gradient-text"
      >
        Student Dashboard
      </motion.h1>
      <p className="mt-2 text-muted-foreground">
        Track applications, status, and recommendations.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl glass-card border border-white/10 p-6"
        >
          <h2 className="font-display text-lg font-semibold text-foreground">
            Applied Clubs
          </h2>
          <ul className="mt-4 space-y-3">
            {appliedClubs.map((club) => (
              <li
                key={club.id}
                className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3"
              >
                <span className="font-medium text-foreground">{club.name}</span>
                <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                  Applied
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/clubs"
            className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl glass-card border border-white/10 p-6"
        >
          <h2 className="font-display text-lg font-semibold text-foreground">
            Status Tracker
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Applied", "Shortlisted", "Interview", "Selected"].map((s, i) => (
              <span
                key={s}
                className={`rounded-lg px-3 py-1.5 text-sm ${i === 0
                    ? "bg-primary/20 text-primary"
                    : "bg-white/10 text-muted-foreground"
                  }`}
              >
                {s}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Your applications will move through these stages.
          </p>
        </motion.section>
      </div>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 rounded-2xl glass-card border border-white/10 p-6"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="font-display text-lg font-semibold text-foreground">
            AI Recommendations
          </h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Based on your profile, we recommend exploring Computer Engineering Society, AI Spark, and
          Robotics Club.
        </p>
        <Link
          href="/ai-advisor"
          className="mt-4 inline-flex items-center gap-2 text-primary hover:underline"
        >
          Get full recommendations <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.section>
    </div>
  );
}
