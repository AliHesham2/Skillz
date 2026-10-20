# Project choice and generation contract

This is the single owner of `ANDROID-PROJECT.json` for this collection. It is a
human-reviewable project file, not a secret store or executable build config.
Use JSON without comments so it remains readable by ordinary tools.

## Location and lifetime

Keep one file at the intended Android project root. Before a root is known,
record proposals in the discussion rather than creating a config for a guessed
project. Re-read the file at the start of subsequent project work. User changes
supersede earlier choices, but conflicting observed code requires a deliberate
migration decision; do not disguise the conflict by overwriting history.

This file is optional in an existing project. Do not generate it as a mandatory
precondition for bug fixes or feature work. If asked to record an existing
architecture, infer its observed pattern/DI/source stack first and retain those
choices; do not instantiate the starter template's defaults blindly. A compact
existing-project record can omit irrelevant starter/manual-import fields.

Use [the template](../assets/ANDROID-PROJECT.template.json) for a new file.
`null` means unresolved; `"none"` means explicitly excluded. `false` is an
explicitly disabled optional capability. Do not turn an unanswered field into
`false` or `"none"`. Record only decisions relevant to the current operation.
Unresolved optional widgets do not block a starter with no widget requirement.

## Fields and allowed decisions

| Field | Contract |
| --- | --- |
| `schemaVersion` | `1`; inspect newer schemas before editing; never downgrade them silently. |
| `workMode` | `"starter"`, `"bugfix"`, `"existing-feature"`, or `"explicit-refactor"`; infer from the requested outcome, not the presence of Compose. |
| `project.root` | Absolute intended target when known; verify it resolves inside the authorized workspace before writing. |
| `project.name`, `namespace`, `applicationId` | Real project identifiers, inferred from existing files or supplied by the user; never leave template tokens in generated Kotlin or Gradle. |
| `project.appModule` | Actual Gradle project path, initially `:app`; support an existing different module. |
| `presentation.ui` | `"compose"` for new work in this collection. |
| `presentation.pattern` | `"mvi"` for the agreed personal starter; record the actual existing pattern (for example `"mvvm"` or `"custom"`) for maintenance without requiring the user to request its preservation. |
| `presentation.packageProfile` | `"petcompose"` only for the opted-in starter profile; `"existing"` for another project's layout. |
| `navigation.requested` | `"navigation-compose"`, `"navigation-3"`, or unresolved. Never infer Nav3 merely from the word navigation. |
| `data.local` | `"room"`, `"none"`, or unresolved. |
| `data.remote` | `"retrofit"`, `"none"`, or unresolved. |
| `data.sourceOfTruth` | Domain-specific decision, possibly per feature; not automatically Room because Room is present. |
| `data.cachePolicy` | Explicit policy or unresolved; no automatic offline-first assumption. |
| `baseline` | Hilt/coroutines/Flow enabled for this starter convention. |
| `settings` | In-app appearance/language selection and storage decisions; enabling locale compatibility can affect the Activity base class. |
| `capabilities` | Optional services, receivers, notifications, widgets and background work; activate only when needed. |
| `features` | Actual requested feature records: name/package, data sources, navigation and paging requirements. An empty array is valid. |
| `manualImports` | Expected path/symbol, status, and actual source if the user identifies it; no absolute PetCompose path baked into generated projects. |
| `versions` | Requested/pinned/observed values plus source and checked date for version-sensitive choices. No `latest` literals in generated builds. |
| `observed` | Current stack actually found in source/build files. Different from requested settings. |
| `generation` | Revision and files actually produced; pending integrations and evidence limits. |

For a feature's paging mode use `"none"`, `"room"`, `"network"` or
`"remote-mediator"`, or leave unresolved. `remote-mediator` needs a real local
store and remote page contract. Merely selecting both data libraries is insufficient.

## Decision updates

1. Read and preserve the existing file and unknown fields.
2. Extract explicit statements: "Room only" resolves local Room and remote none.
   An incomplete list mentioning Room does not necessarily exclude networking.
3. Record meaningful provenance under `decisions`, including the short decision,
   date and whether explicit, inferred from existing code or a stated assumption.
4. Compare `requested` with `observed`; record an unresolved mismatch instead of
   migrating a project as a side effect of editing configuration.
5. Save a complete JSON document. Never put tokens, passwords or signing secrets
   here. Avoid absolute machine-specific paths except the actual project root
   and user-supplied integration sources when needed.

Do not ask for every optional field. Resolve only decisions that change the
requested output. If no API URL or entity schema exists yet, a source integration
may remain pending while the Compose shell is authored.

## Configuration is not implementation

`generation.files` identifies created/updated artifacts with relative paths and
their actual status. A `commonui` directory entry does not mean its code exists.
An authored file does not imply it compiled. Preserve the distinction among
`planned`, `authored`, `integrated` and `externally-supplied` when relevant.

Use relative file paths for inventory. Check path traversal, module ownership and
the resolved root before applying changes. Do not follow a config-supplied path
outside the authorized project just because it appears in JSON.

## Manual imports

The user supplies `ui/commonui`, `util/ResultCallBack.kt` and the function
`rememberDebounceClick` (PetCompose currently stores it in `DebounceClick.kt`).
Keep status `pending-user-copy` until the destination symbols exist. Inspect the
copied package names and signatures before use. Do not import missing types,
copy an entire reference project, create a duplicate result hierarchy, or patch
the user's utility without a relevant request.

These expectations apply only to the user's personal starter/import profile.
Another project's own design system, error abstraction or click helpers remain
valid; do not add pending imports for utilities it never selected.

Prefer platform/Material components for an independently usable starter shell.
If a specific feature genuinely requires a missing manual import, identify that
integration point and complete unaffected work; do not claim the feature is complete.

## Repeated generation

The generator workflow is an agent operation, not an executable supplied by this
config. Compare existing files with the requested output. Add missing artifacts,
update only the authorized delta, and retain user modifications. Never erase or
recreate the project to achieve a desired folder tree. Update generation history
after writing, not before. Do not install skills or change unrelated machine
settings when asked to generate an Android starter.
