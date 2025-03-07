import React from 'react';
import { render } from '@testing-library/react-native';
import ProgressBar from '../../components/ProgressBar';

describe('ProgressBar', () => {
  it('renders correctly with given progress', () => {
    const { getByTestId } = render(
      <ProgressBar progress={50} />
    );
    
    const progressBar = getByTestId('progress-bar');
    expect(progressBar.props.style).toContainEqual(
      expect.objectContaining({
        width: '50%',
      })
    );
  });
  
  it('renders with 0% progress', () => {
    const { getByTestId } = render(
      <ProgressBar progress={0} />
    );
    
    const progressBar = getByTestId('progress-bar');
    expect(progressBar.props.style).toContainEqual(
      expect.objectContaining({
        width: '0%',
      })
    );
  });
  
  it('renders with 100% progress', () => {
    const { getByTestId } = render(
      <ProgressBar progress={100} />
    );
    
    const progressBar = getByTestId('progress-bar');
    expect(progressBar.props.style).toContainEqual(
      expect.objectContaining({
        width: '100%',
      })
    );
  });
  
  it('clamps progress values above 100 to 100%', () => {
    const { getByTestId } = render(
      <ProgressBar progress={120} />
    );
    
    const progressBar = getByTestId('progress-bar');
    expect(progressBar.props.style).toContainEqual(
      expect.objectContaining({
        width: '100%',
      })
    );
  });
}); 