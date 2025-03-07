import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ErrorBoundary from '../../components/ErrorBoundary';
import { Text } from 'react-native';

// Create a component that will throw an error when shouldThrow is true
class ThrowableComponent extends React.Component<{ shouldThrow: boolean }> {
  render() {
    if (this.props.shouldThrow) {
      throw new Error('Test error');
    }
    return <Text testID="recovered-text">Recovered</Text>;
  }
}

// Mock console.error to prevent test output pollution
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <Text>Normal content</Text>
      </ErrorBoundary>
    );
    
    expect(getByText('Normal content')).toBeTruthy();
  });

  it('renders error UI when a child component throws', () => {
    const { getByTestId } = render(
      <ErrorBoundary>
        <ThrowableComponent shouldThrow={true} />
      </ErrorBoundary>
    );
    
    expect(getByTestId('error-boundary-title')).toBeTruthy();
    expect(getByTestId('error-boundary-message')).toBeTruthy();
    expect(getByTestId('error-boundary-reset-button')).toBeTruthy();
  });

  it('resets error state when Try Again button is pressed', () => {
    // First render with a component that throws
    const { getByTestId, rerender } = render(
      <ErrorBoundary testID="error-boundary">
        <ThrowableComponent shouldThrow={true} />
      </ErrorBoundary>
    );
    
    // Verify error UI is shown
    expect(getByTestId('error-boundary-fallback')).toBeTruthy();
    
    // Press the Try Again button
    fireEvent.press(getByTestId('error-boundary-reset-button'));
    
    // Re-render with forceReset=true and shouldThrow=false to simulate recovery
    rerender(
      <ErrorBoundary testID="error-boundary" forceReset={true}>
        <ThrowableComponent shouldThrow={false} />
      </ErrorBoundary>
    );
    
    // Verify the recovered content is shown
    expect(getByTestId('recovered-text')).toBeTruthy();
  });
}); 