# Protocol Pro Navigation System

**Version**: 1.0  
**Author**: TechBoy

---

## Introduction

Protocol Pro uses a custom navigation system that combines React Navigation's stack navigator with a custom tab bar component. This document provides an overview of the navigation system, its components, and how to use it.

---

## Navigation Architecture

The navigation system is built around the following components:

### Stack Navigator

The main navigation flow is managed by React Navigation's stack navigator, which provides the following benefits:

- **Screen Transitions**: Smooth transitions between screens with customizable animations.
- **Header Management**: Consistent headers across screens with customizable options.
- **Back Navigation**: Built-in support for back navigation with the device's back button.
- **Deep Linking**: Support for deep linking to specific screens.

All screens are registered with the stack navigator in `App.tsx`, making navigation between them reliable and type-safe.

### Custom Tab Bar

The custom tab bar is a standalone component that appears at the bottom of the screen and allows users to navigate between different sections of the app. It provides the following features:

- **Role-Based Navigation**: Different tab bars are shown based on the user's role (follower or instructor).
- **Visual Feedback**: The active tab is highlighted with a color change and an indicator line.
- **Accessibility**: Proper accessibility roles and labels for screen readers.
- **Touch Targets**: Adequate touch targets for easy tapping.

The custom tab bar is implemented in `navigation/CustomTabBar.tsx` and can be easily added to any screen.

---

## Navigation Flow

### Login Flow

1. The app starts with the Login screen.
2. After successful login, the user is directed to either the FollowerDashboard or InstructorDashboard based on their role.
3. Each dashboard includes a custom tab bar that allows navigation to other screens.

### Follower Navigation

The follower tab bar provides navigation between the following screens:

- **Protocols**: View and manage assigned protocols.
- **Tasks**: View and complete daily tasks.
- **Journal**: Record thoughts and reflections.
- **Settings**: Configure app settings and preferences.

### Instructor Navigation

The instructor tab bar provides navigation between the following screens:

- **Protocols**: Create and manage protocols.
- **Dashboard**: Monitor follower progress.
- **Messages**: Communicate with followers.
- **Settings**: Configure app settings and preferences.

---

## Implementation Details

### Navigation Types

The navigation types are defined in `types/navigation.ts` and include:

- **RootStackParamList**: Defines the parameters for the stack navigator.
- **FollowerTabParamList**: Defines the parameters for the follower tab navigator.
- **InstructorTabParamList**: Defines the parameters for the instructor tab navigator.

These types ensure type safety when navigating between screens and passing parameters.

### Custom Tab Bar

The custom tab bar is implemented in `navigation/CustomTabBar.tsx` and uses the following components:

- **TabItem**: Represents a single tab in the tab bar.
- **CustomTabBarProps**: Defines the props for the custom tab bar component.

The custom tab bar uses React Navigation's `useNavigation` hook to navigate between screens when a tab is tapped.

### Screen Registration

All screens are registered with the stack navigator in `App.tsx`, including:

- **Login**: The login screen.
- **InstructorDashboard**: The instructor dashboard screen.
- **ProtocolCreation**: The protocol creation screen.
- **FollowerDashboard**: The follower dashboard screen.
- **Achievements**: The achievements screen.
- **ProtocolsScreen**: The protocols screen.
- **TasksScreen**: The tasks screen.
- **JournalScreen**: The journal screen.
- **MessagesScreen**: The messages screen.
- **SettingsScreen**: The settings screen.

---

## Benefits

The custom navigation system provides several benefits:

- **Reliability**: More reliable than using nested navigators, which can cause issues with deep linking and back navigation.
- **Flexibility**: The custom tab bar can be easily customized to match the design requirements.
- **Performance**: The simplified navigation structure improves performance by reducing the depth of the component tree.
- **Maintainability**: The modular design makes it easy to add new screens and features in the future.

---

## Future Improvements

Consider these additional enhancements to the navigation system:

1. **Deep Linking**: Add support for deep linking to specific screens within the app.
2. **Animations**: Add custom animations for screen transitions.
3. **Gesture Navigation**: Add support for gesture-based navigation (e.g., swipe to go back).
4. **Navigation Testing**: Add tests for the custom navigation system to ensure it works correctly in all scenarios.
5. **Navigation State Persistence**: Add support for persisting the navigation state across app restarts.

---

## Conclusion

The custom navigation system provides a reliable and flexible way to navigate between screens in Protocol Pro. By combining React Navigation's stack navigator with a custom tab bar component, we've created a navigation system that meets the specific needs of the app while maintaining good performance and maintainability. 