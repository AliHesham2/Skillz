# Layer and feature contracts

The table describes responsibility boundaries, not required class or folder
names. In an existing project map them onto its actual architecture and preserve
its contracts. A focused bug fix does not authorize introducing repositories,
renaming screens, replacing DI or converting MVVM to MVI. If a boundary is part
of the bug, make the smallest necessary correction and explain its effect.

## Direction and responsibilities

| Owner | Owns | Does not own |
| --- | --- | --- |
| Source adapter in data | One system/network/database source and its threading/lifecycle contract | Navigation or composable state |
| Repository in repo | Application data API, source selection, transformations, write/cache policy | NavController, UI callbacks, Activity |
| Optional use case | A genuinely shared or complex business operation | Automatic pass-through for every repository call |
| Screen ViewModel | Screen business state, input actions, operation concurrency | Rendering, Activity/Resources, permission launcher |
| Route | Acquire correctly scoped VM, lifecycle-aware collection, UI/platform callbacks | Duplicate business state machine |
| Screen/content | Render inputs and emit callbacks/intents | Start repositories, services or HTTP clients |
| commonui | Reusable component API, styling, local interaction state | Feature's VM, authentication or navigation engine |
| navigation layer | Destination identity, back stacks, argument/result routing | Database access or form validation |
| DI | Construction, qualifiers, lifetimes | Hidden business flow or arbitrary global state |

State that is purely presentation-local can stay in a component or plain state
holder. Do not create a VM for a button, remember a repository in a Screen, or
move every expansion flag into a global UiState.

## Select sources independently

| Actual need | Appropriate path |
| --- | --- |
| No application data yet | Compose shell, no invented repository |
| Local records | Room source -> repository -> VM -> UI |
| Remote one-shot/stream data | API source -> repository -> VM -> UI |
| Both sources, no paged cache | Explicit source-of-truth/refresh contract; no forced RemoteMediator |
| Remote paged data with local cache | RemoteMediator writes Room; Room PagingSource drives paged UI |
| A UI-local display flag | Plain state holder or composable state; no forced data layer |

Separate DTO/entity/application model when fields, meaning or lifetime differ.
Do not generate three identical model hierarchies by ritual. A simple repository
with one source can contain its source adaptation until extra separation helps.
Do not change an existing contract's return type from Flow to suspend without
checking all callers and the requested scope.

The repository contract identifies: one-shot versus observation, source of truth,
refresh trigger, cache ownership, error contract and cancellation lifetime.
For mutations, decide whether retries are safe and which operation survives
leaving a screen. Offline synchronization is a product decision, not a library flag.

## MVI boundary

For this user's MVI starter, use `UiState` plus explicit intents and a
`processIntent` entrypoint where it improves consistency. Reducer functions may
help complex state; do not add a generic reducer framework for a small screen.
Use `android-viewmodel-state` for durable outcomes and operation policies.

Compose reads a state projection. Recomposition of readers after meaningful
changes is expected. Prevent repeated side-effect execution, not all recomposition.

## Contract record for a real feature

Record this compactly in the project's decisions/features rather than creating
one document per class:

- Feature name and sources actually selected.
- Repository inputs/outputs and source-of-truth decision.
- VM lifetime and concurrency policy for each meaningful action.
- Route's navigation/platform callbacks and relevant arguments.
- State restoration ownership and transient versus durable outcomes.
- Manual imports required, with actual availability status.

Sources reviewed 2026-10-20:
[Data layer](https://developer.android.com/topic/architecture/data-layer),
[UI layer](https://developer.android.com/topic/architecture/ui-layer).
