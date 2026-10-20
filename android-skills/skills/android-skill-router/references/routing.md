# Scope-based routing

Load only the current request's domains. These names are collection identifiers;
read available skills through discovery or their sibling `SKILL.md`. Do not invoke
an absent skill as if it exists. Authored files are source material until installed.

## Authored foundation in this delivery

| Request | Owner | Supporting references |
| --- | --- | --- |
| Record/change project choices | android-skill-router | project-contract.md |
| Create/extend the starter shell | android-project-foundation | its starter matrix and build policy; architecture |
| Choose file placement, boundaries, extraction | android-project-architecture | package profile, data boundaries |
| Create/refine screen state and action handling | android-viewmodel-state | operation lifetimes, UI outcomes, text ownership |

Configuration-only requests do not authorize application code generation.
A starter request does authorize routine, reversible file generation within the
identified target; do not repeatedly ask whether to start.

## Existing-project mode takes precedence

For a bug fix or new feature in another Compose app, read the relevant domain
skill and [the existing-project workflow](../../android-project-architecture/references/existing-projects.md)
when architectural discovery is needed. Do not load the starter foundation,
create project config, enforce the personal package tree, or inject MVI/Hilt
unless the user explicitly requests that change. An existing MVVM/Koin/module-
based project should receive an MVVM/Koin/module-based addition or fix.

## Planned domain owners: use only once their files exist

| Domain | Planned owner |
| --- | --- |
| commonui APIs and presets | compose-commonui-system |
| theme tokens and Styles integration | compose-theme-system |
| screens and visual states | compose-ui-components |
| measure/constraints/custom layout | compose-layout |
| lists/pager/Paging presentation | compose-lists-paging |
| local state, hoisting, effect keys | compose-state-effects |
| modifier API and ordering | compose-modifier-chains |
| custom modifier implementation | compose-modifier-nodes |
| gestures/input | compose-input-gestures |
| text/forms/focus | compose-text-forms-focus |
| animation/drawing/images | compose-motion-graphics |
| semantics/resources/RTL | compose-accessibility-localization |
| window adaptation | compose-adaptive-ui |
| Compose performance | compose-performance |
| Navigation Compose implementation | android-navigation-component |
| receivers/services | android-broadcast-receivers / android-services-binding |
| appearance/locales | android-appearance-settings / android-app-locales |
| notifications/widgets | android-notifications / android-glance-widgets |
| PagingSource/RemoteMediator/data paging | android-paging-data |

When a planned skill is not authored, use current official documentation for
authorized work and report the missing reusable guidance. Do not create an empty
`SKILL.md` to satisfy a link. Room/Retrofit/repository/DI/Flow/WorkManager/platform
results are additional coverage decisions; the current shared DI and async-flow
references provide their foundation without claiming full library skills exist.

## Selected Google skills

Use installed discovery by name first. Their unchanged source copies are sibling
directories under the collection's `skills` folder. No external source folder is
required. Paths below are relative to that `skills` folder:

| Name | Source-relative directory | Trigger |
| --- | --- | --- |
| navigation-3 | navigation-3 | Nav3 is the chosen stack; load only relevant recipes |
| styles | styles | Supported custom component styling with official Styles API |
| edge-to-edge | edge-to-edge | Initial screen shell or an actual insets/system-bars issue |
| android-profiler | android-profiler | Requested recording or investigation requiring real performance data |
| r8-analyzer | r8-analyzer | Release shrinker/config/keep-rule investigation |
| migrate-xml-views-to-jetpack-compose | migrate-xml-views-to-jetpack-compose | Requested migration of existing View/XML code |

Do not install all upstream skills or enable test workflows as a dependency of
these operations. If a source requires an old API, verify its current replacement
before execution and leave the upstream copy intact.

## Common compound requests

- Room-only feature: architecture + ViewModel + local data guidance + UI. No
  Retrofit, RemoteMediator or background scheduler without a requirement.
- Retrofit-only feed: network PagingSource only if paged data is required; no
  Room cache by default.
- Network + Room paged cache: define repository/source-of-truth and remote key
  contracts before a RemoteMediator; presentation still belongs to the UI owner.
- Theme/language switching: application settings owner plus theme/locales;
  choosing an in-app language UI may affect Activity compatibility at foundation.
- Service-driven screen: service owns connection lifetime, ViewModel owns screen
  projection, state/effects owns the UI lifecycle bridge. Normal data-driven
  recomposition is not a fault to eliminate.
- Preview request: UI/commonui + adaptive/theme guidance, sample inputs only;
  never start Hilt, networking or a live service merely to render a preview.
