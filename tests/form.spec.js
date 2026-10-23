const { test, expect } = require('@playwright/test');

test('Test Scenario 3 - Input Form Submit', async ({ page }) => {
await page.goto('https://www.testmuai.com/selenium-playground/');

await page.getByText('Input Form Submit', { exact: true }).click();
await page.waitForLoadState('networkidle');

// Submit without filling in any information and assert the validation error
await page.getByRole('button', {
name: 'Submit',
exact: true
}).click();

const validationMessage = await page
.locator('#name')
.evaluate((el) => el.validationMessage);
expect(validationMessage).toMatch(/Please fill/i);

// Fill the required fields
await page.locator('#name').fill('Anisha Test');
await page.locator('#inputEmail4').fill('anisha.test@example.com');
await page.locator('#inputPassword4').fill('TestPass123!');
await page.locator('#company').fill('Test Company');
await page.locator('input[name="website"]').fill('https://example.com');

await page.locator('#seleniumform select').selectOption({
label: 'United States'
});

await page.locator('input[placeholder="City"]').fill('New York');
await page.locator('#inputAddress1').fill('123 Test Street');
await page.locator('#inputAddress2').fill('Suite 100');
await page.locator('#inputState').fill('New York');
await page.locator('#inputZip').fill('10001');

// Submit the form and validate the success message
await page.locator('#seleniumform button[type="submit"]').click();

await expect(
page.getByText('Thanks for contacting us, we will get back to you shortly.')
).toBeVisible();
});

