export type SocialIcon = 'linkedin' | 'github' | 'x';

export interface SocialLink {
  id: SocialIcon;
  label: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/renzojo/' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/renzoko9' },
  { id: 'x', label: 'X', href: 'https://x.com/renzoko9' },
];

export const contactEmail = 'renzoch99@gmail.com';
