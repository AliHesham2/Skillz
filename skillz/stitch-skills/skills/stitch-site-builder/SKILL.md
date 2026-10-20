---
name: stitch-site-builder
description: Turn Google Stitch screens or exports into working multi-page websites with shared layouts, real routing, reachable navigation and responsive browser verification. Use for implementation or synchronization of Stitch designs, not design-only generation.
---

# Stitch Site Builder

Read the installed `stitch-studio` page contract when planning several pages. Use `react-components` for a React conversion when it fits the existing stack, adapting its examples to the current project. A simple static site can stay HTML/CSS/JS; do not add React or a router solely because upstream examples use them.

## Integrate pages as a product

- Start from the route map and existing code. Export Stitch HTML and readable screenshots for the requested pages, then extract shared tokens and reusable shell components. Retain route-to-screen provenance.
- Keep each requested page's unique purpose and hierarchy. Share header, footer, buttons and repeated components; do not duplicate a standalone HTML header into every React page.
- Replace dead navigation with real destinations. A bare `href="#"` is not a route. Preserve useful `#section` links and intentional external, mail and telephone links. Use framework routing for SPAs and resolvable paths for static sites.
- Include a usable mobile menu, active page state and keyboard navigation. Close menus after selection; ensure focus stays usable. The logo returns home. Do not invent routes, account flows or a backend.
- Implement actual requested interactions; label demonstrations truthfully. Do not leave actionable-looking controls with no behavior. Pages such as search, filters or forms need appropriate empty, error and success states within scope.
- Preserve existing architecture and type conventions. Do not manufacture Props interfaces for components without props, put all literal text in a single mock file, or add dark mode unless requested or already supported. Update upstream validation tooling if it enforces irrelevant conventions rather than distorting product code.

## Verify the built result

1. Run the project's appropriate build/type checks. Use the installed stack and lockfile.
2. For static HTML, run `python <skill-dir>/scripts/check_site.py --root <site-output> --manifest <routes.json>`. This checks manifest outputs, internal anchor links, IDs and local assets. It does not evaluate JavaScript or replace browser checks. For an SPA, audit its route configuration and use real browser navigation instead.
3. Open each requested route directly and follow its primary journey from the header/CTA. Test browser Back/Forward and refresh on a non-home URL. Verify mobile navigation and keyboard focus. Where tooling prevents a check, name that gap instead of marking it passed.
4. Compare readable screenshots with the actual site at representative desktop and mobile widths. Check horizontal overflow, image crops, text clipping, body text readability and focus contrast.
5. Use `stitch-motion` for requested animation. Check interactions in the browser, including reduced-motion settings, before claiming they work.

Do not regenerate all screens to fix a local link or CSS bug. Edit the smallest relevant layer. Keep the route map and `.stitch/metadata.json` aligned with the actual implementation, and return a working preview or clear file entry point.
