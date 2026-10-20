# Lift Button

Original Forma component created for the user's request on 2026-10-20. Not downloaded from an external component catalog.

- [Original request](prompt-original.txt).
- [Initial source](code/lift-button.tsx): snapshot; uses the shared utilities and styles from the live package.
- Live implementation: `packages/ui/src/lift-button.tsx`. Shared tokens and CSS: `packages/ui/src/styles.css`.

Import `LiftButton` from `@forma/ui` and load `@forma/ui/styles.css`. The playground includes usage code and interactive examples. Both themes and the three accents are inherited from Forma. No additional runtime libraries are required.

Lift Button supports native button attributes plus `variant="solid" | "outline"` and `loading`. It keeps one accessible label; decorative arrows are hidden from assistive technology. Hover-capable pointers and keyboard focus receive the fill treatment, with disabled, busy, press, and reduced-motion states.
