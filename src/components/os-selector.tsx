import { Link } from 'react-router-dom';
import { ArrowRight, Check, Info } from 'lucide-react';
import { OPERATING_SYSTEMS } from '@/lib/operating-systems';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

/**
 * Operating system explorer. Each tab explains an OS and links to the configurator with that OS
 * preselected. Image availability is confirmed per quote.
 */
export function OsSelector() {
  return (
    <Tabs defaultValue={OPERATING_SYSTEMS[0].id} className="w-full">
      <TabsList className="flex h-auto w-full justify-start gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1.5">
        {OPERATING_SYSTEMS.map((os) => (
          <TabsTrigger
            key={os.id}
            value={os.id}
            className="shrink-0 rounded-lg px-4 py-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            {os.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {OPERATING_SYSTEMS.map((os) => (
        <TabsContent key={os.id} value={os.id} className="mt-4">
          <div className="grid gap-6 rounded-2xl border border-border bg-card p-6 sm:p-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-display text-2xl font-semibold">{os.name}</h3>
                <span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-muted-foreground">
                  {os.family}
                </span>
              </div>
              <p className="mt-3 leading-relaxed text-muted-foreground">{os.summary}</p>
              <p className="mt-6 font-mono text-xs uppercase tracking-wider text-muted-foreground">Well suited to</p>
              <ul className="mt-3 space-y-2 text-sm">
                {os.goodFor.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              {os.note && (
                <p className="mt-6 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-sm text-muted-foreground">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
                  {os.note}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-xl border border-white/10 bg-navy-950 p-4 font-mono text-sm">
                <p className="text-xs text-slate-400"># keep the system patched ({os.packageManager})</p>
                <p className="mt-2 break-all text-slate-100">
                  <span className="text-cyan-400">{os.family === 'Windows' ? 'PS> ' : '$ '}</span>
                  {os.sampleCommand}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Image availability for your server is confirmed in your WHOLNEX quote.
              </p>
              <Button asChild variant="outline" className="mt-auto w-full sm:w-fit">
                <Link to={`/quote?os=${os.id}`}>
                  Request {os.name} <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
