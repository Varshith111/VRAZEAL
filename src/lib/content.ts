/**
 * Single source of truth for every piece of copy on the marketing page.
 * Sections read from here so the layout components stay presentational.
 */

export type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  note: string;
};

export const stats: Stat[] = [
  { value: 25, suffix: '+', label: 'Projects delivered', note: 'Shipped, not prototyped' },
  { value: 15, suffix: '+', label: 'Industries served', note: 'Health, finance, retail, logistics' },
  { value: 3, suffix: '+', label: 'Countries', note: 'Distributed by design' },
  { value: 100, suffix: '%', label: 'Custom built', note: 'Zero templates, ever' },
];

export type Capability = {
  id: string;
  index: string;
  title: string;
  summary: string;
  detail: string;
  deliverables: string[];
};

export const capabilities: Capability[] = [
  {
    id: 'websites',
    index: '01',
    title: 'Websites',
    summary: 'Marketing sites engineered like products.',
    detail:
      'Fast, accessible, and built to convert. Every site ships with a real design system, a CMS your team can actually run, and Core Web Vitals in the green on launch day.',
    deliverables: ['Next.js', 'Headless CMS', 'Motion design', 'SEO foundations'],
  },
  {
    id: 'crm',
    index: '02',
    title: 'Custom CRM',
    summary: 'The system your business actually runs on.',
    detail:
      'When off-the-shelf tools start dictating your process, we replace them. Pipelines, roles, permissions, and reporting modelled on how your team already works.',
    deliverables: ['Pipeline modelling', 'Role-based access', 'Reporting', 'Data migration'],
  },
  {
    id: 'software',
    index: '03',
    title: 'Business Software',
    summary: 'Internal tools, portals, and platforms.',
    detail:
      'Operations software that removes the spreadsheet layer. Built on typed, tested foundations so it survives the third year, not just the first demo.',
    deliverables: ['Web applications', 'Client portals', 'Workflow automation', 'Integrations'],
  },
  {
    id: 'ai',
    index: '04',
    title: 'AI Solutions',
    summary: 'Automation with a measurable return.',
    detail:
      'Retrieval systems, document intelligence, and agentic workflows wired into the tools you already use — with evaluation and guardrails, not vibes.',
    deliverables: ['RAG pipelines', 'Agent workflows', 'Model evaluation', 'Human-in-the-loop'],
  },
  {
    id: 'brand',
    index: '05',
    title: 'Brand Identity',
    summary: 'Positioning, identity, and design systems.',
    detail:
      'A brand is an operating system, not a logo file. We ship the naming, the type scale, the motion language, and the rules that keep it coherent at scale.',
    deliverables: ['Identity systems', 'Art direction', 'Design tokens', 'Brand guidelines'],
  },
  {
    id: 'creative',
    index: '06',
    title: 'Creative Content',
    summary: 'Film, motion, and graphics that carry weight.',
    detail:
      'Product films, launch campaigns, and social systems produced in-house — so the story on screen matches the quality of the product behind it.',
    deliverables: ['Video editing', 'Motion graphics', 'Campaign design', 'Content systems'],
  },
];

export type Principle = {
  title: string;
  body: string;
  metric: string;
};

export const principles: Principle[] = [
  {
    title: 'Custom built',
    body: 'Every line is written for your business. Nothing is retrofitted from a previous client.',
    metric: 'Bespoke',
  },
  {
    title: 'No templates',
    body: 'No page builders, no theme marketplaces, no recycled layouts hiding under a new colour.',
    metric: 'Zero',
  },
  {
    title: 'Scalable architecture',
    body: 'Typed end to end, tested where it counts, and structured so the tenth engineer moves as fast as the first.',
    metric: 'Type-safe',
  },
  {
    title: 'Future ready',
    body: 'Modular systems and clean data contracts, so adding AI or a new market is an afternoon, not a rebuild.',
    metric: 'Modular',
  },
  {
    title: 'Performance focused',
    body: 'Budgets set before design starts. Sub-second loads, 90+ Lighthouse, no exceptions on launch.',
    metric: '90+',
  },
  {
    title: 'Premium design',
    body: 'Typography, spacing, and motion treated as engineering problems with correct answers.',
    metric: 'Considered',
  },
  {
    title: 'Fast delivery',
    body: 'Weekly builds you can click through. You see the product take shape instead of waiting for a reveal.',
    metric: 'Weekly',
  },
];

