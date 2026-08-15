# Phase 1 Audit — Portfolio Refactor

Branch: `feature/3d-cyberpunk-redesign` · Audited 2026-08-15

> **Flag before anything else:** this branch is named `feature/3d-cyberpunk-redesign`, but the brief
> explicitly rules out a "cyberpunk hacker" aesthetic (§5.2) in favor of an "instrumentation / eval
> dashboard" direction. No 3D or cyberpunk-styled code actually exists yet on this branch (see §1
> below) — it's a name only, nothing to undo — but I'm flagging the mismatch now rather than quietly
> building the instrumentation direction under a cyberpunk-named branch. Suggest renaming the branch
> once Phase 2 design direction is approved.

---

## 1. Repo inventory

**Framework:** React 18.2 + TypeScript 5.2, no meta-framework. **Build tool:** Vite 5.4 (`vite build`,
plugin: `@vitejs/plugin-react`). **Routing:** none — no `react-router-dom` or equivalent in
`package.json`. The entire site is one component tree (`App.tsx`) rendering every section on `/`;
there is no second route.

**Styling:** Tailwind CSS 3.3 with a custom two-color "Corporate Modern" palette (`primary` deep navy
`#0A0F2C`, `accent` blue `#4F9CFF`) plus a class-based dark mode toggled via `localStorage` +
`document.documentElement.classList`. `tailwind.config.js` is 5.7KB — larger than the palette alone
suggests; worth a pass to strip unused custom utilities during the design-token rebuild.

**Component structure** (`src/components/`, 11 files, ~2,800 lines total):

| Component | Lines | Notes |
|---|---|---|
| Contact.tsx | 467 | EmailJS-based form |
| Experience.tsx | 383 | Acme One timeline |
| Projects.tsx | 249 | 4 project cards — content already fact-checked (see §4) |
| Hero.tsx | 297 | Framer Motion entrance, scroll-linked parallax, mounts `ParticleBackground` |
| Skills.tsx | 269 | Tiered-looking categories, no padding techs found (see §4) |
| Navbar.tsx | 278 | Single-page anchor nav |
| About.tsx | 266 | |
| Testimonials.tsx | 192 | Actually an "Achievements" grid, not third-party quotes — see §4 |
| ParticleBackground.tsx | 137 | Canvas cursor-independent particle field — see §5.1 anti-pattern flag |
| Footer.tsx | 39 | |
| ScrollProgress.tsx | 34 | |
| ThemeToggle.tsx | 28 | |

**Dependencies:** `react`, `react-dom`, `framer-motion`, `lucide-react`, `react-intersection-observer`,
`@emailjs/browser`. No React Three Fiber, GSAP, Lenis, or any 3D/animation-orchestration library yet —
confirms the branch name is aspirational only, not in-progress work to undo.

**Deployment:** Vercel, auto-detected Vite settings — no `vercel.json` in the repo, so build/output
config lives in the Vercel dashboard, not source control. Deployed at
`portfolio-pi-peach-78.vercel.app` (a default Vercel subdomain — see §7).

**Assets:** `public/` contains exactly 3 files: a headshot JPEG, `Bilal-Resume.pdf`, and a plaintext
CV. **No `og-image.jpg`, no `robots.txt`, no `sitemap.xml` exist on disk**, despite `index.html`
referencing `/og-image.jpg` directly — see Critical Finding #2.

**Recent history (already resolved, no action needed):** the last three commits before the current
HEAD removed a malware payload (`temp_interactive_push.bat`, a poisoned `tailwind.config.js`, and
self-hiding `.gitignore` entries — the "PolinRider" incident). Confirmed clean now via
`git status` and file inspection; not re-litigating it here.

---

## 2. Baseline metrics

Measured via Lighthouse (mobile form factor, simulated throttling — Lighthouse's standard mobile
preset) against a fresh `vite build` + `vite preview` of **this branch's current HEAD**
(`0551bd6`), not the stale deployed production bundle (see Critical Finding #3 for why those two
differ).

