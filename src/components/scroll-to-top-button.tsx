import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { COOKIE_BANNER_ID } from '@/lib/constants';

const VISIBILITY_THRESHOLD = 320;
/** Gap between the button and the viewport edge or the cookie banner, in px. */
const EDGE_GAP = 24;

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(0);
  const { hasChosen } = useCookieConsent();

  // While the cookie banner is open, lift the button above it. The banner's height varies
  // with viewport width (its text and buttons wrap on mobile), so track it live.
  useEffect(() => {
    const banner = hasChosen ? null : document.getElementById(COOKIE_BANNER_ID);
    if (!banner) {
      setBannerHeight(0);
      return;
    }
    const update = () => setBannerHeight(banner.getBoundingClientRect().height);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(banner);
    return () => observer.disconnect();
  }, [hasChosen]);

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > VISIBILITY_THRESHOLD);

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });

    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, left: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <Button
      type="button"
      size="icon"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
      style={{ bottom: bannerHeight + EDGE_GAP }}
      className={cn(
        'fixed right-4 z-40 h-12 w-12 rounded-full shadow-lg transition-all duration-200 sm:right-6',
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0',
      )}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </Button>
  );
}
