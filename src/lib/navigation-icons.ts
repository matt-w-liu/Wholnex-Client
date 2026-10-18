import { HelpCircle, LifeBuoy, ShieldCheck, type LucideIcon } from 'lucide-react';

/** Icons for the Resources menu, keyed by link href (see RESOURCES_NAV in lib/constants.ts). */
export const RESOURCE_ICONS: Record<string, LucideIcon> = {
  '/faq': HelpCircle,
  '/security': ShieldCheck,
  '/contact?category=technical-support': LifeBuoy,
};
