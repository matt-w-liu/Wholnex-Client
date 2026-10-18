import { afterEach, describe, expect, it, vi } from 'vitest';
import { getResolvedPlans, hasAnnualPricing, resolvePlan, VPN_PLANS, type ResolvedPlan } from '@/lib/vpn-plans';
import { NETWORK_CAPABILITIES, SECURITY_CAPABILITIES, SERVER_LOCATIONS } from '@/lib/capabilities';
import { APP_DOWNLOADS } from '@/lib/download';
import { PLATFORMS } from '@/lib/platforms';
import { LEGAL_DOCUMENTS } from '@/lib/legal';
import { COMPANY, COMPANY_ADDRESS_LINES } from '@/lib/constants';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('company configuration', () => {
  it('uses the confirmed WHOLNEX facts', () => {
    expect(COMPANY.name).toBe('WHOLNEX LLC');
    expect(COMPANY.url).toBe('https://wholnex.net');
    expect(COMPANY.ceo).toEqual({ name: 'Ravindra Kuvar', title: 'Chief Executive Officer' });
    expect(COMPANY.publicEmail).toBe('support@wholnex.net');
    expect(COMPANY_ADDRESS_LINES).toEqual([
      '1333 COUNTY ROAD 565',
      'VAN BUREN, MO 63965',
      'United States of America',
    ]);
  });
});

describe('VPN plan configuration', () => {
  it('defines the four presentation tiers', () => {
    expect(VPN_PLANS.map((plan) => plan.id)).toEqual(['personal', 'plus', 'team', 'business']);
  });

  it('prefers confirmed data over draft data', () => {
    vi.stubEnv('VITE_SHOW_DRAFT_PLAN_DATA', 'true');
    vi.stubEnv('DEV', true);
    const confirmed = resolvePlan({ ...VPN_PLANS[0], confirmed: { features: null, pricing: { monthlyUsd: 9 } } });
    expect(confirmed.source).toBe('confirmed');
    expect(confirmed.pricing?.monthlyUsd).toBe(9);
  });

  it('never exposes draft data unless the explicit development flag is set', () => {
    vi.stubEnv('VITE_SHOW_DRAFT_PLAN_DATA', 'false');
    for (const plan of getResolvedPlans()) {
      expect(plan.source).not.toBe('draft');
    }
  });

  it('never exposes draft data in a production build, even with the flag', () => {
    vi.stubEnv('VITE_SHOW_DRAFT_PLAN_DATA', 'true');
    vi.stubEnv('DEV', false);
    expect(resolvePlan(VPN_PLANS[0]).source).toBe('unavailable');
  });

  it('labels draft data as draft when previewing in development', () => {
    vi.stubEnv('VITE_SHOW_DRAFT_PLAN_DATA', 'true');
    vi.stubEnv('DEV', true);
    const plan = resolvePlan(VPN_PLANS[1]);
    expect(plan.source).toBe('draft');
    expect(plan.features).not.toBeNull();
  });

  it('only enables the billing toggle when every plan has annual pricing', () => {
    const base = getResolvedPlans().map((plan) => ({ ...plan, pricing: { monthlyUsd: 10 } }));
    expect(hasAnnualPricing(base)).toBe(false);

    const withAnnual: ResolvedPlan[] = base.map((plan) => ({
      ...plan,
      pricing: { monthlyUsd: 10, annualMonthlyUsd: 8 },
    }));
    expect(hasAnnualPricing(withAnnual)).toBe(true);

    withAnnual[2] = { ...withAnnual[2], pricing: { monthlyUsd: 10 } };
    expect(hasAnnualPricing(withAnnual)).toBe(false);
  });
});

describe('capability and legal guardrails', () => {
  it('gives every capability a title and description', () => {
    for (const capability of [...NETWORK_CAPABILITIES, ...SECURITY_CAPABILITIES]) {
      expect(capability.title.length).toBeGreaterThan(0);
      expect(capability.description.length).toBeGreaterThan(0);
    }
  });

  it('never lists the business address as a VPN server location', () => {
    for (const location of SERVER_LOCATIONS) {
      expect(location.city.toLowerCase()).not.toContain('van buren');
    }
  });

  it('only marks a platform available when a real download exists for it', () => {
    for (const platform of PLATFORMS) {
      expect(platform.available).toBe(APP_DOWNLOADS.some((download) => download.platform === platform.id));
    }
  });

  it('publishes a well-formed checksum and same-origin or https URL for every download', () => {
    for (const download of APP_DOWNLOADS) {
      expect(download.sha256).toMatch(/^[0-9a-f]{64}$/);
      expect(download.url.startsWith('/') || download.url.startsWith('https://')).toBe(true);
    }
  });

  it('requires an effective date on any approved legal document', () => {
    for (const doc of Object.values(LEGAL_DOCUMENTS)) {
      if (doc.status === 'approved') expect(doc.effectiveDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
