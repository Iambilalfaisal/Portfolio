# Phase 2 Design Plan — Instrumentation

Companion to `docs/AUDIT.md`. Defines the token system, type system, and page structure before any
component gets rebuilt.

---

## 1. Color tokens — semantic, not decorative

Six named tokens. Two of them *mean something specific* (authorization state) and are reused
identically across the 3D scene, status badges, and architecture diagrams — that reuse is the
design idea, not the individual colors.

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#F3F4F7` | Base surface. A cool, slightly blue-grey off-white — not cream, not pure white. |
| `--ink` | `#12151C` | Primary text on `--paper`; becomes the base surface in dark mode. |
| `--graphite` | `#5B6270` | Secondary text, muted labels, inactive state. |
| `--hairline` | `#D9DCE2` | Borders, dividers, table rules, card edges. Structural, never decorative. |
| `--grounded` | `#0E7C7B` | **Semantic: permitted / authorized / verified / shipped.** Retrieved-and-authorized nodes in the 3D scene, "Shipped to production" badges, verified-answer states in diagrams. |
| `--gated` | `#9B3A44` | **Semantic: denied / boundary / omitted / in-development.** Refused nodes at the authorization membrane, the Reviewer agent's missing write tool, "In development" badges, filtered-out records. |

Dark mode remaps rather than invents: `--ink` becomes the base surface, `--paper` becomes primary
text at reduced opacity, `--graphite`/`--hairline` shift to their dark-surface equivalents
(`#8B92A0` / `#2A2E38`), and `--grounded`/`--gated` desaturate slightly (`#14938F` / `#B54B56`) so
neither reads as a glowing neon accent against the dark surface — see the self-critique in §4 for
why that restraint matters specifically.

Both accents are deliberately muted, not neon or alarmist — `--grounded` is a controlled teal, not
acid-green; `--gated` is a muted brick-garnet, not vermilion or alert-red. This is a functioning
signal pair (go / stop), not a decoration pair.

---

## 2. Typography

Three typefaces, three distinct roles, no overlap, no Inter anywhere:

| Role | Typeface | Why |
|---|---|---|
| **Display** | Space Grotesk | Geometric, technical character without going full "brutalist tech startup." Carries the hero headline, section titles, project names. |
| **Body** | IBM Plex Sans | A workhorse designed for enterprise/technical software — quiet, legible at length, doesn't compete with Display. Carries prose, case-study copy, nav. |
| **Mono** | JetBrains Mono | Purpose-built for code and data legibility. Carries eyebrows, stack rows, status badges, labels, the "THE PROBLEM / THE APPROACH" case-study section markers, diagram annotations. This is where the subject genuinely lives, not a decorative flourish. |

### Type scale (4px base grid, ~1.25 ratio)

| Step | Size / line-height | Weight | Typeface | Use |
|---|---|---|---|---|
| Eyebrow | 13px / 16px, uppercase, `+0.04em` tracking | 500 | JetBrains Mono | Section labels, status badges, stack rows |
| Small | 14px / 20px | 400 | IBM Plex Sans | Captions, metadata, footnotes |
| Body | 17px / 28px | 400 | IBM Plex Sans | Prose, case-study copy |
| Body-lg | 19px / 32px | 400 | IBM Plex Sans | Lead paragraphs, "The argument" section |
| H4 | 22px / 28px | 600 | Space Grotesk | Card titles, sub-sections |
| H3 | 28px / 34px | 600 | Space Grotesk | Case-study section headers |
| H2 | 38px / 44px | 600 | Space Grotesk | Section titles ("Selected work") |
| H1 | 56px / 60px, `-0.01em` | 700 | Space Grotesk | Page titles (case studies) |
| Display | clamp(40px, 6vw, 80px) / 0.95 | 700 | Space Grotesk | Hero headline only |

### Spacing scale (4px base)

`4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192` — px. Section vertical rhythm uses 96/128; component
internal spacing stays at 12–32; 192 is reserved for the gap around the hero's signature scene so
it never feels cramped against content.

---

## 3. Wireframes

### Home page

