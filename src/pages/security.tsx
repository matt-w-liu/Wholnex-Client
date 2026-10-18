import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Building,
  DatabaseBackup,
  FileWarning,
  KeyRound,
  LifeBuoy,
  RefreshCw,
  ServerCog,
  Shield,
  UserCog,
  Users,
} from 'lucide-react';
import { SECURITY_CAPABILITIES } from '@/lib/capabilities';
import { SITE_IMAGES } from '@/lib/images';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { SectionHeading } from '@/components/section-heading';
import { CapabilityGrid } from '@/components/capability-grid';
import { HardeningChecklist } from '@/components/hardening-checklist';
import { CtaBand } from '@/components/cta-band';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const PROVIDER_LAYERS = [
  { icon: Building, title: 'Physical facility', text: 'Data center access control, power, and cooling.' },
  { icon: ServerCog, title: 'Host hardware', text: 'Physical servers, storage, and network equipment.' },
  { icon: Shield, title: 'Virtualization layer', text: 'The hypervisor that isolates guest virtual machines.' },
  { icon: Activity, title: 'Provider network', text: 'Upstream connectivity and any network-level filtering.' },
];

const CUSTOMER_LAYERS = [
  { icon: RefreshCw, title: 'Operating system', text: 'Updates, kernel patches, and installed packages.' },
  { icon: Users, title: 'Accounts & access', text: 'Users, SSH keys, sudo rights, and passwords.' },
  { icon: Shield, title: 'Server firewall', text: 'Which ports and services are exposed.' },
  { icon: DatabaseBackup, title: 'Applications & data', text: 'App security, secrets, and backups of your data.' },
];

const PRACTICES = [
  {
    icon: KeyRound,
    title: 'SSH key authentication',
    text: 'Keys are far harder to brute-force than passwords. Generate a key pair on your computer, install the public key on the server, then disable password logins.',
    code: ['ssh-keygen -t ed25519 -C "you@example.com"', 'ssh-copy-id admin@your-server.example'],
  },
  {
    icon: Shield,
    title: 'Host firewall',
    text: 'Deny inbound traffic by default and open only the ports your services need. Remember to allow SSH before enabling the firewall.',
    code: ['sudo ufw default deny incoming', 'sudo ufw allow OpenSSH', 'sudo ufw allow 443/tcp', 'sudo ufw enable'],
  },
  {
    icon: RefreshCw,
    title: 'OS patching',
    text: 'Most compromises exploit known, already-patched vulnerabilities. Apply updates promptly and enable automatic security updates.',
    code: ['sudo apt update && sudo apt upgrade -y', 'sudo apt install unattended-upgrades'],
  },
  {
    icon: UserCog,
    title: 'Access management',
    text: 'Use a named, non-root account per administrator, grant sudo only where needed, and remove access promptly when people leave.',
    code: ['sudo adduser deploy', 'sudo usermod -aG sudo deploy', '# /etc/ssh/sshd_config → PermitRootLogin no'],
  },
  {
    icon: DatabaseBackup,
    title: 'Backups & disaster recovery',
    text: 'Follow the 3-2-1 rule: three copies of important data, on two kinds of storage, with one copy off-site. Write down how to rebuild the server and test restores.',
    code: ['pg_dump mydb | gzip > mydb-$(date +%F).sql.gz', 'restic backup /var/www /etc'],
  },
  {
    icon: Activity,
    title: 'Monitoring & intrusion protection',
    text: 'Watch authentication logs and resource usage, and block repeated failed logins automatically.',
    code: ['sudo apt install fail2ban', 'sudo journalctl -u ssh --since today'],
  },
];

