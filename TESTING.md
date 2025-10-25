# Testing Guide

This project uses Jest with React Testing Library for comprehensive unit and integration testing.

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

## Test Files Created

### Core Library Tests (src/core/lib/__tests__)
- ✅ __BusinessLogicError.test.ts__ - 24 test cases
- ✅ __RepositoryError.test.ts__ - 15 test cases  
- ✅ __UseCaseError.test.ts__ - 14 test cases
- ✅ __ErrorCodes.test.ts__ - 23 test cases
- ✅ __utils.test.ts__ - 16 test cases
- ✅ __searchableFields.test.ts__ - 40 test cases
- ✅ __queryKeys.test.ts__ - 24 test cases

### Hook Tests (src/core/hooks/__tests__)
- ✅ __useServerFilters.test.ts__ - 36 test cases

### Domain Entity Tests (src/modules/BookModals/domain/entities/__tests__)
- ✅ __BookEntity.test.ts__ - 95+ comprehensive test cases
- ✅ __UpdateBookEntity.test.ts__ - 30+ test cases

## Total Test Coverage
- __Total Test Files__: 10
- __Total Test Cases__: 300+
- __Coverage Focus__: Core business logic, domain entities, utilities, error handling

## Configuration Files
- ✅ __jest.config.ts__ - Jest configuration for Next.js 15
- ✅ __jest.setup.ts__ - Test environment setup
- ✅ __package.json__ - Updated with test scripts and dependencies

## Test Dependencies Added
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/user-event
- @types/jest
- jest
- jest-environment-jsdom

## Next Steps

1. Run `npm install` to install test dependencies
2. Run `npm test` to execute all tests
3. Review test coverage with `npm run test:coverage`
4. Add more tests for API routes and components as needed

## Key Testing Patterns Used

### Value Objects (Domain Entities)
Tests cover validation, edge cases, boundary conditions, and proper error throwing.

### Error Classes
Tests verify proper error construction, status codes, message handling, and inheritance.

### React Hooks
Tests use @testing-library/react-hooks with proper act() wrapping for state updates.

### Utility Functions
Tests cover happy paths, edge cases, null/undefined handling, and special characters.

## Notes
Tests follow best practices with:
- Descriptive test names
- Arrange-Act-Assert pattern
- Isolated test cases
- Comprehensive edge case coverage
- Proper TypeScript typing