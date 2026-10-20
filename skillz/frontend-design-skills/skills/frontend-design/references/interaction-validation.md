# Motion diagnosis, audits, and edge cases

Adapted from Emil Kowalski’s web design skills on 2026-10-20. Copyright (c) 2026 Emil Kowalski; [MIT license](emil-MIT-LICENSE.txt). See the collection manifest for pinned sources, coverage, and adaptations.

Use for flicker, dropped frames, motion review, a requested motion audit, or explicit worst-case testing. Read the interaction craft reference only for the principles needed to decide a fix. Do not run a whole-codebase audit for a local defect.

## Reproduce before optimizing

Name the symptom and affected transition. Separate a visual correctness problem (wrap timing, clipping, stale geometry, stacking, or image changes) from a frame-budget problem. Inspect the live render and relevant code; a compositor hint cannot fix bad animation geometry.

For performance, identify layout, paint, style recalculation, React rendering, or expensive compositing. Prefer transform and opacity where they preserve the intended layout, but do not replace a true layout change with scaling that distorts text or leaves incorrect hit areas. CSS and WAAPI can offload suitable animations; acceleration depends on browser, library version, properties, and scene. Do not promise guaranteed GPU execution from a specific API spelling.

Avoid per-frame React state for continuous pointer/scroll values; use an appropriate motion value, ref, or direct element update. Inspect inherited CSS variable churn on large subtrees. Replace broad transition declarations with the intended properties. Profile blur, shadows, masks, large layers, and offscreen work on representative devices. Use will-change only for an observed benefit, then release it when appropriate; it is not a blanket fix.

A 60Hz frame is about 16.7ms and a 120Hz frame about 8.3ms, with rendering work sharing that budget. Browser emulation is not proof of performance on physical hardware. Report code-level findings separately from measured traces.

## Match the requested mode

- **Review one animation or diff:** cite observed defects and their impact. Do not invent findings to satisfy a quota or reject deliberate tradeoffs without evidence.
- **Audit existing motion:** map libraries, tokens, high-frequency paths, and lifecycle ownership; prioritize confirmed findings by user impact and effort. Analysis-only requests do not authorize fixes or dependency changes.
- **Find opportunities:** inspect gaps in feedback or spatial continuity; suggest a short, prioritized set only when motion would help. Returning no recommendations is valid.
- **Fix authorized behavior:** implement the scoped repair and recheck it; do not stop at a report when the user requested a fix.

A useful finding states location, before behavior, proposed change, evidence, and verification. A comparison table is helpful when there are several parallel findings, not a mandatory format for every answer. Self-contained implementation plans are useful only when requested; no compulsory plan folders, delegation, or extra confirmation cycle.

## Plausible worst-case data

When stress testing is requested or relevant to the defect, map the rendered values and actual schema limits. Use realistic long names, unbroken identifiers, very short names, singular/large/zero counts, absent optional fields, empty collections, unavailable images, long translated labels, Arabic/RTL text, and dense content where applicable.

Feed cases through the component's normal props/fixtures/API boundary; do not alter CSS to manufacture a failure. A temporary dev-only fixture switch may help compare normal and worst-case states. Keep it out of production and clean it up when no longer useful. Respect review-only scope; if fixes are already authorized, repair the confirmed issues rather than demanding another permission step.

Verify rapid toggles, reversal mid-transition, exit/unmount, resizing, keyboard dismissal/focus return, touch cancellation, reduced motion, content availability, and disposal of listeners/observers/frames as applicable. Slow playback can reveal timing seams but must not replace checking normal speed. State exactly what was exercised and which device/browser limits remain.
