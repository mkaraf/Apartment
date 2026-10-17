import { SITE } from 'astrowind:config';

import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'Úvod', href: getPermalink('/#uvod') },
    { text: 'O apartmánu', href: getPermalink('/#apartman') },
    { text: 'Fotogalerie', href: getPermalink('/#fotogalerie') },
    { text: 'Lokalita', href: getPermalink('/#lokalita') },
    { text: 'Kontakt', href: getPermalink('/#kontakt') },
  ],
  actions: [
    {
      variant: 'primary' as const,
      text: 'Rezervace / Dotaz',
      href: getPermalink('/#rezervace'),
      icon: 'tabler:arrow-right',
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
