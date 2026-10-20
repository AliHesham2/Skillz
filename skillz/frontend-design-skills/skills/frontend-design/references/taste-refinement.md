# Design diagnosis and visual refinement

Adapted from Leonxlnx's tasteskill v2 on 2026-10-20, including its critique and app-screen guidance. Copyright (c) 2026 Leonxlnx; [MIT license](taste-MIT-LICENSE.txt). Pinned sources and hashes are in the collection manifest. This is a selective guidance merge, not the upstream script suite or a reproduction of its research library.

## Choose the work before choosing the look

Use this reference for a visual audit, redesign, substantial restyle, or a page that feels generic. It can also help a new page whose direction is unclear. Skip it for a small, well-defined bug fix unless a broader diagnosis is needed.

- A marketing page is read and explored: establish its subject, audience, concrete claim, supporting evidence, and next action.
- An app screen is worked in: establish the user's current question, scope or workspace, relevant data, and the most useful next operation. Do not apply a marketing hero or storytelling sequence to a task screen.
- A mixed product site shares brand tokens across both, while its embedded product views retain working-product conventions.

Inspect the actual project, dependencies, brand assets, content, and available media first. State a short interpretation if it helps align substantial work. Ask only about a material ambiguity; do not require extra approval for routine reversible decisions.

## Audit existing work before changing it

For a review, examine the current render and stop with findings; do not implement without a change request. For authorized restyling or redesign, capture the relevant before state using the available browser tools, identify what must survive, and prioritize changes with the greatest visible benefit and least disruption.

Preserve routes, content, forms, data, interaction behavior, and the existing stack unless the task calls for changing them. A restyle normally preserves composition; a redesign may change it. An isolated section should match its surroundings rather than acquire a new palette.

## Make the composition specific

Gather a few concrete details from the subject: its output, objects, place, materials, process, audience, or genuine constraints. Choose a visual idea anchored in one of those details. Test whether swapping in a competitor's name leaves the result unchanged; if it does, refine the idea rather than adding decoration.

Give each marketing section a claim and evidence. Remove redundant sections, but retain the complete information the visitor needs. A distinctive hero followed by generic filler is not a coherent page. Select a useful interaction only when it supports the visitor's task; no mandatory configurator, media count, or animation quota.

Use existing imagery, licensed material, generated artwork, or a real product interface according to the brief and available tools. Do not design around nonexistent assets or misrepresent stock media as the client's actual product. Disclose sample facts where relevant; never invent proof, customers, reviews, or statistics.

## Build the still state first

Before decorative motion, verify readable content, token consistency, clear hierarchy, intentional alignment, spacing, mobile composition, and usable actions. Avoid accidental empty regions, clipped type, hidden content, or repeated sections that do no new work. Maintain a purposeful radius and surface hierarchy rather than banning cards, gradients, shadows, glass, or particular colors across all projects.

For app screens, show meaningful scope and data, with available operations close to the relevant work. Distinguish zero, missing, loading, empty, and error states. Label chart units and encode meaning beyond color; keep mock data internally consistent. Initial avatars, separators, repeated rows, and compact labels can be appropriate here.

## Review the render, then refine

Use actual screenshots and interaction checks rather than judging intended CSS. At relevant desktop, tablet, and phone widths, inspect:

1. First impression: what leads, what this is, and what to do next.
2. Composition: alignment, hierarchy, grouping, spacing, collisions, and unintended overflow.
3. Type and media: loaded fonts, legibility, line breaks, crops, and content completeness.
4. Specificity: whether the visual idea and vocabulary belong to this subject throughout.
5. Usability: navigation, controls, focus, touch, forms, data states, and reduced motion.

Write concrete findings with their observed location and impact. Fix the top issues, compare the same views before and after, and recheck affected behavior. For a substantial redesign, use at most three focused critique rounds unless unresolved correctness problems require further work. Stop when the requested outcome is met; no mandatory numeric score or invented jury result.

If scoring is requested, state that it is a subjective assessment and support it with observations. Do not claim measurements, automated passes, research-backed thresholds, or tool execution that did not happen. No upstream draw, inspector, asset-search, scene scripts, datasets, or templates are bundled here; use available tools and disclose verification limits. Keep temporary captures only as needed, honoring the user's preference against leftover preview folders.
