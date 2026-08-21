import type { Dictionary } from "../i18n/utils";

export interface SkillCategory {
  categoryKey: keyof Dictionary;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    categoryKey: "skills_cat_front",
    items: [
      "Angular",
      "Next.js",
      "React Native",
      "Expo",
      "TypeScript",
      "JavaScript",
      "HTML & CSS",
      "TailwindCSS",
      "UX / UI",
    ],
  },
  {
    categoryKey: "skills_cat_back",
    items: [
      "NestJS",
      "PostgreSQL",
      "Drizzle ORM",
      "Microservicios",
      "REST APIs",
      "Redis",
      "WebSockets",
      "Portal (realtime)",
      "Clerk",
      "FastAPI",
    ],
  },
  {
    categoryKey: "skills_cat_tools",
    items: ["Git", "GitHub", "GitLab", "Jira", "Claude Code", "Figma"],
  },
  {
    categoryKey: "skills_cat_ai",
    items: ["Python", "OpenAI", "LLMs", "AI Agents"],
  },
];
