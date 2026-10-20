# Fruity Slider — React Conversion TODO

Status: implemented in Forma. See README.md for the API and performed checks. Some extended verification items below remain open; they are not claims of completed testing.

## Goal

Turn the supplied vanilla-JS product slider into a reusable `FruitySlider` React/TypeScript component in Forma. Preserve its distinctive can, moving label, oversized flavor name, and floating fruit composition while improving responsiveness, control behavior, accessibility, and motion quality.

## What the original does

- Three bounded slides: Pear, Apple, and Exotic. Previous/next buttons move a horizontal scene track and a three-frame label image masked to a can silhouette.
- The HTML loads GSAP **3.9.1** from a CDN. GSAP controls fruit entrances, continuous fruit drift, and heading/logo changes. Track movement, label movement, and button waves are CSS-based.
- **No ScrollTrigger is used.** This is a button-driven slider; no smooth-scroll engine or scroll-driven mode is required for the conversion.
- There are 14 unique remote image URLs: one can SVG, one label atlas, and 12 fruit cutouts. Font Awesome supplies the two chevrons; Lexend loads from Google Fonts. Asset availability and actual browser rendering have not been checked yet.
- Current source: [HTML](original/index.html), [JavaScript](original/script.js), [CSS](original/style.css). These copies remain unchanged. Findings below are from static inspection, not a browser or performance measurement.

## Confirmed source findings

| Source | Line | Finding / conversion implication |
| --- | --- | --- |
| HTML | 11 | Duplicate body opening and missing viewport meta; repair in JSX/host configuration. |
| JS | 31 | Parallel indices and position state; replace with one bounded slide index. |
| JS | 11 | Entry tweens select every slide, including hidden ones; scope to the incoming slide. |
| JS | 19 | All fruit images animate indefinitely; animate active content only and pause hidden/offscreen work. |
| JS | 67 | Neighbor lookups return undefined at the ends; derive validated controls and visuals from slide data. |
| CSS | 14 | Global body scroll lock prevents normal page embedding. |
| CSS | 30 | Global focus reset removes keyboard focus visibility. |
| CSS | 52 | Viewport-specific oversized heading and important declarations; use fluid, container-aware type. |
| CSS | 168 | Hard-coded three-viewport track cannot fit an arbitrary component container or slide count. |
| CSS | 108 | Broad transitions and animated left properties compete with precise choreography; use explicit properties and one animation owner. |

## P0 — Foundation and asset preparation

- [x] Read all three supplied files and preserve byte-identical originals in `original/`.
- [x] Identify the GSAP/CSS responsibilities and confirm that ScrollTrigger is absent.
- [ ] Inspect the original in a temporary browser preview before changing the composition; establish a visual baseline at desktop and phone sizes without modifying the source.
- [x] Verify all 14 image URLs, intrinsic sizes, alpha/mask behavior, and the label atlas frame boundaries. Use an intentional local asset set for the implemented demo when available; avoid a production component dependent on arbitrary remote demo URLs.
- [x] Preserve the three-frame masked label effect in the first demo. Keep this atlas mapping in a demo adapter; the reusable component should also support a product image per slide, so adding a fourth product does not require rewriting the component or stretching the original atlas.
- [x] Verify current package compatibility before adding only the needed `gsap` and, if chosen, `@gsap/react` dependencies at the root workspace. Do not copy the old CDN script, install extra plugins, or add ScrollTrigger merely because GSAP is used.

## P1 — React model and component boundaries

- [x] Create `packages/ui/src/fruity-slider.tsx`, export its component and types from `packages/ui/src/index.ts`, and put scoped shared styles in `packages/ui/src/styles.css`.
- [x] Define typed slide data: stable ID, display name, accessible product description, product artwork, decorative fruit artwork, and optional visual treatment. Keep sample data and source-specific atlas mapping outside the reusable behavior.
- [x] Use one bounded active index and one transition controller. Keep animation objects/continuous values in refs, not React state updated every frame. Start with uncontrolled local state and an optional change callback; add a controlled API only if a real consumer needs it.
- [x] Derive track length and valid targets from the slide array. Do not carry over the source's unused `index`/`waveEffect` or separate `currentPosition` counter.
- [x] Handle zero slides with a deliberate empty state and one slide without unnecessary navigation. Keep previous/next controls mounted with correct disabled states at boundaries rather than removing the focused button.
- [x] Use the implemented rapid-input policy: interrupt and retarget one travel timeline from its current position. The requested index drives controls/caption; scene/title and label travel together, while announcements and callbacks wait for settlement. Never stack animation queues.

