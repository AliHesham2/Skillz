# GSAP technical integration

Technical extracts from the official GreenSock GSAP skills, pinned in the collection manifest. Copyright (c) 2026 GreenSock; [MIT license](LICENSE.txt). These are supporting documents inside frontend-design, not eight additional auto-triggered skills. The skill-document license does not establish the runtime library's current license terms; consult the official terms for any licensing question.

## Selection and precedence

Load this track when GSAP is explicitly requested, already used in the relevant code, or selected for coordinated timelines, controllable sequences, or scroll-linked scenes. Generic animation requests do not automatically select GSAP. A simple hover/focus transition stays in CSS; a suitable installed Motion solution can remain in Motion. This collection addition does not install GSAP or authorize a library migration.

Keep one accepted design and motion system. The parent skill and user/project instructions govern visual choices and scope; these documents supply GSAP-specific mechanics. Apply durations, easing, and movement to the product's established tokens. Read only the technical topic needed for the task; do not load all eight files for one tween.

| Need | Read |
| --- | --- |
| to/from/fromTo, vars, easing, matchMedia | [gsap-core](core.md) |
| Labels, relative placement, nesting, playback | [gsap-timeline](timeline.md) |
| Pin, scrub, trigger boundaries, refresh, custom scrollers | [gsap-scrolltrigger](scrolltrigger.md) |
| Plugin registration, Flip, SplitText, SVG, Draggable, ScrollSmoother | [gsap-plugins](plugins.md), relevant section only |
| Range mapping, snapping, selectors, units, wrap | [gsap-utils](utils.md) |
| React/Next.js, scope, useGSAP, dependencies, cleanup | [gsap-react](react.md) |
| Batching, quickTo, layer and measurement costs | [gsap-performance](performance.md) |
| Vue, Nuxt, Svelte lifecycle integration | [gsap-frameworks](frameworks.md) |

## Cross-library conflict rules

- One owner per element/property. Do not let CSS transitions, Motion, and GSAP simultaneously write the same transform or opacity. Use an explicit wrapper boundary when combining independent effects.
- Use GSAP's own transform aliases and composition rules in GSAP code. Do not import Motion-specific advice about raw transform strings as a GSAP performance requirement. No syntax guarantees GPU execution; profile the actual scene/browser when performance matters.
- Use autoAlpha when hiding the element's visibility is intended. Use opacity when fading must preserve visibility semantics; neither removes an element from the DOM or implements complete focus management. Keep meaningful content accessible.
- Native scrolling remains the default. If smoothing is warranted, choose at most one owner: an existing suitable engine, Lenis, Locomotive Scroll, or ScrollSmoother. Never initialize two. ScrollTrigger is a trigger/control plugin and does not itself require smooth scrolling. Use scrollerProxy only where the chosen scroller's actual integration requires it; native-scroll-based integrations may not need one.
- Respect reduced motion with a complete static state, not hidden content paused midway. Preserve keyboard, touch, and alternate controls for drag/scroll effects. Text splitting needs a coherent accessible name and correct restoration when destroyed or rebuilt.

## Component ownership and cleanup

Check installed gsap, framework, and any @gsap/react versions and official API documentation before using version-sensitive hooks or plugins. Do not add every plugin or framework adapter.

For React, use a scoped useGSAP context when @gsap/react is available, or a scoped gsap.context with a matching revert cleanup. Choose dependency behavior deliberately; use revertOnUpdate when changing inputs should recreate the owned animation. Verify development Strict Mode setup/cleanup and component reuse.

Wrap later GSAP-producing callbacks with contextSafe where appropriate. It records their GSAP objects; it is not a cancellation mechanism for timers, promises, native listeners, or arbitrary callbacks. Remove listeners, cancel pending work, and prevent stale component updates separately. Revert component-owned animations/triggers rather than killing every ScrollTrigger in the application.

Refresh ScrollTrigger after relevant layout/font/media changes; update is not a substitute for recalculating geometry. Tear down any owned matchMedia contexts, smoothing instances, observers, and external subscriptions. Preserve one scroll/ticker integration and avoid global settings inside reusable components unless the application explicitly owns them.

## Verification proportional to the task

For an implemented animation, exercise rapid reversal, repeated mounting, resize/media-query changes, scroll geometry, reduced motion, and keyboard/touch behavior as relevant. Use actual measurements for performance claims. A documentation merge needs reference/provenance checks, not a new npm dependency, running application, or generated preview folders.
