/** Copy for the AI Solutions page. */

export type AiSolution = {
  id: string;
  number: string;
  title: string;
  problem: string;
  solution: string;
  benefit: string;
};

export const aiSolutions: AiSolution[] = [
  {
    id: 'support',
    number: '01',
    title: 'AI Customer Support',
    problem: 'Your support team spends most of its time answering the same questions.',
    solution:
      'An AI agent trained on your products, policies and FAQs — it handles routine queries instantly and escalates complex ones to your team.',
    benefit: 'Faster responses. Lower support costs. Happier customers.',
  },
  {
    id: 'leads',
    number: '02',
    title: 'AI Lead Generation',
    problem: 'Leads come in, but qualification takes too long and too many fall through the cracks.',
    solution:
      'Automated lead capture, qualification and routing — the right leads reach the right person at the right time.',
    benefit: 'More qualified pipeline. Less manual follow-up. Higher close rates.',
  },
  {
    id: 'sales',
    number: '03',
    title: 'AI Sales Automation',
    problem: 'Your sales team spends its time on admin instead of selling.',
    solution:
      'Automated follow-up sequences, proposal generation and CRM updates — so the team focuses on conversations, not data entry.',
    benefit: 'More selling time. Consistent follow-up. Shorter sales cycles.',
  },
  {
    id: 'whatsapp',
    number: '04',
    title: 'AI WhatsApp Automation',
    problem: 'Customer enquiries arrive on WhatsApp at all hours and responses are inconsistent.',
    solution:
      'An AI-powered WhatsApp agent that answers enquiries, books appointments and qualifies leads — 24/7.',
    benefit: 'Always-on engagement. Consistent answers. More bookings.',
  },
  {
    id: 'crm',
    number: '05',
    title: 'AI CRM Automation',
    problem: 'Your CRM is full of stale data because updating it by hand never happens consistently.',
    solution:
      'Automated enrichment, activity logging and pipeline updates — the CRM stays accurate without anyone maintaining it.',
    benefit: 'Clean data. Better forecasting. Less admin.',
  },
  {
    id: 'documents',
    number: '06',
    title: 'AI Document Processing',
    problem: 'Your team spends hours pulling information out of invoices, contracts and forms.',
    solution:
      'Document pipelines that extract, classify and route information automatically — with human review where it matters.',
    benefit: 'Hours saved every week. Fewer errors. Faster processing.',
  },
  {
    id: 'email',
    number: '07',
    title: 'AI Email Automation',
    problem: 'Campaigns are generic and follow-up sequences are inconsistent.',
    solution:
      'Personalised email workflows triggered by behaviour — the right message reaches the right person at the right moment.',
    benefit: 'Higher open rates. More conversions. Less manual work.',
  },
  {
    id: 'workflow',
    number: '08',
    title: 'AI Workflow Automation',
    problem: 'Your operation is held together by manual hand-offs, spreadsheets and chat messages.',
    solution:
      'End-to-end automation that connects your tools, removes manual steps and keeps work moving without anyone pushing it.',
    benefit: 'Faster operations. Fewer errors. Teams focused on what matters.',
  },
];

export const automatable = [
  { area: 'Customer enquiries', example: 'Answered instantly, 24/7' },
  { area: 'Lead qualification', example: 'Scored and routed automatically' },
  { area: 'Appointment booking', example: 'Booked via WhatsApp or web' },
  { area: 'Invoice processing', example: 'Extracted and filed automatically' },
  { area: 'Follow-up sequences', example: 'Triggered by behaviour, not the calendar' },
  { area: 'CRM data entry', example: 'Updated from calls and emails' },
  { area: 'Report generation', example: 'Compiled and sent on schedule' },
  { area: 'Onboarding workflows', example: 'Triggered on sign-up, no manual steps' },
];

export const aiDelivery = [
  { number: '01', title: 'Audit', body: 'Map the workflow, find the repetitive steps, and size the return before anything is built.' },
  { number: '02', title: 'Prototype', body: 'A working version on your real data within weeks, so you can see it handle real cases.' },
  { number: '03', title: 'Evaluate', body: 'Measure accuracy against a test set and add guardrails and human review where they matter.' },
  { number: '04', title: 'Deploy', body: 'Wire it into the tools you already use, monitor it in production, and keep improving it.' },
];
