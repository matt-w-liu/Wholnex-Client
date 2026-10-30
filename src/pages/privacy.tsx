import { LegalDocument } from '@/components/legal-document';

const PRIVACY_EMAIL = 'ravindrakuvar@wholnex.net';

/** Privacy Policy text as supplied by WHOLNEX. Publication status lives in src/lib/legal.ts. */
export function PrivacyPage() {
  return (
    <LegalDocument id="privacy">
      <p>
        At FluxShield VPN, your privacy and security are our top priorities. This Privacy Policy explains how we
        collect, use, and protect information when you use our VPN services (“Service”) and associated website domains
        (“Site”).
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        FluxShield VPN is committed to minimizing the data we process. We do NOT collect or store identifiable personal
        information, browsing history, DNS queries, IP addresses, or traffic content.
      </p>
      <p>
        To keep the Service running, we may collect non-personal, technical telemetry such as operating system version,
        device model, manufacturer, app version, language, system country setting, connection timestamps, aggregated
        data transfer amounts, and anonymous diagnostic or crash information.
      </p>
      <p>
        This information is non-identifiable, used solely for service quality, and cannot be linked back to a specific
        user or their online behavior.
      </p>

      <h2>2. How We Use This Information</h2>
      <ul>
        <li>
          Maintain performance and stability, monitor server capacity, optimize routes, and troubleshoot connection
          issues.
        </li>
        <li>Diagnose crashes or technical problems and inform product improvements.</li>
        <li>
          Selected diagnostic signals may be processed by trusted analytics providers strictly for technical analysis.
          All such data remains anonymous and cannot reveal your identity or online activity.
        </li>
      </ul>

      <h2>3. Data Security</h2>
      <p>
        We employ administrative, technical, and physical safeguards to protect the limited telemetry we collect,
        helping prevent unauthorized access, alteration, or disclosure.
      </p>
      <p>
        No internet transmission is completely secure; despite our best efforts, we cannot guarantee absolute security.
      </p>

      <h2>4. Third-Party Services</h2>
      <p>
        FluxShield VPN may rely on vetted third parties for analytics, crash reporting, or performance monitoring.
      </p>
      <p>
        These partners receive only anonymized, non-identifiable technical data and must uphold strict data protection
        standards.
      </p>
      <p>
        We do not sell, share, or disclose personal data, nor provide any information that could expose your browsing
        history, content, IP address, or behavior.
      </p>

      <h2>5. Your Rights</h2>
      <p>
        Depending on your jurisdiction, you may be able to request access to non-personal telemetry associated with your
        account (if applicable), request deletion of diagnostic data, or opt out of diagnostic collection through system
        or in-app settings when available.
      </p>
      <p>Submit privacy inquiries or requests via the contact information below.</p>

      <h2>6. Changes to This Privacy Policy</h2>
      <p>
        We may update this policy to reflect new legal requirements, product capabilities, or operational practices. The
        most recent version will always be available on our website or within the app.
      </p>
      <p>Continued use of the Service after updates signifies acceptance of the revised policy.</p>

      <h2>7. Contact Us</h2>
      <p>
        Questions or requests? Email us at <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>. We aim to respond
        as quickly as possible.
      </p>
    </LegalDocument>
  );
}

export default PrivacyPage;
