import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Eye, FileCheck2, HeartHandshake, Layers3, MapPin, Ruler, ShieldCheck, Target } from 'lucide-react';
import { COMPANY, COMPANY_ADDRESS_LINES } from '@/lib/constants';
import { SITE_IMAGES } from '@/lib/images';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { SectionHeading } from '@/components/section-heading';
import { ServiceCard } from '@/components/service-card';
import { ResponsiveImage } from '@/components/responsive-image';
import { LeaderCard } from '@/components/leader-card';
import { CtaBand } from '@/components/cta-band';
import { Button } from '@/components/ui/button';

const APPROACH = [
  {
    icon: Ruler,
    title: 'The right plan, not the biggest',
    description:
      'We recommend the plan that fits how you actually use the internet — not the biggest plan we can sell.',
  },
  {
    icon: FileCheck2,
    title: 'Confirmed in writing',
    description:
      'Plan details, price, and privacy terms are stated in writing before you pay for anything.',
  },
  {
    icon: Layers3,
    title: 'Honest about limits',
    description:
      'We explain what a VPN protects and what it does not, so you can make informed decisions about your security.',
  },
];

const COMMITMENTS = [
  {
    icon: HeartHandshake,
    title: 'Customer experience',
    description:
      'Every inquiry is read by the WHOLNEX team. We answer the question you asked, in plain language, and tell you when something is outside what we offer.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy-focused',
    description:
      'Our product philosophy centers on the fundamentals that matter for a VPN: a private connection, sensible defaults, and clear, verifiable information.',
  },
];

export function AboutPage() {
  return (
    <>
      <Seo
        title="About WHOLNEX LLC — VPN Company"
        description="WHOLNEX LLC is a United States company providing VPN services for individuals and organizations. Learn about our mission, approach, and leadership."
        path="/about"
      />
      <PageHero
        eyebrow="About WHOLNEX"
        breadcrumbs={[{ name: 'About', path: '/about' }]}
        title="Private connections, made straightforward"
        description={`${COMPANY.name} provides VPN services that help individuals, businesses, and digital innovators connect to the internet privately.`}
        image={SITE_IMAGES.networkRackCabinets}
      />

      <section className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Who we are"
            title="A VPN company built on clarity"
            description={`${COMPANY.name} is a United States limited liability company focused on virtual private network (VPN) services and private networking.`}
          />
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              We work with people who want more control over their privacy online — individuals on public Wi-Fi,
              travelers, remote workers, and organizations that need consistent, encrypted connections for their
              teams.
            </p>
            <p>
              We believe a VPN should be judged on what it can prove, not what it claims. That is why we publish
              checksums for our installer, describe features only once they are confirmed, and put plan details and
              privacy terms in writing.
            </p>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border">
          <ResponsiveImage
            image={SITE_IMAGES.datacenterConsole}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/3] h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 py-20 sm:py-28">
        <div className="container-page grid gap-5 lg:grid-cols-2">
          <div className="ring-gradient rounded-2xl bg-card p-8 sm:p-10">
            <Target className="h-7 w-7 text-brand" aria-hidden="true" />
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-brand">Our mission</p>
            <h2 className="mt-3 text-balance font-display text-2xl font-semibold leading-snug sm:text-3xl">
              To make private, secure internet connections accessible, flexible, and straightforward for individuals,
              businesses, and digital innovators.
            </h2>
          </div>
          <div className="ring-gradient rounded-2xl bg-card p-8 sm:p-10">
            <Eye className="h-7 w-7 text-cyan" aria-hidden="true" />
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-cyan">Our vision</p>
            <h2 className="mt-3 text-balance font-display text-2xl font-semibold leading-snug sm:text-3xl">
              To help individuals and organizations build and operate their digital projects with confidence through
              practical, trustworthy privacy solutions.
            </h2>
          </div>
        </div>
      </section>

      <section className="container-page py-20 sm:py-28">
        <SectionHeading
          eyebrow="Our approach to VPN"
          title="How we work with every customer"
          description="Three principles shape how we build and offer WHOLNEX VPN."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {APPROACH.map((item) => (
            <ServiceCard key={item.title} icon={item.icon} title={item.title} description={item.description} />
          ))}
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {COMMITMENTS.map((item) => (
            <ServiceCard key={item.title} icon={item.icon} title={item.title} description={item.description} />
          ))}
        </div>
      </section>

      <section id="leadership" className="scroll-mt-24 border-y border-border bg-muted/30 py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="Leadership"
            title="Company leadership"
            description={`${COMPANY.name} is led by its Chief Executive Officer, ${COMPANY.ceo.name}.`}
          />
          <LeaderCard name={COMPANY.ceo.name} title={COMPANY.ceo.title} />
        </div>
      </section>

      <section className="container-page py-20 sm:py-28">
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-8 lg:col-span-2">
            <Compass className="h-6 w-6 text-brand" aria-hidden="true" />
            <h2 className="mt-4 font-display text-2xl font-semibold">Contact information</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              For sales questions, team plans, or support, use the contact form and choose the category
              that fits — your message goes directly to the WHOLNEX team.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/contact">
                  Contact WHOLNEX <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/download">Download the app</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <MapPin className="h-6 w-6 text-cyan" aria-hidden="true" />
            <h2 className="mt-4 font-display text-lg font-semibold">Business address</h2>
            <address className="mt-3 text-sm not-italic leading-relaxed text-muted-foreground">
              <span className="block font-medium text-foreground">{COMPANY.name}</span>
              {COMPANY_ADDRESS_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

export default AboutPage;
