# UI UX Pro Max with Stitch

Use the installed `ui-ux-pro-max` skill as a local searchable design advisor; Stitch remains the design canvas/generation service. It does not replace Stitch's MCP tools, routing or runtime verification.

Find its own `scripts/search.py` from the installed skill location. Use a full filesystem path and the available Python interpreter; do not assume CLAUDE_PLUGIN_ROOT exists in Codex. Search runs locally without an API key. Read its SKILL.md and inspect the script before first execution.

- For a new product identity, query 2-5 meaningful English terms with `--design-system`. Inspect the result for category/style fit before accepting or persisting it. Include actual audience, density and brand constraints in the synthesis; database ranking is not proof of a good design.
- For a targeted concern, use the relevant `--domain` (e.g. `ux`, `typography`, `color`, `gsap`). Query one outcome at a time. For implementation, add a separate `--stack` query matching the actual codebase.
- Retry an off-topic or empty result once with a narrower query; state when falling back to general judgment. Do not search every domain for a tiny edit.
- Its `design-system/<slug>/MASTER.md` and page overrides are advisory inputs. Reconcile the accepted decisions into `.stitch/DESIGN.md` and the Stitch theme asset. Avoid two competing sources of visual tokens. Page overrides can vary layout/content while preserving shared brand tokens.
- Read existing MASTER/override files before regeneration; do not force overwrite prior decisions without explicit authorization. Pass an explicit project output directory if persistence is needed.
- Animation search snippets are implementation suggestions. Do not install GSAP merely because a search mentions it; simple motion may use CSS. Read `stitch-motion` for the motion contract and reduced-motion acceptance.
- For Arabic products, independently verify Arabic font coverage, punctuation, bidi text, logical CSS properties and actual RTL navigation; a generic font pairing recommendation may not cover Arabic.

Source: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
Reviewed revision: `56ea9cf174ed86786187daa9de0e6247cb0747e4`.
License: MIT. The local adapter changes paths and clarifies how advice feeds Stitch; upstream data remains intact.
