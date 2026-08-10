'use client';

import { useMemo } from 'react';
import { SplitText } from '@/components/motion/SplitText';
import { Button } from '@/components/ui/Button';
import { CircularCarousel, type CarouselItem } from '@/components/ui/circular-carousel';
import { Section } from '@/components/ui/Section';
import { principles } from '@/lib/content';

export function WhyVrazeal() {
  // `metric` is the short proof word ("Zero", "90+"), which is exactly what the
  // carousel's tag slot is for.
  const items = useMemo<CarouselItem[]>(
    () =>
      principles.map((principle) => ({
        id: principle.title,
        title: principle.title,
        description: principle.body,
        tag: principle.metric,
      })),
    [],
  );

  return (
    <Section id="approach" index="03" label="Approach" meta="Why teams choose us">
      <div className="shell mt-14 lg:mt-20">
        <div className="grid grid-cols-12 items-end gap-y-8">
          <h2 className="col-span-12 text-h2 font-medium lg:col-span-6">
            <SplitText text="Built properly," />
            <span className="block text-muted">
              <SplitText text="the first time." delay={0.12} />
            </span>
          </h2>
          <p className="col-span-12 max-w-prose text-lead text-muted lg:col-span-5 lg:col-start-8">
            Most agencies optimise for the pitch. We optimise for the third year — when the team has
            doubled, the requirements have changed, and the software still has to hold.
          </p>
        </div>

        {/* Off-white stage so the white cards read as raised against it — on a
            paper background they would have nothing to sit on but their shadow.

            overflow-hidden is load-bearing: cards sit at x: ±220 with a 192px
            width, so the cluster needs ~632px. Below that the outer cards have
            to clip, or they push the page into horizontal scroll. */}
        <div className="mt-14 overflow-hidden rounded-card border border-line bg-surface px-4 py-12 sm:px-8 lg:mt-16 lg:py-16">
          <CircularCarousel items={items} autoPlayInterval={5000} />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
          <p className="max-w-[44ch] text-[0.9375rem] text-muted">
            If any of the seven above are not true of your current stack, that is usually the
            conversation worth having.
          </p>
          <Button as="a" href="#contact" variant="outline" size="md" data-cursor="link">
            Book a technical call
          </Button>
        </div>
      </div>
    </Section>
  );
}
