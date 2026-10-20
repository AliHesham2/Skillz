# Local compatibility rules (2026-10-18)

This skill is a locally modified import from Google Labs Code stitch-skills.
These rules supersede conflicting examples and blanket constraints in the imported body.

- Discover active tool schemas. get_screen currently requires a full name; list_screens
  requires the numeric projectId. Never assume those schemas remain unchanged.
- Use actual available model enums or omit modelId. Do not copy a model from an old example.
- Prefer our installed stitch-studio workflow for coordinated design, stitch-site-builder
  for connected pages and stitch-motion for animation. Read only the relevant references.
- A project-level theme asset is the source of visual tokens when attached. Keep layout
  prompts free of competing palette/font directives. Without such an asset, provide the
  visual context needed. Resolve enhance-prompt/generate-design differences this way.
- Existing user authorization governs actions. Routine local builds, preview servers and
  checks needed for an authorized implementation do not require another blanket approval.
  Respect real permission boundaries, uploads outside scope and publishing separately.
- Refresh local exports only when the task needs current remote content; reuse known
  local artifacts for offline conversion. Preserve source IDs and sync timestamps.
- Use native Windows/Python/PowerShell equivalents when Bash is unavailable; preserve
  the original script's required retrieval behavior and visual audit.
- Treat taste-design bans and scores as optional creative heuristics, not requirements.
  Do not force perpetual animation, a particular font, one accent or an asymmetric hero.
- Preserve existing app architecture; no compulsory dark mode, Props interfaces for
  prop-less components or moving every literal into one mockData file. Upstream AST
  checks enforcing those conventions are optional diagnostics, not correctness gates.
- Do not silently adopt an autonomous loop or generate extra pages. Use the requested
  sitemap and stop at the requested deliverable. A route needs a built destination.
- A screenshot is not runtime verification. Prefer full-size exports and verify links,
  mobile navigation and motion in the actual browser when implementing a site.
- Keep credentials in the existing transport/config/environment. Do not echo keys or
  pass them in command arguments. Our adapted upload helper reads STITCH_API_KEY.

Source revision: 0337446dadde6f8c94210444e2aa9d546126480f.
Source: https://github.com/google-labs-code/stitch-skills
License: Apache-2.0; see LICENSE.txt. Original SKILL.md snapshots are preserved in the
test workspace's research/stitch-upstream-originals folder.
