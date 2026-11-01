import { SITE } from 'astrowind:config';

import { getPermalink } from './utils/permalinks';

export const headerData = {
  // Logo left, menu and button right (the home hero's wordmark sits top left).
  position: 'right',
  links: [
    { text: 'Apartmán', href: getPermalink('/#apartman') },
    { text: 'Fotky', href: getPermalink('/#fotogalerie') },
    { text: 'Lokalita', href: getPermalink('/#lokalita') },
    { text: 'Kontakt', href: getPermalink('/#kontakt') },
  ],
  actions: [
    {
      variant: 'primary' as const,
      text: 'Rezervovat',
      href: getPermalink('/#rezervace'),
      icon: 'tabler:arrow-up-right',
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
