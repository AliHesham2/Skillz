# Coverage and ownership matrix

Snapshot: 2026-10-20. `authored` means skill instructions/resources exist locally;
it does not mean installed, compiled or behaviorally evaluated. `planned` means
the topic is assigned but its skill has not been authored. Six unchanged Google
skills are included as sibling directories in this folder; see
[upstream provenance](UPSTREAM-SOURCES.md).

## Authored first delivery

| Topic | Owner/resource | Status and boundary |
| --- | --- | --- |
| User choice capture, unresolved vs none, persistence | [project contract](android-skill-router/references/project-contract.md) | Authored; root/config discovery and safe updates |
| Machine-readable starting choices | [JSON template](android-skill-router/assets/ANDROID-PROJECT.template.json) | Authored template; no real project selected |
| Trigger to create starter, existing-project delta | [router](android-skill-router/SKILL.md) | Authored; describes agent workflow, no executable generator |
| Domain selection and source availability | [routing](android-skill-router/references/routing.md) | Authored; planned domain skills are explicitly marked |
| Room-only / Retrofit-only / both / no data / paging choices | [starter matrix](android-project-foundation/references/starter-matrix.md) | Authored output/decision matrix; not full data-library implementations |
| Versions, build/startup, Compose entry, manual imports | [foundation](android-project-foundation/SKILL.md) | Authored; specialized navigation/theme/insets implementations remain domain work |
| Entry templates | [template contract](android-project-foundation/references/template-contract.md) | Authored two parameterized Kotlin assets; not a complete Android project |
| Package tree and when to add layers/modules | [package profile](android-project-architecture/references/package-profile.md) | Authored personal convention |
| Existing-project bug fixes/features without architecture replacement | [maintenance workflow](android-project-architecture/references/existing-projects.md) | Authored; no mandatory starter/config/MVI/Hilt/PetCompose profile |
| Route/Screen/data/repo boundaries | [layer contracts](android-project-architecture/references/layer-contracts.md) | Authored; no universal RemoteMediator pipeline |
| Hilt ownership, scopes, qualifiers | [DI contract](android-project-architecture/references/dependency-injection.md) | Authored shared core; full specialist still a coverage decision |
| Coroutines/cancellation/Flow/sharing | [async contract](android-project-architecture/references/async-flow.md) | Authored shared core; not every library workflow |
| Failure/message boundaries and ResultCallBack | [error contract](android-project-architecture/references/error-contract.md) | Authored; manual utility not copied or recreated |
| Source/deprecation/current-version policy | [source policy](android-project-architecture/references/source-policy.md) | Authored policy; recheck version-sensitive uses at execution time |
| Preserve vs correct reference project patterns | [PetCompose observations](android-project-architecture/references/petcompose-observations.md) | Authored source-reading observations, not a project audit result |
| UiState/MVI/intents/concurrency/outcomes | [VM state](android-viewmodel-state/references/state-outcomes.md) | Authored; important outcomes not channel-only |
| VM scope/Route/effects/restoration | [Route/restoration](android-viewmodel-state/references/route-restoration.md) | Authored ownership; engine-specific API work remains separate |
| TextFieldState/validation/message ownership | [forms](android-viewmodel-state/references/forms.md) | Authored VM boundary; detailed text/focus UI still planned |
| Minimal state example | [MVI example](android-viewmodel-state/references/minimal-mvi-example.md) | Authored illustrative snippet; not executed |

## Planned custom domain skills

