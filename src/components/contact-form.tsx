import { useState } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactInput, type ContactReason } from '@wholnex/shared';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';
import { apiPost, ApiError } from '@/lib/api';
import { CONTACT_REASON_OPTIONS } from '@/lib/contact-options';
import { ChoiceChips } from '@/components/choice-chips';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

type ContactFormValues = Omit<ContactInput, 'consent'> & { consent: boolean };

interface ContactFormProps {
  defaultReason?: ContactReason;
  defaultSubject?: string;
  title?: string;
}

export function ContactForm({ defaultReason = 'general', defaultSubject = '', title }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema) as unknown as Resolver<ContactFormValues>,
    defaultValues: {
      name: '',
      email: '',
      company: '',
      reason: defaultReason,
      subject: defaultSubject,
      message: '',
      consent: false,
      website: '',
    },
  });

  async function onSubmit(values: ContactFormValues) {
    try {
      await apiPost('/contact', values as unknown as ContactInput);
      setSubmitted(true);
      toast.success('Message sent', {
        description: 'Thank you for contacting WHOLNEX. We will reply to the email address you provided.',
      });
      form.reset({ ...values, name: '', email: '', company: '', subject: '', message: '', consent: false });
    } catch (error) {
      if (error instanceof ApiError && error.errors) {
        for (const [field, messages] of Object.entries(error.errors)) {
          form.setError(field as keyof ContactFormValues, { message: messages[0] });
        }
      }
      toast.error('Unable to send message', {
        description: error instanceof ApiError ? error.message : 'Please try again in a moment.',
      });
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-brand/30 bg-brand/5 px-6 py-14 text-center" role="status">
        <CheckCircle2 className="h-10 w-10 text-brand" aria-hidden="true" />
        <h3 className="font-display text-xl font-semibold">Message received</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Your message has been delivered to the WHOLNEX team. We will respond to the email address you provided.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      {title && <h2 className="mb-6 font-display text-2xl font-semibold">{title}</h2>}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel id="contact-reason-label">Inquiry category</FormLabel>
              <ChoiceChips
                layout="cards"
                className="sm:grid-cols-2 lg:grid-cols-2"
                aria-labelledby="contact-reason-label"
                value={field.value}
                onChange={field.onChange}
                options={CONTACT_REASON_OPTIONS}
              />
              <FormMessage />
            </FormItem>
          )}
        />

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
        </div>

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company (optional)</FormLabel>
              <FormControl>
                <Input autoComplete="organization" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="A short summary of your inquiry" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea rows={6} placeholder="How can we help?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Honeypot field — visually hidden from sighted users, left empty by real visitors */}
        <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" type="text" tabIndex={-1} autoComplete="off" {...form.register('website')} />
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
                <FormLabel className="font-normal">I agree that WHOLNEX LLC may contact me about this inquiry.</FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              <Send aria-hidden="true" /> Send message
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
