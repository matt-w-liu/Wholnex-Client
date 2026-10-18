import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  Code2,
  Cpu,
  FileCheck2,
  Gauge,
  KeyRound,
  Layers3,
  MessagesSquare,
  MonitorCog,
  Ruler,
  ServerCog,
  ShieldCheck,
  Terminal,
  Users,
  Wrench,
} from 'lucide-react';
import { COMPANY } from '@/lib/constants';
import { HOME_FAQS, USE_CASES } from '@/lib/content';
import { SITE_IMAGES } from '@/lib/images';
import { getResolvedPlans } from '@/lib/vps-plans';
import { Seo } from '@/components/seo';
import { SectionHeading } from '@/components/section-heading';
import { ServiceCard } from '@/components/service-card';
import { ResponsiveImage } from '@/components/responsive-image';
import { TerminalCard } from '@/components/terminal-card';
import { PlanCard } from '@/components/plan-card';
import { OsSelector } from '@/components/os-selector';
import { WorkflowSteps } from '@/components/workflow-steps';
import { FaqAccordion } from '@/components/faq-accordion';
import { CtaBand } from '@/components/cta-band';
import { Button } from '@/components/ui/button';

const HERO_POINTS = [
  { icon: Layers3, label: 'Isolated virtual servers' },
  { icon: KeyRound, label: 'Root-level control' },
  { icon: FileCheck2, label: 'Written quote before provisioning' },
];

const CORE_CAPABILITIES = [
  {
    icon: Cpu,
    title: 'Allocated resources',
    description:
      'Your VPS receives its own allocation of vCPU, memory, and storage, so a neighbor’s traffic spike does not consume your capacity the way it can on shared hosting.',
  },
  {
    icon: Terminal,
    title: 'Full administrative access',
    description:
      'Root or Administrator access lets you install any software, tune the operating system, and configure services exactly the way your application needs.',
  },
  {
    icon: MonitorCog,
    title: 'Your choice of operating system',
    description:
      'Run the Linux distribution your team knows — or Windows Server where your software requires it — instead of a fixed hosting stack.',
  },
  {
    icon: Gauge,
    title: 'Room to grow',
    description:
      'Start with the resources you need today and plan upgrades as traffic and data grow, without moving to a physical dedicated server.',
  },
];

const SOLUTIONS = [
  {
    icon: Terminal,
    title: 'Linux VPS',
    description: 'Ubuntu, Debian, Rocky Linux, or AlmaLinux for web stacks, APIs, containers, and databases.',
    href: '/quote?os=ubuntu',
  },
  {
    icon: MonitorCog,
    title: 'Windows VPS',
    description: 'Windows Server for .NET, IIS, and Windows-only software. Licensing is discussed with your quote.',
    href: '/quote?os=windows-server',
  },
  {
    icon: Code2,
    title: 'Development VPS',
    description: 'Persistent remote environments, staging servers, and CI runners for engineering teams.',
    href: '/quote?workload=development-testing',
  },
  {
    icon: Briefcase,
    title: 'Business VPS',
    description: 'Larger allocations for business applications, customer portals, and multi-service deployments.',
    href: '/quote?plan=business',
  },
  {
    icon: Wrench,
    title: 'Custom configurations',
    description: 'Need a specific CPU, memory, storage, or region combination? Describe it and we will quote it.',
    href: '/quote?plan=custom',
  },
];

const WHY_WHOLNEX = [
  {
    icon: FileCheck2,
    title: 'Clear, written quotes',
    description:
      'Every configuration is confirmed in writing — resources, price, region, and what is included — before anything is provisioned.',
  },
  {
    icon: Ruler,
    title: 'Sized to your workload',
    description:
      'Tell us what you want to run. We recommend a starting size based on your application instead of pushing the largest plan.',
  },
  {
    icon: MessagesSquare,
    title: 'Talk to people, not a checkout',
    description:
      'Questions about sizing, operating systems, or migrations go to the WHOLNEX team directly through our contact and quote forms.',
  },
  {
    icon: Users,
    title: 'Built for builders',
    description: `${COMPANY.name} is a United States company focused on practical VPS hosting for developers, businesses, and growing projects.`,
  },
];

