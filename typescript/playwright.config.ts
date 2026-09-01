import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export default defineConfig({
  testDir: './tests',
  tsconfig: './tsconfig.playwright.json',
  use: {
    browserName: 'chromium',
    headless: true,
    baseURL: 'https://opensource-demo.orangehrmlive.com',
  },
});
