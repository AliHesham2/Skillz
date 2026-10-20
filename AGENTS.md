# Project instructions

Write agent prompts, bootstrap guides, and new agent-facing instructions in English by default unless the user requests another language. Preserve original archived prompts; user-facing copy and conversation follow the requested locale.

For an introduction to this library and skill selection, read [skillz/README.md](skillz/README.md). Treat it as orientation; the rules below govern work in this repository. Read only task-relevant skills and references.

Read DESIGN.md before adding or changing a live UI component. All live components must follow its semantic tokens, themes, accessibility, and motion rules.

Keep archived prompts and source files under components-library unchanged. Put adapted reusable implementations in packages/ui/src and export them from its index.ts. Keep playground-specific layouts in src/.

Use the root npm workspace and lockfile. Install dependencies at the root; do not create separate per-component apps or node_modules folders.

Run npm run build after code changes. Verify actual browser behavior when possible and describe any remaining limitations honestly.

For Arabic Markdown follow the user's Unicode bidi conventions; preserve code and link destinations exactly.
