export type InductionStatus = "open" | "upcoming";

export type HeatLevel = "low" | "medium" | "high";

export interface Club {
  id: string;
  name: string;
  tagline: string;
  logo?: string;
  status: InductionStatus;
  deadline?: string; // ISO date
  applicationsCount?: number; // open inductions only
  seats?: number; // open inductions only
  domain?: string;
  expectedStartDate?: string; // for upcoming
  timeline?: TimelinePhase[];
}

export interface TimelinePhase {
  label: string;
  date?: string;
  completed?: boolean;
}

export interface EligibilityCriteria {
  label: string;
  met: boolean;
}

export const ELIGIBILITY_CRITERIA: EligibilityCriteria[] = [
  { label: "First year students eligible", met: true },
  { label: "NO CGPA requirement", met: true },
  { label: "Skill-based selection", met: true },
  { label: "Communication skills required", met: true },
  { label: "At least 1 project preferred", met: true },
  { label: "Team collaboration mindset", met: true },
];

export interface RegistrationFormData {
  name: string;
  branch: string;
  year: string;
  skills: string;
  project: string;
  mobile: string;
  linkedin: string;
  github: string;
  temporaryAddress: string;
  course: string;
  whyJoin: string;
}

export type ApplicationStatus = "applied" | "shortlisted" | "interview" | "selected";
