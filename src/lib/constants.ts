/**
 * Official WHOLNEX LLC company facts, as supplied. Do not add registration numbers, founding
 * dates, phone numbers, customer counts, certifications, or other facts that have not been
 * confirmed by the company.
 *
 * The address is a business contact address. It is NOT a data center or hosting location —
 * see HOSTING_REGIONS in src/lib/capabilities.ts for hosting-location information.
 */
export const COMPANY = {
  name: 'WHOLNEX LLC',
  brand: 'WHOLNEX',
  descriptor: 'Virtual Private Server Hosting & Cloud Infrastructure',
  url: 'https://wholnex.org',
  ceo: {
    name: 'Ravindra Kuvar',
    title: 'Chief Executive Officer',
  },
  address: {
    street: '1333 County Road 565',
    city: 'Van Buren',
    region: 'MO',
    regionName: 'Missouri',
    postalCode: '63965',
    country: 'United States of America',
    countryCode: 'US',
  },
  language: 'en-US',
  currency: 'USD',
  /** Confirmed WHOLNEX support mailbox. VITE_PUBLIC_CONTACT_EMAIL can override it per build. */
  publicEmail: (import.meta.env.VITE_PUBLIC_CONTACT_EMAIL as string | undefined)?.trim() || 'support@wholnex.org',
} as const;

export const COMPANY_ADDRESS_LINES = [
  COMPANY.address.street.toUpperCase(),
  `${COMPANY.address.city.toUpperCase()}, ${COMPANY.address.region} ${COMPANY.address.postalCode}`,
  COMPANY.address.country,
] as const;

export const COMPANY_ADDRESS_LINE = `${COMPANY.address.street}, ${COMPANY.address.city}, ${COMPANY.address.region} ${COMPANY.address.postalCode}, ${COMPANY.address.country}`;

export const COMPANY_MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${COMPANY.address.street}, ${COMPANY.address.city}, ${COMPANY.address.region} ${COMPANY.address.postalCode}`,
)}`;

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export const PRIMARY_NAV: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'VPS Hosting', href: '/vps-hosting' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Infrastructure', href: '/infrastructure' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const RESOURCES_NAV: NavLink[] = [
  {
    label: 'FAQ',
    href: '/faq',
    description: 'Answers about VPS hosting, sizing, security, and how quoting works.',
  },
  {
    label: 'Security',
    href: '/security',
    description: 'How VPS security works and who is responsible for each layer.',
  },
  {
    label: 'Support',
    href: '/contact?category=technical-support',
    description: 'Send a technical question to the WHOLNEX team.',
  },
];

export const FOOTER_LINKS: { title: string; links: NavLink[] }[] = [
  {
    title: 'Services',
    links: [
      { label: 'VPS Hosting', href: '/vps-hosting' },
      { label: 'VPS Plans', href: '/pricing' },
      { label: 'Infrastructure', href: '/infrastructure' },
      { label: 'Solutions', href: '/solutions' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About WHOLNEX', href: '/about' },
      { label: 'Leadership', href: '/about#leadership' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Security', href: '/security' },
      { label: 'Support', href: '/contact?category=technical-support' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Acceptable Use Policy', href: '/acceptable-use' },
    ],
  },
];

/** DOM id of the cookie banner, used by floating UI (back-to-top button) to stay clear of it. */
export const COOKIE_BANNER_ID = 'cookie-consent-banner';
