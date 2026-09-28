export interface Metric {
  label: string
  from: string
  to: string
}

export const profile = {
  name: "Vaibhav Agarwal",
  role: "Software Development Engineer II @ Solfin & builder of Hortiprise",
  headline:
    "Full-stack & AI systems engineer building agents, local-first RAG, and production SaaS",
  tagline:
    "I ship production SaaS, autonomous AI agents, and developer tooling that solve real problems — not demos.",
  summary:
    "Software Development Engineer with hands-on experience building production SaaS platforms, autonomous AI workflows, and developer tooling. Creator of Hortiprise (a complete agricultural nursery SaaS with AI OCR invoice digitization and WhatsApp workflows), DiffCommit AI (published VS Code extension across 9 AI providers), Syntra (local-first RAG with git-diff incremental indexing), and deterministic AI pipelines.",
  location: "Gurugram / Delhi NCR, India",
  email: "iamvaibhav.agarwal@gmail.com",
  github: "https://github.com/vaibhava17",
  linkedin: "https://www.linkedin.com/in/vaibhava17",
  stack: ["Python", "FastAPI", "TypeScript", "Next.js", "MongoDB", "Qdrant", "Docker", "MySQL"],
  openTo: "Senior AI / full-stack engineer roles, technical collaborations, and select consulting",
  avatar: "https://github.com/vaibhava17.png",
}

export interface Experience {
  company: string
  role: string
  period: string
  location: string
  website?: string
  current: boolean
  highlights: string[]
  metrics?: Metric[]
  tech: string[]
}

export const experience: Experience[] = [
  {
    company: "Solfin",
    role: "Software Development Engineer II",
    period: "Jan 2025 — Present",
    location: "Gurugram, India",
    website: "https://solfin.co.in",
    current: true,
    highlights: [
      "Architected and owned the frontend for Commercial & Industrial (CNI) and Supply Chain Finance (SCF) solar loan journeys, streamlining end-to-end workflows from application through credit underwriting to disbursement.",
      "Engineered an AI document intelligence service with a structured RAG pipeline for bill extraction.",
      "Optimized LLM inference and document pipelines while supporting 8,000–10,000 weekly calls at under 1% failure rate.",
      "Built a unified, multi-provider LLM service layer routing across Google Gemini, AWS Bedrock, and OpenAI for internal chatbots and business services.",
      "Developed an automated Tech-Ops pipeline turning WhatsApp and Gmail issues into tracked tickets with live status dispatch to Sales, and a resource-aware data warehouse job scheduler.",
    ],
    metrics: [
      { label: "bill extraction accuracy", from: "70%", to: "90%" },
      { label: "avg. LLM response latency", from: "20s", to: "7s" },
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "MongoDB",
      "Qdrant",
      "AWS Bedrock",
      "Google Gemini",
      "OpenAI",
      "Docker",
    ],
  },
  {
    company: "Hortiprise",
    role: "Lead Engineer (Side Project)",
    period: "2025 — Present",
    location: "Gurugram, India",
    website: "https://hortiprise.com",
    current: true,
    highlights: [
      "Founded and architected Hortiprise, a nursery-management SaaS digitizing end-to-end horticulture operations: plant inventory, sowing batches, germination tracking, quotations, billing, sales, and dispatch.",
      "Engineered a multimodal document pipeline (Google Cloud Vision + Tesseract + LLMs) to extract structured data from messy real-world Indian invoices.",
      "Built RAG-powered nursery intelligence tools for plant health analysis, document analysis, and demand forecasting.",
      "Integrated interactive WhatsApp-based ordering and automated dispatch confirmations, no dedicated app required.",
      "Designed and deployed a custom infrastructure monitoring system (NMS) tracking GCP VMs, Docker containers, MySQL, and Qdrant to catch resource exhaustion before it caused downtime.",
      "Automated roughly half of previously manual document workflows and added automated restocking alerts to prevent inventory mismatches.",
    ],
    tech: [
      "Next.js",
      "FastAPI",
      "Python 3.12",
      "TypeScript",
      "Prisma",
      "MySQL (Aiven)",
      "Qdrant",
      "Docker",
      "GCP",
      "Redis",
      "Google Cloud Vision",
      "Tesseract",
      "WhatsApp Business API",
    ],
  },
  {
    company: "TalentXO",
    role: "Software Development Engineer I",
    period: "Sept 2023 — Dec 2024",
    location: "Remote / Bangalore, India",
    website: "https://talentxo.com",
    current: false,
    highlights: [
      "Developed and maintained candidate search and indexing infrastructure on Apache Solr, indexing high-volume candidate profiles and recruitment metadata to power complex recruiter filtering.",
      "Architected a recruiter lead-generation and attribution engine with token-based link tracking, connecting inbound applications back to originating recruiters as actionable leads.",
      "Optimized background processing and recurring overnight data pipelines generating recruiter analytics, improving throughput and reliability.",
      "Delivered end-to-end full-stack features, database schema migrations, and rapid production bug triaging.",
    ],
    tech: [
      "JavaScript",
      "TypeScript",
      "React",
      "Apache Solr",
      "Node.js",
      "SQL",
      "RESTful APIs",
      "ETL / Background Jobs",
    ],
  },
  {
    company: "Guni SMS",
    role: "Frontend & Mobile Engineer",
    period: "Dec 2021 — Sept 2023",
    location: "Remote / Sydney, Australia",
    website: "https://gunisms.com.au",
    current: false,
    highlights: [
      "Built and maintained the React web platform for an Australian enterprise SMS gateway — campaign creation, messaging broadcasts, and contact lifecycle management.",
      "Spearheaded the core dashboard modernization from V1 to V2, redesigning UI architecture into reusable React components and pages.",
      "Engineered responsive, mobile-optimized interfaces across the messaging suite.",
      "Collaborated with backend engineers on automated two-way messaging workflows triggered by real-time replies and scheduled campaigns.",
      "Developed and maintained the company's public-facing React web apps and marketing properties.",
    ],
    tech: [
      "React",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "HTML5/CSS3",
      "RESTful APIs",
      "Responsive Design",
      "State Management",
    ],
  },
]

