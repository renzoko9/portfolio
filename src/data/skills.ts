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
      "Microservicios",
      "REST APIs",
      "Redis",
      "WebSockets",
    ],
  },
  {
    categoryKey: "skills_cat_tools",
    items: ["Git", "GitHub", "GitLab", "Jira", "Claude Code", "Figma"],
  },
  {
    categoryKey: "skills_cat_ai",
    items: ["OpenAI"],
  },
];
