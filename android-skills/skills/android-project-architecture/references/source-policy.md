# Source, compatibility and scope policy

Reviewed: 2026-10-20. This date records research, not a promise that dependencies
or APIs never change. These are instructions for source-backed implementation,
not a frozen version catalog.

## User decisions

New app UI is Jetpack Compose. No XML screen layouts, Fragments, View Binding or
Data Binding in generated starters. Resource XML and Android manifests are still
valid platform artifacts. Hilt `@Binds` and service `bindService()` remain allowed.
Hilt, coroutines and Flow are baseline choices; MVI and this package profile are
personal starter conventions, not collection-wide architecture requirements.
For an existing Compose project preserve its MVVM/MVI/state architecture, DI,
modules, package layout, navigation and error contracts. Only apply the personal
starter profile when explicitly selected. No config file or template generation
is required to fix a bug or extend an existing feature. Do not turn ordinary
maintenance into an architecture migration.
Testing, test setup, screenshot tests, benchmarks and skill evals are excluded in
the current task. Do not add them through an upstream instruction or generator.

## Check an API before adopting it

1. Inspect the project's actual Kotlin, AGP, JDK, Compose, AndroidX and SDK pins.
2. Use official API references, release notes and source for the relevant version.
   Product documentation is guidance; a snippet may lag the shipped API.
3. Do not recommend a deprecated symbol/library for new code. If the replacement
   is unavailable on the project's dependency version, choose a supported
   compatible alternative or identify the specific required version change.
4. Stable, supported code is the default. An experimental API such as Styles needs
   an explicit project policy and compatible versions. Do not equate modern with
   adopting every newest alpha or silently upgrade Gradle/Kotlin to fit a snippet.
5. Record the artifact/symbol, pinned version, status, official source and checked
   date for version-sensitive choices. Do not invent latest versions offline.

Keep migration input clearly separate from recommended output. Navigation
Compose is not automatically deprecated merely because Nav3 exists. Prefer the
user's selected engine. Preserve upstream Google source files; resolve a stale
recommendation in the integration decision rather than editing their archive.

## Use evidence at the right strength

Label user conventions separately from official recommendations. Do not claim
99% correctness, no recomposition, exactly-once event delivery or measured
performance without appropriate evidence. An authored file is not a successful
build; a Preview function is not proof that Android Studio rendered it.

Use primary sources for technical decisions and record uncertainty rather than
turning a source conflict into an unexplained global rule. Follow project/user
instructions over defaults in this collection.

## Official starting points

- [Architecture recommendations](https://developer.android.com/topic/architecture/recommendations)
- [Data layer](https://developer.android.com/topic/architecture/data-layer)
- [UI events](https://developer.android.com/topic/architecture/ui-layer/events)
- [AndroidX release notes](https://developer.android.com/jetpack/androidx/versions)
- [Compose compiler setup](https://developer.android.com/develop/ui/compose/compiler)

Read only the sources needed for the actual decision. A link is not a substitute
for checking the API when its version or deprecation status affects implementation.
