# Build compatibility and app entry

## Resolve versions from the actual project

For an existing app read the wrapper, root/module build scripts, version catalog,
gradle.properties and manifest. Preserve compatible pins unless a requested
capability requires a specific change. For a new app choose a supported toolchain
from official compatibility guidance and record exact values/sources; never emit
`latest`, an unchecked copied date/version, or blanket alpha dependencies.

Compose compiler integration depends on Kotlin/toolchain generation. Check the
current [Compose compiler setup](https://developer.android.com/develop/ui/compose/compiler)
and [Compose BOM](https://developer.android.com/develop/ui/compose/bom). Do not
assume the Compose BOM versions the Kotlin compiler plugin or every AndroidX
library. Hilt/KSP/Room/Navigation need their own compatible selections.

Configure the selected runtime capabilities only. No UI XML generation,
viewBinding/dataBinding enablement, test dependencies or test tasks. Do not run
Gradle sync/build merely because an upstream guide includes verification steps;
follow the actual project task's execution scope. Authoring this collection has
no Android target to build. Report the evidence actually available, and keep
the user's current exclusion of testing intact.

## Application and Activity

- Generate/retain a single `@HiltAndroidApp` Application and reference its actual
  name in the manifest. Do not create a second Application in an existing app.
- The Compose host uses `@AndroidEntryPoint`, `setContent`, the project's theme
  and a root composition appropriate to the selected navigation.
- Choose the Activity base from real integration requirements. If AppCompat
  per-app locale support is selected, use AppCompatActivity with compatible
  Android theme resources; otherwise a supported Compose host may suffice.
- Resource XML needed for launch themes, localized strings and manifests is
  allowed. This does not authorize XML app screen layouts.
- Call edge-to-edge setup at the correct entry stage for the selected platform
  and toolkit; coordinate bar contrast and splash/resources with theme policy.

## Inset ownership

Identify the owner for root Scaffold content padding, system bars, cutouts and
IME on each screen. Children consume/use the provided padding according to their
actual layout contract. Do not sprinkle statusBarsPadding/safeDrawingPadding/
imePadding across ancestors and children to make an isolated preview look right.
Use the official `edge-to-edge` skill when available for the actual component
and version; the starter's responsibility is to establish ownership.

## Settings and experimental Styles

Enabling in-app theme/language selection requires their persistence/system
policy, not just a Boolean and a string in a composable. A language setter is
not implemented by overriding LocalContext from PetCompose.

The selected Google `styles` skill supports an experimental API. Read its actual
prerequisites and official current status against the project's version pins.
Keep a stated policy of allowed/disallowed experimental APIs. Do not silently
enable global opt-ins or rewrite all components when only a shell was requested.
If the chosen capability cannot be satisfied under the pinned stack, identify
the specific incompatibility and complete unaffected setup.

## Startup and secrets

Keep startup work bounded. Do not perform blocking database/network/settings
loads in composition or keep a splash condition true forever awaiting remote
data. Do not create seed/security/auth modules without an actual requirement.
Record environment configuration without committing API secrets or signing data.

Relevant primary sources, reviewed 2026-10-20:
[Hilt setup](https://developer.android.com/training/dependency-injection/hilt-android),
[edge-to-edge](https://developer.android.com/develop/ui/compose/system/insets-ui),
[per-app languages](https://developer.android.com/guide/topics/resources/app-languages).
