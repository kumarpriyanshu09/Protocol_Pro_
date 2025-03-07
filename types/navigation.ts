/**
 * Root stack navigator parameter list
 */
export type RootStackParamList = {
  Login: undefined;
  InstructorDashboard: undefined;
  ProtocolCreation: undefined;
  FollowerDashboard: undefined;
  Achievements: undefined;
  ProtocolsScreen: undefined;
  TasksScreen: undefined;
  JournalScreen: undefined;
  MessagesScreen: undefined;
  SettingsScreen: { isInstructor?: boolean };
};

/**
 * Follower tab navigator parameter list
 */
export type FollowerTabParamList = {
  Protocols: undefined;
  Tasks: undefined;
  Journal: undefined;
  More: { isInstructor?: boolean };
};

/**
 * Instructor tab navigator parameter list
 */
export type InstructorTabParamList = {
  Protocols: { isInstructor: boolean };
  Dashboard: undefined;
  Messages: undefined;
  More: { isInstructor: boolean };
};