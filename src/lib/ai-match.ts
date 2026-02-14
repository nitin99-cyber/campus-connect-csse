// Dummy scoring: combine skills/interests/projects/communication for 0-100
export function computeAIMatchScore(input: {
  skills: string;
  interests: string;
  projects: string;
  communicationLevel: string;
}): number {
  let score = 50;
  if (input.skills?.trim().length > 0) score += 10;
  if (input.interests?.trim().length > 0) score += 10;
  if (input.projects?.trim().length > 0) score += 15;
  const comm = (input.communicationLevel ?? "").toLowerCase();
  if (comm.includes("high") || comm === "good") score += 15;
  else if (comm.includes("medium")) score += 8;
  return Math.min(100, Math.round(score));
}

export function getMatchExplanation(score: number): string {
  if (score >= 80) return "Strong alignment with club focus areas. Your skills and projects match their selection criteria.";
  if (score >= 60) return "Good fit. Highlight your projects and communication in the application.";
  return "Consider building a small project or brushing up skills to improve your chances.";
}
