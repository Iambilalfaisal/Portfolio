# Fact-check diff — site vs. career context document

Phase 4 checkpoint. Every factual claim on the site, checked against
`Bilal-Faisal-Career-Context-Document.pdf` (v2.2, August 2026). Site content lives in
`lib/content.ts`, `app/layout.tsx` (JSON-LD), `app/about/page.tsx`, and the case study
sections in `lib/content.ts`'s `caseStudies` array.

## Numbers, dates, identity

| Claim on site | Where | Career doc says | Match |
|---|---|---|---|
| Associate Software Engineer | Hero eyebrow, About, Experience, JSON-LD `jobTitle` | Associate Software Engineer | ✓ |
| Acme One | Hero, About, Experience, all 3 case studies, JSON-LD `worksFor` | Acme One | ✓ |
| Nucleus One | About, Experience, Nucleus One case study | Nucleus One | ✓ |
| March 2026 – Present (full-time) | Experience, About | March 2026 to present | ✓ |
| July 2025 – March 2026 (internship) | Experience, About | July 2025 to March 2026 | ✓ |
| "Converted early into the full-time role" | Experience note, proof strip | Internship converted early | ✓ |
| 2023 – 2027, final year (BS Data Science, UMT) | About | 2023 to 2027, final year | ✓ |
| Sole engineer, Project-One | Proof strip, About, Nucleus One case study, Experience | Sole engineer on one full platform module (Project-One) | ✓ |
| Ranked second by commit volume across both platform repositories | Proof strip | Ranked second by commit volume across both platform repositories | ✓ |
| Roughly 100 tables in the unified SQL Server schema | Nucleus One case study | Roughly 100 tables | ✓ |
| Roughly ten custom tools across the two RepoWarden agents | RepoWarden case study | Roughly ten custom tools | ✓ |
| Two agents, two compiled StateGraphs | RepoWarden tagline + case study | Two agents, two compiled StateGraphs | ✓ |
| Two-pass verification, second temperature-zero call | Project-Ease case study | Two-pass verification (a second, temperature-zero model call) | ✓ |
| Anthropic certifications (5 listed, 2026) | About | Same 5, verbatim | ✓ |
| Bilalfaisal100@gmail.com | Contact, JSON-LD | Bilalfaisal100@gmail.com | ✓ |
| github.com/Iambilalfaisal | Contact, Footer, JSON-LD `sameAs` | github.com/Iambilalfaisal | ✓ |
| linkedin.com/in/ibilalfaisal | Contact, Footer, JSON-LD `sameAs` | linkedin.com/in/ibilalfaisal | ✓ |
| portfolio-pi-peach-78.vercel.app | `metadataBase`, sitemap, robots | Same URL | ✓ |
| "Seven-person team" | *(not currently used anywhere)* | Seven-person team | — allowed, unused. Not a defect; available if a future section needs it. |
| Phone number | *(not included)* | +92 322 4255722 | — omitted by design; the redesigned contact section only surfaces email/GitHub/LinkedIn. Not a factual error, just a scope cut. |

## Status labels (must never drift)

| Project | Status shown on site | Required |
|---|---|---|
| RepoWarden | In development | In development — matches; career doc doesn't mark this shipped either, and the site never claims otherwise. |
| Project-Ease | In development, every mention | Must say "in development" at every single mention | ✓ — checked `lib/content.ts`, the home card, and the case study page; all three read `in-development`. |
| Nucleus One | Shipped to production | Real, deployed platform work | ✓ |
| MFA Server / Risk Assessment Platform | Academic capstone | Capstone framing | ✓ |

## Exclusion checks (things that must appear nowhere)

| Excluded item | Search performed | Result |
|---|---|---|
| Microsoft AI-103 (any form) | Grepped `app/`, `components/`, `lib/` for "AI-103" and "AI103" | Zero matches. |
| Any percentage, latency, user count, uptime, cost/time saving | Manual read of every case study, About, home sections | None present. The only numbers anywhere are the ones in the table above. |
| RAGAS *scores* (vs. the harness existing) | Project-Ease case study | Site says the harness is "wired into the response path" and explicitly "hasn't been run yet" — never states a score. |
| Team-lead / management / mentoring language | Manual read | None. "Sole engineer" is the only ownership language used, matching the career doc's own preferred framing. |
| Inflated seniority ("Software Engineer", "Senior", "Lead") | Grepped all copy for "Senior" and bare "Software Engineer" | Only "Associate Software Engineer" appears, everywhere. |
| Padding technologies (Docker, Kubernetes, AWS, GCP, Spark, Kafka) | Cross-checked every skill in `skillCategories` against the career doc's master inventory | Every listed skill traces to the master list; none of the six excluded technologies appear. |
| Invented projects | Confirmed against the fixed project set | Only RepoWarden, Project-Ease, MFA Server, Risk Assessment Platform, and Nucleus One (as employment work) appear anywhere. |

## Known out-of-scope items

The repo root still contains the four CV `.docx` files, `M_Bilal_Faisal_CV.txt`, and the
career context PDF itself. These are source documents the user supplied, not build output —
they weren't touched, and this fact-check only covers what the *site* renders. Worth a quick
manual pass to confirm those four CVs agree with v2.2 of the career doc, since guardrail #3
in the career doc ("consistency across surfaces") includes them explicitly — but that's a
document-editing task, not a site-build task, so it's flagged here rather than acted on.
