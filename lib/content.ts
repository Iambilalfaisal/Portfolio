export type Status = 'shipped' | 'in-development' | 'capstone'

export const statusLabel: Record<Status, string> = {
  shipped: 'Shipped to production',
  'in-development': 'In development',
  capstone: 'Academic capstone',
}

export interface CaseStudySection {
  problem: string
  approach: string
  decision: string
  differently: string
}

export interface CaseStudy {
  slug: string
  title: string
  tagline: string
  status: Status
  stack: string[]
  githubUrl: string
  sections: CaseStudySection
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'repowarden',
    title: 'RepoWarden',
    tagline: 'Autonomous code review and refactoring agents',
    status: 'in-development',
    stack: ['Python', 'LangGraph', 'LangChain', 'FastAPI', 'MongoDB', 'React 19', 'Vite', 'Monaco'],
    githubUrl: 'https://github.com/Iambilalfaisal/RepoWarden',
    sections: {
      problem:
        'An LLM agent that can review and refactor a codebase is only as safe as its prompt, unless something structural stops it from writing changes it hasn’t been authorized to make. Prompt instructions can be argued with; a missing tool can’t.',
      approach:
        'A two-agent system built as two compiled LangGraph StateGraphs behind a FastAPI backend. Roughly ten custom tools span directory listing, file reads, code search, and dedicated security, performance and code-quality analysers, all operating over a sandboxed filesystem layer. Results stream token-by-token over Server-Sent Events as structured events — tool calls, analysis results, proposed edits — and MongoDB backs both a LangGraph checkpointer for thread-scoped conversation state and a custom store for cross-session project memory, so nothing needs to be replayed from the client.',
      decision:
        'Capability-based agent isolation. The Reviewer agent’s toolset structurally omits the write tool — it cannot modify the workspace regardless of how it’s prompted, because the capability simply isn’t bound to it. Nothing is written to disk until a human approves the proposed changes; only then is a separate, write-capable Editor agent constructed and granted the write tool. Safety is enforced through tool binding, not through instructions telling the model what not to do.',
      differently:
        'The evaluation is currently a pytest suite run against a fixture directory of deliberately flawed code — solid for regression coverage, but narrower than real-world repository diversity. Broadening it against a wider range of real open-source codebases, and adding a diff-review surface in the UI rather than relying on structured edit proposals alone, are the two next steps that would matter most.',
    },
  },
  {
    slug: 'project-ease',
    title: 'Project-Ease',
    tagline: 'Multi-tenant AI platform for law firms',
    status: 'in-development',
    stack: ['Python', 'Quart', 'Azure OpenAI', 'Azure AI Search', 'Azure AI Document Intelligence', 'RAGAS', 'React 19'],
    githubUrl: 'https://github.com/Iambilalfaisal/Project-Ease',
    sections: {
      problem:
        'A legal-practice platform for Pakistani law firms needs to retrieve from a case-law corpus shared across every tenant, while keeping each firm’s own matters strictly isolated — and legal answers are high-stakes enough that an ungrounded or hallucinated citation is a real liability, not just a bad user experience.',
      approach:
        'An extension of Microsoft’s azure-search-openai-demo reference architecture into a full legal-practice platform: matter lifecycle tracking, hearing and deadline management, OCR-assisted document extraction, statutory fee calculation, WhatsApp/Twilio reminders with Whisper voice transcription, per-seat plan enforcement, audit logging, and an Urdu/RTL interface with language-matched prompting, on a Quart backend over Azure OpenAI, Azure AI Search and Azure AI Document Intelligence.',
      decision:
        'Organisation-scoped retrieval resolved in a single hybrid BM25 + vector + semantic query, alongside the shared case-law corpus — with tenancy enforced server-side from the JWT organisation claim rather than trusting any client-supplied value, so one firm’s matters can’t leak into another’s results no matter what the client sends. On top of that, a two-pass anti-hallucination check: a second, temperature-zero model call verifies every answer against its retrieved sources before the user sees it. A RAGAS evaluation harness is wired into that same response path, scoring faithfulness, answer relevancy and context precision.',
      differently:
        'The harness is built and instrumented; it hasn’t been run yet. That’s the single highest-value thing left on this project — running it converts "an evaluation harness is wired in" into a measured, comparable retrieval-quality baseline, and it would be the first measured result anywhere in this portfolio. Everything else here is described as instrumentation, deliberately, until that run happens.',
    },
  },
  {
    slug: 'nucleus-one',
    title: 'Nucleus One',
    tagline: 'Permission-aware retrieval inside a multi-module enterprise platform',
    status: 'shipped',
    stack: ['LangChain', 'LangGraph', 'ASP.NET Core 8', 'SQL Server', 'React', 'TypeScript', 'Azure AI Foundry'],
    githubUrl: '',
    sections: {
      problem:
        'Employees on Nucleus One — Acme One’s multi-module enterprise platform, built on a unified SQL Server schema of roughly 100 tables — needed to ask open-ended questions in natural language and get answers drawn from live platform data. The obvious risk: a chatbot with broad data access can quietly become a path around the platform’s own permission model, surfacing records a user was never supposed to see.',
      approach:
        'A Retrieval-Augmented Generation chatbot engineered and deployed into Nucleus One’s production environment, owned end to end from prototype through go-live. Retrieval grounding was iterated through prompt engineering and tuning of chunking strategy and embedding configuration, measured against answer accuracy on internal documents. The same platform work includes sole ownership of the Project-One module (Epic → Feature → Story → Task tracking, sprint planning, Kanban boards, analytics dashboards, delivered from SQL Server schema through ASP.NET Core 8 services to the React/TypeScript interface), the HR-One service layer and schema, and the platform’s JWT/RBAC authentication controller — plus ongoing work building LangChain and LangGraph agentic pipelines with tool-calling agents, stateful graphs and human-in-the-loop approval steps against the same APIs and data layer.',
      decision:
        'Permission-aware retrieval. Every request is resolved against the asking user’s existing authorisation in the application before anything is retrieved, so the chatbot can only surface records that user is already entitled to see through the platform’s normal access controls — it cannot become a side channel around them. This is the single most interview-ready detail in the whole body of work: it’s a security decision expressed as a retrieval architecture, not a prompt-engineering trick.',
      differently:
        'Retrieval grounding today is validated through prompt iteration and manual accuracy checks against internal documents — useful, but informal. Building a structured, repeatable evaluation harness around it, in the spirit of the one now wired into Project-Ease, would turn "iterated until it looked right" into a measured, comparable baseline the same way.',
    },
  },
]

