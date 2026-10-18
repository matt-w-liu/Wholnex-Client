import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, CheckCircle2, FlaskConical, Info, User, Users } from 'lucide-react';
import { BILLING_FAQS } from '@/lib/content';
import { getResolvedPlans, hasAnnualPricing, QUOTE_CONFIRMS } from '@/lib/vpn-plans';
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
        title="VPN Plans & Pricing"
        description="Compare WHOLNEX VPN plans — Personal, Plus, Team, and Business — and request plan details and pricing for yourself or your organization."
        path="/pricing"
      />
      <PageHero
        size="compact"
        eyebrow="VPN plans"
        breadcrumbs={[{ name: 'Pricing', path: '/pricing' }]}
        title="VPN plans for people and teams"
        description="Pick the plan closest to what you need. WHOLNEX replies with the plan details and price it can confirm — nothing is charged until you agree."
      />

      <section className="container-page py-16 sm:py-20">
        {usingDraft && (
          <Alert variant="warning" className="mb-8">
            <FlaskConical className="h-4 w-4" />
            <AlertTitle>Development preview — draft plan data</AlertTitle>
            <AlertDescription>
              Features and prices below are placeholders from DRAFT_PLAN_DATA, shown only because
              VITE_SHOW_DRAFT_PLAN_DATA is enabled in a development build. They are not WHOLNEX offerings and never
              appear in production.
            </AlertDescription>
          </Alert>
        )}
        {!anyPricing && (
          <Alert variant="info" className="mb-8">
            <Info className="h-4 w-4" />
            <AlertTitle>Prices have not been published yet</AlertTitle>
            <AlertDescription>
              WHOLNEX confirms plan details and pricing with you directly. Choose a plan to send a request — there is no
              checkout on this website and no charge until you agree. You can download the Windows app at any time.
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
          <h2 className="font-display text-lg font-semibold">WHOLNEX confirms, in writing</h2>
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
              plans.some((plan) => plan.features)
                ? 'Side-by-side features for each plan.'
                : 'How the four plans are positioned. Exact features and prices are confirmed with you in writing.'
            }
          />
          <div className="mt-10">
            <PlanComparisonTable plans={plans} />
          </div>
        </div>
      </section>

      <section className="container-page py-20 sm:py-24">
        <SectionHeading
          eyebrow="Individuals or teams"
          title="Which kind of plan do you need?"
          description="Personal and Plus plans cover your own devices. Team and Business plans add users your organization manages."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <User className="h-6 w-6 text-brand" aria-hidden="true" />
            <h3 className="mt-4 font-display text-xl font-semibold">Personal &amp; Plus</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              For one person protecting their own devices — on public Wi-Fi, while traveling, or for everyday privacy at
              home. Choose Plus if you want coverage on more devices.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <Users className="h-6 w-6 text-cyan" aria-hidden="true" />
            <h3 className="mt-4 font-display text-xl font-semibold">Team &amp; Business</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              For organizations giving staff a consistent, encrypted connection. Tell us how many users you have and
              which devices they use, and we will confirm the plan, pricing, and any team features in writing.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page pb-20 sm:pb-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Billing FAQ"
            title="Questions about pricing and billing"
            description="How plans, billing, and support work at WHOLNEX."
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
              <h2 className="font-display text-2xl font-semibold">Need a plan for your organization?</h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Many users, specific server locations, or particular security requirements — describe what you need and
                WHOLNEX will put together a plan for your team.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button size="lg" asChild>
              <Link to="/quote?plan=business">
                Request a team plan <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact?category=sales">Talk to sales</Link>
            </Button>
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which plan fits?"
        description="Tell us who needs protection and on which devices. We will recommend a plan and confirm it in writing."
        primary={{ label: 'Request a plan', href: '/quote' }}
        secondary={{ label: 'Read the FAQ', href: '/faq' }}
      />
    </>
  );
}

export default PricingPage;