## P1 — Scoped motion and a better wave

- [x] Use a root ref and a scoped GSAP lifecycle (`useGSAP` or `gsap.context` plus revert). Clean up owned timelines, matchMedia, observers, listeners, and pending work on unmount; verify React Strict Mode and two simultaneous instances.
- [x] Use one transition timeline for the scene track (including headings/fruits) and masked labels. Fruit drift has its own inner wrapper and lifecycle; avoid extra entry tweens that compete for transforms.
- [x] Move tracks with transforms, with offsets based on actual component/frame dimensions. Remember that GSAP `xPercent` is relative to the animated element: a full-width slide and an N-slide-wide track do not use the same percentage step.
- [x] Animate only the current/incoming/outgoing content as needed. Pause idle drift while offscreen or the document is hidden, and avoid running hidden slides continuously. Use gentle bounded motion with a restrained easing rather than a sharp linear turnaround.
- [x] Replace the three duplicated box-shadow wave keyframes with a scoped pseudo-element ring using scale and opacity. Trigger it on hover-capable pointer interaction, focus, or activation rather than an endless attention-seeking pulse.
- [x] Provide a local pause control for any continuing decorative motion and honor Forma's shared pause control. Under reduced motion, show a complete stable slide immediately; disable travel/drift/waves rather than freezing content offscreen.

## P1 — Responsive composition and Forma alignment

- [x] Size the component from its own container, not `100vw`, `300vw`, or fixed page coordinates. Keep overflow clipping inside its scene stage; preserve normal document scrolling. Remove global element selectors, negative stacking tricks, and imported focus/reset rules.
- [x] Use `clamp()` and container-aware sizing for the title, can, and fruit. Reserve the product's aspect ratio so image loading cannot shift the layout. Support a narrow component in a wide page as well as a full-width section.
- [x] Wide layout: centered product, balanced fruit framing, readable flavor name, controls inset inside the component. Constrain the composition on ultrawide screens instead of scaling everything indefinitely.
- [x] Narrow layout: dedicated bottom control row, smaller can, readable title, and fewer visible decorative fruit pieces if needed. Do not shrink critical controls below 44px or let fruit block product text or navigation.
- [x] Short/landscape layout: allow a content-driven height or page scrolling; avoid viewport-locking a composition that clips controls. Use dynamic/small viewport units only for an intentionally full-screen variant.
- [x] Reuse Forma typography, spacing, radius, focus, surface, and motion tokens. Keep real fruit/packaging colors in the artwork; expose any slide-specific wash as explicit component tokens with contrast checks. Default controls/chrome follow the active Forma accent instead of introducing a separate button palette.
- [x] Keep the original playful product identity. Improve crop, scale, hierarchy, and control finish before adding pointer tilt, extra gradients, or a new visual language.

## P1 — Interaction and accessibility

- [x] Use semantic native buttons with names such as Previous flavor and Next flavor, visible focus, and stable focus during changes. Use the existing icon approach rather than a global Font Awesome stylesheet for two arrows.
- [x] Add left/right keyboard navigation within the slider without hijacking inputs or page shortcuts. If RTL is supported, explicitly define arrow/swipe direction and preserve the host page's direction.
- [x] Add touch swipe as an enhancement with intent thresholds, pointer cancellation, and vertical page-scroll preservation. Retain button and keyboard alternatives; do not make dragging the only operation.
- [x] Keep one meaningful product description accessible; fruit cutouts are decorative. Hide inactive interactive content appropriately and use one concise polite slide announcement, such as Apple, 2 of 3, after a user-triggered transition.
- [x] Add clearly labeled position indicators if they improve direct navigation. No autoplay by default. Show the first slide's content even if motion setup or image loading fails.

## P2 — Playground, checks, and cleanup

