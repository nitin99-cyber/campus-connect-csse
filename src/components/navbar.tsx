"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Users,
  Building2,
  Calendar,
  CalendarClock,
  Bell,
  Sparkles,
  LogIn,
  UserPlus,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/clubs", label: "Clubs", icon: Users },
  { href: "/societies", label: "Societies", icon: Building2 },
  { href: "/open-inductions", label: "Open Inductions", icon: Calendar },
  { href: "/upcoming-inductions", label: "Upcoming Inductions", icon: CalendarClock },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/ai-advisor", label: "AI Advisor (Beta)", icon: Sparkles },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-hero text-lg font-bold tracking-tight">
          <span className="gradient-text">CAMPUS CONNECT</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg p-2 text-muted-foreground transition hover:bg-white/10 hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Link
            href="/login"
            className="hidden items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 md:flex"
          >
            <LogIn className="h-4 w-4" />
            Login
          </Link>
          <Link
            href="/clubs"
            className="hidden items-center gap-2 rounded-lg border border-primary/50 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/20 md:flex"
          >
            <UserPlus className="h-4 w-4" />
            Register
          </Link>

          <button
            type="button"
            className="rounded-lg p-2 text-foreground md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
              <span className="font-hero font-bold gradient-text">CAMPUS CONNECT</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col gap-1 p-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-4 py-3 text-base",
                      pathname === item.href ? "bg-primary/20 text-primary" : "text-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground"
                >
                  <LogIn className="h-5 w-5" />
                  Login
                </Link>
                <Link
                  href="/clubs"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-lg border border-primary/50 px-4 py-3 font-semibold text-primary"
                >
                  <UserPlus className="h-5 w-5" />
                  Register
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
