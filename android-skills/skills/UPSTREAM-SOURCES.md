# Selected Google Android skill sources

Source repository: https://github.com/android/skills
Source bundle version: 1.0.13, as recorded in its supplied Codex plugin manifest.
Bundled: 2026-10-20. Author: Google / Android. License: Apache-2.0;
see [the preserved license](UPSTREAM-LICENSE.txt).

The following source directories were copied into sibling skill folders without
changing any of their 80 files. Original upstream locations are provenance, not
filesystem dependencies of this movable bundle.

| Bundled entrypoint | Original repository directory |
| --- | --- |
| [android-profiler](android-profiler/SKILL.md) | profilers/android-profiler |
| [navigation-3](navigation-3/SKILL.md) | navigation/navigation-3 |
| [styles](styles/SKILL.md) | theming/styles |
| [edge-to-edge](edge-to-edge/SKILL.md) | system/edge-to-edge |
| [r8-analyzer](r8-analyzer/SKILL.md) | performance/r8-analyzer |
| [migrate-xml-views-to-jetpack-compose](migrate-xml-views-to-jetpack-compose/SKILL.md) | jetpack-compose/migration/migrate-xml-views-to-jetpack-compose |

## Integration rules

- Apply the user's current task scope and the custom source/deprecation policy
  before executing upstream workflows. Testing remains outside the current scope.
- The original Styles skill has experimental/version prerequisites; its inclusion
  does not migrate a project or enable experimental APIs automatically.
- Navigation Compose and Navigation 3 remain separate selected paths. A source
  skill does not authorize converting an existing application's navigation.
- XML-to-Compose migration applies to actual legacy migration work only.
- Recording/profiling and R8 analysis run only when the actual task needs them.
- Preserve upstream content. Recheck current official API status when applying
  version-sensitive recommendations rather than treating a snapshot as timeless.
- Some upstream commands refer to installed skill locations or tools obtained
  during execution. Resolve those against the actual installed location and
  inspect availability before running them. The provided R8 archive, for example,
  names helper scripts that were not present in that source snapshot; do not
  pretend those helpers have been supplied or analysis has run.

No additional Google skills, test setup, dependency installers or plugin
marketplace manifests are included by this selection.
