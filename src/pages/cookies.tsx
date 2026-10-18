import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';
import { LegalDocument } from '@/components/legal-document';
import { Button } from '@/components/ui/button';
import { useCookieConsent } from '@/hooks/useCookieConsent';

/**
 * DRAFT — LEGAL REVIEW REQUIRED. Not binding until approved in src/lib/legal.ts.
 */
export function CookiesPage() {
  const { openSettings } = useCookieConsent();

  return (
    <LegalDocument
      id="cookies"
      aside={
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
            <p className="text-sm text-muted-foreground">Review or change your cookie preferences at any time.</p>
          </div>
          <Button onClick={openSettings}>Open cookie settings</Button>
        </div>
      }
    >
      <h2>Essential browser storage</h2>
      <p>
        This website uses your browser’s local storage for features that cannot work without it: sign-in tokens for
        account holders, your light or dark theme preference, and your cookie-consent choice.
      </p>

      <h2>Optional storage</h2>
      <p>
        If you use the stay-safe checklist on the Security page, your progress is saved in local storage on your device only. It is
        never sent to WHOLNEX.
      </p>

      <h2>Analytics and marketing</h2>
      <p>
        This website does not currently use analytics or marketing cookies. If that changes, non-essential cookies will
        stay off until you opt in through cookie settings.
      </p>

      <h2>Third-party resources</h2>
      <p>
        Fonts are loaded from Google Fonts, which receives your IP address when pages load. See our{' '}
        <Link to="/privacy">Privacy Policy</Link>.
      </p>
    </LegalDocument>
  );
}

export default CookiesPage;
