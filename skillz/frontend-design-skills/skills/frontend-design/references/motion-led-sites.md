# Motion-led websites

Adapted from Meng To's build-awwwards-quality-sites on 2026-10-20. Copyright (c) 2026 Meng To. The [MIT license](awwwards-MIT-LICENSE.txt) applies to this contribution; the parent Anthropic guidance retains its own license. Pinned source and checksums are in the collection manifest.

## When to use

Read this reference when the brief calls for cinematic, interactive, scroll-driven storytelling, or explicitly asks for Awwwards-quality work. A request to merge this skill into the collection does not activate it for every later task. Ordinary application UI, a small component fix, or an Apple-inspired restrained interface should keep the established motion language.

Use the parent frontend-design skill's accepted visual direction and tokens. Add a short motion plan: focal moment, section pacing, static fallback, animation owner, scrolling decision, and whether WebGL adds something useful. Do not generate a competing identity or require a second design skill.

## Media and composition

- Learn hierarchy, contrast, pacing, and image treatment from references. Create original compositions for new identities. Respect user-owned assets, licensed resources, and authorized fidelity work; do not introduce a blanket ban on reusing the user's existing components.
- Keep a clear primary message and action usable from the first frame. Decorative motion must never gate navigation or essential content.
- Choose generated imagery or appropriately licensed media when it helps the concept. Record provenance and usage rights; define aspect ratio, crop, alt text, loading strategy, and missing-media fallback.
- Retain the project's icon family. Solar through Iconify is an option when none exists, not a mandatory new dependency. Use real-company marks only in truthful contexts. Do not invent customers, endorsements, partnerships, or awards.
- Prefer real authorized photos when presenting real people. Initials and neutral fallbacks are valid in product UI and explicitly fictional demos; never present synthetic people as real endorsers. Choose illustration techniques to suit the established asset system and available tools.

## Animation and scrolling

If GSAP is chosen, use [GSAP technical integration](gsap/index.md) for the implementation; the visual brief and principles here still govern the result.

- CSS handles simple hover, focus, and tap feedback. Use an existing suitable animation system first; consider GSAP for coordinated timelines or ScrollTrigger when the brief warrants it. Do not install GSAP for an isolated transition.
- Default to native scrolling. If custom smooth scrolling contributes to the experience, select at most one engine, such as Lenis, Locomotive Scroll, or ScrollSmoother; do not initialize competing engines. Integrate it with ScrollTrigger if used, refresh measurements after fonts/media settle, and tear down subscriptions and instances on unmount.
- Give each animated property one owner. Reserve pinning, scrubbing, and text splitting for a specific narrative purpose rather than applying the same reveal everywhere.
- For split-text effects, preserve one coherent accessible name, hide decorative fragments from assistive technology, and avoid splitting links or meaningful inline markup. Keep unsplit content available without JavaScript.
- Under reduced motion, bypass smooth scrolling, pinned/scrubbed choreography, and decorative intros; show complete final states immediately. Do not leave essential content paused at an invisible first frame.
- Pointer effects are optional enhancements. Support touch, coarse pointers, keyboard use, focus changes, window blur, and document visibility changes.

## Optional WebGL

Use Three.js or shaders only when depth or an image interaction serves the concept. Keep semantic text and controls in the DOM. Supply a static poster for reduced motion, unavailable WebGL, or context loss.

Cap pixel ratio, avoid per-frame allocation, throttle pointer work, and pause rendering offscreen or while hidden. Dispose frames, observers, listeners, render targets, textures, geometries, materials, and the renderer.

## Targeted verification

For implemented sites, run the applicable production build and inspect desktop and phone layouts, keyboard focus, touch behavior, reduced motion, static content, media failure, and resource cleanup. Do not run application builds for a documentation-only skill merge. Verify that custom scroll initialization has one owner and animation systems do not fight over properties. Report what was actually checked and any remaining limitation; describe the work's quality without claiming recognition it has not received.