export type ProcessStep = {
  id: string;
  number: string;
  title: string;
  duration: string;
  body: string;
  outputs: string[];
};

export const processSteps: ProcessStep[] = [
  {
    id: 'discover',
    number: '01',
    title: 'Discover',
    duration: 'Week 1',
    body: 'We interview your team, audit what exists, and find the constraint that is actually holding the business back.',
    outputs: ['Stakeholder interviews', 'Technical audit', 'Success metrics'],
  },
  {
    id: 'strategy',
    number: '02',
    title: 'Strategy',
    duration: 'Week 1–2',
    body: 'Scope, architecture, and sequencing. We decide what ships first and what deliberately waits.',
    outputs: ['Architecture plan', 'Scope & roadmap', 'Fixed timeline'],
  },
  {
    id: 'design',
    number: '03',
    title: 'Design',
    duration: 'Week 2–4',
    body: 'Interface, motion, and brand designed together as one system — reviewed in the browser, not in a slide deck.',
    outputs: ['Design system', 'Prototypes', 'Motion direction'],
  },
  {
    id: 'development',
    number: '04',
    title: 'Development',
    duration: 'Week 4–10',
    body: 'Typed, reviewed, and deployed continuously. You get a live build every week for the entire engagement.',
    outputs: ['Weekly builds', 'Code review', 'Automated tests'],
  },
  {
    id: 'launch',
    number: '05',
    title: 'Launch',
    duration: 'Launch week',
    body: 'Performance budgets, accessibility passes, analytics, and a migration plan rehearsed before it runs for real.',
    outputs: ['QA & a11y pass', 'Performance budget', 'Zero-downtime cutover'],
  },
  {
    id: 'growth',
    number: '06',
    title: 'Growth',
    duration: 'Ongoing',
    body: 'We stay on. Instrument, measure, iterate — and expand the system as the business grows into it.',
    outputs: ['Analytics review', 'Iteration sprints', 'Ongoing support'],
  },
];

export type Project = {
  id: string;
  client: string;
  sector: string;
  year: string;
  title: string;
  summary: string;
  outcome: { value: string; label: string }[];
  stack: string[];
  visual: 'dashboard' | 'intelligence' | 'commerce' | 'identity';
};

/**
 * NOTE: replace with real engagements before launch — these are structured
 * examples that demonstrate the layout, not published case studies.
 */
export const projects: Project[] = [
  {
    id: 'meridian',
    client: 'Meridian Health',
    sector: 'Healthcare operations',
    year: '2025',
    title: 'A patient operations platform replacing eleven spreadsheets.',
    summary:
      'We rebuilt clinic scheduling, intake, and billing as a single system with role-based access for four staff types — cutting the time from referral to first appointment by more than half.',
    outcome: [
      { value: '−58%', label: 'Referral to appointment' },
      { value: '11→1', label: 'Systems consolidated' },
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'AWS'],
    visual: 'dashboard',
  },
  {
    id: 'kite',
    client: 'Kite',
    sector: 'Legal technology',
    year: '2025',
    title: 'Document intelligence that reads contracts in seconds.',
    summary:
      'A retrieval pipeline over 40,000 agreements with clause-level citations, confidence scoring, and a review queue that keeps a human on every judgement call.',
    outcome: [
      { value: '40k', label: 'Documents indexed' },
      { value: '9.4s', label: 'Median review time' },
    ],
    stack: ['Python', 'OpenAI', 'pgvector', 'FastAPI', 'Docker'],
    visual: 'intelligence',
  },
  {
    id: 'atlas',
    client: 'Atlas Supply',
    sector: 'B2B commerce',
    year: '2024',
    title: 'A trade storefront and CRM sharing one source of truth.',
    summary:
      'Customer-specific pricing, quote-to-order, and account management built on the same data model — so the sales team and the storefront never disagree again.',
    outcome: [
      { value: '3.2×', label: 'Online order volume' },
      { value: '0', label: 'Manual re-entry steps' },
    ],
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Vercel'],
    visual: 'commerce',
  },
  {
    id: 'nordwerk',
    client: 'Nordwerk',
    sector: 'Industrial manufacturing',
    year: '2024',
    title: 'A forty-year-old manufacturer, repositioned for its next decade.',
    summary:
      'Naming, identity, motion language, and a product site engineered to the same standard — one system covering everything from the spec sheet to the trade-show wall.',
    outcome: [
      { value: '+124%', label: 'Qualified enquiries' },
      { value: '98', label: 'Lighthouse performance' },
    ],
    stack: ['Brand system', 'Art direction', 'Next.js', 'Motion'],
    visual: 'identity',
  },
];

