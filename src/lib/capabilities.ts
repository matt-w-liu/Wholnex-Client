/**
 * Capability registry — the single place that records which infrastructure, security, and
 * support features WHOLNEX has CONFIRMED as part of its service.
 *
 * Every capability starts as `confirmed: false`. Pages describe these topics educationally and
 * explain that availability is confirmed in each written quote. When WHOLNEX confirms a feature,
 * flip it to `true` (with an optional `detail`) and the site shows an "Included" badge.
 *
 * Never mark a capability confirmed on the basis of competitor research or assumptions.
 */

export interface Capability {
  id: string;
  title: string;
  description: string;
  confirmed: boolean;
  /** Customer-facing detail shown once confirmed (e.g. "Daily, 7-day retention"). */
  detail?: string;
}

export const INFRASTRUCTURE_CAPABILITIES: Capability[] = [
  {
    id: 'kvm-virtualization',
    title: 'Hardware virtualization',
    description:
      'Each VPS runs as an isolated virtual machine with its own kernel, file system, and allocated resources on shared physical hardware.',
    confirmed: false,
  },
  {
    id: 'nvme-storage',
    title: 'SSD / NVMe storage',
    description:
      'Solid-state storage, and NVMe in particular, delivers far lower latency than spinning disks for databases and busy file systems.',
    confirmed: false,
  },
  {
    id: 'ipv6',
    title: 'IPv4 and IPv6 networking',
    description: 'Public IP addressing for inbound services, with IPv6 alongside IPv4 where supported.',
    confirmed: false,
  },
  {
    id: 'snapshots',
    title: 'Snapshots',
    description: 'Point-in-time images of a server’s disk, useful before upgrades or risky changes.',
    confirmed: false,
  },
  {
    id: 'backups',
    title: 'Scheduled backups',
    description: 'Automated, recurring copies of server data kept separately from the running server.',
    confirmed: false,
  },
  {
    id: 'resizing',
    title: 'Resource upgrades',
    description: 'Moving a server to a larger CPU, memory, or storage allocation as a workload grows.',
    confirmed: false,
  },
  {
    id: 'monitoring',
    title: 'Resource monitoring',
    description: 'Visibility into CPU, memory, disk, and network usage to catch problems before users do.',
    confirmed: false,
  },
  {
    id: 'console-access',
    title: 'Out-of-band console',
    description: 'Browser-based console access that works even when SSH or networking is misconfigured.',
    confirmed: false,
  },
];

export const SECURITY_CAPABILITIES: Capability[] = [
  {
    id: 'tenant-isolation',
    title: 'Guest isolation',
    description: 'Hypervisor-level separation between customer virtual machines on the same physical host.',
    confirmed: false,
  },
  {
    id: 'network-firewall',
    title: 'Network-level firewall',
    description: 'Provider-side filtering rules applied before traffic reaches the server.',
    confirmed: false,
  },
  {
    id: 'ddos-mitigation',
    title: 'DDoS mitigation',
    description: 'Detection and filtering of volumetric attacks at the network edge.',
    confirmed: false,
  },
  {
    id: 'ssh-key-provisioning',
    title: 'SSH key provisioning',
    description: 'Installing your public SSH key at deployment so password login can be disabled from day one.',
    confirmed: false,
  },
  {
    id: 'physical-security',
    title: 'Physical facility security',
    description: 'Access-controlled data center facilities operated by the hosting facility provider.',
    confirmed: false,
  },
];

/**
 * Published hosting regions. Empty until WHOLNEX confirms where servers are hosted.
 * The company's business address (Van Buren, Missouri) is NOT a hosting region.
 */
export interface HostingRegion {
  id: string;
  name: string;
  country: string;
}

export const HOSTING_REGIONS: HostingRegion[] = [];

export function confirmedCount(capabilities: Capability[]): number {
  return capabilities.filter((capability) => capability.confirmed).length;
}
