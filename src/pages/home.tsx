import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Download,
  EyeOff,
  FileCheck2,
  Globe2,
  Lock,
  MessagesSquare,
  MonitorSmartphone,
  ShieldCheck,
  Users,
  Wifi,
} from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import { HOME_FAQS, USE_CASES } from '@/lib/content';
import { SITE_IMAGES } from '@/lib/images';
import { getResolvedPlans } from '@/lib/vpn-plans';
import { WINDOWS_DOWNLOAD, formatBytes } from '@/lib/download';
import { Seo } from '@/components/seo';
import { SectionHeading } from '@/components/section-heading';
import { ServiceCard } from '@/components/service-card';
import { ResponsiveImage } from '@/components/responsive-image';
import { TunnelDiagram } from '@/components/tunnel-diagram';
import { PlanCard } from '@/components/plan-card';
import { PlatformAvailability } from '@/components/download-card';
import { WorkflowSteps } from '@/components/workflow-steps';
import { FaqAccordion } from '@/components/faq-accordion';
import { CtaBand } from '@/components/cta-band';
import { Button } from '@/components/ui/button';

const HERO_POINTS = [
  { icon: Lock, label: 'Encrypted connection' },
  { icon: Wifi, label: 'Safer public Wi-Fi' },
  { icon: EyeOff, label: 'Your IP address masked' },
];

const CORE_BENEFITS = [
  {
    icon: Lock,
    title: 'Encrypted traffic',
    description:
      'A VPN wraps your internet traffic in an encrypted tunnel between your device and the VPN server, so networks in between cannot read it.',
  },
  {
    icon: Wifi,
    title: 'Safer public Wi-Fi',
    description:
      'Café, hotel, and airport networks are shared with strangers. Encryption keeps your traffic private from others on the same network.',
  },
  {
    icon: EyeOff,
    title: 'More private browsing',
    description:
      'Your internet provider sees a connection to the VPN — not each site you visit — and websites see the VPN server’s address instead of yours.',
  },
  {
    icon: Globe2,
    title: 'Choose where you connect',
    description:
      'Connect through a VPN server location that suits you, such as one near you for speed. Available locations are listed on our Network page.',
  },
];

const WHY_WHOLNEX = [
  {
    icon: FileCheck2,
    title: 'Claims you can check',
    description:
      'We only describe features we have confirmed. Privacy terms will be written into our policies, not just our marketing.',
  },
  {
    icon: ShieldCheck,
    title: 'Verify your download',
    description: 'Every installer is published with its SHA-256 checksum so you can confirm the file was not altered.',
  },
  {
    icon: MessagesSquare,
    title: 'Talk to people',
    description: 'Questions about plans, teams, or the app go straight to the WHOLNEX team through our contact form.',
  },
  {
    icon: Users,
    title: 'For people and teams',
    description: `${COMPANY.name} is a United States company offering VPN plans for individuals, households, and organizations.`,
  },
];

