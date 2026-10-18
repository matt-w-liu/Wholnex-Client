import type { VpnPlanId } from '@wholnex/shared';

/**
 * Centralized VPN plan configuration.
 *
 * WHOLNEX has not yet published authoritative plan features or prices. Every plan's `confirmed`
 * data is therefore `null`, and the site presents each tier as a starting point ("Request a
 * quote" / "Talk to sales") rather than a purchasable subscription.
 *
 * To publish a plan: fill in `confirmed.features` and/or `confirmed.pricing` with values approved
 * by WHOLNEX. The pricing cards, comparison table, and billing toggle pick them up automatically.
 *
 * DRAFT_PLAN_DATA below exists only so designers and developers can preview a fully populated
 * layout. It is shown only in development builds with VITE_SHOW_DRAFT_PLAN_DATA=true and is
 * always labeled as draft. Production builds never read it.
 */

export interface PlanFeatures {
  /** Devices that can be connected at the same time per account / user. */
  simultaneousDevices: number;
  dataAllowance: string;
  serverLocations: string;
  protocols: string;
  platforms: string;
  dedicatedIp: string;
  teamManagement: string;
  support: string;
}

export interface PlanPricing {
  monthlyUsd: number;
  /** Effective monthly price when billed annually. Leave undefined unless annual billing exists. */
  annualMonthlyUsd?: number;
  /** "per user" for team plans; omitted for single-account plans. */
  unit?: string;
}

export interface VpnPlan {
  id: VpnPlanId;
  name: string;
  tagline: string;
  summary: string;
  idealFor: string[];
  audience: 'individual' | 'team';
  /** Relative coverage tier used for presentation only (1 = smallest). */
  tier: 1 | 2 | 3 | 4;
  tierLabel: string;
  highlighted?: boolean;
  confirmed: {
    features: PlanFeatures | null;
    pricing: PlanPricing | null;
  };
}

export const VPN_PLANS: VpnPlan[] = [
  {
    id: 'personal',
    name: 'Personal VPN',
    tagline: 'Private browsing for one person',
    summary: 'For individuals who want an encrypted connection on their own computer, at home or on public Wi-Fi.',
    idealFor: ['Public Wi-Fi at cafés and airports', 'Everyday browsing privacy', 'A single Windows PC'],
    audience: 'individual',
    tier: 1,
    tierLabel: 'Individual',
    confirmed: { features: null, pricing: null },
  },
  {
    id: 'plus',
    name: 'Plus VPN',
    tagline: 'More devices, more coverage',
    summary: 'For people who want protection across several of their own devices.',
    idealFor: ['Several personal devices', 'Frequent travelers', 'Households with shared needs'],
    audience: 'individual',
    tier: 2,
    tierLabel: 'Multi-device',
    highlighted: true,
    confirmed: { features: null, pricing: null },
  },
  {
    id: 'team',
    name: 'Team VPN',
    tagline: 'Secure access for small teams',
    summary: 'For small teams that need consistent, encrypted connections for remote and traveling staff.',
    idealFor: ['Remote and hybrid staff', 'Small offices', 'Contractors working off-site'],
    audience: 'team',
    tier: 3,
    tierLabel: 'Team',
    confirmed: { features: null, pricing: null },
  },
  {
    id: 'business',
    name: 'Business VPN',
    tagline: 'Managed access for organizations',
    summary: 'For organizations that need more users, central management, and options tailored to their policies.',
    idealFor: ['Growing organizations', 'Distributed teams', 'Custom security requirements'],
    audience: 'team',
    tier: 4,
    tierLabel: 'Organization',
    confirmed: { features: null, pricing: null },
  },
];

// ---------------------------------------------------------------------------------------------
// DRAFT data — development preview only. NOT WHOLNEX offerings or prices.
// ---------------------------------------------------------------------------------------------

