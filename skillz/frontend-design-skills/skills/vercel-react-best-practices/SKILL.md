---
name: vercel-react-best-practices
description: React and Next.js performance optimization guidelines from Vercel Engineering. Use for implementing or reviewing React/Next.js performance-sensitive components, data flows, rendering behavior, or bundle size. Match rules to the installed framework and React version; do not trigger a broad optimization pass for copy-only or styling-only edits.
license: MIT
metadata:
  author: vercel
  version: "1.0.0"
---

# Vercel React Best Practices

> Local adaptation (2026-10-20): added scope/compatibility rules and removed the duplicate compiled guide and authoring template. Detailed upstream rule files are retained unchanged. Upstream declares MIT in SKILL.md; provenance and hashes are recorded in the collection manifest. No separate license-text file was present in the reviewed upstream tree.

## Collection integration and applicability

- This is the React implementation/performance specialty, complementary to frontend-design's visual and interaction guidance and UI UX Pro Max's research. Reuse the project's components, tokens, and established motion ownership. Do not restyle the product as a performance optimization.
- Read package.json, lockfile, framework, React version, rendering mode, and compiler configuration before selecting rules. For React with Vite, use applicable client/rendering rules; Next.js routing, next/dynamic, server actions, RSC, cache/after APIs, and request-specific rules do not apply unless that architecture exists. Do not migrate the framework to make a rule applicable.
- Read only the matching individual rule files. The quick reference is an index, not an instruction to apply all rules to every task. The original 70-rule set is retained; examples and performance figures are source guidance, not measurements of the user's application.
- Prefer correctness and meaningful bottlenecks over speculative optimization. Do not add memo, useMemo, useCallback, a global store, SWR, a cache, or a helper dependency automatically. Account for React Compiler when enabled and verify installed-version support for useEffectEvent, Activity, resource hints, and other newer APIs. Treat compiler optimizations as something to verify, not a guarantee that every expensive operation is optimized.
- Preserve hook ordering, genuine effect dependencies, stable keys, and component lifecycle. Effect Events are not an escape hatch for suppressing reactive dependencies. Continuous animation values should respect the existing animation driver; use frontend-design's GSAP track only when GSAP is actually chosen.
- Avoid unnecessary sequential independent I/O where the architecture permits parallel work. Preserve authorization, request isolation, error behavior, cancellation, and loading states. Never cache user-specific server data across identities or hoist request state globally just to satisfy a speed rule.
- Keep server/client initial output deterministic when SSR exists. Hydration suppression is a narrowly scoped escape hatch for an unavoidable known difference, not a repair for unstable IDs, random initial data, or hidden content. A client-only Vite app does not need SSR hydration fixes by default.
- Retain valid public package exports. A small tree-shakable library entry such as @forma/ui is not automatically equivalent to an expensive third-party barrel; confirm actual build/import behavior before changing imports. Preserve accessibility and content when using virtualization or content-visibility, and do not mount duplicate interactive copies as a rendering shortcut.
- Respect task scope: a review reports verified findings; a requested repair includes the fix. Run applicable type/build checks after code changes and profile where a performance claim requires it. Do not claim gains from example numbers or run an application build for documentation-only skill maintenance.


Comprehensive performance optimization guide for React and Next.js applications, maintained by Vercel. Contains 70 rules across 8 categories, prioritized by impact to guide automated refactoring and code generation.

## When to Apply

Reference these guidelines when:
- Writing new React components or Next.js pages
- Implementing data fetching (client or server-side)
- Reviewing code for performance issues
- Refactoring existing React/Next.js code
- Optimizing bundle size or load times

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Eliminating Waterfalls | CRITICAL | `async-` |
| 2 | Bundle Size Optimization | CRITICAL | `bundle-` |
| 3 | Server-Side Performance | HIGH | `server-` |
| 4 | Client-Side Data Fetching | MEDIUM-HIGH | `client-` |
| 5 | Re-render Optimization | MEDIUM | `rerender-` |
| 6 | Rendering Performance | MEDIUM | `rendering-` |
| 7 | JavaScript Performance | LOW-MEDIUM | `js-` |
| 8 | Advanced Patterns | LOW | `advanced-` |

## Quick Reference

### 1. Eliminating Waterfalls (CRITICAL)

- `async-cheap-condition-before-await` - Check cheap sync conditions before awaiting flags or remote values
- `async-defer-await` - Move await into branches where actually used
- `async-parallel` - Use Promise.all() for independent operations
- `async-dependencies` - Use better-all for partial dependencies
- `async-api-routes` - Start promises early, await late in API routes
- `async-suspense-boundaries` - Use Suspense to stream content

### 2. Bundle Size Optimization (CRITICAL)

