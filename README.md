# Forma — Design Library

**For any AI agent:** read [skillz/README.md](skillz/README.md) for the library introduction, skill routing, portable usage, and a copyable starter prompt.

One npm workspace, one root dependency installation, one shared design system.

## Try the components

```powershell
npm install
npm run dev
```

Open http://127.0.0.1:5173. The playground includes Tilted Grid Hero, 3D Testimonials, Lift Button, Studio Hero, foundations, theme and accent switching, pause controls, mobile preview, and copyable usage examples.

```powershell
npm run build
npm run preview
```

The build checks TypeScript, builds the playground into `dist/`, and builds the reusable package into `packages/ui/dist/` with JavaScript, CSS, and type declarations.

## Use in another React project

```powershell
npm run build
npm pack ./packages/ui
```

Install the resulting `forma-ui-0.1.0.tgz` in the target project with `npm install <path-to-tgz>`. This is a local private package; it has not been published to npm.

```tsx
import { Button, TiltedGridHero, Testimonials } from '@forma/ui';
import '@forma/ui/styles.css';

export function Example() {
  return <div data-theme="light" data-accent="blue">
    <Button>Continue</Button>
    <Testimonials />
  </div>;
}
```

React and React DOM are peer dependencies. The compiled stylesheet includes Tailwind's base styles and utilities; the consuming project does not need a Tailwind build, but should review the global reset when integrating into an existing site. Use `data-theme="dark"` and `data-accent="violet"` or `green` to change the system. Optional `data-motion="paused"` stops continuous motion.

Read [DESIGN.md](DESIGN.md) for the visual rules and [AGENTS.md](AGENTS.md) for future component work. The original source archives remain separate from the adapted live package. Original catalog licenses and source rights still need confirmation before distribution.

## Existing skill collections and archives

The two collections are packaged separately:

- [Stitch Skills](skillz/stitch-skills/README.md): 15 Stitch design, conversion, and site implementation skills.
- [Frontend and Design Skills](skillz/README.md): Frontend Design, React Best Practices, and UI UX Pro Max, organized as separate specialties.

Each folder has its own installation instructions, skills directory, and source manifest. Install each collection independently.

Reusable component code and original integration prompts are stored separately in [Components Library](components-library/README.md).

Read [MEMORY.md](MEMORY.md) for project context, completed work, and relocation notes.

## Verification

Generated build folders, package tarballs, and Vite caches are intentionally excluded from the cleaned workspace. Run `npm run build` to recreate the build outputs.

TypeScript, playground production build, package build and declarations passed. The built package passed direct-import and empty-data server-render smoke checks. Browser checks covered desktop and phone layouts, theme/accent changes, pause, hero asset loading, and the 390px component preview. No full accessibility audit has been performed.


Latest component pass: Lift Button hover fill, click and keyboard activation, disabled/loading controls, Studio Hero stage/checklist interaction, hero navigation, artwork loading, testimonial pause, dark/green theme, and 390/768/1440px layouts were exercised in the browser. Production and package builds and new-export server-render smoke checks passed. Reduced-motion CSS is implemented; no physical-device or full accessibility audit was performed.

Fruity Slider is now available through `@forma/ui` and the fifth playground entry. See [component usage and checks](components-library/fruity-slider/README.md). The original three-frame can artwork is local demo data; arbitrary products use per-slide artwork. GSAP is installed in the existing workspace.

[Wildlife Slider](components-library/wildlife-slider/README.md) is the sixth component, adapted from the supplied animated-slider-webpage. Every component view now has a diagonal-arrow control beside the preview toolbar for a full-window preview. Escape or the close arrow exits without resetting the component.
