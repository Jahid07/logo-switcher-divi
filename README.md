# Logo Switcher Divi

[WordPress.org](https://wordpress.org/plugins/logo-switcher-divi/) · [Issues](https://github.com/Jahid07/logo-switcher-divi/issues)

Development source for the existing WordPress.org plugin. The published **2.0.0** package was imported as a separate baseline commit on 2026-10-25. Earlier Git history is preserved where available. This setup does not publish a WordPress.org update.

## Local development

Prerequisites: Docker Desktop running, Node 24, Composer, PHP CLI, and the `zip`/`unzip` tools.

```sh
composer install
npm ci
npx playwright install chromium
npm run env:start
npm run test:php
npm run test:setup
npm run test:e2e
```

Local site: http://localhost:8900 (`admin` / `password`, local development only). PHPUnit uses a separate Docker configuration and database on port 8901, then stops that environment. `npm run env:stop` stops the development site.

```sh
composer lint:syntax
composer lint
npm run check:release
npm run build
```

The build creates `dist/logo-switcher-divi-2.0.0.zip` with a production-only Composer autoloader and verifies that development and private files are excluded. Coding-standard and PHP-compatibility debt from the recovered code is tracked in `phpcs-baseline.json`; checks block increases rather than claiming the legacy code is clean.

## Integration coverage

Place your Divi folder in `.local/Divi/` and copy `.wp-env.override.example.json` to `.wp-env.override.json`. Start the environment again and run `npm run test:setup`. The local theme remains ignored by Git.

See [testing](docs/testing.md), [contributing](CONTRIBUTING.md), and [release process](docs/releases.md). WordPress.org publishing remains disabled while this workflow is reviewed. Compatibility claims must reflect actual recorded test versions.
