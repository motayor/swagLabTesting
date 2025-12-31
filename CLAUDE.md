# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Playwright testing portfolio that combines a simple Vite + TypeScript counter application with Playwright end-to-end tests. The project demonstrates testing capabilities against both the local application and external sites.

## Commands

### Development
```bash
npm run dev          # Start Vite dev server
npm run build        # Type check with tsc and build with Vite
npm run preview      # Preview production build
```

### Testing
```bash
npx playwright test                    # Run all tests
npx playwright test <filename>         # Run specific test file
npx playwright test --headed           # Run tests in headed mode
npx playwright test --debug            # Run tests in debug mode
npx playwright show-report             # Show HTML test report
npx playwright install --with-deps     # Install Playwright browsers
```

### Formatting
```bash
npx prettier --write .                 # Format all files
```

## Architecture

### Testing Setup
- **Base URL**: Configured to `https://www.saucedemo.com/` in `playwright.config.ts:29`
- **Browser**: Only Chromium is enabled (Firefox and WebKit are commented out)
- **Headless Mode**: Disabled by default (`headless: false` in config)
- **Test Directory**: `./tests`
- **Parallel Execution**: Enabled (`fullyParallel: true`)
- **CI Configuration**:
  - Retries: 2 on CI, 0 locally
  - Workers: 1 on CI, unlimited locally
  - Reporter: HTML

### Application Structure
- **Frontend**: Vite + TypeScript counter application in `src/main.ts`
- **Entry Point**: `index.html` serves as the main HTML file
- **Counter Logic**: Simple counter with +1, +2, -1, -2 buttons (note: -2 button is incomplete in source)
- **Counter Wrapping**: Values wrap at ±100

### Test Files
- `tests/homePage.spec.ts`: Basic homepage navigation test
- `tests/example.spec.ts`: Playwright.dev example tests

### CI/CD
GitHub Actions workflow runs tests on push/PR to main/master branches. Tests run on Ubuntu with Node LTS.