import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${site.name} collects, uses, and protects personal information.`,
  robots: { index: true, follow: true },
};

/**
 * TEMPLATE — not legal advice. The clauses below describe a site that collects
 * only what this codebase actually collects (an email enquiry, nothing else).
 * Have counsel review and adjust for your jurisdiction before launch.
 */
export default function PrivacyPage() {
  return (
    <>
      <p className="eyebrow">Legal</p>
      <h1 className="mt-5 text-h2 font-medium">Privacy Policy</h1>
      <p className="!mt-6 !text-lead">
        {site.name} collects as little as possible. This page explains what that means in practice.
      </p>

      <h2>Information we collect</h2>
      <p>
        This website has no sign-up, no account system, and no advertising trackers. The only
        personal information we receive is what you choose to send us — your name, email address,
        and whatever you write — when you contact us at {site.email}.
      </p>

      <h2>How we use it</h2>
      <p>
        To reply to you, and to carry out any work you subsequently engage us for. We do not sell,
        rent, or share your information with third parties for marketing, and we do not add you to a
        mailing list because you emailed us once.
      </p>

      <h2>Analytics</h2>
      <p>
        If analytics are enabled on this site, they are configured to record aggregate page views
        without cookies and without profiling individual visitors across sites.
      </p>

      <h2>Retention</h2>
      <p>
        Enquiry correspondence is kept for as long as we have an active relationship, and for the
        period afterwards required by our tax and accounting obligations. You can ask us to delete
        it sooner.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us what we hold about you, ask us to correct it, or ask us to erase it. Write to{' '}
        {site.email} and we will respond within thirty days.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy go to {site.email}.
      </p>
    </>
  );
}
