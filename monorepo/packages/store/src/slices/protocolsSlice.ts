import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task } from './tasksSlice';

// Define types
export interface Protocol {
  id: string;
  title: string;
  description?: string;
  instructorId: string;
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  completionPercentage: number;
}

interface ProtocolsState {
  items: Protocol[];
  selectedProtocol: Protocol | null;
  isLoading: boolean;
  error: string | null;
}

// Define initial state
const initialState: ProtocolsState = {
  items: [],
  selectedProtocol: null,
  isLoading: false,
  error: null,
};

// Create async thunks
export const fetchProtocols = createAsyncThunk(
  'protocols/fetchProtocols',
  async (_, { rejectWithValue }) => {
    try {
      // This would be replaced with actual API call
      // const response = await api.protocols.getAll();
      // return response.data;
      
      // Mock response for now
      return [
        {
          id: '1',
          title: 'Fitness Protocol',
          description: 'A protocol for improving fitness',
          instructorId: 'instructor-1',
          tasks: [
            {
              id: '1',
              title: 'Complete workout',
              description: 'Do 30 minutes of cardio',
              completed: false,
              dueDate: '2023-06-30',
              protocolId: '1',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
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
            },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isActive: true,
          completionPercentage: 50,
        },
      ];
    } catch (error) {
      return rejectWithValue('Failed to fetch protocols');
    }
  }
);

export const fetchProtocolById = createAsyncThunk(
  'protocols/fetchProtocolById',
  async (id: string, { rejectWithValue }) => {
    try {
      // This would be replaced with actual API call
      // const response = await api.protocols.getById(id);
      // return response.data;
      
      // Mock response for now
      return {
        id,
        title: 'Fitness Protocol',
        description: 'A protocol for improving fitness',
        instructorId: 'instructor-1',
        tasks: [
          {
            id: '1',
            title: 'Complete workout',
            description: 'Do 30 minutes of cardio',
            completed: false,
            dueDate: '2023-06-30',
            protocolId: id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'Drink water',
            description: 'Drink 2 liters of water',
            completed: true,
            dueDate: '2023-06-29',
            protocolId: id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        completionPercentage: 50,
      };
    } catch (error) {
      return rejectWithValue('Failed to fetch protocol');
    }
  }
);

export const createProtocol = createAsyncThunk(
  'protocols/createProtocol',
  async (protocol: Omit<Protocol, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      // This would be replaced with actual API call
      // const response = await api.protocols.create(protocol);
      // return response.data;
      
      // Mock response for now
      return {
        ...protocol,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    } catch (error) {
      return rejectWithValue('Failed to create protocol');
    }
  }
);

// Create slice
const protocolsSlice = createSlice({
  name: 'protocols',
  initialState,
  reducers: {
    selectProtocol: (state, action: PayloadAction<string>) => {
      state.selectedProtocol = state.items.find(protocol => protocol.id === action.payload) || null;
    },
    clearSelectedProtocol: (state) => {
      state.selectedProtocol = null;
    },
    updateProtocolCompletionPercentage: (state, action: PayloadAction<{ id: string; percentage: number }>) => {
      const protocol = state.items.find(p => p.id === action.payload.id);
      if (protocol) {
        protocol.completionPercentage = action.payload.percentage;
        protocol.updatedAt = new Date().toISOString();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch protocols
      .addCase(fetchProtocols.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProtocols.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProtocols.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch protocol by id
      .addCase(fetchProtocolById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProtocolById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedProtocol = action.payload;
        
        // Update in items array if exists
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(fetchProtocolById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create protocol
      .addCase(createProtocol.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProtocol.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
        state.selectedProtocol = action.payload;
      })
      .addCase(createProtocol.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { 
  selectProtocol, 
  clearSelectedProtocol,
  updateProtocolCompletionPercentage,
} = protocolsSlice.actions;
export default protocolsSlice.reducer; 