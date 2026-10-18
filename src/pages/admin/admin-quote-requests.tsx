import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  MANAGEMENT_PREFERENCE_LABELS,
  OPERATING_SYSTEM_PREFERENCE_LABELS,
  QUOTE_PLAN_INTEREST_LABELS,
  QUOTE_TIMELINE_LABELS,
  VPS_WORKLOAD_LABELS,
  requestStatuses,
  type RequestStatus,
} from '@wholnex/shared';
import { ServerCog } from 'lucide-react';
import { toast } from 'sonner';
import { apiGet, apiPatch, getErrorMessage } from '@/lib/api';
import type { Paginated, QuoteRequest } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { LoadingState } from '@/components/loading-state';
import { ErrorState } from '@/components/error-state';
import { EmptyState } from '@/components/empty-state';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';

const STATUS_VARIANT: Record<RequestStatus, 'secondary' | 'success' | 'warning' | 'outline'> = {
  new: 'warning',
  'in-progress': 'secondary',
  resolved: 'success',
  archived: 'outline',
};

function resources(request: QuoteRequest): string {
  const parts = [
    request.vcpu ? `${request.vcpu} vCPU` : null,
    request.memoryGb ? `${request.memoryGb} GB RAM` : null,
    request.storageGb ? `${request.storageGb} GB disk` : null,
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(' · ') : 'Not specified';
}

export function AdminQuoteRequestsPage() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 350);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selected, setSelected] = useState<QuoteRequest | null>(null);
  const [notes, setNotes] = useState('');
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin', 'quote-requests', debouncedSearch, statusFilter],
    queryFn: () =>
      apiGet<Paginated<QuoteRequest>>('/admin/quote-requests', {
        params: { search: debouncedSearch || undefined, status: statusFilter !== 'all' ? statusFilter : undefined, limit: 50 },
      }),
  });

  const updateMutation = useMutation({
    mutationFn: (input: { id: string; status?: RequestStatus; internalNotes?: string }) =>
      apiPatch<{ request: QuoteRequest }>(`/admin/quote-requests/${input.id}`, {
        status: input.status,
        internalNotes: input.internalNotes,
      }),
    onSuccess: ({ request }) => {
      toast.success('Quote request updated');
      queryClient.invalidateQueries({ queryKey: ['admin', 'quote-requests'] });
      setSelected(request);
    },
    onError: (error) => toast.error('Unable to update request', { description: getErrorMessage(error) }),
  });

  function openDetail(request: QuoteRequest) {
    setSelected(request);
    setNotes(request.internalNotes ?? '');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Quote requests</h1>
        <p className="text-sm text-muted-foreground">
          VPS configuration requests submitted through the website configurator. Reply to each requester with a
          written quote.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, email, or company…"
          className="max-w-sm"
          aria-label="Search quote requests"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44" aria-label="Filter by status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {requestStatuses.map((status) => (
              <SelectItem key={status} value={status} className="capitalize">
                {status.replace('-', ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <LoadingState label="Loading quote requests…" />
      ) : isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : !data || data.items.length === 0 ? (
        <EmptyState icon={ServerCog} title="No quote requests found" />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Workload</TableHead>
              <TableHead>Received</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.items.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  <p className="font-medium">{request.name}</p>
                  <p className="text-xs text-muted-foreground">{request.companyName || request.email}</p>
                </TableCell>
                <TableCell>{QUOTE_PLAN_INTEREST_LABELS[request.planInterest]}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{VPS_WORKLOAD_LABELS[request.workload]}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{formatDate(request.createdAt)}</TableCell>
                <TableCell>
                  <Badge variant={STATUS_VARIANT[request.status]} className="capitalize">
                    {request.status.replace('-', ' ')}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" onClick={() => openDetail(request)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Sheet open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {selected && (
            <div className="space-y-5">
              <SheetHeader>
                <SheetTitle>{QUOTE_PLAN_INTEREST_LABELS[selected.planInterest]}</SheetTitle>
              </SheetHeader>

              <dl className="grid grid-cols-[140px_1fr] gap-x-3 gap-y-2 text-sm">
                <dt className="font-medium">From</dt>
                <dd>
                  {selected.name} ({selected.email})
                </dd>
                {selected.companyName && (
                  <>
                    <dt className="font-medium">Company</dt>
                    <dd>{selected.companyName}</dd>
                  </>
                )}
                <dt className="font-medium">Workload</dt>
                <dd>{VPS_WORKLOAD_LABELS[selected.workload]}</dd>
                <dt className="font-medium">Operating system</dt>
                <dd>{OPERATING_SYSTEM_PREFERENCE_LABELS[selected.operatingSystem]}</dd>
                <dt className="font-medium">Resources</dt>
                <dd>{resources(selected)}</dd>
                <dt className="font-medium">Servers</dt>
                <dd>{selected.quantity}</dd>
                <dt className="font-medium">Management</dt>
                <dd>{MANAGEMENT_PREFERENCE_LABELS[selected.managementPreference]}</dd>
                <dt className="font-medium">Region</dt>
                <dd>{selected.regionPreference || 'Not specified'}</dd>
                <dt className="font-medium">Timeline</dt>
                <dd>{selected.timeline ? QUOTE_TIMELINE_LABELS[selected.timeline] : 'Not specified'}</dd>
                <dt className="font-medium">Email delivery</dt>
                <dd className="capitalize">
                  {selected.emailDeliveryStatus ?? '—'}
                  {selected.emailDeliveryError ? ` (${selected.emailDeliveryError})` : ''}
                </dd>
              </dl>

              {selected.requirements && (
                <div className="whitespace-pre-wrap rounded-md border border-border bg-muted/40 p-3 text-sm">
                  {selected.requirements}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="quote-status" className="text-sm font-medium">
                  Status
                </label>
                <Select
                  value={selected.status}
                  onValueChange={(status) => updateMutation.mutate({ id: selected.id, status: status as RequestStatus })}
                >
                  <SelectTrigger id="quote-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {requestStatuses.map((status) => (
                      <SelectItem key={status} value={status} className="capitalize">
                        {status.replace('-', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="quote-notes" className="text-sm font-medium">
                  Internal notes
                </label>
                <Textarea id="quote-notes" value={notes} onChange={(event) => setNotes(event.target.value)} rows={4} />
                <Button
                  size="sm"
                  onClick={() => updateMutation.mutate({ id: selected.id, internalNotes: notes })}
                  disabled={updateMutation.isPending}
                >
                  Save notes
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default AdminQuoteRequestsPage;
