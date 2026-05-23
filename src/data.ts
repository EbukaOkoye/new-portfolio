import { PortfolioMeta, Project, ExperienceItem, SkillCategory } from './types';

export const portfolioMeta: PortfolioMeta = {
  fullName: 'Chukwuebuka Ifenna Okoye',
  title: 'Frontend Developer',
  location: 'London, UK / Remote',
  bio: 'Engineering highly tactile tactile interactive web experiences, state-of-the-art LLM-backed dashboards, and performant backend architectures.',
  subBio: 'I specialize in refining code visualizers, responsive browser environments, and micro-interaction design. Drawing from rich systems and web architectures, I bridge premium aesthetic details with high-efficiency computation.',
  stats: [
    { label: 'Years Experience', value: '3', suffix: '+' },
    { label: 'Github Repos', value: '80', suffix: '+' }
  ]
};

export const projectsData: Project[] = [
  {
    id: 'innovate-to-impact',
    title: 'Innovate to Impact',
    category: 'Tech Community / Frontend',
    description: 'A tech community aimed at providing the younger generation with knowledge and help in getting into tech.',
    longDescription: 'Innovate to Impact is a vibrant tech community focused on giving younger generations clear pathways, educational tools, and mentorship to start their careers in technology. Through structured learning roadmaps, peer-to-peer code reviews, and community support lines, it fosters an inclusive environment for aspiring developers.',
    tech: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'Motion'],
    liveUrl: 'https://www.innovatetoimpact.org/',
    githubUrl: 'https://github.com/EbukaOkoye/innovate-to-impact',
    featured: true,
    stats: [
      { label: 'Members', value: '1.2k+' },
      { label: 'Events Hosted', value: '15+' },
      { label: 'Success Stories', value: '120+' }
    ]
  },
  {
    id: 'credence-website',
    title: 'Credence Website',
    category: 'Agro Business / Trade',
    description: 'An Agro business that connects buyers and farmers and facilitates trade between them.',
    longDescription: 'Credence is a modern agricultural business platform that bridges the gap between buyers and farmers, establishing a secure, transparent, and direct channel of trade. The website assists farmers in maximizing their earnings while offering buyers verified premium goods directly from local fields, optimizing agricultural supply chains seamlessly.',
    tech: ['React', 'TypeScript', 'TailwindCSS', 'Vite', 'Motion'],
    liveUrl: 'https://www.credence54.com/',
    githubUrl: 'https://github.com/EbukaOkoye/credence-agro-trade',
    featured: true,
    stats: [
      { label: 'Registered Farmers', value: '450+' },
      { label: 'Trade Volume', value: '$85k+' },
      { label: 'Active Buyers', value: '220+' }
    ]
  }
];

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'React Native Mobile Developer',
    company: 'Lavorh Ltd.',
    duration: '08/2024 - Present',
    description: [
      'Identified and resolved UI inconsistencies across the application, establishing a standardized component library that reduced future discrepancies by 80%.',
      'Identified and fixed bugs across the application resulting to 65% reduction in functional and regression bugs.',
      'Mentored junior developers, leading to a 40% decrease in project errors and bolstered the team\'s development skills consistently.',
      'Developed a state-of-the-art user authentication module, increasing user satisfaction scores by 18% within the first quarter of its deployment.',
      'Collaborated with cross-functional teams to streamline deployment processes, reducing deployment time by 30% and enhancing release reliability.'
    ],
    tech: ['React Native', 'TypeScript', 'JavaScript', 'Redux', 'Mobile Dev'],
    logoType: 'globe'
  },
  {
    id: 'exp-2',
    role: 'Frontend Web Developer',
    company: 'Coave',
    duration: '12/2022 - 06/2024',
    description: [
      'Leveraged Reactjs to build intuitive user interfaces that increased application performance by 25%, thereby contributing to a more dynamic and satisfying user experience.',
      'Built modular, functional components with React Hooks reducing redundancy, enforcing code consistency, and encouraging best practices across the team.',
      'Championed an API-first approach across the development team, enhancing application interoperability and reducing duplication by 30%.',
      'Migration of the application code base from JavaScript to Typescript, enhancing type safety and reducing runtime errors by 40%.',
      'Collaborated with UI/UX team to iterate on design prototypes and bring them to life, ensuring technical feasibility and enhancing user satisfaction by 40%.'
    ],
    tech: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'REST APIs'],
    logoType: 'code'
  }
];

export const skillsData: SkillCategory[] = [
  {
    title: 'Core Technologies & Frontend',
    icon: 'Layers',
    skills: [
      { name: 'TypeScript', level: 98, years: 3, description: 'Type-level magic, reusable hooks architectures, and high-safety system patterns.' },
      { name: 'React', level: 96, years: 3, description: 'Declarative layout trees, state machines, dynamic ref handlers, and high-frequency UI tuning.' },
      { name: 'Tailwind CSS', level: 95, years: 3, description: 'High-density design tokens, fluid utility grids, elegant dark themes, and pure custom css extensions.' },
      { name: 'Next.js', level: 92, years: 2, description: 'Server-side rendering, App Router architectures, static site generation, and optimized image processing.' }
    ]
  }
];
