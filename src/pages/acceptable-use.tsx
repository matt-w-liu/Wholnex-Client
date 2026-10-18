import { Link } from 'react-router-dom';
import { COMPANY } from '@/lib/constants';
import { LegalDocument } from '@/components/legal-document';

/**
 * DRAFT — LEGAL REVIEW REQUIRED. Bracketed items require a business decision.
 * Not binding until approved in src/lib/legal.ts. See docs/LEGAL_REVIEW.md.
 */
export function AcceptableUsePage() {
  return (
    <LegalDocument id="acceptable-use">
      <h2>Purpose</h2>
      <p>
        This Acceptable Use Policy describes activities that are not permitted when using the {COMPANY.name} VPN app,
        VPN servers, and related services. It protects our customers, our network, and the wider internet.
      </p>

      <h2>Prohibited activities</h2>
      <p>You may not use WHOLNEX services to:</p>
      <ul>
        <li>Violate any applicable law or regulation, or facilitate others in doing so.</li>
        <li>Host, store, or distribute child sexual abuse material. Such material will be reported to authorities.</li>
        <li>Send spam or unsolicited bulk messages through the VPN.</li>
        <li>Distribute malware, control botnets, or carry out phishing or fraud.</li>
        <li>Launch denial-of-service attacks or scan, probe, or access systems without authorization.</li>
        <li>Infringe intellectual property rights, including distributing pirated software or media.</li>
        <li>Resell, share, or redistribute VPN access beyond what your plan allows.</li>
        <li>Interfere with, overload, or attempt to gain unauthorized access to WHOLNEX servers or other users.</li>
      </ul>
      <p>[TO BE CONFIRMED: policy on peer-to-peer file sharing, port forwarding, and automated or bulk traffic.]</p>

      <h2>Fair use</h2>
      <p>
        Use the service in line with your plan. Sustained use that degrades the service for other customers may be
        limited. [TO BE CONFIRMED: specific fair-use thresholds, if any.]
      </p>

      <h2>Your device</h2>
      <p>
        Keep your device secure. Access from a compromised device used for abuse may be suspended until the problem is
        resolved. See our <Link to="/security">security guide</Link>.
      </p>

      <h2>Reporting abuse</h2>
      <p>
        To report abuse originating from WHOLNEX VPN servers, <Link to="/contact?category=technical-support">contact us</Link>{' '}
        with as much detail as possible, including IP addresses, timestamps, and logs.
      </p>

      <h2>Enforcement</h2>
      <p>
        Depending on severity, WHOLNEX may warn, restrict, suspend, or terminate services. [TO BE CONFIRMED: notice and
        appeal process.]
      </p>
    </LegalDocument>
  );
}

export default AcceptableUsePage;
