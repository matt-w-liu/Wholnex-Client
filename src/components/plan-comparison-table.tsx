import type { ResolvedPlan } from '@/lib/vps-plans';
import { SPEC_ROWS } from '@/lib/vps-plans';
import { formatCurrency } from '@/lib/utils';
import { TierMeter } from '@/components/plan-card';

interface PlanComparisonTableProps {
  plans: ResolvedPlan[];
}

interface ComparisonRow {
  label: string;
  render: (plan: ResolvedPlan) => React.ReactNode;
}

/**
 * Side-by-side plan comparison. Shows the published spec sheet when plan data exists; otherwise
 * compares positioning only, so no unconfirmed numbers are ever displayed.
 */
export function PlanComparisonTable({ plans }: PlanComparisonTableProps) {
  const hasSpecs = plans.some((plan) => plan.specs);

  const rows: ComparisonRow[] = [
    { label: 'Positioning', render: (plan) => plan.tagline },
    { label: 'Relative resources', render: (plan) => <TierMeter tier={plan.tier} label={plan.tierLabel} /> },
    ...(hasSpecs
      ? SPEC_ROWS.map((row) => ({
          label: row.label,
          render: (plan: ResolvedPlan) => (plan.specs ? row.value(plan.specs) : 'By quote'),
        }))
      : [
          {
            label: 'Typical workloads',
            render: (plan: ResolvedPlan) => (
              <ul className="space-y-1">
                {plan.idealFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ),
          },
        ]),
    {
      label: 'Monthly price',
      render: (plan) => (plan.pricing ? formatCurrency(plan.pricing.monthlyUsd) : 'By quote'),
    },
  ];

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card" role="region" aria-label="VPS plan comparison" tabIndex={0}>
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <caption className="sr-only">Comparison of WHOLNEX VPS plan tiers</caption>
        <thead>
          <tr className="border-b border-border bg-muted/40">
            <th scope="col" className="w-48 px-5 py-4 font-medium text-muted-foreground">
              Plan
            </th>
            {plans.map((plan) => (
              <th key={plan.id} scope="col" className="px-5 py-4 font-display text-base font-semibold">
                {plan.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-border last:border-0">
              <th scope="row" className="px-5 py-4 align-top font-medium text-muted-foreground">
                {row.label}
              </th>
              {plans.map((plan) => (
                <td key={plan.id} className="px-5 py-4 align-top">
                  {row.render(plan)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
