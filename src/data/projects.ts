import type { Dictionary } from '../i18n/utils';

export type ProjectStatus = 'live' | 'deploying' | 'dev';

export interface ProjectEntry {
  id: string;
  index: string;
  title: string;
  href: string;
  external: boolean;
  status: ProjectStatus;
  descKey: keyof Dictionary;
  tags: string[];
}

export const projectStatusMeta: Record<
  ProjectStatus,
  { variant: 'success' | 'info' | 'warning'; labelKey: keyof Dictionary }
> = {
  live: { variant: 'success', labelKey: 'status_live' },
  deploying: { variant: 'info', labelKey: 'status_deploying' },
  dev: { variant: 'warning', labelKey: 'status_dev' },
};

export const projects: ProjectEntry[] = [
  {
    id: 'san-market',
    index: '01',
    title: 'San Market',
    href: 'https://www.unmsm.edu.pe/noticias-y-eventos/noticias/noticia-detalle/unmsm-lanza-san-market-la-nueva-tienda-virtual-para-simplificar-pagos-y-tramites',
    external: true,
    status: 'live',
    descKey: 'proj1_desc',
    tags: ['Angular', 'NestJS', 'PostgreSQL', 'Microservicios', 'Design System propio'],
  },
  {
    id: 'medibyte',
    index: '02',
    title: 'Medibyte',
    href: 'https://www.unmsm.edu.pe/noticias-y-eventos/noticias/noticia-detalle/adios-al-papel-sistema-quipucamayoc-digitalizara-las-historias-clinicas-de-san-marcos',
    external: true,
    status: 'live',
    descKey: 'proj5_desc',
    tags: ['Angular', 'NestJS', 'PostgreSQL', 'Microservicios', 'Design System propio'],
  },
  {
    id: 'inout',
    index: '03',
    title: 'INOUT',
    href: 'https://inout-landing-eta.vercel.app/',
    external: true,
    status: 'live',
    descKey: 'proj2_desc',
    tags: ['React Native', 'Expo', 'NestJS', 'PostgreSQL', 'OpenAI'],
  },
  {
    id: 'rumi',
    index: '04',
    title: 'Rumi',
    href: 'https://www.kaggle.com/competitions/build-with-gemma-gdg-lima-ai/writeups/new-writeup-1785602435750',
    external: true,
    status: 'dev',
    descKey: 'proj4_desc',
    tags: ['React Native', 'Next.js', 'NestJS', 'Gemma 4 E2B'],
  },
  {
    id: 'foolscap',
    index: '05',
    title: 'Foolscap',
    href: 'https://github.com/renzoko9/foolscap',
    external: true,
    status: 'live',
    descKey: 'proj6_desc',
    tags: ['Next.js', 'Clerk', 'Portal', 'Neon Postgres', 'Drizzle ORM'],
  },
  {
    id: 'cuentape',
    index: '06',
    title: 'Cuéntape',
    href: '#',
    external: false,
    status: 'dev',
    descKey: 'proj3_desc',
    tags: ['React Native', 'Expo'],
  },
];
