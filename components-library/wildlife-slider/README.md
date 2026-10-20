# Wildlife Slider

A responsive React adaptation of the supplied Animated Slider Webpage. Original files remain unchanged in `original/`; live code is in `packages/ui/src/wildlife-slider.tsx`, with sample data in `src/wildlife-demo.ts` and eleven local photographs in `public/wildlife/`.

```tsx
import { WildlifeSlider, type WildlifeSlide } from '@forma/ui';
import '@forma/ui/styles.css';

const slides: WildlifeSlide[] = [
  { id: 'eagle', name: 'Eagle', description: 'A closer look at the wild.',
    image: '/photos/eagle.jpg', imageAlt: 'An eagle spreading its wings.' },
  { id: 'owl', name: 'Owl', description: 'Quiet moments in nature.',
    image: '/photos/owl.jpg', imageAlt: 'An owl perched on a branch.' },
];

<WildlifeSlider slides={slides} />
```

## API

- `slides`: unique stable `id`, `name`, `description`, `image`, `imageAlt`; optional `objectPosition` and `action: { label, href }`. Actions must lead to real destinations. No placeholder navigation or subscription buttons are included.
- `initialIndex`: uncontrolled initial position, normalized circularly; defaults to the first item. Later changes do not navigate.
- `autoplay`: optional, off by default. `interval` defaults to 7000ms and has a 3000ms minimum. A single owned timeout drives advancement; the progress indicator uses the same duration.
- `paused`: immediate static content and no autoplay. Pass the host application's global motion state here. The component also has its own pause button and respects reduced motion.
- `onChange(index, slide)`: emitted for navigation and automatic advancement. User changes receive a polite announcement; automatic changes do not repeatedly announce content.
- `className`: host layout customization.

Each slide keeps one persistent photograph element. Next expands the upcoming card into the full stage while the rail shifts left; Previous restores the preceding background and shrinks the outgoing photograph into the first card. Absolute card geometry transitions for one second with the original CSS ease, preserving object-fit cover cropping instead of stretching or revealing a separate full-size image. Copy uses the original 100px/33px-blur entrance with 0.3/0.6/0.9/1.2-second stagger delays. The upcoming thumbnail rail provides direct selection. Circular arrows, scoped keyboard arrows and touch/pen swipe are alternatives. Selecting a disappearing thumbnail returns focus to the stable Next story button. Photo details expands the image description. Missing images get a neutral fallback, empty data gets an empty state, and single items omit navigation.

Autoplay pauses during hover, keyboard focus within the component, offscreen/hidden document states, reduced motion and either pause control. Leaving an interruption restarts a complete interval. Observers, media listeners and timeouts are cleaned up. Multiple instances are isolated. Photos and text use a dedicated on-image scrim treatment; controls use Forma's active accent.

## Forma full-screen preview

The diagonal arrow beside the preview toolbar expands the same mounted component into a native modal occupying the browser viewport. Component state, width selection, theme and accent remain intact. Escape or the close arrow exits and restores focus; background interaction and scrolling are blocked while expanded. This is a full-window preview, not an operating-system/browser-chrome fullscreen request. All six component views use the shared workbench.

## Verification

TypeScript, playground production, ESM package and declaration builds passed. Built-export/server-render checks covered empty, single and multiple slides. Browser checks covered desktop and narrow embeds, image loading, direct selection, rapid reversal, scoped keyboard arrows, photo details, missing artwork, long titles, zero/one/multiple slides, theme inheritance and independent instances. Full-screen checks covered viewport dimensions, retained state, background isolation/scroll lock, arrow close, Escape and focus return on Wildlife and Fruity.

Physical-device touch, OS reduced-motion settings and a full assistive-technology audit remain unverified. No performance benchmark is claimed. Original demo artwork and descriptions are supplied sample material.

## Source-motion correction — 2026-10-20

The first adaptation used a clip-path reveal and did not preserve the original card animation. It has been replaced by stable card elements and actual width/height/position interpolation. Offscreen cards stay on the same horizontal rail instead of entering diagonally. Responsive thumbnail hit targets determine destination rectangles; native CSS transitions retarget rapid reversals. The previous photograph remains full-size beneath the incoming card. Non-scrolling overflow clipping prevents focus/autoscroll from displacing the composition. This deliberately uses geometry animation on absolute image cards to preserve the source effect; no frame-rate or compositor-only claim is made.

Compared timing and transition semantics with the supplied CSS/JavaScript. The archived-original browser URL was blocked by the client, so a direct side-by-side browser baseline was unavailable. Browser checks on the adaptation confirmed intermediate expansion/shrink sizes, one image per slide, full-size settlement, rapid reversals, 390px alignment, and immediate pause settlement. Physical-device and reduced-motion verification remain outside these checks.
