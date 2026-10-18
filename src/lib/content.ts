import type { LucideIcon } from 'lucide-react';
import {
  Blocks,
  Boxes,
  Code2,
  Database,
  FlaskConical,
  Globe,
  Layers,
  Network,
  Server,
  Workflow,
} from 'lucide-react';
import type { VpsWorkload } from '@wholnex/shared';
import type { SiteImageKey } from '@/lib/images';

// --- Use cases ------------------------------------------------------------------------------

export interface UseCase {
  id: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  details: string[];
  stack: string[];
  workload: VpsWorkload;
  image?: SiteImageKey;
}

export const USE_CASES: UseCase[] = [
  {
    id: 'websites',
    title: 'Website hosting',
    icon: Globe,
    summary: 'Run marketing sites, blogs, and CMS platforms on resources that are not shared with hundreds of other sites.',
    details: [
      'Install the exact web server and PHP or Node.js versions your site needs',
      'Host several sites on one server with virtual hosts',
      'Issue free TLS certificates with Let’s Encrypt',
    ],
    stack: ['Nginx', 'Apache', 'WordPress', 'PHP-FPM'],
    workload: 'websites',
    image: 'ethernetSwitchCabling',
  },
  {
    id: 'business-applications',
    title: 'Business applications',
    icon: Layers,
    summary: 'Host internal tools, line-of-business software, and customer portals on a server your team controls.',
    details: [
      'Keep data on infrastructure you administer',
      'Integrate with existing identity and email systems',
      'Size CPU and memory to the number of users',
    ],
    stack: ['ERP / CRM', 'Intranets', '.NET', 'Java'],
    workload: 'web-applications',
    image: 'bladeServerChassis',
  },
  {
    id: 'software-development',
    title: 'Software development',
    icon: Code2,
    summary: 'Give developers a persistent remote environment that matches production instead of a laptop approximation.',
    details: [
      'Remote development over SSH from your editor',
      'Consistent toolchains shared across a team',
      'Long-running processes that outlive a laptop session',
    ],
    stack: ['VS Code Remote', 'Git', 'tmux', 'Language runtimes'],
    workload: 'development-testing',
  },
  {
    id: 'testing',
    title: 'Testing & staging',
    icon: FlaskConical,
    summary: 'Stand up staging servers that mirror production so releases are verified before customers see them.',
    details: [
      'Rehearse upgrades and migrations safely',
      'Run end-to-end and load tests in isolation',
      'Tear down and rebuild environments as needed',
    ],
    stack: ['Staging sites', 'Playwright', 'k6', 'Database copies'],
    workload: 'development-testing',
  },
  {
    id: 'api-backends',
    title: 'Application backends',
    icon: Server,
    summary: 'Serve mobile and web app backends with predictable resources and full control of the runtime.',
    details: [
      'Run Node.js, Python, Go, or Java services behind a reverse proxy',
      'Pin runtime versions and system libraries',
      'Scale vertically as request volume grows',
    ],
    stack: ['Node.js', 'Django', 'Go', 'Spring Boot'],
    workload: 'api-services',
    image: 'fiberPatchPanel',
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: Database,
    summary: 'Run relational and NoSQL databases with dedicated memory allocations and fast local storage.',
    details: [
      'Tune memory settings for your dataset',
      'Keep databases on a private network next to app servers',
      'Schedule dumps and off-server backups',
    ],
    stack: ['PostgreSQL', 'MySQL / MariaDB', 'MongoDB', 'Redis'],
    workload: 'databases',
  },
  {
    id: 'self-hosted-tools',
    title: 'Self-hosted tools',
    icon: Boxes,
    summary: 'Host the open-source tools your team relies on instead of paying per-seat SaaS fees.',
    details: [
      'Git hosting, wikis, analytics, and file sync',
      'Keep sensitive data under your own administration',
      'Customize configuration without vendor limits',
    ],
    stack: ['Gitea', 'Nextcloud', 'Plausible', 'Uptime Kuma'],
    workload: 'self-hosted-tools',
  },
  {
    id: 'pipelines',
    title: 'Development pipelines',
    icon: Workflow,
    summary: 'Run self-hosted CI runners and build agents with the CPU and disk your builds actually need.',
    details: [
      'Self-hosted GitHub Actions or GitLab runners',
      'Cache dependencies on fast local storage',
      'Avoid per-minute hosted CI limits',
    ],
    stack: ['GitHub Actions runner', 'GitLab Runner', 'Jenkins', 'Drone'],
    workload: 'development-testing',
  },
  {
    id: 'api-services',
    title: 'API services',
    icon: Network,
    summary: 'Expose REST, GraphQL, or webhook endpoints from a stable public IP address you control.',
    details: [
      'Terminate TLS and rate-limit at your own reverse proxy',
      'Allow-list partner IP addresses',
      'Log and monitor every request',
    ],
    stack: ['REST', 'GraphQL', 'Webhooks', 'Caddy'],
    workload: 'api-services',
  },
  {
    id: 'containers',
    title: 'Containerized applications',
    icon: Blocks,
    summary: 'Run Docker Compose stacks or lightweight Kubernetes distributions on a single server or a small cluster.',
    details: [
      'Deploy multi-service apps with Docker Compose',
      'Run k3s or MicroK8s for small clusters',
      'Keep images close to where they run',
    ],
    stack: ['Docker', 'Podman', 'k3s', 'Portainer'],
    workload: 'containers',
    image: 'serverBaysTeal',
  },
];

