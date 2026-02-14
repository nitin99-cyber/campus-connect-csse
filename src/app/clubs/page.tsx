"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { OPEN_INDUCTIONS, UPCOMING_INDUCTIONS } from "@/data/clubs";
import { ClubCard } from "@/components/club-card";
import { RegistrationModal } from "@/components/registration-modal";
import { EligibilityChecklist } from "@/components/ui/eligibility-checklist";
import type { Club } from "@/types";

export default function ClubsPage() {
  const [registrationClub, setRegistrationClub] = useState<Club | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openRegistration = (club: Club) => {
    setRegistrationClub(club);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-hero text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            <span className="gradient-text">Clubs & Societies</span>
          </h1>
          <p className="mt-2 text-muted-foreground">
            Explore open inductions and upcoming opportunities. Register from any card.
          </p>
        </motion.div>

        <div className="mb-8 rounded-2xl glass-card border border-white/10 p-6">
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
            Eligibility (all open inductions)
          </h2>
          <EligibilityChecklist />
        </div>

        <section className="mb-16">
          <h2 className="mb-6 font-display text-2xl font-semibold text-foreground">
            Open for Induction
          </h2>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {OPEN_INDUCTIONS.map((club, i) => (
              <ClubCard
                key={club.id}
                club={club}
                index={i}
                onRegister={openRegistration}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-6 font-display text-2xl font-semibold text-foreground">
            Upcoming Inductions
          </h2>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {UPCOMING_INDUCTIONS.map((club, i) => (
              <ClubCard
                key={club.id}
                club={club}
                index={OPEN_INDUCTIONS.length + i}
                onRegister={openRegistration}
              />
            ))}
          </div>
        </section>
      </div>

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
