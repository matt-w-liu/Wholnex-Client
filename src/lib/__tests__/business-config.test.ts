import { afterEach, describe, expect, it, vi } from 'vitest';
import { getResolvedPlans, hasAnnualPricing, resolvePlan, VPS_PLANS, type ResolvedPlan } from '@/lib/vps-plans';
import { INFRASTRUCTURE_CAPABILITIES, SECURITY_CAPABILITIES, HOSTING_REGIONS } from '@/lib/capabilities';
import { LEGAL_DOCUMENTS } from '@/lib/legal';
import { COMPANY, COMPANY_ADDRESS_LINES } from '@/lib/constants';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('company configuration', () => {
  it('uses the confirmed WHOLNEX facts', () => {
    expect(COMPANY.name).toBe('WHOLNEX LLC');
    expect(COMPANY.url).toBe('https://wholnex.org');
    expect(COMPANY.ceo).toEqual({ name: 'Ravindra Kuvar', title: 'Chief Executive Officer' });
    expect(COMPANY.publicEmail).toBe('support@wholnex.org');
    expect(COMPANY_ADDRESS_LINES).toEqual([
      '1333 COUNTY ROAD 565',
      'VAN BUREN, MO 63965',
      'United States of America',
    ]);
  });
});

describe('VPS plan configuration', () => {
  it('defines the four presentation tiers', () => {
    expect(VPS_PLANS.map((plan) => plan.id)).toEqual(['starter', 'standard', 'performance', 'business']);
  });

  it('prefers confirmed data over draft data', () => {
    vi.stubEnv('VITE_SHOW_DRAFT_PLAN_DATA', 'true');
    vi.stubEnv('DEV', true);
    const confirmed = resolvePlan({ ...VPS_PLANS[0], confirmed: { specs: null, pricing: { monthlyUsd: 9 } } });
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
    expect(resolvePlan(VPS_PLANS[0]).source).toBe('unavailable');
  });

  it('labels draft data as draft when previewing in development', () => {
    vi.stubEnv('VITE_SHOW_DRAFT_PLAN_DATA', 'true');
    vi.stubEnv('DEV', true);
    const plan = resolvePlan(VPS_PLANS[1]);
    expect(plan.source).toBe('draft');
    expect(plan.specs).not.toBeNull();
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
    for (const capability of [...INFRASTRUCTURE_CAPABILITIES, ...SECURITY_CAPABILITIES]) {
      expect(capability.title.length).toBeGreaterThan(0);
      expect(capability.description.length).toBeGreaterThan(0);
    }
  });

  it('never lists the business address as a hosting region', () => {
    for (const region of HOSTING_REGIONS) {
      expect(region.name.toLowerCase()).not.toContain('van buren');
    }
  });

  it('requires an effective date on any approved legal document', () => {
    for (const doc of Object.values(LEGAL_DOCUMENTS)) {
      if (doc.status === 'approved') expect(doc.effectiveDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
