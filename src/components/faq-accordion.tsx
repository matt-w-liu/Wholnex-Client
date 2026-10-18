import type { FaqItem } from '@/lib/content';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

interface FaqAccordionProps {
  items: FaqItem[];
  className?: string;
  idPrefix?: string;
}

export function FaqAccordion({ items, className, idPrefix = 'faq' }: FaqAccordionProps) {
  return (
    <Accordion type="single" collapsible className={cn('w-full divide-y divide-border rounded-xl border border-border bg-card', className)}>
      {items.map((faq, index) => (
        <AccordionItem key={faq.question} value={`${idPrefix}-${index}`} className="border-b-0 px-5">
          <AccordionTrigger className="text-left font-display text-base font-semibold hover:no-underline">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-[0.95rem] leading-relaxed text-muted-foreground">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
