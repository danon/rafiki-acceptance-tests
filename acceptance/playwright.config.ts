import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
  testDir: './test',
  fullyParallel: true,
  projects: [
    {name: 'chromium', use: {...devices['Desktop Chrome']}},
  ],
});
