export const languages = {
  es: 'ES',
  en: 'EN',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';

export function otherLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}
