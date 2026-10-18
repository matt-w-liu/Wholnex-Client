import { useState } from 'react';
import { Check, Copy, Download, MonitorSmartphone } from 'lucide-react';
import { WINDOWS_DOWNLOAD, formatBytes } from '@/lib/download';
import { PLATFORMS } from '@/lib/platforms';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

/** Primary Windows download with file details and a copyable SHA-256 checksum. */
export function DownloadCard({ className }: { className?: string }) {
  const download = WINDOWS_DOWNLOAD;
  const [copied, setCopied] = useState(false);

  async function copyChecksum() {
    try {
      await navigator.clipboard.writeText(download.sha256);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — the checksum remains selectable on the page.
    }
  }

  return (
    <div className={cn('ring-gradient rounded-2xl bg-card p-6 sm:p-8', className)}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand">WHOLNEX VPN for {download.label}</p>
          <h2 className="mt-2 font-display text-2xl font-semibold">Download the app</h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">{download.requirements}</p>
        </div>
        <Badge variant="brand">Available now</Badge>
      </div>

      <Button size="lg" className="mt-6 w-full sm:w-auto" asChild>
        <a href={download.url} download={download.fileName}>
          <Download aria-hidden="true" /> Download for {download.label}
        </a>
      </Button>

      <dl className="mt-6 grid gap-4 border-t border-border pt-6 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-muted-foreground">File</dt>
          <dd className="mt-1 break-all font-mono text-xs">{download.fileName}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Size</dt>
          <dd className="mt-1 font-medium">{formatBytes(download.sizeBytes)}</dd>
        </div>
        {download.version && (
          <div>
            <dt className="text-muted-foreground">Version</dt>
            <dd className="mt-1 font-medium">{download.version}</dd>
          </div>
        )}
        <div className="sm:col-span-3">
          <dt className="text-muted-foreground">SHA-256 checksum</dt>
          <dd className="mt-1 flex items-start gap-2">
            <code className="flex-1 break-all rounded-md bg-muted px-2 py-1.5 font-mono text-xs">{download.sha256}</code>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={copyChecksum}
              aria-label={copied ? 'Checksum copied' : 'Copy checksum'}
            >
              {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
            </Button>
          </dd>
        </div>
      </dl>
    </div>
  );
}

/** Which platforms have an app today, derived from the real downloads list. */
export function PlatformAvailability({ className }: { className?: string }) {
  return (
    <ul className={cn('grid gap-3 sm:grid-cols-2 lg:grid-cols-5', className)}>
      {PLATFORMS.map((platform) => (
        <li
          key={platform.id}
          className={cn(
            'flex items-center justify-between gap-3 rounded-xl border p-4',
            platform.available ? 'border-brand/40 bg-brand/5' : 'border-border bg-card',
          )}
        >
          <span className="flex items-center gap-2.5 font-medium">
            <MonitorSmartphone className={cn('h-4 w-4', platform.available ? 'text-brand' : 'text-muted-foreground')} aria-hidden="true" />
            {platform.name}
          </span>
          <span className={cn('text-xs', platform.available ? 'font-semibold text-brand' : 'text-muted-foreground')}>
            {platform.available ? 'Available' : 'Not yet available'}
          </span>
        </li>
      ))}
    </ul>
  );
}
