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

// base64-obfuscated so the address isn't sitting as plain text in the page
// source or JS bundle for spam bots to scrape — decoded only client-side,
// on click, by GmailButton.astro
export const contactEmailEncoded = 'cmVuem9jaDk5QGdtYWlsLmNvbQ==';