export interface Project {
  title: string
  tagline: string
  description: string
  value: string
  tech: string[]
  category: string
  status: string
  repoUrl?: string
  liveUrl?: string
}

export const flagshipProjects: Project[] = [
  {
    title: "Hortiprise",
    tagline: "Complete nursery-management SaaS with AI operations",
    description:
      "End-to-end nursery lifecycle tracking from seed germination to dispatch; automated invoice/bill digitization via Google Cloud Vision OCR with Tesseract fallback; conversational WhatsApp ordering and support; background billing/subscription workers; custom infrastructure monitoring.",
    value:
      "Real commercial production SaaS replacing pen-and-paper operations for plant nurseries — 1,500+ commits across full-stack repositories.",
    tech: [
      "Next.js 14",
      "TypeScript",
      "Prisma",
      "MySQL (Aiven)",
      "FastAPI",
      "Python 3.12",
      "LiteLLM",
      "Qdrant",
      "Redis",
      "Docker",
      "GCP",
    ],
    category: "Production SaaS / AgriTech",
    status: "Production, active",
    liveUrl: "https://hortiprise.com",
  },
  {
    title: "DiffCommit AI",
    tagline: "Published VS Code extension for semantic git commit generation",
    description:
      "Analyzes staged git diffs and generates structured commit messages inside VS Code's source control panel. Supports 9 AI providers — Claude, GPT, Gemini, DeepSeek, xAI Grok, Mistral, Groq, OpenRouter, and local offline Ollama. Zero runtime dependencies.",
    value:
      "Published on the Visual Studio Marketplace. Keeps API keys in the OS keychain via VS Code's native SecretStorage API, not plaintext config.",
    tech: ["JavaScript", "Node.js", "VS Code API", "VS Code SecretStorage"],
    category: "Developer tooling / open source",
    status: "Published on VS Marketplace",
    repoUrl: "https://github.com/vaibhava17/vscode-ext",
    liveUrl: "https://marketplace.visualstudio.com/items?itemName=vaibhava17.ai-commit-msg",
  },
  {
    title: "Syntra",
    tagline: "Local-first codebase RAG assistant with incremental indexing",
    description:
      "Indexes private codebases and docs for contextual AI Q&A. Smart incremental indexing inspects git diffs and content hashes to only re-embed modified chunks, cutting indexing overhead by 90%+.",
    value:
      "Privacy-first: code never leaves the local machine. Eliminates re-index latency on active feature branches.",
    tech: ["Python 3.13", "Docker", "Qdrant", "Git diffs", "Sentence embeddings"],
    category: "AI & developer tools",
    status: "Active, local system",
  },
  {
    title: "AI Investment Pipeline",
    tagline: "Deterministic 3-stage startup triage & memo generation engine",
    description:
      "Autonomous pipeline (source → analyze → recommend) for seed-stage VC thesis matching. Scores startups 0–100 against an AI infrastructure thesis and applies a deterministic rubric for Pass/Watch/Meeting verdicts, with on-disk JSON caching for zero-cost replay.",
    value:
      "Eliminates LLM hallucination and decision drift in financial analysis — auditable, backed by a full Pytest suite and a decision log.",
    tech: ["Python", "LiteLLM", "Pytest", "JSON checkpointing", "Deterministic rubric engine"],
    category: "AI engineering / fintech",
    status: "Tested, verified pipeline",
  },
]

