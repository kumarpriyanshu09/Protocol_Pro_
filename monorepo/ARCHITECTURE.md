# Protocol Pro Architecture

This document provides a detailed visualization of the Protocol Pro application architecture using Mermaid diagrams.

## Monorepo Structure

```mermaid
graph TD
    Root[Protocol Pro Root]
    Monorepo[Monorepo]
    Apps[Apps]
    Packages[Packages]
    Mobile[Mobile App]
    Web[Web App - Future]
    UI[UI Package]
    Core[Core Package]
    API[API Package]
    Store[Store Package]
    TSConfig[TSConfig Package]
    
    Root --> Monorepo
    Monorepo --> Apps
    Monorepo --> Packages
    
    Apps --> Mobile
    Apps --> Web
    
    Packages --> UI
    Packages --> Core
    Packages --> API
    Packages --> Store
    Packages --> TSConfig
    
    Mobile -- depends on --> UI
    Mobile -- depends on --> Core
    Mobile -- depends on --> API
    Mobile -- depends on --> Store
    
    Core -- depends on --> UI
    API -- depends on --> Core
    Store -- depends on --> API
    Store -- depends on --> Core
    
    subgraph "Mobile App Structure"
        MobileApp[Mobile App]
        SRC[src]
        Assets[assets]
        Tests[__tests__]
        AppJSON[app.json]
        
        MobileApp --> SRC
        MobileApp --> Assets
        MobileApp --> Tests
        MobileApp --> AppJSON
        
        Components[components]
        Screens[screens]
        Navigation[navigation]
        Context[context]
        Hooks[hooks]
        Services[services]
        Utils[utils]
        Types[types]
        Data[data]
        I18n[i18n]
        Theme[theme]
        
        SRC --> Components
        SRC --> Screens
        SRC --> Navigation
        SRC --> Context
        SRC --> Hooks
        SRC --> Services
        SRC --> Utils
        SRC --> Types
        SRC --> Data
        SRC --> I18n
        SRC --> Theme
    end
```

## Navigation Structure

```mermaid
graph TD
    RootStack[Root Stack Navigator]
    InstructorTab[Instructor Tab Navigator]
    FollowerTab[Follower Tab Navigator]
    
    Login[Login Screen]
    Home[Home Screen]
    Details[Details Screen]
    Achievements[Achievements Screen]
    Messages[Messages Screen]
    
    InstructorDashboard[Dashboard Screen]
    Protocols[Protocols Screen]
    CreateProtocol[Create Protocol Screen]
    InstructorMessages[Messages Screen]
    InstructorSettings[Settings Screen]
    
    Protocol[Protocol Screen]
    FollowerProtocols[Protocols Screen]
    Tasks[Tasks Screen]
    Journal[Journal Screen]
    FollowerSettings[Settings Screen]
    
    RootStack --> Login
    RootStack --> InstructorTab
    RootStack --> FollowerTab
    RootStack --> Achievements
    RootStack --> Messages
    RootStack --> Home
    RootStack --> Details
    
    InstructorTab --> InstructorDashboard
    InstructorTab --> Protocols
    InstructorTab --> CreateProtocol
    InstructorTab --> InstructorMessages
    InstructorTab --> InstructorSettings
    
    FollowerTab --> Protocol
    FollowerTab --> FollowerProtocols
    FollowerTab --> Tasks
    FollowerTab --> Journal
    FollowerTab --> FollowerSettings
    
    classDef rootNav fill:#f9f,stroke:#333,stroke-width:2px
    classDef instructorNav fill:#bbf,stroke:#333,stroke-width:1px
    classDef followerNav fill:#bfb,stroke:#333,stroke-width:1px
    classDef screen fill:#fff,stroke:#333,stroke-width:1px
    
    class RootStack rootNav
    class InstructorTab,InstructorDashboard,Protocols,CreateProtocol,InstructorMessages,InstructorSettings instructorNav
    class FollowerTab,Protocol,FollowerProtocols,Tasks,Journal,FollowerSettings followerNav
    class Login,Home,Details,Achievements,Messages screen
```

## Data Flow

