import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, useWatch, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  MANAGEMENT_PREFERENCE_LABELS,
  OPERATING_SYSTEM_PREFERENCE_LABELS,
  QUOTE_PLAN_INTEREST_LABELS,
  QUOTE_TIMELINE_LABELS,
  VPS_WORKLOAD_LABELS,
  managementPreferences,
  operatingSystemPreferences,
  quoteRequestSchema,
  quoteTimelines,
  vpsWorkloads,
  type ManagementPreference,
  type OperatingSystemPreference,
  type QuotePlanInterest,
  type QuoteRequestInput,
  type QuoteTimeline,
  type VpsWorkload,
} from '@wholnex/shared';
import { CheckCircle2, Loader2, Send, ServerCog } from 'lucide-react';
import { toast } from 'sonner';
import { apiPost, ApiError } from '@/lib/api';
import { getPlanById, PLAN_STARTING_POINTS, VPS_PLANS } from '@/lib/vps-plans';
import { ChoiceChips, type ChoiceOption } from '@/components/choice-chips';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

type QuoteFormValues = Omit<QuoteRequestInput, 'consent'> & { consent: boolean };

export interface QuoteFormDefaults {
  planInterest?: QuotePlanInterest;
  operatingSystem?: OperatingSystemPreference;
  workload?: VpsWorkload;
}

const PLAN_OPTIONS: ChoiceOption<QuotePlanInterest>[] = [
  ...VPS_PLANS.map((plan) => ({ value: plan.id, label: plan.name, description: plan.tagline })),
  { value: 'custom', label: QUOTE_PLAN_INTEREST_LABELS.custom, description: 'Specify your own resources' },
  { value: 'not-sure', label: QUOTE_PLAN_INTEREST_LABELS['not-sure'], description: 'Recommend a size for me' },
];

const NOT_SPECIFIED = 'unspecified';
const VCPU_OPTIONS = [1, 2, 4, 6, 8, 12, 16, 24, 32];
const MEMORY_OPTIONS = [1, 2, 4, 8, 16, 32, 64, 128];
const STORAGE_OPTIONS = [25, 40, 80, 160, 320, 640, 1280];

function numberChips(values: number[], unit: string): ChoiceOption<string>[] {
  return [
    ...values.map((v) => ({ value: String(v), label: `${v}${unit}` })),
    { value: NOT_SPECIFIED, label: 'Not sure' },
  ];
}

const OS_OPTIONS: ChoiceOption<OperatingSystemPreference>[] = operatingSystemPreferences.map((os) => ({
  value: os,
  label: OPERATING_SYSTEM_PREFERENCE_LABELS[os].replace(' (licensing to be discussed)', ''),
}));

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 text-sm">
      <dt className="text-slate-400">{label}</dt>
      <dd className="text-right font-medium text-white">{value}</dd>
    </div>
  );
}

