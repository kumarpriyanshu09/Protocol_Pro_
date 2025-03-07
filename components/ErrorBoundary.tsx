import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  /**
   * The child components to be rendered and monitored for errors.
   */
  children: ReactNode;
  
  /**
   * Optional custom fallback component to render when an error occurs.
   * If not provided, the default error UI will be used.
   */
  fallback?: ReactNode;
  
  /**
   * Optional callback function that will be called when an error is caught.
   * Useful for logging errors to an external service.
   */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  
  /**
   * Optional test ID for testing purposes.
   */
  testID?: string;
  
  /**
   * For testing purposes only - forces the error boundary to reset.
   * This should only be used in tests.
   */
  forceReset?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary component that catches JavaScript errors in its child component tree,
 * logs those errors, and displays a fallback UI instead of crashing the whole app.
 * 
 * Usage:
 * ```tsx
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }
  
  static getDerivedStateFromProps(props: Props, state: State): Partial<State> | null {
    // For testing purposes only - allows forcing a reset from props
    if (props.forceReset && state.hasError) {
      return {
        hasError: false,
        error: null,
        errorInfo: null
      };
    }
    return null;
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo
    });
    
    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    // Log the error to console
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Otherwise, use the default error UI
      return (
        <View 
          style={styles.container}
          accessible={true}
          accessibilityRole="alert"
          accessibilityLiveRegion="assertive"
          testID="error-boundary-fallback"
        >
          <Text 
            style={styles.title}
            accessibilityRole="header"
            testID="error-boundary-title"
          >
            Something went wrong
          </Text>
          <Text 
            style={styles.message}
            testID="error-boundary-message"
          >
            {this.state.error?.toString() || 'An unexpected error occurred'}
          </Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={this.resetError}
            accessible={true}
            accessibilityLabel="Try Again button"
            accessibilityRole="button"
            accessibilityHint="Attempt to recover from the error"
            testID="error-boundary-reset-button"
          >
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View testID={this.props.testID} style={{ flex: 1 }}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0A84FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ErrorBoundary; 