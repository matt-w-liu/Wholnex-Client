import { useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const STORAGE_KEY = 'wholnex-hardening-checklist';

const ITEMS = [
  { id: 'updates', label: 'Apply all operating system updates' },
  { id: 'user', label: 'Create a non-root user with sudo privileges' },
  { id: 'ssh-keys', label: 'Install your SSH public key for that user' },
  { id: 'no-passwords', label: 'Disable SSH password authentication' },
  { id: 'no-root', label: 'Disable direct root login over SSH' },
  { id: 'firewall', label: 'Enable a firewall that allows only required ports' },
  { id: 'auto-updates', label: 'Turn on automatic security updates' },
  { id: 'fail2ban', label: 'Add brute-force protection (e.g. fail2ban)' },
  { id: 'backups', label: 'Schedule off-server backups and test a restore' },
  { id: 'monitoring', label: 'Set up resource and uptime monitoring' },
];

function readStored(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : [];
  } catch {
    return [];
  }
}

/**
 * A practical first-day hardening checklist. Progress is saved only in this browser
 * (localStorage) as a convenience — nothing is sent to WHOLNEX.
 */
export function HardeningChecklist() {
  const [done, setDone] = useState<string[]>(() => (typeof window === 'undefined' ? [] : readStored()));

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
    } catch {
      // Storage unavailable — the checklist still works for this visit.
    }
  }, [done]);

  const toggle = (id: string, checked: boolean) =>
    setDone((current) => (checked ? Array.from(new Set([...current, id])) : current.filter((item) => item !== id)));

  const percent = Math.round((done.length / ITEMS.length) * 100);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-semibold">First-day hardening checklist</h3>
          <p className="mt-1 text-sm text-muted-foreground">Track your progress — saved only in this browser.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setDone([])} disabled={done.length === 0}>
          <RotateCcw aria-hidden="true" /> Reset
        </Button>
      </div>
      <div className="mt-5 flex items-center gap-3">
        <Progress value={percent} className="h-2" aria-label="Checklist progress" />
        <span className="w-24 shrink-0 text-right font-mono text-xs text-muted-foreground" aria-live="polite">
          {done.length}/{ITEMS.length} done
        </span>
      </div>
      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
        {ITEMS.map((item) => {
          const checked = done.includes(item.id);
          return (
            <li key={item.id}>
              <label
                htmlFor={`harden-${item.id}`}
                className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 text-sm transition-colors hover:border-brand/40 has-[[data-state=checked]]:border-brand/40 has-[[data-state=checked]]:bg-brand/5"
              >
                <Checkbox
                  id={`harden-${item.id}`}
                  checked={checked}
                  onCheckedChange={(value) => toggle(item.id, value === true)}
                  className="mt-0.5"
                />
                <span className={checked ? 'text-muted-foreground line-through' : undefined}>{item.label}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
