import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import { Logo } from '@/components/logo';
import { COMPANY, COMPANY_ADDRESS_LINES, FOOTER_LINKS } from '@/lib/constants';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden border-t border-navy-700 bg-navy-950 text-slate-300">
      <div className="bg-grid-dark mask-fade-b absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.6fr_repeat(4,1fr)]">
        <div className="space-y-5">
          <Link to="/" className="inline-block rounded-md" aria-label={`${COMPANY.name} home`}>
            <Logo tone="light" />
          </Link>
          <div>
            <p className="font-display text-base font-semibold text-white">{COMPANY.name}</p>
            <p className="mt-1 text-sm text-slate-400">{COMPANY.descriptor}</p>
          </div>
          <address className="flex items-start gap-2.5 text-sm not-italic text-slate-400">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
            <span>
              <span className="sr-only">Company address: </span>
              {COMPANY_ADDRESS_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
          </address>
          {COMPANY.publicEmail && (
            <p className="flex items-center gap-2.5 text-sm text-slate-400">
              <Mail className="h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
              <a href={`mailto:${COMPANY.publicEmail}`} className="hover:text-white">
                {COMPANY.publicEmail}
              </a>
            </p>
          )}
        </div>

        {FOOTER_LINKS.map((group) => (
          <nav key={group.title} aria-label={`${group.title} links`}>
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-slate-400">{group.title}</h2>
            <ul className="mt-4 space-y-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-slate-300 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-navy-700">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-slate-400 sm:flex-row">
          <p>
            © {year} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/refund-policy" className="hover:text-slate-300">
              Refund Policy
            </Link>
            <Link to="/cookies" className="hover:text-slate-300">
              Cookie Policy
            </Link>
            <Link to="/accessibility" className="hover:text-slate-300">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
