# State, intents, operations and outcomes

Adapt these decisions to the existing project's state architecture. `Intent`
and `processIntent` are the personal MVI starter convention, not a requirement
for MVVM projects with public action methods. Retain their naming and reducer/
event abstractions unless changing them is an authorized part of the task.

## State shape

Choose state from the product's valid combinations:

- Initial loading, content, empty and blocking failure can be mutually exclusive
  screen modes. A sealed contract can express that directly.
- Existing content plus refresh progress or an inline failure are simultaneous
  facts. Do not throw away content merely to represent a refresh spinner.
- A data class is appropriate when field combinations are intentional. Define
  invariants instead of accumulating independent flags that allow impossible UI.
- A TextFieldState, SnapshotStateList or other mutable state holder inside a data
  class does not become immutable by wrapping it. Avoid false stability annotations.

Make a StateFlow read-only with `asStateFlow`, or derive it from repository
streams using `stateIn` with an explicit sharing policy and useful initial state.
A default `WhileSubscribed(5_000)` is a starting policy to evaluate; it is not a
mandatory timeout for writes, media, application settings or every screen.

## Intents and concurrency

Use explicit actions relevant to the screen: selection, query changes, submit,
retry, acknowledgement. The chosen personal API is `processIntent`. Do not add
duplicate public method names that forward to each other without a reason.
Reducers help complex state transitions; a simple `when` is sufficient for a
small contract.

Each operation declares:

| Decision | Examples |
| --- | --- |
| Replace or serialize? | Search replaces old query; a meaningful write may serialize or reject duplicates |
| Lifetime | Screen-scoped load vs application-owned mutation/durable scheduled work |
| Identity | Current query/account/request; prevent stale response overwriting newer state |
| Failure UX | Field error, inline content error, blocking failure or persistent outcome |
| Retry | Safe operation and current input; do not automatically repeat non-idempotent writes |

Do not perform network or navigation inside the lambda passed to
`MutableStateFlow.update`; it may be retried. Snapshot request inputs before
launching a command. A canceled old request's finally block must not clear a
newer request's loading state. Avoid launching an independent Job for every
keystroke without a latest-request strategy.

## UI outcomes

Important outcomes should be state or durable application data, not transient
event streams whose loss breaks correctness. Examples include completed login,
saved record identity or a pending actionable error. Route can interpret that
state and make the appropriate UI/navigation decision.

For presentation that requires acknowledgement, give the outcome a stable
identity and let UI acknowledge that identity after handling. Clearing it removes
only the matching item, so a new outcome is not accidentally cleared. This is
an explicit at-least-once/duplicate-handling design, not an exactly-once guarantee:
process loss between navigation and acknowledgement remains possible.

Navigation should also be consistent with durable app state/back-stack state.
If authentication state determines a graph, use that contract rather than
posting NavigateHome repeatedly from a buffered channel.

Direct UI clicks whose only consequence is navigation can call a Route callback
without a round-trip through the VM. Keep MVI for actual state/business actions;
the user's convention does not require every click to enter a central bus.

## If an existing side-effect stream must be retained

Inspect consumer count, lifecycle, buffering/replay and whether loss matters.
Collect in a controlled UI lifetime with stable effect keys and current callbacks.
Do not claim Channel/SharedFlow solves activity/process recreation, replay or
exactly-once delivery. Do not add a new event stream to a starter by default.

Primary sources reviewed 2026-10-20:
[UI events](https://developer.android.com/topic/architecture/ui-layer/events),
[state production](https://developer.android.com/topic/architecture/ui-layer/state-production),
[StateFlow](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-state-flow/).
