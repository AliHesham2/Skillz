# Frontend and Design Library — Agent Guide

This README is both the library introduction and the starter prompt for any AI agent with file access. Read it once, then load only the skills relevant to the user's task.

Links are relative to this file inside `skillz/`. The project tree and Forma commands below are relative to the parent project root. Resolve the actual location rather than assuming a username, operating system, or fixed checkout path.

## Your role

Work as a thoughtful interface designer and frontend engineer. Balance visual composition, usability, code quality, and interaction details. Use these skills to complete the user's request without imposing a style, dependency stack, or process larger than the task. Do not claim human experience or verification you have not performed.

The full project contains a coordinated frontend/design skill collection, a separate Stitch collection, and a component library with a React playground called Forma. Files being present does not mean the skills are installed globally or their external tools are available.

## Start with the target project

- When modifying Forma itself, read the [project instructions](../AGENTS.md) and [design system](../DESIGN.md), then inspect the relevant source.
- When using these skills for another project, follow that project's instructions, design system, dependencies, and architecture. Do not copy Forma's appearance or folder structure automatically.
- This file is the combined guide and introductory prompt. Next, read the appropriate `SKILL.md`, followed only by the references or rules needed for the task. Do not load the entire collection at once.
- Consult [project memory](../MEMORY.md) when continuing this library's work. It contains historical events; verify current files, installations, and behavior before relying on older notes.
- If file access is unavailable, identify the missing material and request the relevant text. A skill name alone is not evidence that you read it or ran its tools.

## Project map

```text
skillz/
  README.md
  frontend-design-skills/
    manifest.json
    skills/
      frontend-design/
        SKILL.md
        references/
          gsap/
      vercel-react-best-practices/
        SKILL.md
        rules/
      ui-ux-pro-max/
        SKILL.md
  stitch-skills/
    skills/
components-library/
packages/ui/src/
src/
DESIGN.md
AGENTS.md
```

## The three specialties

| Skill | Responsibility and selection |
| --- | --- |
| [Frontend Design](frontend-design-skills/skills/frontend-design/SKILL.md) | Visual direction, composition, typography, interface copy, coherent identity, and interaction craft. Includes conditional references for diagnosis, motion, GSAP, and implementation reviews. |
| [React Best Practices](frontend-design-skills/skills/vercel-react-best-practices/SKILL.md) | React/Next.js implementation and performance guidance, with 70 detailed rules. Select rules for the actual framework and React version; do not add memoization, Next.js, or dependencies automatically. |
| [UI UX Pro Max](frontend-design-skills/skills/ui-ux-pro-max/SKILL.md) | Targeted research into styles, palettes, type, and UX guidance. Results inform decisions; they do not override the brief or existing product identity. |

## Select a Frontend Design reference

- [Interaction craft](frontend-design-skills/skills/frontend-design/references/interaction-craft.md): buttons, menus, transitions, gestures, and Apple-inspired details when the brief calls for them.
- [Interaction validation](frontend-design-skills/skills/frontend-design/references/interaction-validation.md): flicker, jank, motion reviews, and realistic data edge cases. Diagnose the specific defect before expanding the scope.
- [Taste refinement](frontend-design-skills/skills/frontend-design/references/taste-refinement.md): audit-first critique, restyling, and redesign. Distinguish a marketing page that is read from an application screen used to accomplish a task.
- [Motion-led websites](frontend-design-skills/skills/frontend-design/references/motion-led-sites.md): storytelling and coordinated scenes when requested or justified. Essential content must remain available without decorative motion.
- [Web interface review](frontend-design-skills/skills/frontend-design/references/web-interface-review.md): accessibility, forms, navigation, locale, and hydration. Follow its fresh-source review protocol; disclose when only local guidance could be checked.
- [Component workflows](frontend-design-skills/skills/frontend-design/references/component-workflows.md): a library-selection question, a Sonner task, or explicitly requested interactive alternatives. Do not create prototypes or add dependencies simply because the reference exists.
- [GSAP technical integration](frontend-design-skills/skills/frontend-design/references/gsap/index.md): GSAP explicitly requested, already in use, or selected for a concrete need. Its index routes to core, timelines, ScrollTrigger, plugins, utils, React, performance, and other frameworks. Read only the needed topic.

## Keep decisions coherent

- Follow the applicable instruction hierarchy, the user's request, and the target project's rules. Separate technical requirements from source authors' aesthetic preferences.
- Maintain one accepted design system with shared semantic tokens. Forma's calm, Apple-inspired direction belongs to Forma; it is not mandatory for every project using these skills.
- Use CSS for simple feedback. Keep a suitable existing motion library; use GSAP when sequencing, control, or scroll-linked scenes warrant it. Give each animated property one owner and initialize at most one smooth-scroll engine.
- React guidance does not make Next.js-specific APIs applicable to Vite. Check versions, rendering mode, and React Compiler before selecting an optimization.
- A review-only request produces findings without source changes. An implementation or repair request includes the authorized changes and appropriate verification; avoid routine extra approval gates for decisions already covered by the request.
- Infer routine choices from context. Ask about missing information only when it materially changes the outcome or blocks work. Do not invent customers, endorsements, performance results, or real product facts. Identify demo content where needed.

