import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePasswordSchema, updateProfileSchema } from '@wholnex/shared';
import type { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Mail, ShieldCheck } from 'lucide-react';
import { apiGet, apiPatch, getErrorMessage } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import type { ContactMessage, QuoteRequest } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { CONTACT_REASON_LABELS_MAP } from '@/lib/contact-options';
import { DEVICE_PLATFORM_LABELS, QUOTE_PLAN_INTEREST_LABELS, VPN_USE_CASE_LABELS } from '@wholnex/shared';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmptyState } from '@/components/empty-state';
import { LoadingState } from '@/components/loading-state';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

type ProfileFormValues = z.infer<typeof updateProfileSchema>;
type PasswordFormValues = z.infer<typeof updatePasswordSchema>;

function QuoteRequestsTab() {
  const { data, isLoading } = useQuery({
    queryKey: ['quote-requests', 'mine'],
    queryFn: () => apiGet<{ items: QuoteRequest[] }>('/quote-requests/mine'),
  });

  if (isLoading) return <LoadingState label="Loading your plan requests…" />;
  const items = data?.items ?? [];

  if (items.length === 0) {
    return (
      <EmptyState
        icon={ShieldCheck}
        title="No plan requests yet"
        description="VPN plan requests you submit will appear here."
        action={
          <Button variant="outline" asChild>
            <Link to="/quote">Request a plan</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id}>
          <CardContent className="space-y-2 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium">{QUOTE_PLAN_INTEREST_LABELS[item.planInterest]}</p>
              <Badge variant="secondary" className="capitalize">{item.status.replace('-', ' ')}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {formatDate(item.createdAt)} · {VPN_USE_CASE_LABELS[item.useCase]} · {item.users} {item.users === 1 ? 'user' : 'users'} ·{' '}
              {item.platforms.map((p) => DEVICE_PLATFORM_LABELS[p]).join(', ')}
            </p>
            {item.requirements && <p className="text-sm text-muted-foreground">{item.requirements}</p>}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function MessagesTab() {
  const { data, isLoading } = useQuery({
    queryKey: ['contact', 'mine'],
    queryFn: () => apiGet<{ items: ContactMessage[] }>('/contact/mine'),
  });

  if (isLoading) return <LoadingState label="Loading your messages…" />;
  const items = data?.items ?? [];

  if (items.length === 0) {
    return <EmptyState icon={Mail} title="No messages yet" description="Messages you send through our contact form will appear here." />;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id}>
          <CardContent className="space-y-2 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium">{item.subject}</p>
              <Badge variant="secondary" className="capitalize">{item.status.replace('-', ' ')}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">{CONTACT_REASON_LABELS_MAP[item.reason]}</p>
            <p className="text-sm text-muted-foreground">{item.message}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function AccountPage() {
  const { user, updateProfile } = useAuth();
  const queryClient = useQueryClient();
  const [profileError, setProfileError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: user?.name ?? '', phone: user?.phone ?? '' },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const passwordMutation = useMutation({
    mutationFn: (values: PasswordFormValues) => apiPatch<null>('/auth/update-password', values),
  });

  async function onProfileSubmit(values: ProfileFormValues) {
    setProfileError(null);
    try {
      await updateProfile(values);
      toast.success('Profile updated');
    } catch (error) {
      setProfileError(getErrorMessage(error, 'Unable to update your profile'));
    }
  }

  async function onPasswordSubmit(values: PasswordFormValues) {
    setPasswordError(null);
    try {
      await passwordMutation.mutateAsync(values);
      toast.success('Password updated');
      passwordForm.reset();
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
    } catch (error) {
      setPasswordError(getErrorMessage(error, 'Unable to update your password'));
    }
  }

  return (
    <>
      <Seo title="My Account" description="Manage your WHOLNEX account." path="/account" noIndex />
      <PageHero eyebrow="Account" title="My account" description={user?.email} size="compact" />

      <section className="container-page py-12">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="quotes">Plan Requests</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="max-w-lg">
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Update your account details.</CardDescription>
              </CardHeader>
              <CardContent>
                {profileError && <p className="mb-4 text-sm text-destructive">{profileError}</p>}
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone number</FormLabel>
                          <FormControl>
                            <Input type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div>
                      <p className="text-sm font-medium">Email address</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                    <Button type="submit" disabled={profileForm.formState.isSubmitting}>
                      Save changes
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="password">
            <Card className="max-w-lg">
              <CardHeader>
                <CardTitle>Change password</CardTitle>
                <CardDescription>Choose a new password for your account.</CardDescription>
              </CardHeader>
              <CardContent>
                {passwordError && <p className="mb-4 text-sm text-destructive">{passwordError}</p>}
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current password</FormLabel>
                          <FormControl>
                            <Input type="password" autoComplete="current-password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Separator />
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New password</FormLabel>
                          <FormControl>
                            <Input type="password" autoComplete="new-password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm new password</FormLabel>
                          <FormControl>
                            <Input type="password" autoComplete="new-password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={passwordForm.formState.isSubmitting}>
                      Update password
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quotes">
            <QuoteRequestsTab />
          </TabsContent>
          <TabsContent value="messages">
            <MessagesTab />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}

export default AccountPage;
