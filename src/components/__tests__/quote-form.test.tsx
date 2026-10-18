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

describe('QuoteForm', () => {
  it('applies plan presets to the suggested resources and summary', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByRole('radio', { name: /performance vps/i }));

    expect(screen.getByRole('radio', { name: '4 vCPU' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: '8 GB' })).toHaveAttribute('aria-checked', 'true');
    const summary = screen.getByRole('complementary', { name: /configuration summary/i });
    expect(within(summary).getByText('Performance VPS')).toBeInTheDocument();
    expect(within(summary).getByText('160 GB')).toBeInTheDocument();
  });

  it('uses defaults from the URL and shows the Windows licensing note', () => {
    renderForm({ planInterest: 'business', operatingSystem: 'windows-server' });

    expect(screen.getByRole('radio', { name: /business vps/i })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByText(/requires microsoft licensing/i)).toBeInTheDocument();
  });

  it('requires contact details and consent before submitting', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByRole('button', { name: /request my quote/i }));

    await waitFor(() => {
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
