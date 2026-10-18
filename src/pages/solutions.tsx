import { Link } from 'react-router-dom';
import { ArrowRight, Check, Download } from 'lucide-react';
import { USE_CASES } from '@/lib/content';
import { SITE_IMAGES } from '@/lib/images';
import { Seo } from '@/components/seo';
import { PageHero } from '@/components/page-hero';
import { SectionHeading } from '@/components/section-heading';
import { ResponsiveImage } from '@/components/responsive-image';
import { CtaBand } from '@/components/cta-band';
import { Button } from '@/components/ui/button';

export function SolutionsPage() {
  const featured = USE_CASES.filter((useCase) => useCase.image);

  return (
    <>
      <Seo
        title="VPN Use Cases — Public Wi-Fi, Remote Work, Travel & Privacy"
        description="How WHOLNEX VPN helps on public Wi-Fi, for remote work and travel, for everyday online privacy, and for giving teams secure, encrypted connections."
        path="/solutions"
      />
      <PageHero
        eyebrow="Solutions"
        breadcrumbs={[{ name: 'Solutions', path: '/solutions' }]}
        title="Where a VPN makes a difference"
        description="From the café down the street to a team spread across time zones — the situations where an encrypted connection matters most."
        image={SITE_IMAGES.ethernetSwitchCabling}
        actions={
          <Button size="lg" asChild>
            <Link to="/download">
              <Download aria-hidden="true" /> Download for Windows
            </Link>
          </Button>
        }
      />

      <section className="container-page py-20 sm:py-24">
        <SectionHeading eyebrow="Featured" title="Common reasons people use a VPN" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((useCase) => (
            <a
              key={useCase.id}
              href={`#${useCase.id}`}
              className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-border p-5 text-white"
            >
              <ResponsiveImage
                image={SITE_IMAGES[useCase.image!]}
                alt=""
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/10" />
              <useCase.icon className="h-6 w-6 text-cyan-400" aria-hidden="true" />
              <h3 className="mt-3 font-display text-lg font-semibold text-white">{useCase.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-slate-300">{useCase.summary}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="All use cases"
            title="How WHOLNEX VPN fits in"
            description="Each card links to the plan request form with that use preselected."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {USE_CASES.map((useCase) => (
              <article
                key={useCase.id}
                id={useCase.id}
                className="flex scroll-mt-24 flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-brand/40 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-brand/20 bg-brand/10 text-brand">
                    <useCase.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold">{useCase.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{useCase.summary}</p>
                  </div>
                </div>
                <ul className="mt-5 space-y-2 text-sm">
                  {useCase.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/quote?use=${useCase.useCase}`}
                  className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand hover:underline"
                  aria-label={`Request a plan for ${useCase.title.toLowerCase()}`}
                >
                  Request a plan for this <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

export default SolutionsPage;
