import { Link } from 'react-router-dom';
import { ArrowRight, Check, FlaskConical } from 'lucide-react';
import type { ResolvedPlan } from '@/lib/vps-plans';
import { SPEC_ROWS } from '@/lib/vps-plans';
import { formatCurrency, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export type BillingPeriod = 'monthly' | 'annual';

interface PlanCardProps {
  plan: ResolvedPlan;
  billing?: BillingPeriod;
  /** Show the full spec sheet (pricing page) or a compact summary (homepage preview). */
  variant?: 'full' | 'compact';
}

export function TierMeter({ tier, label }: { tier: number; label: string }) {
  return (
    <div className="flex items-center gap-2" aria-label={`Relative resource tier: ${label}`} role="img">
      <div className="flex gap-1" aria-hidden="true">
        {[1, 2, 3, 4].map((level) => (
          <span
            key={level}
            className={cn('h-1.5 w-5 rounded-full', level <= tier ? 'bg-gradient-to-r from-primary to-cyan-500' : 'bg-foreground/15')}
          />
        ))}
      </div>
      <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
    </div>
  );
}

export function PlanCard({ plan, billing = 'monthly', variant = 'full' }: PlanCardProps) {
  const price =
    plan.pricing && (billing === 'annual' && plan.pricing.annualMonthlyUsd !== undefined
      ? plan.pricing.annualMonthlyUsd
      : plan.pricing.monthlyUsd);

  return (
    <article
      className={cn(
        'relative flex h-full flex-col rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5',
        plan.highlighted ? 'ring-gradient border-transparent shadow-glow' : 'border-border hover:border-brand/40',
      )}
      aria-labelledby={`plan-${plan.id}-name`}
    >
      <div className="flex flex-wrap items-center gap-2">
        {plan.highlighted && <Badge variant="brand">Recommended</Badge>}
        {plan.source === 'draft' && (
          <Badge variant="warning" className="gap-1">
            <FlaskConical className="h-3 w-3" aria-hidden="true" /> Draft data · dev only
          </Badge>
        )}
      </div>

      <h3 id={`plan-${plan.id}-name`} className="mt-3 font-display text-xl font-semibold">
        {plan.name}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>

      <div className="mt-4">
        <TierMeter tier={plan.tier} label={plan.tierLabel} />
      </div>

      <div className="mt-6 border-t border-border pt-6">
        {price !== null && price !== undefined ? (
          <p>
            <span className="font-display text-4xl font-semibold tracking-tight">{formatCurrency(price)}</span>
            <span className="text-sm text-muted-foreground"> /month{billing === 'annual' ? ', billed annually' : ''}</span>
          </p>
        ) : (
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight">Pricing by quote</p>
            <p className="mt-1 text-sm text-muted-foreground">Specs and price confirmed in writing.</p>
          </div>
        )}
      </div>

      {variant === 'full' && <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{plan.summary}</p>}

      {plan.specs ? (
        <dl className="mt-5 space-y-2.5 text-sm">
          {SPEC_ROWS.map((row) => (
            <div key={row.key} className="flex items-start justify-between gap-4">
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className="text-right font-medium">{row.value(plan.specs!)}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <div className="mt-5">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Typical fit</p>
          <ul className="mt-3 space-y-2.5 text-sm">
            {plan.idealFor.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto flex flex-col gap-2 pt-8">
        <Button asChild variant={plan.highlighted ? 'default' : 'outline'} className="w-full">
          <Link to={`/quote?plan=${plan.id}`} aria-label={`Request a quote for ${plan.name}`}>
            Request a quote <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
        {variant === 'full' && (
          <Button asChild variant="ghost" size="sm" className="w-full text-muted-foreground">
            <Link to={`/contact?category=sales&plan=${plan.id}`}>Ask sales about {plan.name}</Link>
          </Button>
        )}
      </div>
    </article>
  );
}
