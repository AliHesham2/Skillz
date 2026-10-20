---
name: android-viewmodel-state
description: Fix or extend screen state, ViewModels, operations and lifecycle-aware UI integration in a Compose app using its existing MVVM, MVI or other established contract. Use the user's processIntent MVI convention only for an opted-in new starter or matching project; do not force that pattern during maintenance.
---

# Build a screen state contract

Use the actual project's instructions, optional `ANDROID-PROJECT.json` and repository API.
Read the collection's [source policy](../android-project-architecture/references/source-policy.md).
Use a screen/destination/graph VM only where its lifetime and business-state role
are meaningful. Do not introduce an AndroidViewModel, Activity reference or VM
inside commonui merely to match a template.

Preserve an existing project's public state/action methods, architecture, DI and
screen ownership. Do not introduce an Intent hierarchy, processIntent method,
Hilt annotation, ResultCallBack or Route/Screen rename just because a reference
example uses them. Read [existing-project guidance](../android-project-architecture/references/existing-projects.md)
when adding a feature or fixing a bug in another architecture.

## Establish ownership first

1. Identify the feature's inputs, business operations, source of truth and chosen
   navigation engine. Inspect existing ResultCallBack/UiText signatures if present.
2. Choose the VM owner from the real destination/graph contract. A route's name
   is not proof that repeated VM lookups share the same owner.
3. Read [state and outcomes](references/state-outcomes.md) for state shape,
   intents, concurrency and delivery. The agreed public MVI entrypoint is
   `processIntent` in the opted-in personal starter; otherwise preserve the
   project's established methods. Use concrete types, not a generic framework hierarchy.
4. Read [route and restoration](references/route-restoration.md) when connecting
   the VM to Compose or deciding what survives recreation/process loss.
5. For forms, read [text and validation ownership](references/forms.md) rather
   than treating the reference project's TextFieldState placement as mandatory.

## Implement the real flow

- In a new personal-profile feature, depend on repositories/controllers or
  justified use cases rather than source APIs. For another project, use its
  existing data boundary; a bug fix is not authorization to introduce a new
  repository hierarchy. Keep navigation controllers and UI lifecycle objects
  outside the screen VM's business-state contract.
- Expose read-only screen state and accept actions. Use a sealed state for
  mutually exclusive modes or a data class with explicit invariants; never
  annotate mutable fields/holders as immutable to force skipping.
- Follow the shared [async contract](../android-project-architecture/references/async-flow.md)
  for lifetime, cancellation, sharing and concurrency. `MutableStateFlow.update`
  is for atomic state changes; its transform must be pure and safe to retry.
- Map failures through the actual [error contract](../android-project-architecture/references/error-contract.md).
  Do not fabricate the user's pending utility or expose exception text as final UX.
- Keep important operation outcomes in state/durable data. UI-local actions can
  be handled by Route callbacks. A channel is not mandatory MVI infrastructure.
- Keep PagingData in its supported flow/lifetime contract when Paging is chosen;
  do not copy every page into a growing UiState list.

## Example and completion

[The minimal MVI example](references/minimal-mvi-example.md) demonstrates a real
UI-local action path with no imaginary backend; it is not a universal repository
or form template. For a data-backed feature, substitute the actual contract and
the operation policies before emitting code.

Deliver the state/actions/VM and UI integration appropriate to the request. State
which inputs are saved, which outcomes require acknowledgement, and which work
is canceled or survives leaving the screen. Required design previews target
Screen with sample inputs, never a live VM. Do not add or run tests/evals in the
current scope, and do not claim compiled/runtime behavior without evidence.
