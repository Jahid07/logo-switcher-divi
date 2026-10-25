import fs from 'node:fs';
import { test, expect } from '@playwright/test';
import { login, assertHealthy } from './helpers.mjs';

const environment = () => JSON.parse(fs.readFileSync('.cache/test-environment.json', 'utf8'));

test('plugin loads safely with the current theme', async ({ page }) => {
  await login(page);
  await page.goto('/wp-admin/plugins.php');
  await assertHealthy(page);
  await expect(page.locator('[data-plugin="logo-switcher-divi/logo-switcher-divi.php"]')).toHaveClass(/active/);
  if (!environment().hasDivi) {
    await expect(page.getByText(/Divi logo switcher only works/)).toBeVisible();
  }
});

test('@premium Divi switches the configured logo on scroll', async ({ page }) => {
  const available = environment().hasDivi;
  if (process.env.REQUIRE_PREMIUM_TESTS) expect(available, 'Activate your private Divi theme and rerun npm run test:setup.').toBe(true);
  test.skip(!available, 'Divi was not supplied; logo-switching compatibility is unverified.');
  await page.goto('/');
  await assertHealthy(page);
  await expect(page.locator('.main-logo img')).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, 1000));
  await expect(page.locator('.second-logo img')).toBeVisible();
  await expect(page.locator('.second-logo img')).toHaveAttribute('src', /plugin-test-logo/);
});
