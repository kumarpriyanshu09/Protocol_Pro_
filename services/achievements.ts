import api from './api';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export interface UserAchievement extends Achievement {
  progress: number;
  isUnlocked: boolean;
}

export const achievementsService = {
  getAllAchievements: () => 
    api.get<Achievement[]>('/achievements'),
  
  getUserAchievements: (userId: string) =>
    api.get<UserAchievement[]>(`/users/${userId}/achievements`),
  
  unlockAchievement: (userId: string, achievementId: string) =>
    api.post<UserAchievement>(`/users/${userId}/achievements/${achievementId}/unlock`),
  
  updateProgress: (userId: string, achievementId: string, progress: number) =>
    api.put<UserAchievement>(
      `/users/${userId}/achievements/${achievementId}/progress`,
      { progress }
    ),
};

export default achievementsService; 