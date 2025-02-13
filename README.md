# Test Task for 🐧

[![Tests](https://github.com/ansh120022/test_task_for_chunky_bird/actions/workflows/test.yml/badge.svg)](https://github.com/ansh120022/test_task_for_chunky_bird/actions/workflows/test.yml)

Latest test report → https://ansh120022.github.io/test_task_for_chunky_bird/

## 🚀 Project Overview

This comprehensive test automation framework demonstrates advanced testing techniques for web and API testing using JavaScript.

## 🛠 Tech Stack

- **UI Testing**: Playwright + TypeScript
- **API Testing**: Vitest + TypeScript
- **Reporting**: Allure Reports
- **Test Data Management**: Faker
- **Schema Validation**: Zod

## 🔍 Testing Strategies

### 📋 Requirements Handling
There is a functionality failing to meet the task requirements: no names starting with 'C':

My real life approach would be:

1) Verify Requirements - Check if requirements have recently changed, confirm with product owner

If No Requirements Change: 
  - Report bug to development team
  - Temporary modify the test : Mark as expected failure, add skip/pending flag, link bug for tracking. 

If requirements have changed, adjust the test accordingly. 

### 1. UI Tests

- Multiple assertion types:
   - Validate navigation by checking URL
   - Validate expected elements present on the page
   - Attempt to validate server response success (not available for particular website which seems to work on browser cache only)
   - Assert calculated numbers for correctness

- Additional features:
    - Demonstrated various locator types (preferring `data-test`)
    - Bonus login test showcasing parametrization
    - Automatic browser closure after test completion
    - Separated locators from pages
    - Separated test data from tests

### 2. API Tests

- Failed test responses attached to report
- Response validation
- Model-based testing
- Unit test for validation schema to ensure correct schema design

### 3. Performance

- Parallelization at test framework level:
    - Playwright workers
    - Vitest threads
- Parallel job execution in CI

Note: Current parallel CI jobs have minimal speed improvement due to environment configuration time for each job, which equals test run time, however it would be valuable for larger test suites.

## 🏗️ Best Practices

- Page Object Model: Locators separated from pages
- Test Data Abstraction: Test data separated from tests
- Page factory: BasePage is used as parent for other pages
- Parametrized testing: there is only one test for Login, running with all the possible scenarios. 

## 🚧 Areas for Improvement

- Expand test coverage
- Add more edge case scenarios
- Enhance error handling
- Implement advanced reporting

## 🔧 Local Setup

### 📦 Prerequisites

Ensure you have installed:
- Node.js (v18 or later)
- npm (v9 or later)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Tests

#### UI Tests
```bash
# Run all UI tests
npm run test:ui

# Run specific UI test
npx playwright test checkout.spec.js
```

#### API Tests
```bash
# Run all API tests
npm run test:api

# Run specific API test
npx vitest userTests.js
```

### 4. Generate Allure Report

```bash
# Generate Allure report
npm run allure:report

# Open Allure report in browser
npm run allure:open
```

---

🚀 Powered by terrible coffee and free WiFi