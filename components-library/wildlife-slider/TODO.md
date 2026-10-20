# Wildlife Slider conversion TODO

## Source review

The supplied slider uses vanilla JavaScript and CSS, not GSAP. It reorders DOM children to expand the second card as the active background, with automatic advancement every seven seconds. Eleven remote photographs are referenced.

Confirmed issues: nested duplicate HTML documents; a missing main.js reference; inactive navigation/CTA links; global CSS resets; viewport-sized layout instead of component sizing; text/thumbnail overlap on narrow screens; disabled focus outlines; arbitrary first-active item (second DOM child); forced layout reads; hard-coded progress duration; unowned timers without cleanup; no pause, visibility or reduced-motion support; background photos without semantic alternatives.

## Implementation

- [x] Preserve supplied source and download/verify the original demo photographs locally.
- [x] Export a typed reusable WildlifeSlider with stable slide IDs, image descriptions, optional real action URLs, explicit first slide, circular navigation and zero/single-slide states.
- [x] Preserve the photographic background and expanding-thumbnail character with scoped motion; remove fake site navigation and dead CTAs. Give images readable text scrims and an intentional error fallback.
- [x] Use a responsive composition with non-overlapping copy, thumbnail rail and 44px controls. Support narrow embedded containers, long names and content growth.
- [x] Add direct thumbnail selection, keyboard arrows, polite announcements, optional autoplay (off by default), and pause on hover/focus/offscreen/hidden document/reduced motion. Clean up observers, listeners and timers.
- [x] Add the sixth playground entry, local data, usage example, and useful controls.
- [x] Add a diagonal-arrow fullscreen preview control shared by all Forma component views: full viewport dialog, width controls, motion toggle, Escape/close, focus restoration, and inherited theme/accent. Use the browser native dialog top layer for a full-window preview; preserve the same component instance instead of requesting operating-system fullscreen.
- [x] Verify desktop/narrow layouts, image loading, navigation/reversal, pause, fullscreen open/exit/Escape, focus, theme, and required builds. Record unverified checks honestly and remove temporary build outputs.

## Verification record — 2026-10-20

- Original index.html, script.js, and style.css were copied byte-for-byte; hashes matched the supplied files. All eleven downloaded photographs decoded in the browser (1920px intrinsic width).
- TypeScript, playground production build, library build, declarations, and built-export server-render checks for zero/one/multiple slides passed.
- Browser checks: 320/390/768/1024px component widths, desktop composition, all eleven slides and circular wrap, rapid reversal, keyboard arrows, direct thumbnail selection, long names, missing-image fallback, zero/one/multiple slides, photo-details control, autoplay advancement and pause, multiple instances and Strict Mode unmount/remount.
- Shared workbench: Wildlife and Fruity state retained across expansion; native modal isolation, body scroll locking, exact viewport dimensions, Escape, close arrow, focus return, dark/violet theme inheritance, and 320px modal overflow checked.
- A stale Vite development stylesheet was resolved by restarting the server; fresh browser rendering was checked after restart.
- Full-screen means the browser viewport; browser chrome remains under the user's control. A short/narrow viewport may scroll vertically to retain readable content and usable controls.
- Physical touch/swipe, OS reduced-motion, a full screen-reader audit, and measured performance remain unverified. These features have implementation support, not physical-device certification.
- Temporary fixture files and disposable build outputs removed after verification. The root dependency installation remains shared.

## Restore source motion — 2026-10-20

- [x] Replace the rejected clip-path reveal with one persistent image card per slide.
- [x] Restore one-second geometry expansion, reverse shrink, rail movement and source stagger/blur timing.
- [x] Measure responsive target boxes and retain native transition retargeting for rapid inputs.
- [x] Prevent hidden-overflow focus scrolling from moving the composition; align mobile images and hit targets.
- [x] Verify intermediate/full/shrinking card geometry, rapid reversal, 390px preview and pause; run required builds. Original browser baseline URL was blocked by the client; source CSS/JS was used as the reference.
