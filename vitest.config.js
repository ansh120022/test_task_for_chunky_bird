import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        threads: true,
        threadsNumber: 4,
        env: {
            BASE_URL: 'https://gorest.co.in/public/v2'
        },
        include: [
            'tests/api/**/*.js',
            'src/**/*.test.js',
        ],
        setupFiles: ["allure-vitest/setup"],
        reporters: [
            "verbose",
            ["allure-vitest/reporter", {
                resultsDir: "allure-results",
                categories: [{
                    name: 'API Tests',
                    messageRegex: '.*',
                    matchedStatuses: ['passed', 'failed', 'skipped', 'broken']
                }],
                environmentInfo: {
                    'Test Type': 'API Tests',
                    'Framework': 'Vitest'
                }
            }]
        ],
    }
});