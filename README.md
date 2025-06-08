# SauceDemo Playwright Automation Framework

This project is a UI test automation framework for [SauceDemo](https://www.saucedemo.com/), built with [Playwright](https://playwright.dev/) and TypeScript. It automates login, sorting, and purchase-related workflows using a modular and maintainable structure.

## Features

- Written in TypeScript using the Playwright Test Runner
- Page Object Model (POM) for maintainability and reuse
- Organized into clearly separated folders for pages, tests, and utilities
- Uses data-driven testing via external JSON for multiple user roles
- Includes test assertions and helper methods for common actions

## Project Structure

sauceDemoPlaywrightProject/
├── pages/ # Page Object classes
├── tests/ # Test specifications grouped by feature
├── utils/ # Helper utilities and JSON data reader
├── test-data/ # External test data in JSON format
├── playwright.config.ts # Playwright test runner configuration
└── README.md # Project overview and documentation


## Getting Started

1. Install dependencies:

    ```
    npm install
    ```

2. Run all tests:

    ```
    npx playwright test
    ```

3. Run tests in headed mode (for visual debugging):

    ```
    npx playwright test --headed
    ```

4. View the HTML test report:

    ```
    npx playwright show-report
    ```

## Test Data

User credentials are stored in `test-data/users.json` and accessed dynamically in tests. User types include:

- Standard User
- Locked Out User
- Problem User
- Error User

## Requirements

- Node.js v18 or higher
- Playwright v1.40 or higher (installed via `npm install`)

## Author

Nejra Trle  
[GitHub Profile](https://github.com/nejratrle)
