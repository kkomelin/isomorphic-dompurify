# AGENTS.md

## Release tags

Name release tags without a `v` prefix: `4.6.0`, not `v4.6.0`. The same applies to GitHub release tags. `.npmrc` sets `tag-version-prefix=` so `npm version` follows this rule too.

## How we release

1. Run `pnpm outdated` and fold any pending runtime dependency updates (`dompurify`, `jsdom`) into the release.
2. Pick the version. Any `dompurify` bump, even a DOMPurify patch, ships as a minor release (e.g. `4.5.0` -> `4.6.0`) because DOMPurify doesn't follow semver and its patches can change behavior. Minor `jsdom` bump can also cause a minor release.
3. Commit `chore(deps): align package.json version floors with lockfile`: raise the caret ranges in `package.json` to the installed versions.
4. Commit `chore: release X.Y.Z`: this commit changes only `version` in `package.json`.
5. Create a lightweight tag on the release commit: `git tag X.Y.Z`.
6. Push `master` and the tag: `git push && git push origin X.Y.Z`.
7. Create a GitHub release from the tag, titled `X.Y.Z: <short summary>` (e.g. `4.6.0: Updated dependencies`), with a bullet list of changes such as `jsdom 30.1.2 -> 30.1.3`.
8. Run `pnpm login` (npm asks for it every time), then `pnpm publish`. `prepublishOnly` rebuilds `dist` before publishing.
