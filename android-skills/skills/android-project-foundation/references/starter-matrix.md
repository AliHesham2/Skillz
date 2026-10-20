# Starter output matrix

This matrix applies only to an explicitly requested personal starter. It is not
a checklist to impose on bug fixes or features in an existing architecture.

Apply the user's source/feature requirements independently. The following rows
describe a new single-app-module starter; adapt to an existing module structure.

## Always-present baseline

- An identified root/module/namespace and a record of requested versus observed setup.
- Compose-enabled build configuration with resolved compatible versions.
- Hilt application and entry Activity; coroutines/Flow dependencies as needed.
- `ui/theme`, a genuine Compose root and Preview-ready content separated from
  VM/DI/service acquisition. Every actual visual design has phone/foldable-sized/
  tablet previews using the project theme and stable sample inputs.
- The chosen navigation implementation if actual destinations are requested.
- `data`, `repo`, `di`, `ui`, `util` ownership following the package profile.
  Empty/reserved packages are recorded rather than filled with invented classes.
- A known inset owner in the root and children; no XML app layouts, View Binding
  or Data Binding.

A starter with no real screen requirements can have a minimal, clearly named
starter landing surface. This is scaffolding UI, not a fabricated pet/login/catalog
feature or a reason to add a repository or VM without business state.

## Source matrix

| Choice | Generate when contracts exist | Do not fabricate |
| --- | --- | --- |
| Neither data source | Compose shell and chosen navigation; UI-local sample state if needed | Fake repositories, database, API client |
| Room only | data/db/table + dao; AppDatabase with actual entities; RoomModule; feature repository; optional Converters only for stored custom types | Retrofit, RemoteMediator, dummy Room entity, destructive fallback |
| Retrofit only | data/api/<feature> service/DTOs; actual client/converter; NetworkModule; repository and application models where useful | Room, cache schema, guessed base URL or credentials |
| Both, no paging cache | Both source contracts; repository chooses source-of-truth/refresh policy and needed mapping | Automatic offline-first or RemoteMediator |
| Room local paging | DAO PagingSource + Pager/Flow<PagingData>; UI paging contract | RemoteMediator or remote keys |
| Network-only paging | PagingSource using real page/cursor contract; Pager/VM/Compose integration | Room cache merely because a Paging example uses it |
| Remote + local paged cache | RemoteMediator + remote keys policy + atomic cache writes + Room PagingSource + query/account isolation | One generic mediator copied for every backend or global cache deletion |

Selecting Room without any entity/schema authorizes configuring its capability
and reserving locations, not generating an invalid database with no entities.
Selecting Retrofit without an endpoint/URL authorizes its baseline setup, not a
runtime client that crashes using a placeholder URL. Mark those integrations
pending; complete the independent shell. Ask only when the user expects a usable
source-backed feature now and the missing contract cannot be inferred.

## Navigation matrix

| Choice | Owner and artifacts | Boundary |
| --- | --- | --- |
| navigation-compose | ui/nav destination types and NavHost/back-stack setup supported by the chosen version | No Fragment/XML graphs; no Nav3 APIs mixed into it |
| navigation-3 | ui/nav keys, back stack, NavDisplay and relevant state/VM ownership | No NavController migration unless explicitly requested |
| unresolved | Inspect existing stack; ask if creation now needs the decision | Do not silently choose the newest engine |

Use real destination arguments and stable identifiers. A graph for unspecified
product features is not required. A simple starter destination can be temporary
scaffolding with that status recorded. Never pass a navigation controller to commonui.

## Feature output contract

For each actual requested screen, create the necessary Route/Screen and, when
business state exists, VM plus MVI contract. A feature may keep a small contract
in its VM file. Reuse existing matching files instead of generating duplicates.

State whether the source, UI and navigation are integrated, merely authored or
waiting for an external input. Use a contract such as:

```json
{
  "name": "bookmarks",
  "sources": ["room"],
  "paging": "room",
  "outputs": [
    "data/db/table/BookmarkTable.kt",
    "data/db/dao/BookmarkDao.kt",
    "repo/bookmarks/BookmarkRepository.kt",
    "repo/bookmarks/BookmarkRepositoryImpl.kt",
    "ui/screens/bookmarks/BookmarksRoute.kt",
    "ui/screens/bookmarks/BookmarksScreen.kt",
    "ui/screens/bookmarks/BookmarksViewModel.kt"
  ]
}
```

This is an illustrative feature contract, not permission to create bookmarks in
every starter. DB/DI/shared theme/navigation files are added or updated when the
feature actually needs them.

## Manual imports and source ownership

Before commonui arrives, use standard supported Material/Foundation components
for a self-contained shell. Before ResultCallBack arrives, avoid a fake data
feature depending on it. If business work requires the result type, resolve the
actual integration as a pending user input instead of generating a second type.
Do not use `error("copy the utility first")` as an allegedly finished integration.

No tests, test infrastructure, benchmarks or evaluator jobs are part of starter
generation in the user's current scope. Authoring source files does not establish
compilation or runtime behavior.
