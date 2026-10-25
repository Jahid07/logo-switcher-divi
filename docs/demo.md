# Local demo websites

Run `npm run demo:seed` after installing dependencies. This starts the Docker site, activates the intended theme and creates the realistic demo once. Repeating it preserves your page edits and local orders. `npm run demo:refresh` explicitly rewrites owned demo content and settings; it does not reset the database or delete unrelated posts. Add `-- --refresh` to a variant command to refresh that profile.

| Purpose | Configuration | Port | Data |
| --- | --- | --- | --- |
| Development | `.wp-env.json` | 8900 | Persistent |
| PHPUnit | `.wp-env.phpunit.json` | 8901 | Separate integration database |
| Browser tests | `.wp-env.e2e.json` | 8902 | Reset before each test run |
| Divi 5 development | `.wp-env.divi5.json` | 8905 | Persistent |
| Divi 5 browser tests | `.wp-env.e2e-divi5.json` | 8907 | Reset before each test run |

Each configuration creates separate wp-env containers, database and uploads. Development stays running. `npm run env:stop` stops the default development profile; for variants use `npx wp-env --config=.wp-env.divi5.json stop` or `npx wp-env --config=.wp-env.subscriptions.json stop` as applicable.

`npm run test:e2e` starts its own E2E profile, validates its configuration and live `WORKSHOP_DEMO_ROLE=e2e` marker, resets **only that E2E database**, seeds the same website, runs Playwright and stops the test profile. `npm run test:setup` performs the E2E reset/seed and leaves that test site running for inspection. Avoid concurrent runs targeting the same profile. For interactive tests use `npm run test:e2e:ui`.

The persistent development profiles carry `WORKSHOP_DEMO_ROLE=development`. No test command needs to reset a development database. Keep manual work in development sites; test-site data is disposable.

### Divi 4 and Divi 5

Supply the private theme ZIPs at `.local/divi-4/Divi.zip` and `.local/divi-5/Divi.zip`, or the extracted folders at `.local/divi-4/Divi/` and `.local/divi-5/Divi/`. The seed command extracts validated ZIPs when the folder is absent. Keep the parent theme folder named `Divi`.

```sh
npm run demo:seed                 # Divi 4: http://localhost:8900
npm run demo:divi5                # Divi 5: http://localhost:8905
npm run test:e2e -- --require-premium
npm run test:e2e:divi5
```

Both demos use the actual Divi parent theme, native navigation and fixed header, with distinct normal and compact Harbor logos. They share the same ordinary WordPress page content and local fixture CSS. This exercises the plugin's native-header integration; it does not establish compatibility with every Theme Builder header or Divi Builder module.

If adding Divi after seeding the public fallback, run `npm run demo:refresh` once to configure both logo fixtures. Replace an extracted private folder explicitly when supplying a newer ZIP; existing folders are preserved.

The supplied copies are Divi 4.27.9 and 5.17.0. With no private Divi copy, the default profile uses the public Harbor fixture theme and explicitly skips the premium logo test. The Divi 5 profile requires the private copy. Generated `.wp-env*.override.json` files remain local.


## Assets and packaging

All photographs, the local font, product illustrations and logos live under `tests/fixtures/`; see [asset credits](../tests/fixtures/ASSETS.md). The fixtures are local development support and are excluded from production ZIPs. Premium sources, generated overrides, Docker data, browser reports and credentials are ignored by Git.
