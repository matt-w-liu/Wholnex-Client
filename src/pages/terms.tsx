import { Link } from 'react-router-dom';
import { COMPANY, COMPANY_ADDRESS_LINE } from '@/lib/constants';
import { LegalDocument } from '@/components/legal-document';

/**
 * DRAFT — LEGAL REVIEW REQUIRED. Bracketed items require a business or legal decision.
 * Not binding until approved in src/lib/legal.ts. See docs/LEGAL_REVIEW.md.
 */
export function TermsPage() {
  return (
    <LegalDocument id="terms">
      <h2>1. Agreement</h2>
      <p>
        These Terms of Service govern your use of the website at {COMPANY.url}, the WHOLNEX VPN app, and the virtual
        private network (VPN) services provided by {COMPANY.name}, {COMPANY_ADDRESS_LINE} (“WHOLNEX”). By using the
        website, the app, or the services you agree to these terms.
      </p>

      <h2>2. Plans and subscriptions</h2>
      <p>
        Information on this website, including plan tiers, is descriptive and is not an offer. [TO BE CONFIRMED: how
        subscriptions are purchased, what each plan includes, and how plan terms are confirmed to the customer.]
      </p>

      <h2>3. Accounts</h2>
      <p>
        You are responsible for keeping your account credentials confidential and for activity under your account.
        Provide accurate information and notify us of any unauthorized use.
      </p>

      <h2>4. Your responsibilities</h2>
      <p>A VPN does not make unlawful activity lawful. You are responsible for how you use the service, including:</p>
      <ul>
        <li>Keeping your device, operating system, and the WHOLNEX app up to date.</li>
        <li>Keeping your account credentials confidential and not sharing your account beyond your plan’s limits.</li>
        <li>Complying with the laws of the country you are in, including any restrictions on VPN use.</li>
        <li>Complying with the <Link to="/acceptable-use">Acceptable Use Policy</Link> and all applicable laws.</li>
      </ul>

      <h2>5. Fees and payment</h2>
      <p>
        Fees, billing frequency, and payment methods: [TO BE CONFIRMED]. [TO BE CONFIRMED: late payment, taxes,
        and price change terms.] Refunds are governed by the <Link to="/refund-policy">Refund Policy</Link>.
      </p>

      <h2>6. Suspension and termination</h2>
      <p>
        WHOLNEX may suspend or terminate services for material breach of these terms or the Acceptable Use Policy,
        non-payment, or where required by law. [TO BE CONFIRMED: notice periods and data retrieval window after
        termination.]
      </p>

      <h2>7. Service availability</h2>
      <p>
        WHOLNEX does not currently publish a service level agreement. VPN connections can be affected by your network,
        local restrictions, and server availability. [TO BE CONFIRMED: any availability commitments.]
      </p>

      <h2>7a. The WHOLNEX app</h2>
      <p>[TO BE CONFIRMED BY COUNSEL: software license grant, restrictions on reverse engineering, and automatic updates.]</p>

      <h2>8. Disclaimers and limitation of liability</h2>
      <p>[TO BE CONFIRMED BY COUNSEL: warranty disclaimer, limitation of liability, and indemnification.]</p>

      <h2>9. Governing law</h2>
      <p>[TO BE CONFIRMED BY COUNSEL: governing law, venue, and dispute resolution.]</p>

      <h2>10. Changes</h2>
      <p>We may update these terms. Material changes will be posted on this page with a new effective date.</p>

      <h2>11. Contact</h2>
      <p>
        Questions about these terms: <Link to="/contact?category=general">contact WHOLNEX</Link>.
      </p>
    </LegalDocument>
  );
}

export default TermsPage;
