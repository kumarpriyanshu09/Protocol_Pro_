import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ErrorBoundary from '../../components/ErrorBoundary';
import { Text, View } from 'react-native';

// Create a component that will throw an error
const ErrorComponent = ({ shouldThrow = false }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return null;
};

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
        <ErrorComponent shouldThrow={false} />
        <Text>Normal content</Text>
      </ErrorBoundary>
    );
    
    expect(getByText('Normal content')).toBeTruthy();
  });

  it('renders error UI when a child component throws', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );
    
    expect(getByText('Something went wrong')).toBeTruthy();
    expect(getByText(/Test error/)).toBeTruthy();
    expect(getByText('Try Again')).toBeTruthy();
  });

  it('resets error state when Try Again button is pressed', () => {
    // Create a component that can control its error state
    type ResetFunction = () => void;
    
    interface ErrorTriggerProps {
      setResetFn: (fn: ResetFunction) => void;
    }
    
    const ErrorTrigger: React.FC<ErrorTriggerProps> = ({ setResetFn }) => {
      const [shouldThrow, setShouldThrow] = React.useState(true);
      
      React.useEffect(() => {
        setResetFn(() => setShouldThrow(false));
      }, [setResetFn]);
      
      if (shouldThrow) {
        throw new Error('Test error');
      }
      
      return <Text>Recovered</Text>;
    };
    
    let resetFn: ResetFunction = () => {};
    
    const { getByText } = render(
      <ErrorBoundary>
        <ErrorTrigger setResetFn={(fn) => { resetFn = fn; }} />
      </ErrorBoundary>
    );
    
    // Error UI should be shown
    expect(getByText('Something went wrong')).toBeTruthy();
    
    // Press the Try Again button
    fireEvent.press(getByText('Try Again'));
    
    // Simulate the component not throwing on re-render
    resetFn();
    
    // Component should recover
    expect(getByText('Recovered')).toBeTruthy();
  });
}); 