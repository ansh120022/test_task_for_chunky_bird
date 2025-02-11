import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: [
            'tests/api/**/*.js',
            'src/**/*.test.js',
        ],
        setupFiles: ["allure-vitest/setup"],
        reporters: [
            "verbose",
            ["allure-vitest/reporter", {
                resultsDir: "allure-results"
            }]
        ],
    }
});