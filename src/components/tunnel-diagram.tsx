import { Globe, Laptop, Lock, Server } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TunnelDiagramProps {
  className?: string;
  /** `hero` renders on the always-dark hero surface; `card` adapts to the current theme. */
  variant?: 'hero' | 'card';
}

/**
 * Explains how a VPN works: device → encrypted tunnel → VPN server → internet, and what each
 * observer can see. Illustrative only — it does not represent a live connection.
 */
export function TunnelDiagram({ className, variant = 'card' }: TunnelDiagramProps) {
  const hero = variant === 'hero';
  const node = cn(
    'flex min-w-0 flex-col items-center gap-1.5 rounded-xl border p-2 text-center sm:gap-2 sm:p-3',
    hero ? 'border-white/10 bg-white/[0.04]' : 'border-border bg-card',
  );
  const label = cn('text-[11px] font-medium leading-tight sm:text-xs', hero ? 'text-slate-200' : 'text-foreground');
  const sub = cn('font-mono text-[10px] sm:text-[11px]', hero ? 'text-slate-400' : 'text-muted-foreground');

  return (
    <figure
      className={cn(
        'min-w-0 rounded-2xl border p-4 sm:p-6',
        hero ? 'border-white/10 bg-navy-950/80 shadow-2xl shadow-black/40 backdrop-blur-md' : 'border-border bg-card',
        className,
      )}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-1.5 sm:gap-3">
        <div className={node}>
          <Laptop className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" aria-hidden="true" />
          <span className={label}>Your device</span>
          <span className={sub}>WHOLNEX app</span>
        </div>

        <div className="flex w-10 flex-col items-center gap-1.5 sm:w-24" aria-hidden="true">
          <Lock className="h-4 w-4 text-cyan-400" />
          <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-cyan-400/15 ring-1 ring-cyan-400/40">
            <div className="tunnel-flow absolute inset-0" />
          </div>
          <span className={sub}>encrypted</span>
        </div>

        <div className={node}>
          <Server className="h-5 w-5 sm:h-6 sm:w-6 text-brand" aria-hidden="true" />
          <span className={label}>VPN server</span>
          <span className={sub}>exit IP</span>
        </div>

        <div className="flex w-7 flex-col items-center gap-1.5 sm:w-16" aria-hidden="true">
          <span className="h-4" />
          <div className={cn('h-0.5 w-full rounded-full', hero ? 'bg-slate-600' : 'bg-border')} />
          <span className={sub}>regular</span>
        </div>

        <div className={node}>
          <Globe className={cn('h-5 w-5 sm:h-6 sm:w-6', hero ? 'text-slate-300' : 'text-muted-foreground')} aria-hidden="true" />
          <span className={label}>Websites</span>
          <span className={sub}>internet</span>
        </div>
      </div>

      <dl className={cn('mt-5 grid gap-3 border-t pt-4 text-sm sm:grid-cols-2', hero ? 'border-white/10' : 'border-border')}>
        <div>
          <dt className={cn('font-mono text-[11px] uppercase tracking-wider', hero ? 'text-cyan-300' : 'text-cyan')}>
            Wi-Fi &amp; your provider see
          </dt>
          <dd className={cn('mt-1', hero ? 'text-slate-300' : 'text-muted-foreground')}>
            Encrypted traffic to a VPN server — not the sites you visit.
          </dd>
        </div>
        <div>
          <dt className={cn('font-mono text-[11px] uppercase tracking-wider', hero ? 'text-cyan-300' : 'text-cyan')}>
            Websites see
          </dt>
          <dd className={cn('mt-1', hero ? 'text-slate-300' : 'text-muted-foreground')}>
            The VPN server’s IP address instead of yours.
          </dd>
        </div>
      </dl>
      <figcaption className="sr-only">
        Diagram: your device connects through an encrypted tunnel to a VPN server, which then connects to websites on
        the internet.
      </figcaption>
    </figure>
  );
}
