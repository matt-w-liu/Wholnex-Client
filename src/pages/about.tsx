import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Eye, FileCheck2, HeartHandshake, Layers3, MapPin, Ruler, Server, Target } from 'lucide-react';
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
    title: 'Right-sized, not oversold',
    description:
      'We start from the workload you describe and recommend a configuration that fits it, with room to grow — not the largest plan we can sell.',
  },
  {
    icon: FileCheck2,
    title: 'Confirmed in writing',
    description:
      'Resources, operating system, region, price, and what is included are stated in a written quote before anything is provisioned.',
  },
  {
    icon: Layers3,
    title: 'Clear responsibilities',
    description:
      'We explain which layers WHOLNEX manages and which you manage, so security and maintenance never fall through the cracks.',
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
    icon: Server,
    title: 'Infrastructure-focused',
    description:
      'Our product philosophy centers on the fundamentals that matter for virtual servers: predictable resources, sensible defaults, and documentation you can act on.',
  },
];

export function AboutPage() {
  return (
    <>
      <Seo
        title="About WHOLNEX LLC — VPS Hosting Company"
        description="WHOLNEX LLC is a United States company providing virtual private server hosting and cloud infrastructure. Learn about our mission, approach, and leadership."
        path="/about"
      />
      <PageHero
        eyebrow="About WHOLNEX"
        breadcrumbs={[{ name: 'About', path: '/about' }]}
        title="Practical VPS hosting for people who build"
        description={`${COMPANY.name} provides virtual private server hosting and cloud infrastructure services for developers, businesses, and digital innovators.`}
        image={SITE_IMAGES.bladeServerChassis}
      />

      <section className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Who we are"
            title="A VPS hosting company built on clarity"
            description={`${COMPANY.name} is a United States limited liability company focused on virtual private server (VPS) hosting and cloud server infrastructure.`}
          />
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              We work with people who need more than shared hosting can offer — developers who want root access,
              businesses running their own applications, and teams that need dependable environments for building
              and testing software.
            </p>
            <p>
              Rather than a self-service checkout, every WHOLNEX server begins with a conversation about the workload.
              That lets us confirm the right configuration, the right operating system, and the right price for each
              customer in writing.
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
              To make virtual server hosting accessible, flexible, and straightforward for developers, businesses,
              and digital innovators.
            </h2>
          </div>
          <div className="ring-gradient rounded-2xl bg-card p-8 sm:p-10">
            <Eye className="h-7 w-7 text-cyan" aria-hidden="true" />
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-cyan">Our vision</p>
            <h2 className="mt-3 text-balance font-display text-2xl font-semibold leading-snug sm:text-3xl">
              To help individuals and organizations build and operate their digital projects with confidence through
              practical cloud infrastructure solutions.
            </h2>
          </div>
        </div>
      </section>

      <section className="container-page py-20 sm:py-28">
        <SectionHeading
          eyebrow="Our approach to VPS hosting"
          title="How we work with every customer"
          description="Three principles shape every WHOLNEX engagement, from the first question to a running server."
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
              For sales questions, configuration requests, or support, use the contact form and choose the category
              that fits — your message goes directly to the WHOLNEX team.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/contact">
                  Contact WHOLNEX <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/quote">Request a quote</Link>
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
