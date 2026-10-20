# Maintain an existing Compose project in its own architecture

Use this for bug fixes and feature additions in any existing Compose architecture.
Starter generation is a separate operation requiring an explicit request.
Do not require a project config, Hilt, MVI, commonui or the PetCompose package tree.

## Establish the local pattern

Read project instructions and the target module. Inspect the affected screen,
its state owner, source/repository contracts, DI and navigation integration. Read
one or two nearby, working features when they clarify actual conventions.
Do not scan every module or load every skill before a local fix.

Identify the relevant facts:

- Modules/packages and direction of dependencies.
- MVVM/MVI/reducer/custom state handling and public action/state APIs.
- Hilt/Koin/manual/other dependency construction and resource lifetimes.
- Existing navigation ownership and arguments/results behavior.
- UI/component/theme/resource conventions and available preview tooling.
- Async/error/data contracts and the operation's actual owner.
- Version pins and current supported APIs for the code that must change.

Treat source as evidence of the current design, not proof that every line is
correct. Preserve architectural consistency while correcting the actual bug.
Do not perpetuate a deprecated API in new code just to copy a neighboring file;
choose a supported compatible correction and explain any necessary local deviation.

## Bug-fix workflow

1. State the reported symptom and expected behavior from the user's evidence.
2. Trace the narrow path that can produce it: state change, operation, lifecycle,
   data response, navigation or modifier/layout behavior as relevant.
3. Separate observed facts from a suspected cause. Do not label ordinary
   recomposition a defect or claim a runtime reproduction that did not occur.
4. Choose the smallest coherent fix in the appropriate existing layer. A real
   root cause can span files; minimal does not mean hiding it with a UI workaround.
5. Preserve unrelated names, APIs, architecture, DI, dependencies and formatting.
   No fresh starter, duplicate base classes or broad modernization pass.
6. Explain the corrected behavior and any remaining evidence limit. The current
   user has excluded tests/evals; do not add or execute them as an automatic step.

## Feature-addition workflow

1. Identify what the feature adds to the product and which current feature is
   the best architectural precedent.
2. Place state, operations, UI and navigation in the existing modules/packages.
   Use its MVVM actions, MVI intents or other established interface.
3. Reuse the project's DI, models/error types, repositories, design system and
   navigation contracts where appropriate. Do not import the user's separate
   commonui/ResultCallBack/debounce profile into another project by default.
4. Add a dependency or architectural boundary only if the feature needs it;
   do not replace the entire stack to make a skill example fit.
5. Provide previews for the new/changed actual design on multiple relevant
   sizes, using that project's theme and sample inputs. No live VM/network
   requirement in previews; no claim of rendering without having rendered them.
6. Connect the real entry/exit paths and user-visible states. Do not leave an
   unreachable screen or a fake implementation to satisfy a file list.

If a feature genuinely requires an incompatible change, identify the exact
boundary and impact. Continue unaffected work; ask only for a product/stack
decision the user has not already made. An explicit architecture migration is
handled as its own scoped operation, not smuggled into a bug fix.

## Lightweight architecture record

For a substantial feature, record the relevant observed decisions in an existing
project document if useful. A one-line bug fix need not create a new config or
documentation file. If the user explicitly asks to save choices, the shared
project contract supports an `existing` profile and actual observed stack.
