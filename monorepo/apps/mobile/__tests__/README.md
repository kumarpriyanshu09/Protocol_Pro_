# Task Strategies Modal Tests

This directory contains tests for the Task Strategies Modal feature, which displays tasks and their associated best-practice strategies when triggered by a push notification or an in-app button.

## Test Structure

The tests are organized as follows:

1. **Component Tests**: Tests for the TaskStrategiesModal component
   - `components/modals/TaskStrategiesModal.test.tsx`: Tests the Redux integration
   - `components/modals/TaskStrategiesModalUI.test.tsx`: Tests the UI rendering

2. **Integration Tests**: Tests for the notification handling and modal triggering
   - `NotificationHandling.test.tsx`: Tests the notification response handling
   - `HomeScreen.test.tsx`: Tests the in-app button triggering

## Running the Tests

To run all tests:

```bash
# From the monorepo root
cd apps/mobile
npm test
```

To run a specific test file:

```bash
# From the monorepo root
cd apps/mobile
npm test -- -t "TaskStrategiesModal"
```

To run tests with coverage:

```bash
# From the monorepo root
cd apps/mobile
npm run test:coverage
```

## Test Coverage

These tests cover:

1. **Modal Rendering**: Verifies that the modal correctly displays tasks and their strategies
2. **Task Selection**: Tests that the modal can show all tasks or a specific task
3. **Task Completion**: Tests that tasks can be marked as complete from the modal
4. **Modal Closing**: Tests that the modal can be closed with the Close button
5. **Notification Handling**: Tests that the modal opens when a "Habit" notification is tapped
6. **Button Triggering**: Tests that the modal opens when the "Show Tasks" button is pressed

## Mocks

The tests use the following mocks:

- **Redux Store**: A mock store for testing Redux integration
- **Expo Notifications**: Mocks for notification handling
- **React Navigation**: Mocks for navigation

## Adding New Tests

When adding new tests, follow these guidelines:

1. Place component tests in the `components` directory
2. Use the existing mock patterns for Redux and notifications
3. Test both the UI rendering and the Redux integration
4. For notification tests, use the `notificationResponseCallback` global variable 