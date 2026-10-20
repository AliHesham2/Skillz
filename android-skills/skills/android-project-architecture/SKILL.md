---
name: android-project-architecture
description: Understand and preserve an existing Compose project's architecture when fixing bugs or adding features, or apply the user's PetCompose package profile to an explicitly requested starter. Use for ownership, feature placement and dependency boundaries without forcing MVI, Hilt, package renames or architecture migration.
---

# Understand and apply the target project's architecture

Read [source and scope policy](references/source-policy.md) and the project's
`ANDROID-PROJECT.json` if one exists. Its absence does not block a bug fix or
feature. The [project contract](../android-skill-router/references/project-contract.md)
defines unresolved choices, generation state and manual imports. These sibling
skills form a collection: do not relocate one without preserving required references.

## Establish what already exists

Inspect actual packages, entry points, data contracts, dependency modules and
navigation ownership. For an existing app, follow
[the maintenance workflow](references/existing-projects.md) and preserve the
actual layout, state pattern, DI and contracts. Use
[the package profile](references/package-profile.md) only for an explicitly
requested personal starter or adoption of that profile. PetCompose is a reference for organization, not a
template for copying pet/user/product features or every implementation detail.

## Choose the smallest sufficient structure

1. Identify the feature's data inputs, commands, screen state and navigation boundary.
2. Assign each responsibility using [layer contracts](references/layer-contracts.md).
3. For an explicitly requested PetCompose-profile starter, create `data`, `repo`,
   `di`, `ui` and `util` roots as needed; define subpackages
   for real features and actual sources. Do not create invented database entities
   or API endpoints to populate a folder tree.
4. In that starter profile, keep repository interfaces/implementations together by feature under `repo`.
   Add source/DTO/entity/mapping separation where contracts differ.
5. Use a domain/use-case layer or extra module only for a concrete reused or
   complex responsibility, or an explicit project decision. Do not impose it
   because the word clean appears in the request.
6. Preserve a running project's public contracts and stack. New config intent is
   not implicit authorization for a large migration.

## Shared implementation contracts

- When the target uses Hilt, read [dependency injection](references/dependency-injection.md)
  for scope, modules and qualifiers. Preserve a different established DI system;
  this reference does not authorize replacing it.
- For cancellation, coroutine ownership, hot/cold streams and sharing, read
  [async and Flow](references/async-flow.md).
- For failures and the manually supplied `ResultCallBack`, read
  [error boundaries](references/error-contract.md).
- For screen business state, use `android-viewmodel-state` and keep reusable UI
  independent of ViewModels, navigation controllers and repositories.
- Before extracting an old project pattern, read [reference-project observations](references/petcompose-observations.md).

## Output

Make the requested bug fix, feature or structural change using the actual work
mode. Document material ownership choices in an existing project record when
useful; do not create metadata for a trivial fix. Explain relevant pending inputs. Do not
leave fake repositories, dead imports or misleading completion claims. Do not
add tests, benchmarks, evals, automatic migrations or machine installations.
