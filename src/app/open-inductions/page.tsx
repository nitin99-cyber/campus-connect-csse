"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { OPEN_INDUCTIONS } from "@/data/clubs";
import { ClubCard } from "@/components/club-card";
import { RegistrationModal } from "@/components/registration-modal";
import { ArrowRight } from "lucide-react";
import type { Club } from "@/types";

export default function OpenInductionsPage() {
  const [registrationClub, setRegistrationClub] = useState<Club | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-hero text-3xl font-bold gradient-text"
      >
        Open Inductions
      </motion.h1>
      <p className="mt-2 text-muted-foreground">
        Apply before deadlines. Click Register on any card to apply.
      </p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {OPEN_INDUCTIONS.map((club, i) => (
          <ClubCard
            key={club.id}
            club={club}
            index={i}
            onRegister={(c) => {
              setRegistrationClub(c);
              setModalOpen(true);
            }}
          />
        ))}
      </div>
      <Link
        href="/clubs"
        className="mt-8 inline-flex items-center gap-2 text-primary hover:underline"
      >
        All clubs & upcoming <ArrowRight className="h-4 w-4" />
      </Link>
      <RegistrationModal
        club={registrationClub}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setRegistrationClub(null);
        }}
      />
    </div>
  );
}
