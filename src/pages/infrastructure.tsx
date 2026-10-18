import { Link } from 'react-router-dom';
import {
  Activity,
  ArchiveRestore,
  Building2,
  Camera,
  Cpu,
  DatabaseBackup,
  Globe2,
  HardDrive,
  Layers3,
  LifeBuoy,
  Network,
  Scaling,
} from 'lucide-react';
import { COMPANY, COMPANY_ADDRESS_LINE } from '@/lib/constants';
import { HOSTING_REGIONS, INFRASTRUCTURE_CAPABILITIES } from '@/lib/capabilities';
import { SITE_IMAGES, type SiteImage } from '@/lib/images';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { SectionHeading } from '@/components/section-heading';
import { ServiceCard } from '@/components/service-card';
import { ResponsiveImage } from '@/components/responsive-image';
import { CapabilityGrid } from '@/components/capability-grid';
import { CtaBand } from '@/components/cta-band';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Topic {
  icon: typeof Cpu;
  eyebrow: string;
  title: string;
  body: string[];
  image: SiteImage;
}

const TOPICS: Topic[] = [
  {
    icon: Layers3,
    eyebrow: 'Server virtualization',
    title: 'Isolated virtual machines on shared hardware',
    body: [
      'A hypervisor divides each physical host into independent virtual machines. Every VPS runs its own kernel and operating system, with virtual CPUs, memory, disks, and network interfaces presented by the hypervisor.',
      'Because each guest is a separate machine, one customer’s reboot, kernel update, or misconfiguration does not affect anyone else on the host.',
    ],
    image: SITE_IMAGES.bladeServerChassis,
  },
  {
    icon: Cpu,
    eyebrow: 'CPU & memory allocation',
    title: 'Resources assigned to your server',
    body: [
      'Each VPS is allocated a number of virtual CPUs and an amount of memory. Memory is reserved for your server; CPU time is scheduled across guests on shared-vCPU hosts or reserved on dedicated-vCPU hosts.',
      'The CPU type and allocation model for your WHOLNEX server are stated in your quote, so you know what you are getting before you commit.',
    ],
    image: SITE_IMAGES.serverDriveBays,
  },
  {
    icon: Network,
    eyebrow: 'Network connectivity',
    title: 'Public addressing and predictable bandwidth',
    body: [
      'A VPS is reachable over public IPv4 and, where supported, IPv6 addresses. Port speed determines how fast data moves at any instant; the transfer allowance determines how much moves each month.',
      'Your quote lists the IP allocation, port speed, and monthly transfer included with your configuration.',
    ],
    image: SITE_IMAGES.fiberPatchPanel,
  },
];

const OPERATIONS = [
  {
    icon: HardDrive,
    title: 'SSD / NVMe storage',
    description:
      'Solid-state storage cuts latency for databases, package installs, and busy file systems. NVMe connects flash storage over PCIe for even lower latency than SATA SSDs.',
  },
  {
    icon: Camera,
    title: 'Snapshots',
    description:
      'A point-in-time image of a server’s disk. Take one before a major upgrade so you can roll back quickly if something goes wrong.',
  },
  {
    icon: DatabaseBackup,
    title: 'Backups',
    description:
      'Recurring copies of your data stored separately from the server. Backups protect against hardware failure, accidental deletion, and ransomware — snapshots alone do not.',
  },
  {
    icon: ArchiveRestore,
    title: 'Recovery',
    description:
      'A backup is only useful if it restores. Document how to rebuild your server and test restores periodically, whatever backup method you use.',
  },
  {
    icon: Activity,
    title: 'Monitoring',
    description:
      'Track CPU, memory, disk, and network usage, plus uptime checks for your services, so you can act on trends before they become outages.',
  },
  {
    icon: Scaling,
    title: 'Scalability',
    description:
      'Grow vertically with larger allocations, or horizontally by adding servers behind a load balancer as traffic increases.',
  },
];

export function InfrastructurePage() {
  return (
    <>
      <Seo
        title="VPS Infrastructure — Virtualization, Storage & Networking"
        description="How WHOLNEX VPS infrastructure works: virtualization, CPU and memory allocation, SSD/NVMe storage, networking, backups, monitoring, and hosting regions."
        path="/infrastructure"
      />
      <PageHero
        eyebrow="Infrastructure"
        breadcrumbs={[{ name: 'Infrastructure', path: '/infrastructure' }]}
        title="The infrastructure behind a virtual private server"
        description="Virtualization, compute, storage, and networking — explained clearly, with every capability of your WHOLNEX server confirmed in your quote."
        image={SITE_IMAGES.datacenterAisle}
      />

      <section className="container-page py-20 sm:py-24">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <Building2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="font-display text-xl font-semibold">Company headquarters</h2>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {COMPANY.name}’s business address is {COMPANY_ADDRESS_LINE}. This is a business contact address — it is
              not a data center, and customer servers are not hosted there.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan/10 text-cyan">
                <Globe2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="font-display text-xl font-semibold">Hosting regions</h2>
            </div>
            {HOSTING_REGIONS.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {HOSTING_REGIONS.map((region) => (
                  <li key={region.id} className="rounded-lg border border-border px-3 py-1.5 text-sm">
                    {region.name}, {region.country}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                WHOLNEX confirms the hosting region for each server in its written quote. Published regions will be
                listed here. Tell us your preferred location when you{' '}
                <Link to="/quote" className="font-medium text-brand hover:underline">
                  request a configuration
                </Link>
                .
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="space-y-20 pb-20 sm:space-y-28 sm:pb-28">
        {TOPICS.map((topic, index) => (
          <div key={topic.eyebrow} className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className={cn(index % 2 === 1 && 'lg:order-2')}>
              <topic.icon className="h-7 w-7 text-brand" aria-hidden="true" />
              <SectionHeading className="mt-5" eyebrow={topic.eyebrow} title={topic.title} />
              <div className="mt-5 space-y-4 text-muted-foreground">
                {topic.body.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border">
              <ResponsiveImage
                image={topic.image}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-[16/10] h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </section>

      <section className="border-y border-border bg-muted/30 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Storage, data protection & operations"
            title="Keeping servers fast, recoverable, and observable"
            description="The operational building blocks every production VPS should have a plan for."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OPERATIONS.map((item) => (
              <ServiceCard key={item.title} icon={item.icon} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 sm:py-28">
        <SectionHeading
          eyebrow="Capabilities"
          title="Infrastructure capabilities to confirm"
          description="Use this checklist when you evaluate your configuration. Items WHOLNEX has confirmed as standard are marked Included."
        />
        <CapabilityGrid className="mt-10" capabilities={INFRASTRUCTURE_CAPABILITIES} />
      </section>

      <section className="container-page pb-4">
        <div className="grid gap-8 rounded-2xl border border-border bg-card p-8 sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
            <LifeBuoy className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-display text-xl font-semibold">Availability and support</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              WHOLNEX does not currently publish a service level agreement. Any availability commitments and support
              terms that apply to your server are defined in your quote and service terms. Technical questions can
              be sent to the team at any time.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/contact?category=technical-support">Contact support</Link>
          </Button>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

export default InfrastructurePage;
