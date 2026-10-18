import { Link } from 'react-router-dom';
import { Building2, Gauge, Globe2, LifeBuoy, MapPin, Network, Route } from 'lucide-react';
import { COMPANY, COMPANY_ADDRESS_LINE } from '@/lib/constants';
import { NETWORK_CAPABILITIES, SERVER_LOCATIONS } from '@/lib/capabilities';
import { SITE_IMAGES } from '@/lib/images';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { SectionHeading } from '@/components/section-heading';
import { ServiceCard } from '@/components/service-card';
import { ResponsiveImage } from '@/components/responsive-image';
import { CapabilityGrid } from '@/components/capability-grid';
import { CtaBand } from '@/components/cta-band';
import { Button } from '@/components/ui/button';

const PERFORMANCE = [
  {
    icon: MapPin,
    title: 'Distance matters',
    description:
      'Every extra mile between you and the VPN server adds latency. Connecting to a nearby server usually gives the fastest, most responsive connection.',
  },
  {
    icon: Gauge,
    title: 'Encryption overhead',
    description:
      'Encrypting and decrypting traffic takes a little processing time and adds a small amount of data, so speeds are typically somewhat lower than without a VPN.',
  },
  {
    icon: Route,
    title: 'Server load and routing',
    description:
      'How busy a server is and how well it connects to the wider internet both affect speed. Switching servers can help if a connection feels slow.',
  },
];

export function NetworkPage() {
  return (
    <>
      <Seo
        title="VPN Network — Servers, Locations & Protocols"
        description="The WHOLNEX VPN network: server locations, VPN protocols, network features such as split tunneling and dedicated IPs, and what affects VPN speed."
        path="/network"
      />
      <PageHero
        eyebrow="Network"
        breadcrumbs={[{ name: 'Network', path: '/network' }]}
        title="The network behind your VPN connection"
        description="Server locations, protocols, and network features — published here as WHOLNEX confirms them."
        image={SITE_IMAGES.datacenterAisle}
      />

      <section className="container-page py-20 sm:py-24">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan/10 text-cyan">
                <Globe2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="font-display text-xl font-semibold">Server locations</h2>
            </div>
            {SERVER_LOCATIONS.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {SERVER_LOCATIONS.map((location) => (
                  <li key={location.id} className="rounded-lg border border-border px-3 py-1.5 text-sm">
                    {location.city}, {location.country}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                WHOLNEX will publish its VPN server locations here. If you need specific locations — for example for a
                team — tell us when you{' '}
                <Link to="/quote" className="font-medium text-brand hover:underline">
                  request a plan
                </Link>
                .
              </p>
            )}
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <Building2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="font-display text-xl font-semibold">Company headquarters</h2>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {COMPANY.name}’s business address is {COMPANY_ADDRESS_LINE}. This is a business contact address — it is not
              a VPN server location.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Network className="h-7 w-7 text-brand" aria-hidden="true" />
            <SectionHeading
              className="mt-5"
              eyebrow="How the network works"
              title="Your device, a VPN server, and the internet"
              description="Each VPN server terminates encrypted tunnels from users’ devices and forwards their traffic to the internet using the server’s own address."
            />
            <div className="mt-5 space-y-4 text-muted-foreground">
              <p>
                The server you choose determines the IP address websites see and, largely, the speed of your connection.
                More server locations give you more choice; well-connected servers keep latency low.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border">
            <ResponsiveImage
              image={SITE_IMAGES.ethernetSwitchCabling}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[16/10] h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-page py-20 sm:py-28">
        <SectionHeading
          eyebrow="Speed"
          title="What affects VPN speed"
          description="Understanding these factors helps you pick the best server for what you are doing."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PERFORMANCE.map((item) => (
            <ServiceCard key={item.title} icon={item.icon} title={item.title} description={item.description} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Network features"
            title="Network features to confirm"
            description="Features vary between VPN services. Items WHOLNEX has confirmed for its app and network are marked Included."
          />
          <CapabilityGrid className="mt-10" capabilities={NETWORK_CAPABILITIES} />
        </div>
      </section>

      <section className="container-page pt-20 sm:pt-24">
        <div className="grid gap-8 rounded-2xl border border-border bg-card p-8 sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
            <LifeBuoy className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-display text-xl font-semibold">Availability and support</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              WHOLNEX does not currently publish a service level agreement. Any availability commitments that apply to
              your plan will be stated in writing. Connection problems can be reported to the team at any time.
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

export default NetworkPage;
