"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { TimelinePhase } from "@/types";
import { cn } from "@/lib/utils";

interface InductionTimelineProps {
  phases: TimelinePhase[];
  className?: string;
}

export function InductionTimeline({ phases, className }: InductionTimelineProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-white/10" />
      {phases.map((phase, i) => (
        <motion.div
          key={i}
          className="relative flex gap-4 pb-6 last:pb-0"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div
            className={cn(
              "relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2",
              phase.completed
                ? "border-glow-teal bg-glow-teal/20 text-glow-teal"
                : "border-white/30 bg-background text-muted-foreground"
            )}
          >
            {phase.completed ? <Check className="h-3 w-3" /> : <span className="text-xs">{i + 1}</span>}
          </div>
          <div>
            <p className="font-medium text-foreground">{phase.label}</p>
            {phase.date && (
              <p className="text-xs text-muted-foreground">{phase.date}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
