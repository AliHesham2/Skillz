# Interaction craft and fluid motion

Adapted from Emil Kowalski’s web design skills on 2026-10-20. Copyright (c) 2026 Emil Kowalski; [MIT license](emil-MIT-LICENSE.txt). See the collection manifest for pinned sources, coverage, and adaptations.

Read for component polish, building a transition, gesture-driven UI, or explicitly Apple-inspired interfaces. For jank diagnosis and motion audits use the focused validation reference instead. Preserve the project's motion tokens and visual personality; do not spread Apple-style materials to unrelated products.

## Decide, then implement

Identify the action's purpose and frequency before adding motion. Frequent commands should respond immediately with minimal travel; an occasional sheet can explain spatial relationships. Keyboard users must receive prompt feedback and full functionality. Keyboard input alone is not a universal prohibition on useful state feedback.

Use CSS transitions for simple state changes, CSS keyframes for genuinely predetermined sequences, WAAPI for programmatic timelines, and the existing motion library for springs, layout, or exits. For GSAP already in use or chosen for coordinated timelines/scroll scenes, consult [GSAP technical integration](gsap/index.md). Add a library only for a capability the project needs. A component request does not authorize migrating the stack.

Reuse existing tokens. As starting ranges when none exist: press feedback 100–160ms; small tooltips/popovers 125–200ms; dropdowns 150–250ms; larger sheets/dialogs 200–500ms. Tune to distance, frequency, content, and device; these are starting values, not automatic review failures. Use responsive deceleration for entry, smooth acceleration/deceleration for repositioning, and linear timing for constant-speed loops. Immediate, static, or opacity-only feedback can be appropriate.

## Continuity

Anchor popovers and menus to their trigger; a centered modal need not scale from an arbitrary button. Keep exit paths spatially consistent. A subtle scale near 0.95 plus opacity is an option, not a mandatory entrance recipe. Do not apply a long stagger to controls a person is ready to use.

Rapid reversal must retarget from the displayed state instead of snapping to a stored start. Springs can preserve useful velocity through a gesture handoff; avoid mixing spring parameter conventions or assuming a duration value maps directly to another library's response value. Favor low overshoot for functional UI; add bounce only when the interaction's physical character warrants it.

For dragging, track the actual pointer with capture and a stable grab offset. Use a movement threshold to resolve intent, preserve normal page scrolling on the other axis, handle cancellation and lost capture, and avoid jumps when another pointer appears. Determine dismissal from the intended direction and an appropriate distance/velocity criterion, then settle to a valid target. Use progressive resistance beyond bounds where it helps; do not paste unverified velocity constants across units or devices.

Keep exits visible long enough to complete where needed, then remove or hide the semantic element. Opacity alone does not disable interaction or remove content from the accessibility tree. Coordinate focus return and dismissal with the accessible component primitive.

## Apple-inspired surfaces and typography

Use depth and translucency to convey hierarchy only when the brief calls for them. Check contrast against changing content and avoid stacking translucent surfaces until text becomes muddy. Provide solid materials for reduced transparency or inadequate blur support, and stronger separation for increased contrast preferences. Essential controls must remain legible while materials animate.

Adjust tracking, leading, and optical sizing to type size and script; do not apply tight Latin display settings mechanically to Arabic. Use relative text sizing and check enlarged text. Platform system fonts are a good option for familiar product UI, not a universal replacement for brand typography.

Honor reduced motion with complete static or gentle non-spatial states. Gate decorative hover motion on hover-capable fine pointers. Touch, keyboard, and assistive technology need equivalent operations, not necessarily identical effects.

## Motion vocabulary

When the user asks for an effect's name, give the term and a short explanation rather than building it. Useful distinctions: crossfade swaps opacity; morph changes shape; a shared-element transition preserves an object's identity across views; stagger sequences items; origin-aware animation connects a surface to its trigger; rubber-banding adds resistance beyond a boundary. If a description is ambiguous, offer the closest match and a relevant alternative, without claiming the small vocabulary here is exhaustive.
