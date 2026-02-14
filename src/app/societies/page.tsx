"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SocietiesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-hero text-3xl font-bold gradient-text"
      >
        Societies
      </motion.h1>
      <p className="mt-2 text-muted-foreground">
        Campus societies will be listed here. For now, explore clubs.
      </p>
      <Link
        href="/clubs"
        className="mt-6 inline-flex items-center gap-2 text-primary hover:underline"
      >
        View Clubs <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
