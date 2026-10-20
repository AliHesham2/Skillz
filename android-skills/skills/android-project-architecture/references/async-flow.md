# Shared coroutine and Flow contract

This reference owns cross-layer async rules. VM, service and widget guidance
choose their own operation lifetimes using these rules rather than duplicating
slightly different coroutine conventions.

## Operation ownership

| Operation | Typical owner | Decision |
| --- | --- | --- |
| Screen search/load | ViewModel | Cancel/replace on changed request as appropriate |
| UI animation/scroll | Composition/UI scope | Ends with the UI work it serves |
| Callback observation | Explicit lifecycle/controller/shared stream | Register and unregister symmetrically |
| Important application mutation | Repository/application operation or durable scheduler as required | Do not accidentally cancel it merely because a screen closes |
| Work needing durable retry across process loss | Appropriate scheduler | An application CoroutineScope alone is not durable |

Use structured children under an owned scope. Avoid `GlobalScope`, unowned
scopes created per call, and `launch` inside a suspend function merely to return
before its promised work is done. An intentionally longer-lived scope must have
an explicit owner, cancellation policy and error handling.

## Main safety and failures

Repositories and sources should be main-safe. Move blocking IO/CPU work to an
appropriate dispatcher at the boundary that owns it. A suspend function is not
automatically background work; conversely do not wrap every Room/Retrofit
suspend call in IO without checking whether it already supplies main safety.
Inject dispatcher/external-scope choices when a real boundary needs them.

Rethrow `CancellationException` before mapping failures to application errors.
Broad `catch`, `runCatching` or utility conversions must not swallow cancellation.
Use `try/finally` for resource cleanup and preserve cancellation through cleanup.
Pick `coroutineScope` versus supervision according to whether sibling failure
invalidates the operation; supervision does not silently handle exceptions.

Choose a concurrency policy per action: replace latest, serialize, ignore while
running, or allow independent operations. A generic debounce is not protection
against concurrent writes. Be careful with a finalizer from a canceled old Job
resetting loading state belonging to a newer request; use operation identity or
structured transformation where that race is possible.

## Flows

- One-shot operations normally expose suspend functions; changes over time expose
  Flow. Preserve an existing meaningful Flow contract rather than converting it
  mechanically to suspend.
- Cold sources execute per collector. Multiple collectors may duplicate network
  work or callback registration. Use `shareIn`/`stateIn` only with a deliberate
  scope, replay and start/stop policy.
- `WhileSubscribed` controls the shared upstream only through its own sharing
  lifetime. A five-second timeout is a tunable default, not a universal rule.
- `collectAsStateWithLifecycle` controls the UI subscription, not every unrelated
  producer still running in an application/service scope.
- Use latest-transform cancellation for replaceable queries only when the old
  operation is safe to cancel; preserve important writes.
- `StateFlow` represents state and conflates equal values. Do not model a series
  of identical must-handle events as a Boolean toggle in StateFlow.
- `SharedFlow` replay and `Channel` capacity/consumer count change delivery
  semantics. None provides process-surviving exactly-once UI delivery.
- Callback adapters own registration cleanup with `awaitClose` and an explicit
  policy for failed `trySend`, overflow and loss. Cancellation may race a callback.
- Do not mutate a list/model in place and expect a state reader to observe a new
  value. Publish a meaningful new snapshot without falsely annotating it immutable.

## Sources

Reviewed 2026-10-20:
[Coroutine best practices](https://developer.android.com/kotlin/coroutines/coroutines-best-practices),
[Kotlin coroutine guide](https://kotlinlang.org/docs/coroutines-guide.html),
[StateFlow and SharedFlow](https://developer.android.com/kotlin/flow/stateflow-and-sharedflow),
[callbackFlow contract](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/callback-flow.html).
