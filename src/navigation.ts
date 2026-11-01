import { SITE } from 'astrowind:config';

import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'Apartmán', href: getPermalink('/#apartman') },
    { text: 'Fotky', href: getPermalink('/#fotogalerie') },
    { text: 'Obsazenost', href: getPermalink('/#rezervace') },
    { text: 'Lokalita', href: getPermalink('/#lokalita') },
    { text: 'Dotazy', href: getPermalink('/#faqs') },
    { text: 'Kontakt', href: getPermalink('/#kontakt') },
  ],
  actions: [
    {
      variant: 'primary' as const,
      text: 'Rezervovat',
      href: getPermalink('/#rezervace'),
    },
  ],
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
