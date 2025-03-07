# Protocol Pro Product Requirements Document (PRD)

**Version**: 1.2  
**Author**: TechBoy (with assistance from Grok 3, xAI)

---

## App Overview

Protocol Pro is a mobile application designed to connect instructors and their followers, enabling the creation, management, and tracking of personalized protocols (e.g., fitness, wellness, or productivity plans). The app targets individuals seeking structured guidance (followers) and mentors or coaches (instructors) who want to design and monitor protocols efficiently. In its preview mode, Protocol Pro offers a streamlined experience with mock data, focusing on usability and core functionality without backend dependencies.

The app's primary goal is to facilitate habit-building and progress tracking through intuitive dashboards, visual feedback, and simple communication tools. It aims to solve key pain points for followers (e.g., lack of motivation, difficulty tracking progress) and instructors (e.g., inefficient monitoring, time-consuming protocol creation) by providing a user-friendly interface with features like progress visualizations, gamification, and templates. By fostering a supportive community, Protocol Pro seeks to enhance user engagement and instructor effectiveness while remaining lightweight and accessible.

The success of Protocol Pro will be measured by its ability to attract consistent user engagement, provide actionable insights through progress tracking, and enable instructors to manage followers effectively, all while maintaining a simple and intuitive experience.

---

## User Flow

### Follower Flow
1. **Launch App and Login**  
   - The user opens the app and lands on the Login screen, entering mock credentials (e.g., email like "follower@example.com").  
   - If identified as a follower, they are directed to the Follower Dashboard.

2. **Explore Dashboard**  
   - The Follower Dashboard displays the current protocol (e.g., "30-Day Fitness Challenge"), progress visuals (bar chart, line chart, Apple Screen Time-style bar chart), and a task list with checkboxes.  
   - A "Recommended for You" section suggests mock protocols (e.g., "Morning Stretch Routine").

3. **Track Progress**  
   - The user marks tasks as complete (e.g., "Run 5K"), updating progress visuals locally.  
   - They earn a mock badge (e.g., "7-Day Streak") viewable in the Achievements tab.

4. **Set Reminders**  
   - In the Settings tab, the user toggles on reminders and sets a custom message (e.g., "Time for your cold shower!"), seeing a mock alert after 3 seconds.

5. **View Insights**  
   - The user navigates to the User Overview screen to see "What's Working" (e.g., "Consistent Exercise completion") and "Bottlenecks" (e.g., "Low Nutrition logging").

6. **Switch Tabs**  
   - The user uses the bottom navigation bar to switch between Dashboard, Journal (placeholder), Messages (mock), and Settings.

### Instructor Flow
1. **Launch App and Login**  
   - The instructor logs in with mock credentials (e.g., "instructor@example.com") and is directed to the Instructor Dashboard.

2. **Monitor Progress**  
   - The Instructor Dashboard shows a list of protocols (e.g., "30-Day Fitness Challenge"), a follower summary (e.g., "12 followers at 80%+ completion"), and mock analytics (e.g., "Average Completion: 60%").

3. **Create Protocol**  
   - The instructor navigates to the Protocols tab, selects a template (e.g., "Daily Wellness Plan"), fills in details, and saves the protocol (mock save to console).

4. **Send Feedback**  
   - In the Followers tab, the instructor sees follower progress (e.g., "John - 75%") and sends mock feedback with one tap ("Great job!").

5. **Set Up Group Challenge**  
   - The instructor creates a mock group challenge (e.g., "March Fitness Challenge") in the Protocols tab, viewable by followers.

6. **View Insights**  
   - The instructor accesses the User Overview screen to see aggregated insights like "High participation in Exercise tasks" and "Week 2 drop-off".

---

## Tech Stack & APIs

### Tech Stack (Preview Mode)
- **Frontend**: React Native with Expo for building a mobile app, using `StyleSheet` for styling.  
- **Styling**: Plain CSS or `StyleSheet.create` for encapsulated component styles.  
- **Navigation**: React Navigation (mock setup for preview).  
- **State Management**: Local React state (`useState`) for managing mock data and interactions.  
- **Build Tool**: Expo CLI (simulated in Replit preview).

