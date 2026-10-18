import { Link } from 'react-router-dom';
import { MessageSquare, ShieldCheck } from 'lucide-react';
import { WINDOWS_DOWNLOAD } from '@/lib/download';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { SectionHeading } from '@/components/section-heading';
import { DownloadCard, PlatformAvailability } from '@/components/download-card';
import { WorkflowSteps } from '@/components/workflow-steps';
import { Button } from '@/components/ui/button';

export function DownloadPage() {
  return (
    <>
      <Seo
        title="Download WHOLNEX VPN for Windows"
        description="Download the WHOLNEX VPN app for Windows. Includes the installer size and SHA-256 checksum so you can verify your download."
        path="/download"
      />
      <PageHero
        size="compact"
        eyebrow="Download"
        breadcrumbs={[{ name: 'Download', path: '/download' }]}
        title="Get WHOLNEX VPN"
        description="Install the app on your Windows PC to start using WHOLNEX VPN."
      />

      <section className="container-page grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.3fr_1fr]">
        <DownloadCard />

        <div className="space-y-5">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-brand" aria-hidden="true" />
              <h2 className="font-display text-lg font-semibold">Verify your download</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Compare the file’s SHA-256 checksum with the value shown here before installing. In Windows PowerShell:
            </p>
            <pre className="mt-3 overflow-x-auto rounded-lg border border-white/10 bg-navy-950 p-3 font-mono text-xs leading-6 text-slate-100">
              <span className="text-cyan-400">PS&gt; </span>Get-FileHash .\{WINDOWS_DOWNLOAD.fileName}
            </pre>
            <p className="mt-3 text-sm text-muted-foreground">
              If the values do not match, do not run the file — download it again from this page and contact us.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-brand" aria-hidden="true" />
              <h2 className="font-display text-lg font-semibold">Need help installing?</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Tell us your Windows version and what you see on screen, and the team will reply by email.
            </p>
            <Button variant="outline" className="mt-4" asChild>
              <Link to="/contact?category=technical-support">Contact support</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Platforms"
            title="Available devices"
            description="WHOLNEX VPN is available for Windows today. Want it on another device? Let us know."
            actions={
              <Button variant="outline" asChild>
                <Link to="/contact?category=general">Request a platform</Link>
              </Button>
            }
          />
          <PlatformAvailability className="mt-10" />
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <SectionHeading eyebrow="Getting started" title="From download to connected" />
        <WorkflowSteps className="mt-12" />
      </section>
    </>
  );
}

export default DownloadPage;
