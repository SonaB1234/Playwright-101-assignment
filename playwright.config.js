const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  timeout: 60 * 1000,
  reporter: [['list']],
  use: {
    // Video, network logs, console logs and screenshots are recorded by TestMu AI (see lambdatest.yml).
    // Playwright-side video is not used: the remote browsers have no ffmpeg binary.
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
