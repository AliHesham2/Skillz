# Sources and adaptations

Source library: https://github.com/google-labs-code/stitch-skills

Reviewed revision: `0337446dadde6f8c94210444e2aa9d546126480f` (2026-10-18).

Installed upstream families: stitch-design, stitch-utilities, and the react-components skill from stitch-build. These are published by Google Labs Code; the repository states it is not an officially supported Google product. No low-star community forks were used.

The local studio, site-builder and motion instructions are newly authored adaptations informed by those workflows. They add route contracts, scope-bounded page generation, real link verification, reduced-motion behavior, Windows compatibility and live schema reconciliation. They do not certify every upstream script or guarantee design quality.

Upstream downloaded skill directories carry their own license and local modification notices. The package retains the upstream Apache-2.0 license. Review upstream changes before upgrading; do not overwrite local corrections with a moving main branch automatically.

Additional advisor explicitly requested by the user: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill at `56ea9cf174ed86786187daa9de0e6247cb0747e4`, MIT license. Its local data/search script supports product/style/type/UX choices; see the integration reference. It is independently maintained, not a Google library.
