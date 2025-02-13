import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        threads: true,
        threadsNumber: 4,
        include: [
            'tests/api/**/*.js',
            'src/**/*.test.js',
        ],
        setupFiles: ["allure-vitest/setup"],
        reporters: [
            "verbose",
            ["allure-vitest/reporter", {
                resultsDir: "allure-results",
                testSuiteFolder: "API Tests",
                alwaysCreateTestCase: true,
                categories: [
                    {
                        name: "API Tests",
                        messageRegex: ".*",
                        matchedStatuses: ["failed", "broken", "passed", "skipped"]
                    }
                ]
            }]
        ],
    }
});