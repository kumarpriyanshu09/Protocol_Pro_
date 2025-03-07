import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TaskItem from '../../components/dashboard/TaskItem';

// Mock the gesture handler
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  return {
    PanGestureHandler: ({ children }: { children: React.ReactNode }) => children,
    State: {
      ACTIVE: 'ACTIVE',
      END: 5,
    },
  };
});

// Mock Animated
jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  rn.Animated = {
    ...rn.Animated,
    View: rn.View,
    event: jest.fn(),
    spring: jest.fn().mockReturnValue({ start: jest.fn() }),
    Value: jest.fn().mockReturnValue({
      setValue: jest.fn(),
    }),
  };
  return rn;
});

// Mock the TaskContext values
const mockToggleTask = jest.fn();
const mockShowNotification = jest.fn();

jest.mock('../../context/TaskContext', () => ({
  useTaskContext: () => ({
    completedTasks: ['Task 1'],
    toggleTask: mockToggleTask,
    showNotification: mockShowNotification,
  }),
}));

describe('TaskItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = render(
      <TaskItem item="Test Task" index={0} />
    );

    expect(getByText('Test Task')).toBeTruthy();
  });

  it('calls toggleTask when pressed', () => {
    const { getByText } = render(
      <TaskItem item="Test Task" index={0} />
    );

    fireEvent.press(getByText('Test Task'));
    expect(mockToggleTask).toHaveBeenCalledWith('Test Task');
  });

  it('shows completed state when task is in completedTasks', () => {
    const { getByText } = render(
      <TaskItem item="Task 1" index={0} />
    );

    const taskText = getByText('Task 1');
    expect(taskText.props.style).toContainEqual(
      expect.objectContaining({
        textDecorationLine: 'line-through',
      })
    );
  });
}); 