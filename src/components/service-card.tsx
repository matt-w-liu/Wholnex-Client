import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: ReactNode;
  className?: string;
  children?: ReactNode;
  /** Heading level for the card title; defaults to h3. */
  as?: 'h3' | 'h4';
}

/** Feature card used across marketing pages. */
export function ServiceCard({ icon: Icon, title, description, className, children, as: Heading = 'h3' }: ServiceCardProps) {
  return (
    <div
      className={cn(
        'group relative flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-glow',
        className,
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-brand/20 bg-gradient-to-br from-primary/15 to-cyan/10 text-brand transition-colors group-hover:border-brand/40">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <Heading className="font-display text-lg font-semibold">{title}</Heading>
      <div className="text-sm leading-relaxed text-muted-foreground">{description}</div>
      {children}
    </div>
  );
}
