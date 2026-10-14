import { SITE } from 'astrowind:config';

import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Úvod',
      href: getPermalink('/'),
    },
    {
      text: 'Ochrana osobních údajů',
      href: getPermalink('/privacy'),
    },
    {
      text: 'Obchodní podmínky',
      href: getPermalink('/terms'),
    },
  ],
  actions: [],
};

export const footerData = {
  links: [],
  secondaryLinks: [
    { text: 'Ochrana osobních údajů', href: getPermalink('/privacy') },
    { text: 'Obchodní podmínky', href: getPermalink('/terms') },
  ],
  socialLinks: [],
  footNote: `© ${new Date().getFullYear()} ${SITE?.name}`,
};
