'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaqSection } from '@/components/home/FaqSection';
import { MaskText } from '@/components/motion/MaskText';
import { Button } from '@/components/ui/Button';
import { LightField } from '@/components/visual/LightField';
import { site } from '@/lib/site';
import { useStageReady } from '@/lib/stage';
import { cn } from '@/lib/utils';

const SERVICE_OPTIONS = [
  'Website',
  'Custom CRM & software',
  'AI & automation',
  'Branding & design',
  'Digital marketing',
  'Not sure yet',
];

const BUDGET_OPTIONS = ['Under £5k', '£5k – £15k', '£15k – £30k', '£30k – £60k', '£60k+', 'Not sure yet'];

const EASE = [0.16, 1, 0.3, 1] as const;

type Fields = { name: string; email: string; company: string; phone: string; details: string };

function Field({
  id,
  label,
  type = 'text',
  required,
  value,
  onChange,
  autoComplete,
  textarea,
}: {
  id: keyof Fields;
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  textarea?: boolean;
}) {
  const shared =
    'peer block w-full border-0 border-b border-paper/15 bg-transparent px-0 pb-3 pt-7 text-[1.0625rem] text-paper outline-none transition-colors duration-300 placeholder:text-transparent focus:border-paper/30 focus-visible:outline-none';
  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          name={id}
          required={required}
          rows={4}
          placeholder=" "
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={cn(shared, 'resize-none')}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          autoComplete={autoComplete}
          placeholder=" "
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={shared}
        />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-7 origin-left text-[1.0625rem] text-smoke transition-all duration-300 ease-expo peer-focus:top-0 peer-focus:text-[0.75rem] peer-focus:text-accent-bright peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.75rem]"
      >
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent shadow-[0_0_8px_#0A84FF] transition-transform duration-500 ease-expo peer-focus:scale-x-100"
      />
    </div>
  );
}

