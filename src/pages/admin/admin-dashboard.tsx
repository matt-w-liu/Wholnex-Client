import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Mail, ServerCog, Users } from 'lucide-react';
import { apiGet } from '@/lib/api';
import type { AdminDashboardStats } from '@/lib/types';
import { CONTACT_REASON_LABELS_MAP } from '@/lib/contact-options';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LoadingState } from '@/components/loading-state';
import { ErrorState } from '@/components/error-state';
import { EmptyState } from '@/components/empty-state';

export function AdminDashboardPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: () => apiGet<AdminDashboardStats>('/admin/dashboard'),
  });

  if (isLoading) return <LoadingState label="Loading dashboard…" />;
  if (isError || !data) return <ErrorState onRetry={() => refetch()} />;

  const cards = [
    { label: 'Quote requests', value: data.quoteRequests.total, hint: `${data.quoteRequests.new} new`, icon: ServerCog, href: '/admin/quote-requests' },
    { label: 'Contact messages', value: data.contact.total, hint: `${data.contact.new} new`, icon: Mail, href: '/admin/contact' },
    { label: 'Users', value: data.users.total, hint: `${data.users.active} active`, icon: Users, href: '/admin/users' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">An overview of WHOLNEX website inquiries and accounts.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.label} to={card.href}>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-brand">
                  <card.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{card.value}</p>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <p className="text-xs text-muted-foreground">{card.hint}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent contact messages</CardTitle>
        </CardHeader>
        <CardContent>
          {data.contact.recent.length === 0 ? (
            <EmptyState icon={Mail} title="No messages yet" />
          ) : (
            <div className="space-y-3">
              {data.contact.recent.map((message) => (
                <div
                  key={message.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border p-3"
                >
                  <div>
                    <p className="font-medium">{message.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      {message.name} · {CONTACT_REASON_LABELS_MAP[message.reason]}
                    </p>
                  </div>
                  <Badge variant="secondary" className="capitalize">
                    {message.status.replace('-', ' ')}
                  </Badge>
                </div>
              ))}
            </div>
          )}
          <Button variant="link" className="mt-3 p-0" asChild>
            <Link to="/admin/contact">View all messages</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboardPage;
