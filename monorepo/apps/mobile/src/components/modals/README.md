# Task Strategies Modal

This component displays a modal with tasks and their associated best-practice strategies. It can be triggered by either a push notification or an in-app button.

## Features

- Displays a list of tasks with their titles and descriptions
- Shows 2-3 bullet-point strategies for each task
- Allows users to mark tasks as complete directly from the modal
- Can be triggered by push notifications or in-app buttons
- Supports showing all tasks or a specific task

## Usage

### Importing the Component

```tsx
import { TaskStrategiesModal } from './components/modals/TaskStrategiesModal';
```

### Adding to Your App

The modal should be added at the root level of your app, outside of any navigation components but inside the Redux Provider:

```tsx
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          {/* Navigation components */}
          <Stack.Navigator>
            {/* Screens */}
          </Stack.Navigator>
          
          {/* Add the modal here */}
          <TaskStrategiesModal />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
```

### Opening the Modal

You can open the modal by dispatching the `openTaskStrategiesModal` action:

```tsx
import { useAppDispatch, openTaskStrategiesModal, fetchTasks } from 'store';

function MyComponent() {
  const dispatch = useAppDispatch();
  
  const handleShowTasks = () => {
    // Fetch the latest tasks first
    dispatch(fetchTasks());
    
    // Open the modal with all tasks
    dispatch(openTaskStrategiesModal(null));
    
    // Or open the modal with a specific task
    // dispatch(openTaskStrategiesModal('task-id-123'));
  };
  
  return (
    <Button onPress={handleShowTasks}>
      Show Tasks
    </Button>
  );
}
```

### Handling Push Notifications

To open the modal when a push notification is tapped:

```tsx
// Set up notification response listener
const responseListener = Notifications.addNotificationResponseReceivedListener(
  response => {
    const { notification } = response;
    const title = notification.request.content.title;
    
    if (title === 'Habit') {
      // Dispatch action to open task strategies modal
      dispatch(fetchTasks());
      dispatch(openTaskStrategiesModal(null));
    }
  }
);
```

### Sending a Test Notification

```tsx
const scheduleTestNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Habit',
      body: 'Are your habits completed?',
      data: { type: 'habit_reminder' },
    },
    trigger: { seconds: 5 }, // Show notification after 5 seconds
  });
};
```

## Data Structure

The modal expects tasks to have the following structure:

```tsx
interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  strategies: string[]; // Array of strategy strings
}
```

## Customization

You can customize the appearance of the modal by modifying the styles in the component file. 