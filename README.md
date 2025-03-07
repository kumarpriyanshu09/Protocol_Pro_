# Protocol Pro

A React Native Expo application with navigation between different dashboard screens for instructors and followers. The app has a dark theme UI with custom components including progress bars and charts.

## Project Overview

Protocol Pro is designed to help instructors create and manage protocols, while followers can track their progress and achievements.

## Features

- Dark theme UI
- Custom progress bars and charts
- Different dashboards for instructors and followers
- Protocol creation functionality
- Achievement tracking
- Custom navigation system with tab bar

## Tech Stack

- React Native (v0.76.7)
- Expo (v52.0.0)
- React Navigation (v6.1.9)
- React Native Chart Kit (v6.12.0)
- TypeScript (v5.8.2)

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   cd protocol-pro
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Run on specific platforms:
   ```
   npm run web     # Run in web browser
   npm run ios     # Run on iOS simulator
   npm run android # Run on Android emulator
   ```

## Project Structure

- `components/`: Custom UI components
- `screens/`: Application screens
- `data/`: Mock data for development
- `types/`: TypeScript type definitions
- `navigation/`: Navigation components and configuration

## Navigation System

Protocol Pro uses a custom navigation system that combines React Navigation's stack navigator with a custom tab bar component:

- **Stack Navigator**: Used for the main navigation flow, including login, dashboards, and other screens.
- **Custom Tab Bar**: A custom component that appears at the bottom of the screen and allows users to navigate between different sections of the app.
- **Role-Based Navigation**: Different tab bars are shown based on the user's role (follower or instructor).

The navigation system is designed to be modular and extensible, making it easy to add new screens and features in the future.

## Development Workflow

### Git Workflow

1. Create a new branch for each feature or bugfix:
   ```
   git checkout -b feature/feature-name
   ```
   or
   ```
   git checkout -b bugfix/bug-name
   ```

2. Make your changes and commit them with descriptive messages:
   ```
   git add .
   git commit -m "Description of the changes"
   ```

3. Push your branch to the remote repository:
   ```
   git push origin feature/feature-name
   ```

4. Create a pull request for code review.

5. After approval, merge your branch into the main branch.

### Commit Message Guidelines

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests after the first line

## Development Notes

- The app uses a custom navigation system with React Navigation's stack navigator and a custom tab bar component
- The main entry point is index.js which registers the App component
- App.tsx contains the navigation setup with screens for Login, Instructor Dashboard, Protocol Creation, Follower Dashboard, and more

## License

[Specify your license here]

## Contributors

[List of contributors] 