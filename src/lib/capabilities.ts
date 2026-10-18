/**
 * Capability registry — the single place that records which VPN, privacy, and security features
 * WHOLNEX has CONFIRMED as part of its service and app.
 *
 * Every capability starts as `confirmed: false`. Pages describe these topics educationally and
 * explain that availability is confirmed by WHOLNEX. When a feature is confirmed (and present in
 * the shipping app), flip it to `true` (with an optional `detail`) and the site shows an
 * "Included" badge.
 *
 * Never mark a capability confirmed on the basis of competitor research or assumptions. Privacy
 * claims such as a no-logs policy should only be confirmed when the Privacy Policy states them
 * and, ideally, an independent audit supports them.
 */

export interface Capability {
  id: string;
  title: string;
  description: string;
  confirmed: boolean;
  /** Customer-facing detail shown once confirmed (e.g. "WireGuard, OpenVPN"). */
  detail?: string;
}

export const NETWORK_CAPABILITIES: Capability[] = [
  {
    id: 'encrypted-tunnel',
    title: 'Encrypted tunnel',
    description:
      'Traffic between your device and the VPN server travels inside an encrypted tunnel, so networks along the way cannot read it.',
    confirmed: false,
  },
  {
    id: 'modern-protocols',
    title: 'Modern VPN protocols',
    description: 'Established protocols such as WireGuard, OpenVPN, or IKEv2 define how the tunnel is created and encrypted.',
    confirmed: false,
  },
  {
    id: 'server-locations',
    title: 'Multiple server locations',
    description: 'A choice of server regions lets you connect through a location near you for speed or where you need to appear.',
    confirmed: false,
  },
  {
    id: 'ipv6-handling',
    title: 'IPv6 handling',
    description: 'IPv6 traffic is either tunneled or blocked so it cannot bypass the VPN connection.',
    confirmed: false,
  },
  {
    id: 'auto-connect',
    title: 'Auto-connect on untrusted Wi-Fi',
    description: 'The app connects automatically when you join a network you have not marked as trusted.',
    confirmed: false,
  },
  {
    id: 'split-tunneling',
    title: 'Split tunneling',
    description: 'Choose which apps or destinations use the VPN and which use your regular connection.',
    confirmed: false,
  },
  {
    id: 'dedicated-ip',
    title: 'Dedicated IP',
    description: 'A static address reserved for your account, useful for allow-listing with business systems.',
    confirmed: false,
  },
  {
    id: 'team-management',
    title: 'Team management',
    description: 'A central place to add and remove users and see which seats are in use.',
    confirmed: false,
  },
];

export const SECURITY_CAPABILITIES: Capability[] = [
  {
    id: 'kill-switch',
    title: 'Kill switch',
    description: 'Blocks internet traffic if the VPN connection drops, so data is never sent outside the tunnel by accident.',
    confirmed: false,
  },
  {
    id: 'dns-leak-protection',
    title: 'DNS leak protection',
    description: 'Routes DNS lookups through the tunnel so your internet provider cannot see which sites you look up.',
    confirmed: false,
  },
  {
    id: 'no-logs',
    title: 'No-activity-logs policy',
    description: 'A written commitment not to record the sites you visit or the content of your traffic.',
    confirmed: false,
  },
  {
    id: 'independent-audit',
    title: 'Independent audit',
    description: 'A third-party review of the app, infrastructure, or privacy practices, with a published report.',
    confirmed: false,
  },
  {
    id: 'signed-app',
    title: 'Code-signed app',
    description: 'Digitally signed installers so your operating system can verify the app came from WHOLNEX unaltered.',
    confirmed: false,
  },
];

/**
 * Published VPN server locations. Empty until WHOLNEX confirms them.
 * The company's business address (Van Buren, Missouri) is NOT a server location.
 */
export interface ServerLocation {
  id: string;
  city: string;
  country: string;
}

export const SERVER_LOCATIONS: ServerLocation[] = [];

export function confirmedCount(capabilities: Capability[]): number {
  return capabilities.filter((capability) => capability.confirmed).length;
}
