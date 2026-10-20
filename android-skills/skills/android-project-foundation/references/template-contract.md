# Minimal entry templates

Use these only when creating the corresponding missing entry files. Do not
overwrite an existing Application/Activity/Theme. The templates are intentionally
small; selected navigation/data integrations are resolved by the workflow, not
by leaving executable TODOs or guessed domains in a generated application.

| Asset | Output | Required decisions |
| --- | --- | --- |
| ../assets/Application.kt.tpl | application class in the namespace root | NAMESPACE and APPLICATION_CLASS |
| ../assets/MainActivity.kt.tpl | actual entry Activity | NAMESPACE, ACTIVITY_IMPORT, ACTIVITY_BASE, THEME_FUNCTION, THEME_IMPORT, ROOT_IMPORT, ROOT_CONTENT |

Tokens are `{{UPPER_SNAKE_CASE}}`. Replace all of them before emitting `.kt`.
Do not include braces or placeholder strings in final source. `ACTIVITY_IMPORT`
is a qualified class such as `androidx.activity.ComponentActivity` or
`androidx.appcompat.app.AppCompatActivity`; `ACTIVITY_BASE` is its simple name.
Theme/root imports are actual generated/existing qualified functions. ROOT_CONTENT
is a valid no-argument call or actual root expression appropriate to the app.

The assets are not a Gradle project. Theme/root/resources/manifest/build setup
must exist as real output before calling entry-point integration complete. The
root owns the relevant navigation and inset contract. No imported commonui
function may appear before the user supplies it.

An existing shared VM/application class or non-default module changes these
outputs. Apply the requested delta instead of creating duplicate entry points.
