# Route, VM owner, effects and saved state

Route/Screen are role names here. Preserve an existing project's actual naming,
state APIs and DI. Hilt acquisition applies only when it uses Hilt; MVVM does
not require conversion to MVI or an intent hierarchy to follow lifecycle rules.

## Route versus Screen

Route obtains the intended screen/graph VM, collects its UiState with
`collectAsStateWithLifecycle`, and connects navigation/platform callbacks.
Screen renders state and emits callbacks/intents. Reusable commonui receives
only its required values/slots; no VM or navigation-controller parameter.

Resolve `hiltViewModel()` import and owner from the installed Hilt/navigation
versions. Nav2 and Nav3 have different entry/back-stack integration; do not
create both in a single starter or call the convenience lookup in unrelated
children assuming shared state.

Use one intended collection/projection for a screen. Avoid creating a mutable
copy of repository state in Route as a second source of truth. Local expansion,
scroll or animation state can remain UI-local according to its required lifetime.

## Effects and lifecycle

Do not navigate, request permission, bind a service or register a receiver in a
composable body. A user event can directly invoke a UI callback; an operation
outcome can be interpreted by a controlled lifecycle-aware effect.

Composition lifetime and visible/resumed lifetime are different. A route on a
back stack or retained pane can still be composed while not interactive. Use
the proper lifecycle owner/effect when the action must be limited to STARTED or
RESUMED. `LaunchedEffect(Unit)` is not automatically a visible-screen lifetime.

Effects restart when keys change. Key on the identity that genuinely determines
the operation; use `rememberUpdatedState` for a callback that should update
without restarting long-lived work. Pair acquired resources with cleanup using
the same actual owner. Do not suppress all restarts with constant keys if the
resource/input must change.

For an acknowledged outcome, preserve outcome identity through handling and
acknowledge the matching ID only. Navigation should tolerate duplicate delivery
or derive the destination from persistent app state. Do not clear an event
before performing an operation whose failure would otherwise make it disappear.

## Lifetime and restoration table

| Data | Appropriate ownership |
| --- | --- |
| Short-lived animation/gesture state | UI-local state, normally no persistence |
| Restorable UI input/selection | rememberSaveable or saved state at its actual owner |
| Small route identifiers/query | SavedStateHandle / selected nav's saveable arguments |
| Fetched models or long lists | Repository/durable data; reconstruct from saved identifiers |
| Credentials or sensitive passwords | Dedicated security/session policy; never auto-save as ordinary form state |
| Ongoing background activity | Actual service/controller/scheduler, not existence of a VM |

A ViewModel survives suitable configuration recreation, not arbitrary process
death. SavedStateHandle is not unlimited storage or a substitute for the database.
Save only supported small values and handle missing/stale/deleted IDs by loading
again and presenting an explicit state. Do not bundle a service/binder/context
or full PagingData into saved state.

Sources reviewed 2026-10-20:
[ViewModel saved state](https://developer.android.com/topic/libraries/architecture/viewmodel/viewmodel-savedstate),
[Compose state](https://developer.android.com/develop/ui/compose/state),
[Compose effects](https://developer.android.com/develop/ui/compose/side-effects),
[Lifecycle in Compose](https://developer.android.com/topic/libraries/architecture/lifecycle).
