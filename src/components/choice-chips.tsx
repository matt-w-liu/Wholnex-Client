import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@/lib/utils';

export interface ChoiceOption<T extends string> {
  value: T;
  label: string;
  description?: string;
}

interface ChoiceChipsProps<T extends string> {
  value: T | undefined;
  onChange: (value: T) => void;
  options: ChoiceOption<T>[];
  /** Accessible name for the group when there is no visible <label>. */
  'aria-label'?: string;
  'aria-labelledby'?: string;
  className?: string;
  layout?: 'chips' | 'cards';
}

/**
 * Accessible single-choice group (Radix RadioGroup) styled as chips or cards.
 * Arrow keys move between options; the selected option is announced as checked.
 */
export function ChoiceChips<T extends string>({
  value,
  onChange,
  options,
  className,
  layout = 'chips',
  ...aria
}: ChoiceChipsProps<T>) {
  return (
    <RadioGroupPrimitive.Root
      value={value ?? ''}
      onValueChange={(next) => onChange(next as T)}
      className={cn(layout === 'chips' ? 'flex flex-wrap gap-2' : 'grid gap-3 sm:grid-cols-2 lg:grid-cols-3', className)}
      {...aria}
    >
      {options.map((option) => (
        <RadioGroupPrimitive.Item
          key={option.value}
          value={option.value}
          className={cn(
            'border text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'data-[state=checked]:border-brand data-[state=checked]:bg-brand/10 data-[state=checked]:shadow-glow',
            'border-border bg-card hover:border-brand/50',
            layout === 'chips' ? 'rounded-lg px-3.5 py-2 font-mono text-sm' : 'rounded-xl p-4',
          )}
        >
          {layout === 'chips' ? (
            option.label
          ) : (
            <>
              <span className="block font-display text-sm font-semibold">{option.label}</span>
              {option.description && <span className="mt-1 block text-xs leading-snug text-muted-foreground">{option.description}</span>}
            </>
          )}
        </RadioGroupPrimitive.Item>
      ))}
    </RadioGroupPrimitive.Root>
  );
}
