# Component choices and focused experiments

Adapted from Emil Kowalski’s web design skills on 2026-10-20. Copyright (c) 2026 Emil Kowalski; [MIT license](emil-MIT-LICENSE.txt). See the collection manifest for pinned sources, coverage, and adaptations.

Read only the mode relevant to the task. This reference merges library-selection, Sonner integration, and prototype practices; it does not install those dependencies or turn every design request into an experiment.

## Choosing a library — on request or when a task needs a new capability

Check package.json, the existing primitives, framework, accessibility needs, bundle constraints, and maintenance status. Retain a suitable installed library before adding a competing one. Current APIs and compatibility must be checked against primary documentation and the installed version when implementation requires them.

Emil's curated examples include Base UI for accessible primitives, cmdk for command menus, Sonner for toasts, input-otp for verification codes, Motion for dynamic animation, NumberFlow for number transitions, dnd-kit for drag-and-drop, Virtuoso for virtualization, and Recharts for general charts. These are candidates rather than compulsory replacements. Prefer CSS for a simple transition and local state for a local interaction. Do not add a state store, icon family, or library migration solely because it appears in a list.

When explicitly asked for a recommendation, choose a suitable option and explain the tradeoff briefly. Distinguish the upstream curated preference from a recommendation based on the current project's constraints.

## Sonner — only for a Sonner task

Use a stable root-level Toaster and trigger toast calls from client-side event handling or completed operations. Avoid mounting an accidental Toaster per route or item. If multiple toaster regions are intentionally required, verify the installed version's targeting API rather than duplicating notifications.

Update a loading notification by its stable identifier or use a promise-aware flow; handle rejection and prevent permanently loading notifications. Drive success messages from real outcomes. Match theme and semantic tokens. Check CSS specificity and the current styling API before adding important declarations everywhere; a headless/custom wrapper may be appropriate when the design system needs complete ownership.

For missing, duplicate, unstyled, clipped, or incorrectly themed toasts, check mount count, event duplication, stylesheet injection, portal/stacking contexts, offsets, and resolved theme. Keep important errors understandable outside an ephemeral toast and verify keyboard access to actions. Consult current Sonner documentation for exact prop names and defaults; this is a troubleshooting workflow, not a bundled API reference.

## Prototyping alternatives — only when the user requests variants

Keep experiments in an isolated dev route or harness using the project's tokens. Name a small set of genuinely different directions by an axis such as layout, density, or interaction, not merely color changes. Do not narrow the user's requested product scope silently.

Render alternatives at realistic size with working controls and relevant content. Make the picker accessible and quick; it is comparison chrome, not a fourth design direction. Verify every alternative before presenting it, then explain the tradeoffs and let the user's selection determine promotion. If the user already delegated the choice, apply that authorization.

Integrate the selected direction through the existing component conventions and remove the temporary harness unless the user wants it retained. Do not leave prototype, screenshot, or preview folders as permanent clutter.
