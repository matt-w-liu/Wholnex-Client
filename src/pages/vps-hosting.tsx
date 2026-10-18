import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  Code2,
  Cpu,
  Gauge,
  HardDrive,
  MemoryStick,
  MonitorCog,
  Network,
  Rocket,
  Terminal,
  TrendingUp,
  Wrench,
} from 'lucide-react';
import { SITE_IMAGES } from '@/lib/images';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { SectionHeading } from '@/components/section-heading';
import { ServiceCard } from '@/components/service-card';
import { TerminalCard } from '@/components/terminal-card';
import { CtaBand } from '@/components/cta-band';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const HOSTING_COMPARISON = [
  {
    label: 'Resources',
    shared: 'Pooled with every account on the server',
    vps: 'Allocated vCPU, memory, and storage per server',
    dedicated: 'An entire physical machine',
  },
  {
    label: 'Isolation',
    shared: 'Separate accounts in one operating system',
    vps: 'Separate virtual machine with its own kernel',
    dedicated: 'Physically separate hardware',
  },
  {
    label: 'Administrative access',
    shared: 'Control panel only',
    vps: 'Full root / Administrator',
    dedicated: 'Full root / Administrator',
  },
  {
    label: 'Software choice',
    shared: 'Provider-defined stack',
    vps: 'Any OS image and software you install',
    dedicated: 'Any OS and software',
  },
  {
    label: 'Scaling',
    shared: 'Move to a higher shared tier',
    vps: 'Resize the virtual machine',
    dedicated: 'Replace or add hardware',
  },
  {
    label: 'Who administers it',
    shared: 'Mostly the provider',
    vps: 'You, unless management is included',
    dedicated: 'You, unless management is included',
  },
  {
    label: 'Typical cost',
    shared: 'Lowest',
    vps: 'Moderate',
    dedicated: 'Highest',
  },
];

const RESOURCES = [
  {
    icon: Cpu,
    title: 'vCPU',
    description:
      'A virtual CPU is a share of a physical processor core or thread scheduled by the hypervisor. More vCPUs help with parallel work such as concurrent requests, builds, and background jobs.',
  },
  {
    icon: MemoryStick,
    title: 'Memory (RAM)',
    description:
      'Memory holds your running applications, database caches, and operating system. It is usually the first resource a growing server runs short of — when RAM is exhausted, performance drops sharply.',
  },
  {
    icon: HardDrive,
    title: 'Storage',
    description:
      'Your virtual disk holds the OS, applications, and data. SSD and NVMe storage reduce latency for databases and file-heavy workloads compared with spinning disks.',
  },
  {
    icon: Network,
    title: 'Network & transfer',
    description:
      'Port speed limits how fast data can move at any moment; the monthly transfer allowance limits how much data moves in total. Public IPv4 and IPv6 addresses make services reachable.',
  },
];

const CONFIGURATIONS = [
  {
    icon: Terminal,
    title: 'Linux VPS',
    description: 'Ubuntu Server, Debian, Rocky Linux, or AlmaLinux for web stacks, APIs, containers, and databases.',
    href: '/quote?os=ubuntu',
  },
  {
    icon: MonitorCog,
    title: 'Windows VPS',
    description:
      'Windows Server for .NET, IIS, and Windows-only software. Microsoft licensing is discussed with your quote and is not included by default.',
    href: '/quote?os=windows-server',
  },
  {
    icon: Rocket,
    title: 'High-performance VPS',
    description: 'Larger CPU and memory allocations for busy backends, databases, and build workloads.',
    href: '/quote?plan=performance',
  },
  {
    icon: Code2,
    title: 'Development VPS',
    description: 'Persistent remote development, staging, and CI environments for engineering teams.',
    href: '/quote?workload=development-testing',
  },
  {
    icon: Briefcase,
    title: 'Business VPS',
    description: 'Capacity for line-of-business applications, customer portals, and multi-service stacks.',
    href: '/quote?plan=business',
  },
  {
    icon: Wrench,
    title: 'Custom configurations',
    description: 'A specific mix of CPU, memory, storage, operating system, or region. Describe it and we will quote it.',
    href: '/quote?plan=custom',
  },
];

