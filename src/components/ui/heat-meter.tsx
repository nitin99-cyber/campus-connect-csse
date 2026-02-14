"use client";

import { motion } from "framer-motion";
import { getHeatLevel, getHeatPercentage, getHeatLabel } from "@/lib/heat-meter";
import type { HeatLevel } from "@/types";
import { cn } from "@/lib/utils";

interface HeatMeterProps {
  applications: number;
  seats: number;
  size?: "sm" | "md";
  className?: string;
}

const levelColors: Record<HeatLevel, { stroke: string; glow: string }> = {
  low: { stroke: "#06d6a0", glow: "rgba(6, 214, 160, 0.4)" },
  medium: { stroke: "#f59e0b", glow: "rgba(245, 158, 11, 0.4)" },
  high: { stroke: "#ef4444", glow: "rgba(239, 68, 68, 0.5)" },
};

export function HeatMeter({ applications, seats, size = "md", className }: HeatMeterProps) {
  const level = getHeatLevel(applications, seats);
  const pct = getHeatPercentage(applications, seats);
  const colors = levelColors[level];
  const isHigh = level === "high";

  const dimension = size === "sm" ? 56 : 80;
  const strokeWidth = size === "sm" ? 4 : 6;
  const r = (dimension - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <motion.div
        className="relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <svg width={dimension} height={dimension} className="-rotate-90">
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-white/10"
          />
          <motion.circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={r}
            fill="none"
            stroke={colors.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              filter: isHigh ? `drop-shadow(0 0 6px ${colors.glow})` : undefined,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={cn(
              "font-display font-bold",
              size === "sm" ? "text-xs" : "text-sm"
            )}
            style={{ color: colors.stroke }}
          >
            {pct}%
          </span>
        </div>
      </motion.div>
      <motion.span
        className={cn(
          "text-center font-medium",
          size === "sm" ? "text-[10px]" : "text-xs"
        )}
        style={{ color: colors.stroke }}
        animate={isHigh ? { opacity: [1, 0.7, 1] } : {}}
        transition={{ duration: 1.5, repeat: isHigh ? Infinity : 0 }}
      >
        {getHeatLabel(level)}
      </motion.span>
      <span className="text-[10px] text-muted-foreground">
        {applications} / {seats} filled
      </span>
    </div>
  );
}
