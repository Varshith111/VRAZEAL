'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';

const solutions = [
  {
    id: 'support',
    number: '01',
    title: 'AI Customer Support',
    problem: 'Your support team spends most of their time answering the same questions.',
    solution: 'An AI agent trained on your products, policies, and FAQs — handles routine queries instantly, escalates complex ones to your team.',
    benefit: 'Faster response times. Lower support costs. Happier customers.',
  },
  {
    id: 'leads',
    number: '02',
    title: 'AI Lead Generation',
    problem: 'Leads come in but qualification takes too long and too many fall through the cracks.',
    solution: 'Automated lead capture, qualification, and routing — the right leads reach the right person at the right time.',
    benefit: 'More qualified pipeline. Less manual follow-up. Higher close rates.',
  },
  {
    id: 'sales',
    number: '03',
    title: 'AI Sales Automation',
    problem: 'Your sales team is spending time on admin instead of selling.',
    solution: 'Automated follow-up sequences, proposal generation, and CRM updates — so your team focuses on conversations, not data entry.',
    benefit: 'More selling time. Consistent follow-up. Shorter sales cycles.',
  },
  {
    id: 'whatsapp',
    number: '04',
    title: 'AI WhatsApp Automation',
    problem: 'Customer enquiries come in on WhatsApp at all hours and responses are inconsistent.',
    solution: 'An AI-powered WhatsApp agent that handles enquiries, books appointments, and qualifies leads — 24/7.',
    benefit: 'Always-on customer engagement. Consistent responses. More bookings.',
  },
  {
    id: 'crm',
    number: '05',
    title: 'AI CRM Automation',
    problem: 'Your CRM is full of stale data because updating it manually never happens consistently.',
    solution: 'Automated data enrichment, activity logging, and pipeline updates — your CRM stays accurate without anyone having to maintain it.',
    benefit: 'Clean data. Better forecasting. Less admin overhead.',
  },
  {
    id: 'documents',
    number: '06',
    title: 'AI Document Processing',
    problem: 'Your team spends hours extracting information from invoices, contracts, and forms.',
    solution: 'Intelligent document pipelines that extract, classify, and route information automatically — with human review where it matters.',
    benefit: 'Hours saved per week. Fewer errors. Faster processing.',
  },
  {
    id: 'email',
    number: '07',
    title: 'AI Email Automation',
    problem: 'Email campaigns are generic and follow-up sequences are inconsistent.',
    solution: 'Personalised email workflows triggered by behaviour — the right message reaches the right person at the right moment.',
    benefit: 'Higher open rates. More conversions. Less manual work.',
  },
  {
    id: 'workflow',
    number: '08',
    title: 'AI Workflow Automation',
    problem: 'Your team is held together by manual handoffs, spreadsheets, and Slack messages.',
    solution: 'End-to-end workflow automation that connects your tools, eliminates manual steps, and keeps everything moving without human intervention.',
    benefit: 'Faster operations. Fewer errors. Teams focused on what matters.',
  },
];

const automatable = [
  { area: 'Customer enquiries', example: 'Answered instantly by AI, 24/7' },
  { area: 'Lead qualification', example: 'Scored and routed automatically' },
  { area: 'Appointment booking', example: 'Booked via WhatsApp or web' },
  { area: 'Invoice processing', example: 'Extracted and filed automatically' },
  { area: 'Follow-up sequences', example: 'Triggered by behaviour, not calendar' },
  { area: 'CRM data entry', example: 'Updated from calls and emails' },
  { area: 'Report generation', example: 'Compiled and sent on schedule' },
  { area: 'Onboarding workflows', example: 'Triggered on signup, no manual steps' },
];

export function AiSolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="AI Solutions"
        title="Automate the repetitive. Focus on what matters."
        subtitle="We help businesses replace manual, time-consuming workflows with AI-powered systems that run reliably — without adding headcount."
      />

      {/* Solutions */}
      <section className="bg-paper pb-section">
        <div className="shell">
          {solutions.map((solution) => (
            <div key={solution.id} id={solution.id} className="scroll-mt-28">
              <div className="h-px w-full bg-line" />
              <div className="grid grid-cols-12 gap-y-8 py-12 lg:gap-x-16">
                <div className="col-span-12 lg:col-span-3">
                  <Reveal>
                    <span className="font-mono text-label text-accent">{solution.number}</span>
                    <h2 className="mt-3 text-[1.25rem] font-medium tracking-[-0.025em]">
                      {solution.title}
                    </h2>
                  </Reveal>
                </div>
                <div className="col-span-12 lg:col-span-8 lg:col-start-5">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <Reveal delay={0.05}>
                      <div className="rounded-card border border-line p-6">
                        <p className="eyebrow mb-3 text-muted">Problem</p>
                        <p className="text-[0.9375rem] leading-[1.65] text-muted">{solution.problem}</p>
                      </div>
                    </Reveal>
                    <Reveal delay={0.1}>
                      <div className="rounded-card border border-line p-6">
                        <p className="eyebrow mb-3 text-muted">AI Solution</p>
                        <p className="text-[0.9375rem] leading-[1.65] text-muted">{solution.solution}</p>
                      </div>
                    </Reveal>
                    <Reveal delay={0.15}>
                      <div className="rounded-card border border-accent/20 bg-accent/[0.03] p-6">
                        <p className="eyebrow mb-3 text-accent">Business Benefit</p>
                        <p className="text-[0.9375rem] leading-[1.65] text-muted">{solution.benefit}</p>
                      </div>
                    </Reveal>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Find what you can automate */}
      <section className="py-section bg-ink text-paper">
        <div className="shell">
          <div className="h-px w-full bg-paper/15" />
          <div className="pt-14">
            <Reveal>
              <h2 className="text-h2 font-medium max-w-[20ch]">
                Find what you can automate.
              </h2>
              <p className="mt-5 max-w-[52ch] text-lead text-paper/60">
                Most businesses have more automatable work than they realise. Here are the areas we
                most commonly address.
              </p>
            </Reveal>
            <RevealGroup className="mt-12 grid grid-cols-1 gap-px bg-paper/10 sm:grid-cols-2 lg:grid-cols-4 rounded-card overflow-hidden" stagger={0.04}>
              {automatable.map((item) => (
                <RevealItem key={item.area}>
                  <div className="bg-ink p-7 h-full">
                    <p className="text-[1rem] font-medium">{item.area}</p>
                    <p className="mt-2 text-[0.875rem] text-paper/50">{item.example}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section bg-paper">
        <div className="shell">
          <div className="h-px w-full bg-line" />
          <div className="pt-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <h2 className="text-h2 font-medium max-w-[18ch]">
                Ready to automate your business?
              </h2>
              <p className="mt-5 max-w-[44ch] text-lead text-muted">
                Tell us which workflows are slowing your team down and we will show you what is
                possible.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-wrap gap-4">
                <Button as={Link} href="/contact" size="lg">
                  Talk to VRAZEAL
                </Button>
                <Button as={Link} href="/services" variant="outline" size="lg">
                  All services
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