- [x] Add a Fruity Slider entry to the existing playground with meaningful controls: normal/narrow preview, motion on/off, and usage code. Reuse current theme/accent controls; no separate demo app or node_modules folder.
- [ ] Test 320/390/768/1024/1440px widths, a narrow embedded container, a short landscape viewport, enlarged text, both themes, and all three accents. Check long flavor names, missing images, empty/single slides, and alternate slide counts.
- [ ] Verify rapid next/previous inputs, boundaries, swipe versus vertical scroll, keyboard focus, reduced motion, pause, resize mid-transition, unmount/remount, multiple instances, and asset/mask failures.
- [x] Run the appropriate TypeScript, playground, and package builds. Add focused behavioral checks for bounds/queued navigation only where they catch meaningful regressions; do not claim performance improvements without measurements.
- [x] Update component usage and record the performed checks. Remove temporary previews and disposable build outputs after verification; preserve the original files.

## Definition of done

The slider is available through `@forma/ui`, works inside a responsive page without changing global styles or locking body scroll, keeps its can/label character, follows Forma's design tokens, and remains usable with keyboard/touch and reduced motion. Slide content and animation stay synchronized at boundaries and under rapid input. No unnecessary ScrollTrigger, global state library, extra app, or unverified testing claims.

## Deferred until requested

Scroll-driven storytelling, autoplay, full physics-based dragging, and a fourth-product artwork redesign are separate enhancements. They are not prerequisites for a polished responsive version of this slider.

## Implementation and verification record — 2026-10-20

- Added exported React/TypeScript component, scoped styles, GSAP 3.15.0 workspace dependency, local demo assets, fifth playground entry, usage example, and component README. No ScrollTrigger or secondary app was added.
- Original desktop composition was visually inspected. The source phone baseline was not separately completed; the adapted narrow layout was tested.
- All 14 local images loaded with their intrinsic dimensions. Atlas: 1908 × 1164 (three 636px-wide frames); mask: 318 × 582. Product and mask failures were exercised with intentional missing fixture assets.
- Browser checks: rapid reversal, boundaries, direct selection, keyboard arrows, local/global motion behavior, resize during travel, Strict Mode mount/unmount, independent instances, zero/one/four slides, long names, 320/390/768/1024/about-1400px containers, both themes, all accents. Live playground console had no warnings/errors.
- Travel uses GSAP percent transforms, so resizing preserves the target. Rapid navigation retargets instead of queueing; this is the deliberate change from the initial planned finish-then-queue policy.
- Reduced-motion, visibility observers, touch intent thresholds, pointer cancellation, and vertical pan allowance are implemented. Physical touch, OS reduced-motion, enlarged text, short landscape, and full screen-reader testing remain open. No measured performance claim.
- Temporary browser fixtures and disposable build outputs are removed after verification. Original files remain unchanged.

## Composition refinement — 2026-10-20

- [x] Reserve a clear heading area above the can; soften the flavor typography and prevent product overlap.
- [x] Give flavor names an independent vertical exit/entry inside a clipped title area, coordinated with existing GSAP travel and safe under rapid reversal/pause.
- [x] Rebalance fruit into a diagonal composition: large lower-left piece, smaller upper-right piece, restrained supporting pieces on wide layouts.
- [x] Show only the two main pieces in narrow containers; keep artwork inside the stage and controls clear.
- [x] Verify desktop/narrow layouts, all flavors, rapid reversal and pause; run the required build and remove disposable build outputs.

Refinement checks: browser screenshots at a wide desktop viewport and a 390px embedded container; Pear/Apple/Exotic navigation, rapid reversal, heading opacity/transform settlement, title/product bounds, and paused instant navigation. TypeScript and both builds passed. No additional physical-device or reduced-motion verification is claimed.

## Correct fruit entrance — 2026-10-20

- [x] Move decorative fruit out of the horizontally translated scene track.
- [x] Restore a separate bottom-up, staggered entrance, with separate placement/entry/float transform owners.
- [x] Retarget rapid reversals and settle the complete active slide when motion is disabled.
- [x] Browser checks: stationary fruit layer, positive vertical entry displacement, zero final displacement, hidden outgoing layers, rapid reversal, and 390px preview with pause during entry. Required builds passed. Physical touch remains unverified; touch and button navigation share the same transition controller.