function VirtualizationDiagram() {
  const guests = [
    { name: 'Your VPS', os: 'Ubuntu Server', apps: ['Nginx', 'Node.js', 'PostgreSQL'], highlight: true },
    { name: 'VPS B', os: 'Debian', apps: ['Mail server'], highlight: false },
    { name: 'VPS C', os: 'Windows Server', apps: ['IIS', '.NET'], highlight: false },
  ];

  return (
    <figure className="rounded-2xl border border-border bg-card p-5 sm:p-8">
      <div className="grid gap-3 sm:grid-cols-3">
        {guests.map((guest) => (
          <div
            key={guest.name}
            className={cn(
              'rounded-xl border p-4',
              guest.highlight ? 'border-brand/50 bg-brand/5 shadow-glow' : 'border-border bg-muted/40',
            )}
          >
            <p className={cn('font-display text-sm font-semibold', guest.highlight && 'text-brand')}>{guest.name}</p>
            <div className="mt-3 space-y-1.5">
              {guest.apps.map((app) => (
                <p key={app} className="rounded-md border border-border bg-background px-2 py-1 font-mono text-xs">
                  {app}
                </p>
              ))}
            </div>
            <p className="mt-3 rounded-md bg-foreground/5 px-2 py-1.5 text-center font-mono text-xs text-muted-foreground">
              {guest.os} kernel
            </p>
            <p className="mt-1.5 text-center font-mono text-[11px] text-muted-foreground">vCPU · RAM · disk</p>
          </div>
        ))}
      </div>
      <div className="my-3 flex justify-center" aria-hidden="true">
        <span className="h-5 w-px bg-border" />
      </div>
      <div className="rounded-xl border border-cyan/40 bg-cyan/5 px-4 py-3 text-center">
        <p className="font-display text-sm font-semibold text-cyan">Hypervisor</p>
        <p className="text-xs text-muted-foreground">Allocates resources and isolates each virtual machine</p>
      </div>
      <div className="my-3 flex justify-center" aria-hidden="true">
        <span className="h-5 w-px bg-border" />
      </div>
      <div className="rounded-xl border border-border bg-foreground/[0.04] px-4 py-3 text-center">
        <p className="font-display text-sm font-semibold">Physical host server</p>
        <p className="text-xs text-muted-foreground">CPUs · memory · SSD/NVMe storage · network interfaces</p>
      </div>
      <figcaption className="mt-5 text-center text-sm text-muted-foreground">
        One physical server runs several isolated virtual private servers, each with its own operating system and
        resource allocation.
      </figcaption>
    </figure>
  );
}