export function QuoteForm({ defaults }: { defaults?: QuoteFormDefaults }) {
  const [submittedPlan, setSubmittedPlan] = useState<QuotePlanInterest | null>(null);
  const initialPlan = defaults?.planInterest ?? 'not-sure';
  const initialResources = getPlanById(initialPlan) ? PLAN_STARTING_POINTS[initialPlan as keyof typeof PLAN_STARTING_POINTS] : undefined;

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteRequestSchema) as unknown as Resolver<QuoteFormValues>,
    defaultValues: {
      planInterest: initialPlan,
      workload: defaults?.workload ?? 'websites',
      operatingSystem: defaults?.operatingSystem ?? 'not-sure',
      vcpu: initialResources?.vcpu,
      memoryGb: initialResources?.memoryGb,
      storageGb: initialResources?.storageGb,
      quantity: 1,
      managementPreference: 'not-sure',
      regionPreference: '',
      timeline: undefined,
      requirements: '',
      companyName: '',
      name: '',
      email: '',
      consent: false,
      website: '',
    },
  });

  const watched = useWatch({ control: form.control });

  function selectPlan(plan: QuotePlanInterest) {
    form.setValue('planInterest', plan, { shouldValidate: true });
    const preset = getPlanById(plan) ? PLAN_STARTING_POINTS[plan as keyof typeof PLAN_STARTING_POINTS] : undefined;
    if (preset) {
      form.setValue('vcpu', preset.vcpu);
      form.setValue('memoryGb', preset.memoryGb);
      form.setValue('storageGb', preset.storageGb);
    }
  }

  async function onSubmit(values: QuoteFormValues) {
    try {
      await apiPost('/quote-requests', values as unknown as QuoteRequestInput);
      setSubmittedPlan(values.planInterest);
      toast.success('Configuration request sent', {
        description: 'The WHOLNEX team will reply by email with a written quote.',
      });
    } catch (error) {
      if (error instanceof ApiError && error.errors) {
        for (const [field, messages] of Object.entries(error.errors)) {
          form.setError(field as keyof QuoteFormValues, { message: messages[0] });
        }
      }
      toast.error('Unable to send your request', {
        description: error instanceof ApiError ? error.message : 'Please try again in a moment.',
      });
    }
  }

  if (submittedPlan) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-brand/30 bg-brand/5 px-6 py-16 text-center" role="status">
        <CheckCircle2 className="h-12 w-12 text-brand" aria-hidden="true" />
        <h2 className="font-display text-2xl font-semibold">Request received</h2>
        <p className="max-w-md text-muted-foreground">
          Your {QUOTE_PLAN_INTEREST_LABELS[submittedPlan]} configuration request has been submitted. The WHOLNEX team
          will review it and reply to your email with the specifications, pricing, and availability we can confirm.
          This is not an order, and nothing has been charged.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => {
              form.reset();
              setSubmittedPlan(null);
            }}
          >
            Configure another server
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/faq">Read the FAQ</Link>
          </Button>
        </div>
      </div>
    );
  }

  const isSubmitting = form.formState.isSubmitting;
  const resourceSummary = (value: number | undefined, unit: string) => (value ? `${value}${unit}` : 'Recommend for me');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-10">
          <fieldset className="space-y-4">
            <legend className="font-display text-lg font-semibold">1. Starting point</legend>
            <p className="text-sm text-muted-foreground">
              Choose a plan tier to prefill suggested resources, or pick “Custom” or “Not sure”.
            </p>
            <FormField
              control={form.control}
              name="planInterest"
              render={({ field }) => (
                <FormItem>
                  <ChoiceChips
                    layout="cards"
                    aria-label="Plan starting point"
                    value={field.value}
                    onChange={selectPlan}
                    options={PLAN_OPTIONS}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <fieldset className="space-y-5">
            <legend className="font-display text-lg font-semibold">2. Workload & operating system</legend>
            <FormField
              control={form.control}
              name="workload"
              render={({ field }) => (
                <FormItem className="max-w-sm">
                  <FormLabel>Primary workload</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a workload" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vpsWorkloads.map((workload) => (
                        <SelectItem key={workload} value={workload}>
                          {VPS_WORKLOAD_LABELS[workload]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="operatingSystem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel id="os-label">Operating system</FormLabel>
                  <ChoiceChips aria-labelledby="os-label" value={field.value} onChange={field.onChange} options={OS_OPTIONS} />
                  {field.value === 'windows-server' && (
                    <FormDescription>
                      Windows Server requires Microsoft licensing. Licensing options are discussed with your quote and are
                      not included by default.
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <fieldset className="space-y-5">
            <legend className="font-display text-lg font-semibold">3. Suggested resources</legend>
            <p className="text-sm text-muted-foreground">
              Optional. These help us size your quote — WHOLNEX confirms the final allocation in writing.
            </p>
            {(
              [
                { name: 'vcpu', label: 'vCPU', options: numberChips(VCPU_OPTIONS, ' vCPU') },
                { name: 'memoryGb', label: 'Memory', options: numberChips(MEMORY_OPTIONS, ' GB') },
                { name: 'storageGb', label: 'Storage', options: numberChips(STORAGE_OPTIONS, ' GB') },
              ] as const
            ).map((resource) => (
              <FormField
                key={resource.name}
                control={form.control}
                name={resource.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel id={`${resource.name}-label`}>{resource.label}</FormLabel>
                    <ChoiceChips
                      aria-labelledby={`${resource.name}-label`}
                      value={field.value ? String(field.value) : NOT_SPECIFIED}
                      onChange={(next) => field.onChange(next === NOT_SPECIFIED ? undefined : Number(next))}
                      options={resource.options}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </fieldset>

          <fieldset className="space-y-5">
            <legend className="font-display text-lg font-semibold">4. Deployment details</legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of servers</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        inputMode="numeric"
                        min={1}
                        max={100}
                        value={field.value ?? ''}
                        onChange={(event) => field.onChange(event.target.value === '' ? undefined : Number(event.target.value))}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="managementPreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Server administration</FormLabel>
                    <Select value={field.value} onValueChange={(v) => field.onChange(v as ManagementPreference)}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {managementPreferences.map((pref) => (
                          <SelectItem key={pref} value={pref}>
                            {MANAGEMENT_PREFERENCE_LABELS[pref]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="regionPreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred hosting region (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. United States, East Coast" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormDescription>Region availability is confirmed in your quote.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timeline (optional)</FormLabel>
                    <Select value={field.value ?? ''} onValueChange={(v) => field.onChange(v as QuoteTimeline)}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="When do you need it?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {quoteTimelines.map((timeline) => (
                          <SelectItem key={timeline} value={timeline}>
                            {QUOTE_TIMELINE_LABELS[timeline]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anything else we should know? (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Software you plan to run, expected traffic, backup needs, migration details…"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <fieldset className="space-y-5">
            <legend className="font-display text-lg font-semibold">5. Your contact details</legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input autoComplete="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" autoComplete="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Company (optional)</FormLabel>
                    <FormControl>
                      <Input autoComplete="organization" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Honeypot field — hidden from people, left empty by real visitors */}
            <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
              <label htmlFor="quote-website">Website</label>
              <input id="quote-website" type="text" tabIndex={-1} autoComplete="off" {...form.register('website')} />
            </div>

            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start gap-3 space-y-0 rounded-lg border border-border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked === true)} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-normal">I agree that WHOLNEX LLC may contact me about this request.</FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </fieldset>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Configuration summary">
          <div className="overflow-hidden rounded-2xl border border-navy-600 bg-navy-900 text-white shadow-2xl">
            <div className="flex items-center gap-3 border-b border-white/10 px-6 py-4">
              <ServerCog className="h-5 w-5 text-cyan-400" aria-hidden="true" />
              <p className="font-display font-semibold">Your configuration</p>
            </div>
            <dl className="divide-y divide-white/10 px-6">
              <SummaryRow label="Starting point" value={QUOTE_PLAN_INTEREST_LABELS[watched.planInterest ?? 'not-sure']} />
              <SummaryRow label="Workload" value={watched.workload ? VPS_WORKLOAD_LABELS[watched.workload] : '—'} />
              <SummaryRow
                label="OS"
                value={OPERATING_SYSTEM_PREFERENCE_LABELS[watched.operatingSystem ?? 'not-sure'].replace(' (licensing to be discussed)', '')}
              />
              <SummaryRow label="vCPU" value={resourceSummary(watched.vcpu, ' vCPU')} />
              <SummaryRow label="Memory" value={resourceSummary(watched.memoryGb, ' GB')} />
              <SummaryRow label="Storage" value={resourceSummary(watched.storageGb, ' GB')} />
              <SummaryRow label="Servers" value={String(watched.quantity ?? 1)} />
            </dl>
            <div className="space-y-4 border-t border-white/10 bg-white/[0.02] px-6 py-5">
              <p className="text-xs leading-relaxed text-slate-400">
                Submitting sends this request to the WHOLNEX team. It is not an order and nothing is charged — you will
                receive a written quote by email.
              </p>
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" aria-hidden="true" /> Sending…
                  </>
                ) : (
                  <>
                    <Send aria-hidden="true" /> Request my quote
                  </>
                )}
              </Button>
            </div>
          </div>
        </aside>
      </form>
    </Form>
  );
}
