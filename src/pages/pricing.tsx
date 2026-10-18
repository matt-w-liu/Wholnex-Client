import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, CheckCircle2, FlaskConical, Info, UserCog, Wrench } from 'lucide-react';
import { BILLING_FAQS } from '@/lib/content';
import { getResolvedPlans, hasAnnualPricing, QUOTE_CONFIRMS } from '@/lib/vps-plans';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { SectionHeading } from '@/components/section-heading';
import { PlanCard, type BillingPeriod } from '@/components/plan-card';
import { PlanComparisonTable } from '@/components/plan-comparison-table';
import { FaqAccordion } from '@/components/faq-accordion';
import { CtaBand } from '@/components/cta-band';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function PricingPage() {
  const plans = getResolvedPlans();
  const [billing, setBilling] = useState<BillingPeriod>('monthly');
  const showBillingToggle = hasAnnualPricing(plans);
  const anyPricing = plans.some((plan) => plan.pricing);
  const usingDraft = plans.some((plan) => plan.source === 'draft');

  return (
    <>
      <Seo
        title="VPS Plans & Pricing"
        description="Compare WHOLNEX VPS plan tiers — Starter, Standard, Performance, and Business — and request a written quote with confirmed specifications and pricing for your workload."
        path="/pricing"
      />
      <PageHero
        size="compact"
        eyebrow="VPS plans"
        breadcrumbs={[{ name: 'Pricing', path: '/pricing' }]}
        title="VPS plans built around your workload"
        description="Pick the tier closest to what you need. WHOLNEX replies with a written quote that confirms the exact resources, region, and price — before anything is provisioned or billed."
      />

      <section className="container-page py-16 sm:py-20">
        {usingDraft && (
          <Alert variant="warning" className="mb-8">
            <FlaskConical className="h-4 w-4" />
            <AlertTitle>Development preview — draft plan data</AlertTitle>
            <AlertDescription>
              Specifications and prices below are placeholders from DRAFT_PLAN_DATA, shown only because
              VITE_SHOW_DRAFT_PLAN_DATA is enabled in a development build. They are not WHOLNEX offerings and never
              appear in production.
            </AlertDescription>
          </Alert>
        )}
        {!anyPricing && (
          <Alert variant="info" className="mb-8">
            <Info className="h-4 w-4" />
            <AlertTitle>Pricing is provided by written quote</AlertTitle>
            <AlertDescription>
              WHOLNEX confirms specifications and pricing for each configuration individually. Choose a tier to
              start your request — there is no checkout and no charge until you approve a quote.
            </AlertDescription>
          </Alert>
        )}

        {showBillingToggle && (
          <div className="mb-10 flex justify-center">
            <Tabs value={billing} onValueChange={(value) => setBilling(value as BillingPeriod)}>
              <TabsList aria-label="Billing period">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annual">Annual</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} billing={billing} />
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-muted/30 p-6 sm:p-8">
          <h2 className="font-display text-lg font-semibold">Every WHOLNEX quote confirms, in writing</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {QUOTE_CONFIRMS.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Compare plans"
            title="Plan comparison"
            description={
              plans.some((plan) => plan.specs)
                ? 'Side-by-side specifications for each plan tier.'
                : 'How the four tiers are positioned. Exact specifications are confirmed for your configuration in your quote.'
            }
          />
          <div className="mt-10">
            <PlanComparisonTable plans={plans} />
          </div>
        </div>
      </section>

      <section className="container-page py-20 sm:py-24">
        <SectionHeading
          eyebrow="Management"
          title="Self-managed or managed — know the difference"
          description="The management level determines who looks after the operating system and software on your server."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <UserCog className="h-6 w-6 text-brand" aria-hidden="true" />
            <h3 className="mt-4 font-display text-xl font-semibold">Self-managed (unmanaged)</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The provider keeps the underlying infrastructure running. You administer everything inside the server:
              OS updates, software installation, security hardening, monitoring, and backups of your data. Ideal for
              developers and teams comfortable with server administration.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <Wrench className="h-6 w-6 text-cyan" aria-hidden="true" />
            <h3 className="mt-4 font-display text-xl font-semibold">Managed</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The provider also takes on agreed administrative tasks, such as patching, monitoring, or
              troubleshooting. If you want help administering your server, say so in your request — your WHOLNEX
              quote states exactly which, if any, management services are included.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page pb-20 sm:pb-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Billing FAQ"
            title="Questions about pricing and billing"
            description="How quotes, billing, and support work at WHOLNEX."
          />
          <FaqAccordion items={BILLING_FAQS} idPrefix="billing" />
        </div>
      </section>

      <section className="container-page pb-4">
        <div className="ring-gradient grid gap-8 rounded-2xl bg-card p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex items-start gap-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Building2 className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-display text-2xl font-semibold">Need something bigger or more specific?</h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Multiple servers, unusual resource ratios, specific regions, or a migration from another provider —
                describe your requirements and WHOLNEX will put together a custom configuration quote.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button size="lg" asChild>
              <Link to="/quote?plan=custom">
                Request a custom quote <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact?category=sales">Talk to sales</Link>
            </Button>
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which tier fits?"
        description="Describe your application and expected traffic. We will recommend a starting configuration and confirm it in writing."
        primary={{ label: 'Configure your VPS', href: '/quote' }}
        secondary={{ label: 'Read the FAQ', href: '/faq' }}
      />
    </>
  );
}

export default PricingPage;
