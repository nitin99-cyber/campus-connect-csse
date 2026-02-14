"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  deadline: string; // ISO
  className?: string;
  compact?: boolean;
  warnUnderHours?: number;
}

function parseRemaining(deadline: string): { d: number; h: number; m: number; s: number } | null {
  const end = new Date(deadline).getTime();
  const now = Date.now();
  if (end <= now) return null;
  const diff = end - now;
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);
  return { d, h, m, s };
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.span
        className="font-hero text-2xl tabular-nums text-primary md:text-3xl"
        key={value}
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {String(value).padStart(2, "0")}
      </motion.span>
      <span className="text-[10px] uppercase text-muted-foreground">{label}</span>
    </div>
  );
}

export function CountdownTimer({
  deadline,
  className,
  compact,
  warnUnderHours = 24,
}: CountdownTimerProps) {
  const [remaining, setRemaining] = useState<ReturnType<typeof parseRemaining>>(() =>
    parseRemaining(deadline)
  );
  const totalHours =
    remaining != null
      ? remaining.d * 24 + remaining.h + remaining.m / 60 + remaining.s / 3600
      : 0;
  const isWarn = totalHours > 0 && totalHours < warnUnderHours;

  useEffect(() => {
    const t = setInterval(() => setRemaining(parseRemaining(deadline)), 1000);
    return () => clearInterval(t);
  }, [deadline]);

  if (remaining == null) {
    return (
      <div className={cn("flex items-center gap-2 text-muted-foreground", className)}>
        <Clock className="h-4 w-4" />
        <span className="text-sm">Closed</span>
      </div>
    );
  }

  if (compact) {
    return (
      <div
        className={cn(
          "flex items-center gap-2 rounded-lg border px-3 py-1.5",
          isWarn && "animate-pulse border-red-500/50 bg-red-500/10"
        )}
      >
        <Clock className="h-4 w-4 text-primary" />
        <span className="font-mono text-sm">
          {remaining.d}d {remaining.h}h {remaining.m}m
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border bg-card/50 px-4 py-3",
        isWarn && "animate-pulse border-red-500/30 bg-red-500/5",
        className
      )}
    >
      <Clock className="h-5 w-5 text-primary" />
      <div className="flex gap-4">
        <Digit value={remaining.d} label="Days" />
        <Digit value={remaining.h} label="Hours" />
        <Digit value={remaining.m} label="Min" />
        <Digit value={remaining.s} label="Sec" />
      </div>
    </div>
  );
}
