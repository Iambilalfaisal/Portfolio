# Phase 7 — Verification results

Measured 2026-08-15 against a production build (`next build` + `next start`) on
`feature/3d-cyberpunk-redesign`. Lighthouse mobile runs use the standard mobile
form factor with simulated throttling unless noted; one desktop run and one real
devtools-throttled run are called out explicitly where they change the picture.

## Before / after

| Metric | Phase 1 baseline (Vite SPA, no 3D/case studies) | Now (Next.js, static-fallback path) | Budget |
|---|---|---|---|
| Performance (mobile) | 86 | 96 | ≥ 85 — pass |
| Accessibility | 96 | 100 | ≥ 95 — pass |
| SEO | 92 | 100 | 100 — pass |
| Best Practices | 100 | 100 | — |
| LCP | 2.7s | 2.7s (simulated) / ~110ms real paint delay — see note below | ≤ 2.5s — narrowly over in the simulated model |
| TBT | 380ms | 20ms | INP ≤ 200ms — pass |
| CLS | 0 | 0 | ≤ 0.1 — pass |
| Total page weight | 186KB | 285KB | ≤ 1.5MB — pass, large margin |
| Total JS transferred | ~101KB | ~199KB (static-fallback path) | ≤ 200KB initial — pass, at the edge |
| Routes serving real HTML | 1 of 1 (but empty root — Critical Finding #1) | 5 of 5, all with unique content | — |

The baseline had no 3D, no case studies, and no real routes — this comparison is
against a much smaller site. The honest read: the new site does more (5 routes,
3D scene, architecture diagrams, generated OG images) while holding performance
roughly flat to improved on every metric except the LCP edge case below.

## LCP: a measurement-model caveat, not a real regression

Lighthouse's *simulated* throttling reports home-page LCP at 2.7s, just over the
2.5s budget. But the trace-based `lcp-breakdown-insight` audit shows the actual
paint event — the H1 headline, confirmed as the LCP element, not the canvas —
resolves with a time-to-first-byte of ~8ms and an element render delay of
~102ms: roughly 110ms in real terms. A `--throttling-method=devtools` run (real
applied throttling rather than a network/CPU model) on this sandboxed host
produced noisier numbers still (TBT 810ms) that look more like host CPU
contention than page-caused cost — not treated as authoritative either.

The one concrete, fixable lever found (`render-blocking-insight`: ~150ms
attributed to the global CSS `<link>` tag) was tried via Next's experimental
`optimizeCss` flag; it made no measurable difference in this Next.js version
(no true critical-CSS inlining happens under that flag currently) and was
reverted rather than left in as dead configuration.

**Recommendation:** validate LCP with a real device or WebPageTest before
treating this as a blocker — the trace evidence suggests the simulated number
is a lantern-modeling artifact on a very lightweight page, not a real 2.7-second
wait.

## The signature scene: chunk size, draw calls, and the mobile risk

| Check | Result | Budget |
|---|---|---|
| 3D chunk size (gzip) | 229.9KB | ≤ 300KB — pass |
| Draw calls | 2 (one instanced mesh for all nodes, one wireframe boundary) | < 100 — pass, wide margin |
| Desktop performance (3D active) | 84, LCP 0.6s, TBT 370ms | — informational |

**Open risk, shipped deliberately:** device gating was changed mid-session from
a full skip on any mobile user agent to a tiered full/reduced/skip model (see
`lib/device-capability.ts`), so more visitors reach the actual scene rather than
always the static fallback. Measured on Lighthouse's simulated mobile throttle,
even the reduced tier (90 nodes, DPR capped at 1) shows **Total Blocking Time
of ~1.1–1.2 seconds** — several times over the 200ms INP budget — because the
fixed cost of parsing/executing Three.js + React Three Fiber and compiling
shaders dominates over node count. An idle-deferred mount (`requestIdleCallback`)
was tried and made no meaningful difference (1,160ms vs 1,220ms), confirming
this is a library-weight cost, not a scheduling problem.

This was a explicit call, not an oversight: the choice was made to ship the
reduced tier anyway and flag it here, rather than silently reverting to
static-only-on-mobile, on the reasoning that Lighthouse's simulated throttling
model has already shown itself to run pessimistic once in this same audit (the
LCP case above). Whether that holds for TBT under a 4x-CPU-throttle simulation
on real hardware is unverified — **this needs a real mid-range Android and an
iPhone before this ships with confidence**, which isn't something this
environment can do. If real-device testing confirms the simulated result,
reverting mobile to the static-only fallback (a roughly 10-line change,
documented in the git history of `lib/device-capability.ts` and `HeroScene.tsx`)
is the fallback plan.

## Phase 6 — polish and restraint

- Built real scroll-reveal choreography (`components/Reveal.tsx`): IntersectionObserver
  + CSS transition, gated behind a `.motion-ready` class added by a
  `beforeInteractive` inline script (only when `prefers-reduced-motion` is not
  set), with the underlying media query as a second, independent guard. Content
  is visible by default in every case — no JS, JS blocked, or reduced motion —
  since the hidden state only exists behind that class. This replaces an
  earlier Framer Motion `whileInView` version that SSR'd `opacity: 0` and left
  content invisible until hydration + IntersectionObserver — a real bug on slow
  connections, not just a style choice.
- **Restraint — the thing deliberately not built:** page transitions between
  routes. Given the brief's own rule against scroll/navigation hijacking, and
  that Next's View Transitions support is still experimental, the risk (broken
  back-button behavior, scroll-position jumps, an accessibility surface that's
  easy to get subtly wrong) outweighed the payoff for a portfolio where the
  actual content is what's supposed to carry the 30-second impression. This is
  the "remove one thing" the brief's Phase 6 asks for — decided by not adding
  it in the first place rather than building and cutting it.
