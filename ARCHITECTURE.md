# Protocol Pro Product Documentation

This section contains product-related documentation for the Protocol Pro application.

## Contents

- [Product Requirements Document](./prd.md): Detailed requirements for the Protocol Pro application

## Product Overview

Protocol Pro is a mobile application designed to help instructors create and share protocols with followers. The app allows instructors to create step-by-step protocols, assign them to followers, and track progress. Followers can view assigned protocols, mark steps as complete, and provide feedback.

## User Personas

1. **Instructors**: Users who create and manage protocols, assign them to followers, and track progress
2. **Followers**: Users who are assigned protocols, complete steps, and provide feedback

## Key Features

- User authentication and profile management
- Protocol creation and management
- Protocol assignment and execution
- Progress tracking and reporting
- Feedback and communication
- Notifications and reminders

## Technology Stack

- **React Native**: Mobile app framework
- **Expo**: React Native toolchain
- **Redux**: State management with Redux Toolkit
- **ShadCN UI**: Styling approach for consistent UI components
- **Turborepo**: Monorepo build system

For detailed architecture documentation, please refer to the [architecture documentation](./docs/architecture) directory.

/
├── monorepo/ # Protocol Pro monorepo
│ ├── apps/ # Applications
│ │ └── mobile/ # React Native Expo app
│ └── packages/ # Shared packages
│ ├── ui/ # UI components
│ ├── core/ # Core business logic
│ ├── api/ # API client
│ └── store/ # Redux store
└── y/ # Turborepo starter
├── apps/ # Example applications
└── packages/ # Shared packages

