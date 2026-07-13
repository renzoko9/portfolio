export type SocialIcon = 'linkedin' | 'github' | 'x';

export interface SocialLink {
  id: SocialIcon;
  label: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { id: 'linkedin', label: 'LinkedIn', href: '#' },
  { id: 'github', label: 'GitHub', href: '#' },
  { id: 'x', label: 'X', href: '#' },
];

export const contactEmail = 'renzoch99@gmail.com';
