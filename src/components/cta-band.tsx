import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CtaBandProps {
  title?: ReactNode;
  description?: ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

/** Closing call-to-action band on an always-dark surface. */
export function CtaBand({
  title = 'Ready to browse more privately?',
  description = 'Download WHOLNEX VPN for Windows, or tell us what you and your team need and we will confirm plan details and pricing in writing.',
  primary = { label: 'Download for Windows', href: '/download' },
  secondary = { label: 'View VPN Plans', href: '/pricing' },
}: CtaBandProps) {
  return (
    <section className="container-page py-16 sm:py-24">
      <div className="relative isolate overflow-hidden rounded-2xl border border-navy-600 bg-navy-900 px-6 py-14 text-center sm:px-12 sm:py-16">
        <div className="bg-grid-dark mask-radial absolute inset-0 -z-10" aria-hidden="true" />
        <div className="absolute -left-24 -top-24 -z-10 h-72 w-72 rounded-full bg-primary/30 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -right-24 -z-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" aria-hidden="true" />
        <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-slate-300">{description}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link to={primary.href}>
              {primary.label} <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-slate-600 bg-transparent text-white hover:border-slate-400 hover:bg-white/5 hover:text-white"
            asChild
          >
            <Link to={secondary.href}>{secondary.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