export interface CompactProject {
  title: string
  tagline: string
  status: Status
  stack: string[]
  description: string
  detail: string
}

export const compactProjects: CompactProject[] = [
  {
    title: 'Multi-Factor Authentication Server',
    tagline: 'Information Security capstone',
    status: 'capstone',
    stack: ['Python', 'scikit-learn', 'Streamlit', 'WebAuthn / FIDO2'],
    description:
      'HOTP (RFC 4226) and TOTP (RFC 6238) implemented directly from the specifications and validated against pyotp as an independent oracle — rather than calling a library — with an AES-256-GCM encrypted vault, Argon2id password hashing, and WebAuthn/FIDO2 attestation and assertion verification.',
    detail:
      'An Isolation Forest layer scores login risk over geographic distance, impossible travel, new-device and unusual-hour features, with LLM-generated alerts.',
  },
  {
    title: 'Automated Information Security Risk Assessment Platform',
    tagline: 'NIST SP 800-30 risk assessment application',
    status: 'capstone',
    stack: ['Flask', 'React', 'Streamlit', 'Claude API', 'NVD API'],
    description:
      'Asset, threat and vulnerability registers with live CVE lookups through the NVD API, LLM-generated control recommendations with a rule-based offline fallback, and automated PDF reporting for risk registers, cost-benefit analysis and compliance checklists.',
    detail: 'Served from a Flask REST API backing both Streamlit and React frontends.',
  },
]

export interface ExperienceEntry {
  title: string
  company: string
  location: string
  period: string
  note?: string
  type: 'full-time' | 'internship'
  bullets: string[]
}

