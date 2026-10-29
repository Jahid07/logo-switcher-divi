# Releases

1. Add `SVN_USERNAME` and `SVN_PASSWORD` under this repository’s Settings → Secrets and variables → Actions. Use your WordPress.org username and SVN-specific password.
2. Develop locally, push a branch, and merge the reviewed PR into `master`.
3. Before a new release, update the plugin header, internal version, `readme.txt` Stable tag/changelog, and npm version together. Use a version higher than the published version.
4. Run `npm run check:release` and `npm run build`, plus checks relevant to the change. The manual **WordPress.org deployment preview** workflow prepares SVN changes without publishing or using secrets. An existing SVN tag is deliberately refused.
5. Pull `master`, create and push the numeric `X.Y.Z` tag, then publish a stable GitHub release for that tag. **Publishing the GitHub release triggers WordPress.org deployment.** Pushing a tag alone, drafts, and prereleases do not.
6. Check **Publish to WordPress.org** in Actions, confirm any WordPress.org release email, and verify the public download version.

Keep listing icons, banners, and screenshots in `.wordpress-org/`; they sync to SVN `/assets/` with the release. Runtime plugin assets stay in `assets/`. The publisher checks matching versions and merged source, and refuses existing tags or downgrades. Never reuse a release tag.
