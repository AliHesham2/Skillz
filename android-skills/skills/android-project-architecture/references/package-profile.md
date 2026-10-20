# PetCompose-inspired package profile

Personal convention derived from the reference project; not an Android package mandate.
Activate this profile only for a requested personal starter or explicit adoption.
Do not use this tree to rename, move or recreate packages in another project's
MVVM, Clean Architecture, feature/module-based or custom layout.
Use the actual project namespace and module. Default to a single app module until
a real ownership, build or reuse requirement justifies another one.

```text
<namespace>/
  <AppName>Application.kt
  MainActivity.kt
  data/
    api/<feature>/           # only for an actual remote source
    db/
      dao/                   # actual Room contracts
      table/                 # actual Room entities
      AppDatabase.kt
      Converters.kt          # only when a stored type needs conversion
    model/<feature>/         # shared application-facing models when needed
    preferences/             # actual settings/session persistence
  repo/<feature>/
    <Feature>Repository.kt
    <Feature>RepositoryImpl.kt
  di/
    RepositoryModule.kt      # only for real bindings
    db/RoomModule.kt         # when Room is configured
    network/NetworkModule.kt # when networking is configured
    datastore/DataStoreModule.kt
  ui/
    nav/                     # exactly the selected engine for a new starter
    screens/<feature>/
      <Feature>Route.kt
      <Feature>Screen.kt
      <Feature>ViewModel.kt
      <Feature>Contract.kt    # optional separate file when it improves navigation
    theme/
    commonui/                # user imports this library manually
  util/                      # only genuinely shared utilities
```

This tree describes permitted locations, not files to create unconditionally.
An empty repository module and dummy database are not useful starter features.
If the user requests reserved folders, create them without fabricated classes;
empty folders may not survive Git, so record pending ownership in the project
inventory rather than claiming code exists there.

## Preserve the intended grouping

- `data/db/table` follows the user's current naming. Do not rename it `entity`
  only because an example uses a different convention.
- Keep a repository interface and implementation in its feature package. UI
  depends on the interface where a data contract exists.
- A small contract can remain alongside its ViewModel as in PetCompose.
  Separate `Contract.kt` when meaningful; avoid rigid one-type-per-file rules.
- `MainViewModel` is for actual application/shell state, not a required global
  container for every feature.
- `commonui` is general-purpose UI. A feature's validation, repository access,
  navigation, account data or layout-specific rules do not belong there merely
  because several files use them.
- Feature-specific modifier helpers stay with that feature, or in the imported
  profile if the user explicitly adopts that pattern. Global `AppModifier`
  should not become a dependency of data/business code.
- System integrations may use `data/system/<capability>` and a real controller
  boundary. Widgets can use a separate `widgets/<widget>` presentation root;
  they are not automatically compatible with `ui/commonui` Compose UI elements.

## Names and extraction

Retain existing public names unless the task includes a rename. Use real feature
names instead of copying PetCompose's pet/product/registration domains. Do not
add `BaseRepository`, `BaseViewModel`, universal intent/event buses or an entire
domain module without a concrete need. Keep utilities small and owned.
