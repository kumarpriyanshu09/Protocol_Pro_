import React from 'react';
import { render } from '@testing-library/react-native';
import LoadingIndicator from '../../components/LoadingIndicator';

describe('LoadingIndicator', () => {
  it('renders correctly with default props', () => {
    const { getByText, getByTestId } = render(
      <LoadingIndicator />
    );
    
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('renders with custom message', () => {
    const customMessage = 'Please wait...';
    const { getByText } = render(
      <LoadingIndicator message={customMessage} />
    );
    
    expect(getByText(customMessage)).toBeTruthy();
  });

  it('applies fullScreen style when fullScreen prop is true', () => {
    const { getByTestId } = render(
      <LoadingIndicator fullScreen={true} />
    );
    
    const container = getByTestId('loading-container');
    expect(container.props.style).toContainEqual(
      expect.objectContaining({
        flex: 1,
        backgroundColor: '#000000',
      })
    );
  });
}); 