- `bundle-barrel-imports` - Import directly, avoid barrel files
- `bundle-analyzable-paths` - Prefer statically analyzable import and file-system paths to avoid broad bundles and traces
- `bundle-dynamic-imports` - Use next/dynamic for heavy components
- `bundle-defer-third-party` - Load analytics/logging after hydration
- `bundle-conditional` - Load modules only when feature is activated
- `bundle-preload` - Preload on hover/focus for perceived speed

### 3. Server-Side Performance (HIGH)

- `server-auth-actions` - Authenticate server actions like API routes
- `server-cache-react` - Use React.cache() for per-request deduplication
- `server-cache-lru` - Use LRU cache for cross-request caching
- `server-dedup-props` - Avoid duplicate serialization in RSC props
- `server-hoist-static-io` - Hoist static I/O (fonts, logos) to module level
- `server-no-shared-module-state` - Avoid module-level mutable request state in RSC/SSR
- `server-serialization` - Minimize data passed to client components
- `server-parallel-fetching` - Restructure components to parallelize fetches
- `server-parallel-nested-fetching` - Chain nested fetches per item in Promise.all
- `server-after-nonblocking` - Use after() for non-blocking operations

### 4. Client-Side Data Fetching (MEDIUM-HIGH)

- `client-swr-dedup` - Use SWR for automatic request deduplication
- `client-event-listeners` - Deduplicate global event listeners
- `client-passive-event-listeners` - Use passive listeners for scroll
- `client-localstorage-schema` - Version and minimize localStorage data

### 5. Re-render Optimization (MEDIUM)

- `rerender-defer-reads` - Don't subscribe to state only used in callbacks
- `rerender-memo` - Extract expensive work into memoized components
- `rerender-memo-with-default-value` - Hoist default non-primitive props
- `rerender-dependencies` - Use primitive dependencies in effects
- `rerender-derived-state` - Subscribe to derived booleans, not raw values
- `rerender-derived-state-no-effect` - Derive state during render, not effects
- `rerender-functional-setstate` - Use functional setState for stable callbacks
- `rerender-lazy-state-init` - Pass function to useState for expensive values
- `rerender-simple-expression-in-memo` - Avoid memo for simple primitives
- `rerender-split-combined-hooks` - Split hooks with independent dependencies
- `rerender-move-effect-to-event` - Put interaction logic in event handlers
- `rerender-transitions` - Use startTransition for non-urgent updates
- `rerender-use-deferred-value` - Defer expensive renders to keep input responsive
- `rerender-use-ref-transient-values` - Use refs for transient frequent values
- `rerender-no-inline-components` - Don't define components inside components

### 6. Rendering Performance (MEDIUM)

- `rendering-animate-svg-wrapper` - Animate div wrapper, not SVG element
- `rendering-content-visibility` - Use content-visibility for long lists
- `rendering-hoist-jsx` - Extract static JSX outside components
- `rendering-svg-precision` - Reduce SVG coordinate precision
- `rendering-hydration-no-flicker` - Use inline script for client-only data
- `rendering-hydration-suppress-warning` - Suppress expected mismatches
- `rendering-activity` - Use Activity component for show/hide
- `rendering-conditional-render` - Use ternary, not && for conditionals
- `rendering-usetransition-loading` - Prefer useTransition for loading state
- `rendering-resource-hints` - Use React DOM resource hints for preloading
- `rendering-script-defer-async` - Use defer or async on script tags

### 7. JavaScript Performance (LOW-MEDIUM)

- `js-batch-dom-css` - Group CSS changes via classes or cssText
- `js-index-maps` - Build Map for repeated lookups
- `js-cache-property-access` - Cache object properties in loops
- `js-cache-function-results` - Cache function results in module-level Map
- `js-cache-storage` - Cache localStorage/sessionStorage reads
- `js-combine-iterations` - Combine multiple filter/map into one loop
- `js-length-check-first` - Check array length before expensive comparison
- `js-early-exit` - Return early from functions
- `js-hoist-regexp` - Hoist RegExp creation outside loops
- `js-min-max-loop` - Use loop for min/max instead of sort
- `js-set-map-lookups` - Use Set/Map for O(1) lookups
- `js-tosorted-immutable` - Use toSorted() for immutability
- `js-flatmap-filter` - Use flatMap to map and filter in one pass
- `js-request-idle-callback` - Defer non-critical work to browser idle time

### 8. Advanced Patterns (LOW)

- `advanced-effect-event-deps` - Don't put `useEffectEvent` results in effect deps
- `advanced-event-handler-refs` - Store event handlers in refs
- `advanced-init-once` - Initialize app once per app load
- `advanced-use-latest` - useLatest for stable callback refs

## How to Use

Read individual rule files for detailed explanations and code examples:

```
rules/async-parallel.md
rules/bundle-barrel-imports.md
```

Each rule file contains:
- Brief explanation of why it matters
- Incorrect code example with explanation
- Correct code example with explanation
- Additional context and references

## Complete rule details

Read the individual files in `rules/` as needed. The upstream compiled AGENTS.md duplicates these rules and is intentionally omitted from this collection.
