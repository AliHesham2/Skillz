# Fruity Slider

A reusable React product carousel in `@forma/ui`, adapted from the supplied vanilla GSAP slider. The original three files are preserved unchanged in [original/](original/). [TODO.md](TODO.md) records the conversion plan and actual verification.

The live component is `packages/ui/src/fruity-slider.tsx`. Sample data lives in `src/fruity-demo.ts`; the 14 original assets are local under `public/fruity/`. The package itself has no remote artwork, font, or CDN dependency.

```tsx
import { FruitySlider, type FruitySlide } from '@forma/ui';
import '@forma/ui/styles.css';

const slides: FruitySlide[] = [
  { id: 'pear', name: 'Pear', description: 'Fresh green pear.',
    productImage: '/products/pear.png',
    fruits: ['/products/pear-cutout.png'] },
  { id: 'apple', name: 'Apple', description: 'Crisp red apple.',
    productImage: '/products/apple.png' },
];

<FruitySlider slides={slides} onChange={(index, slide) => {
  console.log(index, slide.id);
}} />
```

## API

- `slides`: stable, unique `id`, `name`, `description`, optional transparent `productImage`, up to four decorative `fruits`, and optional `wash`/`ink` scene colors. Keep custom color pairs readable. Artwork is decorative; name and description supply accessible content.
- `initialIndex`: finite, bounded starting position; defaults to zero. This is an uncontrolled component. Later changes to this prop do not navigate.
- `paused`: stop decorative movement and make navigation immediate. Also supplies a local pause control. Pass the host application's global pause state into this prop.
- `onChange`: fires after a user-requested destination settles. Interrupted destinations do not emit completion events; changing pause or parent props does not repeat the same completion.
- `labelAtlas`: optional `{ src, mask, frames }` for a horizontal atlas and silhouette/shading image. A slide's `labelFrame` selects its frame. This is an alternative to individual product artwork; missing atlas images fall back to the per-slide image or a name card.
- `className`: host layout customization.

The demo's atlas has three 636 × 1164 frames, with a 318 × 582 mask. Supply individual product images for arbitrary new products. No third-party icon font or Google Font is loaded.

Navigation uses buttons, direct flavor selectors, scoped left/right keys, or a horizontal touch/pen swipe. The scene is explicitly left-to-right even inside an RTL page. Vertical touch scrolling remains available. There is no autoplay. Rapid requests interrupt and retarget the single travel timeline from its current position rather than queuing animation sequences. The active caption and indicators show the requested destination; the polite announcement and callback wait for completion.

Motion is scoped per instance, cleaned up on unmount, and disabled by reduced-motion preferences. Only active fruit drifts; offscreen/hidden-document drift pauses. Empty arrays show an empty state; single slides omit navigation. Failed product images show a name card, and failed fruit images disappear.

## Verification

TypeScript, production playground, ESM library, and declaration builds passed. Browser checks covered local assets, rapid reversal, boundaries, direct selection, keyboard arrows, pause, resize during travel, Strict Mode remount, independent instances, zero/one/four slides, long names, and missing product/mask artwork. Container checks included 320, 390, 768, 1024, and approximately 1400px; light/dark themes and blue/violet/green accents were exercised.

Physical touch gestures, operating-system reduced motion, enlarged text, and a full assistive-technology audit remain unverified. No performance benchmark is claimed.

## Composition refinement

Flavor names sit in a reserved area above the product, with lighter typography and clipped vertical transitions independent of horizontal scene travel. The same owned GSAP timeline coordinates title exit/entry with can labels. Fruit follows a large lower-left / small upper-right diagonal, with two subdued support pieces on wide layouts and only the two primary pieces in narrow embeds.

## Fruit entrance correction

Fruit layers are stationary siblings of the background track. A placement wrapper defines each piece’s composition, a separate entry wrapper rises from below the stage with a short stagger, and the inner float wrapper owns idle drift. Outgoing fruit exits downward. Rapid reversals retarget the current vertical positions; pause/reduced motion immediately settles only the active layer. Browser checks confirmed zero horizontal fruit translation, positive vertical entry displacement settling to zero, hidden outgoing layers, rapid reversal and 390px pause behavior.
