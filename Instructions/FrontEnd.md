# Protocol Pro Frontend Guidelines Document

**Version**: 1.0  
**Author**: TechBoy (with assistance from Grok 3, xAI)

---

## Introduction

**Protocol Pro** is designed as an inclusive mobile platform for followers and instructors, facilitating the creation, management, and tracking of personalized protocols (e.g., fitness, wellness plans). The frontend plays a crucial role in crafting a smooth and inviting user experience, bolstering the effectiveness of this marketplace. By ensuring an intuitive and accessible interface, the frontend pivots in connecting both followers and instructors, facilitating seamless interactions and transactions. These guidelines establish a foundation for a cohesive, modern UI that can evolve with future enhancements.

---

## Frontend Architecture

The core of the Protocol Pro frontend architecture is built using **React Native (v0.76.7)** with **Expo (v52.0.0)**, known for their cross-platform capabilities and developer-friendly environment. This stack supports server-side rendering and optimization, enhanced by **TypeScript (v5.8.2)** for type safety and early error detection. Key architectural elements include:

- **React Navigation (v6.1.9)**: Manages screen navigation with a stack navigator and custom tab bar implementation, ensuring fluid transitions.
- **Custom Tab Bar**: A modular component that provides tab navigation at the bottom of the screen, with different tabs for followers and instructors.
- **React Context API**: Handles state management across components, keeping data modular and reusable.
- **React Native Gesture Handler (v2.20.2)** and **Reanimated (v3.16.1)**: Enable gesture handling and animations, supporting interactive UI elements.

### Navigation System

The navigation system combines React Navigation's stack navigator with a custom tab bar component:

- **Stack Navigator**: Used for the main navigation flow, including login, dashboards, and other screens.
- **Custom Tab Bar**: A standalone component that appears at the bottom of the screen and allows users to navigate between different sections of the app.
- **Role-Based Navigation**: Different tab bars are shown based on the user's role (follower or instructor).
- **Type Safety**: All navigation is type-safe, reducing the risk of runtime errors.

This approach provides several benefits:
- **Reliability**: More reliable than using nested navigators, which can cause issues with deep linking and back navigation.
- **Flexibility**: The custom tab bar can be easily customized to match the design requirements.
- **Performance**: The simplified navigation structure improves performance by reducing the depth of the component tree.

### Future Integration
- Space is reserved for UI libraries (e.g., `NativeBase`, `Tamagui`) by keeping components modular and styles encapsulated with `StyleSheet.create`. Add these in a `ui/` directory or import dynamically without altering core architecture.
- Theming frameworks (e.g., `styled-components`) can be integrated by defining a `theme/` module, ensuring compatibility with existing styles.

---

## Design Principles

Usability, accessibility, and responsiveness are at the heart of the Protocol Pro design philosophy. We aim to create an interface that is not only clean and minimalistic but also functional and easy to navigate. Key principles include:

- **Usability**: Prioritize intuitive layouts with clear hierarchies (e.g., headers above content, buttons at the bottom) to guide users through tasks like task completion or protocol creation.
- **Accessibility**: Ensure compliance with WCAG 2.1 standards, using semantic components (e.g., `TouchableOpacity` with `accessibilityLabel`), high-contrast colors, and keyboard navigability.
- **Responsiveness**: Use relative units (e.g., `Dimensions.get('window').width * 0.8`) to adapt layouts across devices (e.g., iPhone 14 to iPad).

### Future Considerations
- Dynamic adjustments can be made by updating a `design_principles.json` file, allowing integration with accessibility tools or responsive design frameworks without code changes.

---

## Styling and Theming

The styling approach is anchored in the use of **React Native StyleSheet**, which allows for rapid development of responsive and consistent interfaces. The current UI design system, based on a dark theme, includes:

### Color Palette
- **Primary Colors**:  
  - `#0A84FF` (Primary Blue): Buttons, active states, highlights.  
  - `#000000` (Background Black): Main background.  
  - `#1C1C1E` (Dark Gray): Cards, input fields.  
  - `#2C2C2E` (Medium Gray): Inactive elements, borders.  
- **Text Colors**:  
  - `#FFFFFF` (White): Primary text.  
  - `#8E8E93` (Light Gray): Subtitles, placeholders.  
- **Status Colors**:  
  - `#30D158` (Success Green): Completed tasks.  
  - `#FF453A` (Error Red): Alerts.  
  - `#FF9F0A` (Warning Orange): Warnings.  
- **Accent Colors**:  
  - `#5E5CE6` (Purple): UI accents.  
  - `#64D2FF` (Cyan): UI accents.

### Typography
- **Font Families**: System defaults (San Francisco on iOS, Roboto on Android).  
- **Font Weights**: 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold).  
- **Font Sizes**: 32px (Title Large), 24px (Title Medium), 18px (Title Small), 16px (Body), 14px (Caption), 12px (Small).

### Icons
- **Emoji Icons**: Used sparingly (e.g., `🎤` for voice commands).  
- **Custom Icons**: SVG icons via `react-native-svg` (e.g., 24px for navigation, 16px for indicators).  

### Theming
- Theming is managed by defining colors and typography in a `theme/` directory (e.g., `theme.ts`), ensuring seamless management and visual appeal across the platform.
- Styles are applied using `StyleSheet.create`, minimizing deeply nested CSS and maintaining a maintainable codebase.

### Future Integration
- Add a theming engine (e.g., `styled-system`) by extending `theme.ts` with new color palettes or fonts, integrating dynamically without rewriting styles.
- Support light themes by adding a toggle in `theme.ts`, applying conditionally with `StyleSheet.create`.

---

## Component Structure

The application's frontend is organized around a component-based architecture, reflecting our commitment to reusability and scalability. Using React's component model within our React Native setup:

- **Component Organization**: Components are stored in feature-specific folders (e.g., `components/follower/TaskItem.tsx`, `components/instructor/ProtocolCard.tsx`), ensuring modularity.
- **Reusability**: Each component accepts props (e.g., `TaskItem({ name, completed })`) and avoids internal state dependencies, making them reusable across screens.
- **Composition**: Complex components (e.g., `Dashboard`) are built by composing smaller ones (e.g., `ProgressBar`, `TaskList`) via props and children.

### Future Considerations
- Add new components (e.g., for payment UI or notifications) in separate folders (e.g., `components/payments/`) without altering existing structures.
- Integrate with tools like Storybook by creating a `stories/` directory, linking components dynamically for documentation and testing.