```mermaid
graph TD
    UI[UI Components]
    Screens[Screen Components]
    ReactContext[React Context]
    ReduxStore[Redux Store]
    API[API Services]
    Backend[Backend Services]
    
    UI --> Screens
    Screens --> ReactContext
    Screens --> ReduxStore
    ReactContext --> API
    ReduxStore --> API
    API --> Backend
    
    subgraph "React Context"
        TaskContext[Task Context]
        TaskProvider[Task Provider]
        UseTaskContext[useTaskContext Hook]
        
        TaskProvider --> TaskContext
        UseTaskContext --> TaskContext
    end
    
    subgraph "Redux Store"
        AuthSlice[Auth Slice]
        TasksSlice[Tasks Slice]
        ProtocolsSlice[Protocols Slice]
        UISlice[UI Slice]
        
        Store[Store]
        Persistor[Persistor]
        
        AuthSlice --> Store
        TasksSlice --> Store
        ProtocolsSlice --> Store
        UISlice --> Store
        
        Store --> Persistor
    end
    
    subgraph "API Services"
        AuthService[Auth Service]
        TaskService[Task Service]
        ProtocolService[Protocol Service]
        
        AuthService --> Backend
        TaskService --> Backend
        ProtocolService --> Backend
    end
```

## Component Dependencies

```mermaid
graph TD
    App[App.tsx]
    AppWrapper[AppWrapper]
    NavigationContainer[NavigationContainer]
    StackNavigator[Stack Navigator]
    TabNavigators[Tab Navigators]
    
    App --> AppWrapper
    AppWrapper --> Provider
    Provider --> PersistGate
    PersistGate --> SafeAreaProvider
    SafeAreaProvider --> GestureHandlerRootView
    GestureHandlerRootView --> StatusBar
    GestureHandlerRootView --> TaskProvider
    TaskProvider --> NavigationContainer
    NavigationContainer --> StackNavigator
    StackNavigator --> TabNavigators
    StackNavigator --> Screens
    
    subgraph "Redux Provider"
        Provider[Redux Provider]
        PersistGate[Redux Persist Gate]
        Store[Redux Store]
        
        Provider -- uses --> Store
    end
    
    subgraph "Context Providers"
        TaskProvider[Task Provider]
        TaskContext[Task Context]
        
        TaskProvider -- provides --> TaskContext
    end
    
    subgraph "UI Components"
        Button[Button]
        Card[Card]
        Text[Text]
        TaskList[Task List]
        AuthStatus[Auth Status]
        TaskStrategiesModal[Task Strategies Modal]
        
        Button -- used in --> Screens
        Card -- used in --> Screens
        Text -- used in --> Screens
        TaskList -- used in --> Screens
        AuthStatus -- used in --> Screens
        TaskStrategiesModal -- used in --> NavigationContainer
    end
    
    subgraph "Screens"
        LoginScreen[Login Screen]
        InstructorDashboardScreen[Instructor Dashboard]
        FollowerDashboardScreen[Follower Dashboard]
        ProtocolCreationScreen[Protocol Creation]
        ProtocolScreen[Protocol Screen]
        TasksScreen[Tasks Screen]
        
        LoginScreen -- navigates to --> InstructorDashboardScreen
        LoginScreen -- navigates to --> FollowerDashboardScreen
    end
```

## Package Dependency Graph

```mermaid
graph LR
    MobileApp[Mobile App]
    UI[UI Package]
    Core[Core Package]
    API[API Package]
    Store[Store Package]
    TSConfig[TSConfig Package]
    
    MobileApp --> UI
    MobileApp --> Core
    MobileApp --> API
    MobileApp --> Store
    MobileApp --> TSConfig
    
    UI --> TSConfig
    Core --> UI
    Core --> TSConfig
    API --> Core
    API --> TSConfig
    Store --> API
    Store --> Core
    Store --> TSConfig
    
    classDef app fill:#f9f,stroke:#333,stroke-width:2px
    classDef package fill:#bbf,stroke:#333,stroke-width:1px
    classDef config fill:#bfb,stroke:#333,stroke-width:1px
    
    class MobileApp app
    class UI,Core,API,Store package
    class TSConfig config
```

## State Management Flow

