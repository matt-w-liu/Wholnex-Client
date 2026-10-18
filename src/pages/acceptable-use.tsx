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
        This Acceptable Use Policy describes activities that are not permitted on {COMPANY.name} virtual private servers,
        networks, and related services. It protects our customers, our infrastructure, and the wider internet.
      </p>

      <h2>Prohibited activities</h2>
      <p>You may not use WHOLNEX services to:</p>
      <ul>
        <li>Violate any applicable law or regulation, or facilitate others in doing so.</li>
        <li>Host, store, or distribute child sexual abuse material. Such material will be reported to authorities.</li>
        <li>Send unsolicited bulk email or operate infrastructure for spam.</li>
        <li>Distribute malware, operate botnets or command-and-control servers, or host phishing pages.</li>
        <li>Launch denial-of-service attacks or scan, probe, or access systems without authorization.</li>
        <li>Infringe intellectual property rights, including hosting pirated software or media.</li>
        <li>Operate open proxies, open mail relays, or other services that can be abused by third parties.</li>
        <li>Interfere with other customers’ services or attempt to break virtual machine isolation.</li>
      </ul>
      <p>[TO BE CONFIRMED: policy on cryptocurrency mining, game servers, Tor exit nodes, and VPN services.]</p>

      <h2>Resource usage</h2>
      <p>
        Use resources in line with your configuration. Sustained use that degrades other customers’ services may be
        limited. [TO BE CONFIRMED: specific fair-use thresholds.]
      </p>

      <h2>Security responsibilities</h2>
      <p>
        You must take reasonable steps to secure your server. A compromised server used for abuse may be isolated until
        it is cleaned. See our <Link to="/security">security guide</Link>.
      </p>

      <h2>Reporting abuse</h2>
      <p>
        To report abuse originating from WHOLNEX services, <Link to="/contact?category=technical-support">contact us</Link>{' '}
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
