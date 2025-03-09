# Getting Started with Protocol Pro

This guide will help you set up your development environment and get started with Protocol Pro.

## Prerequisites

- Node.js 18 or higher
- npm 10 or higher
- Expo CLI (optional, but recommended)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd protocol-pro
```

2. Install dependencies:
```bash
# Install root dependencies
npm install

# Install all workspace dependencies
npm run install:all
```

## Development Environment

### Running the Mobile App

To start the development server for the mobile app:

```bash
# From the root directory
npm run start

# Or navigate to the mobile app directory
cd monorepo/apps/mobile
npx expo start
```

This will launch the Expo development server, and you can run the app on:
- iOS simulator (press `i`)
- Android emulator (press `a`)
- Web browser (press `w`)
- Physical device using the Expo Go app (scan the QR code)

## Project Structure

### Monorepo Structure

Protocol Pro uses a monorepo architecture with the following structure:
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

## Next Steps

- Read the [Architecture Documentation](../architecture/README.md) to understand the system design
- Check out the [Development Guidelines](../development/README.md) for best practices
- Explore the [UI Components](../ui/README.md) to understand available components