export const otherProjects: Project[] = [
  {
    title: "Budsy Testing Agent",
    tagline: "Autonomous web & mobile UI testing agent driven by plain English",
    description:
      "Takes plain-English test instructions, captures screenshots, reads UI coordinates via multimodal vision, and drives the browser/app via Appium — no brittle CSS/XPath selectors.",
    value: "",
    tech: ["Node.js", "Appium 2.x", "Multimodal AI", "Computer vision"],
    category: "Autonomous agents / QA",
    status: "Open source",
    repoUrl: "https://github.com/vaibhava17/budsy-testing-agent",
  },
  {
    title: "Pix",
    tagline: "Hands-free AI YouTube video production platform",
    description:
      "Drafts multi-scene scripts via Gemini 2.5 Pro, orchestrates rendering via Google Veo 3.1, and uploads the finished video to YouTube with generated SEO titles, tags, and descriptions.",
    value: "",
    tech: ["TypeScript", "Node.js", "Gemini 2.5 Pro", "Google Veo 3.1", "YouTube Data API v3"],
    category: "AI media & automation",
    status: "Open source",
    repoUrl: "https://github.com/vaibhava17/pix",
  },
  {
    title: "AI Documentation Generator",
    tagline: "Full-repository code analysis and architecture doc generator",
    description:
      "Analyzes GitHub repos across 14+ languages and generates modular documentation, API specs, and architecture summaries via a web dashboard and CLI.",
    value: "",
    tech: ["Next.js 15", "React", "Tailwind CSS", "TypeScript", "OpenAI / Gemini APIs"],
    category: "Web app / developer tools",
    status: "Live, deployed",
    repoUrl: "https://github.com/vaibhava17/docs-generator",
    liveUrl: "https://docs-generator-phi.vercel.app",
  },
  {
    title: "Knowledge Expiry Agent",
    tagline: "Automated knowledge base & documentation audit system",
    description:
      "Detects expired policies, outdated API specs, and conflicting instructions in enterprise docs using semantic similarity and time-decay scoring. Exports audit reports to Excel, JSON, and CSV.",
    value: "",
    tech: ["Python", "LiteLLM", "Qdrant", "MySQL", "Openpyxl"],
    category: "Autonomous agents / enterprise",
    status: "Open source",
    repoUrl: "https://github.com/vaibhava17/knowledge-expiry-agent",
  },
  {
    title: "AI CLI Assistant",
    tagline: "Terminal AI assistant with context memory and multi-provider routing",
    description:
      "Instant shell assistance with semantic query caching, local RAG memory across past sessions, and smart provider fallback.",
    value: "",
    tech: ["Python", "SQLite", "Local embeddings", "CLI UX"],
    category: "Developer tooling",
    status: "Open source",
    repoUrl: "https://github.com/vaibhava17/ai-cli-tool",
  },
  {
    title: "Hortiprise Production Monitor",
    tagline: "Dedicated production infrastructure & container health monitor",
    description:
      "Monitors GCP VMs, Docker container lifecycles, MySQL connection pools, and Qdrant health, with automated Gmail alerting on threshold breaches.",
    value: "",
    tech: ["Python", "Docker API", "MySQL", "SMTP alerting", "Linux systemd"],
    category: "Infrastructure & DevOps",
    status: "Production, active",
  },
  {
    title: "Unit Atlas",
    tagline: "High-precision engineering conversion platform & spatial API",
    description:
      "Engineering calculation and unit conversion platform with a FastAPI backend and Next.js frontend — rate-limited endpoints, precision math, i18n, and full Jest/Pytest coverage enforced pre-build.",
    value: "",
    tech: [
      "FastAPI",
      "Python",
      "Next.js 16",
      "React 19",
      "TypeScript",
      "SlowAPI",
      "Jest",
      "Testing Library",
    ],
    category: "Full-stack / developer tools",
    status: "Public, open source",
    repoUrl: "https://github.com/vaibhava17/unit-atlas",
  },
  {
    title: "Job Outreach & Career Automation",
    tagline: "Automated recruiter outreach & career funnel engine",
    description:
      "Imports hiring leads from CSV, uses Gemini to write personalized pitches and tailored resume variations, provides a review/approval dashboard, and dispatches via Gmail SMTP/IMAP with pacing limits.",
    value: "",
    tech: ["Node.js", "Express", "Gemini API", "Gmail SMTP/IMAP"],
    category: "AI automation / career tools",
    status: "Active, personal tool",
  },
]

