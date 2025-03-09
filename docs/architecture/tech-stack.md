# Technology Stack

This document outlines the technology stack used in the Protocol Pro application.

## Frontend

### Core Technologies

- **React Native**: Cross-platform mobile app framework
- **Expo**: React Native toolchain and SDK
- **TypeScript**: Type-safe JavaScript

### State Management

- **Redux**: State management library
- **Redux Toolkit**: Simplified Redux development
- **Redux Persist**: Persistence layer for Redux

### UI Components

- **ShadCN UI**: Styling approach for consistent UI components
- **React Native Reusables**: Reusable React Native components
- **React Navigation**: Navigation library for React Native

### Development Tools

- **ESLint**: JavaScript linting
- **Prettier**: Code formatting
- **Jest**: Testing framework
- **React Testing Library**: Testing utilities for React

## Backend (Preview Mode)

In preview mode, the application uses mock data and simulated API responses. The real backend will be implemented in future phases.

### Mock Data

- **MSW (Mock Service Worker)**: API mocking library
- **Faker.js**: Fake data generation

### Storage

- **AsyncStorage**: Local storage for React Native
- **Redux Persist**: Persistence layer for Redux

## Build and Deployment

### Monorepo Management

- **Turborepo**: Monorepo build system
- **npm Workspaces**: Package management for monorepos

### Build Tools

- **Metro**: JavaScript bundler for React Native
- **Expo EAS**: Expo Application Services for building and publishing

### CI/CD

- **GitHub Actions**: Continuous integration and deployment

## Development Environment

### Required Tools

- **Node.js 18+**: JavaScript runtime
- **npm 10+**: Package manager
- **Expo CLI**: Command-line interface for Expo
- **Android Studio / Xcode**: For native development and emulators

### Recommended Extensions

- **ESLint**: JavaScript linting
- **Prettier**: Code formatting
- **TypeScript**: TypeScript language support
- **React Native Tools**: React Native development tools