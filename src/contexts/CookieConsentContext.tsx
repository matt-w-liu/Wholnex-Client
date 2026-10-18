import { createContext, useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export interface CookiePreferences {
  analytics: boolean;
}

interface CookieConsentContextValue {
  hasChosen: boolean;
  preferences: CookiePreferences;
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (preferences: CookiePreferences) => void;
}

const STORAGE_KEY = 'wholnex-cookie-consent';
const DEFAULT_PREFERENCES: CookiePreferences = { analytics: false };

export const CookieConsentContext = createContext<CookieConsentContextValue | undefined>(undefined);

function readStoredPreferences(): CookiePreferences | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CookiePreferences) : null;
  } catch {
    return null;
  }
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const [hasChosen, setHasChosen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const stored = readStoredPreferences();
    if (stored) {
      setPreferences(stored);
      setHasChosen(true);
    }
  }, []);

  const persist = useCallback((next: CookiePreferences) => {
    setPreferences(next);
    setHasChosen(true);
    setSettingsOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage failures (e.g. private browsing)
    }
  }, []);

  const value: CookieConsentContextValue = {
    hasChosen,
    preferences,
    settingsOpen,
    openSettings: () => setSettingsOpen(true),
    closeSettings: () => setSettingsOpen(false),
    acceptAll: () => persist({ analytics: true }),
    rejectNonEssential: () => persist({ analytics: false }),
    savePreferences: persist,
  };

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}