export function HomePage() {
  const plans = getResolvedPlans();

  return (
    <>
      <Seo
        title="WHOLNEX VPN | Secure, Private Internet Connections"
        description="WHOLNEX VPN encrypts your internet connection to protect your privacy on public Wi-Fi and at home. Download the WHOLNEX VPN app for Windows and explore plans for individuals and teams."
        path="/"
      />

      {/* 1 — Hero */}
      <section className="relative isolate overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0 -z-10">
          <ResponsiveImage
            image={SITE_IMAGES.fiberPatchPanel}
            priority
            alt=""
            className="h-full w-full object-cover object-right opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/90 to-navy-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />
        </div>
        <div className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" aria-hidden="true" />
        <div className="absolute -left-32 top-1/3 -z-10 h-96 w-96 rounded-full bg-primary/25 blur-3xl" aria-hidden="true" />

        <div className="container-page grid min-h-[calc(100svh-4rem)] items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-cyan-300">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-cyan-400" aria-hidden="true" />
              Virtual private network
            </p>
            <h1 className="mt-6 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
              Browse privately with <span className="text-gradient">WHOLNEX VPN</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-slate-300">
              Encrypt your internet connection, protect yourself on public Wi-Fi, and keep your browsing private — at
              home, at work, and on the road.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link to="/download">
                  <Download aria-hidden="true" /> Download for Windows
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 bg-white/5 text-white backdrop-blur hover:border-slate-400 hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link to="/pricing">View VPN Plans</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Windows installer · {formatBytes(WINDOWS_DOWNLOAD.sizeBytes)}
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
              {HERO_POINTS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-primary/30 to-cyan-500/10 blur-2xl" aria-hidden="true" />
            <TunnelDiagram variant="hero" />
          </div>
        </div>
      </section>

      {/* 2 — Core benefits */}
      <section className="container-page py-20 sm:py-28">
        <SectionHeading
          eyebrow="Why use a VPN"
          title="Your connection, kept private"
          description="A VPN protects the path between your device and the internet — the part most exposed on shared and public networks."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CORE_BENEFITS.map((item) => (
            <ServiceCard key={item.title} icon={item.icon} title={item.title} description={item.description} />
          ))}
        </div>
      </section>

      {/* 3 — Plans */}
      <section className="border-y border-border bg-muted/30 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="VPN plans"
            title="Plans for individuals and teams"
            description="From a single PC to a whole organization. WHOLNEX confirms plan details and pricing with you in writing."
            actions={
              <Button variant="outline" asChild>
                <Link to="/pricing">
                  Compare plans <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            }
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Apps */}
      <section className="container-page py-20 sm:py-28">
        <SectionHeading
          eyebrow="Apps"
          title="Get the WHOLNEX VPN app"
          description="The app is available for Windows today. Need it on another device? Let us know through the contact form."
          actions={
            <Button asChild>
              <Link to="/download">
                <Download aria-hidden="true" /> Download
              </Link>
            </Button>
          }
        />
        <PlatformAvailability className="mt-10" />
      </section>

      {/* 5 — Why WHOLNEX */}
      <section className="relative isolate overflow-hidden bg-navy-900 py-20 text-white sm:py-28">
        <div className="bg-grid-dark mask-radial absolute inset-0 -z-10" aria-hidden="true" />
        <div className="absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" aria-hidden="true" />
        <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              tone="light"
              eyebrow="Why WHOLNEX"
              title="Privacy you do not have to take on faith"
              description="A VPN asks for your trust. We earn it by saying only what we can stand behind and putting it in writing."
            />
            <Button size="lg" className="mt-8" asChild>
              <Link to="/about">
                About WHOLNEX <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {WHY_WHOLNEX.map((item) => (
              <div key={item.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
                <item.icon className="h-6 w-6 text-cyan-400" aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Use cases */}
      <section className="container-page py-20 sm:py-28">
        <SectionHeading
          eyebrow="Use cases"
          title="When a VPN helps"
          description="Common situations where an encrypted connection makes a real difference."
          actions={
            <Button variant="outline" asChild>
              <Link to="/solutions">
                Explore solutions <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          }
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((useCase) => (
            <ServiceCard key={useCase.id} icon={useCase.icon} title={useCase.title} description={useCase.summary} />
          ))}
        </div>
      </section>

      {/* 7 — Security */}
      <section className="border-y border-border bg-muted/30 py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-2xl border border-border">
            <ResponsiveImage
              image={SITE_IMAGES.networkRackCabinets}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Security & privacy"
              title="Know what a VPN does — and what it does not"
              description="A VPN is one layer of protection, not all of it. Our security guide explains what it covers, what it cannot, and the habits that close the gaps."
            />
            <ul className="mt-8 space-y-4">
              {[
                { icon: Lock, text: 'Encryption, tunneling, and protocols explained in plain language' },
                { icon: ShieldCheck, text: 'Kill switch, DNS leak protection, and other safeguards to look for' },
                { icon: MonitorSmartphone, text: 'A practical checklist for keeping your device secure' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="pt-1 text-sm leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/security">Security guide</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/vpn">How a VPN works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 8 — Getting started */}
      <section className="container-page py-20 sm:py-28">
        <SectionHeading
          eyebrow="Getting started"
          title="Connected in four steps"
          description="Here is how to get going with WHOLNEX VPN on Windows."
        />
        <WorkflowSteps className="mt-12" />
        <Button className="mt-12" size="lg" asChild>
          <Link to="/download">
            <Download aria-hidden="true" /> Download for Windows
          </Link>
        </Button>
      </section>

      {/* 9 — FAQ */}
      <section className="border-t border-border bg-muted/30">
        <div className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="FAQ" title="Questions, answered" description="Straight answers about VPNs and WHOLNEX." />
          <div>
            <FaqAccordion items={HOME_FAQS} idPrefix="home-faq" />
            <Button variant="link" className="mt-4 px-0 text-brand" asChild>
              <Link to="/faq">
                See all questions <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 10 — Final CTA */}
      <CtaBand />
    </>
  );
}

export default HomePage;
