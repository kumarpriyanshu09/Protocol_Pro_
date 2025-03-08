import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { TaskStrategiesModal } from '../../../src/components/modals/TaskStrategiesModal';
import { TouchableOpacity } from 'react-native';

// Mock the Redux actions
jest.mock('store', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
  closeTaskStrategiesModal: jest.fn(() => ({ type: 'ui/closeTaskStrategiesModal' })),
  toggleTaskCompletion: jest.fn((id) => ({ type: 'tasks/toggleTaskCompletion', payload: id })),
}));

// Create a mock store with the Redux Store type
const mockStore = (state: any) => {
  return {
    getState: () => state,
    dispatch: jest.fn(),
    subscribe: jest.fn(),
    replaceReducer: jest.fn(),
    [Symbol.observable]: jest.fn(),
  };
};

describe('TaskStrategiesModal UI Tests', () => {
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

  // Mock the useAppSelector hook before each test
  beforeEach(() => {
    const { useAppSelector } = require('store');
    useAppSelector.mockImplementation((selector: (state: any) => any) => {
      const state = {
        tasks: { items: mockTasks, isLoading: false, error: null },
        ui: { isTaskStrategiesModalOpen: true, selectedTaskId: null }
      };
      return selector(state);
    });
  });

  it('renders task titles and strategies when modal is open', () => {
    // Create a mock store with the modal open and tasks loaded
    const store = mockStore({
      tasks: { items: mockTasks, isLoading: false, error: null },
      ui: { isTaskStrategiesModalOpen: true, selectedTaskId: null }
    });

    // Render the component with the mock store
    const { getByText } = render(
      <Provider store={store}>
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
    expect(getByText('Use a guided meditation app')).toBeTruthy();
    expect(getByText('Find a quiet, comfortable spot')).toBeTruthy();
    expect(getByText('Schedule a consistent time')).toBeTruthy();

    // Check that the "Strategies:" label appears for each task
    const strategiesLabels = screen.getAllByText('Strategies:');
    expect(strategiesLabels.length).toBe(2);
  });

  it('renders task descriptions when available', () => {
    // Create a mock store with the modal open and tasks loaded
    const store = mockStore({
      tasks: { items: mockTasks, isLoading: false, error: null },
      ui: { isTaskStrategiesModalOpen: true, selectedTaskId: null }
    });

    // Render the component with the mock store
    const { getByText } = render(
      <Provider store={store}>
        <TaskStrategiesModal />
      </Provider>
    );

    // Check that task descriptions are rendered
    expect(getByText('Stay hydrated throughout the day')).toBeTruthy();
    expect(getByText('Practice mindfulness daily')).toBeTruthy();
  });

  it('renders a message when no tasks are available', () => {
    // Mock the useAppSelector hook for this specific test
    const { useAppSelector } = require('store');
    useAppSelector.mockImplementation((selector: (state: any) => any) => {
      const state = {
        tasks: { items: [], isLoading: false, error: null },
        ui: { isTaskStrategiesModalOpen: true, selectedTaskId: null }
      };
      return selector(state);
    });

    // Create a mock store with the modal open but no tasks
    const store = mockStore({
      tasks: { items: [], isLoading: false, error: null },
      ui: { isTaskStrategiesModalOpen: true, selectedTaskId: null }
    });

    // Render the component with the mock store
    const { getByText } = render(
      <Provider store={store}>
        <TaskStrategiesModal />
      </Provider>
    );

    // Check that the "No tasks available" message is rendered
    expect(getByText('No tasks available')).toBeTruthy();
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

    // Create a mock store with the modal open and a specific task selected
    const store = mockStore({
      tasks: { items: mockTasks, isLoading: false, error: null },
      ui: { isTaskStrategiesModalOpen: true, selectedTaskId: '1' }
    });

    // Render the component with the mock store
    const { getByText, queryByText } = render(
      <Provider store={store}>
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
    // Mock the useAppDispatch hook
    const { useAppDispatch } = require('store');
    const mockDispatch = jest.fn();
    useAppDispatch.mockReturnValue(mockDispatch);

    // Create a mock store with the modal open and tasks loaded
    const store = mockStore({
      tasks: { items: mockTasks, isLoading: false, error: null },
      ui: { isTaskStrategiesModalOpen: true, selectedTaskId: null }
    });

    // Render the component with the mock store
    const { getByText } = render(
      <Provider store={store}>
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
    // Mock the useAppDispatch hook
    const { useAppDispatch } = require('store');
    const mockDispatch = jest.fn();
    useAppDispatch.mockReturnValue(mockDispatch);

    // Create a mock store with the modal open and tasks loaded
    const store = mockStore({
      tasks: { items: mockTasks, isLoading: false, error: null },
      ui: { isTaskStrategiesModalOpen: true, selectedTaskId: null }
    });

    // Render the component with the mock store
    const { getByText, UNSAFE_getAllByType } = render(
      <Provider store={store}>
        <TaskStrategiesModal />
      </Provider>
    );

    // Find and press the first task's checkbox
    // Use UNSAFE_getAllByType to find all TouchableOpacity components
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

    // Create a mock store with the modal open and tasks loaded
    const store = mockStore({
      tasks: { 
        items: [
          { ...mockTasks[0], completed: true },
          { ...mockTasks[1] }
        ], 
        isLoading: false, 
        error: null 
      },
      ui: { isTaskStrategiesModalOpen: true, selectedTaskId: null }
    });

    // Render the component with the mock store
    const { getByText } = render(
      <Provider store={store}>
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