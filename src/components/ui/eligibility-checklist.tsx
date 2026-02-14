"use client";

import { Check } from "lucide-react";
import { ELIGIBILITY_CRITERIA } from "@/types";
import { cn } from "@/lib/utils";

export function EligibilityChecklist({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-sm font-semibold text-foreground">Eligibility (all open inductions)</p>
      <ul className="space-y-2">
        {ELIGIBILITY_CRITERIA.map((item, i) => (
          <li
            key={i}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-glow-teal/20 text-glow-teal">
              <Check className="h-3 w-3" />
            </span>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
