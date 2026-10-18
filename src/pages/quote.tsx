import { useSearchParams } from 'react-router-dom';
import {
  operatingSystemPreferences,
  quotePlanInterests,
  vpsWorkloads,
  type OperatingSystemPreference,
  type QuotePlanInterest,
  type VpsWorkload,
} from '@wholnex/shared';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { QuoteForm } from '@/components/quote-form';

function pick<T extends string>(allowed: readonly T[], value: string | null): T | undefined {
  return value && (allowed as readonly string[]).includes(value) ? (value as T) : undefined;
}

export function QuotePage() {
  const [params] = useSearchParams();
  const defaults = {
    planInterest: pick<QuotePlanInterest>(quotePlanInterests, params.get('plan')),
    operatingSystem: pick<OperatingSystemPreference>(operatingSystemPreferences, params.get('os')),
    workload: pick<VpsWorkload>(vpsWorkloads, params.get('workload')),
  };

  return (
    <>
      <Seo
        title="Configure a VPS — Request a Quote"
        description="Configure a WHOLNEX virtual private server: choose a plan tier, operating system, and resources, then request a written quote with confirmed specifications and pricing."
        path="/quote"
      />
      <PageHero
        size="compact"
        eyebrow="VPS configurator"
        breadcrumbs={[
          { name: 'Pricing', path: '/pricing' },
          { name: 'Request a quote', path: '/quote' },
        ]}
        title="Configure your VPS"
        description="Tell us what you plan to run. The WHOLNEX team replies by email with the specifications, region, and price we can confirm — nothing is provisioned or charged until you approve."
      />
      <section className="container-page py-14 sm:py-20">
        {/* Remount when query params change so presets apply after in-app navigation. */}
        <QuoteForm key={params.toString()} defaults={defaults} />
      </section>
    </>
  );
}

export default QuotePage;
