# Studio Hero

Original Forma component created for the user's request on 2026-10-20. Not downloaded from an external component catalog.

- [Original request](prompt-original.txt).
- [Initial source](code/studio-hero.tsx): snapshot; uses the shared utilities and styles from the live package.
- Live implementation: `packages/ui/src/studio-hero.tsx`. Shared tokens and CSS: `packages/ui/src/styles.css`.

Import `StudioHero` from `@forma/ui` and load `@forma/ui/styles.css`. The playground includes usage code and interactive examples. Both themes and the three accents are inherited from Forma. No additional runtime libraries are required.

Studio Hero requires `primaryHref`; optional props customize title, description, labels, secondaryHref, and section attributes. The title is an h2 so the host page controls its h1. The workspace is an explicitly fictional interactive demo with local stage/checklist state, not a persistent productivity backend.
