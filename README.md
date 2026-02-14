# Campus Connect – Induction Intelligence Engine

A modern, AI-enhanced induction portal that centralizes college club and society inductions.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React**
- **Firebase** (Auth + Firestore) – config template included
- **React Hook Form + Zod**
- **Recharts** (for admin dashboard)

## Features

- **Homepage**: Hero, trending inductions, heat map, AI recommendations, timeline, stats
- **Clubs**: Open & upcoming inductions in cards; Register opens registration modal
- **Login**: Roll number (10 digits) + password (default: `student123`), or Google (@mmmut.ac.in)
- **Registration**: Modal with name, branch, year, skills, project, mobile, LinkedIn, GitHub, address, course, “why join”; success card on submit
- **Eligibility**: First year eligible, no CGPA, skill-based, communication required, 1 project preferred, team mindset
- **Heat Meter**: Circular progress (Low / Medium / High competition)
- **AI Advisor**: Dummy skill match score and top 3 clubs
- **Deadline reminders**: Add to Google Calendar, Email/Push toggles, countdown timer
- **Student Dashboard**: Applied clubs, status tracker, AI recommendations
- **Dark/Light** theme toggle, glassmorphism, responsive

## Getting Started

```bash
npm install
cp .env.example .env.local   # Add Firebase keys if using auth/Firestore
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Push to GitHub and import in Vercel.
2. Add env vars from `.env.example` if using Firebase.
3. Deploy.

## Project Structure

```
src/
  app/           # Routes (home, clubs, login, dashboard, ai-advisor, etc.)
  components/    # Navbar, ThemeProvider, ClubCard, RegistrationModal, UI
  data/         # Mock clubs (open + upcoming)
  firebase/      # Config (auth, Firestore)
  lib/           # utils, heat-meter, ai-match
  types/         # Shared TypeScript types
```

## Default Login (Prototype)

- **Roll number**: Any 10 digits (e.g. `1234567890`)
- **Password**: `student123`
- Google sign-in is wired for @mmmut.ac.in (configure Firebase for production).
