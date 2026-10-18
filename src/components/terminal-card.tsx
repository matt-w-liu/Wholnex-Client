import { cn } from '@/lib/utils';

interface TerminalLine {
  kind: 'cmd' | 'out' | 'comment';
  text: string;
}

const DEFAULT_LINES: TerminalLine[] = [
  { kind: 'comment', text: '# connect with your SSH key' },
  { kind: 'cmd', text: 'ssh admin@your-server.example' },
  { kind: 'out', text: 'Welcome to Ubuntu Server' },
  { kind: 'cmd', text: 'sudo apt update && sudo apt upgrade -y' },
  { kind: 'cmd', text: 'sudo ufw allow OpenSSH && sudo ufw enable' },
  { kind: 'out', text: 'Firewall is active and enabled on system startup' },
  { kind: 'cmd', text: 'docker compose up -d' },
  { kind: 'out', text: '✔ Container app-web-1  Started' },
];

interface TerminalCardProps {
  lines?: TerminalLine[];
  title?: string;
  className?: string;
}

/**
 * Decorative terminal illustrating root access on a VPS. Static and aria-hidden: it shows
 * generic administration commands and is not connected to any real server.
 */
export function TerminalCard({ lines = DEFAULT_LINES, title = 'admin@vps: ~', className }: TerminalCardProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-white/10 bg-navy-950/85 shadow-2xl shadow-black/40 backdrop-blur-md',
        className,
      )}
      aria-hidden="true"
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-slate-600" />
        <span className="h-3 w-3 rounded-full bg-slate-600" />
        <span className="h-3 w-3 rounded-full bg-slate-600" />
        <span className="ml-3 font-mono text-xs text-slate-400">{title}</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6">
        {lines.map((line, index) => (
          <div key={index} className="whitespace-pre">
            {line.kind === 'cmd' && (
              <>
                <span className="text-cyan-400">$ </span>
                <span className="text-slate-100">{line.text}</span>
              </>
            )}
            {line.kind === 'out' && <span className="text-slate-400">{line.text}</span>}
            {line.kind === 'comment' && <span className="text-slate-400">{line.text}</span>}
          </div>
        ))}
        <div>
          <span className="text-cyan-400">$ </span>
          <span className="inline-block h-4 w-2 translate-y-0.5 animate-blink bg-cyan-400" />
        </div>
      </pre>
    </div>
  );
}
