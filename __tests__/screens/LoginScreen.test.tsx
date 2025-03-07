import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../../screens/LoginScreen';

// Mock the navigation prop
const mockNavigation = {
  replace: jest.fn(),
};

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <LoginScreen navigation={mockNavigation as any} />
    );

    expect(getByText('Protocol Pro')).toBeTruthy();
    expect(getByText('Welcome back!')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
  });

  it('updates email and password inputs', () => {
    const { getByPlaceholderText } = render(
      <LoginScreen navigation={mockNavigation as any} />
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });

  it('navigates to FollowerDashboard when follower role is selected', () => {
    const { getByText } = render(
      <LoginScreen navigation={mockNavigation as any} />
    );

    // Ensure follower role is selected (default)
    const followerButton = getByText('Follower');
    fireEvent.press(followerButton);

    // Press sign in button
    const signInButton = getByText('Sign In');
    fireEvent.press(signInButton);

    expect(mockNavigation.replace).toHaveBeenCalledWith('FollowerDashboard');
  });

  it('navigates to InstructorDashboard when instructor role is selected', () => {
    const { getByText } = render(
      <LoginScreen navigation={mockNavigation as any} />
    );

    // Select instructor role
    const instructorButton = getByText('Instructor');
    fireEvent.press(instructorButton);

    // Press sign in button
    const signInButton = getByText('Sign In');
    fireEvent.press(signInButton);

    expect(mockNavigation.replace).toHaveBeenCalledWith('InstructorDashboard');
  });

  it('toggles between login and signup mode', () => {
    const { getByText } = render(
      <LoginScreen navigation={mockNavigation as any} />
    );

    const toggleLink = getByText('Create one');
    fireEvent.press(toggleLink);

    // Note: This test would need to be expanded if the UI actually changes between login/signup modes
  });
}); 