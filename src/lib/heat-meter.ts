import type { HeatLevel } from "@/types";

export function getHeatLevel(applications: number, seats: number): HeatLevel {
  if (seats <= 0) return "low";
  const pct = (applications / seats) * 100;
  if (pct <= 40) return "low";
  if (pct <= 70) return "medium";
  return "high";
}

export function getHeatPercentage(applications: number, seats: number): number {
  if (seats <= 0) return 0;
  return Math.min(100, Math.round((applications / seats) * 100));
}

export function getHeatLabel(level: HeatLevel): string {
  switch (level) {
    case "low":
      return "Low Competition";
    case "medium":
      return "Medium Competition";
    case "high":
      return "High Competition";
  }
}