export function VpsHostingPage() {
  return (
    <>
      <Seo
        title="VPS Hosting — Virtual Private Servers Explained"
        description="Learn how WHOLNEX VPS hosting works: virtualization, resource allocation, root access, shared vs. dedicated CPU, operating systems, and the configurations you can request."
        path="/vps-hosting"
      />
      <PageHero
        eyebrow="VPS hosting"
        breadcrumbs={[{ name: 'VPS Hosting', path: '/vps-hosting' }]}
        title="Virtual private servers, explained and configured for you"
        description="A VPS gives you an isolated server with dedicated resource allocations and full administrative control. Here is how it works — and how WHOLNEX sets one up for your workload."
        image={SITE_IMAGES.networkRackCabinets}
        actions={
          <>
            <Button size="lg" asChild>
              <Link to="/pricing">
                View VPS Plans <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 bg-transparent text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link to="/quote">Configure a server</Link>
            </Button>
          </>
        }
      />

      <section className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="What is a VPS"
            title="Your own server, running on shared hardware"
            description="A virtual private server is a virtual machine. Software called a hypervisor divides one powerful physical server into several independent servers, each with its own operating system, resources, and administrator."
          />
          <div className="mt-8 space-y-5 text-muted-foreground">
            <p>
              <strong className="text-foreground">Virtualization</strong> lets the hypervisor present virtual
              CPUs, memory, disks, and network interfaces to each guest. Every VPS boots its own kernel, so a
              crash, reboot, or configuration change on one server does not affect the others.
            </p>
            <p>
              <strong className="text-foreground">Resource allocation</strong> means your server receives a
              defined amount of vCPU, RAM, and storage. Unlike shared hosting, where hundreds of sites compete
              inside one operating system, your allocation is reserved for your workloads.
            </p>
          </div>
        </div>
        <VirtualizationDiagram />
      </section>

      <section className="border-y border-border bg-muted/30 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Compare hosting types"
            title="Shared hosting, VPS, or dedicated server?"
            description="A VPS sits between shared hosting and a dedicated server — more control and consistency than shared hosting, without the cost of an entire machine."
          />
          <div className="mt-12 overflow-x-auto rounded-xl border border-border bg-card" role="region" aria-label="Hosting type comparison" tabIndex={0}>
            <table className="w-full min-w-[720px] text-left text-sm">
              <caption className="sr-only">Comparison of shared hosting, VPS hosting, and dedicated servers</caption>
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th scope="col" className="px-5 py-4 font-medium text-muted-foreground">
                    &nbsp;
                  </th>
                  <th scope="col" className="px-5 py-4 font-display font-semibold">
                    Shared hosting
                  </th>
                  <th scope="col" className="bg-brand/5 px-5 py-4 font-display font-semibold text-brand">
                    VPS hosting
                  </th>
                  <th scope="col" className="px-5 py-4 font-display font-semibold">
                    Dedicated server
                  </th>
                </tr>
              </thead>
              <tbody>
                {HOSTING_COMPARISON.map((row) => (
                  <tr key={row.label} className="border-b border-border last:border-0">
                    <th scope="row" className="px-5 py-4 font-medium text-muted-foreground">
                      {row.label}
                    </th>
                    <td className="px-5 py-4">{row.shared}</td>
                    <td className="bg-brand/5 px-5 py-4 font-medium">{row.vps}</td>
                    <td className="px-5 py-4">{row.dedicated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="container-page py-20 sm:py-28">
        <SectionHeading
          eyebrow="Resource allocation"
          title="What each resource does for your workload"
          description="Understanding the four core resources makes it much easier to choose — and later upgrade — the right server."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {RESOURCES.map((resource) => (
            <ServiceCard key={resource.title} icon={resource.icon} title={resource.title} description={resource.description} />
          ))}
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-wider text-brand">Shared vCPU</p>
            <h3 className="mt-3 font-display text-xl font-semibold">Cost-effective for bursty workloads</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              CPU time is scheduled across the virtual machines on a host. Most websites, small applications, and
              development servers spend much of their time idle and burst briefly under load — shared vCPU fits
              that pattern well and keeps costs down.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-wider text-cyan">Dedicated vCPU</p>
            <h3 className="mt-3 font-display text-xl font-semibold">Consistent performance under sustained load</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Physical CPU threads are reserved for a single server. Databases under constant load, video
              processing, and CI pipelines benefit from predictable CPU. Ask about dedicated CPU options when you
              request a quote — availability is confirmed per configuration.
            </p>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-navy-900 py-20 text-white sm:py-28">
        <div className="bg-grid-dark mask-radial absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              tone="light"
              eyebrow="Root access"
              title="Full control of your operating system"
              description="Root (Linux) or Administrator (Windows) access means you decide what runs on your server: web servers, runtimes, databases, firewalls, cron jobs, and system tuning."
            />
            <ul className="mt-8 space-y-3 text-sm text-slate-300">
              {[
                'Install any package or runtime version your application needs',
                'Configure services, users, and permissions yourself',
                'Automate setup with shell scripts, Ansible, or cloud-init style tooling',
                'With great control comes responsibility for patching and securing the OS',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <TerminalCard />
        </div>
      </section>

      <section className="container-page grid gap-5 py-20 sm:py-28 lg:grid-cols-3">
        <ServiceCard
          icon={TrendingUp}
          title="Scalability"
          description="Start with the resources you need and grow into larger allocations as your traffic and data increase. Upgrade paths for your server are confirmed in your quote."
        />
        <ServiceCard
          icon={MonitorCog}
          title="Operating system compatibility"
          description={
            <>
              Linux distributions such as Ubuntu, Debian, Rocky Linux, and AlmaLinux, plus Windows Server where your
              software requires it.{' '}
              <Link to="/#operating-systems" className="font-medium text-brand hover:underline">
                Compare operating systems
              </Link>
            </>
          }
        />
        <ServiceCard
          icon={Gauge}
          title="Security responsibilities"
          description={
            <>
              The provider secures the platform; you secure the server you administer — updates, SSH keys,
              firewall rules, and backups.{' '}
              <Link to="/security" className="font-medium text-brand hover:underline">
                Read the security guide
              </Link>
            </>
          }
        />
      </section>

      <section className="border-y border-border bg-muted/30 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="WHOLNEX configurations"
            title="VPS configurations you can request"
            description="Each request goes to the WHOLNEX team, who reply with the exact specifications, operating system image, region, and price they can confirm for you."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CONFIGURATIONS.map((config) => (
              <ServiceCard key={config.title} icon={config.icon} title={config.title} description={config.description}>
                <Link
                  to={config.href}
                  className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-brand hover:underline"
                >
                  Request a quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </ServiceCard>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm text-muted-foreground">
            Typical workloads include websites, application backends, databases, development environments, and
            containerized apps.{' '}
            <Link to="/solutions" className="font-medium text-brand hover:underline">
              See detailed use cases
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

export default VpsHostingPage;
