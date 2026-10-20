---
name: stitch-motion
description: Plan and implement purposeful animation and transitions in websites derived from Google Stitch, including hover feedback, section reveals, navigation transitions and reduced-motion alternatives. Use when motion is requested or an established Stitch site's interactions need repair.
---

# Stitch Motion

Stitch screenshots and exported HTML do not establish that an animation runs. Implement and verify motion in the target site's runtime. Read [motion recipes](references/motion-recipes.md) for concrete patterns.

Choose motion based on purpose: action feedback, continuity between states, or a restrained reveal. Preserve the user's chosen aesthetic. Prefer CSS for simple hover/focus and entrance transitions; use an existing animation library for coordinated stateful sequences. Add a dependency only when the requested behavior benefits from it. Do not install a large library for a two-property transition.

Record a small motion contract with trigger, affected element, property, duration/easing and reduced-motion behavior. For example: project thumbnail -> hover or keyboard focus -> translateY(-3px) over 180ms -> no transform when reduced motion is enabled. Values are starting points, not universal design rules.

Avoid perpetual decorative loops by default, forced smooth scrolling, scroll hijacking, cursor replacement and content hidden pending JavaScript. Keep meaningful content visible if animation initialization fails. Animate transform/opacity where practical; measure before applying will-change broadly. Reserve layout animation for deliberate interactions with performance checks.

Respect `prefers-reduced-motion`: remove travel, parallax, auto-scrolling and repeated motion, while preserving immediate state changes and essential feedback. Hover effects need keyboard and touch equivalents. Never rely on motion alone to communicate an error, selection or completion.

Navigation transitions must preserve real URLs, normal link behavior, browser history and focus management. Test direct loading and refresh on nested routes. Support browsers without an advanced transition API with ordinary working navigation. An animated menu still needs correct expanded state, escape behavior and usable focus.

Verify normal and reduced-motion modes, repeated navigation, resize and narrow-screen overflow. Report which behaviors were observed; code presence alone is not verification. Do not call a static Stitch screen animated unless runtime motion was actually implemented and tested.
