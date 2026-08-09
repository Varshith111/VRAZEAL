/**
 * Copy for the About page. Sections read from here so the components stay
 * presentational, matching the convention in `content.ts`.
 *
 * Nothing in this file asserts a number, a client, or a result. Every claim is
 * about how the team works, which is the only thing that can be stated without
 * evidence to back it.
 */

export type AboutService = {
  number: string;
  /** Maps to the shared capability icon set. */
  icon: 'websites' | 'crm' | 'ai' | 'brand' | 'creative';
  title: string;
  description: string;
  href: string;
};

export const aboutServices: AboutService[] = [
  {
    number: '01',
    icon: 'websites',
    title: 'Website Development',
    description:
      'High-performance websites and digital experiences built around your business.',
    href: '/services#web',
  },
  {
    number: '02',
    icon: 'crm',
    title: 'Custom CRM & Software',
    description:
      'Business systems, dashboards, CRMs and internal tools designed around your workflow.',
    href: '/services#crm',
  },
  {
    number: '03',
    icon: 'ai',
    title: 'AI Solutions & Automations',
    description:
      'AI-powered workflows and automation that reduce repetitive work and improve efficiency.',
    href: '/ai-solutions',
  },
  {
    number: '04',
    icon: 'brand',
    title: 'Branding & Graphic Design',
    description: 'Visual identities and creative systems that make businesses recognizable.',
    href: '/services#branding',
  },
  {
    number: '05',
    icon: 'creative',
    title: 'Digital Marketing',
    description:
      'Digital growth systems that help businesses reach and convert the right audience.',
    href: '/services#marketing',
  },
];

export type AboutPrinciple = {
  number: string;
  title: string;
  body: string;
};

export const aboutPrinciples: AboutPrinciple[] = [
  {
    number: '01',
    title: 'Strategy before execution',
    body: 'We understand the business before designing or building.',
  },
  {
    number: '02',
    title: 'Technology with purpose',
    body: 'Every feature, system and interaction exists for a reason.',
  },
  {
    number: '03',
    title: 'Built to evolve',
    body: 'We build products that can grow with the business.',
  },
];

export type AboutStep = {
  number: string;
  title: string;
  body: string;
};

export const aboutProcess: AboutStep[] = [
  { number: '01', title: 'Discover', body: 'Understand the business, users and problem.' },
  { number: '02', title: 'Strategy', body: 'Define the right solution and roadmap.' },
  { number: '03', title: 'Design', body: 'Create the experience, structure and visual direction.' },
  { number: '04', title: 'Build', body: 'Develop the website, software or system.' },
  { number: '05', title: 'Launch', body: 'Test, optimize and launch.' },
  { number: '06', title: 'Scale', body: 'Improve and expand as the business grows.' },
];

export const aboutReasons = [
  {
    title: 'Business-first thinking',
    body: 'The commercial problem is defined before a single screen or schema is drawn.',
  },
  {
    title: 'Custom-built solutions',
    body: 'Written for your business. Nothing is retrofitted from a previous client.',
  },
  {
    title: 'Technology + creativity',
    body: 'The engineering and the design are decided together, by the same team.',
  },
  {
    title: 'Direct communication',
    body: 'You talk to the people building it. There is no account layer in between.',
  },
  {
    title: 'Long-term mindset',
    body: 'Built to hold up in the third year, not just to look right at launch.',
  },
];

export const aboutCommitments = [
  { number: '01', text: 'Custom-built, never cookie-cutter.' },
  { number: '02', text: 'Clear communication throughout development.' },
  { number: '03', text: 'Systems designed to grow with the business.' },
];
