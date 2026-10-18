import { Link } from 'react-router-dom';
import { CheckCircle2, Info } from 'lucide-react';
import type { Capability } from '@/lib/capabilities';
import { confirmedCount } from '@/lib/capabilities';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CapabilityGridProps {
  capabilities: Capability[];
  className?: string;
  /** Show the availability note above the grid. */
  showNotice?: boolean;
}

/**
 * Renders infrastructure or security topics. A capability shows an "Included" badge only when
 * WHOLNEX has confirmed it in src/lib/capabilities.ts; otherwise it is presented as a topic to
 * confirm with WHOLNEX.
 */
export function CapabilityGrid({ capabilities, className, showNotice = true }: CapabilityGridProps) {
  const allUnconfirmed = confirmedCount(capabilities) === 0;

  return (
    <div className={cn('space-y-6', className)}>
      {showNotice && (
        <p className="flex items-start gap-2 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
          <span>
            {allUnconfirmed
              ? 'These are the features to look for in any VPN. Each is marked Included here once WHOLNEX confirms it for its app and network.'
              : 'Items marked “Included” are confirmed parts of the WHOLNEX service. Ask us about the others.'}{' '}
            <Link to="/contact?category=sales" className="font-medium text-brand underline-offset-4 hover:underline">
              Ask the WHOLNEX team
            </Link>
          </span>
        </p>
      )}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((capability) => (
          <li key={capability.id} className="flex h-full flex-col gap-2 rounded-xl border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-base font-semibold">{capability.title}</h3>
              {capability.confirmed && (
                <Badge variant="success" className="shrink-0 gap-1">
                  <CheckCircle2 className="h-3 w-3" aria-hidden="true" /> Included
                </Badge>
              )}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{capability.description}</p>
            {capability.confirmed && capability.detail && (
              <p className="mt-auto pt-1 font-mono text-xs text-brand">{capability.detail}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