export function SecurityPage() {
  return (
    <>
      <Seo
        title="VPS Security — Shared Responsibility & Best Practices"
        description="How VPS security works: the shared responsibility model, SSH keys, firewalls, patching, access management, backups, disaster recovery, and monitoring for WHOLNEX servers."
        path="/security"
      />
      <PageHero
        eyebrow="Security"
        breadcrumbs={[{ name: 'Security', path: '/security' }]}
        title="Security is shared. Here is exactly how."
        description="A VPS gives you full control of your server — and with it, responsibility for securing what runs inside. This guide explains each layer and how to protect it."
        image={SITE_IMAGES.switchPortArray}
      />

      <section className="container-page py-20 sm:py-28">
        <SectionHeading
          eyebrow="Shared responsibility model"
          title="Who secures what"
          description="Every VPS provider and customer divide security along the virtualization boundary. Your WHOLNEX quote and service terms state which provider-side controls apply to your server."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-cyan/30 bg-cyan/5 p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">Provider responsibility</p>
            <h3 className="mt-2 font-display text-xl font-semibold">Below the virtual machine</h3>
            <ul className="mt-6 space-y-4">
              {PROVIDER_LAYERS.map((layer) => (
                <li key={layer.title} className="flex items-start gap-3">
                  <layer.icon className="mt-0.5 h-5 w-5 shrink-0 text-cyan" aria-hidden="true" />
                  <div>
                    <p className="font-medium">{layer.title}</p>
                    <p className="text-sm text-muted-foreground">{layer.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-brand/30 bg-brand/5 p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand">Customer responsibility</p>
            <h3 className="mt-2 font-display text-xl font-semibold">Inside your server</h3>
            <ul className="mt-6 space-y-4">
              {CUSTOMER_LAYERS.map((layer) => (
                <li key={layer.title} className="flex items-start gap-3">
                  <layer.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                  <div>
                    <p className="font-medium">{layer.title}</p>
                    <p className="text-sm text-muted-foreground">{layer.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-5 text-sm text-muted-foreground">
          If your quote includes management services, some customer-side tasks may be shared with WHOLNEX as described
          in that quote.
        </p>
      </section>

      <section className="border-y border-border bg-muted/30 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="WHOLNEX-provided controls"
            title="Provider-side security controls"
            description="Network and platform protections differ between providers. These are the controls to confirm for your WHOLNEX server; confirmed standard controls are marked Included."
          />
          <CapabilityGrid className="mt-10" capabilities={SECURITY_CAPABILITIES} />
        </div>
      </section>

      <section className="container-page py-20 sm:py-28">
        <SectionHeading
          eyebrow="Customer-configured practices"
          title="Securing your server, step by step"
          description="Examples use Ubuntu/Debian commands; equivalents exist for every major distribution."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {PRACTICES.map((practice) => (
            <article key={practice.title} className="flex min-w-0 flex-col rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <practice.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-lg font-semibold">{practice.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{practice.text}</p>
              <pre className="mt-5 overflow-x-auto rounded-lg border border-white/10 bg-navy-950 p-4 font-mono text-[13px] leading-6 text-slate-100">
                {practice.code.map((line) => (
                  <div key={line}>
                    {line.startsWith('#') ? (
                      <span className="text-slate-400">{line}</span>
                    ) : (
                      <>
                        <span className="text-cyan-400">$ </span>
                        {line}
                      </>
                    )}
                  </div>
                ))}
              </pre>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <HardeningChecklist />
        </div>
      </section>

      <section className="container-page pb-4">
        <div className="grid gap-5 lg:grid-cols-2">
          <Alert variant="info" className="p-6">
            <FileWarning className="h-4 w-4" />
            <AlertTitle className="font-display text-base">Compliance requirements</AlertTitle>
            <AlertDescription className="mt-2 text-muted-foreground">
              Nothing on this website represents that WHOLNEX holds a compliance certification or attestation such as
              SOC 2, ISO/IEC 27001, or PCI DSS. If your project has compliance obligations, describe them in your
              quote request so they can be addressed directly.
            </AlertDescription>
          </Alert>
          <div className="flex flex-col justify-between gap-5 rounded-xl border border-border bg-card p-6">
            <div className="flex items-start gap-3">
              <LifeBuoy className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <div>
                <h2 className="font-display text-base font-semibold">Reporting a security concern</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  To report suspected abuse or a security issue involving WHOLNEX services, contact the team and choose
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
