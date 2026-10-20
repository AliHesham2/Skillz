---
name: android-skill-router
description: Identify whether an Android Compose task is a bug fix, an existing-project feature, an explicit refactor or a requested new starter; select only relevant skills and preserve the project's architecture. Also record project stack choices when requested. Do not turn ordinary maintenance into starter generation.
---

# Coordinate the personal Compose skill system

Use the user's project choices to select the work, rather than fitting every app
to the same stack. Compose UI, Hilt, Flow and coroutines are the agreed baseline
for this user's new projects. MVI and the PetCompose package profile are the
agreed starter conventions. These are personal conventions, not Android mandates.
For an existing project, discover and preserve its actual architecture, DI,
navigation, state APIs and package layout; none of the starter defaults override it.

## Choose the work mode first

- `bugfix`: diagnose and fix the requested behavior in its current architecture.
- `existing-feature`: extend the project's established patterns and dependencies.
- `explicit-refactor`: change only the architectural scope the user requested.
- `starter`: generate a new foundation only after a clear request for that outcome.

An existing Compose project using MVVM, Koin, custom DI, different packages or a
different navigation setup is a valid target. Do not introduce Hilt, MVI,
PetCompose folders or manual utility imports merely to use these skills. For
maintenance, read [the existing-project workflow](../android-project-architecture/references/existing-projects.md).
An isolated fix needs neither a new project config nor the starter skill.

## Record choices before generating

1. Find the intended project root from the user's request or the active project.
   Read its instructions, Gradle files, existing source and
   `ANDROID-PROJECT.json` if present. Do not write into a different project.
2. Read [the project contract](references/project-contract.md) when recording
   or changing choices. It owns the schema, unknown values, manual imports,
   observed-versus-requested settings and generation state.
3. Apply the user's latest explicit changes, preserving unrelated decisions.
   Mentioning a stack records intent; it does not itself request scaffolding.
4. If a destination project has not been identified, retain the proposed choices
   in the conversation. Ask for the destination only when file creation requires it.
5. On a clear request such as `start create starter architecture`, proceed with
   the known choices. Ask only for a missing decision that changes the output;
   continue independent work when possible. Do not ask the user to approve a
   design they have already authorized.

## Route the actual operation

Read [the routing table](references/routing.md). Select only the skills needed
for the requested change. A common dependency is a reference to read, not a
reason to perform all of its workflows.

- New starter: use `android-project-foundation` and
  `android-project-architecture`; use `android-viewmodel-state` for an actual
  screen contract. Read the selected navigation implementation only.
- Existing feature: preserve the current stack and apply the relevant skills.
  Changing a config field does not migrate existing code automatically.
- A focused UI fix: use its domain guidance directly. Do not restructure the app.
- A platform capability: load its skill only if the feature needs that capability.

The companion skills are sibling directories in this collection. Resolve their
`SKILL.md` through installed skill discovery or the collection directory. If one
is absent, identify that gap; do not claim it was loaded or silently choose a
different architecture. The table distinguishes authored, planned and upstream
material. The router does not make automatic skill discovery an application API.

## Global scope for this collection

- New application screens are Compose, not XML layouts, Fragments, View Binding
  or Data Binding. Android manifests, resource XML and required platform metadata
  remain legitimate. Hilt bindings and service binding remain in scope.
- Keep original Google skills unchanged. Before acting on version-sensitive
  instructions, apply the [source policy](../android-project-architecture/references/source-policy.md).
- Do not recommend deprecated APIs for new code. An old API may be identified as
  input to a requested migration; it is not the destination implementation.
- Testing, test infrastructure, screenshot tests, benchmarks and skill evals are
  outside the user's current scope. Do not run or generate them from this collection.
- Respect manual imports of `commonui`, `ResultCallBack` and debounce helpers
  only for projects that opted into that integration profile. Reuse an existing
  project's own UI library, error types and click handling otherwise.
  Their absence is not permission to copy PetCompose or invent replacements.

## Report the concrete result

State which decisions were saved, which files were authored, any remaining
external inputs, and whether work is staged or installed. Mark generation
progress only for artifacts actually produced. Do not claim compilation, preview
rendering, performance improvement or runtime correctness without that evidence.
