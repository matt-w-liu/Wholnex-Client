import { initials } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface LeaderCardProps {
  name: string;
  title: string;
  className?: string;
}

/**
 * Leadership card with an initials avatar. No portrait or biography is shown until WHOLNEX
 * supplies an authorized photo and approved biography.
 */
export function LeaderCard({ name, title, className }: LeaderCardProps) {
  return (
    <div className={cn('ring-gradient flex items-center gap-5 rounded-2xl bg-card p-6 sm:p-8', className)}>
      <div
        className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-cyan-500 font-display text-2xl font-bold tracking-wide text-white shadow-glow"
        aria-hidden="true"
      >
        {initials(name)}
      </div>
      <div>
        <p className="font-display text-xl font-semibold">{name}</p>
        <p className="mt-1 text-sm font-medium text-brand">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">WHOLNEX LLC</p>
      </div>
    </div>
  );
}
