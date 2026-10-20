# 3D Testimonials

Source: the user's copied 21st.dev integration prompt. The exact catalog URL, author, and component license were not included in the supplied text; retain that information here when available.

- [Original prompt](prompt-original.txt): the complete, unchanged pasted instructions including all code.
- [Marquee component](code/components/ui/3d-testimonails.tsx).
- [Demo](code/demo.tsx): sample testimonial data and 3D layout.
- [Card](code/components/ui/card.tsx) and [Avatar](code/components/ui/avatar.tsx): supplied supporting components.
- [Animation CSS](code/marquee.css): supplied Tailwind 4 CSS snippet.

The code is extracted as supplied, with the original filename spelling retained so imports match. This is a source archive, not a configured or tested React application.

Integration needs React, TypeScript, Tailwind, the `@/` import alias, and the project's `@/lib/utils` `cn` helper. The avatar uses `@radix-ui/react-avatar`. The CSS snippet also imports `tw-animate-css` and expects project theme variables. Images remain external URLs. Adapt these requirements to the target project before use.

Known source issues to review during integration: `text-econdary-foreground` is misspelled; `autoFill` is declared but not implemented; reduced-motion support and duplicate-content accessibility need attention. No fixes have been applied to this archived copy.
