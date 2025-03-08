# Redux Store Package

This package contains the Redux store configuration and slices for the Protocol Pro application.

## Overview

The store package is built using Redux Toolkit and includes:

- Store configuration with Redux Persist
- Type-safe hooks for dispatching actions and selecting state
- Slices for different parts of the application state
- Async thunks for handling API calls

## Usage

### Importing the Store

```tsx
import { store, persistor } from 'store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* Your app content */}
      </PersistGate>
    </Provider>
  );
}
```

### Using Hooks

```tsx
import { useAppSelector, useAppDispatch } from 'store';
import { login, logout } from 'store';

function AuthComponent() {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(login({ email: 'user@example.com', password: 'password' }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

## Available Slices

### Auth Slice

Manages authentication state including user information and login/logout functionality.

```tsx
import { login, logout, setUser, clearAuth } from 'store';
```

### Tasks Slice

Manages tasks including fetching, adding, updating, and deleting tasks.

```tsx
import { fetchTasks, addTask, updateTask, deleteTask, toggleTaskCompletion } from 'store';
```

### Protocols Slice

Manages protocols including fetching, creating, and updating protocols.

```tsx
import { fetchProtocols, fetchProtocolById, createProtocol } from 'store';
```

### UI Slice

Manages UI state including theme, notifications, and modal state.

```tsx
import { setTheme, addNotification, removeNotification, openModal, closeModal } from 'store';
```

## Creating a New Slice

To create a new slice:

1. Create a new file in the `src/slices` directory
2. Define your slice using `createSlice` from Redux Toolkit
3. Export the actions and reducer
4. Add the reducer to the root reducer in `src/store.ts`
5. Export the slice from `src/index.ts`

Example:

```tsx
// src/slices/newFeatureSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NewFeatureState {
  // Define your state here
}

const initialState: NewFeatureState = {
  // Initialize your state here
};

const newFeatureSlice = createSlice({
  name: 'newFeature',
  initialState,
  reducers: {
    // Define your reducers here
  },
});

export const { /* actions */ } = newFeatureSlice.actions;
export default newFeatureSlice.reducer;
```

Then update the root reducer:

```tsx
// src/store.ts
import newFeatureReducer from './slices/newFeatureSlice';

const rootReducer = combineReducers({
  // ...existing reducers
  newFeature: newFeatureReducer,
});
```

## Best Practices

1. **Use TypeScript**: Define types for all state and actions
2. **Use Selectors**: Create selectors for complex state derivations
3. **Normalize State**: Keep state normalized to avoid duplication
4. **Immutable Updates**: Always use immutable update patterns (Redux Toolkit handles this for you)
5. **Thunk for Async**: Use createAsyncThunk for async operations
6. **Persist Selectively**: Only persist what's necessary to avoid performance issues 