```
┌──────────────────────────────────────────────────────────────┐
│ [M BILAL FAISAL]                      Work  About  Contact   │  ← nav, mono eyebrow logo
├──────────────────────────────────────────────────────────────┤
│                                                                │
│   He builds intelligent systems that reach production —      │  ← H1/Display, server-rendered
│   and the conventional software they run inside.              │
│                                                                │
│   [ view selected work → ]                                    │  ← one primary CTA
│                                                                │
│                 ░░░░░░░░░░░░░░░░░░░░░░░░░░                     │
│                 ░  signature 3D scene   ░                     │  ← authorization-boundary scene
│                 ░  (canvas, aria-hidden)░                     │     reserved space, no CLS
│                 ░░░░░░░░░░░░░░░░░░░░░░░░░░                     │
├──────────────────────────────────────────────────────────────┤
│ PROOF STRIP  (mono eyebrows, plain text, no invented metrics) │
│  Associate Software Engineer, Acme One · Sole engineer,       │
│  Project-One · Internship converted early to full-time        │
├──────────────────────────────────────────────────────────────┤
│ THE ARGUMENT                                                   │
│  [3–5 sentence prose block, Body-lg, single column, generous  │
│   measure — ~65ch max-width]                                  │
├──────────────────────────────────────────────────────────────┤
│ SELECTED WORK                                                  │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐        │
│  │ RepoWarden    │ │ Project-Ease  │ │ Nucleus One   │        │
│  │ [gated] agent │ │ [in dev]      │ │ [grounded]    │        │
│  │ isolation     │ │ badge         │ │ shipped       │        │
│  │ stack row     │ │ stack row     │ │ stack row     │        │
│  └───────────────┘ └───────────────┘ └───────────────┘        │
├──────────────────────────────────────────────────────────────┤
│ EXPERIENCE — Acme One timeline                                 │
│  Jul 2025 ─────●───────────────●───────────── Present         │
│         AI Intern         Assoc. Software Engineer             │
├──────────────────────────────────────────────────────────────┤
│ CAPABILITIES — tiered, evidence-linked                         │
│  AI/LLM Engineering        used in → RepoWarden, Nucleus One  │
│  Backend                   used in → Project-One, HR-One      │
│  Frontend                   ...                                 │
│  (never a flat tag cloud — grouped, each tied to a project)    │
├──────────────────────────────────────────────────────────────┤
│ CONTACT — email · LinkedIn · GitHub · CV · UTC+5, open to      │
│           remote                                                │
└──────────────────────────────────────────────────────────────┘
```

### Case study template (`/work/[slug]`)

```
┌──────────────────────────────────────────────────────────────┐
│ ← Work                                                         │
│                                                                │
│ RepoWarden                                                     │
│ Autonomous code review and refactoring agents                  │
│                                                                │
│ [ IN DEVELOPMENT ]  ← mono badge, --gated or --grounded token  │
│                                                                │
│ Python · LangGraph · LangChain · FastAPI · MongoDB · React 19  │  ← mono stack row
│ [ GitHub ↗ ]                                                    │
│                                                                │
│ THE PROBLEM                                                     │  ← mono eyebrow
│  [prose, 2–3 sentences]                                        │
│                                                                │
│ THE APPROACH                                                    │
│  [prose]                                                        │
│  ┌────────────────────────────────────────┐                    │
│  │   SVG architecture diagram              │                    │
│  │   (Reviewer / Editor StateGraphs)       │                    │
│  └────────────────────────────────────────┘                    │
│                                                                │
│ THE INTERESTING DECISION                                        │
│  [prose — capability-based agent isolation, most room here]    │
│                                                                │
│ WHAT I'D DO DIFFERENTLY                                         │
│  [prose — honest, specific]                                     │
└──────────────────────────────────────────────────────────────┘
```

Every case study reuses this exact spine — RepoWarden, Project-Ease, Nucleus One. No per-project
layout variation; consistency is the signal.

---

## 4. Self-critique against §5.1

Checked against each named default before building anything:

1. **Warm cream + high-contrast serif + terracotta** — not this. `--paper` is a cool blue-grey,
   not cream; no serif anywhere in the type system; `--grounded`/`--gated` are teal and garnet,
   not terracotta.
2. **Near-black + single acid-green/vermilion accent** — this was the closest near-miss. An
   "instrumentation / terminal" mood pulls naturally toward a dark-first, single-neon-accent
   default, which is exactly the generic developer-portfolio look the brief names directly. I
   corrected for it two ways: the primary identity is **light-first** (`--paper` as the default
   surface, not `--ink`), and there are **two** muted, non-neon semantic accents instead of one
   glowing one. Dark mode exists but is a secondary mode, not the site's identity, and its accents
   are explicitly desaturated for the same reason.
3. **Broadsheet, hairline rules, dense serif columns** — partially present (the `--hairline` token
   exists and case studies do use rules), but the layout stays single-column with a generous
   65ch measure and real whitespace at the 96/128 spacing steps, rather than dense multi-column
   text. No serif. The hairline token is structural (card edges, dividers) rather than the entire
   visual language.

Also avoided per §5.1/§12: no floating geometric shapes, no cursor-following particle field (the
existing `ParticleBackground.tsx` is being cut for exactly this reason — see `AUDIT.md` §4), no
rotating model, no hero typing effect, and the case-study section labels are named
(`THE PROBLEM` / `THE APPROACH` / ...) rather than numbered `01/02/03` — the sequence isn't a
countdown, so it isn't presented as one.

---

Ready for Phase 3 — Foundation (Next.js migration, routing, token system, typography, base
components, no 3D yet) once this is confirmed.
