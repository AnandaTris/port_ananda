import type { Profile } from './types'

export const profile: Profile = {
  name: 'Ananda Triharis Maroso',
  // The page used to open on a pitch — a thesis line, a supporting line, and a
  // collaboration line, all before the reader saw a single project. Then it
  // opened on a job title. What is left is the one fact a stranger needs and
  // cannot infer: where I am. The projects say the rest.
  location: 'Singapore',
  // Not shown on the page. This is the meta description and the Open Graph
  // subtitle, where a plain sentence is the only thing that renders usefully.
  summary:
    'Ananda Triharis Maroso in Singapore. Shipped iOS apps, working web products, and research tooling.',
  links: [
    { label: 'Email', href: 'mailto:adotriharis@gmail.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ananda-trimar/' },
    { label: 'GitHub', href: 'https://github.com/AnandaTris' },
  ],
  workExperience: [
    {
      organization: 'Marsh',
      title: 'AI Research & Development Intern',
      period: 'Aug 2026 – Dec 2026',
      status: 'incoming',
      highlights: [
        'Incoming to the Asia Digital team to identify and scope AI use cases across generative AI, NLP, and agentic systems.',
        'Will develop proof-of-concept prototypes with business, product, engineering, and technology stakeholders.',
      ],
    },
    {
      organization: '8x Social',
      title: 'Technical Growth Product Manager Intern (internal title: Play Manager)',
      period: 'Jun 2026 – Present',
      status: 'current',
      highlights: [
        'Owns consumer product plays on a 10-week idea-to-kill-or-scale clock, from research and numeric gates through monetization, distribution, and a recommendation to founders.',
        'Ships TypeScript product work across Expo, React Native, Next.js, Supabase, payments, localization, and analytics alongside product and growth ownership.',
      ],
    },
    {
      organization: 'Rohde & Schwarz',
      title: 'Product Management Intern (R&D)',
      period: 'Sep 2025 – Jan 2026',
      status: 'completed',
      highlights: [
        'Bridged R&D engineers and product teams for spectrum-analyzer development.',
        'Produced six structured technical lab sheets for FPC1500 and FSH instruments.',
      ],
    },
  ],
  research: [
    {
      organization: 'Social AI Studio, SUTD',
      title: 'Student Research Assistant',
      period: 'May 2025 – Jan 2026',
      highlights: [
        'Contributed to a culturally aware AI translation project.',
        'Labelled and curated multilingual datasets for language understanding and data quality.',
      ],
    },
    {
      organization: 'Climate Resilient Citizenry, SUTD',
      title: 'Student Researcher',
      period: 'May 2025 – Jan 2026',
      highlights: [
        'Worked with the Lee Kuan Yew Centre for Innovative Cities on a study targeting 1,000 households across Singapore.',
        'Applied field data-collection protocols and community-engagement methods to climate resilience research.',
      ],
    },
  ],
  awards: [
    {
      name: 'Dell InnovateDash Hackathon 2026 — Top 5 Finalist',
      detail: 'Selected as a Top 5 finalist for CareKaki under the SUTD × Dell Technologies problem statement with Care Corner.',
      date: 'Jun 2026',
    },
    {
      name: 'Math Me Home FPGA Game — 2nd Place, Outstanding Project',
      detail: 'Placed second among approximately 30 teams.',
      date: 'Apr 2026',
    },
    {
      name: 'Meowtivation Task Manager — 3rd Place, Outstanding Project',
      detail:
        'Placed third for an Android task manager built with Firebase authentication and real-time Firestore sync.',
      date: 'Apr 2026',
    },
    {
      name: 'SUTD What The Hack Hackathon — 3rd Place',
      detail: 'Placed third among 50 teams, approximately 250 participants.',
      date: 'Sep 2025',
    },
    {
      name: 'Baby Shark Fund Award — Pufferty Fish Robot',
      detail:
        'First of two Baby Shark Fund grants: S$6,000 for an autonomous underwater rescue robot.',
      date: 'May 2025',
    },
    {
      name: 'UROP Grant — Fames.com',
      detail: 'Received a S$1,500 undergraduate research grant.',
    },
    {
      name: 'Baby Shark Fund Award — Fames.com',
      detail:
        'Second of two Baby Shark Fund grants: S$2,000; the award date is not yet recorded.',
    },
    {
      name: 'Garena Competition — Shortlisted Team, FALSE POSITIVE',
      detail:
        'The team reached the shortlist and did not win; the competition edition and date are not yet recorded.',
    },
  ],
  leadership: [
    {
      organization: 'SENTRE — 5,000+ member Indonesian student community',
      title: 'Head of University',
      period: 'Nov 2025 – Present',
      highlights: [
        'Coordinates 10+ mentors, mentors 50+ students, and supports a community of close to 5,000 members.',
        'Plans roadshows and workshop material across 6+ schools in Surabaya and Bali for scholarship and study-abroad preparation.',
      ],
    },
  ],
}
