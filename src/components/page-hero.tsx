import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { SiteImage } from '@/lib/images';
import type { BreadcrumbEntry } from '@/components/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ResponsiveImage } from '@/components/responsive-image';

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  align?: 'left' | 'center';
  image?: SiteImage;
  breadcrumbs?: BreadcrumbEntry[];
  className?: string;
  size?: 'default' | 'compact';
  children?: ReactNode;
}

/**
 * Inner-page hero. Always rendered on a dark navy surface (in both themes) so photography and
 * the brand gradient read consistently; text colors here are fixed for that surface.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  align = 'left',
  image,
  breadcrumbs,
  className,
  size = 'default',
  children,
}: PageHeroProps) {
  return (
    <section className={cn('relative isolate overflow-hidden bg-navy-900 text-white', className)}>
      {image && (
        <div className="absolute inset-0 -z-10">
          <ResponsiveImage image={image} alt="" priority className="h-full w-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/90 to-navy-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-navy-900/50" />
        </div>
      )}
      <div className="bg-grid-dark mask-fade-b absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="absolute -right-40 -top-40 -z-10 h-[480px] w-[480px] rounded-full bg-primary/25 blur-3xl"
        aria-hidden="true"
      />

      <div
        className={cn(
          'container-page relative flex flex-col gap-6',
          size === 'default' ? 'py-20 sm:py-28' : 'py-14 sm:py-20',
          align === 'center' && 'items-center text-center',
        )}
      >
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        {eyebrow && (
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
            {eyebrow}
          </span>
        )}
        <h1 className="max-w-4xl text-balance font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className={cn('max-w-2xl text-pretty text-lg leading-relaxed text-slate-300', align === 'center' && 'mx-auto')}>
            {description}
          </p>
        )}
        {actions && <div className="flex flex-wrap items-center gap-3 pt-2">{actions}</div>}
        {children}
      </div>
    </section>
  );
}