export type Technology = {
  name: string;
  category: string;
};

export const technologies: Technology[] = [
  { name: 'React', category: 'Interface' },
  { name: 'Next.js', category: 'Framework' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Node.js', category: 'Runtime' },
  { name: 'PostgreSQL', category: 'Data' },
  { name: 'Python', category: 'Language' },
  { name: 'OpenAI', category: 'Intelligence' },
  { name: 'Docker', category: 'Infrastructure' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Framer Motion', category: 'Motion' },
];

export type Testimonial = {
  id: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  messages: string[];
  reply?: string;
};

/** NOTE: replace with attributed client quotes before launch. */
export const testimonials: Testimonial[] = [
  {
    id: 't1',
    author: 'Priya Raghavan',
    role: 'Chief Operating Officer',
    company: 'Meridian Health',
    initials: 'PR',
    messages: [
      'We had eleven spreadsheets and a booking tool nobody trusted.',
      'Six weeks in, the entire clinic was running on one system. The staff training took an afternoon — that is the part I still cannot get over.',
    ],
    reply: 'That was the goal. Good software should not need a manual.',
  },
  {
    id: 't2',
    author: 'Daniel Okonkwo',
    role: 'Founder',
    company: 'Kite',
    initials: 'DO',
    messages: [
      'Three agencies told us the AI piece would take nine months.',
      'VRAZEAL shipped a working review pipeline in seven weeks, with evaluation baked in so we could actually prove it was accurate.',
    ],
  },
  {
    id: 't3',
    author: 'Sofia Lindqvist',
    role: 'Marketing Director',
    company: 'Nordwerk',
    initials: 'SL',
    messages: [
      'Our brand had drifted for a decade.',
      'They gave us a system, not a logo. Every deck, spec sheet, and trade-show wall now looks like it came from the same company.',
    ],
    reply: 'A brand is only as strong as the rules that keep it consistent.',
  },
  {
    id: 't4',
    author: 'Marcus Hale',
    role: 'VP Engineering',
    company: 'Atlas Supply',
    initials: 'MH',
    messages: [
      'I inherited the codebase after launch, and I want to be clear about how rare this is:',
      'It was documented, typed, and tested. My team was shipping features in week one without a single handover call.',
    ],
  },
];

export const faqs = [
  {
    q: 'How long does a project take?',
    a: 'A marketing site runs four to six weeks. A custom platform or CRM typically runs ten to sixteen. We fix the timeline in the strategy phase and publish a live build every week so nothing arrives as a surprise.',
  },
  {
    q: 'How do you price work?',
    a: 'Fixed price per phase. You approve scope and cost before development starts, and any change is quoted before it is built. No hourly billing, no open-ended retainers unless you want ongoing growth work.',
  },
  {
    q: 'Do we own the code?',
    a: 'Completely. You own the repository, the infrastructure accounts, and the design files from day one. There is no proprietary layer holding your business hostage.',
  },
  {
    q: 'Can you work with our existing team?',
    a: 'Yes. We embed alongside in-house engineers regularly — shared repository, shared standards, code review both directions. We also hand off cleanly when you want to take it in-house.',
  },
  {
    q: 'What happens after launch?',
    a: 'We stay for at least thirty days at no extra cost to monitor performance and fix anything the real world uncovers. After that, ongoing support and iteration sprints are optional.',
  },
];
