# Tilted Grid Hero

Source: the user's supplied integration prompt. The exact catalog URL, author, and component license were not included; record them here when available.

- [Original prompt](prompt-original.txt): complete, unchanged supplied text.
- [Component](code/components/ui/tilted-grid-hero.tsx): animated curved image row built from 16 vertical strips per tile.
- [Demo](code/demo.tsx): supplied image list and hero content.

The code is extracted as supplied. This is a source archive, not a configured or browser-tested React application. Original asset URLs are preserved.

## Integration

Use a React project with TypeScript, Tailwind CSS, shadcn theme tokens, the `@/` alias, and the `cn` helper at `@/lib/utils`. Copy the component to `components/ui/tilted-grid-hero.tsx` (or `src/components/ui/` when `@/` maps to `src/`), then import it as shown in the demo. Keeping reusable components in this folder matches the supplied import and shadcn convention; it is not a React requirement.

No additional runtime packages or context providers are imported by this component beyond React and the existing `cn` helper. It uses `ResizeObserver`, CSS container query units, 3D transforms, masks, and generated CSS animations. Give the hero an explicit height, as the supplied demo does. For a project without the prerequisites, initialize TypeScript and Tailwind using the target framework's supported setup and configure shadcn and the import alias before copying these files.

Required data is an `images` array of `{ src, alt? }`; children provide the foreground content. Optional props control speed, tile height, aspect ratio, gap, row axis, curve, and edge fade. No application state store is required. The image band is decorative (`aria-hidden`), so meaningful image information needs an accessible presentation elsewhere.

## Review before production

- The source pauses tile animations for reduced motion; the opacity transition remains enabled.
- Only `curve` is clamped. Validate finite positive speed, tile height, and aspect ratio, and sensible gap/fade values before accepting dynamic input.
- Layout equality checks omit `limit`; changing curve or dimensions deserves a resize check for stale visibility boundaries.
- Every image is preloaded, with 16 image elements per tile and up to 60 tiles. Check performance with the actual image set and viewport sizes.
- The demo depends on external R2 artwork URLs. Availability and reuse rights have not been verified.

No source fixes, asset substitutions, dependency installation, or browser verification have been performed.
