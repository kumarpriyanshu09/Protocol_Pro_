export default {
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    retry: 'Try Again',
  },
  auth: {
    login: 'Login',
    signup: 'Sign Up',
    email: 'Email',
    password: 'Password',
  },
  dashboard: {
    tasks: {
      title: "Today's Tasks",
      swipeHint: 'Swipe left to complete',
      voiceHint: 'Voice command detected: "Complete task"',
      achievement: 'Achievement Unlocked: Task Master!',
    },
    progress: {
      title: 'Progress Overview',
      weeklyProgress: 'Weekly Progress',
      complete: 'Complete',
    },
    achievements: {
      title: 'Achievements',
      viewAll: 'View Achievements',
    },
  },
  protocols: {
    create: 'Create Protocol',
    edit: 'Edit Protocol',
    delete: 'Delete Protocol',
    title: 'Title',
    steps: 'Steps',
  },
} as const; 