```mermaid
graph TD
    User[User Interaction]
    Component[UI Component]
    Context[React Context]
    Redux[Redux Store]
    API[API Service]
    Backend[Backend]
    
    User --> Component
    Component --> Context
    Component --> Redux
    Context --> API
    Redux --> API
    API --> Backend
    Backend --> API
    API --> Redux
    API --> Context
    Redux --> Component
    Context --> Component
    Component --> User
    
    subgraph "User Interaction Flow"
        direction LR
        UserAction[User Action]
        Dispatch[Dispatch Action]
        Reducer[Reducer]
        NewState[New State]
        Render[Re-render]
        
        UserAction --> Dispatch
        Dispatch --> Reducer
        Reducer --> NewState
        NewState --> Render
        Render --> UserAction
    end
    
    subgraph "Data Persistence"
        direction TB
        ReduxState[Redux State]
        AsyncStorage[Async Storage]
        Hydration[State Hydration]
        
        ReduxState --> AsyncStorage
        AsyncStorage --> Hydration
        Hydration --> ReduxState
    end
```

## Build and Development Workflow

```mermaid
graph TD
    Dev[Developer]
    Code[Code Changes]
    Turbo[Turbo Build]
    Packages[Package Builds]
    Apps[App Builds]
    Tests[Tests]
    Deploy[Deployment]
    
    Dev --> Code
    Code --> Turbo
    Turbo --> Packages
    Turbo --> Apps
    Turbo --> Tests
    Packages --> Apps
    Apps --> Tests
    Tests --> Deploy
    
    subgraph "Turbo Pipeline"
        direction LR
        BuildTask[Build Task]
        TestTask[Test Task]
        LintTask[Lint Task]
        DevTask[Dev Task]
        
        BuildTask --> TestTask
        LintTask --> BuildTask
        DevTask
    end
    
    subgraph "Package Dependencies"
        direction TB
        UIBuild[UI Build]
        CoreBuild[Core Build]
        APIBuild[API Build]
        StoreBuild[Store Build]
        
        UIBuild --> CoreBuild
        CoreBuild --> APIBuild
        APIBuild --> StoreBuild
    end
```

## User Role-Based Navigation

```mermaid
graph TD
    Login[Login Screen]
    RoleCheck{User Role?}
    Instructor[Instructor Flow]
    Follower[Follower Flow]
    
    Login --> RoleCheck
    RoleCheck -- Instructor --> Instructor
    RoleCheck -- Follower --> Follower
    
    subgraph "Instructor Navigation"
        InstructorDashboard[Dashboard]
        ManageProtocols[Manage Protocols]
        CreateProtocol[Create Protocol]
        ViewFollowers[View Followers]
        InstructorSettings[Settings]
        
        Instructor --> InstructorDashboard
        InstructorDashboard --> ManageProtocols
        InstructorDashboard --> CreateProtocol
        InstructorDashboard --> ViewFollowers
        InstructorDashboard --> InstructorSettings
    end
    
    subgraph "Follower Navigation"
        FollowerDashboard[Dashboard]
        ViewProtocols[View Protocols]
        CompleteTasks[Complete Tasks]
        TrackProgress[Track Progress]
        FollowerSettings[Settings]
        
        Follower --> FollowerDashboard
        FollowerDashboard --> ViewProtocols
        FollowerDashboard --> CompleteTasks
        FollowerDashboard --> TrackProgress
        FollowerDashboard --> FollowerSettings
    end
```

## Protocol and Task Data Model

```mermaid
classDiagram
    class ProtocolTemplate {
        +string id
        +string title
        +string description
        +string createdBy
        +ProtocolTask[] tasks
        +number enrolledCount
    }
    
    class ProtocolTask {
        +string id
        +string title
        +string description
        +string duration
        +string frequency
    }
    
    class UserProtocol {
        +string id
        +string userId
        +string templateId
        +number progress
        +string startDate
        +string endDate
        +UserTask[] tasks
    }
    
    class UserTask {
        +string id
        +string protocolTaskId
        +string title
        +string description
        +string frequency
        +boolean completed
        +string completedDate
        +string dueDate
    }
    
    class User {
        +string id
        +string email
        +string name
        +string role
    }
    
    ProtocolTemplate "1" -- "many" ProtocolTask : contains
    ProtocolTemplate "1" -- "many" UserProtocol : instantiates
    UserProtocol "1" -- "many" UserTask : contains
    User "1" -- "many" UserProtocol : enrolls in
```

These diagrams provide a comprehensive visualization of the Protocol Pro application architecture, including the monorepo structure, navigation flow, data flow, component dependencies, package dependencies, state management, build workflow, user role-based navigation, and data model. 