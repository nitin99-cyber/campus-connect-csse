"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Calendar } from "lucide-react";
import type { Club } from "@/types";
import { HeatMeter } from "@/components/ui/heat-meter";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { cn } from "@/lib/utils";

// Dummy AI match for prototype
const DUMMY_AI_MATCH = 78;

interface ClubCardProps {
  club: Club;
  index?: number;
  onRegister?: (club: Club) => void;
}

export function ClubCard({ club, index = 0, onRegister }: ClubCardProps) {
  const isOpen = club.status === "open";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "glass-card group relative overflow-hidden p-6",
        "border-white/10 transition-all duration-300 hover:border-primary/30 hover:shadow-glow"
      )}
    >
      {club.status === "upcoming" && (
        <div className="absolute right-4 top-4 rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent">
          Coming Soon
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 text-2xl font-bold text-primary">
            {club.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              {club.name}
            </h3>
            <p className="text-sm text-muted-foreground">{club.tagline}</p>
            {club.domain && (
              <p className="mt-1 text-xs text-primary">{club.domain}</p>
            )}
          </div>
        </div>

        {isOpen && club.deadline && club.seats != null && club.applicationsCount != null && (
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <CountdownTimer deadline={club.deadline} compact />
            <HeatMeter
              applications={club.applicationsCount ?? 0}
              seats={club.seats ?? 0}
              size="sm"
            />
            <div className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                AI Match {DUMMY_AI_MATCH}%
              </span>
            </div>
          </div>
        )}

        {club.status === "upcoming" && club.expectedStartDate && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Expected: {new Date(club.expectedStartDate).toLocaleDateString()}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {isOpen ? (
          <>
            <Link
              href={`/clubs/${club.id}`}
              className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium transition hover:bg-white/10"
            >
              View Details
            </Link>
            <button
              type="button"
              onClick={() => onRegister?.(club)}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 hover:shadow-glow"
            >
              Register
            </button>
          </>
        ) : (
          <button
            type="button"
            className="rounded-lg border border-accent/50 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent transition hover:bg-accent/20"
          >
            Notify Me
          </button>
        )}
      </div>
    </motion.article>
  );
}
