import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function CookieConsentBanner() {
  const { hasChosen, acceptAll, rejectNonEssential, openSettings } = useCookieConsent();

  if (hasChosen) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-4 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/90"
    >
      <div className="container-page flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          We use essential cookies to keep you signed in. Non-essential cookies are off unless you
          choose to allow them. See our{' '}
          <Link to="/cookies" className="text-foreground underline">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={openSettings}>
            Customise
          </Button>
          <Button variant="outline" size="sm" onClick={rejectNonEssential}>
            Reject non-essential
          </Button>
          <Button size="sm" onClick={acceptAll}>
            Accept all
          </Button>
        </div>
      </div>
    </div>
  );
}

export function CookieSettingsDialog() {
  const { settingsOpen, closeSettings, preferences, savePreferences } = useCookieConsent();
  const [analytics, setAnalytics] = useState(preferences.analytics);

  return (
    <Dialog
      open={settingsOpen}
      onOpenChange={(open) => {
        if (!open) closeSettings();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cookie settings</DialogTitle>
          <DialogDescription>
            Choose which cookies you're happy for us to use. You can change this at any time from
            the Cookie Policy page.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="flex items-center justify-between rounded-md border border-border p-3">
            <div>
              <Label className="font-medium">Essential</Label>
              <p className="text-xs text-muted-foreground">
                Required for sign-in and core site functionality. Always on.
              </p>
            </div>
            <Switch checked disabled aria-label="Essential cookies (always on)" />
          </div>

          <div className="flex items-center justify-between rounded-md border border-border p-3">
            <div>
              <Label htmlFor="analytics-cookies" className="font-medium">Analytics</Label>
              <p className="text-xs text-muted-foreground">
                Not currently in use on this site. Reserved for future, non-essential analytics.
              </p>
            </div>
            <Switch
              id="analytics-cookies"
              checked={analytics}
              onCheckedChange={setAnalytics}
              aria-label="Analytics cookies"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={closeSettings}>
            Cancel
          </Button>
          <Button onClick={() => savePreferences({ analytics })}>Save preferences</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