| Skill | Main coverage still to author |
| --- | --- |
| compose-commonui-system | Component/style-data/preset contracts, slots, extraction and override precedence |
| compose-theme-system | Tokens/CompositionLocal, Material theme and Styles integration |
| compose-ui-components | Composable APIs, screen components/states, Preview implementation and conditional interop |
| compose-layout | Constraints/scopes, measurement/intrinsics and custom layouts |
| compose-lists-paging | Lazy list/grid/pager/Paging UI and scroll restoration |
| compose-state-effects | Local/saved state, runtime identity, effect APIs and phase-aware use |
| compose-modifier-chains | Built-ins, modifier parameter contract, ordering, conditional/reused/scoped chains |
| compose-modifier-nodes | Element/Node lifecycle, invalidation, layout/draw/input/state nodes |
| compose-input-gestures | Semantic interactions, pointer input, drag/nested scroll and conflicts |
| compose-text-forms-focus | Text, input transformations, autofill, IME/focus and bring-into-view |
| compose-motion-graphics | Animation, Canvas, cache, images/layers/compositing |
| compose-accessibility-localization | Semantics, traversal, touch/font scale, resource display and RTL |
| compose-adaptive-ui | Window-based composition, panes, resize/fold and input devices |
| compose-performance | Phase reads, skipping/stability, allocation and evidence-based diagnosis |
| android-navigation-component | Navigation Compose destinations, back stacks/results/deep links/VM ownership |
| android-broadcast-receivers | System reception, flags, lifetime and callback-to-state integration |
| android-services-binding | Started/bound/foreground selection, connection state and platform restrictions |
| android-appearance-settings | System/Light/Dark preference and startup/system integration |
| android-app-locales | Official locale APIs, persistence/Activity compatibility and external surfaces |
| android-notifications | Permission/channels, actions/deep links, publishing, Live Updates and version gates |
| android-glance-widgets | Provider/state/session/update/layout/actions/config/previews/error/privacy |
| android-paging-data | PagingSource/Pager/RemoteMediator/cache keys and atomic data integration |

This gives 26 planned custom skills including 4 now authored, plus 6 upstream
selected skills: 32 total planned entries. Planned core-library specialists from
TODO section 17 are not counted as authored or added to this list automatically.

## Map the course roadmap to ownership

The course was authoring input, not an authority overriding official API guidance.
Relevant reference-project cautions are included in
[the internal observations](android-project-architecture/references/petcompose-observations.md).
The external course/audit/planning files are not runtime dependencies of this bundle.

| Roadmap rules | Owner | Current state |
| --- | --- | --- |
| MOD, ORD, PARAM, BUILTIN, SIZE, SCOPE, REUSE | modifier-chains + layout + actual input/draw/insets owners | Planned domain writing |
| INT | input-gestures + accessibility + modifier-chains | Planned |
| NODE, LAYNODE, INPNODE, NODESTATE, MIGRATE | modifier-nodes | Planned; prefer supported built-ins before custom implementation |
| DEFER, STAB, DRAW | performance + motion-graphics | Planned; no claim of zero recomposition |
| SEM | accessibility-localization | Planned; semantics are retained independently of testing |
| TEST | None in current scope | Excluded by the user |
| FUNC, STRUCT | ui-components + commonui | Planned; architectural boundary already authored |
| STATE | viewmodel-state + state-effects | VM/Route ownership authored; runtime API domain still planned |
| THEME | theme-system + upstream styles | Planned integration; upstream source copied |
| LIST | lists-paging + layout + motion + paging-data | Planned |
| FX | state-effects | Detailed domain planned; VM lifetime/effect boundary authored |
| ANTI | Each owning skill | Include real contextual anti-patterns as domains are authored |
| REVIEW | Source/ownership editorial review only | Testing/eval prompts excluded |

## Implementation-wide open constraints

- The four authored custom skills refer to one another intentionally; deploy
  them as siblings or repair all required references on relocation. They are
  not independent single-file exports.
- No skills are installed in the user's global skill directory by this delivery.
- No Android application has been generated, modified, built or run.
- No product tests, screenshot tests, benchmarks, skill evaluators or runtime
  preview sessions have been executed.
- The user's manual commonui/ResultCallBack/debounce imports remain a future
  target-project action, not files imported into this workspace.
- This matrix tracks authored instructions, not demonstrated model behavior or
  guaranteed API freshness forever.
