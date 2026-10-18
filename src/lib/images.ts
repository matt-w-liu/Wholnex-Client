/**
 * Licensed site photography. All images are from Pexels (https://www.pexels.com/license/),
 * downloaded, reviewed for visible third-party branding, and converted to WebP. Attribution is
 * not legally required by the Pexels License but is recorded here and in ASSET_SOURCES.md.
 */
export interface SiteImage {
  /** Path without width suffix or extension, e.g. /images/site/server-drive-bays */
  base: string;
  widths: number[];
  alt: string;
  credit: { photographer: string; source: string };
}

export const SITE_IMAGES = {
  datacenterAisle: {
    base: '/images/site/datacenter-aisle',
    widths: [960, 1600],
    alt: 'Data center aisle lined with closed server rack cabinets and overhead cable trays',
    credit: { photographer: 'Brett Sayles', source: 'https://www.pexels.com/photo/4508751/' },
  },
  networkRackCabinets: {
    base: '/images/site/network-rack-cabinets',
    widths: [960, 1920],
    alt: 'Network rack cabinets in a data center lit in deep blue',
    credit: { photographer: 'panumas nikhomkhai', source: 'https://www.pexels.com/photo/17323801/' },
  },
  fiberPatchPanel: {
    base: '/images/site/fiber-patch-panel',
    widths: [960, 1920],
    alt: 'Fiber optic patch cables connected to a network switch',
    credit: { photographer: 'Brett Sayles', source: 'https://www.pexels.com/photo/2881229/' },
  },
  ethernetSwitchCabling: {
    base: '/images/site/ethernet-switch-cabling',
    widths: [960, 1920],
    alt: 'Blue Ethernet cables plugged into a rack-mounted network switch',
    credit: { photographer: 'Brett Sayles', source: 'https://www.pexels.com/photo/2881232/' },
  },
  switchPortArray: {
    base: '/images/site/switch-port-array',
    widths: [960, 1920],
    alt: 'Close-up of numbered Ethernet ports on a network switch',
    credit: { photographer: 'Brett Sayles', source: 'https://www.pexels.com/photo/2881227/' },
  },
  serverBaysTeal: {
    base: '/images/site/server-bays-teal',
    widths: [960, 1920],
    alt: 'Server drive bays with status lights in a dark equipment rack',
    credit: { photographer: 'panumas nikhomkhai', source: 'https://www.pexels.com/photo/37730212/' },
  },
  datacenterConsole: {
    base: '/images/site/datacenter-console',
    widths: [960, 1920],
    alt: 'Technician typing at a console workstation beside network equipment racks',
    credit: { photographer: 'panumas nikhomkhai', source: 'https://www.pexels.com/photo/37605911/' },
  },
} satisfies Record<string, SiteImage>;

export type SiteImageKey = keyof typeof SITE_IMAGES;

export function imageSrc(image: SiteImage, width?: number): string {
  const w = width ?? image.widths[image.widths.length - 1];
  return `${image.base}-${w}.webp`;
}

export function imageSrcSet(image: SiteImage): string {
  return image.widths.map((w) => `${image.base}-${w}.webp ${w}w`).join(', ');
}
