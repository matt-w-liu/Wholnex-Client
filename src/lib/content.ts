import type { LucideIcon } from 'lucide-react';
import { Briefcase, Coffee, EyeOff, Home, Plane, Users } from 'lucide-react';
import type { VpnUseCase } from '@wholnex/shared';
import type { SiteImageKey } from '@/lib/images';

// --- Use cases ------------------------------------------------------------------------------

export interface UseCase {
  id: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  details: string[];
  useCase: VpnUseCase;
  image?: SiteImageKey;
}

export const USE_CASES: UseCase[] = [
  {
    id: 'public-wifi',
    title: 'Public Wi-Fi protection',
    icon: Coffee,
    summary: 'Encrypt your connection on café, hotel, and airport networks you do not control.',
    details: [
      'Keeps other people on the same network from reading your traffic',
      'Reduces exposure to rogue or misconfigured hotspots',
      'Works alongside HTTPS for an extra layer of protection',
    ],
    useCase: 'public-wifi',
    image: 'fiberPatchPanel',
  },
  {
    id: 'remote-work',
    title: 'Remote work',
    icon: Briefcase,
    summary: 'Give remote and hybrid staff an encrypted connection wherever they work.',
    details: [
      'Consistent protection from home, coworking spaces, and client sites',
      'A predictable exit address for allow-listing, where a dedicated IP is available',
      'One app to install on each Windows PC',
    ],
    useCase: 'remote-work',
    image: 'networkRackCabinets',
  },
  {
    id: 'online-privacy',
    title: 'Everyday privacy',
    icon: EyeOff,
    summary: 'Keep your internet provider and local network from seeing which sites you visit.',
    details: [
      'Your provider sees an encrypted connection to the VPN, not your destinations',
      'Websites see the VPN server’s address instead of your home address',
      'Pairs well with private browsing habits and tracker blocking',
    ],
    useCase: 'online-privacy',
    image: 'ethernetSwitchCabling',
  },
  {
    id: 'travel',
    title: 'Travel',
    icon: Plane,
    summary: 'Use unfamiliar networks abroad with an encrypted connection back to a server you choose.',
    details: [
      'Protection on hotel and conference Wi-Fi',
      'Connect through a server location that suits you, where available',
      'Check local laws — VPN use is restricted in some countries',
    ],
    useCase: 'travel',
    image: 'serverBaysTeal',
  },
  {
    id: 'team-access',
    title: 'Secure team access',
    icon: Users,
    summary: 'Give a small team a shared, encrypted way to connect, managed by one administrator.',
    details: [
      'Add and remove people as the team changes',
      'Seat-based plans sized to your organization',
      'Requirements discussed and confirmed with WHOLNEX in writing',
    ],
    useCase: 'team-access',
  },
  {
    id: 'home',
    title: 'Home connections',
    icon: Home,
    summary: 'Add a layer of privacy to your household’s everyday browsing on Windows PCs.',
    details: [
      'Encrypts traffic leaving your PC before it reaches your router and provider',
      'Easy to turn on and off from the app',
      'Choose a plan by the number of devices you need',
    ],
    useCase: 'online-privacy',
  },
];

// --- Getting-started workflow ------------------------------------------------------------------

export const GETTING_STARTED_STEPS = [
  {
    title: 'Download the app',
    description: 'Get the WHOLNEX VPN installer for Windows from the download page.',
  },
  {
    title: 'Install it',
    description: 'Run the installer and follow the prompts. Windows may ask permission to add a network driver.',
  },
  {
    title: 'Choose a plan',
    description: 'Pick the plan that fits you or your team. WHOLNEX confirms plan details and pricing with you.',
  },
  {
    title: 'Connect',
    description: 'Open the app and connect. While connected, your traffic travels through an encrypted tunnel.',
  },
];

