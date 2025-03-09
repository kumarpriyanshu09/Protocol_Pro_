# Protocol Pro Mobile App

This is the React Native Expo mobile app for Protocol Pro, a platform for instructors and followers to manage protocols, tasks, and achievements.

## Features

- **Instructor Dashboard**: Create and manage protocols, track follower progress
- **Follower Dashboard**: View and complete tasks, track achievements
- **Protocol Management**: Create, edit, and delete protocols
- **Task Management**: Complete tasks, view strategies
- **Achievement Tracking**: Track progress and achievements

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v10 or later)
- Expo CLI

### Installation

```
npm install
```

### Running the App

```
npm start
```

### Running on Specific Platforms

```
npm run ios
npm run android
npm run web
```

## Project Structure

```
mobile/
├── src/
│   ├── components/    # Reusable UI components
│   ├── screens/       # Screen components
│   ├── navigation/    # Navigation configuration
│   ├── context/       # React Context providers
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API services
│   ├── utils/         # Utility functions
│   ├── types/         # TypeScript type definitions
│   ├── data/          # Mock data for development
│   ├── i18n/          # Internationalization
│   └── theme/         # Theme configuration
├── assets/            # Static assets
├── __tests__/         # Test files
└── app.json           # Expo configuration
```

## Navigation

The app uses React Navigation with a combination of stack and tab navigators:

### Root Stack Navigator
- Login
- InstructorDashboard (Tab Navigator)
- FollowerDashboard (Tab Navigator)
- Achievements
- Messages
- Home
- Details

### Instructor Tab Navigator
- Dashboard
- Protocols
- CreateProtocol
- Messages
- Settings

### Follower Tab Navigator
- Protocol
- Protocols
- Tasks
- Journal
- More (Settings)

## State Management

The app uses a combination of React Context and Redux for state management:

### React Context
- `TaskContext`: Manages protocol and task state for the current user

### Redux Store
- `auth`: Authentication state (user, token)
- `tasks`: Task management state
- `protocols`: Protocol management state
- `ui`: UI state (theme, sidebar visibility)

## Testing

```
npm test
``` 