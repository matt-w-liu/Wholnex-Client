import type { VpsPlanId } from '@wholnex/shared';
import type { OperatingSystemId } from '@/lib/operating-systems';

/**
 * Centralized VPS plan configuration.
 *
 * WHOLNEX has not yet published authoritative plan specifications or prices. Every plan's
 * `confirmed` data is therefore `null`, and the site presents each tier as a starting point
 * for a quote ("Request a quote") instead of a purchasable product.
 *
 * To publish a plan: fill in `confirmed.specs` and/or `confirmed.pricing` with values approved
 * by WHOLNEX. The pricing cards, comparison table, and billing toggle pick them up automatically.
 *
 * DRAFT_PLAN_DATA below exists only so designers and developers can preview a fully populated
 * layout. It is shown only in development builds with VITE_SHOW_DRAFT_PLAN_DATA=true and is
 * always labeled as draft. Production builds never read it.
 */

export type StorageType = 'NVMe SSD' | 'SSD';

export interface PlanSpecs {
  vcpu: number;
  memoryGb: number;
  storageGb: number;
  storageType: StorageType;
  transferTb: number;
  networkPortGbps: number;
  ipv4Addresses: number;
  ipv6: boolean;
  backups: string;
  management: string;
  regions: string[];
  operatingSystems: OperatingSystemId[];
}

export interface PlanPricing {
  monthlyUsd: number;
  /** Effective monthly price when billed annually. Leave undefined unless annual billing exists. */
  annualMonthlyUsd?: number;
}

export interface VpsPlan {
  id: VpsPlanId;
  name: string;
  tagline: string;
  summary: string;
  idealFor: string[];
  /** Relative resource tier used for presentation only (1 = smallest). */
  tier: 1 | 2 | 3 | 4;
  tierLabel: string;
  highlighted?: boolean;
  confirmed: {
    specs: PlanSpecs | null;
    pricing: PlanPricing | null;
  };
}

export const VPS_PLANS: VpsPlan[] = [
  {
    id: 'starter',
    name: 'Starter VPS',
    tagline: 'A focused first server',
    summary: 'An entry-level configuration for a single website, a personal project, or a first step up from shared hosting.',
    idealFor: ['Personal and small business websites', 'Learning Linux administration', 'Lightweight bots and scripts'],
    tier: 1,
    tierLabel: 'Entry',
    confirmed: { specs: null, pricing: null },
  },
  {
    id: 'standard',
    name: 'Standard VPS',
    tagline: 'Balanced everyday hosting',
    summary: 'A balanced allocation for production websites, small applications, and development environments.',
    idealFor: ['WordPress and CMS sites', 'Staging and development servers', 'Small web applications'],
    tier: 2,
    tierLabel: 'Moderate',
    highlighted: true,
    confirmed: { specs: null, pricing: null },
  },
  {
    id: 'performance',
    name: 'Performance VPS',
    tagline: 'More headroom for busy workloads',
    summary: 'Higher CPU and memory allocations for application backends, databases, and CI workloads.',
    idealFor: ['API services and backends', 'Databases with active traffic', 'Build and CI runners'],
    tier: 3,
    tierLabel: 'High',
    confirmed: { specs: null, pricing: null },
  },
  {
    id: 'business',
    name: 'Business VPS',
    tagline: 'Capacity for critical services',
    summary: 'The largest standard tier, intended for business applications and multi-service deployments.',
    idealFor: ['Business applications and ERPs', 'Containerized multi-service stacks', 'Higher-traffic e-commerce'],
    tier: 4,
    tierLabel: 'Highest',
    confirmed: { specs: null, pricing: null },
  },
];

// ---------------------------------------------------------------------------------------------
// DRAFT data — development preview only. NOT WHOLNEX offerings or prices.
// ---------------------------------------------------------------------------------------------

