import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { BreadcrumbJsonLd, type BreadcrumbEntry } from '@/components/seo';
import { cn } from '@/lib/utils';

interface BreadcrumbsProps {
  items: BreadcrumbEntry[];
  className?: string;
}

/** Visible breadcrumb trail plus BreadcrumbList structured data. The last item is the current page. */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <>
      <BreadcrumbJsonLd items={items} />
      <nav aria-label="Breadcrumb" className={cn('text-sm', className)}>
        <ol className="flex flex-wrap items-center gap-1.5 text-slate-400">
          <li>
            <Link to="/" className="transition-colors hover:text-white">
              Home
            </Link>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 text-slate-600" aria-hidden="true" />
                {isLast ? (
                  <span aria-current="page" className="text-slate-200">
                    {item.name}
                  </span>
                ) : (
                  <Link to={item.path} className="transition-colors hover:text-white">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
