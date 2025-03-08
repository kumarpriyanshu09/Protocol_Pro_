# Protocol Pro Monorepo

This is a monorepo for the Protocol Pro application, built with React Native, Redux, and custom UI components.

## Structure

The monorepo is organized into the following packages:

- `apps/mobile`: The main React Native Expo app
- `packages/ui`: Shared UI components using ShadCN styling
- `packages/core`: Shared business logic and utilities
- `packages/api`: API client and data fetching logic
- `packages/store`: Redux store, slices, and actions

## Technologies

- **React Native**: Mobile app framework
- **Expo**: React Native toolchain
- **Redux**: State management with Redux Toolkit
- **React Redux**: React bindings for Redux
- **Redux Persist**: Persist and rehydrate Redux store
- **React Native Reusables**: Reusable components for React Native
- **ShadCN UI**: Styling approach for consistent UI components
- **Turborepo**: Monorepo build system

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 10 or higher

### Installation

1. Clone the repository
2. Install dependencies:

```bash
# Install root dependencies
npm install

# Install all workspace dependencies
npm run install:all
```

### Development

To start the development server:

```bash
# Start the mobile app
npm run mobile
```

### Building

To build all packages:

```bash
npm run build
```

## Troubleshooting

If you encounter issues with dependencies, try the following:

1. Clear npm cache:
```bash
npm cache clean --force
```

2. Remove node_modules and reinstall:
```bash
rm -rf node_modules
rm -rf */*/node_modules
npm run install:all
```

3. If you have issues with the mobile app, try:
```bash
cd apps/mobile
npx expo doctor
```

## Package Details

### UI Package

The UI package contains reusable UI components styled with ShadCN approach:

- Button
- Card
- Input
- Text
- ProgressBar

### Store Package

The store package contains Redux store configuration and slices:

- Auth slice
- Tasks slice
- Protocols slice
- UI slice

### Core Package

The core package contains shared business logic and utilities.

### API Package

The API package contains API client and data fetching logic.

## License

MIT 