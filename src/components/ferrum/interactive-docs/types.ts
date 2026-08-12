export interface InteractiveLesson {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
  explanation: string;
  starterCode: string;
  solutionCode: string;
  hint: string;
  concepts: string[];
}

export type DeviceSize = "desktop" | "tablet" | "mobile";

export const DEVICE_WIDTHS: Record<DeviceSize, number> = {
  desktop: 1024,
  tablet: 768,
  mobile: 375,
};

export const CATEGORIES = [
  "Getting Started",
  "Hover Effects",
  "Entrance Animations",
  "Advanced Techniques",
] as const;

export const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  intermediate: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  advanced: "bg-red-500/15 text-red-400 border-red-500/30",
};

export function groupLessonsByCategory(lessons: InteractiveLesson[]) {
  const groups: Record<string, InteractiveLesson[]> = {};
  for (const cat of CATEGORIES) {
    groups[cat] = lessons.filter((l) => l.category === cat);
  }
  return groups;
}