export const experience: ExperienceEntry[] = [
  {
    title: 'Associate Software Engineer',
    company: 'Acme One',
    location: 'Lahore, Pakistan',
    period: 'March 2026 – Present',
    type: 'full-time',
    bullets: [
      'Builds LangChain and LangGraph agentic pipelines inside Nucleus One: multi-step chains, tool-calling agents with custom tool definitions, stateful graphs, and human-in-the-loop approval steps, integrated with the platform’s ASP.NET Core 8 APIs and SQL Server data layer.',
      'Implemented LiveKit voice agents for a real-time AI assistant on a construction-site management platform, building the agent-worker architecture that handles live audio streams and LLM-driven responses over WebRTC.',
      'Sole engineer on the Project-One module, delivered end to end from SQL Server schema through ASP.NET Core 8 services to the React/TypeScript interface.',
      'Authored the HR-One service layer and deployed its SQL Server schema; built the platform authentication controller (JWT, RBAC, secure sessions); shipped TimeTrace to production with its backend reporting engine.',
      'Uses Azure AI Foundry for model management and evaluation, and runs Llama 3.1 locally through Ollama for offline inference and pipeline testing.',
    ],
  },
  {
    title: 'Artificial Intelligence Intern',
    company: 'Acme One',
    location: 'Lahore, Pakistan',
    period: 'July 2025 – March 2026',
    note: 'Converted early into the full-time role above.',
    type: 'internship',
    bullets: [
      'Engineered and deployed a permission-aware Retrieval-Augmented Generation chatbot into Nucleus One’s production environment, owned from prototype through go-live.',
      'Improved retrieval grounding through prompt engineering and iteration on chunking strategy and embedding configuration.',
      'Built and evaluated NLP and text-classification models in Python (pandas, NumPy, scikit-learn), then deployed the selected sentiment model behind REST endpoints in a production web application.',
    ],
  },
]

export interface SkillCategory {
  category: string
  evidence: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'AI & LLM Engineering',
    evidence: 'RepoWarden · Nucleus One · Project-Ease',
    skills: [
      'Retrieval-Augmented Generation',
      'LangChain / LangGraph',
      'Agentic & tool-calling agents',
      'Capability-based tool isolation',
      'Human-in-the-loop gating',
      'Hybrid search (BM25 + vector + semantic)',
      'RAG evaluation (RAGAS)',
      'Permission-aware & tenant-scoped retrieval',
      'Token streaming (SSE)',
    ],
  },
  {
    category: 'Backend & Data',
    evidence: 'Project-One · HR-One · TimeTrace',
    skills: [
      'ASP.NET Core 8',
      'FastAPI / Quart / Flask',
      'Microsoft SQL Server',
      'MongoDB',
      'JWT & RBAC',
      'Multi-tenant access control',
      'Schema design & query optimisation',
    ],
  },
  {
    category: 'Frontend',
    evidence: 'Project-One · RepoWarden',
    skills: ['React 18/19', 'TypeScript', 'Next.js', 'Zustand', 'React Query', 'Tailwind CSS'],
  },
  {
    category: 'Security Engineering',
    evidence: 'MFA Server · Nucleus One auth controller',
    skills: ['WebAuthn / FIDO2', 'TOTP (RFC 6238)', 'HOTP (RFC 4226)', 'AES-256-GCM', 'Argon2id', 'NIST SP 800-30'],
  },
  {
    category: 'Machine Learning',
    evidence: 'Acme One intern work · Risk Assessment Platform',
    skills: ['NLP & text classification', 'Anomaly detection (Isolation Forest)', 'Feature engineering', 'scikit-learn / pandas / NumPy'],
  },
  {
    category: 'Cloud & Practice',
    evidence: 'Across all Acme One work',
    skills: ['Microsoft Azure', 'Azure AI Foundry', 'Git / GitHub / CI-CD', 'Agile / Scrum', 'pytest'],
  },
]

export const proofPoints = [
  'Associate Software Engineer, Acme One — internship converted early to full-time',
  'Sole engineer, Project-One module — database through frontend',
  'Ranked second by commit volume across both platform repositories',
]
