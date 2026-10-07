# Playwright QA Framework

Starter framework using Playwright Test and TypeScript, organized with Page Objects, fixtures, utilities, and isolated test data.

## Requirements

- Node.js 22.x, 24.x, or 26.x
- npm

## Setup

1. Run npm install.
2. Run npx playwright install chromium.
3. Copy .env.example to .env.
4. Set BASE_URL in .env to the application under test.

## Run

- npm test
- npm run test:headed
- npm run test:ui
- npm run report
- npm run typecheck

The HTML report, traces, screenshots, and videos are generated for review. Screenshots and traces are retained on failure.

## Structure

- src/pages/: Page Objects and reusable UI actions
- src/fixtures/: Playwright fixtures and test lifecycle setup
- src/tests/: Independent test specs
- src/utils/: Structured logger and unique test data helper
- test-data/: External JSON/YAML/CSV test data
- playwright.config.ts: Browser, retries, reporters, and failure artifacts

## Signup automation

Set SIGNUP_URL in .env to the Create Account page (the supplied .env.example contains the Sauce Demo URL). Run signup with npx playwright test src/tests/signup.spec.ts and signin with npx playwright test src/tests/signin.spec.ts. Signup uses EMAIL from .env with a persistent Gmail +N alias counter and PASSWORD from .env; it creates a customer account in the demo store when run.

The Sauce Demo signup form may require hCaptcha. If it blocks submission, the signup test fails until the challenge is completed or the site provides a test environment with CAPTCHA disabled.

Set EMAIL and PASSWORD in .env for the existing customer account used by signin. Signup reads the same credentials, converts EMAIL to a Gmail plus alias, and persists the alias counter in the ignored test-data/signup-counter.json file. The first run uses +1; each later run increments the number. Credential-based specs disable screenshots, video, and traces to keep secrets out of test artifacts.


