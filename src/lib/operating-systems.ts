import type { OperatingSystemPreference } from '@wholnex/shared';

export type OperatingSystemId = Exclude<OperatingSystemPreference, 'other' | 'not-sure'>;

export interface OperatingSystemOption {
  id: OperatingSystemId;
  name: string;
  family: 'Linux' | 'Windows';
  summary: string;
  goodFor: string[];
  packageManager: string;
  sampleCommand: string;
  note?: string;
}

/**
 * Operating systems commonly run on VPS hosting. This list describes the OS options customers
 * can request. Image availability for a given WHOLNEX server is confirmed with each quote —
 * do not present any entry as guaranteed until WHOLNEX publishes its image catalog.
 */
export const OPERATING_SYSTEMS: OperatingSystemOption[] = [
  {
    id: 'ubuntu',
    name: 'Ubuntu Server',
    family: 'Linux',
    summary:
      'A widely used Linux distribution with long-term support (LTS) releases, extensive documentation, and a large package ecosystem.',
    goodFor: ['Web stacks (Nginx, Apache, Node.js, PHP)', 'Docker and container hosts', 'Developers new to Linux servers'],
    packageManager: 'apt',
    sampleCommand: 'sudo apt update && sudo apt upgrade -y',
  },
  {
    id: 'debian',
    name: 'Debian',
    family: 'Linux',
    summary:
      'A conservative, stability-focused distribution known for predictable releases and a minimal default footprint.',
    goodFor: ['Long-running production services', 'Minimal, low-overhead servers', 'Mail, DNS, and proxy servers'],
    packageManager: 'apt',
    sampleCommand: 'sudo apt update && sudo apt full-upgrade',
  },
  {
    id: 'rocky-linux',
    name: 'Rocky Linux',
    family: 'Linux',
    summary:
      'A community enterprise Linux distribution designed to be compatible with Red Hat Enterprise Linux (RHEL).',
    goodFor: ['RHEL-compatible business software', 'SELinux-based hardening', 'Teams standardized on dnf/yum'],
    packageManager: 'dnf',
    sampleCommand: 'sudo dnf upgrade --refresh',
  },
  {
    id: 'almalinux',
    name: 'AlmaLinux',
    family: 'Linux',
    summary:
      'A community-governed, RHEL-compatible distribution with long support lifecycles for enterprise workloads.',
    goodFor: ['Control panels that require RHEL compatibility', 'Enterprise application servers', 'Long lifecycle deployments'],
    packageManager: 'dnf',
    sampleCommand: 'sudo dnf update',
  },
  {
    id: 'windows-server',
    name: 'Windows Server',
    family: 'Windows',
    summary:
      'Microsoft’s server operating system for .NET applications, IIS, and Windows-specific business software, administered over Remote Desktop.',
    goodFor: ['.NET Framework and IIS applications', 'Windows-only line-of-business software', 'Remote Desktop workloads'],
    packageManager: 'Windows Update / PowerShell',
    sampleCommand: 'sconfig',
    note: 'Windows Server requires Microsoft licensing. Whether and how a license can be provided is discussed with WHOLNEX during quoting — it is not included by default.',
  },
];
