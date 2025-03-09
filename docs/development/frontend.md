# Frontend Documentation

## Overview

The frontend of Protocol Pro is built using React Native and Expo, following a component-based architecture. It uses Redux for state management and follows a monorepo structure for code organization.

## Architecture

### Component Architecture

The frontend follows a component-based architecture with the following categories:

1. **UI Components**: Reusable UI elements (buttons, inputs, cards)
2. **Screen Components**: Full screens that combine UI components
3. **Navigation**: Navigation configuration using React Navigation
4. **Hooks**: Custom React hooks for shared logic
5. **Context Providers**: Context providers for shared state

### State Management

Redux is used for state management, with the following slices:

1. **Auth**: Authentication state
2. **Protocols**: Protocols data and state
3. **Tasks**: Tasks data and state
4. **UI**: UI-related state (modals, loading, errors)

### Data Flow

The data flow follows the Redux pattern:

1. User interaction triggers an action
2. Action is dispatched to the store
3. Reducer updates the state
4. Components re-render with the new state

## Folder Structure
src/
├── components/ # Reusable UI components
├── screens/ # Screen components
├── navigation/ # Navigation configuration
├── hooks/ # Custom React hooks
├── services/ # Service integrations
├── utils/ # Utility functions
├── types/ # TypeScript type definitions
├── theme/ # Theming configuration
└── i18n/ # Internationalization

## Component Guidelines

### Component Structure

Each component should follow this structure:

1. Import statements
2. Type definitions
3. Component function
4. Export statement

Example:

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

/**
 * Button component with customizable title and press handler
 */
export function Button({ title, onPress, disabled = false }: ButtonProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}
```

### Styling

Components should use a consistent styling approach:

1. Use the ShadCN styling approach
2. Define styles in a separate file
3. Use theme variables for colors, spacing, etc.

Example:

```tsx
// styles.ts
import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.md,
    fontWeight: 'bold',
  },
});
```

## Navigation

Navigation is handled using React Navigation:

1. Stack navigators for screen flows
2. Tab navigator for main app sections
3. Drawer navigator for additional navigation options

Example:

```tsx
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, DetailsScreen } from '../screens';

const Stack = createStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
```

## State Management

State management is handled using Redux Toolkit:

1. Define slices for different domains
2. Use selectors to access state
3. Use hooks for dispatching actions

Example:

```tsx
// authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../services/api';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    const response = await api.login(email, password);
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
```

## Performance Optimization

Follow these guidelines for performance optimization:

1. Use `React.memo` for components that render often but rarely change
2. Use `useMemo` and `useCallback` to prevent unnecessary re-renders
3. Use `FlatList` instead of `map` for long lists
4. Minimize the use of inline styles
5. Optimize images and assets

## Accessibility

Follow these guidelines for accessibility:

1. Use semantic components and proper ARIA roles
2. Ensure proper color contrast
3. Support screen readers
4. Make all interactive elements keyboard accessible
5. Test with accessibility tools
