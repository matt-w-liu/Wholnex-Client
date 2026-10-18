import { Link } from 'react-router-dom';
import { COMPANY } from '@/lib/constants';
import { LegalDocument } from '@/components/legal-document';

/**
 * DRAFT — REVIEW REQUIRED. Not published until approved in src/lib/legal.ts.
 */
export function AccessibilityPage() {
  return (
    <LegalDocument id="accessibility">
      <h2>Our commitment</h2>
      <p>
        {COMPANY.name} wants this website to be usable by everyone. We aim to follow the Web Content Accessibility
        Guidelines (WCAG) 2.2 at Level AA.
      </p>

      <h2>What we have done</h2>
      <ul>
        <li>Semantic page structure with a skip-to-content link and labeled navigation regions.</li>
        <li>Keyboard-accessible menus, dialogs, accordions, tabs, and form controls.</li>
        <li>Visible focus indicators and color contrast checked against WCAG AA in light and dark themes.</li>
        <li>Form fields with associated labels and announced validation messages.</li>
        <li>Reduced motion when your operating system requests it.</li>
      </ul>

      <h2>Known limitations</h2>
      <p>
        This website has not yet undergone an independent accessibility audit. Some issues may remain, and we will
        address them as they are found.
      </p>

      <h2>Feedback</h2>
      <p>
        If you encounter a barrier, please <Link to="/contact?category=general">contact us</Link> and describe the page
        and the problem. We will do our best to help and to fix it.
      </p>
    </LegalDocument>
  );
}

export default AccessibilityPage;
