import { useSearchParams } from 'react-router-dom';
import { quotePlanInterests, vpnUseCases, type QuotePlanInterest, type VpnUseCase } from '@wholnex/shared';
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
    useCase: pick<VpnUseCase>(vpnUseCases, params.get('use')),
  };

  return (
    <>
      <Seo
        title="Request a VPN Plan"
        description="Request a WHOLNEX VPN plan for yourself or your team. Tell us how many users and which devices you need, and WHOLNEX will confirm plan details and pricing in writing."
        path="/quote"
      />
      <PageHero
        size="compact"
        eyebrow="Plan request"
        breadcrumbs={[
          { name: 'Pricing', path: '/pricing' },
          { name: 'Request a plan', path: '/quote' },
        ]}
        title="Request a VPN plan"
        description="Tell us who needs protection and on which devices. The WHOLNEX team replies by email with the plan details and pricing we can confirm — nothing is charged until you agree."
      />
      <section className="container-page py-14 sm:py-20">
        {/* Remount when query params change so presets apply after in-app navigation. */}
        <QuoteForm key={params.toString()} defaults={defaults} />
      </section>
    </>
  );
}

export default QuotePage;
