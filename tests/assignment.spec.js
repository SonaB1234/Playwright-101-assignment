
const { test, expect } = require('@playwright/test');

test('Test Scenario 1 - Simple Form Demo', async ({ page }) => {
  await page.goto('https://www.testmuai.com/selenium-playground/');

  await page.getByText('Simple Form Demo', { exact: true }).click();
  await expect(page).toHaveURL(/simple-form-demo/);
  await page.waitForLoadState('networkidle');

  const message = 'Welcome to TestMu AI';
  await page.getByPlaceholder('Please enter your Message').fill(message);
  await page.getByRole('button', { name: 'Get Checked Value' }).click();

  await expect(page.locator('#message')).toHaveText(message);
});

