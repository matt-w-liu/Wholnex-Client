import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Building2, ExternalLink, Mail, MapPin, ServerCog, UserRound } from 'lucide-react';
import { contactReasons, type ContactReason } from '@wholnex/shared';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { ContactForm } from '@/components/contact-form';
import { COMPANY, COMPANY_ADDRESS_LINES, COMPANY_MAP_URL } from '@/lib/constants';
import { getPlanById } from '@/lib/vps-plans';
import { Button } from '@/components/ui/button';

function parseReason(value: string | null): ContactReason | undefined {
  return value && (contactReasons as readonly string[]).includes(value) ? (value as ContactReason) : undefined;
}

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const reason = parseReason(searchParams.get('category') ?? searchParams.get('reason'));
  const plan = getPlanById(searchParams.get('plan'));
  const defaultSubject = plan ? `Question about ${plan.name}` : '';

  return (
    <>
      <Seo
        title="Contact WHOLNEX — Sales, Support & VPS Inquiries"
        description="Contact WHOLNEX LLC about VPS plans, custom server configurations, technical support, or general questions. Business address: 1333 County Road 565, Van Buren, MO 63965."
        path="/contact"
      />

      <PageHero
        size="compact"
        eyebrow="Contact"
        breadcrumbs={[{ name: 'Contact', path: '/contact' }]}
        title="Talk to the WHOLNEX team"
        description="Questions about plans, configurations, or an existing service? Send a message and we will reply by email."
      />

      <section className="container-page grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.45fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <ContactForm key={`${reason ?? ''}-${defaultSubject}`} defaultReason={reason} defaultSubject={defaultSubject} />
        </div>

        <div className="space-y-5">
          <div className="ring-gradient rounded-2xl bg-card p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <ServerCog className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="font-display text-lg font-semibold">Planning a server?</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The VPS configurator collects everything we need for a written quote — resources, operating system,
              region, and timeline — in one step.
            </p>
            <Button className="mt-5 w-full" asChild>
              <Link to="/quote">
                Configure a VPS <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-lg font-semibold">Company details</h2>
            <ul className="mt-5 space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <p className="font-medium">Company</p>
                  <p className="text-muted-foreground">{COMPANY.name}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <UserRound className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <p className="font-medium">{COMPANY.ceo.title}</p>
                  <p className="text-muted-foreground">{COMPANY.ceo.name}</p>
                </div>
              </li>
              {COMPANY.publicEmail && (
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p>
                      <a href={`mailto:${COMPANY.publicEmail}`} className="text-muted-foreground hover:text-foreground">
                        {COMPANY.publicEmail}
                      </a>
                    </p>
                  </div>
                </li>
              )}
            </ul>
          </div>

          <div id="location" className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="relative isolate h-36 overflow-hidden bg-navy-900">
              <div className="bg-grid-dark absolute inset-0" aria-hidden="true" />
              <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-2xl" aria-hidden="true" />
              <MapPin className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-cyan-400" aria-hidden="true" />
              <p className="absolute bottom-3 left-4 font-mono text-xs text-slate-400">
                {COMPANY.address.city}, {COMPANY.address.regionName}
              </p>
            </div>
            <div className="p-6">
              <h2 className="font-display text-lg font-semibold">Company location</h2>
              <address className="mt-3 text-sm not-italic leading-relaxed text-muted-foreground">
                <span className="block font-medium text-foreground">{COMPANY.name}</span>
                {COMPANY_ADDRESS_LINES.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <p className="mt-3 text-xs text-muted-foreground">
                This is WHOLNEX’s business address. It is not a data center or server hosting location.
              </p>
              <Button variant="outline" size="sm" className="mt-4" asChild>
                <a href={COMPANY_MAP_URL} target="_blank" rel="noopener noreferrer">
                  Open in Google Maps <ExternalLink aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
