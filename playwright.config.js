import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests/ui',
    workers: 3,
    timeout: 30000,
    expect: {
        timeout: 5000
    },
    reporter: [
        ['line'],
        ['allure-playwright', {
            detail: true,
            outputFolder: 'allure-results',
            suiteTitle: false
        }]
    ],
    use: {
        browserName: 'chromium',
        baseURL: 'https://www.saucedemo.com',
        viewport: { width: 1280, height: 720 },
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        testIdAttribute: 'data-test'
    },
    projects: [
        {
            name: 'Sauce Labs E2E test',
            use: {
                channel: 'chromium'
            },
        }
    ]
});