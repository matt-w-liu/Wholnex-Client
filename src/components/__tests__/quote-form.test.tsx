import { describe, expect, it } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { QuoteForm } from '@/components/quote-form';

function renderForm(defaults?: Parameters<typeof QuoteForm>[0]['defaults']) {
  return render(
    <MemoryRouter>
      <QuoteForm defaults={defaults} />
    </MemoryRouter>,
  );
}

describe('QuoteForm (VPN plan request)', () => {
  it('suggests a user count when a team plan is chosen and updates the summary', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByRole('radio', { name: /team vpn/i }));

    expect(screen.getByLabelText(/number of users/i)).toHaveValue(5);
    const summary = screen.getByRole('complementary', { name: /request summary/i });
    expect(within(summary).getByText('Team VPN')).toBeInTheDocument();
    expect(within(summary).getByText('5')).toBeInTheDocument();
  });

  it('lets people pick several device platforms, with Windows selected by default', async () => {
    const user = userEvent.setup();
    renderForm();

    expect(screen.getByRole('button', { name: 'Windows' })).toHaveAttribute('aria-pressed', 'true');
    await user.click(screen.getByRole('button', { name: 'Android' }));
    expect(screen.getByRole('button', { name: 'Android' })).toHaveAttribute('aria-pressed', 'true');

    const summary = screen.getByRole('complementary', { name: /request summary/i });
    expect(within(summary).getByText('Windows, Android')).toBeInTheDocument();
  });

  it('states which platforms actually have an app', () => {
    renderForm();
    expect(screen.getByText(/currently available for Windows/i)).toBeInTheDocument();
  });

  it('requires at least one platform, contact details, and consent', async () => {
    const user = userEvent.setup();
    renderForm({ planInterest: 'personal' });

    await user.click(screen.getByRole('button', { name: 'Windows' })); // deselect the only platform
    await user.click(screen.getByRole('button', { name: /send request/i }));

    await waitFor(() => {
      expect(screen.getByText(/select at least one device platform/i)).toBeInTheDocument();
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/enter a valid email/i)).toBeInTheDocument();
      expect(screen.getByText(/consent is required/i)).toBeInTheDocument();
    });
  });

  it('states that submitting is not an order', () => {
    renderForm();
    expect(screen.getByText(/it is not an order and nothing is charged/i)).toBeInTheDocument();
  });
});
