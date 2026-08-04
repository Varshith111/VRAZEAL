import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: `The terms governing use of the ${site.name} website.`,
  robots: { index: true, follow: true },
};

/**
 * TEMPLATE — not legal advice. Covers use of this website only; it is not a
 * services agreement. Have counsel review before launch, and add the governing
 * law and registered entity details for your jurisdiction.
 */
export default function TermsPage() {
  return (
    <>
      <p className="eyebrow">Legal</p>
      <h1 className="mt-5 text-h2 font-medium">Terms of Use</h1>
      <p className="!mt-6 !text-lead">
        These terms cover your use of this website. Client engagements are governed by a separate
        signed agreement, not by this page.
      </p>

      <h2>Using this site</h2>
      <p>
        You may read, share, and link to anything published here. You may not scrape it at a rate
        that degrades service for others, republish it as your own, or use it to train a model
        without written permission.
      </p>

      <h2>Our work and case studies</h2>
      <p>
        Figures shown in case studies describe outcomes for specific clients under specific
        conditions. They are illustrative of the work, not a forecast or a guarantee of results for
        your business.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The {site.name} name, wordmark, written content, and the design and code of this site remain
        our property. Client names and marks shown on this site remain the property of their
        respective owners and appear with permission.
      </p>

      <h2>Client work</h2>
      <p>
        Where we build software for a client, ownership of the delivered code, infrastructure
        accounts, and design files transfers to that client as set out in the engagement agreement.
        Nothing on this page overrides that agreement.
      </p>

      <h2>No warranty</h2>
      <p>
        This site is provided as is. We keep it accurate and available as best we can, but we do not
        warrant that it will be uninterrupted or error free, and we are not liable for decisions
        made solely on the basis of what is published here.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms. Material changes will be reflected in the date below.
      </p>

      <h2>Contact</h2>
      <p>Questions go to {site.email}.</p>
    </>
  );
}
