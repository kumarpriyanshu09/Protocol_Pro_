# Application Flow

This document outlines the main application flows in the Protocol Pro app.

## Authentication Flow

```mermaid
graph TD
    Start[App Start] --> IsLoggedIn{Is Logged In?}
    IsLoggedIn -->|Yes| Home[Home Screen]
    IsLoggedIn -->|No| Login[Login Screen]
    Login -->|Successful Login| Home
    Login -->|Create Account| Register[Register Screen]
    Register -->|Successful Registration| Home
    Login -->|Forgot Password| ForgotPassword[Forgot Password Screen]
    ForgotPassword -->|Reset Link Sent| Login
```

## Instructor Flow

```mermaid
graph TD
    Home[Home Screen] --> MyProtocols[My Protocols Screen]
    Home --> Followers[Followers Screen]
    Home --> Profile[Profile Screen]
    
    MyProtocols --> CreateProtocol[Create Protocol Screen]
    MyProtocols --> ProtocolDetails[Protocol Details Screen]
    
    CreateProtocol --> AddSteps[Add Steps Screen]
    CreateProtocol --> ReviewProtocol[Review Protocol Screen]
    ReviewProtocol --> PublishProtocol[Publish Protocol]
    
    ProtocolDetails --> EditProtocol[Edit Protocol]
    ProtocolDetails --> AssignProtocol[Assign to Followers]
    ProtocolDetails --> TrackProgress[Track Progress]
    
    Followers --> FollowerDetails[Follower Details]
    FollowerDetails --> AssignProtocols[Assign Protocols]
    FollowerDetails --> ViewProgress[View Progress]
    
    Profile --> EditProfile[Edit Profile]
    Profile --> Settings[Settings]
    Profile --> Logout[Logout]
```

## Follower Flow

```mermaid
graph TD
    Home[Home Screen] --> AssignedProtocols[Assigned Protocols Screen]
    Home --> Instructors[Instructors Screen]
    Home --> Profile[Profile Screen]
    
    AssignedProtocols --> ProtocolDetails[Protocol Details Screen]
    ProtocolDetails --> ExecuteProtocol[Execute Protocol]
    ExecuteProtocol --> MarkStepComplete[Mark Step Complete]
    ExecuteProtocol --> AddFeedback[Add Feedback]
    ExecuteProtocol --> ViewProgress[View Progress]
    
    Instructors --> InstructorDetails[Instructor Details]
    InstructorDetails --> ViewProtocols[View Available Protocols]
    
    Profile --> EditProfile[Edit Profile]
    Profile --> Settings[Settings]
    Profile --> Logout[Logout]
```

## Protocol Creation Flow

```mermaid
sequenceDiagram
    participant Instructor
    participant App
    participant Store
    
    Instructor->>App: Navigate to Create Protocol
    App->>Instructor: Display Protocol Form
    Instructor->>App: Enter Protocol Details
    Instructor->>App: Add Steps
    App->>Instructor: Display Steps Form
    Instructor->>App: Enter Step Details
    Instructor->>App: Add More Steps/Complete
    App->>Instructor: Display Review Screen
    Instructor->>App: Publish Protocol
    App->>Store: Save Protocol
    Store->>App: Protocol Saved
    App->>Instructor: Show Success Message
```

## Protocol Execution Flow

```mermaid
sequenceDiagram
    participant Follower
    participant App
    participant Store
    
    Follower->>App: Navigate to Assigned Protocols
    App->>Store: Fetch Assigned Protocols
    Store->>App: Return Protocols
    App->>Follower: Display Protocol List
    Follower->>App: Select Protocol
    App->>Store: Fetch Protocol Details
    Store->>App: Return Protocol Details
    App->>Follower: Display Protocol Steps
    Follower->>App: Mark Step Complete
    App->>Store: Update Step Status
    Store->>App: Status Updated
    App->>Follower: Show Progress Update
    Follower->>App: Add Feedback
    App->>Store: Save Feedback
    Store->>App: Feedback Saved
    App->>Follower: Show Success Message
```

## Notification Flow

```mermaid
graph TD
    TriggerEvent[Trigger Event] --> CreateNotification[Create Notification]
    CreateNotification --> StoreNotification[Store Notification]
    StoreNotification --> SendPush{Send Push?}
    SendPush -->|Yes| PushNotification[Send Push Notification]
    SendPush -->|No| End
    PushNotification --> UserReceives[User Receives Notification]
    UserReceives --> UserTaps{User Taps?}
    UserTaps -->|Yes| OpenApp[Open App to Relevant Screen]
    UserTaps -->|No| End
```

## Data Synchronization Flow

```mermaid
sequenceDiagram
    participant App
    participant LocalStore
    participant API
    
    App->>LocalStore: Read Local Data
    LocalStore->>App: Return Local Data
    App->>App: Display Local Data
    
    App->>API: Fetch Latest Data
    API->>App: Return Latest Data
    
    App->>App: Compare Local vs Remote Data
    App->>LocalStore: Update Local Data
    App->>App: Update UI with Latest Data
    
    App->>LocalStore: Write Local Changes
    App->>API: Send Local Changes
    API->>App: Confirm Changes
    App->>LocalStore: Mark as Synced
```
```

## Step 3: Update Root Documentation

### Update Root README.md

```markdown
# Protocol Pro

Protocol Pro is a comprehensive React Native application for instructors and followers, built using a monorepo architecture.

## Project Structure

This repository contains:

- **monorepo/**: The main Protocol Pro application built with React Native, Redux, and custom UI components
- **y/**: A Turborepo starter maintained by the Turborepo core team
- **docs/**: Comprehensive documentation for the project

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm 10 or higher

### Installation

```bash
# Install dependencies
npm run install:all
```

### Running the Application

```bash
# Start the mobile app
npm run start
```

This will launch the Expo development server for the mobile application.

## Monorepo vs Y Directory

- **monorepo/**: Contains the Protocol Pro application with its specific structure and dependencies
- **y/**: Contains a Turborepo starter template that can be used as a reference or for creating new projects

## Documentation

For detailed documentation, please refer to the [docs](./docs) directory:

- [Getting Started Guide](./docs/getting-started)
- [Architecture Documentation](./docs/architecture)
- [Development Guidelines](./docs/development)
- [API Documentation](./docs/api)
- [UI Components](./docs/ui)
- [Product Requirements](./docs/product)

## License

MIT
```

### Create ARCHITECTURE.md in the Root

```markdown
# Protocol Pro Architecture

This document provides a high-level overview of the Protocol Pro architecture. For detailed architecture documentation, please refer to the [architecture documentation](./docs/architecture) directory.

## Overview

Protocol Pro is built using a monorepo architecture, which allows us to manage multiple packages and applications within a single repository.

## Key Components

- **Mobile App**: React Native Expo application
- **UI Package**: Shared UI components using ShadCN styling
- **Core Package**: Shared business logic and utilities
- **API Package**: API client and data fetching logic
- **Store Package**: Redux store, slices, and actions

## Directory Structure

```
/
├── monorepo/               # Protocol Pro monorepo
│   ├── apps/               # Applications
│   │   └── mobile/         # React Native Expo app
│   └── packages/           # Shared packages
│       ├── ui/             # UI components
│       ├── core/           # Core business logic
│       ├── api/            # API client
│       └── store/          # Redux store
└── y/                      # Turborepo starter
    ├── apps/               # Example applications
    └── packages/           # Shared packages