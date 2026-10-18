import { Outlet } from 'react-router-dom';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SkipToContent } from '@/components/skip-to-content';
import { ScrollManager } from '@/components/scroll-manager';
import { OrganizationJsonLd, WebsiteJsonLd } from '@/components/seo';
import { CookieConsentBanner, CookieSettingsDialog } from '@/components/cookie-consent';

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <OrganizationJsonLd />
      <WebsiteJsonLd />
      <ScrollManager />
      <SkipToContent />
      <SiteHeader />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter />
      <CookieConsentBanner />
      <CookieSettingsDialog />
    </div>
  );
}
