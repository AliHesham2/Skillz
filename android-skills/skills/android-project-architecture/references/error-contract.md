# Failure and message boundaries

Inspect the actual imported result/message types before referencing them. The
user may copy `util/ResultCallBack.kt` and related utilities in the personal
starter profile; this is not a requirement for another project. Reuse an existing
project's Resource/Result/Either/custom failure contract without replacing it.
For the opted-in manual-import profile, do not create a
parallel `Resource`, `ApiResult`, `Either` or imitation callback hierarchy merely
to make a starter look complete. A shell can remain independent of absent types.

## Reference-project facts, not a universal schema

The inspected PetCompose `ResultCallBack<T : Any>` has Success(data) and Error
with ErrorType, message, statusCode, messageRes and throwable. Its current
ErrorType distinguishes NETWORK and SERVER only. `UiText` supports a string
resource plus formatting arguments or a dynamic string. Neither copied type
should be assumed to exist under another project's namespace.

Do not classify every failure as SERVER or localize arbitrary exception text
for end users just to fit those two categories. If a feature needs a richer
validation/storage/auth contract, record the required extension and coordinate
it with the user-owned utility rather than silently modifying its public API.

## Map at meaningful boundaries

1. A source identifies technical failure: transport, HTTP, parsing, storage or a
   platform-specific condition. Preserve useful diagnostics without leaking
   secrets or sensitive payloads into logs/UI.
2. The repository presents the application-facing outcome and retryability.
   HTTP status alone is not a business error contract; inspect the actual backend.
3. The VM projects operation/form errors into the appropriate state. Field
   validation, an existing-content refresh failure and a blocking initial-load
   failure usually need different presentation.
4. The UI resolves resource-backed messages against the current locale when
   displayed. Do not hold Activity/Resources in a VM to pre-localize everything.

Cancellation is not a user-facing failure. The source utility's broad
`Exception.toFailure()` is not permission to convert a CancellationException;
explicitly rethrow cancellation before calling such a conversion.

Do not promise lossless snackbar delivery with a channel or duplicate the same
failure as both blocking dialog and transient message without a product reason.
Important error outcomes should remain representable in state or durable data.

## Loading and result meaning

Keep loading state separate from the repository Success/Error contract unless
the actual API intentionally models progress. A ResultCallBack return value
does not imply a loading emission or a stream. Use existing signatures accurately.
Decide retry eligibility and idempotency before retrying writes; a successful
operation followed by a lost response must not blindly create duplicate work.

Related sources reviewed 2026-10-20:
[UI events](https://developer.android.com/topic/architecture/ui-layer/events),
[UI state production](https://developer.android.com/topic/architecture/ui-layer/state-production).