export interface Skill {
  name: string
  proficiency: number
  featured: boolean
  context?: string
}

export interface SkillCategory {
  name: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    name: "AI, LLMs & agentic systems",
    skills: [
      {
        name: "Multi-provider LLM orchestration",
        proficiency: 5,
        featured: true,
        context:
          "Unified AI layer at Solfin (Gemini, Bedrock, OpenAI); DiffCommit AI across 9 providers",
      },
      {
        name: "Structured RAG & document intelligence",
        proficiency: 5,
        featured: true,
        context: "Solfin bill extraction pipeline (70%→90%); Syntra git-diff incremental indexing",
      },
      {
        name: "Vector databases (Qdrant)",
        proficiency: 5,
        featured: true,
        context: "Document embeddings at Solfin, Hortiprise knowledge base, local Qdrant",
      },
      {
        name: "Multimodal vision & OCR",
        proficiency: 5,
        featured: true,
        context: "Indian bill/invoice extraction with Google Vision + Tesseract + LLMs",
      },
      {
        name: "Autonomous AI agents & workflows",
        proficiency: 5,
        featured: true,
        context: "Budsy testing agent, Knowledge expiry audit agent, Pix video pipeline",
      },
      { name: "Deterministic AI pipelines", proficiency: 5, featured: false },
      {
        name: "Conversational AI & internal chatbots",
        proficiency: 5,
        featured: true,
        context: "Solfin enterprise knowledge chatbot; Hortiprise WhatsApp ordering bot",
      },
      { name: "Prompt engineering & structured outputs", proficiency: 5, featured: false },
      { name: "Local LLMs & offline inference", proficiency: 4, featured: false },
    ],
  },
  {
    name: "Backend engineering & data systems",
    skills: [
      {
        name: "Python (FastAPI, Pydantic v2, Pytest)",
        proficiency: 5,
        featured: true,
        context: "Solfin doc intelligence service, Hortiprise backend, Unit Atlas API",
      },
      {
        name: "TypeScript / Node.js",
        proficiency: 5,
        featured: true,
        context: "Solfin loan portal, Next.js server components, Guni SMS APIs",
      },
      {
        name: "Relational databases (PostgreSQL, MySQL)",
        proficiency: 5,
        featured: true,
        context: "Solfin doc service, Aiven MySQL, schema migrations",
      },
      {
        name: "Search & indexing (Apache Solr)",
        proficiency: 4,
        featured: true,
        context: "TalentXO candidate search infrastructure, multi-facet filtering",
      },
      { name: "Prisma ORM & data modeling", proficiency: 5, featured: false },
      { name: "Document databases (MongoDB)", proficiency: 4, featured: false },
      { name: "In-memory caching & queues (Redis)", proficiency: 4, featured: false },
      {
        name: "Resource-aware schedulers & background ETL",
        proficiency: 5,
        featured: true,
        context:
          "Warehouse data ingestion scheduler at Solfin; overnight batch pipelines at TalentXO",
      },
      {
        name: "Automated testing (Pytest, Jest)",
        proficiency: 4,
        featured: true,
        context: "Unit Atlas pre-build test gates, investment pipeline test suite",
      },
    ],
  },
  {
    name: "Frontend & UI architecture",
    skills: [
      {
        name: "Next.js (App Router, server components)",
        proficiency: 5,
        featured: true,
        context: "Solfin CNI & SCF loan journeys, Hortiprise web, AI doc generator",
      },
      {
        name: "React & component systems",
        proficiency: 5,
        featured: true,
        context: "Guni SMS V1→V2 dashboard redesign, reusable component libraries",
      },
      {
        name: "TypeScript",
        proficiency: 5,
        featured: true,
        context: "Strict end-to-end type safety across frontend and backend",
      },
      { name: "Tailwind CSS & modern UI", proficiency: 5, featured: false },
      { name: "State management & optimistic UI", proficiency: 5, featured: false },
      { name: "Mobile-responsive web design", proficiency: 5, featured: false },
      { name: "Framer Motion", proficiency: 4, featured: false },
    ],
  },
  {
    name: "Cloud, DevOps & production monitoring",
    skills: [
      {
        name: "Docker & containerization",
        proficiency: 5,
        featured: true,
        context: "Containerized microservices, Docker Compose, local Qdrant/MySQL",
      },
      {
        name: "Production infrastructure monitoring",
        proficiency: 5,
        featured: true,
        context: "Custom NMS tracking GCP VMs, Docker, MySQL, and Qdrant with alerts",
      },
      {
        name: "Cloud platforms (AWS Bedrock, GCP)",
        proficiency: 4,
        featured: true,
        context: "AWS Bedrock LLMs, GCP Compute VMs, Google Cloud Vision APIs",
      },
      { name: "Linux administration & shell scripting", proficiency: 4, featured: false },
      { name: "GitHub Actions CI/CD", proficiency: 4, featured: false },
      {
        name: "Third-party messaging APIs",
        proficiency: 5,
        featured: true,
        context:
          "WhatsApp Business API for Hortiprise orders; Tech-Ops triage via WhatsApp & Gmail",
      },
    ],
  },
  {
    name: "Mobile & developer tooling",
    skills: [
      {
        name: "React Native / Expo",
        proficiency: 4,
        featured: true,
        context: "Hortiprise mobile app, Beejcount nursery seed calculator",
      },
      {
        name: "VS Code extension API & SecretStorage",
        proficiency: 4,
        featured: true,
        context: "DiffCommit AI, published on VS Marketplace with OS keychain integration",
      },
      {
        name: "Git internals & diffs",
        proficiency: 5,
        featured: true,
        context: "Git diff parsing, SHA content hashing in Syntra and DiffCommit AI",
      },
      { name: "Flutter & Dart", proficiency: 4, featured: false },
      { name: "Appium UI automation", proficiency: 4, featured: false },
    ],
  },
]

