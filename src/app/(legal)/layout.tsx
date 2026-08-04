import Link from 'next/link';
import { IconArrowDiagonal } from '@/components/ui/icons';

/**
 * Shared shell for the legal pages. Same type scale and rhythm as the marketing
 * page, but a single narrow measure — these are read, not scanned.
 */
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell pb-section pt-[calc(var(--nav-h)+clamp(4rem,10vh,7rem))]">
      <Link
        href="/"
        className="group inline-flex items-center gap-2 font-mono text-label uppercase text-muted transition-colors hover:text-ink"
      >
        <IconArrowDiagonal className="h-3.5 w-3.5 rotate-[225deg] transition-transform duration-500 ease-expo group-hover:-translate-x-0.5" />
        Back to site
      </Link>

      <article className="mt-12 max-w-[68ch] [&_h2]:mt-14 [&_h2]:text-h3 [&_h2]:font-medium [&_h2+p]:mt-4 [&_li]:text-[0.9375rem] [&_li]:leading-[1.7] [&_li]:text-muted [&_p]:mt-4 [&_p]:text-[0.9375rem] [&_p]:leading-[1.7] [&_p]:text-muted [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </article>
    </div>
  );
}
