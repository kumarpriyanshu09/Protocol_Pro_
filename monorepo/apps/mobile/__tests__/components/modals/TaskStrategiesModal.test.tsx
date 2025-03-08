import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { TaskStrategiesModal } from '../../../src/components/modals/TaskStrategiesModal';
import { TouchableOpacity } from 'react-native';
import { Store, AnyAction } from 'redux';

// Mock the Redux store
jest.mock('store', () => {
  const originalModule = jest.requireActual('store');
  return {
    ...originalModule,
    useAppSelector: jest.fn(),
    useAppDispatch: jest.fn(),
    closeTaskStrategiesModal: jest.fn(() => ({ 
      type: 'ui/closeTaskStrategiesModal' 
    })),
    toggleTaskCompletion: jest.fn((id) => ({ 
      type: 'tasks/toggleTaskCompletion', 
      payload: id 
    })),
  };
});

// Create a mock store
const createMockStore = (): Store<any, AnyAction> => ({
  getState: jest.fn(),
  dispatch: jest.fn(),
  subscribe: jest.fn(() => jest.fn()),
  replaceReducer: jest.fn(),
  [Symbol.observable]: jest.fn(),
});

describe('TaskStrategiesModal Tests', () => {
  const mockTasks = [
    {
      id: '1',
      title: 'Drink 2L of Water',
      description: 'Stay hydrated throughout the day',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      strategies: [
        'Set an hourly reminder',
        'Keep a bottle within reach',
        'Track with a water app'
      ],
    },
    {
      id: '2',
      title: 'Meditate 10 minutes',
      description: 'Practice mindfulness daily',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      strategies: [
        'Use a guided meditation app',
        'Find a quiet, comfortable spot',
        'Schedule a consistent time'
      ],
    }
  ];

  let mockDispatch: jest.Mock;
  let mockStore: Store<any, AnyAction>;
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Create a new mock store for each test
    mockStore = createMockStore();
    
    // Mock the useAppSelector hook
    const { useAppSelector } = require('store');
    useAppSelector.mockImplementation((selector: (state: any) => any) => {
      const state = {
        tasks: { items: mockTasks, isLoading: false, error: null },
        ui: { isTaskStrategiesModalOpen: true, selectedTaskId: null }
      };
      return selector(state);
    });
    
    // Mock the useAppDispatch hook
    const { useAppDispatch } = require('store');
    mockDispatch = jest.fn();
    useAppDispatch.mockReturnValue(mockDispatch);
  });

  it('renders correctly when modal is closed', () => {
    // Mock the useAppSelector hook for this specific test
    const { useAppSelector } = require('store');
    useAppSelector.mockImplementation((selector: (state: any) => any) => {
      const state = {
        tasks: { items: mockTasks, isLoading: false, error: null },
        ui: { isTaskStrategiesModalOpen: false, selectedTaskId: null }
      };
      return selector(state);
    });

    const { queryByText } = render(
      <Provider store={mockStore}>
        <TaskStrategiesModal />
      </Provider>
    );

    // Modal is closed, so we shouldn't see any task titles
    expect(queryByText('Drink 2L of Water')).toBeNull();
    expect(queryByText('Meditate 10 minutes')).toBeNull();
  });

  it('renders correctly when modal is open', () => {
    const { getByText } = render(
      <Provider store={mockStore}>
        <TaskStrategiesModal />
      </Provider>
    );

    // Modal is open, so we should see task titles and strategies
    expect(getByText('Drink 2L of Water')).toBeTruthy();
    expect(getByText('Meditate 10 minutes')).toBeTruthy();
    expect(getByText('Set an hourly reminder')).toBeTruthy();
    expect(getByText('Use a guided meditation app')).toBeTruthy();
  });

  it('renders only the selected task when selectedTaskId is provided', () => {
    // Mock the useAppSelector hook for this specific test
    const { useAppSelector } = require('store');
    useAppSelector.mockImplementation((selector: (state: any) => any) => {
      const state = {
        tasks: { items: mockTasks, isLoading: false, error: null },
        ui: { isTaskStrategiesModalOpen: true, selectedTaskId: '1' }
      };
      return selector(state);
    });

    const { getByText, queryByText } = render(
      <Provider store={mockStore}>
        <TaskStrategiesModal />
      </Provider>
    );

    // Should show the selected task
    expect(getByText('Drink 2L of Water')).toBeTruthy();
    expect(getByText('Set an hourly reminder')).toBeTruthy();
    
    // Should not show the other task
    expect(queryByText('Meditate 10 minutes')).toBeNull();
    expect(queryByText('Use a guided meditation app')).toBeNull();
  });

  it('closes the modal when the Close button is pressed', () => {
    const { getByText } = render(
      <Provider store={mockStore}>
        <TaskStrategiesModal />
      </Provider>
    );

    // Modal is open, so we should see the Close button
    const closeButton = getByText('Close');
    expect(closeButton).toBeTruthy();

    // Press the Close button
    fireEvent.press(closeButton);

    // Check that the closeTaskStrategiesModal action was dispatched
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'ui/closeTaskStrategiesModal'
      })
    );
  });

  it('toggles task completion when checkbox is pressed', () => {
    const { UNSAFE_getAllByType } = render(
      <Provider store={mockStore}>
        <TaskStrategiesModal />
      </Provider>
    );

    // Find all TouchableOpacity components
    const touchables = UNSAFE_getAllByType(TouchableOpacity);
    
    // Find the checkbox for the first task (not the Close button)
    const checkbox = touchables.find(t => 
      t.props.onPress && 
      t.props.onPress.toString().includes('handleToggleCompletion')
    );
    
    if (checkbox) {
      fireEvent.press(checkbox);
    } else {
      // If we can't find the checkbox by its onPress handler, try the first touchable
      fireEvent.press(touchables[0]);
    }

    // Check that the toggleTaskCompletion action was dispatched with the correct task ID
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'tasks/toggleTaskCompletion',
        payload: '1'
      })
    );
  });
}); 