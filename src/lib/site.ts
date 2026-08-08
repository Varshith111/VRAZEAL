export const site = {
  name: 'VRAZEAL',
  tagline: 'Creative & Technology Agency',
  domain: 'vrazeal.com',
  url: 'https://vrazeal.com',
  email: 'hello@vrazeal.com',
  description:
    'VRAZEAL is a creative and technology agency building custom software, AI-powered systems, and premium digital experiences for ambitious businesses.',
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/vrazeal' },
    { label: 'Instagram', href: 'https://www.instagram.com/vrazeal' },
    { label: 'X', href: 'https://x.com/vrazeal' },
    { label: 'Dribbble', href: 'https://dribbble.com/vrazeal' },
  ],
} as const;

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'AI Solutions', href: '/ai-solutions' },
] as const;

/** Used only on the home page for in-page anchor scrolling */
export const homeNav = [
  { label: 'What we build', href: '#build' },
  { label: 'Approach', href: '#approach' },
  { label: 'Process', href: '#process' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
] as const;

export const services = [
  { label: 'Website Development', href: '/services#web' },
  { label: 'Custom CRM & Software', href: '/services#crm' },
  { label: 'AI Solutions & Automations', href: '/ai-solutions' },
  { label: 'Branding & Graphic Design', href: '/services#branding' },
  { label: 'Digital Marketing', href: '/services#marketing' },
] as const;
