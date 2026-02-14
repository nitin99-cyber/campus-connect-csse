"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { OPEN_INDUCTIONS } from "@/data/clubs";
import { computeAIMatchScore, getMatchExplanation } from "@/lib/ai-match";
import { cn } from "@/lib/utils";

export default function AIAdvisorPage() {
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [projects, setProjects] = useState("");
  const [communication, setCommunication] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const s = computeAIMatchScore({
      skills,
      interests,
      projects,
      communicationLevel: communication,
    });
    setScore(s);
    setSubmitted(true);
  };

  const topClubs = OPEN_INDUCTIONS.slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2"
      >
        <Sparkles className="h-8 w-8 text-primary" />
        <h1 className="font-hero text-3xl font-bold gradient-text">
          AI Advisor (Beta)
        </h1>
      </motion.div>
      <p className="mt-2 text-muted-foreground">
        Enter your profile for a match % and top club recommendations.
      </p>

      <motion.form
        onSubmit={handleSubmit}
        className="mt-10 space-y-6 rounded-2xl glass-card border border-white/10 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Skills
          </label>
          <input
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full rounded-lg border bg-white/5 px-3 py-2 text-foreground"
            placeholder="e.g. Python, React, Communication"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Interests
          </label>
          <input
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="w-full rounded-lg border bg-white/5 px-3 py-2 text-foreground"
            placeholder="e.g. AI, Web Dev, Robotics"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Projects
          </label>
          <textarea
            value={projects}
            onChange={(e) => setProjects(e.target.value)}
            rows={2}
            className="w-full rounded-lg border bg-white/5 px-3 py-2 text-foreground"
            placeholder="Brief description"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Communication Level
          </label>
          <select
            value={communication}
            onChange={(e) => setCommunication(e.target.value)}
            className="w-full rounded-lg border bg-white/5 px-3 py-2 text-foreground"
          >
            <option value="">Select</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="good">Good</option>
          </select>
        </div>
        <button
          type="submit"
          className="rounded-lg bg-primary px-6 py-2.5 font-semibold text-primary-foreground hover:opacity-90"
        >
          Get Recommendations
        </button>
      </motion.form>

      {submitted && score !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 space-y-6"
        >
          <div className="flex flex-col items-center rounded-2xl glass-card border border-primary/20 p-8">
            <p className="text-sm text-muted-foreground">Your match score</p>
            <p className="font-hero text-5xl font-bold gradient-text">{score}%</p>
            <p className="mt-4 max-w-md text-center text-sm text-muted-foreground">
              {getMatchExplanation(score)}
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Top 3 Recommended Clubs
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {topClubs.map((club, i) => (
                <div
                  key={club.id}
                  className={cn(
                    "rounded-xl border p-4",
                    "border-white/10 bg-white/5"
                  )}
                >
                  <span className="text-xs text-primary">#{i + 1}</span>
                  <p className="mt-1 font-medium text-foreground">{club.name}</p>
                  <p className="text-xs text-muted-foreground">{club.tagline}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
