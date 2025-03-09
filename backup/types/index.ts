import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './navigation';

export type Props = {
  navigation: StackNavigationProp<RootStackParamList, keyof RootStackParamList>;
};

// Task-related types
export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface Protocol {
  id: string;
  title: string;
  steps: string[];
  progress: number;
}

export interface CategoryProgress {
  category: string;
  progress: number;
}

export interface NotificationState {
  message: string;
  isVisible: boolean;
}
