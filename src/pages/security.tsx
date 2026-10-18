import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bug,
  EyeOff,
  FileWarning,
  Fingerprint,
  Globe2,
  KeyRound,
  LifeBuoy,
  Lock,
  MailWarning,
  ShieldCheck,
  Wifi,
} from 'lucide-react';
import { SECURITY_CAPABILITIES } from '@/lib/capabilities';
import { SITE_IMAGES } from '@/lib/images';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { SectionHeading } from '@/components/section-heading';
import { CapabilityGrid } from '@/components/capability-grid';
import { PrivacyChecklist } from '@/components/privacy-checklist';
import { CtaBand } from '@/components/cta-band';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const VPN_COVERS = [
  { icon: Wifi, title: 'Untrusted networks', text: 'Others on public or shared Wi-Fi cannot read your traffic.' },
  { icon: EyeOff, title: 'Your provider’s view', text: 'Your internet provider sees encrypted traffic, not the sites you visit.' },
  { icon: Globe2, title: 'Your IP address', text: 'Websites see the VPN server’s address instead of your own.' },
  { icon: Lock, title: 'Data in transit', text: 'Traffic is encrypted between your device and the VPN server.' },
];

const YOU_COVER = [
  { icon: MailWarning, title: 'Phishing & scams', text: 'A VPN cannot stop you from entering a password on a fake site.' },
  { icon: Bug, title: 'Malware', text: 'Files you download can still be harmful — keep antivirus running.' },
  { icon: Fingerprint, title: 'Account tracking', text: 'Sites you sign in to still know it is you, VPN or not.' },
  { icon: KeyRound, title: 'Weak passwords', text: 'Use unique passwords and two-factor authentication.' },
];

const PRACTICES = [
  {
    icon: ShieldCheck,
    title: 'Verify what you install',
    text: 'Download WHOLNEX VPN only from this website and compare the SHA-256 checksum on the Download page before installing.',
  },
  {
    icon: Wifi,
    title: 'Connect before you browse',
    text: 'On public Wi-Fi, connect the VPN before opening apps or websites so nothing is sent unprotected first.',
  },
  {
    icon: Lock,
    title: 'Keep HTTPS in the picture',
    text: 'Once traffic leaves the VPN server it travels the regular internet. HTTPS keeps it encrypted all the way to the website.',
  },
  {
    icon: Globe2,
    title: 'Check for leaks',
    text: 'While connected, an online DNS and IP leak test should show the VPN server’s location, not your provider’s.',
  },
];

export function SecurityPage() {
  return (
    <>
      <Seo
        title="VPN Security & Privacy — What a VPN Protects"
        description="What a VPN protects and what it does not: encryption, public Wi-Fi, IP masking, kill switches, DNS leak protection, logging policies, and safe browsing habits."
        path="/security"
      />
      <PageHero
        eyebrow="Security & privacy"
        breadcrumbs={[{ name: 'Security', path: '/security' }]}
        title="What a VPN protects — and what it does not"
        description="A VPN is a powerful privacy tool, not a complete security solution. Here is exactly where it helps and where your own habits still matter."
        image={SITE_IMAGES.switchPortArray}
      />

      <section className="container-page py-20 sm:py-28">
        <SectionHeading
          eyebrow="The full picture"
          title="Two sides of staying safe online"
          description="The VPN protects your connection. You protect your accounts, your device, and what you click."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-cyan/30 bg-cyan/5 p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">A VPN helps with</p>
            <h3 className="mt-2 font-display text-xl font-semibold">Your connection</h3>
            <ul className="mt-6 space-y-4">
              {VPN_COVERS.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-cyan" aria-hidden="true" />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-brand/30 bg-brand/5 p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand">Still up to you</p>
            <h3 className="mt-2 font-display text-xl font-semibold">Your accounts and device</h3>
            <ul className="mt-6 space-y-4">
              {YOU_COVER.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="App & privacy safeguards"
            title="Safeguards to look for in a VPN"
            description="These protections separate a trustworthy VPN from a basic one. Each is marked Included once WHOLNEX confirms it."
          />
          <CapabilityGrid className="mt-10" capabilities={SECURITY_CAPABILITIES} />
        </div>
      </section>

      <section className="container-page py-20 sm:py-28">
        <SectionHeading eyebrow="Good habits" title="Getting the most from your VPN" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {PRACTICES.map((practice) => (
            <article key={practice.title} className="flex min-w-0 flex-col rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <practice.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-lg font-semibold">{practice.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{practice.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <PrivacyChecklist />
        </div>
      </section>

      <section className="container-page pb-4">
        <div className="grid gap-5 lg:grid-cols-2">
          <Alert variant="info" className="p-6">
            <FileWarning className="h-4 w-4" />
            <AlertTitle className="font-display text-base">About privacy claims</AlertTitle>
            <AlertDescription className="mt-2 text-muted-foreground">
              What WHOLNEX records about VPN connections will be stated in its Privacy Policy. Nothing on this website
              represents that WHOLNEX holds a security certification or has completed an independent audit.
            </AlertDescription>
          </Alert>
          <div className="flex flex-col justify-between gap-5 rounded-xl border border-border bg-card p-6">
            <div className="flex items-start gap-3">
              <LifeBuoy className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <div>
                <h2 className="font-display text-base font-semibold">Reporting a security concern</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  To report a vulnerability in the WHOLNEX app or service, or suspected abuse, contact the team and choose
                  “Technical support”.
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-fit" asChild>
              <Link to="/contact?category=technical-support">
                Contact the team <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

export default SecurityPage;
