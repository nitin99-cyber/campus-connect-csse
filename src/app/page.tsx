"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Sparkles,
  Users,
  Building2,
  Zap,
  ChevronDown,
} from "lucide-react";
import { OPEN_INDUCTIONS } from "@/data/clubs";
import { ClubCard } from "@/components/club-card";
import { HeatMeter } from "@/components/ui/heat-meter";
import { InductionTimeline } from "@/components/ui/timeline";

const STATS = [
  { value: 9, label: "Clubs", icon: Users },
  { value: 1247, label: "Students", icon: Building2 },
  { value: 4, label: "Active Inductions", icon: Zap },
];

export default function HomePage() {
  const firstOpen = OPEN_INDUCTIONS[0];
  const timelinePhases = firstOpen?.timeline ?? [];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 bg-[var(--background)]" />
      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        style={{ background: "var(--gradient-mesh)" }}
      />
      <div className="pointer-events-none fixed left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none fixed bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative">
        {/* Hero */}
        <section className="relative px-4 pt-16 pb-24 sm:px-6 sm:pt-24 lg:px-8 lg:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
              Induction Intelligence Engine
            </p>
            <h1 className="font-hero text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="gradient-text">
                One Platform for Every Campus Opportunity
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Simplifying club inductions with intelligence and design.
            </p>
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/clubs"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
              >
                Explore Inductions
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/clubs"
                className="inline-flex items-center gap-2 rounded-xl border border-primary/50 bg-primary/10 px-6 py-3.5 font-semibold text-primary transition hover:bg-primary/20"
              >
                Register Your Club
              </Link>
            </motion.div>
            <motion.div
              className="mt-16 flex justify-center"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="h-8 w-8 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="border-y border-white/10 bg-white/5 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 gap-8 sm:grid-cols-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center text-center"
                  >
                    <Icon className="mb-2 h-8 w-8 text-primary" />
                    <span className="font-hero text-4xl font-bold text-foreground">
                      {stat.value}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Trending Inductions */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-semibold text-foreground">
              Trending Inductions
            </h2>
            <p className="mt-2 text-muted-foreground">
              Open now — apply before deadlines.
            </p>
          </motion.div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {OPEN_INDUCTIONS.slice(0, 4).map((club, i) => (
              <ClubCard key={club.id} club={club} index={i} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/clubs"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              View all open inductions <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Heat Map Overview */}
        <section className="border-t border-white/10 bg-white/[0.02] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="font-display text-3xl font-semibold text-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Induction Heat Map
            </motion.h2>
            <p className="mt-2 text-muted-foreground">
              Competition level across open inductions
            </p>
            <motion.div
              className="mt-8 flex flex-wrap justify-center gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {OPEN_INDUCTIONS.map((club) => (
                <div
                  key={club.id}
                  className="glass-card flex flex-col items-center gap-2 rounded-xl p-6"
                >
                  <p className="text-center text-sm font-medium text-foreground">
                    {club.name.split(" ")[0]}
                  </p>
                  <HeatMeter
                    applications={club.applicationsCount ?? 0}
                    seats={club.seats ?? 1}
                    size="md"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* AI Recommended */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <Sparkles className="h-8 w-8 text-primary" />
            <h2 className="font-display text-3xl font-semibold text-foreground">
              AI Recommended For You
            </h2>
          </motion.div>
          <p className="mt-2 text-muted-foreground">
            Based on your skills and interests (prototype scoring).
          </p>
          <motion.div
            className="mt-8 flex flex-wrap gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {OPEN_INDUCTIONS.slice(0, 3).map((club, index) => (
              <Link
                key={club.id}
                href="/clubs"
                className="glass-card flex flex-1 min-w-[200px] flex-col items-center gap-3 rounded-xl border border-primary/20 p-6 transition hover:border-primary/40"
              >
                <span className="font-hero text-2xl font-bold text-primary">
                  {85 - index * 5}%
                </span>
                <p className="text-center text-sm font-medium text-foreground">
                  {club.name.split("(")[0].trim()}
                </p>
              </Link>
            ))}
          </motion.div>
          <div className="mt-6">
            <Link
              href="/ai-advisor"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              Get full AI recommendations <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Timeline Preview */}
        <section className="border-t border-white/10 bg-white/[0.02] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2"
            >
              <Calendar className="h-8 w-8 text-primary" />
              <h2 className="font-display text-3xl font-semibold text-foreground">
                Induction Timeline
              </h2>
            </motion.div>
            <p className="mt-2 text-muted-foreground">
              Typical flow: Application → Screening → Interview → Results
            </p>
            <motion.div
              className="mt-8 rounded-2xl glass-card border border-white/10 p-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <InductionTimeline phases={timelinePhases} />
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            className="rounded-3xl border border-primary/30 bg-primary/5 py-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
              Ready to join?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-muted-foreground">
              Browse clubs and register in one click.
            </p>
            <Link
              href="/clubs"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Go to Clubs
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