### APIs (Preview Mode)
- **No APIs**: All data is mock/static (e.g., hardcoded protocols, progress percentages).  
- **Simulated Features**: Voice commands, reminders, and offline mode are mocked using console logs, alerts, or local state changes.

### Future Considerations (Not in Preview)
- **Backend**: Supabase for authentication, data storage, and real-time updates.  
- **APIs**: OpenAI API for AI-driven insights (e.g., analyzing progress trends).  
- **Payments**: Stripe for monetization (e.g., instructor subscriptions).

---

## Core Features

### General Features
- **Login Screen**:  
  - Mock authentication with role-based navigation (follower/instructor).  
  - Form with email/password inputs, "Login" and "Sign Up" buttons, and "Forgot Password?" link.  

- **Bottom Navigation Bar**:  
  - Tabs: Dashboard, Journal, Messages, Settings (Achievements for followers, Followers/Protocols for instructors).  
  - Active tab highlighted with a black underline, icons (e.g., dot, chat bubble, gear).

### Follower Features
- **Follower Dashboard**:  
  - Displays current protocol (e.g., "30-Day Fitness Challenge").  
  - Progress visuals: Bar chart (overall progress), line chart (trend), Apple Screen Time-style bar chart (category breakdown).  
  - Task list with toggleable checkboxes (e.g., "Run 5K").  
  - "Recommended for You" section with mock suggestions (e.g., "Morning Stretch Routine").  

- **Simplified Progress Tracking**:  
  - Habit cards with 5 circles (green for completed, gray for missed).  

- **Voice-Activated Commands (Mock)**:  
  - Microphone icon on habit cards; clicking logs "Simulated voice log: 'Logged workout'".  

- **Gamification Elements**:  
  - Achievements tab with mock badges (e.g., "7-Day Streak").  

- **Customizable Reminders (Mock)**:  
  - Toggle in Settings with a custom message input; shows a mock alert after 3 seconds.  

- **Offline Mode (Mock)**:  
  - Toggle in Settings; shows "Offline" status with a cloud icon and mock sync message.  

- **User Overview**:  
  - "What's Working" and "Bottlenecks" sections (e.g., "Consistent Exercise" / "Low Nutrition logging").  

### Instructor Features
- **Instructor Dashboard**:  
  - Lists protocols (e.g., "30-Day Fitness Challenge").  
  - Follower summary with mock total (e.g., "12 followers at 80%+ completion").  
  - Mock analytics (e.g., "Average Completion: 60%").  

- **Real-Time Progress Monitoring**:  
  - Followers tab with mock progress bars (e.g., "John - 75%").  

- **Custom Protocol Templates**:  
  - Templates section with mock entries (e.g., "Daily Wellness Plan").  

- **One-Tap Feedback (Mock)**:  
  - "Send Feedback" button next to each follower; shows "Feedback sent: 'Great job!'".  

- **Group Challenges (Mock)**:  
  - Form to create challenges (e.g., "March Fitness Challenge"); displays on dashboard.  

- **Analytics Without Complexity**:  
  - Simple metrics in Followers/Protocols tab (e.g., "Protocol Popularity: 5/10").  

---

## In-Scope & Out-of-Scope

### In-Scope
- Mock authentication with role-based navigation (follower/instructor).  
- Follower Dashboard with progress visuals, task list, and habit cards.  
- Instructor Dashboard with protocol list, follower summary, and analytics.  
- Bottom navigation bar with Dashboard, Journal, Messages, and Settings tabs.  
- Mock implementations for voice commands, reminders, offline mode, and feedback.  
- Static User Overview screen with "What's Working" and "Bottlenecks".  
- Preview mode functionality using React Native, Expo, and mock data.

### Out-of-Scope
- Real backend integration (e.g., Supabase for authentication or data storage).  
- Actual voice recognition for voice-activated commands (mock only).  
- Push notifications for reminders (mock alerts instead).  
- Real-time data syncing for offline mode (mock status only).  
- Payment integration (e.g., Stripe for monetization).  
- AI-driven insights (e.g., OpenAI API for analyzing progress).  
- Multilingual support or localization options.  
- Web platform support (mobile app only for preview).  