| Metric | Baseline | Budget (§7 of brief) | Status |
|---|---|---|---|
| Performance score | 86 | ≥ 85 | Pass, but no 3D/case-study routes exist yet to absorb |
| Accessibility score | 96 | ≥ 95 | Pass, one contrast failure (see below) |
| SEO score | 92 | 100 | Fail — invalid `robots.txt` (fallback HTML, see Finding #2) |
| Best Practices | 100 | — | Pass |
| LCP | 2.7s | ≤ 2.5s | **Fail** |
| TBT (proxy for INP) | 380ms | INP ≤ 200ms | Likely fail once real INP is measured |
| CLS | 0 | ≤ 0.1 | Pass |
| FCP | 1.8s | — | — |
| Speed Index | 2.9s | — | — |
| Total page weight | 186KB | ≤ 1.5MB | Pass, enormous headroom — expected, no 3D yet |
| JS transferred (gzip) | ~101KB | ≤ 200KB initial | Pass, but this is 100% of the JS with nothing lazy-loaded |
| CSS transferred (gzip) | ~8KB | — | — |
| Image transferred | ~22KB | — | — |
| Network requests | 8 | — | — |

**This is the number we must not regress against.** Every budget in §7 of the brief is currently
passing or close, *because there is no 3D scene and no case-study content yet*. The margin is
almost entirely consumed by the signature scene and the new routes — treat 186KB/2.7s LCP as the
floor to protect, not evidence the work is done.

**Specific failing audits:**
- **`color-contrast`**: skill-pill badges (e.g. "LangChain & LangGraph", "Retrieval-Augmented
  Generation") use `#0891b2` text on `#ecfeff` background — 3.53:1, needs 4.5:1. Will recur unless
  the new semantic-color tokens (§5.2 of brief) are contrast-checked before use, not after.
- **`robots-txt`**: "30 errors found" — because no real `robots.txt` exists, Vite's SPA fallback
  serves `index.html` for the request, and Lighthouse tries to parse that HTML as robots directives.

---

## 3. Critical findings

### Critical Finding #1 — the site is invisible to non-JS clients (confirmed)

```
curl -s https://portfolio-pi-peach-78.vercel.app | head -100
```

returns a `<head>` full of meta tags and a `<body>` containing only:

```html
<body>
  <div id="root"></div>
</body>
```

No name, no headings, no project text — anywhere in the served HTML. Every crawler, link-preview
bot, and recruiter tool that doesn't execute JavaScript sees nothing but metadata. This is a hard
blocker on the brief's SEO requirements (§8) and is fixed only by server rendering or static
pre-rendering — client-side Framer Motion animations do not help or hurt this; the problem is
structural (no HTML content at all, from any framework layer).

### Critical Finding #2 — the Open Graph image doesn't exist (new finding, not in the brief's list, but same category)

`index.html` references `og:image` and `twitter:image` as `/og-image.jpg`. That file is **not in
`public/`**, so the request falls through Vite's SPA history-fallback and returns `index.html`
itself — `Content-Type: text/html`, 2.2KB — as the "image." Every link preview on LinkedIn, Slack,
X/Twitter, or iMessage for this portfolio is currently broken or blank. Same root cause and same
fix category as Finding #1 (needs a real generated asset, ideally per-route per §8), but distinct
enough to call out on its own since it silently undermines the exact channels (LinkedIn shares,
recruiter Slack pastes) this site exists to be shared through.

Same problem, same cause, applies to `sitemap.xml` and `robots.txt` — neither exists as a real
file; both resolve to the SPA's `index.html` fallback.

### Critical Finding #3 — the live deployment is stale relative to this branch

The deployed site's HTML `<title>` and meta description read **"Muhammad Bilal Faisal - AI Engineer
& Full-Stack Developer... Building intelligent web applications and integrating AI models..."** —
generic copy with no mention of RAG, LangChain, Nucleus One, or production specifics. The local
`index.html` on this branch already has the corrected framing ("Building production RAG and
agentic AI systems (LangChain, LangGraph) alongside the ASP.NET Core, React and SQL Server
platforms they run inside"). The last deploy predates the content refactor in commit `0551bd6`.
Two implications: (a) the Lighthouse baseline above reflects branch HEAD, not what's currently
live — don't confuse the two when comparing before/after later; (b) whatever ships from this
refactor needs an actual redeploy to matter, which is worth confirming explicitly at the end since
Vercel auto-deploy behavior isn't configured in-repo (no `vercel.json`).

---

## 4. What to keep

The most recent commit on this branch already did real fact-alignment work — this is not a
from-scratch content rewrite:

- **Project descriptions** (`Projects.tsx`) already match the career document almost exactly:
  capability-based agent isolation language for RepoWarden, "In Development" badge and
  never-shipped framing for Project-Ease, the RFC/pyotp detail for the MFA server. Reusable near
  verbatim in the new case-study template (§4 of the brief).
- **"Testimonials.tsx" is not testimonials** — it's a 6-item achievements grid (Production
  Agentic AI, Permission-Aware RAG, Sole Engineer/Project-One, Security-First Engineering,
  Full-Stack Delivery, Continuous Learning), each tied to a real, sourced fact with no invented
  numbers. Good raw material for the "Proof strip" and "The argument" sections of the new home
  page — needs a rename and IA relocation, not a rewrite. It should not survive as a
  "Testimonials" section, though, since it isn't one and the label overpromises social proof
  that doesn't exist.
- **Skills.tsx**: spot-checked against the career document's skills inventory — no Docker,
  Kubernetes, AWS, GCP, Spark, or Kafka present. Already respects the padding-technology
  exclusion; needs tiering/evidence-linking per §5.1 of the brief, not fact correction.
- **Hero copy direction** (scroll-linked parallax via `useScroll`/`useTransform`, staggered
  entrance) is a reasonable base motion language to carry into the new design system, even
  though the particle background it currently wraps should not survive (below).
- **Dark mode**, **scroll progress bar**, and **EmailJS contact form wiring** are functional and
  worth carrying forward as-is or near-as-is.

## What to cut

- **`ParticleBackground.tsx`** — a 50-node canvas particle field with cursor-independent drift and
  proximity-based connecting lines, cross-faded teal/emerald/blue. This is close to verbatim the
  "generic particle field that follows the cursor" anti-pattern the brief calls out by name in
  §5.1 and again in §12 ("floating cubes, generic particle fields, or a cursor-following blob").
  Replace entirely with the single signature 3D scene (§6) — do not keep both.
- The **"Testimonials"** label/section identity (content is fine, see above — the container and
  name are what needs to go).
- The current two-color navy/blue palette, once the semantic instrumentation palette (§5.2) is
  designed — it's not one of the three explicitly-named bad defaults, but it also isn't derived
  from the subject matter (schemas, retrieval, authorization boundaries) the way the brief
  requires, so it doesn't survive on its own merits either.

---

## 5. Migration path recommendation

**Recommend: migrate to Next.js App Router**, deployed on the same Vercel project.

Reasoning, weighed against the alternative of bolting SSR/prerendering onto the existing Vite SPA:

- The brief's own IA (§4) calls for 5 independently-shareable, server-rendered routes with
  per-route metadata, JSON-LD, and generated OG images (§8) — this is what Next's App Router
  Metadata API and file-based routing are built for. Retrofitting equivalent behavior onto Vite
  means reaching for a less-maintained tool (e.g., `vite-plugin-ssr`/Vike, or a custom
  Puppeteer-based prerender step) to reinvent what Next ships natively.
  - **Risk of this path:** these tools are lower-adoption, have rougher edges around per-route
    metadata and static generation than Next's App Router, and the brief itself describes the 3D
    code-splitting pattern in Next.js terms (`next/dynamic` with `ssr: false`) — building the
    equivalent by hand adds real risk for no real benefit.
- The codebase is small (~2,800 lines across 11 components, no routing, no state management
  library) — this is a low-risk migration, not a large one. Nothing here depends on Vite-specific
  behavior.
- Already deployed on Vercel, which is Next.js's native target — zero deployment migration cost,
  same project, same domain (or a new one, see the domain flag in §8 of the brief, which I'll
  raise again at the appropriate phase rather than acting on it now).
- Framer Motion, Tailwind, and EmailJS all work unmodified under Next's App Router; the main
  rework is converting interactive pieces (`ThemeToggle`, `ScrollProgress`, the contact form) into
  explicit Client Components, and splitting the current single `App.tsx` page into route
  segments.

**Risk to flag honestly:** Next.js App Router has a steeper mental model (Server vs. Client
Components, where `'use client'` boundaries go) than a plain Vite SPA. For a codebase this size
that cost is small and one-time, and it's the path that actually satisfies the brief's rendering
and metadata requirements rather than approximating them.

---

## Open items before Phase 2

1. **Branch name** — confirm whether to rename `feature/3d-cyberpunk-redesign` once the
   instrumentation-based design direction (§5.2 of the brief) is locked in Phase 2, so the branch
   name doesn't quietly contradict the direction we build.
2. **Redeploy cadence** — confirm the Vercel project auto-deploys from this branch/PR, or whether
   a manual step is needed once this lands on `master`, given Finding #3 above.

Ready to proceed to **Phase 2 — Design plan** (`docs/DESIGN.md`) once this audit is confirmed.
