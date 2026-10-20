---
name: stitch-studio
description: Plan and direct polished Google Stitch design workflows, including shared design systems, coordinated multi-page screens, targeted refinements, and handoff to a linked working website. Use for Stitch design projects and substantial redesigns, not unrelated frontend edits.
---

# Stitch Studio

Our local adaptation of the Google Labs Stitch workflows. Prefer product-specific art direction and a complete user journey over elaborate prompts or a fixed visual style. Consult [provenance](references/provenance.md) for sources and local changes.

## Choose the deliverable

Infer from the request whether the user wants Stitch designs, a working local site, or both. Do not turn design-only work into an implementation or deployment. Preserve their framework, account, existing project and chosen visual references. For a vague creative brief, propose a small set of meaningfully distinct directions; when the user delegates taste, choose and explain one without imposing another approval round.

## Design a coherent system

Use the installed `ui-ux-pro-max` skill for product-specific design intelligence before establishing a new visual direction; read [UI UX Pro Max integration](references/ui-ux-pro-max.md). Existing approved visual decisions remain authoritative.

1. Inspect existing screens, code, and DESIGN.md before inventing another identity. For an existing product, preserve its working design language unless a redesign is requested.
2. Record the requested pages, their purpose and connections in `.stitch/SITE.md`. Set a realistic page count from the actual brief; a landing page does not require five screens. For multi-page work, make a route manifest following [the page contract](references/page-contract.md).
3. Establish `.stitch/DESIGN.md`: atmosphere, type hierarchy, functional colors, spacing, component states, image direction and responsive behavior. Add Arabic fonts and actual RTL layout when the product language requires them; Markdown bidi preferences do not substitute for `dir="rtl"` in the website.
4. Use the installed `manage-design-system` and `generate-design` skills for Stitch operations, accounting for [live API compatibility](references/stitch-operations.md). Reuse the design-system asset across screens. When a theme asset is attached, keep generation prompts focused on purpose, layout, content and behavior; avoid duplicating a competing palette. Without an applicable asset, include the necessary visual context explicitly.
5. Generate a representative page first. Inspect its screenshot and HTML, then make targeted edits before spreading the direction across the other requested pages. Reuse shell, tokens and imagery logic, not identical section layouts everywhere.
6. Keep `.stitch/metadata.json` with project ID, screen IDs, route mapping, design-system ID if any, source URLs and actual last-sync time. State whether each screen is generated, reviewed, integrated or verified.

## Taste without a house template

Use `enhance-prompt` for incomplete briefs and `design-md` for extracting an existing visual language. Treat `taste-design` as a source of optional critiques, not universal bans: symmetric layouts, serif fonts, black, multiple semantic colors and restrained or absent motion may all suit a product. Do not invent testimonials, awards, metrics or clients. Use conspicuous sample content when demonstration content is needed.

Review visual hierarchy, readable body text, useful spacing, deliberate imagery, contrast, empty/error states where applicable, and clear calls to action. Never claim quality from a screenshot thumbnail or code inspection alone.

## Working site and motion

For implementation, read the installed `stitch-site-builder` skill. For animation, read `stitch-motion`; Stitch can suggest the visual intent, while runtime interactions and animation require implementation and browser checks. Do not promise animated behavior from a static export.

Report the actual result, its location, verification performed and remaining limitations. Offer a concrete refinement when useful; do not create recurring work, publish, or continue generating extra screens outside the requested scope.
