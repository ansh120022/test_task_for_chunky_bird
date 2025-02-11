import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['tests/api/**/*.js'],
        reporters: ['verbose', 'allure'],
        outputFile: {
            allure: './allure-results/allure-report'
        }
    }
});