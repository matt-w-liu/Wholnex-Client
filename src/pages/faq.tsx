import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { ALL_FAQS, FAQ_GROUPS } from '@/lib/content';
import { FaqJsonLd, Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { FaqAccordion } from '@/components/faq-accordion';
import { Button } from '@/components/ui/button';

export function FaqPage() {
  return (
    <>
      <Seo
        title="VPS Hosting FAQ"
        description="Answers to common questions about VPS hosting: what a VPS is, choosing CPU and RAM, operating systems, root access, security, backups, billing, and support at WHOLNEX."
        path="/faq"
      />
      <FaqJsonLd items={ALL_FAQS} />
      <PageHero
        size="compact"
        eyebrow="FAQ"
        breadcrumbs={[{ name: 'FAQ', path: '/faq' }]}
        title="Frequently asked questions"
        description="Everything you need to know about VPS hosting and how WHOLNEX works. Can’t find your answer? Ask the team."
      />

      <section className="container-page grid gap-12 py-14 sm:py-20 lg:grid-cols-[240px_1fr]">
        <nav aria-label="FAQ topics" className="lg:sticky lg:top-24 lg:self-start">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Topics</p>
          <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {FAQ_GROUPS.map((group) => (
              <li key={group.id}>
                <a
                  href={`#${group.id}`}
                  className="block rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground lg:border-transparent"
                >
                  {group.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-14">
          {FAQ_GROUPS.map((group) => (
            <section key={group.id} id={group.id} className="scroll-mt-24" aria-labelledby={`${group.id}-title`}>
              <h2 id={`${group.id}-title`} className="font-display text-2xl font-semibold">
                {group.title}
              </h2>
              <FaqAccordion className="mt-6" items={group.items} idPrefix={group.id} />
            </section>
          ))}

          <div className="flex flex-col items-start gap-5 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <MessageSquare className="mt-1 h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
              <div>
                <h2 className="font-display text-lg font-semibold">Still have a question?</h2>
                <p className="mt-1 text-sm text-muted-foreground">Send it to the WHOLNEX team and we will reply by email.</p>
              </div>
            </div>
            <Button asChild>
              <Link to="/contact">
                Contact us <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default FaqPage;
