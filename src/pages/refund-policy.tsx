import { Link } from 'react-router-dom';
import { LegalDocument } from '@/components/legal-document';

/**
 * DRAFT — BUSINESS DECISIONS REQUIRED. WHOLNEX has not supplied refund terms; this skeleton
 * only frames the decisions to make. Not binding until approved in src/lib/legal.ts.
 */
export function RefundPolicyPage() {
  return (
    <LegalDocument id="refund-policy">
      <h2>Scope</h2>
      <p>This policy will describe how cancellations and refunds work for WHOLNEX VPN subscriptions.</p>

      <h2>Before you are billed</h2>
      <p>
        Plan requests are free and non-binding. Submitting a contact message or plan request does not create an order
        or a charge, and downloading the app does not start a subscription.
      </p>

      <h2>Cancellations</h2>
      <p>[TO BE CONFIRMED: how to cancel, notice period, and when service ends after cancellation.]</p>

      <h2>Refund eligibility</h2>
      <p>[TO BE CONFIRMED: whether any money-back period applies, pro-rated refunds, and non-refundable items such as setup fees or licenses.]</p>

      <h2>How refunds are issued</h2>
      <p>[TO BE CONFIRMED: payment method, processing time, and currency (USD).]</p>

      <h2>Questions</h2>
      <p>
        <Link to="/contact?category=sales">Contact WHOLNEX sales</Link> with any questions about billing or refunds.
      </p>
    </LegalDocument>
  );
}

export default RefundPolicyPage;
