'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

const serviceOptions = [
  'Website Development',
  'Custom CRM & Software',
  'AI Solutions & Automations',
  'Branding & Graphic Design',
  'Digital Marketing',
  'Not sure yet',
];

const budgetOptions = [
  'Under £5,000',
  '£5,000 – £15,000',
  '£15,000 – £30,000',
  '£30,000 – £60,000',
  '£60,000+',
  'Not sure yet',
];

type FormState = 'idle' | 'submitting' | 'success';

export function ContactPage() {
  const reduced = useReducedMotion();
  const [state, setState] = useState<FormState>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    details: '',
  });

  const set =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('submitting');
    await new Promise((r) => setTimeout(r, 1200));
    setState('success');
  };

  const inputBase = cn(
    'w-full bg-paper border border-page-line rounded-[10px] px-4 py-3.5',
    'text-[0.9375rem] text-page-ink placeholder:text-page-muted/40',
    'transition-colors duration-300',
    'focus:border-page-ink focus:outline-none',
  );

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build something that matters."
        subtitle="Tell us about your project and we will get back to you within one business day."
      />

      <section className="bg-surface pb-section">
        <div className="shell">
          <div className="grid grid-cols-12 gap-y-14 lg:gap-x-16">

            {/* Left — contact info */}
            <div className="col-span-12 lg:col-span-4">
              <Reveal>
                <div className="space-y-10">
                  <div>
                    <p className="font-mono text-label uppercase tracking-[0.16em] text-page-muted mb-4">
                      Get in touch
                    </p>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-[1.0625rem] text-page-muted hover:text-page-ink transition-colors duration-300"
                    >
                      {site.email}
                    </a>
                  </div>

                  <div>
                    <p className="font-mono text-label uppercase tracking-[0.16em] text-page-muted mb-4">
                      Follow us
                    </p>
                    <div className="flex flex-col gap-3">
                      {site.social.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[0.9375rem] text-page-muted hover:text-page-ink transition-colors duration-300"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="bg-paper rounded-card border border-page-line p-6">
                    <p className="text-[0.875rem] font-medium text-page-ink mb-2">Response time</p>
                    <p className="text-[0.875rem] text-page-muted leading-[1.65]">
                      We respond to all enquiries within one business day. For urgent projects,
                      mention it in your message.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right — form */}
            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              {state === 'success' ? (
                <motion.div
                  initial={reduced ? undefined : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-paper rounded-card border border-page-line p-10 flex flex-col gap-5"
                >
                  <span className="font-mono text-label uppercase tracking-[0.16em] text-page-accent">
                    Message received
                  </span>
                  <h3 className="text-h3 font-medium text-page-ink">
                    We will be in touch shortly.
                  </h3>
                  <p className="text-[0.9375rem] text-page-muted leading-[1.65] max-w-[44ch]">
                    Thank you for reaching out. We review every enquiry carefully and will respond
                    within one business day.
                  </p>
                </motion.div>
              ) : (
                <Reveal>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 text-[0.8125rem] font-medium text-page-ink"
                        >
                          Name *
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          placeholder="Your full name"
                          value={form.name}
                          onChange={set('name')}
                          className={inputBase}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-2 text-[0.8125rem] font-medium text-page-ink"
                        >
                          Email *
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="you@company.com"
                          value={form.email}
                          onChange={set('email')}
                          className={inputBase}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block mb-2 text-[0.8125rem] font-medium text-page-ink"
                        >
                          Phone
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          placeholder="+44 7700 000000"
                          value={form.phone}
                          onChange={set('phone')}
                          className={inputBase}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="company"
                          className="block mb-2 text-[0.8125rem] font-medium text-page-ink"
                        >
                          Company
                        </label>
                        <input
                          id="company"
                          type="text"
                          placeholder="Company name"
                          value={form.company}
                          onChange={set('company')}
                          className={inputBase}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="service"
                          className="block mb-2 text-[0.8125rem] font-medium text-page-ink"
                        >
                          Service required *
                        </label>
                        <select
                          id="service"
                          required
                          value={form.service}
                          onChange={set('service')}
                          className={cn(inputBase, 'cursor-pointer')}
                        >
                          <option value="" disabled>
                            Select a service
                          </option>
                          {serviceOptions.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="budget"
                          className="block mb-2 text-[0.8125rem] font-medium text-page-ink"
                        >
                          Budget range
                        </label>
                        <select
                          id="budget"
                          value={form.budget}
                          onChange={set('budget')}
                          className={cn(inputBase, 'cursor-pointer')}
                        >
                          <option value="" disabled>
                            Select a range
                          </option>
                          {budgetOptions.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="details"
                        className="block mb-2 text-[0.8125rem] font-medium text-page-ink"
                      >
                        Project details *
                      </label>
                      <textarea
                        id="details"
                        required
                        rows={5}
                        placeholder="Tell us about your project, what you are trying to achieve, and any relevant context."
                        value={form.details}
                        onChange={set('details')}
                        className={cn(inputBase, 'resize-none')}
                      />
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        size="lg"
                        magnetic={false}
                        disabled={state === 'submitting'}
                        className="w-full sm:w-auto"
                      >
                        {state === 'submitting' ? 'Sending…' : 'Start a conversation'}
                      </Button>
                    </div>
                  </form>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
