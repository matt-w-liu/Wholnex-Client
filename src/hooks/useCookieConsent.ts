import { useContext } from 'react';
import { CookieConsentContext } from '@/contexts/CookieConsentContext';

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return ctx;
}
