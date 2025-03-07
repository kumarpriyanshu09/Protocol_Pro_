# Protocol Pro Tech Stack Document

**Version**: 1.0  
**Author**: TechBoy (with assistance from Grok 3, xAI)

---

## Introduction

**Protocol Pro** is a mobile application designed to connect instructors with their followers, facilitating the creation, management, and tracking of personalized protocols (e.g., fitness, wellness, or productivity plans). The app serves as a marketplace where followers can engage with structured plans, and instructors can monitor progress and communicate effectively, all within a user-friendly mobile interface. In preview mode, the app prioritizes mock data and simulated interactions to showcase core functionality without backend dependencies.

The tech stack for Protocol Pro is chosen to support a cross-platform mobile app with a focus on simplicity, scalability, and ease of development. The primary goal is to create a robust, maintainable application that can evolve over time, accommodating potential changes in frontend libraries, payment systems, and deployment platforms while ensuring high performance and user satisfaction.

---

## Frontend Technologies

The frontend of Protocol Pro is powered by **React Native** with **Expo**, a cross-platform mobile framework that simplifies development and deployment.

- **React Native (v0.76.7)**: The core framework for building the mobile app, enabling a single codebase for both iOS and Android with native performance.
- **Expo (v52.0.0)**: A development platform that streamlines React Native app building, testing, and previewing, used in Replit's preview mode for simulation.
- **TypeScript (v5.8.2)**: Adds type safety to JavaScript, catching errors early and improving code maintainability.
- **React Navigation (v6.1.9)**: Handles navigation, including stack (@react-navigation/stack v6.3.20) and bottom tab navigation, ensuring smooth transitions between screens.
- **React Native StyleSheet**: Used for component styling, ensuring encapsulated and performant styles (e.g., `StyleSheet.create`).
- **React Native Chart Kit (v6.12.0)**: Powers data visualizations like bar, line, and Apple Screen Time-style charts for progress tracking.
- **React Native Gesture Handler (v2.20.2)**: Manages touch gestures (e.g., swipes, taps) for interactive UI elements.
- **React Native Reanimated (v3.16.1)**: Provides fluid animations for transitions and progress updates.
- **i18next (v24.2.2) and react-i18next (v15.4.1)**: Supports internationalization, preparing for future multilingual capabilities.
- **React Context API**: Manages state across components (e.g., user role, mock data) without external libraries.

### UI Components
- **React Native Built-in Components**: Core components like `View`, `Text`, and `TouchableOpacity` for UI construction.
- **Custom Components**: Reusable components in the `components/` directory (e.g., `TaskItem`, `ProgressBar`).

### Future Considerations
- The frontend does not currently use a UI library like `shadcn/ui`. However, space is reserved for potential future integration of libraries like `NativeBase` or `Tamagui` for pre-built UI components. These can be added by creating a `ui/` directory and importing components without disrupting existing styles, as styles are encapsulated with `StyleSheet`.
- Animations and gestures may evolve with additional libraries (e.g., `react-native-animatable`) if more complex animations are needed.

---

## Backend Technologies

In preview mode, Protocol Pro relies on mock data and local state, but the tech stack is designed to accommodate future backend integration.

- **Mock Data (Preview Mode)**: Hardcoded data in the `data/` directory (e.g., protocols, tasks, progress percentages) simulates backend responses.
- **Axios (v1.8.1)**: An HTTP client for making API requests, currently used with mock endpoints (e.g., `axios.get('/mock/api')`).
- **React Context API**: Manages mock backend data locally (e.g., user roles, protocol lists).

### Future Backend Plans
- **Supabase**: Planned as the primary Backend-as-a-Service (BaaS) for database management, authentication, and real-time updates, as referenced in `test-supabase.js`. Supabase uses PostgreSQL for reliable data storage and integrates with Google Sign-In for authentication.
- **Alternative**: Firebase may be considered as an alternative to Supabase, offering similar features (database, auth, real-time).
- **Payment Integration**: Stripe is the primary choice for handling transactions (e.g., instructor subscriptions), but RevenueCat is an alternative for in-app purchases. The codebase is structured to allow swapping payment providers by isolating payment logic in a `services/payment.ts` file.

To ensure flexibility:
- API calls are abstracted in the `services/api.ts` file, allowing easy switching between Supabase, Firebase, or other services.
- Mock data is stored separately in `data/`, ensuring real data integration doesn't disrupt existing functionality.

---

## Infrastructure and Deployment

In preview mode, Protocol Pro runs locally in Replit using Expo's preview capabilities, but the tech stack is designed to support future deployment.

- **Expo CLI (Preview Mode)**: Used for running the app in Replit's mobile-like preview environment, simulating iOS and Android builds.
- **iOS Development (Future)**: Xcode and CocoaPods for building and deploying to iOS devices.
- **Android Development (Future)**: Gradle (v8.10.2) and Kotlin (v1.9.25) for Android builds.

### Future Deployment Plans
- **Deployment Platform**: The app will be hosted on a cloud platform, but the specific provider (e.g., AWS, Google Cloud, Vercel) is not finalized. The project structure supports deployment by isolating build scripts in `package.json` and ensuring platform-agnostic configurations.
- **CI/CD Pipeline**: A Continuous Integration/Continuous Deployment (CI/CD) pipeline will be set up (e.g., GitHub Actions, Expo EAS) to automate testing and deployment, ensuring rapid iterations and reliable updates.
- **Version Control**: Git is used for version control, with a history of changes tracked to maintain development integrity.

To accommodate future changes:
- Deployment scripts will be abstracted in a `deploy/` directory or `scripts/` folder, allowing easy updates to the deployment provider.
- The Expo configuration (`app.json`) is kept minimal, supporting future adjustments for different platforms.

---

## Development & Testing

- **Jest (v29.7.0)**: JavaScript testing framework for unit tests.
- **React Testing Library (v13.2.0) and @testing-library/jest-native (v5.4.3)**: Testing utilities for React Native components, ensuring UI and functionality are correct.
- **Babel and Metro**: JavaScript compiler and bundler for React Native, integrated via Expo.
- **Expo Doctor (v1.1.6)**: Diagnoses issues with Expo projects, ensuring compatibility.
- **ESLint**: Implied for code linting, enforcing coding standards (e.g., Airbnb style guide).

### Project Structure
- `components/`: Reusable UI components (e.g., `TaskItem.tsx`).
- `screens/`: Screen components (e.g., `FollowerDashboard.tsx`).
- `services/`: API and backend service integrations (e.g., `api.ts`).
- `context/`: React Context providers for state management.
- `i18n/`: Internationalization configuration.
- `types/`: TypeScript type definitions.
- `theme/`: UI theming constants (e.g., colors).
- `data/`: Mock data for preview mode.
- `__tests__/`: Test files for components and screens.

---

## Future Additions Without Disruption
To ensure future additions don't cause trouble:
- **UI Libraries**: Space is reserved for libraries like `NativeBase` by keeping styles encapsulated (`StyleSheet`) and avoiding global styles. A `ui/` directory can be added later.
- **Payment Providers**: Payment logic is isolated in `services/payment.ts`, allowing easy swapping between Stripe and RevenueCat.
- **Deployment Platforms**: Deployment configurations are abstracted, ensuring switching between AWS, Vercel, or others is straightforward.
- **Backend Services**: API calls are abstracted in `services/`, and mock data in `data/` ensures real backend integration (Supabase or Firebase) doesn't disrupt frontend functionality.
- **Additional Features**: Features like push notifications or advanced animations can be added as separate modules (e.g., `features/notifications/`) without affecting existing code.

