import type { Dictionary } from '../i18n/utils';

export interface ExperienceEntry {
  id: string;
  active: boolean;
  periodKey: keyof Dictionary;
  roleKey: keyof Dictionary;
  descKey: keyof Dictionary;
  company?: string;
}

export const experience: ExperienceEntry[] = [
  {
    id: 'freelance',
    active: true,
    periodKey: 'exp1_period',
    roleKey: 'exp1_role',
    descKey: 'exp1_desc',
  },
  {
    id: 'quipucamayoc',
    active: false,
    periodKey: 'exp2_period',
    roleKey: 'exp2_role',
    descKey: 'exp2_desc',
    company: 'Quipucamayoc — UNMSM',
  },
];
