"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Mail, Bell } from "lucide-react";
import { OPEN_INDUCTIONS, UPCOMING_INDUCTIONS } from "@/data/clubs";
import { HeatMeter } from "@/components/ui/heat-meter";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { InductionTimeline } from "@/components/ui/timeline";
import { EligibilityChecklist } from "@/components/ui/eligibility-checklist";
import { RegistrationModal } from "@/components/registration-modal";

export default function ClubDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const club =
    OPEN_INDUCTIONS.find((c) => c.id === id) ??
    UPCOMING_INDUCTIONS.find((c) => c.id === id);

  const [emailReminder, setEmailReminder] = useState(false);
  const [pushReminder, setPushReminder] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  if (!club) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <p className="text-muted-foreground">Club not found.</p>
        <Link href="/clubs" className="mt-4 inline-block text-primary hover:underline">
          Back to Clubs
        </Link>
      </div>
    );
  }

  const isOpen = club.status === "open";

  const googleCalendarUrl = club.deadline
    ? `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(club.name + " Induction Deadline")}&dates=${new Date(club.deadline).toISOString().replace(/[-:]/g, "").slice(0, 15)}/${new Date(club.deadline).toISOString().replace(/[-:]/g, "").slice(0, 15)}`
    : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl glass-card border border-white/10 p-8"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 text-3xl font-bold text-primary">
              {club.name.charAt(0)}
            </div>
            <h1 className="mt-4 font-display text-2xl font-semibold text-foreground">
              {club.name}
            </h1>
            <p className="text-muted-foreground">{club.tagline}</p>
            {club.domain && (
              <p className="mt-1 text-sm text-primary">{club.domain}</p>
            )}
          </div>
          {isOpen && club.deadline && club.applicationsCount != null && club.seats != null && (
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <CountdownTimer deadline={club.deadline} warnUnderHours={24} />
              <HeatMeter
                applications={club.applicationsCount}
                seats={club.seats}
                size="md"
              />
            </div>
          )}
        </div>

        {isOpen && (
          <>
            <div className="mt-8 border-t border-white/10 pt-8">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Smart Deadline Reminder
              </h2>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                {googleCalendarUrl && (
                  <a
                    href={googleCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium transition hover:bg-white/10"
                  >
                    <Calendar className="h-4 w-4" />
                    Add to Google Calendar
                  </a>
                )}
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={emailReminder}
                    onChange={(e) => setEmailReminder(e.target.checked)}
                    className="rounded border-white/20"
                  />
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Email Reminder</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={pushReminder}
                    onChange={(e) => setPushReminder(e.target.checked)}
                    className="rounded border-white/20"
                  />
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Push Notification</span>
                </label>
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-8">
              <EligibilityChecklist />
            </div>

            {club.timeline && club.timeline.length > 0 && (
              <div className="mt-8 border-t border-white/10 pt-8">
                <h2 className="font-display text-lg font-semibold text-foreground">
                  Timeline
                </h2>
                <InductionTimeline phases={club.timeline} className="mt-4" />
              </div>
            )}

            <div className="mt-8 flex gap-4">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="rounded-lg bg-primary px-6 py-2.5 font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Register
              </button>
              <Link
                href="/clubs"
                className="rounded-lg border border-white/20 px-6 py-2.5 text-sm font-medium transition hover:bg-white/10"
              >
                View all clubs
              </Link>
            </div>
          </>
        )}

        {club.status === "upcoming" && club.expectedStartDate && (
          <div className="mt-8 flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-5 w-5" />
            Expected start: {new Date(club.expectedStartDate).toLocaleDateString()}
          </div>
        )}
      </motion.div>

      <RegistrationModal
        club={club}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
