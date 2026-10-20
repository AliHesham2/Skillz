---
name: android-project-foundation
description: Create or extend a Compose-only Android starter from recorded project choices. Use when asked to start the starter architecture, wire the app entry point, configure the chosen navigation/data capabilities, or complete missing project setup. Do not generate an Android project merely because the user describes a stack.
---

# Generate the selected starter foundation

Read the project's instructions and `ANDROID-PROJECT.json`, then the
[project contract](../android-skill-router/references/project-contract.md) and
[source policy](../android-project-architecture/references/source-policy.md).
The configuration records choices; the user's actual request authorizes work.

## Activation boundary

Use this skill for an explicit starter/bootstrap/setup request. A bug report,
"add a feature", or "this project uses Compose" does not request a starter.
For those tasks, use the relevant domain skill and the architecture's existing-
project workflow; do not create base packages, config, Application, Activity,
build dependencies or templates unless the requested change actually needs them.
Do not replace another architecture with the personal starter profile.

## Resolve the target and the delta

1. Identify the project root, app module, namespace, application ID, project name
   and existing build setup. Inspect before creating or overwriting anything.
2. Resolve selected navigation and data sources that affect the requested output.
   Do not block a basic shell on an unrelated optional capability.
3. Compare requested versus observed settings. Preserve user edits and a working
   stack; propose a specific migration only if the requested change requires it.
4. Read [the starter matrix](references/starter-matrix.md) to determine required
   files, dependencies and pending feature inputs. Choose sources per feature,
   not a universal API -> RemoteMediator -> Room pipeline.

## Build the actual shell

Apply [build and startup policy](references/build-startup.md), using current
compatible official guidance for version-sensitive code. Configure only the
selected runtime libraries; do not add test libraries or execute build/test/eval
workflows under the current scope.

Use `android-project-architecture` for source placement and its shared
[DI](../android-project-architecture/references/dependency-injection.md),
[async](../android-project-architecture/references/async-flow.md) and
[error](../android-project-architecture/references/error-contract.md) contracts.

The minimal entry templates under [assets](references/template-contract.md)
are adaptation inputs, not a complete ready-made project. Resolve every token
from real decisions. They deliberately do not import the user's absent commonui
or invent repository entities, API URLs or navigation destinations.

## Integrate only the chosen capabilities

- Navigation Compose: use its authored domain skill when available; otherwise
  current official guidance. No Fragment or XML navigation for new starters.
- Navigation 3: use the selected official `navigation-3` skill and relevant recipes.
- Room/Retrofit/Paging: implement real feature contracts when known; identify
  pending schema/endpoint/key details without producing invalid dummy classes.
- Theme and edge-to-edge: provide an actual themed Compose entry point and
  explicit inset ownership. Read the available official `edge-to-edge` guidance
  for supported code, rather than adding inset padding at every layer.
- In-app locale support may require AppCompatActivity and a compatible platform
  theme. Use the real locale policy, not a custom context wrapper copied from a demo.
- Manual imports: reserve ownership, not broken imports or duplicate utilities.

If a requested domain skill is not authored/installed yet, identify it and use
official sources for authorized work. Do not pretend this foundation contains a
complete Nav2, Room, network, theme or widget specialist.

## Complete the generation record

List files actually written, decisions resolved and remaining user inputs in
`generation`. Distinguish a complete Compose shell from pending data integration.
Do not state build success or visual verification without evidence. Repeating
the request must complete the missing delta, not recreate or reset the project.
