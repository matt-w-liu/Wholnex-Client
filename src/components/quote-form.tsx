import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, useWatch, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  DEVICE_PLATFORM_LABELS,
  QUOTE_PLAN_INTEREST_LABELS,
  QUOTE_TIMELINE_LABELS,
  VPN_USE_CASE_LABELS,
  devicePlatforms,
  quoteRequestSchema,
  quoteTimelines,
  vpnUseCases,
  type DevicePlatform,
  type QuotePlanInterest,
  type QuoteRequestInput,
  type QuoteTimeline,
  type VpnUseCase,
} from '@wholnex/shared';
import { Check, CheckCircle2, Loader2, Send, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { apiPost, ApiError } from '@/lib/api';
import { getPlanById, PLAN_STARTING_USERS, VPN_PLANS } from '@/lib/vpn-plans';
import { AVAILABLE_PLATFORMS } from '@/lib/platforms';
import { ChoiceChips, type ChoiceOption } from '@/components/choice-chips';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';

type QuoteFormValues = Omit<QuoteRequestInput, 'consent'> & { consent: boolean };

export interface QuoteFormDefaults {
  planInterest?: QuotePlanInterest;
  useCase?: VpnUseCase;
}

const PLAN_OPTIONS: ChoiceOption<QuotePlanInterest>[] = [
  ...VPN_PLANS.map((plan) => ({ value: plan.id, label: plan.name, description: plan.tagline })),
  { value: 'custom', label: QUOTE_PLAN_INTEREST_LABELS.custom, description: 'Describe what you need' },
  { value: 'not-sure', label: QUOTE_PLAN_INTEREST_LABELS['not-sure'], description: 'Recommend a plan for me' },
];

const availableNames = AVAILABLE_PLATFORMS.map((platform) => platform.name).join(', ');

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 text-sm">
      <dt className="text-slate-400">{label}</dt>
      <dd className="text-right font-medium text-white">{value}</dd>
    </div>
  );
}

/** Multi-select toggle chips (each is a button with aria-pressed). */
function PlatformToggles({
  value,
  onChange,
  labelledBy,
}: {
  value: DevicePlatform[];
  onChange: (next: DevicePlatform[]) => void;
  labelledBy: string;
}) {
  return (
    <div role="group" aria-labelledby={labelledBy} className="flex flex-wrap gap-2">
      {devicePlatforms.map((platform) => {
        const selected = value.includes(platform);
        return (
          <button
            key={platform}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(selected ? value.filter((p) => p !== platform) : [...value, platform])}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              selected ? 'border-brand bg-brand/10 shadow-glow' : 'border-border bg-card hover:border-brand/50',
            )}
          >
            {selected && <Check className="h-3.5 w-3.5 text-brand" aria-hidden="true" />}
            {DEVICE_PLATFORM_LABELS[platform]}
          </button>
        );
      })}
    </div>
  );
}

export function QuoteForm({ defaults }: { defaults?: QuoteFormDefaults }) {
  const [submittedPlan, setSubmittedPlan] = useState<QuotePlanInterest | null>(null);
  const initialPlan = defaults?.planInterest ?? 'not-sure';
  const initialPlanConfig = getPlanById(initialPlan);

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteRequestSchema) as unknown as Resolver<QuoteFormValues>,
    defaultValues: {
      planInterest: initialPlan,
      useCase: defaults?.useCase ?? 'online-privacy',
      platforms: ['windows'],
      users: initialPlanConfig ? PLAN_STARTING_USERS[initialPlanConfig.id] : 1,
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
    const config = getPlanById(plan);
    if (config) form.setValue('users', PLAN_STARTING_USERS[config.id]);
  }

  async function onSubmit(values: QuoteFormValues) {
    try {
      await apiPost('/quote-requests', values as unknown as QuoteRequestInput);
      setSubmittedPlan(values.planInterest);
      toast.success('Request sent', { description: 'The WHOLNEX team will reply by email.' });
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
          Your {QUOTE_PLAN_INTEREST_LABELS[submittedPlan]} request has been submitted. The WHOLNEX team will reply to your
          email with the plan details and pricing we can confirm. This is not an order, and nothing has been charged.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="outline" asChild>
            <Link to="/download">Download the app</Link>
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              form.reset();
              setSubmittedPlan(null);
            }}
          >
            Send another request
          </Button>
        </div>
      </div>
    );
  }

  const isSubmitting = form.formState.isSubmitting;
  const isTeam = watched.planInterest === 'team' || watched.planInterest === 'business';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-10">
          <fieldset className="space-y-4">
            <legend className="font-display text-lg font-semibold">1. Plan</legend>
            <p className="text-sm text-muted-foreground">Choose the plan closest to what you need, or let us recommend one.</p>
            <FormField
              control={form.control}
              name="planInterest"
              render={({ field }) => (
                <FormItem>
                  <ChoiceChips layout="cards" aria-label="Plan" value={field.value} onChange={selectPlan} options={PLAN_OPTIONS} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <fieldset className="space-y-5">
            <legend className="font-display text-lg font-semibold">2. How you will use it</legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="useCase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary use</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {vpnUseCases.map((useCase) => (
                          <SelectItem key={useCase} value={useCase}>
                            {VPN_USE_CASE_LABELS[useCase]}
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
                name="users"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of users</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        inputMode="numeric"
                        min={1}
                        max={10000}
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
            </div>
            <FormField
              control={form.control}
              name="platforms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel id="platforms-label">Devices you want to protect</FormLabel>
                  <PlatformToggles labelledBy="platforms-label" value={field.value ?? []} onChange={field.onChange} />
                  <FormDescription>
                    The WHOLNEX app is currently available for {availableNames}. Selecting other devices tells us what you
                    need.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="regionPreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred server locations (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. United States, Europe" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormDescription>Server availability is confirmed in our reply.</FormDescription>
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
                      placeholder="Security requirements, systems you need to reach, questions about privacy…"
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
            <legend className="font-display text-lg font-semibold">3. Your contact details</legend>
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
                    <FormLabel>Company {isTeam ? '' : '(optional)'}</FormLabel>
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

        <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Request summary">
          <div className="overflow-hidden rounded-2xl border border-navy-600 bg-navy-900 text-white shadow-2xl">
            <div className="flex items-center gap-3 border-b border-white/10 px-6 py-4">
              <ShieldCheck className="h-5 w-5 text-cyan-400" aria-hidden="true" />
              <p className="font-display font-semibold">Your request</p>
            </div>
            <dl className="divide-y divide-white/10 px-6">
              <SummaryRow label="Plan" value={QUOTE_PLAN_INTEREST_LABELS[watched.planInterest ?? 'not-sure']} />
              <SummaryRow label="Primary use" value={watched.useCase ? VPN_USE_CASE_LABELS[watched.useCase] : '—'} />
              <SummaryRow
                label="Devices"
                value={(watched.platforms ?? []).map((p) => DEVICE_PLATFORM_LABELS[p as DevicePlatform]).join(', ') || 'None selected'}
              />
              <SummaryRow label="Users" value={String(watched.users ?? 1)} />
            </dl>
            <div className="space-y-4 border-t border-white/10 bg-white/[0.02] px-6 py-5">
              <p className="text-xs leading-relaxed text-slate-400">
                Submitting sends this request to the WHOLNEX team. It is not an order and nothing is charged — you will
                receive plan details and pricing by email.
              </p>
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" aria-hidden="true" /> Sending…
                  </>
                ) : (
                  <>
                    <Send aria-hidden="true" /> Send request
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