const DRAFT_PLAN_DATA: Record<VpsPlanId, { specs: PlanSpecs; pricing: PlanPricing }> = {
  starter: {
    specs: {
      vcpu: 1,
      memoryGb: 2,
      storageGb: 40,
      storageType: 'NVMe SSD',
      transferTb: 1,
      networkPortGbps: 1,
      ipv4Addresses: 1,
      ipv6: true,
      backups: 'Optional add-on',
      management: 'Self-managed',
      regions: ['To be confirmed'],
      operatingSystems: ['ubuntu', 'debian', 'rocky-linux', 'almalinux'],
    },
    pricing: { monthlyUsd: 6 },
  },
  standard: {
    specs: {
      vcpu: 2,
      memoryGb: 4,
      storageGb: 80,
      storageType: 'NVMe SSD',
      transferTb: 2,
      networkPortGbps: 1,
      ipv4Addresses: 1,
      ipv6: true,
      backups: 'Optional add-on',
      management: 'Self-managed',
      regions: ['To be confirmed'],
      operatingSystems: ['ubuntu', 'debian', 'rocky-linux', 'almalinux'],
    },
    pricing: { monthlyUsd: 12 },
  },
  performance: {
    specs: {
      vcpu: 4,
      memoryGb: 8,
      storageGb: 160,
      storageType: 'NVMe SSD',
      transferTb: 4,
      networkPortGbps: 1,
      ipv4Addresses: 1,
      ipv6: true,
      backups: 'Optional add-on',
      management: 'Self-managed',
      regions: ['To be confirmed'],
      operatingSystems: ['ubuntu', 'debian', 'rocky-linux', 'almalinux', 'windows-server'],
    },
    pricing: { monthlyUsd: 24 },
  },
  business: {
    specs: {
      vcpu: 8,
      memoryGb: 16,
      storageGb: 320,
      storageType: 'NVMe SSD',
      transferTb: 6,
      networkPortGbps: 1,
      ipv4Addresses: 1,
      ipv6: true,
      backups: 'Optional add-on',
      management: 'Self-managed',
      regions: ['To be confirmed'],
      operatingSystems: ['ubuntu', 'debian', 'rocky-linux', 'almalinux', 'windows-server'],
    },
    pricing: { monthlyUsd: 48 },
  },
};

export type PlanDataSource = 'confirmed' | 'draft' | 'unavailable';

export interface ResolvedPlan extends VpsPlan {
  specs: PlanSpecs | null;
  pricing: PlanPricing | null;
  source: PlanDataSource;
}

/** True only in a development build with the explicit preview flag. */
export function isDraftPreviewEnabled(): boolean {
  return import.meta.env.DEV && import.meta.env.VITE_SHOW_DRAFT_PLAN_DATA === 'true';
}

export function resolvePlan(plan: VpsPlan): ResolvedPlan {
  if (plan.confirmed.specs || plan.confirmed.pricing) {
    return { ...plan, specs: plan.confirmed.specs, pricing: plan.confirmed.pricing, source: 'confirmed' };
  }
  if (isDraftPreviewEnabled()) {
    const draft = DRAFT_PLAN_DATA[plan.id];
    return { ...plan, specs: draft.specs, pricing: draft.pricing, source: 'draft' };
  }
  return { ...plan, specs: null, pricing: null, source: 'unavailable' };
}

export function getResolvedPlans(): ResolvedPlan[] {
  return VPS_PLANS.map(resolvePlan);
}

/** A monthly/annual toggle is only meaningful when every plan publishes both prices. */
export function hasAnnualPricing(plans: ResolvedPlan[]): boolean {
  return plans.length > 0 && plans.every((plan) => plan.pricing?.annualMonthlyUsd !== undefined);
}

export function getPlanById(id: string | null | undefined): VpsPlan | undefined {
  return VPS_PLANS.find((plan) => plan.id === id);
}

/** Starting values for the quote configurator, by tier. Suggestions only — the visitor edits them. */
export const PLAN_STARTING_POINTS: Record<VpsPlanId, { vcpu: number; memoryGb: number; storageGb: number }> = {
  starter: { vcpu: 1, memoryGb: 2, storageGb: 40 },
  standard: { vcpu: 2, memoryGb: 4, storageGb: 80 },
  performance: { vcpu: 4, memoryGb: 8, storageGb: 160 },
  business: { vcpu: 8, memoryGb: 16, storageGb: 320 },
};

export interface SpecRow {
  key: string;
  label: string;
  value: (specs: PlanSpecs) => string;
}

export const SPEC_ROWS: SpecRow[] = [
  { key: 'vcpu', label: 'vCPU', value: (s) => `${s.vcpu} vCPU` },
  { key: 'memory', label: 'Memory', value: (s) => `${s.memoryGb} GB RAM` },
  { key: 'storage', label: 'Storage', value: (s) => `${s.storageGb} GB ${s.storageType}` },
  { key: 'transfer', label: 'Data transfer', value: (s) => `${s.transferTb} TB / month` },
  { key: 'network', label: 'Network port', value: (s) => `${s.networkPortGbps} Gbps` },
  {
    key: 'ip',
    label: 'IP allocation',
    value: (s) => `${s.ipv4Addresses} IPv4${s.ipv6 ? ' + IPv6' : ''}`,
  },
  { key: 'backups', label: 'Backups', value: (s) => s.backups },
  { key: 'management', label: 'Management', value: (s) => s.management },
  { key: 'regions', label: 'Region', value: (s) => s.regions.join(', ') },
];

/** What a WHOLNEX quote confirms in writing, shown when a plan has no published spec sheet. */
export const QUOTE_CONFIRMS: string[] = [
  'vCPU and memory allocation',
  'Storage capacity and type',
  'Monthly data transfer and port speed',
  'IPv4 / IPv6 allocation',
  'Operating system image',
  'Backup options',
  'Management level',
  'Hosting region',
];
