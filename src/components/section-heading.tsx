import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  actions?: ReactNode;
  /** Heading level; defaults to h2. */
  as?: 'h2' | 'h3';
  /** Use fixed light text for always-dark sections. */
  tone?: 'auto' | 'light';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  actions,
  as: Heading = 'h2',
  tone = 'auto',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        actions && 'sm:flex-row sm:items-end sm:justify-between',
        className,
      )}
    >
      <div className={cn('max-w-2xl space-y-3', align === 'center' && 'mx-auto')}>
        {eyebrow && (
          <p
            className={cn(
              'font-mono text-xs font-medium uppercase tracking-[0.18em]',
              tone === 'light' ? 'text-cyan-300' : 'text-brand',
            )}
          >
            {eyebrow}
          </p>
        )}
        <Heading
          className={cn(
            'text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl',
            tone === 'light' && 'text-white',
          )}
        >
          {title}
        </Heading>
        {description && (
          <p className={cn('text-pretty text-base leading-relaxed sm:text-lg', tone === 'light' ? 'text-slate-300' : 'text-muted-foreground')}>
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}
