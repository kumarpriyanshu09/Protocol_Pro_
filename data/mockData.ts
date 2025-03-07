// Protocol Template Interface
export interface ProtocolTemplate {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  tasks: ProtocolTask[];
  enrolledCount?: number; // Number of followers enrolled (for instructor view)
}

// Protocol Task Interface
export interface ProtocolTask {
  id: string;
  title: string;
  description: string;
  duration?: string; // Optional duration for the task
  frequency?: string; // How often the task should be performed (daily, weekly, etc.)
}

// User Protocol Instance (when a user enrolls in a protocol)
export interface UserProtocol {
  id: string;
  userId: string;
  templateId: string;
  progress: number; // Overall progress as a percentage
  startDate: string;
  endDate?: string;
  tasks: UserTask[]; // Tasks specific to this user's protocol instance
}

// User Task Instance
export interface UserTask {
  id: string;
  protocolTaskId: string; // Reference to the original task in the template
  title: string;
  description?: string; // Description of the task
  frequency?: string; // How often the task should be performed
  completed: boolean;
  completedDate?: string;
  dueDate?: string;
}

// Mock Protocol Templates (available for users to enroll in)
export const mockProtocolTemplates: ProtocolTemplate[] = [
  {
    id: '1',
    title: '30-Day Fitness Challenge',
    description: 'Build strength and endurance over 30 days',
    createdBy: 'instructor1',
    enrolledCount: 12,
    tasks: [
      {
        id: 't1',
        title: 'Morning Run',
        description: 'Run 5K at a moderate pace',
        frequency: 'Daily'
      },
      {
        id: 't2',
        title: 'Meditation',
        description: 'Mindful meditation for 10 minutes',
        frequency: 'Daily'
      },
      {
        id: 't3',
        title: 'Reading',
        description: 'Read 20 pages of a book',
        frequency: 'Daily'
      }
    ]
  },
  {
    id: '2',
    title: 'Morning Routine',
    description: 'Start your day with energy and focus',
    createdBy: 'instructor1',
    enrolledCount: 8,
    tasks: [
      {
        id: 't4',
        title: 'Hydration',
        description: 'Drink 500ml of water upon waking',
        frequency: 'Daily'
      },
      {
        id: 't5',
        title: 'Stretching',
        description: '10 minutes of full-body stretching',
        frequency: 'Daily'
      },
      {
        id: 't6',
        title: 'Journaling',
        description: 'Write 3 things you\'re grateful for',
        frequency: 'Daily'
      }
    ]
  },
  {
    id: '3',
    title: 'Nutrition Plan',
    description: 'Balanced meals for optimal performance',
    createdBy: 'instructor2',
    enrolledCount: 5,
    tasks: [
      {
        id: 't7',
        title: 'Protein Breakfast',
        description: 'Eat a high-protein breakfast',
        frequency: 'Daily'
      },
      {
        id: 't8',
        title: 'Meal Prep',
        description: 'Prepare meals for the next day',
        frequency: 'Daily'
      },
      {
        id: 't9',
        title: 'Water Intake',
        description: 'Drink at least 2 liters of water',
        frequency: 'Daily'
      }
    ]
  }
];

// Mock User Protocols (protocols that users have enrolled in)
export const mockUserProtocols: UserProtocol[] = [
  {
    id: 'up1',
    userId: 'user1',
    templateId: '1',
    progress: 0.65,
    startDate: '2025-02-15',
    tasks: [
      {
        id: 'ut1',
        protocolTaskId: 't1',
        title: 'Morning Run',
        completed: true,
        completedDate: '2025-03-06'
      },
      {
        id: 'ut2',
        protocolTaskId: 't2',
        title: 'Meditation',
        completed: true,
        completedDate: '2025-03-06'
      },
      {
        id: 'ut3',
        protocolTaskId: 't3',
        title: 'Reading',
        completed: false
      }
    ]
  },
  {
    id: 'up2',
    userId: 'user1',
    templateId: '2',
    progress: 0.8,
    startDate: '2025-02-20',
    tasks: [
      {
        id: 'ut4',
        protocolTaskId: 't4',
        title: 'Hydration',
        completed: true,
        completedDate: '2025-03-06'
      },
      {
        id: 'ut5',
        protocolTaskId: 't5',
        title: 'Stretching',
        completed: true,
        completedDate: '2025-03-06'
      },
      {
        id: 'ut6',
        protocolTaskId: 't6',
        title: 'Journaling',
        completed: false
      }
    ]
  }
];

export const mockFollowers = [
  { id: '1', name: 'John', progress: 50 },
  { id: '2', name: 'Sarah', progress: 75 },
  { id: '3', name: 'Mike', progress: 25 }
];