function Chips({
  legend,
  options,
  selected,
  onToggle,
}: {
  legend: string;
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
}) {
  return (
    <fieldset>
      <legend className="eyebrow">{legend}</legend>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((option) => {
          const on = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(option)}
              className={cn(
                'relative overflow-hidden rounded-pill border px-4 py-2.5 text-[0.875rem] transition-colors duration-500 ease-expo',
                on ? 'border-accent bg-accent text-white' : 'border-paper/15 text-smoke hover:border-paper/40 hover:text-paper',
              )}
            >
              <span className="relative flex items-center gap-2">
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.svg
                      viewBox="0 0 16 16"
                      className="h-3 w-3"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 12, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      aria-hidden
                    >
                      <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </motion.svg>
                  )}
                </AnimatePresence>
                {option}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function ContactPage() {
  const ready = useStageReady();
  const [fields, setFields] = useState<Fields>({ name: '', email: '', company: '', phone: '', details: '' });
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const set = (key: keyof Fields) => (value: string) => setFields((previous) => ({ ...previous, [key]: value }));

  /**
   * There is no form backend yet, so the enquiry is composed as an email in
   * the visitor's own mail app — nothing is claimed to be "sent" that wasn't.
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const lines = [
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      fields.company && `Company: ${fields.company}`,
      fields.phone && `Phone: ${fields.phone}`,
      services.length > 0 && `Interested in: ${services.join(', ')}`,
      budget.length > 0 && `Budget: ${budget[0]}`,
      '',
      fields.details,
    ].filter((line) => line !== false && line !== '') as string[];
    const subject = `New project enquiry${fields.company ? ` — ${fields.company}` : ''}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      lines.join('\n'),
    )}`;
    setSent(true);
  };

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 1, delay, ease: EASE },
  });

  return (
    <>
      <section className="relative overflow-hidden bg-void pb-section pt-[calc(var(--nav-h)+3rem)]">
        <div className="absolute inset-0">
          <LightField intensity={0.55} focus={[0.18, 0.85]} quality={0.45} />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-void to-transparent" />

        <div className="shell relative grid grid-cols-12 gap-y-16 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5">
            <motion.p className="eyebrow flex items-center gap-3" {...rise(0.05)}>
              <span className="text-paper">VRAZEAL</span>
              <span className="h-px w-8 bg-paper/25" />
              Contact
            </motion.p>
            <MaskText
              as="h1"
              active={ready}
              delay={0.1}
              className="mt-10 font-display text-[clamp(2.75rem,6vw,6.25rem)] font-medium leading-[0.92] tracking-[-0.052em]"
              lines={[
                "Let's build",
                'something that',
                <>
                  <span className="accent-serif">matters</span>
                  <span className="text-accent">.</span>
                </>,
              ]}
            />
            <motion.p className="mt-8 max-w-[40ch] text-lead text-smoke" {...rise(0.5)}>
              Tell us what you are trying to build and what is in the way. You will hear back from an engineer
              within one business day.
            </motion.p>

            <motion.div className="mt-12 space-y-8 border-t border-hair pt-8" {...rise(0.65)}>
              <div>
                <p className="eyebrow">Email</p>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline mt-3 inline-block font-display text-[clamp(1.375rem,2.2vw,1.875rem)] font-medium tracking-[-0.03em]"
                >
                  {site.email}
                </a>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="eyebrow">Response</p>
                  <p className="mt-3 text-[0.9375rem] text-paper">Within one business day</p>
                </div>
                <div>
                  <p className="eyebrow">Follow</p>
                  <div className="mt-1 flex flex-wrap gap-x-4">
                    {site.social.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block py-2 text-[0.9375rem] text-smoke transition-colors hover:text-paper"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div className="col-span-12 lg:col-span-7" {...rise(0.4)}>
            <div className="glass relative overflow-hidden rounded-[28px] border border-paper/10 p-7 sm:p-10">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="flex min-h-[32rem] flex-col justify-center"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_0_40px_rgba(10,132,255,0.6)]">
                      <svg viewBox="0 0 16 16" className="h-6 w-6" aria-hidden>
                        <motion.path
                          d="M3 8.5 6.5 12 13 4.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        />
                      </svg>
                    </span>
                    <h2 className="mt-8 font-display text-[clamp(2rem,3.4vw,3rem)] font-medium leading-[1.02] tracking-[-0.045em]">
                      Your email is ready to send.
                    </h2>
                    <p className="mt-4 max-w-[44ch] text-[1rem] leading-[1.6] text-smoke">
                      We opened your mail app with the enquiry filled in — just press send. If nothing opened, write to{' '}
                      <a href={`mailto:${site.email}`} className="link-underline text-paper">
                        {site.email}
                      </a>{' '}
                      directly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="link-underline mt-8 self-start text-[0.9375rem] text-accent-bright"
                    >
                      ← Back to the form
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-10"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-display text-[1.5rem] font-medium tracking-[-0.035em]">Start a project</p>
                      <span className="eyebrow">Takes ~2 minutes</span>
                    </div>
                    <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                      <Field id="name" label="Your name" required autoComplete="name" value={fields.name} onChange={set('name')} />
                      <Field id="email" label="Email" type="email" required autoComplete="email" value={fields.email} onChange={set('email')} />
                      <Field id="company" label="Company" autoComplete="organization" value={fields.company} onChange={set('company')} />
                      <Field id="phone" label="Phone" type="tel" autoComplete="tel" value={fields.phone} onChange={set('phone')} />
                    </div>
                    <Chips
                      legend="What do you need?"
                      options={SERVICE_OPTIONS}
                      selected={services}
                      onToggle={(option) =>
                        setServices((previous) =>
                          previous.includes(option) ? previous.filter((item) => item !== option) : [...previous, option],
                        )
                      }
                    />
                    <Chips
                      legend="Budget"
                      options={BUDGET_OPTIONS}
                      selected={budget}
                      onToggle={(option) => setBudget((previous) => (previous[0] === option ? [] : [option]))}
                    />
                    <Field
                      id="details"
                      label="Tell us about the project"
                      required
                      textarea
                      value={fields.details}
                      onChange={set('details')}
                    />
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <p className="max-w-[34ch] text-[0.8125rem] text-ash">
                        Opens your email app with everything filled in. We never share your details.
                      </p>
                      <Button type="submit">Send enquiry</Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
      <FaqSection />
    </>
  );
}
