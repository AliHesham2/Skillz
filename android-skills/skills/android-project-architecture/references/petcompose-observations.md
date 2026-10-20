# What to preserve from the reference project

Reference inspected 2026-10-20: the user's PetCompose application. These are
observations of source, not a build or device-behavior verdict. The skills remain
portable: do not require the user's original absolute path at use time.

## Preserve deliberately

- `data` for sources/models, `repo/<feature>` for interface + implementation,
  `di` for construction, `ui/screens`, `ui/nav`, `ui/theme`, `ui/commonui`, `util`.
- Route collects VM state; Screen accepts data/callbacks. Representative MVI
  uses `processIntent`, UiState and explicit intent types.
- commonui groups components by kind, with component/style-data/preset patterns
  and customization slots. Those styles are not the official Foundation Style type.
- Preview families include phone, foldable-sized window and tablet; login also
  has a dark example. Preserve that coverage expectation in new designs.
- `MainActivity` already uses AppCompatActivity, relevant to per-app locale support.

## Do not elevate incidental code into a default

- Registration uses a buffered side-effect Channel. Do not interpret this as
  guaranteed exactly-once navigation or process-surviving event delivery.
- Registration stores TextFieldState instances inside a data-class contract.
  They remain mutable state holders; the wrapper is not deeply immutable.
- Some repositories use Flow for command results. Inspect actual lifetimes and
  callers before changing the API; do not force every one-shot into a stream.
- RepositoryModule scopes its bindings as singletons. New repositories require
  their own identity/lifetime decision rather than copying every annotation.
- `DebounceClick.kt` contains both a remember helper and a `composed` modifier.
  A user's manual import is not an endorsement to recommend its implementation
  as the current custom-modifier template. Review supported alternatives before
  authoring new modifier guidance, without rewriting the user's utility silently.
- Theme overrides configuration/context and normalizes to Arabic/English. That
  is not a generic modern locale implementation; use the per-app locale contract.
- Do not copy product data, seeders, authentication policy, password handling,
  sample domain models, logging or credentials into unrelated starters.

## Manual import integration

The user supplies commonui, ResultCallBack and rememberDebounceClick. Inspect
their destination signatures/packages after copying. Report missing inputs;
never claim integration merely because a reserved folder exists.
