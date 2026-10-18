import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FileClock, FlaskConical } from 'lucide-react';
import { canPreviewLegalDraft, LEGAL_DOCUMENTS, type LegalDocumentId } from '@/lib/legal';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

interface LegalDocumentProps {
  id: LegalDocumentId;
  children: ReactNode;
  /** Functional controls that must stay available regardless of draft status (e.g. cookie settings). */
  aside?: ReactNode;
}

/**
 * Renders a legal policy according to its publication status (see src/lib/legal.ts).
 * Unapproved drafts are never shown in production builds.
 */
export function LegalDocument({ id, children, aside }: LegalDocumentProps) {
  const doc = LEGAL_DOCUMENTS[id];
  const approved = doc.status === 'approved';
  const showDraft = !approved && canPreviewLegalDraft();

  return (
    <>
      <Seo title={doc.title} description={doc.description} path={doc.path} noIndex={!approved} />
      <PageHero
        size="compact"
        eyebrow="Legal"
        breadcrumbs={[{ name: doc.title, path: doc.path }]}
        title={doc.title}
        description={approved && doc.effectiveDate ? `Effective ${formatDate(doc.effectiveDate)}` : undefined}
      />

      <section className="container-page max-w-3xl py-14 sm:py-20">
        {approved || showDraft ? (
          <>
            {showDraft && (
              <Alert variant="warning" className="mb-10">
                <FlaskConical className="h-4 w-4" />
                <AlertTitle>Draft — legal review required (visible in development builds only)</AlertTitle>
                <AlertDescription>
                  This draft was prepared from the website’s actual functionality and has not been reviewed by
                  counsel. It is not a binding policy and is hidden from production builds until its status is set
                  to “approved” in src/lib/legal.ts.
                </AlertDescription>
              </Alert>
            )}
            <article className="prose-legal">{children}</article>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card px-6 py-16 text-center">
            <FileClock className="h-10 w-10 text-brand" aria-hidden="true" />
            <h2 className="font-display text-2xl font-semibold">This policy is being finalized</h2>
            <p className="max-w-md text-muted-foreground">
              The WHOLNEX {doc.title} is currently under review and will be published here once it is final. If you
              have a question about it in the meantime, please contact us.
            </p>
            <Button asChild>
              <Link to="/contact?category=general">Contact WHOLNEX</Link>
            </Button>
          </div>
        )}
        {aside && <div className="mt-10">{aside}</div>}
      </section>
    </>
  );
}
