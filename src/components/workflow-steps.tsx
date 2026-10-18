import { GETTING_STARTED_STEPS } from '@/lib/content';
import { cn } from '@/lib/utils';

export function WorkflowSteps({ className }: { className?: string }) {
  return (
    <ol className={cn('grid gap-6 md:grid-cols-2 lg:grid-cols-4', className)}>
      {GETTING_STARTED_STEPS.map((step, index) => (
        <li key={step.title} className="relative">
          {index < GETTING_STARTED_STEPS.length - 1 && (
            <span
              className="absolute left-12 right-0 top-5 hidden h-px bg-gradient-to-r from-brand/50 to-transparent lg:block"
              aria-hidden="true"
            />
          )}
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand/40 bg-brand/10 font-mono text-sm font-semibold text-brand">
            {String(index + 1).padStart(2, '0')}
          </div>
          <h3 className="mt-4 font-display text-lg font-semibold">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
