# Shared Hilt construction and lifetime contract

This reference owns the common DI rules until a dedicated Hilt skill is authored.
Project-foundation applies setup; domain skills apply lifetime decisions to their
own components. Use the project's compatible Hilt/Kotlin/KSP versions and the
source policy before selecting imports or Gradle plugin configuration.

Apply this Hilt-specific contract only when the target uses or explicitly
selects Hilt. Another project's Koin/manual/other DI is not a missing setup to
replace. Preserve its construction/lifetime contract during maintenance.

## Construction decisions

Use constructor injection for owned classes with injectable dependencies.
Use `@Binds` for a real interface-to-implementation association, `@Provides` for
external factories/builders or construction requiring logic. Do not create
provider methods for classes constructor injection already handles.

Keep repository bindings under `di/RepositoryModule.kt` when needed. Room and
network factories belong to their DI subpackages. Distinct clients/databases
need qualifiers with matching injection points rather than relying on type alone.
No module is required for a hypothetical repository that has not been defined.

The user has explicitly kept Hilt `@Binds` in scope. It is unrelated to XML View
Binding and service binding. Avoid treating the word binding as a banned API.

## Lifetime decisions

| Lifetime | Use when | Guardrail |
| --- | --- | --- |
| SingletonComponent | Shared app resource/cache that needs one identity | Never capture Activity, VM, View or screen callbacks |
| ActivityRetainedComponent | State/resource must survive the same Activity's configuration recreation | Not a global singleton, and not application persistence |
| ViewModelComponent | Resource belongs to one VM instance | Not shared with a sibling ServiceComponent by annotation |
| ActivityComponent | Actual Activity-bound resource | Cannot be injected upward into a longer-lived component |
| ServiceComponent | Resource belongs to the service | Its connection/data contract is still owned explicitly |

Scope a binding when shared identity, state consistency or resource cost
justifies it. Do not annotate all repositories `@Singleton` just because the
reference project did. Hilt lifetime is not an Android guarantee that a process
stays alive, and injection is not resource disposal logic.

Use application context at an appropriate data/system boundary. A ViewModel
should request a repository/controller rather than a Context/Resources/Activity.
The Activity can host Compose with `@AndroidEntryPoint`; the Application uses
`@HiltAndroidApp` and must be registered in the manifest.

## Navigation and ViewModels

Acquire a Hilt VM at the intended destination/graph owner, then pass state and
callbacks down. Repeated calls to a convenience `hiltViewModel()` at different
owners can create different instances. Inspect the Hilt integration version for
the current import/package; do not copy an older moved/deprecated convenience
import from PetCompose without checking. In the reviewed AndroidX Hilt 1.3.0
release, the Compose helpers moved to `androidx.hilt:hilt-lifecycle-viewmodel-compose`
and `androidx.hilt.lifecycle.viewmodel.compose`. Check the project's selected
version and use its supported API rather than importing the older location by habit.

WorkManager, Glance and unsupported component classes require their actual
integration/entry-point contract. Do not inject a VM into a worker/widget or
assume a ServiceScoped dependency is visible to ViewModelComponent. Domain
skills choose the corresponding supported integration only when requested.

## Sources

Reviewed 2026-10-20:
[Android Hilt integration](https://developer.android.com/training/dependency-injection/hilt-android),
[Hilt component lifetimes and hierarchy](https://dagger.dev/hilt/components.html),
[Hilt ViewModels](https://dagger.dev/hilt/view-model.html).
[AndroidX Hilt API move](https://developer.android.com/jetpack/androidx/releases/hilt#1.3.0).
