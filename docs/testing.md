# Testing Logo Switcher Divi

[Demo setup and environment profiles](demo.md) describes the persistent websites, private dependency locations and reset behavior.

## Checks

- `composer lint:syntax`: syntax for project PHP, including fixture code.
- `composer lint`: blocks increases in existing WordPress/PHPCompatibility findings. `composer lint:strict` lists outstanding findings; do not increase the baseline to hide debt.
- `npm run test:php`: starts a separate WordPress PHPUnit environment, runs the integration suite, then stops it even on failure.
- `npm run test:e2e`: resets the isolated E2E database, seeds the realistic website, runs Chromium tests, then stops the test site. Development data is preserved.
- `npm run build`: checks version consistency and builds a production ZIP with no development or private assets.

Browser coverage includes real content navigation, loaded hero imagery, mobile layout/navigation and local contact submission, plus the plugin-specific scenarios. The store also exercises physical-product checkout and customer login; private scenarios are explicit premium tests.

Exact WordPress, PHP, theme and plugin versions and fixture IDs are recorded in ignored `.cache/test-environment.json`. Variant reports use `-divi5` or `-subscriptions` suffixes. HTML reports live in `playwright-report/`; failure screenshots and traces are retained in `test-results/`. Each run replaces its browser report. CI uploads the public-profile results for PHP 8.3 and 8.4.

Private premium tests skip explicitly in a public checkout. `npm run test:e2e:integration` requires the private integration and fails if unavailable. Premium files are not uploaded to GitHub or provided to public CI.

The default WordPress core follows wp-env's latest stable source and PHP defaults to 8.3. CI also tests PHP 8.4. Pin `core` in a profile-specific ignored override when checking another WordPress version. Local overrides for development, PHPUnit and E2E are separate. These checks do not certify the inherited legacy minimum-version declarations.

## Community reports

Test prereleases on staging and report the plugin version/commit, exact WordPress/PHP/dependency versions, native or builder header, classic or block checkout, reproduction steps, expected/actual behavior, and redacted logs. Keep community reports distinct from maintainer-verified results. Do not claim latest premium compatibility until it is actually tested.

## Local validation — 2026-10-25

WordPress 7.1.3 / PHP 8.3.32: all 5 Chromium tests passed with Divi 4.27.9 and all 5 passed with Divi 5.17.0. Both runs used real native Divi headers and verified the alternate logo after scrolling, mobile navigation, journal content and contact submission. Earlier baseline validation also passed the PHPUnit dependency-notice regression test.

Syntax, existing-finding baselines and production ZIP checks passed. All five persistent development sites retained their marker, home content, post/order counts, inquiry data and fixture manifest across the isolated browser resets. Repeating ordinary demo setup also preserved development data. Desktop/mobile screenshots were inspected. Public CI never certifies premium integrations.
