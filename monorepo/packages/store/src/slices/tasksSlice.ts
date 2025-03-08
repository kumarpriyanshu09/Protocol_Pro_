import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define types
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  protocolId?: string;
  createdAt: string;
  updatedAt: string;
  strategies: string[];
}

interface TasksState {
  items: Task[];
  isLoading: boolean;
  error: string | null;
}

// Define initial state
const initialState: TasksState = {
  items: [],
  isLoading: false,
  error: null,
};

// Create async thunks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      // This would be replaced with actual API call
      // const response = await api.tasks.getAll();
      // return response.data;
      
      // Mock response for now with strategies
      return [
        {
          id: '1',
          title: 'Complete workout',
          description: 'Do 30 minutes of cardio',
          completed: false,
          dueDate: '2023-06-30',
          protocolId: '1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          strategies: [
            'Start with a 5-minute warm-up',
            'Mix cardio with short strength intervals',
            'Cool down with stretching for 5 minutes'
          ]
        },
        {
          id: '2',
          title: 'Drink water',
          description: 'Drink 2 liters of water',
          completed: true,
          dueDate: '2023-06-29',
          protocolId: '1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          strategies: [
            'Set hourly reminders on your phone',
            'Keep a reusable water bottle nearby',
            'Track your intake with a hydration app'
          ]
        },
        {
          id: '3',
          title: 'Meditate',
          description: 'Meditate for 10 minutes',
          completed: false,
          dueDate: '2023-06-30',
          protocolId: '1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          strategies: [
            'Find a quiet, comfortable spot',
            'Use a guided meditation app',
            'Schedule a consistent time each day'
          ]
        },
      ];
    } catch (error) {
      return rejectWithValue('Failed to fetch tasks');
    }
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      // This would be replaced with actual API call
      // const response = await api.tasks.create(task);
      // return response.data;
      
      // Mock response for now
      return {
        ...task,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        strategies: task.strategies || [] // Ensure strategies is included
      };
    } catch (error) {
      return rejectWithValue('Failed to add task');
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, updates }: { id: string; updates: Partial<Task> }, { rejectWithValue }) => {
    try {
      // This would be replaced with actual API call
      // const response = await api.tasks.update(id, updates);
      // return response.data;
      
      // Mock response for now
      return {
        id,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
    } catch (error) {
      return rejectWithValue('Failed to update task');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: string, { rejectWithValue }) => {
    try {
      // This would be replaced with actual API call
      // await api.tasks.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue('Failed to delete task');
    }
  }
);

// Create slice
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearTasks: (state) => {
      state.items = [];
    },
    toggleTaskCompletion: (state, action: PayloadAction<string>) => {
      const task = state.items.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        task.updatedAt = new Date().toISOString();
      }
    },
    updateTaskStrategies: (state, action: PayloadAction<{ taskId: string; strategies: string[] }>) => {
      const { taskId, strategies } = action.payload;
      const task = state.items.find(task => task.id === taskId);
      if (task) {
        task.strategies = strategies;
        task.updatedAt = new Date().toISOString();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add task
      .addCase(addTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload as Task);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update task
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedTask = action.payload;
        const index = state.items.findIndex(task => task.id === updatedTask.id);
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            ...updatedTask,
          };
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(task => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { clearTasks, toggleTaskCompletion, updateTaskStrategies } = tasksSlice.actions;
export default tasksSlice.reducer; 