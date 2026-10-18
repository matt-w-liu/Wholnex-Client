import { Helmet } from 'react-helmet-async';
import { COMPANY } from '@/lib/constants';
import type { FaqItem } from '@/lib/content';

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: 'website' | 'article';
}

const DEFAULT_IMAGE = `${COMPANY.url}/og-image.png`;

export function Seo({ title, description, path = '', image, noIndex, type = 'website' }: SeoProps) {
  const fullTitle = title.includes(COMPANY.brand) ? title : `${title} | ${COMPANY.name}`;
  const canonical = `${COMPANY.url}${path === '/' ? '/' : path}`;
  const ogImage = image ?? DEFAULT_IMAGE;

  return (
    <Helmet>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={`${COMPANY.brand} — ${COMPANY.descriptor}`} />
      <meta property="og:site_name" content={COMPANY.name} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

/** Organization structured data — confirmed company facts only (no ratings, reviews, or awards). */
export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${COMPANY.url}/#organization`,
        name: COMPANY.name,
        alternateName: COMPANY.brand,
        url: COMPANY.url,
        logo: `${COMPANY.url}/icon-512.png`,
        email: COMPANY.publicEmail,
        description: `${COMPANY.name} provides virtual private network (VPN) services for individuals and organizations.`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: COMPANY.address.street,
          addressLocality: COMPANY.address.city,
          addressRegion: COMPANY.address.region,
          postalCode: COMPANY.address.postalCode,
          addressCountry: COMPANY.address.countryCode,
        },
        employee: {
          '@type': 'Person',
          name: COMPANY.ceo.name,
          jobTitle: COMPANY.ceo.title,
        },
      }}
    />
  );
}

export function WebsiteJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${COMPANY.url}/#website`,
        name: COMPANY.brand,
        url: COMPANY.url,
        inLanguage: COMPANY.language,
        publisher: { '@id': `${COMPANY.url}/#organization` },
      }}
    />
  );
}

export interface BreadcrumbEntry {
  name: string;
  path: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbEntry[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [{ name: 'Home', path: '/' }, ...items].map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${COMPANY.url}${item.path}`,
        })),
      }}
    />
  );
}

export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }}
    />
  );
}
