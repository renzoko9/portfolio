import { es, type Dictionary } from './es';
import { en } from './en';
import type { Lang } from './languages';

const dictionaries: Record<Lang, Dictionary> = { es, en };

export type { Dictionary };

export function useTranslations(lang: Lang): Dictionary {
  return dictionaries[lang];
}
