"use client";

import { motion } from "framer-motion";
import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-hero text-3xl font-bold gradient-text"
      >
        Notifications
      </motion.h1>
      <p className="mt-2 text-muted-foreground">
        Smart deadline reminders, shortlist updates, and club news.
      </p>
      <div className="mt-12 rounded-2xl glass-card border border-white/10 p-12 text-center">
        <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-4 text-muted-foreground">
          Sign in to see your notifications and set reminders.
        </p>
      </div>
    </div>
  );
}
