# update_instructions.md

**Version**: 1.0  
**Author**: TechBoy (with assistance from Grok 3, xAI)

---

## Instructions

Please create this Update Instructions document in a separate file named `update_instructions.md` at the root of the Protocol Pro project. This file should be referenced by Cursor to ensure the project's documentation remains consistent with changes in the codebase or requirements. The instructions should be dynamic, allowing easy modifications and integration with future development tools or updates.

---

## Introduction

**Protocol Pro** is a mobile application designed to connect instructors with followers for managing personalized protocols. As the project evolves, maintaining alignment between the codebase and its documentation (e.g., PRD, App Flow Document, Tech Stack Document, Frontend Guidelines Document) is critical to avoid inconsistencies. This document outlines a rule for Cursor to prompt updates to these documents when changes occur that deviate from the established "Instructions" or other guidelines, ensuring a seamless development process.

---

## Update Rule

### Rule: Prompt for Documentation Updates
- **Description**: When Cursor detects changes in the codebase or requirements that do not align with the existing "Instructions" (e.g., in PRD, App Flow, Tech Stack, or Frontend Guidelines), prompt the user to update the relevant document before proceeding.  
- **Trigger Conditions**:  
  1. **Tech Stack Changes**: If a new tech stack element (e.g., a library like Stripe or RevenueCat for payments) is added or an existing one is modified, update the Tech Stack Document.  
  2. **Rule Updates**: If a new rule or modification to existing rules (e.g., in `.cursorrules` or Frontend Guidelines) is needed, update the affected document (e.g., `frontend_guidelines.md`).  
  3. **UI Changes**: If the UI design system (e.g., color palette, typography, icons) is altered, update the Frontend Guidelines Document.  
  4. **Current Instructions**: If the current instructions or project requirements shift (e.g., adding a new feature), update the Instructions section in the relevant document (e.g., PRD) for future development.  
- **Action**:  
  - Display a message in the following format:  
    ```
    **Update Required**: 
    - Change Detected: [e.g., New tech stack element 'Stripe' added]
    - Affected Document: [e.g., Tech Stack Document]
    - Suggested Update: [e.g., Add Stripe under Payment Integration]
    - Confirm Update? (Yes/No)
    ```
  - Pause execution and wait for user confirmation (Yes/No).  
  - If "Yes", update the document with the suggested changes and proceed.  
  - If "No", log the change for manual review and proceed without updating.  

### Example Scenarios
- **Tech Stack**: Adding `react-native-reanimated` triggers:  
  ```
  **Update Required**: 
  - Change Detected: New tech stack element 'react-native-reanimated' added
  - Affected Document: Tech Stack Document
  - Suggested Update: Add react-native-reanimated under Animation & Gestures
  - Confirm Update? (Yes/No)
  ```
- **UI Change**: Changing the primary color from `#0A84FF` to `#0070f3` triggers:  
  ```
  **Update Required**: 
  - Change Detected: UI color palette changed from #0A84FF to #0070f3
  - Affected Document: Frontend Guidelines Document
  - Suggested Update: Update Primary Colors section
  - Confirm Update? (Yes/No)
  ```
- **Rule Change**: Adding a new accessibility rule triggers:  
  ```
  **Update Required**: 
  - Change Detected: New accessibility rule added
  - Affected Document: Frontend Guidelines Document
  - Suggested Update: Add rule to Design Principles
  - Confirm Update? (Yes/No)
  ```
- **Instruction Change**: Adding a new feature (e.g., push notifications) triggers:  
  ```
  **Update Required**: 
  - Change Detected: New feature 'push notifications' added
  - Affected Document: PRD
  - Suggested Update: Add to Core Features
  - Confirm Update? (Yes/No)
  ```

---