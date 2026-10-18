import { CONTACT_REASON_LABELS, type ContactReason } from '@wholnex/shared';

// Kept separate from lib/constants.ts so the eagerly loaded layout does not pull the shared
// Zod schemas (and zod itself) into the main bundle.
export const CONTACT_REASON_LABELS_MAP = CONTACT_REASON_LABELS;

export const CONTACT_REASON_OPTIONS: { value: ContactReason; label: string; description: string }[] = [
  { value: 'sales', label: CONTACT_REASON_LABELS.sales, description: 'Plans, pricing, and quotes' },
  {
    value: 'business-vpn',
    label: CONTACT_REASON_LABELS['business-vpn'],
    description: 'Seats, server locations, and team setup',
  },
  {
    value: 'technical-support',
    label: CONTACT_REASON_LABELS['technical-support'],
    description: 'Help with the app or a connection',
  },
  { value: 'general', label: CONTACT_REASON_LABELS.general, description: 'Anything else' },
];
