import { Link } from 'react-router-dom';
import { COMPANY, COMPANY_ADDRESS_LINE } from '@/lib/constants';
import { LegalDocument } from '@/components/legal-document';

/**
 * DRAFT — LEGAL REVIEW REQUIRED. Describes the data this website actually collects. Not a binding
 * policy until approved in src/lib/legal.ts. See docs/LEGAL_REVIEW.md.
 */
export function PrivacyPage() {
  return (
    <LegalDocument id="privacy">
      <h2>Who we are</h2>
      <p>
        {COMPANY.name} (“WHOLNEX”, “we”, “us”) operates this website at {COMPANY.url}. Our business address is{' '}
        {COMPANY_ADDRESS_LINE}. For privacy questions or requests, email{' '}
        <a href={`mailto:${COMPANY.publicEmail}`}>{COMPANY.publicEmail}</a> or use our{' '}
        <Link to="/contact?category=general">contact form</Link>.
      </p>

      <h2>Information we collect</h2>
      <h3>Contact messages</h3>
      <p>
        When you use the contact form we collect your name, email address, optional company name, the inquiry category,
        subject, message, and your consent to be contacted.
      </p>
      <h3>VPS configuration and quote requests</h3>
      <p>
        When you request a quote we collect the configuration details you choose (plan tier, workload, operating system,
        suggested resources, number of servers, management preference, region preference, timeline, and any
        requirements you describe) together with your name, email address, and optional company name.
      </p>
      <h3>Accounts</h3>
      <p>
        If you create an account we store your name, email address, optional phone number, a one-way hash of your
        password (never the password itself), your role, sign-in timestamps, and security counters used to lock an
        account after repeated failed sign-in attempts.
      </p>
      <h3>Technical information</h3>
      <p>
        To limit spam and abuse, we store a one-way hash of the IP address associated with each form submission rather
        than the IP address itself. Our servers may also keep standard request logs for security and troubleshooting.
      </p>

      <h2>How we use information</h2>
      <ul>
        <li>To respond to inquiries and prepare quotes you request.</li>
        <li>To operate customer accounts, including showing your past messages and quote requests.</li>
        <li>To send transactional emails such as submission confirmations and password resets.</li>
        <li>To protect the website and our services against fraud, spam, and abuse.</li>
      </ul>
      <p>We do not sell personal information, and we do not use it for automated decisions with legal effects.</p>

      <h2>Service providers</h2>
      <p>
        We use infrastructure providers to operate this website, including website and database hosting and an email
        delivery provider. This website loads fonts from Google Fonts, which means your browser connects to Google
        servers and shares your IP address with Google when pages load. [TO BE CONFIRMED: list of named providers.]
      </p>

      <h2>Browser storage</h2>
      <p>
        We use your browser’s local storage for sign-in tokens, your theme preference, your cookie-consent choice, and
        optional progress on the security checklist. See our <Link to="/cookies">Cookie Policy</Link>.
      </p>

      <h2>Retention</h2>
      <p>
        We keep inquiry, quote, and account records for as long as needed to respond to you, provide services, and meet
        legal obligations. [TO BE CONFIRMED: specific retention periods.]
      </p>

      <h2>Your choices and rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal information, subject to applicable law.
        Depending on where you live, you may have additional rights under state privacy laws. Submit requests through our{' '}
        <Link to="/contact?category=general">contact form</Link>.
      </p>

      <h2>Security</h2>
      <p>
        We use measures such as password hashing, rate limiting, input validation, and encrypted connections. No method
        of transmission or storage is completely secure.
      </p>

      <h2>Children</h2>
      <p>This website is not directed to children under 13, and we do not knowingly collect their personal information.</p>

      <h2>Changes</h2>
      <p>We will post updates to this policy on this page and revise the effective date above.</p>
    </LegalDocument>
  );
}

export default PrivacyPage;
