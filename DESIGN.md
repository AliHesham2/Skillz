# Forma design system

Forma is our shared React component language: calm, precise, soft, and familiar. Inspired by Apple's restraint, without copying its branding or proprietary assets.

## Source of truth

`packages/ui/src/styles.css` defines semantic tokens, primitives, and shared motion. `packages/ui/src/index.ts` is the public component API. Playground-only layout belongs in `src/playground.css`.

- Use `--background`, `--card`, `--foreground`, `--muted`, `--muted-foreground`, `--border`, `--primary`, and `--primary-foreground`. Never hard-code interface colors inside new components.
- Default light theme: porcelain #f5f5f7, white cards, ink #1d1d1f, secondary text #65656d, blue accent #0066cc. Dark and alternate accent tokens are defined alongside it.
- Use the native system sans stack. Body 16px / 1.5; supporting text 12–14px. Labels below 12px are limited to nonessential metadata. Display headings use tight tracking and a clear hierarchy.
- Spacing follows 4px increments. Card corners are 20px; controls use pills or 10–12px corners. Borders are fine, shadows diffuse, and blur limited to translucent chrome.
- Feedback uses 180–250ms transitions. Animate opacity and transforms. Avoid constant motion outside purpose-built showcase components. Honor reduced motion and the shared pause control.
- Keep text contrast at least 4.5:1, provide visible focus, label every control, reserve image sizes, and aim for 44px touch targets.

## Adding a component

1. Preserve the original supplied source and prompt in `components-library/<name>/`.
2. Create the adapted implementation in `packages/ui/src/`. Use relative imports inside the package.
3. Compose shared primitives and semantic tokens. Support both themes and every accent; avoid adding a private palette.
4. Export the component and its props from `index.ts`; add a playground entry, meaningful controls, and an import example.
5. Verify keyboard access, reduced motion, empty data, narrow screens, theme contrast, and the library build. Keep decorative duplicates out of the accessibility tree.
6. Document adaptations and any unverified source rights. Keep source archives unchanged.

## Current adaptations

Tilted Grid Hero keeps the supplied cylinder geometry and animation, with safe numeric bounds, corrected layout equality, shared pause support, and per-facet edge culling to prevent strips behind the camera from flashing back into the viewport. Demo artwork is local SVG data generated for this playground, with no remote image dependency.

Testimonials adapts the supplied multi-column 3D marquee concept into a token-based implementation. It uses fictional sample quotes and initial avatars, hides repeated decorative cards from assistive technology, exposes a single accessible text list, and supports pause and reduced motion. It does not expose the original unimplemented autoFill prop.

## Interactive additions — 2026-10-20

Lift Button adds an accent fill that grows from the arrow side and a diagonal arrow handoff. Hover is fine-pointer-only; keyboard focus has equivalent visible feedback. Feedback retargets through CSS transitions and inherits the palette. Native disabled and loading states remain usable and named.

Studio Hero pairs left-aligned copy with an interactive workspace in the same system. Stage buttons and task checkboxes work; the preview is explicitly a demo. No illustration or remote asset is required. It stacks by container width and retains complete content without motion.

Tilted Grid Hero's sample composition places the image band below its text. Testimonials has its own pause control and empty-data state, with duplicate visual cards hidden from the accessibility tree. The playground now has hash-addressable component views and six component examples.

## Fruity Slider

Fruity Slider preserves the supplied can silhouette, moving label atlas, and playful fruit composition. Slide wash/ink are explicit artwork treatments; navigation, caption, focus, pause, and surfaces use Forma tokens. Container queries give narrow embeds a dedicated stacked layout. GSAP owns track/label travel and active-fruit drift on separate wrappers. Only GSAP core is installed; the library build keeps it external as a declared dependency.

Fruity flavor headings now have a reserved space above the can, with independent vertical transitions. Fruit uses diagonal hierarchy; narrow containers retain only the two primary pieces.

## Wildlife Slider and expanded previews

Wildlife Slider uses an explicit on-photograph white-text/dark-scrim treatment, keeping navigation and pause colors on Forma tokens. Content, thumbnail rail and controls occupy distinct grid regions; narrow containers stack them. Persistent image cards change their actual geometry with the source’s one-second CSS ease: Next expands a thumbnail while the rail shifts; Previous shrinks the outgoing background to a thumbnail. Copy preserves the source blur/vertical stagger. This is an intentional, scoped geometry-animation exception to the default transform/opacity preference. Reduced motion and pause yield complete static content. Autoplay is opt-in.

All component views share a preview workbench. Its diagonal arrow expands the existing preview into a native full-window modal with inherited tokens, background isolation, scroll locking, Escape dismissal and focus restoration. Component state is preserved. Minimum content sizes take precedence over forcing everything into a short viewport.

Fruity fruit layers are outside the horizontal background track. Next brings fruit down from above; Previous brings it up from below. Entry wrappers remain separate from placement rotation and inner idle drift. Stationary ground shadows fade in beneath the floating pieces. This preserves independent motion instead of carrying fruit sideways with the scene.


Forma hides component-local motion buttons using `showControls={false}` on Fruity Slider, Wildlife Slider and Testimonials. The preview toolbar remains the single visible motion control; standalone components retain their default controls.

Tilted Grid Hero applies its edge mask on a separate outer layer, leaving perspective on an unmasked inner scene. This avoids combining masked compositing and 3D projection in compact collection previews.


On wide containers, Wildlife preview cards form a compact bottom-right rail capped at 480px total width. Its bottom edge shares the navigation baseline, exposing more of the main photograph. Narrow containers retain the stacked rail and controls.
