# Protocol Pro App Flow Document

**Version**: 1.0  
**Author**: TechBoy (with assistance from Grok 3, xAI)

---

## Introduction

**Protocol Pro** is a mobile application designed to connect instructors with their followers, facilitating the creation, management, and tracking of personalized protocols (e.g., fitness, wellness, or productivity plans). The primary aim of this marketplace is to provide a dedicated space that alleviates the complexity of habit tracking and protocol management for users and instructors. By offering a centralized platform, it enhances their visibility to a broader, relevant audience, thus increasing engagement and effectiveness. The app features a user-friendly design, from intuitive onboarding to dynamic real-time interaction tools, all simulated with mock data in preview mode.

This document outlines the step-by-step flow of how users (followers) and instructors interact with Protocol Pro, ensuring a seamless experience tailored to their roles. The app's success will be measured by its ability to attract consistent user engagement, provide actionable insights through progress tracking, and enable instructors to manage protocols efficiently.

---

## Onboarding and Sign-In/Sign-Up

New users can access Protocol Pro through a direct link or via a promotional landing page. The onboarding process simplifies the sign-in/sign-up procedure using mock authentication.

- **Sign-In Process**:  
  - Users land on the Login screen, featuring email and password input fields, "Login" and "Sign Up" buttons (blue, #0070f3), and a "Forgot Password?" link (gray, underlined).  
  - Mock authentication checks the email:  
    - If it contains "follower" (e.g., "follower@example.com"), the user is directed to the Follower Dashboard.  
    - If it contains "instructor" (e.g., "instructor@example.com"), the user is directed to the Instructor Dashboard.  
    - Invalid credentials display a mock error message (e.g., "Invalid email or password").  
  - Basic profile information (e.g., role) is collected during login for navigation purposes.

- **Sign-Up Process**:  
  - The "Sign Up" button triggers a mock form with the same fields, simulating account creation.  
  - Upon submission, users are redirected to their respective dashboards based on the email entered.

- **Recovery Mechanism**:  
  - The "Forgot Password?" link simulates a password reset process by displaying a mock alert: "Password reset link sent (simulated)."  
  - This ensures a smooth recovery mechanism, allowing users to regain access when necessary.

---

## Main Dashboard or Home Page

Upon successful sign-in, users are welcomed to their role-specific main dashboard, featuring a grid-style display of relevant information.

### Follower Dashboard
- **Initial View**:  
  - Users see a top bar with time (e.g., "5:57"), signal/Wi-Fi/battery icons (gray), and a header "Follower Dashboard" (bold, black, 24px).  
  - The dashboard displays the current protocol (e.g., "30-Day Fitness Challenge"), progress visuals (bar chart at 50%, line chart with 5 points, Apple Screen Time-style chart with categories), and a task list ("Run 5K," "Log Meals," "Meditate" with checkboxes).  
  - A "Recommended for You" section shows mock suggestions (e.g., "Morning Stretch Routine").

- **Interactions**:  
  - Checking a task (e.g., "Run 5K") updates progress visuals locally (e.g., bar increases to 60%).  
  - A bottom navigation bar (Dashboard, Journal, Messages, Settings) allows tab switching, with "Dashboard" active (black underline).  

### Instructor Dashboard
- **Initial View**:  
  - Similar top bar and header "Instructor Dashboard" (bold, black, 24px).  
  - Displays a protocol list (e.g., "30-Day Fitness Challenge"), a follower summary ("12 followers at 80%+ completion"), and mock analytics ("Average Completion: 60%").  

- **Interactions**:  
  - Tapping a protocol navigates to a mock detail view (simulated).  
  - The bottom navigation bar includes Dashboard, Followers, Protocols, and Settings, with "Dashboard" active.  

- **Common Elements**:  
  - Both dashboards feature a "View Overview" button (gray) to access insights.  
  - Offline mode is indicated with a mock cloud icon in the top bar when toggled in Settings.

---

## Detailed Feature Flows and Page Transitions

### Navigation System

Protocol Pro uses a custom navigation system that combines React Navigation's stack navigator with a custom tab bar component:

- **Stack Navigator**: Used for the main navigation flow, including login, dashboards, and other screens.
- **Custom Tab Bar**: A standalone component that appears at the bottom of the screen and allows users to navigate between different sections of the app.
- **Role-Based Navigation**: Different tab bars are shown based on the user's role (follower or instructor).

The tab bar provides navigation between the following screens:

**Follower Tab Bar**:
- **Protocols**: View and manage assigned protocols.
- **Tasks**: View and complete daily tasks.
- **Journal**: Record thoughts and reflections.
- **Settings**: Configure app settings and preferences.

**Instructor Tab Bar**:
- **Protocols**: Create and manage protocols.
- **Dashboard**: Monitor follower progress.
- **Messages**: Communicate with followers.
- **Settings**: Configure app settings and preferences.

### Follower Feature Flows
1. **Progress Tracking and Gamification**:  
   - From the Dashboard, users interact with habit cards (e.g., "Take cold shower") showing 5 circles (green for completed, gray for missed).  
   - Checking a task awards a mock badge (e.g., "7-Day Streak") visible in the Achievements tab, accessible via the bottom navigation.

2. **Voice-Activated Commands**:  
   - Clicking the microphone icon on a habit card logs a mock message (e.g., "Simulated voice log: 'Logged workout'") to the console.  
   - Transition: Stays on the Dashboard with no page change.

3. **Customizable Reminders**:  
   - In the Settings tab, users toggle "Enable Reminders" and input a message (e.g., "Time for your cold shower!").  
   - After 3 seconds, a mock alert displays the message.  
   - Transition: Returns to the previous tab (e.g., Dashboard).

4. **Offline Mode**:  
   - In Settings, toggling "Online/Offline" mode changes the top bar icon to a slashed cloud and shows "You are offline. Data will sync when back online."  
   - Toggling back to "Online" displays "Syncing..." for 2 seconds.  
   - Transition: No page change, updates dashboard status.

5. **User Overview**:  
   - From the Dashboard, clicking "View Overview" transitions to a screen with "What's Working: Consistent Exercise completion (75%)" and "Bottlenecks: Low Nutrition logging (40%)."  
   - A "Back to Dashboard" button returns to the Dashboard.

### Instructor Feature Flows
1. **Real-Time Progress Monitoring**:  
   - Navigating to the Followers tab displays mock follower progress (e.g., "John - 75%") with static bars.  
   - Transition: Smooth slide from Dashboard to Followers tab.

2. **Custom Protocol Templates**:  
   - In the Protocols tab, selecting "Templates" shows mock options (e.g., "Daily Wellness Plan").  
   - Clicking a template pre-fills the creation form with mock data (e.g., "Task: Drink water").  
   - Transition: Opens Protocol Creation screen, returns to Protocols on save.

3. **One-Tap Feedback**:  
   - In the Followers tab, clicking "Send Feedback" next to a follower (e.g., "John") shows a toast: "Feedback sent: 'Great job!'".  
   - Transition: No page change, updates locally.

4. **Group Challenges**:  
   - In the Protocols tab, clicking "Create Challenge" opens a form for name and goal (e.g., "March Fitness Challenge, Complete 10 tasks").  
   - Saving displays the challenge on the Dashboard.  
   - Transition: Returns to Protocols tab.

5. **Analytics Without Complexity**:  
   - In the Followers or Protocols tab, an "Analytics" section shows mock metrics (e.g., "Protocol Popularity: 5/10").  
   - Transition: No page change, integrated into existing tabs.

6. **User Overview**:  
   - Clicking "View Overview" from the Dashboard transitions to a screen with "What's Working: High participation" and "Bottlenecks: Week 2 drop-off."  
   - A "Back to Dashboard" button returns to the Dashboard.

### Page Transitions
- **Navigation**: Smooth slide animations between tabs (e.g., Dashboard to Journal) using mock React Navigation.  
- **Form Transitions**: Fade-in/fade-out for forms (e.g., Protocol Creation), returning to the previous screen on save or cancel.  
- **Error Handling**: Mock errors (e.g., invalid login) trigger a fade-in alert that disappears after 2 seconds.