const DRAFT_PLAN_DATA: Record<VpnPlanId, { features: PlanFeatures; pricing: PlanPricing }> = {
  personal: {
    features: {
      simultaneousDevices: 1,
      dataAllowance: 'Draft',
      serverLocations: 'Draft',
      protocols: 'Draft',
      platforms: 'Windows',
      dedicatedIp: 'Not included',
      teamManagement: 'Not included',
      support: 'Email',
    },
    pricing: { monthlyUsd: 5 },
  },
  plus: {
    features: {
      simultaneousDevices: 5,
      dataAllowance: 'Draft',
      serverLocations: 'Draft',
      protocols: 'Draft',
      platforms: 'Windows',
      dedicatedIp: 'Optional add-on',
      teamManagement: 'Not included',
      support: 'Email',
    },
    pricing: { monthlyUsd: 9 },
  },
  team: {
    features: {
      simultaneousDevices: 3,
      dataAllowance: 'Draft',
      serverLocations: 'Draft',
      protocols: 'Draft',
      platforms: 'Windows',
      dedicatedIp: 'Optional add-on',
      teamManagement: 'Included',
      support: 'Priority email',
    },
    pricing: { monthlyUsd: 8, unit: 'per user' },
  },
  business: {
    features: {
      simultaneousDevices: 5,
      dataAllowance: 'Draft',
      serverLocations: 'Draft',
      protocols: 'Draft',
      platforms: 'Windows',
      dedicatedIp: 'Included',
      teamManagement: 'Included',
      support: 'Priority',
    },
    pricing: { monthlyUsd: 12, unit: 'per user' },
  },
};

export type PlanDataSource = 'confirmed' | 'draft' | 'unavailable';

export interface ResolvedPlan extends VpnPlan {
  features: PlanFeatures | null;
  pricing: PlanPricing | null;
  source: PlanDataSource;
}

/** True only in a development build with the explicit preview flag. */
export function isDraftPreviewEnabled(): boolean {
  return import.meta.env.DEV && import.meta.env.VITE_SHOW_DRAFT_PLAN_DATA === 'true';
}

export function resolvePlan(plan: VpnPlan): ResolvedPlan {
  if (plan.confirmed.features || plan.confirmed.pricing) {
    return { ...plan, features: plan.confirmed.features, pricing: plan.confirmed.pricing, source: 'confirmed' };
  }
  if (isDraftPreviewEnabled()) {
    const draft = DRAFT_PLAN_DATA[plan.id];
    return { ...plan, features: draft.features, pricing: draft.pricing, source: 'draft' };
  }
  return { ...plan, features: null, pricing: null, source: 'unavailable' };
}

export function getResolvedPlans(): ResolvedPlan[] {
  return VPN_PLANS.map(resolvePlan);
}

/** A monthly/annual toggle is only meaningful when every plan publishes both prices. */
export function hasAnnualPricing(plans: ResolvedPlan[]): boolean {
  return plans.length > 0 && plans.every((plan) => plan.pricing?.annualMonthlyUsd !== undefined);
}

export function getPlanById(id: string | null | undefined): VpnPlan | undefined {
  return VPN_PLANS.find((plan) => plan.id === id);
}

/** Suggested user counts for the request form, by tier. Suggestions only — the visitor edits them. */
export const PLAN_STARTING_USERS: Record<VpnPlanId, number> = {
  personal: 1,
  plus: 1,
  team: 5,
  business: 25,
};

export interface FeatureRow {
  key: keyof PlanFeatures;
  label: string;
  value: (features: PlanFeatures) => string;
}

export const FEATURE_ROWS: FeatureRow[] = [
  { key: 'simultaneousDevices', label: 'Devices', value: (f) => `${f.simultaneousDevices} at a time` },
  { key: 'dataAllowance', label: 'Data', value: (f) => f.dataAllowance },
  { key: 'serverLocations', label: 'Server locations', value: (f) => f.serverLocations },
  { key: 'protocols', label: 'Protocols', value: (f) => f.protocols },
  { key: 'platforms', label: 'Apps', value: (f) => f.platforms },
  { key: 'dedicatedIp', label: 'Dedicated IP', value: (f) => f.dedicatedIp },
  { key: 'teamManagement', label: 'Team management', value: (f) => f.teamManagement },
  { key: 'support', label: 'Support', value: (f) => f.support },
];

/** What WHOLNEX confirms in writing, shown while plans have no published feature sheet. */
export const QUOTE_CONFIRMS: string[] = [
  'Price and billing period',
  'Devices per account or user',
  'Data allowance',
  'Server locations',
  'Supported apps and platforms',
  'Connection protocols',
  'Logging and privacy terms',
  'Support coverage',
];