export function HomePage() {
  const plans = getResolvedPlans();

  return (
    <>
      <Seo
        title="WHOLNEX LLC | VPS Hosting & Virtual Private Servers"
        description="WHOLNEX provides virtual private server (VPS) hosting for websites, applications, development environments, and growing digital projects. Explore VPS plans and request a configuration quote."
        path="/"
      />

      {/* 1 — Hero */}
      <section className="relative isolate overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0 -z-10">
          <ResponsiveImage
            image={SITE_IMAGES.serverDriveBays}
            priority
            alt=""
            className="h-full w-full object-cover object-right opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/90 to-navy-900/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />
        </div>
        <div className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" aria-hidden="true" />
        <div className="absolute -left-32 top-1/3 -z-10 h-96 w-96 rounded-full bg-primary/25 blur-3xl" aria-hidden="true" />

        <div className="container-page grid min-h-[calc(100svh-4rem)] items-center gap-12 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-cyan-300">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-cyan-400" aria-hidden="true" />
              Virtual private server hosting
            </p>
            <h1 className="mt-6 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
              Power Your Projects with <span className="text-gradient">WHOLNEX VPS Hosting</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-slate-300">
              Discover flexible virtual private server hosting for websites, applications, development
              environments, and growing digital projects.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link to="/pricing">
                  Explore VPS Plans <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 bg-white/5 text-white backdrop-blur hover:border-slate-400 hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link to="/contact?category=sales">Contact Sales</Link>
              </Button>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
              {HERO_POINTS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-primary/30 to-cyan-500/10 blur-2xl" aria-hidden="true" />
            <TerminalCard />
          </div>
        </div>
      </section>

      {/* 2 — Core hosting capabilities */}
      <section className="container-page py-20 sm:py-28">
        <SectionHeading
          eyebrow="Why a VPS"
          title="The control of a server, without buying hardware"
          description="A virtual private server gives you an isolated environment with its own resources and operating system — the practical middle ground between shared hosting and a dedicated machine."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CORE_CAPABILITIES.map((item) => (
            <ServiceCard key={item.title} icon={item.icon} title={item.title} description={item.description} />
          ))}
        </div>
      </section>

      {/* 3 — VPS hosting solutions */}
      <section className="border-y border-border bg-muted/30 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="VPS hosting solutions"
            title="Configurations you can request"
            description="Start from the type of server you need. Each request goes to the WHOLNEX team, who confirm the exact configuration and price in writing."
            actions={
              <Button variant="outline" asChild>
                <Link to="/vps-hosting">
                  How VPS hosting works <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            }
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {SOLUTIONS.map((solution) => (
              <Link
                key={solution.title}
                to={solution.href}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-glow"
              >
                <solution.icon className="h-6 w-6 text-brand" aria-hidden="true" />
                <h3 className="mt-5 font-display text-lg font-semibold">{solution.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{solution.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Request this <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Plan preview */}
      <section className="container-page py-20 sm:py-28">
        <SectionHeading
          eyebrow="VPS plans"
          title="Four starting points, sized by quote"
          description="Choose the tier closest to your workload. WHOLNEX confirms the exact specifications and price for your configuration in writing."
          actions={
            <Button variant="outline" asChild>
              <Link to="/pricing">
                Compare all plans <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          }
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} variant="compact" />
          ))}
        </div>
      </section>

      {/* 5 — Why choose WHOLNEX */}
      <section className="relative isolate overflow-hidden bg-navy-900 py-20 text-white sm:py-28">
        <div className="bg-grid-dark mask-radial absolute inset-0 -z-10" aria-hidden="true" />
        <div className="absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" aria-hidden="true" />
        <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              tone="light"
              eyebrow="Why WHOLNEX"
              title="Straightforward hosting, confirmed in writing"
              description="We would rather tell you exactly what your server includes than promise everything on a landing page. That is how every WHOLNEX engagement starts."
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
          title="What teams run on a VPS"
          description="From a single website to a containerized application stack, a VPS adapts to the software you choose."
          actions={
            <Button variant="outline" asChild>
              <Link to="/solutions">
                Explore solutions <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          }
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.slice(0, 6).map((useCase) => (
            <ServiceCard key={useCase.id} icon={useCase.icon} title={useCase.title} description={useCase.summary}>
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-2" aria-label={`Common tools for ${useCase.title.toLowerCase()}`}>
                {useCase.stack.map((tool) => (
                  <li key={tool} className="rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-xs text-muted-foreground">
                    {tool}
                  </li>
                ))}
              </ul>
            </ServiceCard>
          ))}
        </div>
      </section>

      {/* 7 — Infrastructure & security */}
      <section className="border-y border-border bg-muted/30 py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-border">
              <ResponsiveImage
                image={SITE_IMAGES.datacenterAisle}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-[4/3] h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-6 right-6 rounded-xl border border-white/10 bg-navy-900/90 p-4 text-sm text-slate-300 shadow-2xl backdrop-blur sm:left-auto sm:w-80">
              <p className="font-mono text-xs uppercase tracking-wider text-cyan-300">Shared responsibility</p>
              <p className="mt-2">
                The provider secures the facility, hardware, and virtualization layer. You secure what runs inside your
                server.
              </p>
            </div>
          </div>
          <div className="pt-6 lg:pt-0">
            <SectionHeading
              eyebrow="Infrastructure & security"
              title="Know exactly where responsibilities sit"
              description="Good VPS hosting is transparent about the layers it manages and the layers you manage. Our infrastructure and security pages explain both, and your quote states what WHOLNEX provides."
            />
            <ul className="mt-8 space-y-4">
              {[
                { icon: ServerCog, text: 'Virtualization, storage, and networking explained in plain language' },
                { icon: ShieldCheck, text: 'SSH keys, firewalls, patching, and backups — a practical checklist' },
                { icon: FileCheck2, text: 'Capabilities included with your server are listed in your quote' },
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
                <Link to="/infrastructure">Infrastructure</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/security">Security</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 8 — Operating systems */}
      <section id="operating-systems" className="container-page py-20 sm:py-28">
        <SectionHeading
          eyebrow="Operating systems"
          title="Run the OS your stack expects"
          description="Explore the operating systems most commonly used on VPS hosting and request the one you want for your server."
        />
        <div className="mt-12">
          <OsSelector />
        </div>
      </section>

      {/* 9 — Getting started */}
      <section className="border-y border-border bg-muted/30 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Getting started"
            title="From requirements to a running server"
            description="No checkout, no surprise charges. Here is how a WHOLNEX VPS comes together."
          />
          <WorkflowSteps className="mt-12" />
          <Button className="mt-12" size="lg" asChild>
            <Link to="/quote">
              Configure your VPS <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>

      {/* 10 — FAQ */}
      <section className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered"
          description="Straight answers about VPS hosting and how WHOLNEX works."
        />
        <div>
          <FaqAccordion items={HOME_FAQS} idPrefix="home-faq" />
          <Button variant="link" className="mt-4 px-0 text-brand" asChild>
            <Link to="/faq">
              See all questions <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>

      {/* 11 — Final CTA */}
      <CtaBand />
    </>
  );
}

export default HomePage;
