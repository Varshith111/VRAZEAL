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

/**
 * NOTE: these are placeholder figures. Replace every value with a real,
 * defensible number before launch — a stat a prospect can disprove costs
 * more trust than showing no stat at all.
 */
export const stats: Stat[] = [
  { value: 25, suffix: '+', label: 'Projects delivered', note: 'Shipped, not prototyped' },
  { value: 15, suffix: '+', label: 'Industries served', note: 'Health, finance, retail, logistics' },
  { value: 3, suffix: '+', label: 'Countries', note: 'Distributed by design' },
  { value: 20, suffix: '+', label: 'Technologies', note: 'Chosen for the next decade' },
  { value: 6, suffix: '', label: 'Years building', note: 'Long enough to have opinions' },
];

export type Capability = {
  id: string;
  index: string;
  title: string;
  summary: string;
  detail: string;
  deliverables: string[];
  /** Typical engagement length, shown next to the live panel. */
  timeline: string;
};

/**
 * NOTE: `timeline` figures are indicative. The website and CRM ranges match
 * what the FAQ commits to — confirm the other four against real engagements
 * before launch so the two sections cannot contradict each other.
 */
export const capabilities: Capability[] = [
  {
    id: 'websites',
    index: '01',
    title: 'Websites',
    summary: 'Marketing sites engineered like products.',
    detail:
      'Fast, accessible, and built to convert. Every site ships with a real design system, a CMS your team can actually run, and Core Web Vitals in the green on launch day.',
    deliverables: ['Next.js', 'Headless CMS', 'Motion design', 'SEO foundations'],
    timeline: '4–6 weeks',
  },
  {
    id: 'crm',
    index: '02',
    title: 'Custom CRM',
    summary: 'The system your business actually runs on.',
    detail:
      'When off-the-shelf tools start dictating your process, we replace them. Pipelines, roles, permissions, and reporting modelled on how your team already works.',
    deliverables: ['Pipeline modelling', 'Role-based access', 'Reporting', 'Data migration'],
    timeline: '10–16 weeks',
  },
  {
    id: 'software',
    index: '03',
    title: 'Business Software',
    summary: 'Internal tools, portals, and platforms.',
    detail:
      'Operations software that removes the spreadsheet layer. Built on typed, tested foundations so it survives the third year, not just the first demo.',
    deliverables: ['Web applications', 'Client portals', 'Workflow automation', 'Integrations'],
    timeline: '8–14 weeks',
  },
  {
    id: 'ai',
    index: '04',
    title: 'AI Solutions',
    summary: 'Automation with a measurable return.',
    detail:
      'Retrieval systems, document intelligence, and agentic workflows wired into the tools you already use — with evaluation and guardrails, not vibes.',
    deliverables: ['RAG pipelines', 'Agent workflows', 'Model evaluation', 'Human-in-the-loop'],
    timeline: '6–10 weeks',
  },
  {
    id: 'brand',
    index: '05',
    title: 'Brand Identity',
    summary: 'Positioning, identity, and design systems.',
    detail:
      'A brand is an operating system, not a logo file. We ship the naming, the type scale, the motion language, and the rules that keep it coherent at scale.',
    deliverables: ['Identity systems', 'Art direction', 'Design tokens', 'Brand guidelines'],
    timeline: '4–8 weeks',
  },
  {
    id: 'creative',
    index: '06',
    title: 'Creative Content',
    summary: 'Film, motion, and graphics that carry weight.',
    detail:
      'Product films, launch campaigns, and social systems produced in-house — so the story on screen matches the quality of the product behind it.',
    deliverables: ['Video editing', 'Motion graphics', 'Campaign design', 'Content systems'],
    timeline: '2–6 weeks',
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

export type ProjectScreen = {
  src: string;
  alt: string;
  label: string;
  /** One line on what the screen does, used by the Projects page walkthrough. */
  caption?: string;
};

export type Project = {
  id: string;
  client: string;
  sector: string;
  year: string;
  title: string;
  /** The three beats every case study is read in: what was broken, what we
   *  built, and what changed as a result. Impact is `outcome`. */
  problem: string;
  solution: string;
  outcome: { value: string; label: string }[];
  stack: string[];
  visual: 'dashboard' | 'intelligence' | 'commerce' | 'identity';
  /** Live URL, shown in the browser frame and linked from the case study. */
  url?: string;
  /** Real screenshots. When present they replace the drawn `visual`. */
  screens?: ProjectScreen[];
  /** Screens from the internal admin portal, shown as a second walkthrough. */
  adminScreens?: ProjectScreen[];
  /** Short feature list used on the Projects and About pages. */
  highlights?: string[];
  services?: string[];
  status?: string;
};

export const projects: Project[] = [
  {
    id: 'flymeds',
    client: 'FlyMeds',
    sector: 'Online pharmacy & healthcare e-commerce',
    year: '2026',
    title: 'A full-stack online pharmacy for affordable healthcare across India.',
    problem:
      'Priyanka Generic Medical Store needed to take its pharmacy online across India — making medicine discovery, prescription-based ordering and access to affordable generic alternatives convenient, transparent and secure.',
    solution:
      'FlyMeds: a responsive Next.js storefront on an Express.js backend, covering the medicine catalogue, product discovery, customer accounts, cart and checkout, prescription handling and admin order management — built on PostgreSQL and Prisma, with Redis and BullMQ for reliable order processing and Cloudflare R2 for storage, ready to scale.',
    outcome: [
      { value: '5,170', label: 'Medicines in the catalogue' },
      { value: '60%', label: 'Max savings with generics' },
    ],
    stack: ['Next.js', 'React', 'Express.js', 'PostgreSQL', 'Prisma', 'Redis', 'BullMQ', 'Cloudflare R2'],
    visual: 'commerce',
    url: 'https://www.flymeds.in',
    services: ['Website Development', 'Custom Software', 'Admin Portal'],
    status: 'Live',
    highlights: [
      'Branded vs generic price comparison',
      'Prescription upload with pharmacist verification',
      'Quick Buy — pharmacist builds the cart from the Rx',
      'Order tracking, wishlist and saved addresses',
      'Category browsing across 5,000+ medicines',
      'Razorpay, UPI and cash-on-delivery checkout',
      'Admin portal: orders, catalogue, inventory, reports and audit log',
    ],
    screens: [
      { src: '/work/flymeds/home.webp', caption: 'Search any medicine and see the generic alternative and its savings before you buy.', label: 'Home', alt: 'FlyMeds home page with medicine search and generic savings' },
      { src: '/work/flymeds/medicines.png', caption: '5,170 medicines, filterable by health condition, with discount and Rx badges on every card.', label: 'Catalogue', alt: 'FlyMeds medicine catalogue with category filters and discounts' },
      { src: '/work/flymeds/prescription.png', caption: 'Upload a prescription, verify age, and let a licensed pharmacist approve it — or build the cart for you.', label: 'Prescriptions', alt: 'FlyMeds prescription upload with pharmacist verification' },
      { src: '/work/flymeds/orders.png', caption: 'Every order with its live status, from prescription pending to packed and delivered.', label: 'Orders', alt: 'FlyMeds order history with order statuses' },
      { src: '/work/flymeds/cart.png', caption: 'Considered empty states that guide people back to browsing instead of a dead end.', label: 'Cart', alt: 'FlyMeds empty cart state' },
      { src: '/work/flymeds/footer.png', caption: 'Licence number, pharmacy address and payment options up front, so customers can trust the store.', label: 'Footer', alt: 'FlyMeds footer with pharmacy licence and contact details' },
    ],
    adminScreens: [
      { src: '/work/flymeds/admin/orders.png', label: 'Orders', caption: 'One queue for every order, with blockers flagged up front — Rx not approved, unpaid, or missing an address — and scan-to-pack for the warehouse.', alt: 'FlyMeds admin orders queue with status filters' },
      { src: '/work/flymeds/admin/products.png', label: 'Products', caption: 'Manage 5,229 products with Excel round-trips, bulk import, stock and generic-alternative mapping in one place.', alt: 'FlyMeds admin product catalogue with bulk tools' },
      { src: '/work/flymeds/admin/inventory.png', label: 'Inventory', caption: 'Stock per variant with inline add and remove, and low-stock and out-of-stock filters.', alt: 'FlyMeds admin inventory with stock adjustments' },
      { src: '/work/flymeds/admin/sales.png', label: 'Sales reports', caption: 'Revenue, orders and order value against the previous period, with CSV and Excel export on every chart.', alt: 'FlyMeds admin sales report with daily sales chart' },
      { src: '/work/flymeds/admin/products-report.png', label: 'Product insights', caption: 'Top and slowest sellers, generic share, and the searches that returned nothing.', alt: 'FlyMeds admin product report with top medicines' },
      { src: '/work/flymeds/admin/marketing.png', label: 'Marketing', caption: 'Traffic, bounce rate and a purchase funnel from product view to order placed, from built-in analytics.', alt: 'FlyMeds admin marketing analytics with purchase funnel' },
      { src: '/work/flymeds/admin/banners.webp', label: 'Homepage banners', caption: 'The marketing team reorders and swaps storefront banners without a deploy.', alt: 'FlyMeds admin homepage banner manager' },
      { src: '/work/flymeds/admin/audit-log.png', label: 'Audit log', caption: 'Every sign-in and change by admins, pharmacists and inventory staff, filterable by user, role and module.', alt: 'FlyMeds admin audit log of staff activity' },
    ],
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
  { name: 'Tailwind', category: 'Styling' },
  { name: 'GSAP', category: 'Motion' },
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
