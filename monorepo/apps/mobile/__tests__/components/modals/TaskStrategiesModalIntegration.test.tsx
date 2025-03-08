import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { TaskStrategiesModal } from '../../../src/components/modals/TaskStrategiesModal';
import { TouchableOpacity } from 'react-native';
import { Store, AnyAction } from 'redux';

// Store the notification callback in a variable instead of using global
let notificationResponseCallback: ((response: any) => void) | null = null;

// Create a mock store
const createMockStore = (): Store<any, AnyAction> => ({
  getState: jest.fn(),
  dispatch: jest.fn(),
  subscribe: jest.fn(() => jest.fn()),
  replaceReducer: jest.fn(),
  [Symbol.observable]: jest.fn(),
});

// Mock the Redux store
jest.mock('store', () => {
  const originalModule = jest.requireActual('store');
  return {
    ...originalModule,
    useAppSelector: jest.fn(),
    useAppDispatch: jest.fn(),
    openTaskStrategiesModal: jest.fn((taskId) => ({ 
      type: 'ui/openTaskStrategiesModal', 
      payload: taskId 
    })),
    closeTaskStrategiesModal: jest.fn(() => ({ 
      type: 'ui/closeTaskStrategiesModal' 
    })),
    toggleTaskCompletion: jest.fn((id) => ({ 
      type: 'tasks/toggleTaskCompletion', 
      payload: id 
    })),
  };
});

describe('TaskStrategiesModal Integration Tests', () => {
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
  
  it('displays tasks and strategies when modal is open', () => {
    // Render the TaskStrategiesModal component
    const { getByText } = render(
      <Provider store={mockStore}>
        <TaskStrategiesModal />
      </Provider>
    );
    
    // Check that task titles are rendered
    expect(getByText('Drink 2L of Water')).toBeTruthy();
    expect(getByText('Meditate 10 minutes')).toBeTruthy();
    
    // Check that strategies are rendered
    expect(getByText('Set an hourly reminder')).toBeTruthy();
    expect(getByText('Keep a bottle within reach')).toBeTruthy();
    expect(getByText('Track with a water app')).toBeTruthy();
  });
  
  it('displays only the selected task when selectedTaskId is provided', () => {
    // Mock the useAppSelector hook for this specific test
    const { useAppSelector } = require('store');
    useAppSelector.mockImplementation((selector: (state: any) => any) => {
      const state = {
        tasks: { items: mockTasks, isLoading: false, error: null },
        ui: { isTaskStrategiesModalOpen: true, selectedTaskId: '1' }
      };
      return selector(state);
    });
    
    // Render the TaskStrategiesModal component
    const { getByText, queryByText } = render(
      <Provider store={mockStore}>
        <TaskStrategiesModal />
      </Provider>
    );
    
    // Check that only the selected task is rendered
    expect(getByText('Drink 2L of Water')).toBeTruthy();
    expect(queryByText('Meditate 10 minutes')).toBeNull();
    
    // Check that only the strategies for the selected task are rendered
    expect(getByText('Set an hourly reminder')).toBeTruthy();
    expect(queryByText('Use a guided meditation app')).toBeNull();
  });
  
  it('dispatches closeTaskStrategiesModal when Close button is pressed', () => {
    // Render the TaskStrategiesModal component
    const { getByText } = render(
      <Provider store={mockStore}>
        <TaskStrategiesModal />
      </Provider>
    );
    
    // Find and press the Close button
    const closeButton = getByText('Close');
    fireEvent.press(closeButton);
    
    // Check that the closeTaskStrategiesModal action was dispatched
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'ui/closeTaskStrategiesModal'
      })
    );
  });
  
  it('dispatches toggleTaskCompletion when checkbox is pressed', () => {
    // Render the TaskStrategiesModal component
    const { UNSAFE_getAllByType } = render(
      <Provider store={mockStore}>
        <TaskStrategiesModal />
      </Provider>
    );
    
    // Find and press the first task's checkbox
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
  
  it('applies completed style to completed tasks', () => {
    // Mock the useAppSelector hook for this specific test
    const { useAppSelector } = require('store');
    useAppSelector.mockImplementation((selector: (state: any) => any) => {
      const state = {
        tasks: { 
          items: [
            { ...mockTasks[0], completed: true },
            { ...mockTasks[1] }
          ], 
          isLoading: false, 
          error: null 
        },
        ui: { isTaskStrategiesModalOpen: true, selectedTaskId: null }
      };
      return selector(state);
    });
    
    // Render the TaskStrategiesModal component
    const { getByText } = render(
      <Provider store={mockStore}>
        <TaskStrategiesModal />
      </Provider>
    );
    
    // Get the task title elements
    const completedTaskTitle = getByText('Drink 2L of Water');
    const incompleteTaskTitle = getByText('Meditate 10 minutes');
    
    // Check that the completed task has the completed style
    const styles = completedTaskTitle.props.style;
    const hasLineThrough = styles.some((style: any) => 
      style && typeof style === 'object' && 
      (style.textDecorationLine === 'line-through' || 
       (Array.isArray(style) && style.some(s => s && s.textDecorationLine === 'line-through')))
    );
    expect(hasLineThrough).toBe(true);
    
    // Check that the incomplete task does not have the completed style
    const incompleteStyles = incompleteTaskTitle.props.style;
    const incompleteHasLineThrough = incompleteStyles.some((style: any) => 
      style && typeof style === 'object' && 
      (style.textDecorationLine === 'line-through' || 
       (Array.isArray(style) && style.some(s => s && s.textDecorationLine === 'line-through')))
    );
    expect(incompleteHasLineThrough).toBe(false);
  });
}); 