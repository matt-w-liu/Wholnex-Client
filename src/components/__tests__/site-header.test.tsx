import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { SiteHeader } from '@/components/site-header';

vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    isAuthenticated: false,
    isAdmin: false,
    logout: vi.fn(),
  }),
}));

vi.mock('@/hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'dark',
    resolvedTheme: 'dark',
    setTheme: vi.fn(),
  }),
}));

function renderHeader(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <SiteHeader />
    </MemoryRouter>,
  );
}

describe('SiteHeader', () => {
  it('renders the WHOLNEX primary navigation', () => {
    renderHeader();

    for (const name of ['Home', 'VPN', 'Pricing', 'Download', 'Network', 'Solutions', 'About', 'Contact']) {
      expect(screen.getByRole('link', { name })).toBeInTheDocument();
    }
    expect(screen.getByRole('button', { name: 'Resources' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'WHOLNEX LLC home' })).toBeInTheDocument();
  });

  it('marks the current route as active', () => {
    renderHeader('/pricing');
    expect(screen.getByRole('link', { name: 'Pricing' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
  });

  it('reveals resource links from the Resources menu', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole('button', { name: 'Resources' }));

    expect(await screen.findByRole('link', { name: /FAQ/ })).toHaveAttribute('href', '/faq');
    expect(screen.getByRole('link', { name: /Security/ })).toHaveAttribute('href', '/security');
    expect(screen.getByRole('link', { name: /Support/ })).toHaveAttribute('href', '/contact?category=technical-support');
  });

  it('shows the plans CTA and sign-in when signed out', () => {
    renderHeader();

    expect(screen.getByRole('link', { name: 'View VPN Plans' })).toHaveAttribute('href', '/pricing');
    expect(screen.getByRole('link', { name: /sign in/i })).toHaveAttribute('href', '/login');
  });
});
