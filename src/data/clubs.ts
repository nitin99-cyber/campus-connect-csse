import type { Club } from "@/types";

export const OPEN_INDUCTIONS: Club[] = [
  {
    id: "csse",
    name: "Computer Society of Software Engineers (CSSE)",
    tagline: "Code. Build. Ship.",
    status: "open",
    deadline: "2025-03-15T23:59:59",
    applicationsCount: 87,
    seats: 100,
    domain: "Software Engineering",
    timeline: [
      { label: "Application Opens", date: "2025-02-01", completed: true },
      { label: "Screening Test", date: "2025-03-20", completed: false },
      { label: "Interview Round", date: "2025-03-28", completed: false },
      { label: "Final Results", date: "2025-04-05", completed: false },
    ],
  },
  {
    id: "ai-spark",
    name: "AI Spark",
    tagline: "Ignite the future with AI",
    status: "open",
    deadline: "2025-03-18T23:59:59",
    applicationsCount: 142,
    seats: 150,
    domain: "Artificial Intelligence",
    timeline: [
      { label: "Application Opens", date: "2025-02-05", completed: true },
      { label: "Screening Test", date: "2025-03-22", completed: false },
      { label: "Interview Round", date: "2025-03-30", completed: false },
      { label: "Final Results", date: "2025-04-08", completed: false },
    ],
  },
  {
    id: "robotics",
    name: "Robotics Club",
    tagline: "Build. Automate. Innovate.",
    status: "open",
    deadline: "2025-03-12T23:59:59",
    applicationsCount: 78,
    seats: 80,
    domain: "Robotics & Automation",
    timeline: [
      { label: "Application Opens", date: "2025-02-01", completed: true },
      { label: "Screening Test", date: "2025-03-18", completed: false },
      { label: "Interview Round", date: "2025-03-25", completed: false },
      { label: "Final Results", date: "2025-04-02", completed: false },
    ],
  },
  {
    id: "drone-iot",
    name: "Drone & IoT Club",
    tagline: "From sensors to the sky",
    status: "open",
    deadline: "2025-03-20T23:59:59",
    applicationsCount: 95,
    seats: 120,
    domain: "IoT & Drones",
    timeline: [
      { label: "Application Opens", date: "2025-02-08", completed: true },
      { label: "Screening Test", date: "2025-03-25", completed: false },
      { label: "Interview Round", date: "2025-04-01", completed: false },
      { label: "Final Results", date: "2025-04-10", completed: false },
    ],
  },
];

export const UPCOMING_INDUCTIONS: Club[] = [
  {
    id: "coders-dev",
    name: "Coders and Developers Club",
    tagline: "Where code meets community",
    status: "upcoming",
    domain: "Development",
    expectedStartDate: "2025-04-01",
  },
  {
    id: "gdg",
    name: "Google Developers Group (GDG Campus)",
    tagline: "Learn. Build. Share.",
    status: "upcoming",
    domain: "Google Technologies",
    expectedStartDate: "2025-04-15",
  },
  {
    id: "dramatics",
    name: "Dramatics Club",
    tagline: "Stage your passion",
    status: "upcoming",
    domain: "Performing Arts",
    expectedStartDate: "2025-03-25",
  },
  {
    id: "ieee",
    name: "IEEE Student Chapter",
    tagline: "Advancing technology for humanity",
    status: "upcoming",
    domain: "Engineering",
    expectedStartDate: "2025-04-10",
  },
  {
    id: "hack-with-india",
    name: "Hack With India – MMMUT Chapter",
    tagline: "Hack the future",
    status: "upcoming",
    domain: "Hackathons",
    expectedStartDate: "2025-04-20",
  },
];

export const ALL_CLUBS = [...OPEN_INDUCTIONS, ...UPCOMING_INDUCTIONS];
