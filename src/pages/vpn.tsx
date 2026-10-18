import { Link } from 'react-router-dom';
import { ArrowRight, Download, EyeOff, Globe2, KeyRound, Lock, Server, ShieldAlert, Wifi } from 'lucide-react';
import { SITE_IMAGES } from '@/lib/images';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { SectionHeading } from '@/components/section-heading';
import { ServiceCard } from '@/components/service-card';
import { TunnelDiagram } from '@/components/tunnel-diagram';
import { CtaBand } from '@/components/cta-band';
import { Button } from '@/components/ui/button';

const STEPS = [
  {
    icon: KeyRound,
    title: '1. A secure handshake',
    description:
      'When you connect, the app and the VPN server authenticate each other and agree on encryption keys that only they hold.',
  },
  {
    icon: Lock,
    title: '2. Traffic is encrypted',
    description:
      'Your device encrypts outgoing traffic and sends it through the tunnel. Anyone on the network in between sees only scrambled data.',
  },
  {
    icon: Server,
    title: '3. The server forwards it',
    description:
      'The VPN server decrypts your traffic and sends it on to its destination using the server’s own IP address.',
  },
  {
    icon: Globe2,
    title: '4. Replies come back the same way',
    description: 'Responses return to the VPN server, are encrypted again, and travel back through the tunnel to your device.',
  },
];

const COMPARISON = [
  { label: 'Encrypts your traffic', none: 'No', proxy: 'Usually not', vpn: 'Yes, between device and server' },
  { label: 'Covers', none: '—', proxy: 'Usually one app or browser', vpn: 'All traffic from the device' },
  { label: 'Hides sites from your provider', none: 'No', proxy: 'Partly', vpn: 'Yes' },
  { label: 'Masks your IP from websites', none: 'No', proxy: 'Yes', vpn: 'Yes' },
  { label: 'Protects on public Wi-Fi', none: 'Only HTTPS sites', proxy: 'Limited', vpn: 'Yes' },
];

const PROTOCOLS = [
  {
    name: 'WireGuard',
    description: 'A modern, lean protocol with a small codebase and fast connection times. Widely used in current VPN apps.',
  },
  {
    name: 'OpenVPN',
    description: 'A long-established open-source protocol that is highly configurable and works across many network setups.',
  },
  {
    name: 'IKEv2/IPsec',
    description: 'A standards-based protocol known for reconnecting quickly when a device switches networks.',
  },
];

export function VpnPage() {
  return (
    <>
      <Seo
        title="How a VPN Works — WHOLNEX VPN"
        description="Learn how a VPN works: encrypted tunnels, VPN servers, protocols like WireGuard and OpenVPN, what a VPN protects, and how it compares to a proxy."
        path="/vpn"
      />
      <PageHero
        eyebrow="WHOLNEX VPN"
        breadcrumbs={[{ name: 'VPN', path: '/vpn' }]}
        title="How a VPN keeps your connection private"
        description="A virtual private network creates an encrypted tunnel between your device and a VPN server. Here is what happens when you connect — and what that does and does not protect."
        image={SITE_IMAGES.networkRackCabinets}
        actions={
          <>
            <Button size="lg" asChild>
              <Link to="/download">
                <Download aria-hidden="true" /> Download for Windows
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 bg-transparent text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link to="/pricing">View plans</Link>
            </Button>
          </>
        }
      />

      <section className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:items-center [&>*]:min-w-0">
        <div>
          <SectionHeading
            eyebrow="What is a VPN"
            title="An encrypted tunnel for your internet traffic"
            description="Without a VPN, the networks your traffic crosses — public Wi-Fi, your router, your internet provider — can see where it is going. A VPN changes that."
          />
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              The VPN app on your device encrypts traffic before it leaves, and only the VPN server can decrypt it. To
              everything in between, your connection looks like a single stream of encrypted data to one server.
            </p>
            <p>
              The server then connects to websites on your behalf, so they see the server’s IP address rather than your
              own.
            </p>
          </div>
        </div>
        <TunnelDiagram />
      </section>

      <section className="border-y border-border bg-muted/30 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="Step by step" title="What happens when you connect" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <ServiceCard key={step.title} icon={step.icon} title={step.title} description={step.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 sm:py-28">
        <SectionHeading
          eyebrow="Compare"
          title="No VPN, a proxy, or a VPN?"
          description="Proxies and VPNs both route traffic through another server, but only a VPN encrypts everything your device sends."
        />
        <div className="mt-12 overflow-x-auto rounded-xl border border-border bg-card" role="region" aria-label="Connection type comparison" tabIndex={0}>
          <table className="w-full min-w-[680px] text-left text-sm">
            <caption className="sr-only">Comparison of browsing without a VPN, with a proxy, and with a VPN</caption>
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th scope="col" className="px-5 py-4 font-medium text-muted-foreground">
                  &nbsp;
                </th>
                <th scope="col" className="px-5 py-4 font-display font-semibold">
                  No VPN
                </th>
                <th scope="col" className="px-5 py-4 font-display font-semibold">
                  Web proxy
                </th>
                <th scope="col" className="bg-brand/5 px-5 py-4 font-display font-semibold text-brand">
                  VPN
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.label} className="border-b border-border last:border-0">
                  <th scope="row" className="px-5 py-4 font-medium text-muted-foreground">
                    {row.label}
                  </th>
                  <td className="px-5 py-4">{row.none}</td>
                  <td className="px-5 py-4">{row.proxy}</td>
                  <td className="bg-brand/5 px-5 py-4 font-medium">{row.vpn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-navy-900 py-20 text-white sm:py-28">
        <div className="bg-grid-dark mask-radial absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-page">
          <SectionHeading
            tone="light"
            eyebrow="Protocols"
            title="The rules behind the tunnel"
            description="A VPN protocol defines how the tunnel is set up and encrypted. These are the most widely used today."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {PROTOCOLS.map((protocol) => (
              <div key={protocol.name} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <p className="font-mono text-sm font-medium text-cyan-300">{protocol.name}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{protocol.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm text-slate-400">
            The protocols used by the WHOLNEX app are listed on our{' '}
            <Link to="/network" className="font-medium text-cyan-300 hover:underline">
              Network page
            </Link>{' '}
            once confirmed.
          </p>
        </div>
      </section>

      <section className="container-page grid gap-5 py-20 sm:py-28 lg:grid-cols-3">
        <ServiceCard
          icon={Wifi}
          title="What it protects"
          description="Data in transit between your device and the VPN server — especially valuable on public and shared networks."
        />
        <ServiceCard
          icon={EyeOff}
          title="What it hides"
          description="The sites you visit from your internet provider and local network, and your IP address from the sites themselves."
        />
        <ServiceCard
          icon={ShieldAlert}
          title="What it does not do"
          description={
            <>
              It does not stop phishing, malware, or tracking by accounts you sign in to, and it does not make you
              anonymous.{' '}
              <Link to="/security" className="font-medium text-brand hover:underline">
                Read the security guide
              </Link>
            </>
          }
        />
      </section>

      <section className="container-page pb-4">
        <div className="flex flex-col items-start gap-5 rounded-2xl border border-border bg-card p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold">Where can I use WHOLNEX VPN?</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Remote work, public Wi-Fi, travel, and everyday privacy — see the situations where a VPN helps most.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/solutions">
              Explore solutions <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

export default VpnPage;
