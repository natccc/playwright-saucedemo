# Playwright Saucedemo E2E Tests

A personal project to practise end-to-end test automation using **Playwright** and **TypeScript**, applying the **Page Object Model (POM)** design pattern.

## About This Project

This project tests the [Sauce Demo](https://www.saucedemo.com/) web application — a practice e-commerce site commonly used for learning test automation.

The goal is to build maintainable, scalable automated tests using industry-standard patterns and tooling.

## Tech Stack

- [Playwright](https://playwright.dev/) — end-to-end testing framework
- TypeScript — strongly typed test code
- Page Object Model — design pattern for maintainable test structure
- GitHub Actions — CI pipeline to run tests automatically on every push

## Project Structure

```
├── pages/          # Page Object classes
├── tests/          # Test specs
├── .github/
│   └── workflows/  # GitHub Actions CI configuration
├── playwright.config.ts
└── package.json
```

## Test Coverage

| Area                            | Status         |
| ------------------------------- | -------------- |
| Login — valid credentials       | ✅             |
| Login — invalid credentials     | ✅             |
| Login — locked out user         | ✅             |
| Login — empty fields validation | ✅             |
| Add to cart                     | 🚧 In progress |

## CI/CD

Tests run automatically via GitHub Actions on every push to `main`.

![CI](https://github.com/natccc/playwright-saucedemo/actions/workflows/playwright.yml/badge.svg)

## Running Locally

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Run all tests
npx playwright test

# Run tests with UI mode
npx playwright test --ui

# View test report
npx playwright show-report
```

## What I'm Learning

- Structuring tests using **Page Object Model** to separate page interactions from test logic
- Writing maintainable, reusable test code in **TypeScript**
- Setting up **CI pipelines** with GitHub Actions to run tests on every push
- Applying test design principles such as boundary testing and negative path coverage