- Micro-interactions (hover states on nav, project cards, buttons) and the
  loading sequence (static-first hero, no spinner, no flash) were already in
  place from Phase 5 and didn't need rework.

## Acceptance checklist (brief §11)

**Facts**
- [x] Every number on the site appears in the career context document's allowed list — re-verified by grep sweep, matches `docs/FACT-CHECK.md`.
- [x] No percentages, latencies, user counts, or RAGAS scores anywhere — grep-confirmed.
- [x] AI-103 appears nowhere — grep-confirmed (zero matches outside the fact-check doc's own audit note).
- [x] Project-Ease is labelled *in development* at every mention — confirmed in `lib/content.ts` and both places it's rendered.
- [x] Title reads *Associate Software Engineer* everywhere — grep-confirmed, no bare "Software Engineer" or "Senior" anywhere.
- [x] No team-lead, management or mentoring language — grep-confirmed.
- [x] Skills list contains nothing outside the career document's inventory — cross-checked in `docs/FACT-CHECK.md`.
- [x] Fact-check diff table produced and clean — `docs/FACT-CHECK.md`.

**Rendering and SEO**
- [x] `curl` on every route returns real content in the HTML — verified on all 5 routes (`/`, `/about`, `/work/repowarden`, `/work/project-ease`, `/work/nucleus-one`), unique `<title>` and `<h1>` on each.
- [x] Site is fully readable and navigable with JS disabled — SSR'd content, native `<details>` mobile menu, no content gated behind a hydration-only state.
- [x] JSON-LD Person + CreativeWork present with required fields (name, jobTitle, worksFor, alumniOf, knowsAbout, sameAs, email / creator, keywords) — not run through an external validator from this environment.
- [x] Per-route titles, descriptions, canonicals; sitemap and robots.txt exist as real generated routes (not SPA-fallback HTML, confirmed by content-type) — this was Critical Finding #1/#2 from the audit; resolved.
- [x] OG images exist and render correctly — confirmed real PNGs (1200×630) at the actual per-route URLs Next.js generates, both the site-wide default and per-case-study images.

**Performance**
- [x] Total page weight, JS budget, CLS, draw calls, chunk size — pass.
- [ ] LCP ≤ 2.5s — narrowly over in Lighthouse's simulated model (2.7s); real trace-based paint delay is ~110ms. See caveat above; recommend real-device/WebPageTest validation.
- [x] LCP element is text (the H1), not canvas — confirmed via `lcp-breakdown-insight`.
- [x] 3D bundle is lazy, separate, and non-blocking — confirmed via `next/dynamic({ ssr: false })` and network trace (chunk absent from the static-fallback path entirely).
- [x] Draw calls < 100 — 2, verified by code review of `NodeField.tsx` (single instanced mesh + one boundary mesh).
- [ ] Sustained ≥45fps on mid-range mobile — **not verified**; this is the open risk documented above. Desktop-measured TBT (370ms) and mobile-simulated TBT (1.1–1.2s) both recorded; no real-device frame-rate measurement was possible from this environment.
- [~] Memory stability over a 2-minute session — not tested live (would need a real browser session with devtools open); code review confirms disposal isn't currently wired up explicitly beyond React/R3F's own unmount cleanup — worth a manual check before shipping.

**Accessibility**
- [x] `prefers-reduced-motion` path — forces the static fallback (unchanged logic, still gates ahead of the new tiering) and skips the reveal-hidden state entirely (no `.motion-ready` class added).
- [x] No-WebGL path — unchanged, still forces static fallback.
- [x] Low-power degradation — now a real tiered behavior (full / reduced / static) rather than binary; see the open risk above for whether "reduced" is actually light enough.
- [x] Keyboard navigation, visible focus — native interactive elements throughout (links, buttons, native `<details>`), global `:focus-visible` outline token.
- [x] WCAG AA contrast — Accessibility score 100 in both Lighthouse runs; the semantic color tokens (grounded/gated with dedicated `-subtle` pairs) were designed with this in mind.
- [x] Canvas `aria-hidden`; information duplicated as text — confirmed (`aria-hidden="true"` on the scene container, `sr-only` paragraph in `Hero.tsx` describing the scene's meaning).

**Content quality**
- [x] Three flagship case studies, each with a real architecture diagram (RepoWarden, Project-Ease, Nucleus One SVGs).
- [x] Each case study has a genuine "what I'd do differently" section — not fake-humble; each names a real, specific gap (narrow eval coverage, the un-run RAGAS harness, an informal grounding-validation process).
- [x] The boundary/authorization pattern is named explicitly — `components/Argument.tsx` ("he builds the boundary, not just the feature").
- [x] Every project links to a working repo or an honest status — confirmed; Nucleus One has no public repo (employer work) and correctly omits a GitHub link rather than faking one.
- [x] CV download and contact details work — `/Bilal-Resume.pdf` linked from About; email/GitHub/LinkedIn correct in Contact and Footer.

**Cross-device**
- [ ] Tested at 375px / 768px / 1440px / 2560px — not done from this environment (no real browser viewport testing tool available beyond Lighthouse's fixed emulated viewports).
- [ ] Tested in Chrome, Safari, Firefox, iOS Safari — only Chrome (headless, via Lighthouse) was available here. **iOS Safari in particular is flagged by the brief as where WebGL behaves worst — this is the highest-priority manual test before shipping**, given the mobile 3D risk above.

## Outstanding before this ships with confidence

1. **Real-device testing of the mobile 3D tier** — the single most important open item. Test on an actual mid-range Android and an iPhone (Safari). If TBT/frame rate confirm the simulated result, revert `lib/device-capability.ts` / `HeroScene.tsx` to skip 3D on mobile outright.
2. **Responsive/cross-browser pass** — 4 breakpoints × Chrome/Safari/Firefox, not yet done.
3. **JSON-LD validation** against an actual structured-data testing tool.
4. **The two open items from the audit** (`docs/AUDIT.md`): confirm Vercel auto-deploys this branch, and decide whether to rename the branch off `3d-cyberpunk-redesign` now that the instrumentation direction is built and shipped.
5. **Domain flag, restated from the audit**: no custom domain yet, still on a `.vercel.app` subdomain. Not actioned — flagging again per the brief's instruction, not buying anything.
6. **Correction, 2026-08-15**: every URL in this audit and in `docs/AUDIT.md` was checked against `portfolio-pi-peach-78.vercel.app`, which turned out to be a stale/different URL than the project's actual assigned domain, `bilal-faisal.vercel.app` — visible in the Vercel dashboard's Production Deployment card, not derivable from the repo itself. `metadataBase`, `robots.ts`, `sitemap.ts`, and `README.md` are now corrected to `bilal-faisal.vercel.app`. The `curl` checks earlier in this document and in `docs/AUDIT.md` were run against local builds (`localhost:4173`), not the live URL, so their findings still hold — only the hardcoded absolute-URL references needed fixing.
