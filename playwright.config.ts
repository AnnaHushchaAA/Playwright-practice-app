import { defineConfig, devices } from '@playwright/test';
import type { testoptions } from './test-options';

import * as dotenv from 'dotenv';
import * as path from 'path';
import { off } from 'process';
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig<testoptions>({
  //timeout: 10000,
  expect: {
    timeout: 10000
  },
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: process.env.DEV === '1' ? 'http://localhost:4202'
      : process.env.STAGING === '1' ? 'http://localhost:4201'
        : 'http://localhost:4200',
    trace: 'on-first-retry',
    video: {
      mode: 'off',
      size: { width: 1928, height: 1000 }
    }
  },


  projects: [
    {
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200'
      },
    },
    {
      name: 'chromium',
    },

    {
      name: 'firefox',
      use: { browserName: 'firefox' }
    },
    {
      name: 'PageObjectFullHD',
      testMatch: 'usePageObject.spec.ts',
      use: {
        browserName: 'chromium',
        baseURL: 'http://localhost:4200',
        video: {
          mode: 'on',
          size: { width: 1928, height: 1000 }
        }
      },
    }]
});