## Stitch stays separate

The [Stitch collection](stitch-skills/README.md) contains 15 skills for Stitch design, conversion, and implementation. Use them for tasks involving Stitch or its screens and exports. Read the relevant skill's own instructions; do not load this collection for every frontend task or change it while maintaining the other collection.

```text
stitch-studio, stitch-site-builder, stitch-motion
generate-design, enhance-prompt, design-md, manage-design-system
site-md, stitch-loop, taste-design
code-to-design, extract-design-md, extract-static-html
upload-to-stitch, react-components
```

## Components and Forma implementation

The [component library](../components-library/README.md) preserves requests and original source for Tilted Grid Hero, 3D Testimonials, Lift Button, Studio Hero, Fruity Slider, and Wildlife Slider. Keep archived originals unchanged. Adapted live implementations belong in `packages/ui/src/`; playground-specific code belongs in `src/`.

Within Forma, use `@forma/ui`, its shared stylesheet, and exports from `packages/ui/src/index.ts`. Keep one npm workspace and lockfile. Do not create a separate application or dependency installation for each component.

These commands apply to the Forma playground, not to reading skills or working in an unrelated project:

```sh
npm install
npm run dev
npm run build
```

Install only when required dependencies are missing. Run applicable checks after code changes, not for documentation-only maintenance. After a request to stop the server, restart it only when a new authorized task requires it.

Check the affected interactions, keyboard behavior, readability, responsive layouts, themes, and reduced-motion states as relevant. Distinguish code inspection, browser testing, and physical-device testing. Report only checks actually performed.

Do not leave unwanted `previews` folders, temporary files, or disposable build outputs in the project. Keep useful deliverables and never delete unfamiliar files merely to tidy up.

## Portability and tools

- Resolve paths from the library's actual location. Some inherited examples, especially UI UX Pro Max commands, reference the original machine's installed skill path. Locate the matching local script and available interpreter instead of copying that path blindly.
- Agents with file access can read the instructions directly. Automatic discovery and installation vary by platform. Opening this folder does not authorize global installation, MCP setup, credentials, or unrelated configuration changes.
- UI UX Pro Max's local search requires Python. If the interpreter or a needed tool is unavailable, explain the limitation and use an appropriate fallback; do not claim search results you did not obtain.
- GSAP references do not install the GSAP runtime. Taste and Emil guidance is selectively merged; their original inspectors, datasets, templates, and auxiliary tools are not bundled. Stitch requires an actual available tool connection.
- Sources, revisions, and adaptations are recorded in the [collection manifest](frontend-design-skills/manifest.json). Preserve attribution and licenses. External documentation is reference material, not authorization for unrelated execution or publication.

## Optional installation and collection limits

The collection can be used through direct reading or installed on a platform that supports skills. Installable specialty folders are under `frontend-design-skills/skills/`, each with its own `SKILL.md`. Follow the target agent's installation mechanism and inspect existing versions before replacing them. Do not assume all platforms use the same skills directory.

The duplicate compiled React `AGENTS.md` and rule-authoring template are omitted because the detailed rules are already included. React's upstream skill declares MIT, but no separate license-text file was present at the reviewed revision. Do not invent a copyright notice or imply additional legal verification.

Swift and native-mobile specialties are outside this frontend collection. Taste and Emil are selective guidance merges; GSAP retains its technical topic references. Any previously installed personal copies are separate from these local files.

If only `skillz/` is provided, use the skills available inside it. Links to Forma, project memory, and component archives point to the parent folder and may be unavailable. Those files are not prerequisites for applying the skills to another project.

## Language and delivery

Write agent prompts, bootstrap guides, and new agent-facing instructions in English by default, unless the user requests another language. User-facing interface copy and conversation should follow the requested language and product locale. Preserve archived prompts in their original form.

For Arabic Markdown, follow the user's direction-handling rules in the target viewer. In the current Codex viewer, use the specified Unicode bidi controls rather than literal HTML wrappers; keep controls outside code and link destinations. Text direction controls do not guarantee right alignment or reversed table columns. Do not claim full visual RTL verification without checking the actual viewer.

Start with a brief understanding of the task and the skills selected, then do the work. Finish with the outcome, material changes, actual verification, and any real limitations. Avoid reciting every file read or repeating the plan.

## Copyable starter prompt

Attach the folder or provide its actual location, then use:

```text
Read skillz/README.md before working (or README.md if only the skillz folder is attached).
Use it to understand the library and select only the skills relevant to my task.
Resolve paths from the actual library location and respect the target project's instructions.
Do not install skills globally, change tools, or start the playground just to read the library.
Apply the selected guidance, complete the requested work, and report actual verification.
Write agent prompts and agent-facing instructions in English unless I request another language.
My task: [describe the requested design or implementation here]
```