export interface Education {
  school: string
  degree: string
  area: string
  period: string
  grade: string
  notes?: string
}

export const education: Education[] = [
  {
    school: "IIT Mandi",
    degree: "Minor in CSE",
    area: "Computer Science & Engineering",
    period: "2024 — 2026",
    grade: "7.0 CGPA",
  },
  {
    school: "Shri Siddhi Vinayak Group of Institutions, Bareilly",
    degree: "B.Tech",
    area: "Computer Science & Engineering",
    period: "2019 — 2023",
    grade: "8.2 CGPA",
    notes: "Software engineering, distributed systems, and web technologies.",
  },
]

export interface Certification {
  title: string
  issuer: string
  year: string
}

export const certifications: Certification[] = [
  { title: "Project Engineer Internship", issuer: "Wipro Ltd.", year: "2022" },
  { title: "Node.js Developer Course", issuer: "Udemy", year: "2022" },
  { title: "Django Using Python", issuer: "CETPA Infotech", year: "2020" },
]

export interface Community {
  organization: string
  role: string
  period: string
  notes: string
}

export const community: Community[] = [
  {
    organization: "Google Developer Student Clubs (GDSC)",
    role: "Core Team Member / Web Lead",
    period: "2021 — 2022",
    notes: "Mentored peers on modern web development and organized developer workshops.",
  },
  {
    organization: "EddieHubCommunity",
    role: "Open Source Contributor",
    period: "2021 — 2023",
    notes: "Contributed to collaborative open-source repositories and documentation.",
  },
]

export const links = {
  github: "https://github.com/vaibhava17",
  linkedin: "https://www.linkedin.com/in/vaibhava17",
  email: "iamvaibhav.agarwal@gmail.com",
  hortiprise: "https://hortiprise.com",
  diffcommit: "https://marketplace.visualstudio.com/items?itemName=vaibhava17.ai-commit-msg",
}