// --- FAQ ------------------------------------------------------------------------------------

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqGroup {
  id: string;
  title: string;
  items: FaqItem[];
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: 'basics',
    title: 'VPN basics',
    items: [
      {
        question: 'What is a VPN?',
        answer:
          'A virtual private network (VPN) creates an encrypted connection — often called a tunnel — between your device and a VPN server. Your internet traffic travels through that tunnel, so networks along the way, such as public Wi-Fi or your internet provider, cannot read its contents, and websites see the VPN server’s IP address instead of yours.',
      },
      {
        question: 'What does a VPN protect me from?',
        answer:
          'A VPN protects data in transit between your device and the VPN server. It helps on untrusted networks like public Wi-Fi, hides the sites you visit from your internet provider, and masks your IP address from the websites you visit.',
      },
      {
        question: 'What does a VPN not protect me from?',
        answer:
          'A VPN does not make you anonymous and is not antivirus. It does not stop phishing, malware you download, weak passwords, or tracking by websites you sign in to. It also does not protect anything once traffic leaves the VPN server for the wider internet — HTTPS still matters. Our Security page explains this in detail.',
      },
      {
        question: 'Is using a VPN legal?',
        answer:
          'Using a VPN is legal in the United States and most countries, but some countries restrict or ban VPN use. Check the laws where you are, and never use a VPN for illegal activity — see our Acceptable Use Policy.',
      },
    ],
  },
  {
    id: 'app',
    title: 'The WHOLNEX app',
    items: [
      {
        question: 'Which devices are supported?',
        answer:
          'The WHOLNEX VPN app is currently available for Windows. Other platforms are not yet available; if you need one, let us know through the contact form so we can tell you when that changes.',
      },
      {
        question: 'How do I install the app?',
        answer:
          'Download the installer from the Download page, run it, and follow the prompts. Installing a VPN usually requires administrator rights because it adds a network driver to Windows. You can compare the file’s SHA-256 checksum with the one on the Download page to confirm it was not altered.',
      },
      {
        question: 'Will a VPN slow down my connection?',
        answer:
          'Encryption and the extra distance to a VPN server add some overhead, so speeds can be somewhat lower than without a VPN. Connecting to a nearby server usually gives the best results. Actual speeds depend on your connection and the server you use.',
      },
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy & security',
    items: [
      {
        question: 'Does WHOLNEX keep logs?',
        answer:
          'What WHOLNEX collects and retains about VPN connections will be stated in the WHOLNEX Privacy Policy. Until that policy is published, contact us with any questions — we will not make privacy claims on this website that are not written into our policies.',
      },
      {
        question: 'Which VPN protocols and encryption are used?',
        answer:
          'Modern VPNs typically use protocols such as WireGuard, OpenVPN, or IKEv2 with strong, widely reviewed encryption. The specific protocols used by the WHOLNEX app will be published on our Network page once confirmed.',
      },
      {
        question: 'What is a kill switch?',
        answer:
          'A kill switch blocks internet traffic if the VPN connection drops unexpectedly, so nothing is sent outside the encrypted tunnel by accident. Our Security page lists which protections are included in the WHOLNEX app once they are confirmed.',
      },
    ],
  },
  {
    id: 'billing-support',
    title: 'Plans, billing & support',
    items: [
      {
        question: 'How much does WHOLNEX VPN cost?',
        answer:
          'WHOLNEX has not yet published plan prices on this website. Choose a plan on the Pricing page to request details, and WHOLNEX will confirm the price and billing period with you in writing. Nothing on this website creates a purchase or a charge.',
      },
      {
        question: 'Do you offer plans for teams and businesses?',
        answer:
          'Yes — the Team and Business tiers are designed for organizations. Tell us how many users you have and which devices they use, and WHOLNEX will reply with the plan details it can confirm.',
      },
      {
        question: 'Can I get a refund?',
        answer:
          'Refund and cancellation terms will be set out in the WHOLNEX Refund Policy. Until it is published, ask our sales team before you subscribe.',
      },
      {
        question: 'How do I get help?',
        answer:
          'Use the contact form and choose “Technical support”. Include your Windows version and what you see on screen, and the team will reply by email.',
      },
    ],
  },
];

export const ALL_FAQS: FaqItem[] = FAQ_GROUPS.flatMap((group) => group.items);

/** Selected questions shown on the homepage. */
export const HOME_FAQS: FaqItem[] = [
  'What is a VPN?',
  'What does a VPN not protect me from?',
  'Which devices are supported?',
  'Does WHOLNEX keep logs?',
  'How much does WHOLNEX VPN cost?',
].map((q) => ALL_FAQS.find((item) => item.question === q)!);

export const BILLING_FAQS: FaqItem[] = FAQ_GROUPS.find((group) => group.id === 'billing-support')!.items;