// --- Getting-started workflow ------------------------------------------------------------------

export const GETTING_STARTED_STEPS = [
  {
    title: 'Choose a starting point',
    description: 'Pick the plan tier closest to your workload, or describe a custom configuration.',
  },
  {
    title: 'Send your requirements',
    description: 'Tell us your preferred OS, resources, region, and timeline in the configuration form.',
  },
  {
    title: 'Review a written quote',
    description: 'WHOLNEX replies with the specifications, pricing, and availability it can confirm for you.',
  },
  {
    title: 'Get your server',
    description: 'Once you approve the quote, we coordinate provisioning and send your access details.',
  },
];

// --- FAQ ------------------------------------------------------------------------------------

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqGroup {
  id: string;
  title: string;
  items: FaqItem[];
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: 'basics',
    title: 'VPS basics',
    items: [
      {
        question: 'What is a VPS?',
        answer:
          'A virtual private server (VPS) is a virtual machine running on a physical server alongside other virtual machines. Each VPS has its own operating system, its own allocation of CPU, memory, and storage, and its own administrator access, so it behaves like a dedicated server at a fraction of the cost.',
      },
      {
        question: 'What can I host on a VPS?',
        answer:
          'Almost anything that runs on a server: websites and CMS platforms, web applications and APIs, databases, development and staging environments, self-hosted tools such as Git or file sync, CI runners, game or voice servers, and containerized applications.',
      },
      {
        question: 'How does VPS hosting compare to shared hosting?',
        answer:
          'Shared hosting places many customers inside one operating system with a fixed software stack and pooled resources, so one busy site can slow the others. A VPS gives you a guaranteed resource allocation, an isolated operating system, and full control over the software you install. The trade-off is that you — or a provider service you arrange — are responsible for administering it.',
      },
      {
        question: 'What is root access?',
        answer:
          'Root (Linux) or Administrator (Windows) access is full control of the operating system. You can install any software, change system configuration, manage users, and open or close network ports. It is powerful, which is why securing that access with SSH keys and strong credentials matters.',
      },
      {
        question: 'Which operating systems can be installed?',
        answer:
          'VPS servers commonly run Linux distributions such as Ubuntu Server, Debian, Rocky Linux, and AlmaLinux, and some run Windows Server. The images available for your WHOLNEX server are confirmed in your quote. Windows Server requires Microsoft licensing, which is discussed separately and is not included by default.',
      },
    ],
  },
  {
    id: 'choosing',
    title: 'Choosing and growing a server',
    items: [
      {
        question: 'How do I choose CPU and RAM?',
        answer:
          'Start from the workload. A single small website often runs comfortably with 1–2 vCPU and 1–2 GB of memory. Applications with databases, background workers, or many concurrent users typically need 2–4 vCPU and 4–8 GB or more. Memory is usually the first constraint — if your server swaps to disk, add RAM before CPU. Describe your workload in the configuration form and WHOLNEX will recommend a starting size.',
      },
      {
        question: 'What is the difference between shared and dedicated vCPU?',
        answer:
          'With shared vCPU, virtual CPU time is scheduled across several virtual machines on the same host — cost-effective for bursty workloads like websites. Dedicated vCPU reserves physical CPU threads for one server, giving consistent performance for sustained, CPU-heavy work. Which CPU models WHOLNEX offers is confirmed during quoting.',
      },
      {
        question: 'Is a VPS suitable for business applications?',
        answer:
          'Yes, provided it is sized and operated appropriately. Many businesses run line-of-business software, customer portals, and internal tools on VPS servers. For critical systems, plan for backups, monitoring, security patching, and — where needed — redundancy across more than one server.',
      },
      {
        question: 'Can I upgrade my resources later?',
        answer:
          'VPS resources can generally be increased as a workload grows, although disk downsizing is usually not possible. The specific upgrade options for your WHOLNEX server, and how upgrades are billed, are confirmed in your quote.',
      },
    ],
  },
  {
    id: 'security',
    title: 'Security & data protection',
    items: [
      {
        question: 'How does VPS security work?',
        answer:
          'Security on a VPS is shared. The hosting provider is responsible for the physical facility, the host hardware, and the virtualization layer that isolates customers. The customer is responsible for everything inside the server: operating system updates, user accounts, SSH keys, firewall rules, application security, and backups of their own data. Our Security page explains each layer in detail.',
      },
      {
        question: 'What are backups and snapshots?',
        answer:
          'A snapshot is a point-in-time image of a server’s disk, typically taken before an upgrade so you can roll back. A backup is a recurring copy of your data stored separately from the server so it survives hardware failure or accidental deletion. Snapshots are not a substitute for backups. Backup and snapshot options for your WHOLNEX server are confirmed in your quote; we always recommend keeping your own off-server copies of critical data as well.',
      },
    ],
  },
  {
    id: 'billing-support',
    title: 'Billing & support',
    items: [
      {
        question: 'How does billing work?',
        answer:
          'WHOLNEX currently provides VPS pricing by written quote. Your quote states the price, billing period, and payment terms for your configuration before anything is provisioned. Nothing on this website creates a purchase or a charge.',
      },
      {
        question: 'Why is pricing quoted instead of listed?',
        answer:
          'WHOLNEX publishes prices only once they are final. Until then, each quote reflects the exact configuration, region, and term you request, so you see confirmed numbers rather than estimates.',
      },
      {
        question: 'What support is included?',
        answer:
          'The scope of support — what WHOLNEX will help with, how to reach the team, and expected response times — is defined in your quote and service terms. For questions today, use the contact form and choose “Technical support”.',
      },
      {
        question: 'What is the difference between managed and unmanaged VPS?',
        answer:
          'With an unmanaged (self-managed) VPS, the provider keeps the infrastructure running and you administer the operating system and software. A managed VPS adds provider help with tasks such as patching, monitoring, and troubleshooting. Your WHOLNEX quote states whether any management services are included; if it does not list them, plan to administer the server yourself.',
      },
    ],
  },
];

export const ALL_FAQS: FaqItem[] = FAQ_GROUPS.flatMap((group) => group.items);

/** Selected questions shown on the homepage. */
export const HOME_FAQS: FaqItem[] = [
  'What is a VPS?',
  'How does VPS hosting compare to shared hosting?',
  'How do I choose CPU and RAM?',
  'How does billing work?',
  'How does VPS security work?',
].map((q) => ALL_FAQS.find((item) => item.question === q)!);

export const BILLING_FAQS: FaqItem[] = FAQ_GROUPS.find((group) => group.id === 'billing-support')!.items;
