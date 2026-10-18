/**
 * Legal document publication status.
 *
 * WHOLNEX has not supplied reviewed legal policies. The drafts in src/pages/legal/* were written
 * for this website's actual functionality but are NOT binding terms. While a document is
 * `draft`:
 *   - production builds show a "policy in preparation" notice instead of the draft text, and
 *     mark the page noindex;
 *   - development builds show the draft with a prominent "review required" banner.
 *
 * After qualified legal review, set `status: 'approved'`, record `effectiveDate`, and add the
 * route to public/sitemap.xml.
 */
export type LegalDocumentId = 'privacy' | 'terms' | 'acceptable-use' | 'refund-policy' | 'cookies' | 'accessibility';

export interface LegalDocumentMeta {
  id: LegalDocumentId;
  title: string;
  path: string;
  description: string;
  status: 'draft' | 'approved';
  /** ISO date the approved version takes effect. Required once approved. */
  effectiveDate?: string;
}

export const LEGAL_DOCUMENTS: Record<LegalDocumentId, LegalDocumentMeta> = {
  privacy: {
    id: 'privacy',
    title: 'Privacy Policy',
    path: '/privacy',
    description: 'How WHOLNEX LLC collects, uses, and protects personal information submitted through this website.',
    status: 'draft',
  },
  terms: {
    id: 'terms',
    title: 'Terms of Service',
    path: '/terms',
    description: 'Terms governing use of the WHOLNEX website, the WHOLNEX VPN app, and WHOLNEX VPN services.',
    status: 'draft',
  },
  'acceptable-use': {
    id: 'acceptable-use',
    title: 'Acceptable Use Policy',
    path: '/acceptable-use',
    description: 'Rules for acceptable use of the WHOLNEX VPN app and VPN network.',
    status: 'draft',
  },
  'refund-policy': {
    id: 'refund-policy',
    title: 'Refund Policy',
    path: '/refund-policy',
    description: 'How refunds and cancellations are handled for WHOLNEX services.',
    status: 'draft',
  },
  cookies: {
    id: 'cookies',
    title: 'Cookie Policy',
    path: '/cookies',
    description: 'How this website uses browser storage and cookies.',
    status: 'draft',
  },
  accessibility: {
    id: 'accessibility',
    title: 'Accessibility Statement',
    path: '/accessibility',
    description: 'WHOLNEX’s approach to website accessibility.',
    status: 'draft',
  },
};

export function isLegalDocumentPublished(id: LegalDocumentId): boolean {
  return LEGAL_DOCUMENTS[id].status === 'approved';
}

/** Drafts are visible only in development builds so reviewers can read them locally. */
export function canPreviewLegalDraft(): boolean {
  return import.meta.env.DEV;
}
