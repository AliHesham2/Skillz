# Text input and validation ownership

Do not mechanically clone PetCompose's registration form into every feature.
Choose ownership from the form's validation, persistence and composition needs.

| Need | Decision |
| --- | --- |
| Local presentation-only text | A local state holder is usually enough |
| Business validation/submit uses the values | Hoist an appropriate input contract to the screen/VM boundary |
| State-based text API | Use actual TextFieldState/input-transformation support in the chosen version |
| Existing value-based component | Preserve its value/callback contract unless migration is requested |
| Restore a form | Save deliberate small fields at the correct owner; treat sensitive values separately |

TextFieldState can be a long-lived UI state holder when appropriate; owning it
in a VM does not make it a plain immutable String. Do not store Activity or
perform focus/keyboard operations in the VM. IME actions, FocusRequester and
bring-into-view remain UI responsibilities coordinated with insets ownership.

Observe snapshot-backed text with `snapshotFlow` only when its conversion to a
Flow serves a real need. Avoid recursively changing the same observed input
through competing UI/VM formatters. Use supported input/output transformations
where their semantics fit rather than rewriting cursor/selection accidentally.

Validation requires its own explicit policy: before submission, after blur,
after first attempted submit, or asynchronous validation. Cancel obsolete remote
validation and ignore stale responses; do not treat a debounce as correctness.
Display field errors separately from request transport errors.

Messages should retain resource identity/formatting arguments until display, or
use the imported UiText contract. Do not cache a translated string forever and
expect a locale change to update it. Do not force a phone/email/password policy
from the reference project into another product.

The planned `compose-text-forms-focus` skill owns detailed field/input/focus API
implementation. This reference establishes the VM boundary; it is not a complete
replacement for that UI skill.

Official references, checked as entry points on 2026-10-20:
[State-based text fields](https://developer.android.com/develop/ui/compose/text/user-input),
[UI state production](https://developer.android.com/topic/architecture/ui-layer/state-production).
