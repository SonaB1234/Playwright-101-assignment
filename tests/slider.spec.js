const { test, expect } = require('@playwright/test');

test('Test Scenario 2 - Drag and Drop Sliders', async ({ page }) => {
  await page.goto('https://www.testmuai.com/selenium-playground/');

  await page.getByText('Drag & Drop Sliders', { exact: true }).click();
  await page.waitForLoadState('networkidle');

  const slider = page.locator('input[type="range"][value="15"]');
  await expect(slider).toBeVisible();

  // Drag the slider handle from its current position (15) to 95
  const box = await slider.boundingBox();
  const y = box.y + box.height / 2;
  const x = (percent) => box.x + (box.width * percent) / 100;

  await page.mouse.move(x(15), y);
  await page.mouse.down();
  await page.mouse.move(x(95), y, { steps: 20 });
  await page.mouse.up();

  // Fine-tune with the keyboard in case the pixel position is off by a step
  await slider.focus();
  while (Number(await slider.inputValue()) < 95) {
    await slider.press('ArrowRight');
  }
  while (Number(await slider.inputValue()) > 95) {
    await slider.press('ArrowLeft');
  }

  await expect(slider).toHaveValue('95');
  await expect(page.getByRole('status').filter({ hasText: '95' })).toBeVisible();
});

