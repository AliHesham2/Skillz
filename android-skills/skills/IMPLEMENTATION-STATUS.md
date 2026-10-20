# Implementation status

Updated: 2026-10-20. This is an English-only, movable source bundle. The directory
above this one contains the [entry prompt](../ANDROID-DEVELOPER-PROMPT.md); this
skills directory contains all currently authored/custom and selected Google skills.

## Authored custom skills

| Skill | Implemented guidance |
| --- | --- |
| [android-skill-router](android-skill-router/SKILL.md) | Task-mode selection, optional project choices, routing and generation records. |
| [android-project-foundation](android-project-foundation/SKILL.md) | Explicit starter workflow, selected-stack output matrix and two entry templates. |
| [android-project-architecture](android-project-architecture/SKILL.md) | Existing-project maintenance and optional personal starter profile; shared DI, async and failure contracts. |
| [android-viewmodel-state](android-viewmodel-state/SKILL.md) | Screen state/actions, operations, outcomes, lifecycle/restoration and form ownership adapted to the existing architecture. |

Each has a SKILL.md, agents/openai.yaml and focused supporting references.
The personal starter is optional. Existing projects retain their architecture,
DI, navigation, package layout, design system and public state/action contracts.

## Bundled Google skills

Six original skill directories and all 80 associated source files are included
as siblings: android-profiler, navigation-3, styles, edge-to-edge, r8-analyzer and
migrate-xml-views-to-jetpack-compose. They were copied without content changes.
See [provenance and license](UPSTREAM-SOURCES.md).

## Coverage and execution state

Four of the 26 planned custom skills have been authored. The six Google skills
bring the currently present total to ten. Planned custom UI, Modifier, commonui,
theme, data and platform specialists remain explicitly listed in
[the coverage matrix](SKILLS-COVERAGE.md); packaging does not make them complete.

No skills have been installed globally. No Android project, PetCompose code or
user-owned commonui/utilities have been modified by preparing this bundle.
No Android build, runtime session, rendered preview, product test, benchmark or
skill eval has been executed. Authoring instructions is not proof of runtime behavior.

The Kotlin entry assets are parameterized adaptation inputs, not a complete
Gradle project or executable JSON-to-project generator.

All collection-local references stay inside this bundle. Keep the skills together
when moving it; references between sibling skills are intentional. Official web
documentation, target-project files and tools required for a requested operation
are execution inputs, not dependencies on external authoring folders.
