import { useId } from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  /** Use on always-dark surfaces (hero, footer) so the wordmark stays white in light mode. */
  tone?: 'auto' | 'light';
}

/**
 * WHOLNEX logo concept: a "connected W" — a single stroke linking three network nodes,
 * suggesting servers joined by a network. Original artwork created for this site; replace
 * with official brand artwork if WHOLNEX supplies one (see src/assets/README.md).
 */
export function LogoMark({ className }: { className?: string }) {
  const gradientId = useId();
  return (
    <svg viewBox="0 0 32 32" className={cn('h-9 w-9 shrink-0', className)} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gradientId} x1="4" y1="6" x2="28" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#60A5FA" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="#080F1F" />
      <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="none" stroke="#26385A" />
      <path
        d="M6.5 9.5 11.25 22.5 16 13.5 20.75 22.5 25.5 9.5"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6.5" cy="9.5" r="2.1" fill="#60A5FA" />
      <circle cx="16" cy="13.5" r="2.1" fill="#38BDF8" />
      <circle cx="25.5" cy="9.5" r="2.1" fill="#22D3EE" />
    </svg>
  );
}

export function Logo({ className, markClassName, showWordmark = true, tone = 'auto' }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark className={markClassName} />
      {showWordmark && (
        <span
          className={cn(
            'font-display text-lg font-bold leading-none tracking-[0.14em]',
            tone === 'light' ? 'text-white' : 'text-foreground',
          )}
        >
          WHOLNEX
        </span>
      )}
    </span>
  );
}
